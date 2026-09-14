import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Devnest@2026#";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "devnest_admin_secret_key_2026_secure";
const COOKIE_NAME = "devnest_admin_session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Validate incoming password against configured admin password
 * Uses crypto.timingSafeEqual to defend against timing attacks
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== "string") return false;

  const target = Buffer.from(ADMIN_PASSWORD, "utf-8");
  const input = Buffer.from(inputPassword, "utf-8");

  if (target.length !== input.length) {
    // Constant-time dummy comparison to prevent length leaking timing
    crypto.timingSafeEqual(target, target);
    return false;
  }

  return crypto.timingSafeEqual(target, input);
}

/**
 * Generate a signed session token
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const payload = `${timestamp}:admin_authenticated`;
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verify session token integrity and freshness
 */
export function verifySessionToken(token?: string | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration (7 days)
  const now = Date.now();
  if (now - timestamp > MAX_AGE_SECONDS * 1000) {
    return false;
  }

  // Verify HMAC signature
  const payload = `${timestampStr}:admin_authenticated`;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Parse cookies from request
 */
export function parseCookies(req: NextApiRequest): Record<string, string> {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      cookies[name] = decodeURIComponent(rest.join("="));
    }
  });
  return cookies;
}

/**
 * Check if request has an authorized admin session
 */
export function isAuthenticatedAdmin(req: NextApiRequest): boolean {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  return verifySessionToken(token);
}

/**
 * Set HTTP-only session cookie
 */
export function setAdminSessionCookie(res: NextApiResponse): void {
  const token = createSessionToken();
  const isSecure = process.env.NODE_ENV === "production";
  const cookieFlags = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieFlags);
}

/**
 * Clear admin session cookie on logout
 */
export function clearAdminSessionCookie(res: NextApiResponse): void {
  const isSecure = process.env.NODE_ENV === "production";
  const cookieFlags = [
    `${COOKIE_NAME}=deleted`,
    "Path=/",
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "HttpOnly",
    "SameSite=Lax",
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieFlags);
}

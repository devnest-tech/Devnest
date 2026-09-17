import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAdminPassword, setAdminSessionCookie } from "../../../lib/admin-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { password } = req.body || {};

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Password is required" });
    }

    const isValid = verifyAdminPassword(password.trim());
    if (!isValid) {
      return res.status(401).json({ error: "Invalid admin password" });
    }

    setAdminSessionCookie(res);
    return res.status(200).json({ success: true, message: "Authentication successful" });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
}

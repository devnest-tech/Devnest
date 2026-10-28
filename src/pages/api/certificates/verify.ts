import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { certificateRegistry, CertificateRecord } from "@/data/certificates";

export interface VerifiedCertificate {
  rollNumber: string;
  studentName: string;
  fileName: string;
  filePath: string;
  eventName?: string;
  division?: string;
}

export interface VerifyApiResponse {
  status: "found" | "not_found" | "error";
  records?: VerifiedCertificate[];
  primaryRecord?: VerifiedCertificate;
  message?: string;
}

/**
 * Normalizes student name for comparison:
 * - Trims leading/trailing whitespace
 * - Converts underscores and repeated whitespace to single spaces
 * - Lowercases for case-insensitive matching
 */
export function normalizeStudentName(str: string): string {
  if (!str) return "";
  return str.trim().toLowerCase().replace(/[\s_]+/g, " ");
}

/**
 * Normalizes roll number for comparison:
 * - Trims leading/trailing whitespace
 * - Strictly preserves leading zeros
 * - Case-insensitive for any letters in alphanumeric IDs
 */
export function normalizeRollNumber(str: string): string {
  if (!str) return "";
  return str.trim().toLowerCase();
}

/**
 * Recursively scans public/certificates directory for PDF files.
 * Prevents directory traversal by constraining strictly to the certificates root.
 */
function scanCertificateFiles(dir: string, basePublicDir: string): VerifiedCertificate[] {
  let results: VerifiedCertificate[] = [];

  try {
    if (!fs.existsSync(dir)) {
      return results;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        results = results.concat(scanCertificateFiles(fullPath, basePublicDir));
      } else if (item.isFile() && item.name.toLowerCase().endsWith(".pdf")) {
        // Parse filename: <rollNumber>_<Student_Name>.pdf
        const firstUnderscore = item.name.indexOf("_");
        if (firstUnderscore > 0) {
          const rollNumber = item.name.substring(0, firstUnderscore).trim();
          const rawNamePart = item.name
            .substring(firstUnderscore + 1)
            .replace(/\.pdf$/i, "");
          const studentName = rawNamePart.replace(/_/g, " ").trim();

          // Calculate safe public relative URL (always forward slashes)
          const relativePath = "/" + path.relative(basePublicDir, fullPath).replace(/\\/g, "/");

          // Optional division indicator if nested in subfolder
          const parentDirName = path.basename(dir);
          let division: string | undefined = undefined;
          if (parentDirName.toLowerCase().includes("2nd")) {
            division = "2nd Year Division";
          } else if (parentDirName.toLowerCase().includes("3rd")) {
            division = "3rd Year Division";
          }

          results.push({
            rollNumber,
            studentName,
            fileName: item.name,
            filePath: relativePath,
            eventName: "Prarambh 2026: Capture The Flag (CTF)",
            division,
          });
        }
      }
    }
  } catch (err) {
    console.error("[API certificates/verify] Filesystem scan warning:", err);
  }

  return results;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      status: "error",
      message: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const { rollNumber, name, eventId } = req.body || {};

    // Validate presence and type of required fields
    if (
      !rollNumber ||
      typeof rollNumber !== "string" ||
      !rollNumber.trim() ||
      !name ||
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        status: "error",
        message: "Both Full Name and University Roll Number are required.",
      });
    }

    const inputRoll = normalizeRollNumber(rollNumber);
    const inputName = normalizeStudentName(name);

    // Scan actual certificate files on server filesystem
    const publicCertificatesDir = path.join(process.cwd(), "public", "certificates");
    const publicBaseDir = path.join(process.cwd(), "public");

    let allCerts = scanCertificateFiles(publicCertificatesDir, publicBaseDir);

    // Fallback to static registry if filesystem read returned no items (e.g. serverless sandbox constraint)
    if (allCerts.length === 0 && Array.isArray(certificateRegistry) && certificateRegistry.length > 0) {
      allCerts = certificateRegistry.map((c: CertificateRecord) => ({
        rollNumber: c.rollNumber,
        studentName: c.studentName,
        fileName: c.fileName,
        filePath: c.filePath,
        eventName: c.eventName,
        division: c.division,
      }));
    }

    // Match BOTH roll number AND student name against the same PDF (and eventId if specified)
    const matchingCertificates = allCerts.filter((cert) => {
      const rollMatches = normalizeRollNumber(cert.rollNumber) === inputRoll;
      const nameMatches = normalizeStudentName(cert.studentName) === inputName;
      const eventMatches =
        !eventId ||
        eventId === "all" ||
        eventId === "prarambh-2026" ||
        (cert.eventName && cert.eventName.toLowerCase().includes(eventId.replace("-", " ")));
      return rollMatches && nameMatches && eventMatches;
    });

    if (matchingCertificates.length === 0) {
      return res.status(200).json({
        status: "not_found",
        message: "No certificate matches this name and roll number. Please check your details or contact DevNest.",
      });
    }

    // Return only safe matched records (never exposes other records or directory listings)
    return res.status(200).json({
      status: "found",
      records: matchingCertificates,
      primaryRecord: matchingCertificates[0],
    });
  } catch (error) {
    console.error("[API certificates/verify] Internal server error:", error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while searching certificates. Please try again later.",
    });
  }
}

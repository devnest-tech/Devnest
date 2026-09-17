import type { NextApiRequest, NextApiResponse } from "next";
import {
  addMemberRecord,
  checkMemberDuplicate,
  type MemberRecord,
} from "../../../../server/members-storage";

function sanitize(val?: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().replace(/[<>]/g, "");
}

function parseArrayField(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.map((item) => sanitize(item)).filter((s) => s.length > 0);
  }
  if (typeof val === "string") {
    return val
      .split(",")
      .map((item) => sanitize(item))
      .filter((s) => s.length > 0);
  }
  return [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};

    const fullName = sanitize(body.fullName);
    const email = sanitize(body.email).toLowerCase();
    const phone = sanitize(body.phone).replace(/\s+/g, "");
    const college = sanitize(body.college) || "Lamrin Tech Skills University Punjab";
    const branch = sanitize(body.branch);
    const year = sanitize(body.year);
    const semester = sanitize(body.semester);
    const enrollmentNumber = sanitize(body.enrollmentNumber) || "N/A";
    const linkedin = sanitize(body.linkedin);
    const github = sanitize(body.github);
    const portfolio = sanitize(body.portfolio);
    const statement = sanitize(body.statement);
    const interests = parseArrayField(body.interests);
    const skills = parseArrayField(body.skills);

    // Validation
    const missing: string[] = [];
    if (!fullName || fullName.length < 2) missing.push("Full Name");
    if (!email) missing.push("Email Address");
    if (!phone) missing.push("Phone Number");
    if (!branch) missing.push("Branch / Department");
    if (!year) missing.push("Current Year");
    if (!semester) missing.push("Current Semester");

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Please fill in all required fields: ${missing.join(", ")}`,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address.",
      });
    }

    // Phone format validation (at least 10 digits)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        error: "Please provide a valid 10-digit phone number.",
      });
    }

    // Duplicate check
    const duplicate = await checkMemberDuplicate(email, enrollmentNumber);
    if (duplicate.exists) {
      return res.status(409).json({
        error: duplicate.reason || "An application with these details already exists.",
      });
    }

    // Persist to storage
    const newMember = await addMemberRecord({
      fullName,
      email,
      phone,
      college,
      branch,
      year,
      semester,
      enrollmentNumber,
      membershipType: "regular",
      interests: interests.length > 0 ? interests : ["Fullstack Web Development"],
      skills,
      linkedin: linkedin ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`) : "",
      github: github ? (github.startsWith("http") ? github : `https://${github}`) : "",
      portfolio: portfolio ? (portfolio.startsWith("http") ? portfolio : `https://${portfolio}`) : "",
      statement,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully! Welcome to DevNest.",
      id: newMember.id,
    });
  } catch (error) {
    console.error("Error handling membership submission:", error);
    return res.status(500).json({
      error: "Internal server error while processing membership application. Please try again.",
    });
  }
}

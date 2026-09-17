import type { NextApiRequest, NextApiResponse } from "next";
import { saveMessageRecord } from "../../../server/messages-storage";

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, subject, message }: ContactRequestBody = req.body || {};

    // Validate presence and type of required fields
    if (
      !name ||
      typeof name !== "string" ||
      !name.trim() ||
      !email ||
      typeof email !== "string" ||
      !email.trim() ||
      !subject ||
      typeof subject !== "string" ||
      !subject.trim() ||
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "All fields (name, email, subject, message) are required and must not be empty.",
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        error: "Please provide a valid email address.",
      });
    }

    // Rate / length check for hygiene
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return res.status(400).json({
        error: "One or more input fields exceed maximum allowed character length.",
      });
    }

    const savedRecord = await saveMessageRecord({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been dispatched to the DevNest team.",
      messageId: savedRecord.id,
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return res.status(500).json({
      error: "Internal server error occurred while processing your message. Please try again later.",
    });
  }
}

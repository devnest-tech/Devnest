import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Prarambh 2026 is concluded and registrations are officially closed
  return res.status(400).json({
    error: "Registrations for Prarambh 2026 are officially closed. The event has concluded.",
  });
}

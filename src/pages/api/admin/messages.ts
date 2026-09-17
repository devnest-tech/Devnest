import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedAdmin } from "../../../lib/admin-auth";
import {
  getAllMessageRecords,
  getMessageStatistics,
  updateMessageStatus,
  deleteMessageRecord,
} from "../../../../server/messages-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enforce server-side admin authentication
  if (!isAuthenticatedAdmin(req)) {
    return res.status(401).json({
      error: "Unauthorized. Please authenticate as an administrator to manage messages.",
    });
  }

  try {
    if (req.method === "GET") {
      const [messages, stats] = await Promise.all([
        getAllMessageRecords(),
        getMessageStatistics(),
      ]);
      return res.status(200).json({ messages, stats });
    }

    if (req.method === "PATCH") {
      const { id, status } = req.body || {};

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Message ID is required." });
      }

      if (!status || !["unread", "read", "replied"].includes(status)) {
        return res.status(400).json({
          error: "Valid status ('unread' | 'read' | 'replied') is required.",
        });
      }

      const updated = await updateMessageStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: "Message record not found." });
      }

      const stats = await getMessageStatistics();
      return res.status(200).json({ success: true, message: updated, stats });
    }

    if (req.method === "DELETE") {
      const id = (req.body?.id || req.query.id) as string;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Message ID is required." });
      }

      const deleted = await deleteMessageRecord(id);
      if (!deleted) {
        return res.status(404).json({ error: "Message record not found." });
      }

      const stats = await getMessageStatistics();
      return res.status(200).json({ success: true, stats });
    }

    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("Error in /api/admin/messages:", error);
    return res.status(500).json({ error: "Internal server error occurred." });
  }
}

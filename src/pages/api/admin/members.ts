import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedAdmin } from "../../../lib/admin-auth";
import {
  getAllMemberRecords,
  getMembersStatistics,
  updateMemberRecord,
  deleteMemberRecord,
} from "../../../../server/members-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enforce server-side authentication
  if (!isAuthenticatedAdmin(req)) {
    return res.status(401).json({
      error: "Unauthorized. Please authenticate as admin to access membership records.",
    });
  }

  try {
    if (req.method === "GET") {
      const [members, stats] = await Promise.all([
        getAllMemberRecords(),
        getMembersStatistics(),
      ]);
      return res.status(200).json({ members, stats });
    }

    if (req.method === "PATCH") {
      const { id, status, membershipType, statement } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: "Member ID is required" });
      }

      const updated = await updateMemberRecord(id, {
        ...(status ? { status } : {}),
        ...(membershipType ? { membershipType } : {}),
        ...(statement ? { statement } : {}),
      });

      if (!updated) {
        return res.status(404).json({ error: "Member record not found" });
      }

      const stats = await getMembersStatistics();
      return res.status(200).json({ success: true, member: updated, stats });
    }

    if (req.method === "DELETE") {
      const id = (req.body?.id || req.query.id) as string;
      if (!id) {
        return res.status(400).json({ error: "Member ID is required" });
      }

      const deleted = await deleteMemberRecord(id);
      if (!deleted) {
        return res.status(404).json({ error: "Member record not found" });
      }

      const stats = await getMembersStatistics();
      return res.status(200).json({ success: true, message: "Member record removed", stats });
    }

    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin members API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

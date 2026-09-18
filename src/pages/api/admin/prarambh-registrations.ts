import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedAdmin } from "../../../lib/admin-auth";
import {
  getPrarambhRegistrationsAndStats,
  getPrarambhStats,
  updatePrarambhStatus,
  deletePrarambhRegistration,
} from "../../../../server/prarambh-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enforce session authentication
  if (!isAuthenticatedAdmin(req)) {
    return res.status(401).json({
      error: "Unauthorized: Admin session is missing or expired. Please log in at /admin/devnest.",
    });
  }

  // GET: Retrieve all Prarambh registrations and stats in a single pass
  if (req.method === "GET") {
    try {
      const { registrations, stats } = await getPrarambhRegistrationsAndStats();
      return res.status(200).json({ registrations, stats });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error fetching registrations";
      console.error("[API admin/prarambh-registrations] Fetch error:", error);
      return res.status(500).json({ error: message });
    }
  }

  // PATCH: Update status of a registration
  if (req.method === "PATCH") {
    try {
      const { id, status } = req.body;
      if (!id || !["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid parameters for status update." });
      }

      const updated = await updatePrarambhStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: "Registration record not found." });
      }

      const stats = await getPrarambhStats();
      return res.status(200).json({ success: true, registration: updated, stats });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error updating status";
      return res.status(500).json({ error: message });
    }
  }

  // DELETE: Remove a registration record
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Missing or invalid registration id." });
      }

      const deleted = await deletePrarambhRegistration(id);
      if (!deleted) {
        return res.status(404).json({ error: "Registration record not found." });
      }

      const stats = await getPrarambhStats();
      return res.status(200).json({ success: true, message: "Registration removed.", stats });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error deleting registration";
      return res.status(500).json({ error: message });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

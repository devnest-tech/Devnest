import fs from "fs";
import path from "path";
import os from "os";
import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export interface MemberRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  enrollmentNumber: string;
  college: string;
  branch: string;
  year: string;
  semester: string;
  membershipType: "regular" | "core" | "alumni";
  interests: string[];
  skills: string[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
  statement?: string;
  status: "pending" | "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface MemberStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
  regular: number;
  core: number;
  alumni: number;
  recentThisWeek: number;
}

let inMemoryCache: MemberRecord[] | null = null;

function getStorageFilePath(): string {
  const localDir = path.join(process.cwd(), "server", "data");
  const localFile = path.join(localDir, "members.json");

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localFile;
  } catch {
    return path.join(os.tmpdir(), "devnest_members.json");
  }
}

function loadFromFile(): MemberRecord[] {
  try {
    const filePath = getStorageFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read members file:", error);
  }
  return [];
}

function saveToFile(records: MemberRecord[]): void {
  try {
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf-8");
  } catch (error) {
    try {
      const tempPath = path.join(os.tmpdir(), "devnest_members.json");
      fs.writeFileSync(tempPath, JSON.stringify(records, null, 2), "utf-8");
    } catch (fallbackError) {
      console.error("Critical: Could not persist members to disk:", fallbackError);
    }
  }
}

function isFirebaseConfigured(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT;
}

/**
 * Fetch all members from persistent storage
 */
export async function getAllMemberRecords(): Promise<MemberRecord[]> {
  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      const snapshot = await adminDb
        .collection("members")
        .orderBy("createdAt", "desc")
        .get();

      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<MemberRecord, "id">),
        }));
      }
    } catch (error) {
      console.warn("Firebase Admin read failed, falling back to local store:", error);
    }
  }

  if (!inMemoryCache) {
    inMemoryCache = loadFromFile();
  }

  return [...inMemoryCache].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Check if an email or enrollment number already exists
 */
export async function checkMemberDuplicate(
  email: string,
  enrollmentNumber?: string
): Promise<{ exists: boolean; reason?: string }> {
  const members = await getAllMemberRecords();
  const normalizedEmail = email.trim().toLowerCase();

  const emailMatch = members.find(
    (m) => m.email.trim().toLowerCase() === normalizedEmail
  );
  if (emailMatch) {
    return { exists: true, reason: "An application with this email address has already been submitted." };
  }

  if (enrollmentNumber && enrollmentNumber.trim() && enrollmentNumber.trim() !== "N/A") {
    const normalizedRoll = enrollmentNumber.trim().toLowerCase();
    const rollMatch = members.find(
      (m) => m.enrollmentNumber && m.enrollmentNumber.trim().toLowerCase() === normalizedRoll
    );
    if (rollMatch) {
      return { exists: true, reason: "An application with this Student / Enrollment ID has already been submitted." };
    }
  }

  return { exists: false };
}

/**
 * Add a new member record
 */
export async function addMemberRecord(
  data: Omit<MemberRecord, "id" | "createdAt" | "updatedAt">
): Promise<MemberRecord> {
  const now = new Date().toISOString();
  const id = "mem_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);

  const newRecord: MemberRecord = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      const docRef = await adminDb.collection("members").add(newRecord);
      newRecord.id = docRef.id;
    } catch (error) {
      console.warn("Firebase Admin insert failed, saving to local store:", error);
    }
  }

  if (!inMemoryCache) {
    inMemoryCache = loadFromFile();
  }
  inMemoryCache.unshift(newRecord);
  saveToFile(inMemoryCache);

  return newRecord;
}

/**
 * Update a member's status or fields
 */
export async function updateMemberRecord(
  id: string,
  updates: Partial<Pick<MemberRecord, "status" | "membershipType" | "statement">>
): Promise<MemberRecord | null> {
  const now = new Date().toISOString();

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      const docRef = adminDb.collection("members").doc(id);
      await docRef.update({
        ...updates,
        updatedAt: now,
      });
    } catch (error) {
      console.warn("Firebase Admin update failed:", error);
    }
  }

  if (!inMemoryCache) {
    inMemoryCache = loadFromFile();
  }

  const index = inMemoryCache.findIndex((m) => m.id === id);
  if (index === -1) {
    return null;
  }

  inMemoryCache[index] = {
    ...inMemoryCache[index],
    ...updates,
    updatedAt: now,
  };

  saveToFile(inMemoryCache);
  return inMemoryCache[index];
}

/**
 * Delete a member record by ID
 */
export async function deleteMemberRecord(id: string): Promise<boolean> {
  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("members").doc(id).delete();
    } catch (error) {
      console.warn("Firebase Admin delete failed:", error);
    }
  }

  if (!inMemoryCache) {
    inMemoryCache = loadFromFile();
  }

  const index = inMemoryCache.findIndex((m) => m.id === id);
  if (index === -1) {
    return false;
  }

  inMemoryCache.splice(index, 1);
  saveToFile(inMemoryCache);
  return true;
}

/**
 * Compute statistics for admin dashboard
 */
export async function getMembersStatistics(): Promise<MemberStats> {
  const members = await getAllMemberRecords();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    pending: members.filter((m) => m.status === "pending").length,
    inactive: members.filter((m) => m.status === "inactive").length,
    regular: members.filter((m) => m.membershipType === "regular").length,
    core: members.filter((m) => m.membershipType === "core").length,
    alumni: members.filter((m) => m.membershipType === "alumni").length,
    recentThisWeek: members.filter((m) => new Date(m.createdAt) >= oneWeekAgo).length,
  };
}

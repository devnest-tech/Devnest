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

/**
 * Remove undefined properties so Firestore never rejects documents
 */
function cleanRecord<T extends Record<string, any>>(record: T): T {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}

function getStoragePaths() {
  const localDir = path.join(process.cwd(), "server", "data");
  const localFile = path.join(localDir, "members.json");
  const tempFile = path.join(os.tmpdir(), "devnest_members.json");
  return { localDir, localFile, tempFile };
}

function loadFromFile(): MemberRecord[] {
  const { localFile, tempFile } = getStoragePaths();
  const recordsMap = new Map<string, MemberRecord>();

  const readPath = (fp: string) => {
    try {
      if (fs.existsSync(fp)) {
        const data = fs.readFileSync(fp, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item && item.id) {
              recordsMap.set(item.id, item);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Could not read members from ${fp}:`, e);
    }
  };

  readPath(localFile);
  readPath(tempFile);

  return Array.from(recordsMap.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

function saveToFile(records: MemberRecord[]): void {
  const { localDir, localFile, tempFile } = getStoragePaths();
  const jsonContent = JSON.stringify(records, null, 2);

  try {
    fs.writeFileSync(tempFile, jsonContent, "utf-8");
  } catch (err) {
    console.warn("Could not write members to tempPath:", err);
  }

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    fs.writeFileSync(localFile, jsonContent, "utf-8");
  } catch {
    // Read-only filesystem in serverless
  }
}

function isFirebaseAdminConfigured(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT;
}

function isClientFirestoreConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
}

async function saveMemberToFirestore(record: MemberRecord): Promise<boolean> {
  const cleaned = cleanRecord(record);
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("members").doc(cleaned.id).set(cleaned);
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin member save failed, falling back to client Firestore:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, setDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await setDoc(doc(db, "members", cleaned.id), cleaned);
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore member save failed:", clientFbErr);
    }
  }

  return false;
}

async function fetchMembersFromFirestore(): Promise<MemberRecord[] | null> {
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      let snapshot;
      try {
        snapshot = await adminDb
          .collection("members")
          .orderBy("createdAt", "desc")
          .get();
      } catch {
        snapshot = await adminDb.collection("members").get();
      }

      const records: MemberRecord[] = [];
      snapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() } as MemberRecord);
      });
      return records;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin members fetch failed, attempting client Firestore:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        let snapshot;
        try {
          const q = query(collection(db, "members"), orderBy("createdAt", "desc"));
          snapshot = await getDocs(q);
        } catch {
          snapshot = await getDocs(collection(db, "members"));
        }
        const records: MemberRecord[] = [];
        snapshot.forEach((doc) => {
          records.push({ id: doc.id, ...doc.data() } as MemberRecord);
        });
        return records;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore members fetch failed:", clientFbErr);
    }
  }

  return null;
}

async function updateMemberInFirestore(id: string, updates: Partial<MemberRecord>): Promise<boolean> {
  const cleaned = cleanRecord(updates);
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("members").doc(id).update(cleaned);
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin member update failed:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await updateDoc(doc(db, "members", id), cleaned);
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore member update failed:", clientFbErr);
    }
  }

  return false;
}

async function deleteMemberFromFirestore(id: string): Promise<boolean> {
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("members").doc(id).delete();
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin member delete failed:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, deleteDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await deleteDoc(doc(db, "members", id));
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore member delete failed:", clientFbErr);
    }
  }

  return false;
}

/**
 * Fetch all members from persistent storage with non-destructive merge
 */
export async function getAllMemberRecords(): Promise<MemberRecord[]> {
  const remoteRecords = await fetchMembersFromFirestore();
  const mergedMap = new Map<string, MemberRecord>();

  const upsert = (r: MemberRecord) => {
    if (!r || !r.id) return;
    const existing = mergedMap.get(r.id);
    if (!existing) {
      mergedMap.set(r.id, r);
    } else {
      const existingTime = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
      const newTime = new Date(r.updatedAt || r.createdAt || 0).getTime();
      if (newTime >= existingTime) {
        mergedMap.set(r.id, r);
      }
    }
  };

  const fileRecords = loadFromFile();
  for (const r of fileRecords) {
    upsert(r);
  }

  if (remoteRecords && remoteRecords.length > 0) {
    for (const r of remoteRecords) {
      upsert(r);
    }
  }

  if (inMemoryCache && inMemoryCache.length > 0) {
    for (const r of inMemoryCache) {
      upsert(r);
    }
  }

  const combined = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  inMemoryCache = combined;
  saveToFile(combined);
  return combined;
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

  const cleanedRecord = cleanRecord(newRecord);
  await saveMemberToFirestore(cleanedRecord);

  const existing = inMemoryCache || loadFromFile();
  const filtered = existing.filter((m) => m.id !== cleanedRecord.id);
  const updatedRecords = [cleanedRecord, ...filtered];
  inMemoryCache = updatedRecords;
  saveToFile(updatedRecords);

  return cleanedRecord;
}

/**
 * Update a member's status or fields
 */
export async function updateMemberRecord(
  id: string,
  updates: Partial<Pick<MemberRecord, "status" | "membershipType" | "statement">>
): Promise<MemberRecord | null> {
  const records = await getAllMemberRecords();
  const targetIndex = records.findIndex((m) => m.id === id);

  if (targetIndex === -1) {
    return null;
  }

  const now = new Date().toISOString();
  const updatedRecord: MemberRecord = {
    ...records[targetIndex],
    ...updates,
    updatedAt: now,
  };

  await updateMemberInFirestore(id, { ...updates, updatedAt: now });

  records[targetIndex] = updatedRecord;
  inMemoryCache = [...records];
  saveToFile(inMemoryCache);

  return updatedRecord;
}

/**
 * Delete a member record by ID
 */
export async function deleteMemberRecord(id: string): Promise<boolean> {
  const records = await getAllMemberRecords();
  const targetIndex = records.findIndex((m) => m.id === id);

  if (targetIndex === -1) {
    return false;
  }

  await deleteMemberFromFirestore(id);

  const updatedRecords = records.filter((m) => m.id !== id);
  inMemoryCache = updatedRecords;
  saveToFile(updatedRecords);

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

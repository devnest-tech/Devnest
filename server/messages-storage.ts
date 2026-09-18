import fs from "fs";
import path from "path";
import os from "os";
import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
}

export interface MessageStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
  recentThisWeek: number;
}

let inMemoryCache: MessageRecord[] | null = null;

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
  const localFile = path.join(localDir, "messages.json");
  const tempFile = path.join(os.tmpdir(), "devnest_messages.json");
  return { localDir, localFile, tempFile };
}

function loadFromFile(): MessageRecord[] {
  const { localFile, tempFile } = getStoragePaths();
  const recordsMap = new Map<string, MessageRecord>();

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
      console.warn(`Could not read messages from ${fp}:`, e);
    }
  };

  readPath(localFile);
  readPath(tempFile);

  return Array.from(recordsMap.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

function saveToFile(records: MessageRecord[]): void {
  const { localDir, localFile, tempFile } = getStoragePaths();
  const jsonContent = JSON.stringify(records, null, 2);

  try {
    fs.writeFileSync(tempFile, jsonContent, "utf-8");
  } catch (err) {
    console.warn("Could not write messages to tempPath:", err);
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

async function saveMessageToFirestore(record: MessageRecord): Promise<boolean> {
  const cleaned = cleanRecord(record);
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("contact_messages").doc(cleaned.id).set(cleaned);
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin message save failed, falling back to client Firestore:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, setDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await setDoc(doc(db, "contact_messages", cleaned.id), cleaned);
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore message save failed:", clientFbErr);
    }
  }

  return false;
}

async function fetchMessagesFromFirestore(): Promise<MessageRecord[] | null> {
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      let snapshot;
      try {
        snapshot = await adminDb
          .collection("contact_messages")
          .orderBy("createdAt", "desc")
          .get();
      } catch {
        snapshot = await adminDb.collection("contact_messages").get();
      }

      const records: MessageRecord[] = [];
      snapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() } as MessageRecord);
      });
      return records;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin messages fetch failed, attempting client Firestore:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        let snapshot;
        try {
          const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
          snapshot = await getDocs(q);
        } catch {
          snapshot = await getDocs(collection(db, "contact_messages"));
        }
        const records: MessageRecord[] = [];
        snapshot.forEach((doc) => {
          records.push({ id: doc.id, ...doc.data() } as MessageRecord);
        });
        return records;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore messages fetch failed:", clientFbErr);
    }
  }

  return null;
}

async function updateMessageInFirestore(id: string, updates: Partial<MessageRecord>): Promise<boolean> {
  const cleaned = cleanRecord(updates);
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("contact_messages").doc(id).update(cleaned);
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin message update failed:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await updateDoc(doc(db, "contact_messages", id), cleaned);
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore message update failed:", clientFbErr);
    }
  }

  return false;
}

async function deleteMessageFromFirestore(id: string): Promise<boolean> {
  if (isFirebaseAdminConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("contact_messages").doc(id).delete();
      return true;
    } catch (fbAdminErr) {
      console.warn("Firebase Admin message delete failed:", fbAdminErr);
    }
  }

  if (isClientFirestoreConfigured()) {
    try {
      const { doc, deleteDoc } = await import("firebase/firestore");
      const { db } = await import("../src/lib/firebase");
      if (db) {
        await deleteDoc(doc(db, "contact_messages", id));
        return true;
      }
    } catch (clientFbErr) {
      console.warn("Client Firestore message delete failed:", clientFbErr);
    }
  }

  return false;
}

export async function getAllMessageRecords(): Promise<MessageRecord[]> {
  const remoteRecords = await fetchMessagesFromFirestore();
  const mergedMap = new Map<string, MessageRecord>();

  const upsert = (r: MessageRecord) => {
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

export async function getMessageStatistics(): Promise<MessageStats> {
  const records = await getAllMessageRecords();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const stats: MessageStats = {
    total: records.length,
    unread: records.filter((m) => m.status === "unread").length,
    read: records.filter((m) => m.status === "read").length,
    replied: records.filter((m) => m.status === "replied").length,
    recentThisWeek: records.filter((m) => new Date(m.createdAt) >= oneWeekAgo).length,
  };

  return stats;
}

export async function saveMessageRecord(
  data: Omit<MessageRecord, "id" | "status" | "createdAt" | "updatedAt">
): Promise<MessageRecord> {
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();

  const newRecord: MessageRecord = {
    id,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    status: "unread",
    createdAt: now,
    updatedAt: now,
  };

  const cleanedRecord = cleanRecord(newRecord);
  await saveMessageToFirestore(cleanedRecord);

  const existing = inMemoryCache || loadFromFile();
  const filtered = existing.filter((m) => m.id !== cleanedRecord.id);
  const updated = [cleanedRecord, ...filtered];
  inMemoryCache = updated;
  saveToFile(updated);

  return cleanedRecord;
}

export async function updateMessageStatus(
  id: string,
  status: "unread" | "read" | "replied"
): Promise<MessageRecord | null> {
  const existing = await getAllMessageRecords();
  const index = existing.findIndex((m) => m.id === id);

  if (index === -1) {
    return null;
  }

  const now = new Date().toISOString();
  const updatedRecord: MessageRecord = {
    ...existing[index],
    status,
    updatedAt: now,
  };

  await updateMessageInFirestore(id, { status, updatedAt: now });

  existing[index] = updatedRecord;
  inMemoryCache = [...existing];
  saveToFile(inMemoryCache);

  return updatedRecord;
}

export async function deleteMessageRecord(id: string): Promise<boolean> {
  const existing = await getAllMessageRecords();
  const filtered = existing.filter((m) => m.id !== id);

  if (filtered.length === existing.length) {
    return false;
  }

  await deleteMessageFromFirestore(id);

  inMemoryCache = filtered;
  saveToFile(filtered);
  return true;
}

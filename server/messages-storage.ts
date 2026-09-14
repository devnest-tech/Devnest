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

function getStorageFilePath(): string {
  const localDir = path.join(process.cwd(), "server", "data");
  const localFile = path.join(localDir, "messages.json");

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localFile;
  } catch {
    return path.join(os.tmpdir(), "devnest_messages.json");
  }
}

function loadFromFile(): MessageRecord[] {
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
    console.warn("Could not read messages file:", error);
  }
  return [];
}

function saveToFile(records: MessageRecord[]): void {
  try {
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write messages file:", error);
  }
}

function isFirebaseConfigured(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT;
}

export async function getAllMessageRecords(): Promise<MessageRecord[]> {
  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      const snapshot = await adminDb
        .collection("contact_messages")
        .orderBy("createdAt", "desc")
        .get();

      if (!snapshot.empty) {
        const firestoreRecords: MessageRecord[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<MessageRecord, "id">),
        }));

        inMemoryCache = firestoreRecords;
        saveToFile(firestoreRecords);
        return firestoreRecords;
      }
    } catch (error) {
      console.warn("Firestore error for messages, falling back to local file:", error);
    }
  }

  if (inMemoryCache) {
    return inMemoryCache;
  }

  const records = loadFromFile();
  inMemoryCache = records;
  return records;
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

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("contact_messages").doc(id).set(newRecord);
    } catch (error) {
      console.warn("Firestore save error for message, continuing with local storage:", error);
    }
  }

  const existing = await getAllMessageRecords();
  const updated = [newRecord, ...existing];
  inMemoryCache = updated;
  saveToFile(updated);

  return newRecord;
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

  const updatedRecord: MessageRecord = {
    ...existing[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb
        .collection("contact_messages")
        .doc(id)
        .update({ status, updatedAt: updatedRecord.updatedAt });
    } catch (error) {
      console.warn("Firestore update error for message:", error);
    }
  }

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

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("contact_messages").doc(id).delete();
    } catch (error) {
      console.warn("Firestore delete error for message:", error);
    }
  }

  inMemoryCache = filtered;
  saveToFile(filtered);
  return true;
}

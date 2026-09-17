import fs from "fs";
import path from "path";
import os from "os";
import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year";

export type CompetitionTrack = 
  | "tech-quiz"          // Strictly 1st year (freshers)
  | "ctf-2nd-year"       // Seniors - 2nd year section
  | "ctf-3rd-year";      // Seniors - 3rd year section

export interface PrarambhRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  rollNumber: string;
  college: string;
  branch: string;
  year: AcademicYear;
  competition: CompetitionTrack;
  teamSize: 1 | 2;
  teammateName?: string;
  teammatePhone?: string;
  teammateRollNumber?: string;
  venue: string;
  teamName: string;
  handleOrGithub?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface PrarambhStats {
  total: number;
  techQuizFreshers: number;
  ctf2ndYear: number;
  ctf3rdYear: number;
  approved: number;
  pending: number;
  rejected: number;
}

let inMemoryCache: PrarambhRegistration[] | null = null;

function getStorageFilePath(): string {
  const localDir = path.join(process.cwd(), "server", "data");
  const localFile = path.join(localDir, "prarambh_registrations.json");

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localFile;
  } catch {
    return path.join(os.tmpdir(), "devnest_prarambh_registrations.json");
  }
}

function loadFromFile(): PrarambhRegistration[] {
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
    console.warn("Could not read prarambh registrations file:", error);
  }
  return [];
}

function saveToFile(records: PrarambhRegistration[]): void {
  try {
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf-8");
  } catch (error) {
    try {
      const tempPath = path.join(os.tmpdir(), "devnest_prarambh_registrations.json");
      fs.writeFileSync(tempPath, JSON.stringify(records, null, 2), "utf-8");
    } catch (fallbackError) {
      console.error("Critical: Could not persist prarambh registrations to disk:", fallbackError);
    }
  }
}

function isFirebaseConfigured(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT;
}

/**
 * Fetch all registrations from persistent storage
 */
export async function getAllPrarambhRegistrations(): Promise<PrarambhRegistration[]> {
  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      const snapshot = await adminDb
        .collection("prarambh_registrations")
        .orderBy("createdAt", "desc")
        .get();

      const records: PrarambhRegistration[] = [];
      snapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() } as PrarambhRegistration);
      });
      inMemoryCache = records;
      return records;
    } catch (firebaseErr) {
      console.warn("Firebase fetch failed, using local storage:", firebaseErr);
    }
  }

  if (inMemoryCache !== null) {
    return inMemoryCache;
  }

  const fileRecords = loadFromFile();
  inMemoryCache = fileRecords;
  return fileRecords;
}

/**
 * Compute summary statistics for Prarambh registrations
 */
export async function getPrarambhStats(): Promise<PrarambhStats> {
  const records = await getAllPrarambhRegistrations();

  return {
    total: records.length,
    techQuizFreshers: records.filter((r) => r.competition === "tech-quiz").length,
    ctf2ndYear: records.filter((r) => r.competition === "ctf-2nd-year").length,
    ctf3rdYear: records.filter((r) => r.competition === "ctf-3rd-year").length,
    approved: records.filter((r) => r.status === "approved").length,
    pending: records.filter((r) => r.status === "pending").length,
    rejected: records.filter((r) => r.status === "rejected").length,
  };
}

/**
 * Add a new registration for Prarambh (Tech Quiz or CTF)
 */
export async function createPrarambhRegistration(
  data: Omit<PrarambhRegistration, "id" | "status" | "createdAt" | "updatedAt">
): Promise<PrarambhRegistration> {
  // Validate eligibility constraints:
  // 1st Year -> Tech Quiz only
  // 2nd Year -> CTF 2nd Year section only
  // 3rd Year -> CTF 3rd Year section only
  if (data.year === "1st Year" && data.competition !== "tech-quiz") {
    throw new Error("1st Year (Freshers) students are only eligible for the Tech Quiz competition.");
  }
  if (data.year === "2nd Year" && data.competition !== "ctf-2nd-year") {
    throw new Error("2nd Year students are only eligible for the CTF 2nd Year Section.");
  }
  if (data.year === "3rd Year" && data.competition !== "ctf-3rd-year") {
    throw new Error("3rd Year students are only eligible for the CTF 3rd Year Section.");
  }

  // Validate Team Name (Mandatory)
  if (!data.teamName?.trim()) {
    throw new Error("Team Name is required.");
  }

  // Validate Team Size and Teammate Details:
  // Tech Quiz: strictly individual (teamSize = 1)
  // CTF: 1 to 2 members. If 2 members, teammateName, teammatePhone, and teammateRollNumber are required.
  let finalTeamSize: 1 | 2 = data.teamSize === 2 ? 2 : 1;
  if (data.competition === "tech-quiz") {
    finalTeamSize = 1;
  } else if (finalTeamSize === 2) {
    if (!data.teammateName?.trim() || !data.teammatePhone?.trim() || !data.teammateRollNumber?.trim()) {
      throw new Error("Teammate name, phone number, and roll number are required when team size is 2.");
    }
  }

  const defaultVenue = "IBM Lab in Lamrin Tech Skills University Punjab";
  const venue = data.venue?.trim() || defaultVenue;

  const now = new Date().toISOString();
  const id = `prarambh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const newRecord: PrarambhRegistration = {
    ...data,
    teamSize: finalTeamSize,
    teammateName: finalTeamSize === 2 ? data.teammateName?.trim() : undefined,
    teammatePhone: finalTeamSize === 2 ? data.teammatePhone?.trim() : undefined,
    teammateRollNumber: finalTeamSize === 2 ? data.teammateRollNumber?.trim() : undefined,
    venue,
    id,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("prarambh_registrations").doc(id).set(newRecord);
    } catch (fbErr) {
      console.warn("Could not save to Firebase, continuing with disk storage:", fbErr);
    }
  }

  const currentRecords = await getAllPrarambhRegistrations();
  const updatedRecords = [newRecord, ...currentRecords];
  inMemoryCache = updatedRecords;
  saveToFile(updatedRecords);

  return newRecord;
}

/**
 * Update registration status (approved / rejected / pending)
 */
export async function updatePrarambhStatus(
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<PrarambhRegistration | null> {
  const records = await getAllPrarambhRegistrations();
  const targetIndex = records.findIndex((r) => r.id === id);

  if (targetIndex === -1) {
    return null;
  }

  const now = new Date().toISOString();
  const updatedRecord: PrarambhRegistration = {
    ...records[targetIndex],
    status,
    updatedAt: now,
  };

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("prarambh_registrations").doc(id).update({
        status,
        updatedAt: now,
      });
    } catch (fbErr) {
      console.warn("Could not update in Firebase:", fbErr);
    }
  }

  records[targetIndex] = updatedRecord;
  inMemoryCache = [...records];
  saveToFile(inMemoryCache);

  return updatedRecord;
}

/**
 * Delete a registration
 */
export async function deletePrarambhRegistration(id: string): Promise<boolean> {
  const records = await getAllPrarambhRegistrations();
  const targetIndex = records.findIndex((r) => r.id === id);

  if (targetIndex === -1) {
    return false;
  }

  if (isFirebaseConfigured()) {
    try {
      const { adminDb } = initializeFirebaseAdmin();
      await adminDb.collection("prarambh_registrations").doc(id).delete();
    } catch (fbErr) {
      console.warn("Could not delete from Firebase:", fbErr);
    }
  }

  const updatedRecords = records.filter((r) => r.id !== id);
  inMemoryCache = updatedRecords;
  saveToFile(updatedRecords);

  return true;
}

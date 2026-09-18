import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year";

export type CompetitionTrack =
  | "tech-quiz" // Strictly 1st year (freshers)
  | "ctf-2nd-year" // Seniors - 2nd year section
  | "ctf-3rd-year"; // Seniors - 3rd year section

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

const COLLECTION_NAME = "prarambh_registrations";

/**
 * Strips undefined properties so Firestore never rejects documents
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

/**
 * Computes statistics from a list of registrations in memory
 */
export function computePrarambhStats(records: PrarambhRegistration[]): PrarambhStats {
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
 * Fetch all registrations from Firestore (authoritative single source of truth)
 */
export async function getAllPrarambhRegistrations(): Promise<PrarambhRegistration[]> {
  try {
    const { adminDb } = initializeFirebaseAdmin();
    const colRef = adminDb.collection(COLLECTION_NAME);

    let snapshot;
    try {
      snapshot = await colRef.orderBy("createdAt", "desc").get();
    } catch (orderErr) {
      console.warn("[Prarambh Storage] Unordered fetch fallback (index may be pending):", orderErr);
      snapshot = await colRef.get();
    }

    const records: PrarambhRegistration[] = [];
    snapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() } as PrarambhRegistration);
    });

    // In-memory sort fallback to ensure strictly descending order by createdAt
    return records.sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Prarambh Storage] Critical error querying Firestore:", msg);
    throw new Error(`Failed to retrieve Prarambh registrations from Firestore: ${msg}`);
  }
}

/**
 * Retrieve both registrations and computed stats in a single Firestore read
 */
export async function getPrarambhRegistrationsAndStats(): Promise<{
  registrations: PrarambhRegistration[];
  stats: PrarambhStats;
}> {
  const registrations = await getAllPrarambhRegistrations();
  const stats = computePrarambhStats(registrations);
  return { registrations, stats };
}

/**
 * Compute summary statistics for Prarambh registrations
 */
export async function getPrarambhStats(): Promise<PrarambhStats> {
  const { stats } = await getPrarambhRegistrationsAndStats();
  return stats;
}

/**
 * Add a new registration for Prarambh (Tech Quiz or CTF) strictly to Firestore
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
  // CTF: 1 to 2 members. If 2 members, teammate details are required.
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

  const cleanedRecord = cleanRecord(newRecord);

  try {
    const { adminDb } = initializeFirebaseAdmin();
    await adminDb.collection(COLLECTION_NAME).doc(cleanedRecord.id).set(cleanedRecord);
    return cleanedRecord;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Prarambh Storage] Critical: Failed to save registration to Firestore:", msg);
    throw new Error(`Failed to persist registration to Firestore: ${msg}`);
  }
}

/**
 * Update registration status (approved / rejected / pending) in Firestore
 */
export async function updatePrarambhStatus(
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<PrarambhRegistration | null> {
  try {
    const { adminDb } = initializeFirebaseAdmin();
    const docRef = adminDb.collection(COLLECTION_NAME).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    const now = new Date().toISOString();
    await docRef.update({
      status,
      updatedAt: now,
    });

    const updatedData = (await docRef.get()).data() as PrarambhRegistration;
    return { id, ...updatedData, status, updatedAt: now };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Prarambh Storage] Failed to update registration ${id} in Firestore:`, msg);
    throw new Error(`Failed to update registration status in Firestore: ${msg}`);
  }
}

/**
 * Delete a registration strictly from Firestore
 */
export async function deletePrarambhRegistration(id: string): Promise<boolean> {
  try {
    const { adminDb } = initializeFirebaseAdmin();
    const docRef = adminDb.collection(COLLECTION_NAME).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Prarambh Storage] Failed to delete registration ${id} from Firestore:`, msg);
    throw new Error(`Failed to delete registration from Firestore: ${msg}`);
  }
}

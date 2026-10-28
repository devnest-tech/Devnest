/**
 * DevNest Official Certificate Registry
 * 
 * Strongly typed registry mapping verified student roll numbers to existing certificate PDFs.
 * All files are stored under `public/certificates/`.
 * 
 * Rules:
 *  - Roll number lookup is exact (preserving leading zeros, trimming outer whitespace).
 *  - Safe file path references (no arbitrary filesystem access from client input).
 *  - Supports single certificates, future multi-event certificates, and duplicate detection.
 */

export interface CertificateRecord {
  rollNumber: string;
  studentName: string;
  eventId: string;
  eventName: string;
  division?: string;
  certificateType: string;
  fileName: string;
  filePath: string;
}

export interface CertificateLookupResult {
  status: "found" | "not_found" | "empty" | "duplicate_warning";
  normalizedRollNumber: string;
  records: CertificateRecord[];
  primaryRecord?: CertificateRecord;
  message?: string;
}

/**
 * Normalizes input roll number: trims surrounding whitespace and applies consistent case normalization.
 * Strictly preserves leading zeros and internal characters.
 */
export function normalizeRollNumber(input: string): string {
  if (!input) return "";
  return input.trim().toUpperCase();
}

/**
 * Searches the registry for an exact match against normalized roll numbers.
 * Detects multiple matches if a student holds multiple certificates or duplicates exist.
 */
export function findCertificateByRoll(input: string): CertificateLookupResult {
  const normalized = normalizeRollNumber(input);

  if (!normalized) {
    return {
      status: "empty",
      normalizedRollNumber: "",
      records: [],
      message: "Please enter a valid university roll or enrollment number.",
    };
  }

  // Exact matching only (no partial / substring matches)
  const matches = certificateRegistry.filter(
    (c) => normalizeRollNumber(c.rollNumber) === normalized
  );

  if (matches.length === 0) {
    return {
      status: "not_found",
      normalizedRollNumber: normalized,
      records: [],
      message:
        "No certificate was found for this roll number. Please check your details or contact DevNest for assistance.",
    };
  }

  if (matches.length > 1) {
    // Check if these are duplicate records for the same event or multiple events
    const sameEvent = matches.every((m) => m.eventId === matches[0].eventId);
    return {
      status: "duplicate_warning",
      normalizedRollNumber: normalized,
      records: matches,
      primaryRecord: matches[0],
      message: sameEvent
        ? `Multiple certificates found for roll number ${normalized} in the same event. Please choose your certificate below.`
        : `Found ${matches.length} certificates across multiple DevNest events for roll number ${normalized}.`,
    };
  }

  return {
    status: "found",
    normalizedRollNumber: normalized,
    records: matches,
    primaryRecord: matches[0],
  };
}

/**
 * Generates a clean, user-friendly filename for downloading.
 */
export function getCertificateDownloadName(record: CertificateRecord): string {
  const sanitizedName = record.studentName.replace(/[^a-zA-Z0-9]/g, "_");
  return `DevNest_${record.rollNumber}_${sanitizedName}.pdf`;
}

export const certificateRegistry: CertificateRecord[] = [
  {
    "rollNumber": "24100010015",
    "studentName": "Krishna Teja",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010015_Krishna_teja.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010015_Krishna_teja.pdf"
  },
  {
    "rollNumber": "24100010019",
    "studentName": "Chelluri Sathwik Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010019_Chelluri_Sathwik_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010019_Chelluri_Sathwik_Reddy.pdf"
  },
  {
    "rollNumber": "24100010064",
    "studentName": "Monu Kumar",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010064_Monu_Kumar.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010064_Monu_Kumar.pdf"
  },
  {
    "rollNumber": "24100010082",
    "studentName": "Prince Kasaudhan",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010082_Prince_Kasaudhan.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010082_Prince_Kasaudhan.pdf"
  },
  {
    "rollNumber": "24100010117",
    "studentName": "Venkata Sai Revanth Jayavarapu",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010117_Venkata_Sai_Revanth_Jayavarapu.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010117_Venkata_Sai_Revanth_Jayavarapu.pdf"
  },
  {
    "rollNumber": "24100010120",
    "studentName": "Yash Gour",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100010120_Yash_Gour.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100010120_Yash_Gour.pdf"
  },
  {
    "rollNumber": "24100030003",
    "studentName": "Aashima Rana",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030003_Aashima_Rana.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030003_Aashima_Rana.pdf"
  },
  {
    "rollNumber": "24100030004",
    "studentName": "Abhinav Sai T",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030004_Abhinav_Sai_T.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030004_Abhinav_Sai_T.pdf"
  },
  {
    "rollNumber": "24100030005",
    "studentName": "Alla Pratheek Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030005_Alla_pratheek_reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030005_Alla_pratheek_reddy.pdf"
  },
  {
    "rollNumber": "24100030006",
    "studentName": "Yatish Allumalla",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030006_YATISH_ALLUMALLA.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030006_YATISH_ALLUMALLA.pdf"
  },
  {
    "rollNumber": "24100030008",
    "studentName": "Amit Kumar Sah",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030008_Amit_Kumar_Sah.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030008_Amit_Kumar_Sah.pdf"
  },
  {
    "rollNumber": "24100030011",
    "studentName": "Ajith Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030011_Ajith_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030011_Ajith_Reddy.pdf"
  },
  {
    "rollNumber": "24100030014",
    "studentName": "B Adithya",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030014_B_Adithya.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030014_B_Adithya.pdf"
  },
  {
    "rollNumber": "24100030015",
    "studentName": "B Lakshith",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030015_B_lakshith.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030015_B_lakshith.pdf"
  },
  {
    "rollNumber": "24100030016",
    "studentName": "Bavishetti Bhargav",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030016_bavishetti_bhargav.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030016_bavishetti_bhargav.pdf"
  },
  {
    "rollNumber": "24100030017",
    "studentName": "Begini Srinivasulu",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030017_Begini_Srinivasulu.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030017_Begini_Srinivasulu.pdf"
  },
  {
    "rollNumber": "24100030018",
    "studentName": "Bhumika Mehra",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030018_Bhumika_Mehra.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030018_Bhumika_Mehra.pdf"
  },
  {
    "rollNumber": "24100030019",
    "studentName": "Nishant Devarapalli",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030019_Nishant_Devarapalli.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030019_Nishant_Devarapalli.pdf"
  },
  {
    "rollNumber": "24100030020",
    "studentName": "Gandepalli Upendra",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030020_Gandepalli_Upendra.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030020_Gandepalli_Upendra.pdf"
  },
  {
    "rollNumber": "24100030021",
    "studentName": "Harman Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030021_Harman_singh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030021_Harman_singh.pdf"
  },
  {
    "rollNumber": "24100030024",
    "studentName": "Jai Suhas Phadtare",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030024_Jai_Suhas_Phadtare.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030024_Jai_Suhas_Phadtare.pdf"
  },
  {
    "rollNumber": "24100030025",
    "studentName": "K Lasya",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030025_K_Lasya.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030025_K_Lasya.pdf"
  },
  {
    "rollNumber": "24100030026",
    "studentName": "Kola Pavan Venkata Sai Kiran",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030026_KOLA_PAVAN_VENKATA_SAI_KIRAN.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030026_KOLA_PAVAN_VENKATA_SAI_KIRAN.pdf"
  },
  {
    "rollNumber": "24100030027",
    "studentName": "Kota Yasaswi Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030027_Kota_Yasaswi_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030027_Kota_Yasaswi_Reddy.pdf"
  },
  {
    "rollNumber": "24100030028",
    "studentName": "L Kamalesh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030028_L_Kamalesh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030028_L_Kamalesh.pdf"
  },
  {
    "rollNumber": "24100030029",
    "studentName": "M Durga Mukesh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030029_M_Durga_Mukesh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030029_M_Durga_Mukesh.pdf"
  },
  {
    "rollNumber": "24100030030",
    "studentName": "Niharika",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030030_NIharika.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030030_NIharika.pdf"
  },
  {
    "rollNumber": "24100030031",
    "studentName": "M Syam Saran Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030031_M_Syam_Saran_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030031_M_Syam_Saran_Reddy.pdf"
  },
  {
    "rollNumber": "24100030033",
    "studentName": "Manpreet Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030033_Manpreet_Singh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030033_Manpreet_Singh.pdf"
  },
  {
    "rollNumber": "24100030036",
    "studentName": "Mulinti Gaganjith Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030036_Mulinti_Gaganjith_reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030036_Mulinti_Gaganjith_reddy.pdf"
  },
  {
    "rollNumber": "24100030038",
    "studentName": "Neetish Yadav",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030038_Neetish_yadav.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030038_Neetish_yadav.pdf"
  },
  {
    "rollNumber": "24100030040",
    "studentName": "Rajesh Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030040_Rajesh_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030040_Rajesh_Reddy.pdf"
  },
  {
    "rollNumber": "24100030041",
    "studentName": "P Krishna Vamsi Togur",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030041_P_Krishna_Vamsi_Togur.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030041_P_Krishna_Vamsi_Togur.pdf"
  },
  {
    "rollNumber": "24100030042",
    "studentName": "Devisree Dinesh Kumar Pujari",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030042_Devisree_Dinesh_Kumar_Pujari.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030042_Devisree_Dinesh_Kumar_Pujari.pdf"
  },
  {
    "rollNumber": "24100030043",
    "studentName": "Yashwanth P",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030043_yashwanth_p.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030043_yashwanth_p.pdf"
  },
  {
    "rollNumber": "24100030044",
    "studentName": "Rajput Aman Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030044_Rajput_Aman_Singh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030044_Rajput_Aman_Singh.pdf"
  },
  {
    "rollNumber": "24100030045",
    "studentName": "Veeramallu Ram Kishore",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030045_Veeramallu_Ram_Kishore.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030045_Veeramallu_Ram_Kishore.pdf"
  },
  {
    "rollNumber": "24100030046",
    "studentName": "Rishi Kumar Polepally",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030046_Rishi_Kumar_Polepally.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030046_Rishi_Kumar_Polepally.pdf"
  },
  {
    "rollNumber": "24100030050",
    "studentName": "Shivansh Verma",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030050_Shivansh_Verma.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030050_Shivansh_Verma.pdf"
  },
  {
    "rollNumber": "24100030051",
    "studentName": "Shubham Kumar",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030051_Shubham_Kumar.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030051_Shubham_Kumar.pdf"
  },
  {
    "rollNumber": "24100030052",
    "studentName": "Shaik Madeena",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030052_Shaik_Madeena.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030052_Shaik_Madeena.pdf"
  },
  {
    "rollNumber": "24100030053",
    "studentName": "Subrato Mahato",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030053_Subrato_Mahato.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030053_Subrato_Mahato.pdf"
  },
  {
    "rollNumber": "24100030054",
    "studentName": "Sumit Kumar",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030054_Sumit_Kumar.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030054_Sumit_Kumar.pdf"
  },
  {
    "rollNumber": "24100030056",
    "studentName": "T Ravindranadh Reddy",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030056_T_Ravindranadh_Reddy.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030056_T_Ravindranadh_Reddy.pdf"
  },
  {
    "rollNumber": "24100030057",
    "studentName": "Varshith Danturi",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030057_Varshith_danturi.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030057_Varshith_danturi.pdf"
  },
  {
    "rollNumber": "24100030058",
    "studentName": "Vasanthavada Jaya Ganesh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030058_Vasanthavada_jaya_ganesh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030058_Vasanthavada_jaya_ganesh.pdf"
  },
  {
    "rollNumber": "24100030059",
    "studentName": "Vejendla Sai Pavan",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030059_Vejendla_sai_pavan.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030059_Vejendla_sai_pavan.pdf"
  },
  {
    "rollNumber": "24100030060",
    "studentName": "Vikram Kumar",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030060_Vikram_Kumar.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030060_Vikram_Kumar.pdf"
  },
  {
    "rollNumber": "24100030061",
    "studentName": "Yadla Jaswanth",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030061_Yadla_jaswanth.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030061_Yadla_jaswanth.pdf"
  },
  {
    "rollNumber": "24100030064",
    "studentName": "Akul Pratap Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030064_Akul_Pratap_Singh.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030064_Akul_Pratap_Singh.pdf"
  },
  {
    "rollNumber": "24100030066",
    "studentName": "Asif Ansari",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "24100030066_Asif_Ansari.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030066_Asif_Ansari.pdf"
  },
  {
    "rollNumber": "24100030067",
    "studentName": "Parkash Kumar Yadav",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "3rd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "24100030067_Parkash_kumar_Yadav.pdf",
    "filePath": "/certificates/CTF-3rd_certificate/24100030067_Parkash_kumar_Yadav.pdf"
  },
  {
    "rollNumber": "25100010013",
    "studentName": "Sandeep",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100010013_Sandeep.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100010013_Sandeep.pdf"
  },
  {
    "rollNumber": "25100010015",
    "studentName": "Dwaraka Ventrapati",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100010015_Dwaraka_Ventrapati.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100010015_Dwaraka_Ventrapati.pdf"
  },
  {
    "rollNumber": "25100010024",
    "studentName": "Swaroop",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100010024_Swaroop.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100010024_Swaroop.pdf"
  },
  {
    "rollNumber": "25100010030",
    "studentName": "Sharath Muddishetty",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100010030_Sharath_muddishetty.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100010030_Sharath_muddishetty.pdf"
  },
  {
    "rollNumber": "25100030006",
    "studentName": "Baljeet Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030006_Baljeet_Singh.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030006_Baljeet_Singh.pdf"
  },
  {
    "rollNumber": "25100030008",
    "studentName": "Chaitanya Gunti",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030008_Chaitanya_Gunti.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030008_Chaitanya_Gunti.pdf"
  },
  {
    "rollNumber": "25100030009",
    "studentName": "Deepanita Sen",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100030009_Deepanita_Sen.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030009_Deepanita_Sen.pdf"
  },
  {
    "rollNumber": "25100030010",
    "studentName": "Deepanpreet Kaur",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030010_Deepanpreet_Kaur.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030010_Deepanpreet_Kaur.pdf"
  },
  {
    "rollNumber": "25100030012",
    "studentName": "Divya",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030012_Divya.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030012_Divya.pdf"
  },
  {
    "rollNumber": "25100030015",
    "studentName": "Janhvi Gupta",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030015_Janhvi_Gupta.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030015_Janhvi_Gupta.pdf"
  },
  {
    "rollNumber": "25100030016",
    "studentName": "Kashvi Kalra",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100030016_Kashvi_Kalra.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030016_Kashvi_Kalra.pdf"
  },
  {
    "rollNumber": "25100030017",
    "studentName": "K Ram Koushil",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030017_K_Ram_Koushil.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030017_K_Ram_Koushil.pdf"
  },
  {
    "rollNumber": "25100030018",
    "studentName": "Kavita Manwal",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030018_Kavita_manwal.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030018_Kavita_manwal.pdf"
  },
  {
    "rollNumber": "25100030019",
    "studentName": "Madhu Sudhan",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030019_MADHU_SUDHAN.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030019_MADHU_SUDHAN.pdf"
  },
  {
    "rollNumber": "25100030020",
    "studentName": "Mehar",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030020_Mehar.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030020_Mehar.pdf"
  },
  {
    "rollNumber": "25100030021",
    "studentName": "Manideekshith Nalla",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030021_Manideekshith_Nalla.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030021_Manideekshith_Nalla.pdf"
  },
  {
    "rollNumber": "25100030022",
    "studentName": "Nalla Ramakrishna",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030022_Nalla_Ramakrishna.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030022_Nalla_Ramakrishna.pdf"
  },
  {
    "rollNumber": "25100030023",
    "studentName": "Parampreet Singh",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030023_Parampreet_Singh.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030023_Parampreet_Singh.pdf"
  },
  {
    "rollNumber": "25100030026",
    "studentName": "Sania Chauhan",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030026_Sania_Chauhan.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030026_Sania_Chauhan.pdf"
  },
  {
    "rollNumber": "25100030027",
    "studentName": "Sanidhya Chauhan",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100030027_Sanidhya_Chauhan.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030027_Sanidhya_Chauhan.pdf"
  },
  {
    "rollNumber": "25100030029",
    "studentName": "Saurabh Sharma",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030029_Saurabh_Sharma.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030029_Saurabh_Sharma.pdf"
  },
  {
    "rollNumber": "25100030031",
    "studentName": "Sheikh Masood Ahmad",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030031_Sheikh_Masood_Ahmad.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030031_Sheikh_Masood_Ahmad.pdf"
  },
  {
    "rollNumber": "25100030033",
    "studentName": "Tanish",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100030033_Tanish.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100030033_Tanish.pdf"
  },
  {
    "rollNumber": "25100110006",
    "studentName": "Akhlad Ali",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100110006_Akhlad_Ali.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100110006_Akhlad_Ali.pdf"
  },
  {
    "rollNumber": "25100110016",
    "studentName": "Anup Tripathi",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100110016_Anup_tripathi.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100110016_Anup_tripathi.pdf"
  },
  {
    "rollNumber": "25100110019",
    "studentName": "Arnav Kant Tiwari",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation Certificate",
    "fileName": "25100110019_ARNAV_Kant_tiwari.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100110019_ARNAV_Kant_tiwari.pdf"
  },
  {
    "rollNumber": "25100110102",
    "studentName": "Shahzeb",
    "eventId": "prarambh-2026",
    "eventName": "Prarambh 2026: Capture The Flag (CTF)",
    "division": "2nd Year Division",
    "certificateType": "Participation & Merit Certificate",
    "fileName": "25100110102_Shahzeb.pdf",
    "filePath": "/certificates/CTF-2nd_certificate/25100110102_Shahzeb.pdf"
  }
];

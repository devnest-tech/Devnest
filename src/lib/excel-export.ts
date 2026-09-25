import * as XLSX from "xlsx";

export interface ExcelColumn<T> {
  header: string;
  accessor: (item: T) => string | number | boolean | null | undefined;
  width?: number;
}

export interface ExportToExcelOptions<T> {
  filename: string;
  sheetName?: string;
  data: T[];
  columns: ExcelColumn<T>[];
}

export interface ExcelSheetDef<T = any> {
  sheetName: string;
  data: T[];
  columns: ExcelColumn<T>[];
}

export interface ExportMultiSheetOptions {
  filename: string;
  sheets: ExcelSheetDef<any>[];
}

/**
 * Creates an XLSX worksheet with auto-computed or custom column widths.
 */
function createWorksheet<T>(data: T[], columns: ExcelColumn<T>[]): XLSX.WorkSheet {
  const headers = columns.map((col) => col.header);
  const rows = data.map((item) =>
    columns.map((col) => {
      const val = col.accessor(item);
      if (val === null || val === undefined) return "";
      return val;
    })
  );

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Set intelligent column widths
  worksheet["!cols"] = columns.map((col, colIndex) => {
    if (col.width) return { wch: col.width };

    let maxLen = col.header.length;
    const sampleLimit = Math.min(rows.length, 50);
    for (let r = 0; r < sampleLimit; r++) {
      const cellVal = String(rows[r][colIndex] || "");
      if (cellVal.length > maxLen) {
        maxLen = cellVal.length;
      }
    }
    return { wch: Math.min(Math.max(maxLen + 4, 12), 45) };
  });

  return worksheet;
}

/**
 * Exports data directly to an Excel (.xlsx) file with styled column widths and automatic download.
 */
export function exportToExcel<T>({
  filename,
  sheetName = "Sheet1",
  data,
  columns,
}: ExportToExcelOptions<T>): boolean {
  if (!data || data.length === 0) {
    return false;
  }

  const worksheet = createWorksheet(data, columns);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const finalFilename = filename.toLowerCase().endsWith(".xlsx")
    ? filename
    : `${filename}.xlsx`;

  XLSX.writeFile(workbook, finalFilename, { compression: true });
  return true;
}

/**
 * Exports multiple sheets into a single structured Excel (.xlsx) workbook.
 */
export function exportMultiSheetExcel({
  filename,
  sheets,
}: ExportMultiSheetOptions): boolean {
  const validSheets = sheets.filter((s) => s.data && s.data.length > 0);
  if (validSheets.length === 0) {
    return false;
  }

  const workbook = XLSX.utils.book_new();

  for (const sheet of validSheets) {
    const worksheet = createWorksheet(sheet.data, sheet.columns);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
  }

  const finalFilename = filename.toLowerCase().endsWith(".xlsx")
    ? filename
    : `${filename}.xlsx`;

  XLSX.writeFile(workbook, finalFilename, { compression: true });
  return true;
}

// ============================================================================
// Official University Event Attendance Format (Matches C:\Users\itz_Ansh\Downloads\format.xlsx)
// ============================================================================

export interface OfficialAttendanceParticipant {
  srNo?: number | string;
  teamCode?: string;
  participantName: string;
  school?: string;
  rollNumber: string | number;
  branch: string;
  sem: string;
  contactNo: string | number;
  email: string;
  signature?: string;
}

export interface OfficialAttendanceSheet {
  sheetName: string; // e.g. "CTF 3rd Year", "CTF 2nd Year ", "Tech Quiz"
  trackTitle: string; // e.g. "CTF 3rd Year", "CTF 2nd Year", "Tech Quiz"
  date?: string; // e.g. "23rd September 2026"
  participants: OfficialAttendanceParticipant[];
  minRows?: number; // Defaults to 20 to match format.xlsx template
}

export interface ExportOfficialAttendanceOptions {
  filename: string;
  eventName: string; // Dynamic event name e.g. "Prarambh" -> "Devnest Technical  Event Prarambh"
  institutionName?: string; // Defaults to "University School of Engineering & Technology, LTSU Punjab"
  defaultDate?: string; // Defaults to "23rd September 2026"
  sheets: OfficialAttendanceSheet[];
}

/**
 * Creates a single worksheet matching the exact format of C:\Users\itz_Ansh\Downloads\format.xlsx:
 * - Row 1 (Merged A1:J1): "University School of Engineering & Technology, LTSU Punjab"
 * - Row 2 (Merged A2:J2): "Devnest Technical  Event <EventName>"
 * - Row 3 (Merged A3:J3): "<TrackTitle> Registration ... Dated: <Date>"
 * - Row 4 (Headers A4:J4): Table column titles
 * - Rows 5+: Participant entries (padded with numbered empty rows if fewer than minRows)
 * - Footers: Student Coordinator, Faculty Coordinator, Faculty Co-Coordinator signatures
 */
export function createOfficialAttendanceWorksheet({
  eventName,
  institutionName = "University School of Engineering & Technology, LTSU Punjab",
  trackTitle,
  date = "23rd September 2026",
  participants = [],
  minRows = 20,
}: {
  eventName: string;
  institutionName?: string;
  trackTitle: string;
  date?: string;
  participants: OfficialAttendanceParticipant[];
  minRows?: number;
}): XLSX.WorkSheet {
  // Padding spaces for row 3 to place Dated on the right in merged cell, exactly like format.xlsx
  const padSpaces = " ".repeat(180);
  const row1 = [institutionName];

  // Dynamic Event Name: Automatically updates to whatever event is being processed
  const cleanEventName = (eventName || "Prarambh").trim();
  let eventHeading: string;
  if (/^devnest\s+technical\s+event/i.test(cleanEventName)) {
    eventHeading = cleanEventName;
  } else if (/^devnest/i.test(cleanEventName)) {
    eventHeading = cleanEventName;
  } else {
    eventHeading = `Devnest Technical  Event ${cleanEventName}`;
  }
  const row2 = [eventHeading];

  const row3 = [`${trackTitle} Registration${padSpaces}Dated  : ${date}  `];

  const row4 = [
    "Sr No ",
    "Code of Team (Number) G1/G2   -----",
    "Name of all Participant of the Team ",
    "Name of the school",
    "University Roll Number  ",
    "BRANCH",
    "SEM",
    "CONTACT NO ",
    "EMAIL ID ",
    "SIGNATURE ",
  ];

  const dataRows: any[][] = [];
  const targetRowCount = Math.max(minRows, participants.length);

  for (let i = 0; i < targetRowCount; i++) {
    const p = participants[i];
    if (p) {
      dataRows.push([
        p.srNo !== undefined && p.srNo !== null && p.srNo !== "" ? p.srNo : i + 1,
        p.teamCode || "",
        p.participantName || "",
        p.school || "USET",
        p.rollNumber || "",
        p.branch || "",
        p.sem || "",
        p.contactNo || "",
        p.email || "",
        p.signature || "",
      ]);
    } else {
      // Empty numbered row matching format.xlsx template for on-spot attendance/registration
      dataRows.push([i + 1, "", "", "", "", "", "", "", "", ""]);
    }
  }

  const footerRow1 = ["Student Coordinator Name and signature "];
  const footerRow2 = ["Faculty Coordinator Name & Signature : "];
  const footerRow3 = ["Faculty Co-Coordinator Name & Signature : "];

  const aoa = [row1, row2, row3, row4, ...dataRows, footerRow1, footerRow2, footerRow3];
  const worksheet = XLSX.utils.aoa_to_sheet(aoa);

  // Set merged cell ranges exactly matching format.xlsx
  const footer1Idx = 4 + dataRows.length;
  const footer2Idx = footer1Idx + 1;
  const footer3Idx = footer1Idx + 2;

  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }, // A1:J1 University Header
    { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } }, // A2:J2 Event Name
    { s: { r: 2, c: 0 }, e: { r: 2, c: 9 } }, // A3:J3 Registration & Date
    { s: { r: footer1Idx, c: 0 }, e: { r: footer1Idx, c: 2 } }, // Student Coordinator (A to C)
    { s: { r: footer2Idx, c: 0 }, e: { r: footer2Idx, c: 9 } }, // Faculty Coordinator (A to J)
    { s: { r: footer3Idx, c: 0 }, e: { r: footer3Idx, c: 9 } }, // Faculty Co-Coordinator (A to J)
  ];

  // Column widths for optimal visibility in Excel
  worksheet["!cols"] = [
    { wch: 8 },  // Sr No
    { wch: 24 }, // Code of Team
    { wch: 32 }, // Name of all Participant
    { wch: 14 }, // Name of the school
    { wch: 22 }, // University Roll Number
    { wch: 24 }, // BRANCH
    { wch: 10 }, // SEM
    { wch: 18 }, // CONTACT NO
    { wch: 32 }, // EMAIL ID
    { wch: 16 }, // SIGNATURE
  ];

  return worksheet;
}

/**
 * Exports official university event registrations to Excel matching C:\Users\itz_Ansh\Downloads\format.xlsx
 */
export function exportOfficialAttendanceExcel({
  filename,
  eventName,
  institutionName = "University School of Engineering & Technology, LTSU Punjab",
  defaultDate = "23rd September 2026",
  sheets,
}: ExportOfficialAttendanceOptions): boolean {
  if (!sheets || sheets.length === 0) {
    return false;
  }

  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    const worksheet = createOfficialAttendanceWorksheet({
      eventName,
      institutionName,
      trackTitle: sheet.trackTitle,
      date: sheet.date || defaultDate,
      participants: sheet.participants,
      minRows: sheet.minRows !== undefined ? sheet.minRows : 20,
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
  }

  const finalFilename = filename.toLowerCase().endsWith(".xlsx")
    ? filename
    : `${filename}.xlsx`;

  XLSX.writeFile(workbook, finalFilename, { compression: true });
  return true;
}

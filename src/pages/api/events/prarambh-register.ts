import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPrarambhRegistration,
  AcademicYear,
  CompetitionTrack,
} from "../../../../server/prarambh-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      fullName,
      email,
      phone,
      rollNumber,
      college,
      branch,
      course,
      specialization,
      section,
      year,
      competition,
      teamSize,
      teammateName,
      teammatePhone,
      teammateRollNumber,
      venue,
      teamName,
      handleOrGithub,
    } = req.body;

    // Validate required personal fields
    if (!fullName || !email || !phone || !rollNumber || !college || !year || !competition) {
      return res.status(400).json({
        error: "Missing required fields. Please fill in all required personal details including Roll Number.",
      });
    }

    // Validate compulsory course and specialization
    if (!course || !String(course).trim() || !specialization || !String(specialization).trim()) {
      return res.status(400).json({
        error: "Course and Specialization are compulsory. Please enter both manually.",
      });
    }

    // Validate compulsory section
    if (!section || !String(section).trim()) {
      return res.status(400).json({
        error: "Section is compulsory. Please enter your section manually.",
      });
    }

    // Validate team name: only compulsory for seniors (CTF), removed for Freshers (Tech Quiz)
    const isFresher = year === "1st Year" || competition === "tech-quiz";
    if (!isFresher && (!teamName || !String(teamName).trim())) {
      return res.status(400).json({
        error: "Please enter your Team / Squad Name.",
      });
    }

    // Validate Year
    const validYears: AcademicYear[] = ["1st Year", "2nd Year", "3rd Year"];
    if (!validYears.includes(year)) {
      return res.status(400).json({
        error: "Invalid academic year. Prarambh is open to 1st, 2nd, and 3rd year students.",
      });
    }

    // Validate Competition & Strict Eligibility Rules
    const validCompetitions: CompetitionTrack[] = ["tech-quiz", "ctf-2nd-year", "ctf-3rd-year"];
    if (!validCompetitions.includes(competition)) {
      return res.status(400).json({
        error: "Invalid competition track selected.",
      });
    }

    // Eligibility check:
    // 1st Year -> Tech Quiz only
    if (year === "1st Year" && competition !== "tech-quiz") {
      return res.status(400).json({
        error: "1st Year (Freshers) are strictly eligible for the Tech Quiz competition.",
      });
    }

    // 2nd Year -> CTF 2nd Year section only
    if (year === "2nd Year" && competition !== "ctf-2nd-year") {
      return res.status(400).json({
        error: "2nd Year students are strictly eligible for the Capture The Flag (CTF) 2nd Year Section.",
      });
    }

    // 3rd Year -> CTF 3rd Year section only
    if (year === "3rd Year" && competition !== "ctf-3rd-year") {
      return res.status(400).json({
        error: "3rd Year students are strictly eligible for the Capture The Flag (CTF) 3rd Year Section.",
      });
    }

    // Team Size and Teammate validation
    const parsedTeamSize: 1 | 2 = competition === "tech-quiz" ? 1 : (Number(teamSize) === 2 ? 2 : 1);
    if (parsedTeamSize === 2) {
      if (
        !teammateName ||
        !String(teammateName).trim() ||
        !teammatePhone ||
        !String(teammatePhone).trim() ||
        !teammateRollNumber ||
        !String(teammateRollNumber).trim()
      ) {
        return res.status(400).json({
          error: "Please provide the second team member's full name, phone number, and roll number for team size 2.",
        });
      }
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const defaultVenue = "IBM Lab in Lamrin Tech Skills University Punjab";
    const selectedVenue = venue ? String(venue).trim() : defaultVenue;

    const cleanCourse = String(course).trim();
    const cleanSpec = String(specialization).trim();
    const cleanSection = String(section).trim();
    const cleanBranch = branch && String(branch).trim()
      ? String(branch).trim()
      : `${cleanCourse} - ${cleanSpec} (${cleanSection})`;
    const resolvedTeamName = isFresher
      ? (teamName && String(teamName).trim() ? String(teamName).trim() : "Individual")
      : String(teamName).trim();

    const registration = await createPrarambhRegistration({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      rollNumber: String(rollNumber).trim().toUpperCase(),
      college: String(college).trim(),
      branch: cleanBranch,
      course: cleanCourse,
      specialization: cleanSpec,
      section: cleanSection,
      year: year as AcademicYear,
      competition: competition as CompetitionTrack,
      teamSize: parsedTeamSize,
      teammateName: parsedTeamSize === 2 ? String(teammateName).trim() : undefined,
      teammatePhone: parsedTeamSize === 2 ? String(teammatePhone).trim() : undefined,
      teammateRollNumber: parsedTeamSize === 2 ? String(teammateRollNumber).trim() : undefined,
      venue: selectedVenue,
      teamName: resolvedTeamName,
      handleOrGithub: handleOrGithub ? String(handleOrGithub).trim() : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully! Good luck for Prarambh 2026.",
      registration,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Prarambh registration error:", error);
    return res.status(500).json({ error: errMessage });
  }
}

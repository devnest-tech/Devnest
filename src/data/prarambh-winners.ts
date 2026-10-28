/**
 * Prarambh 2026 — Winners Data Configuration
 * 
 * Update this file to modify winner details (names, ranks, team names, image filenames, and achievements).
 * Place the corresponding photos in the designated folders inside `public/events/prarambh/winners/`:
 *   - Tech Quiz: `public/events/prarambh/winners/tech-quiz/`
 *   - CTF 2nd Year: `public/events/prarambh/winners/ctf-2nd-year/`
 *   - CTF 3rd Year: `public/events/prarambh/winners/ctf-3rd-year/`
 * 
 * Photos can be JPG, JPEG, PNG, or WebP.
 * Missing or pending photos will automatically display an elegant styled fallback.
 */

export interface WinnerRecord {
  id: string;
  name: string;
  rank: "1st Place" | "2nd Place" | "3rd Place" | string;
  image: string;
  team?: string;
  achievement?: string;
}

/**
 * Main Slide 1: Tech Quiz Winners (1st Year Freshers)
 */
export const techQuizWinners: WinnerRecord[] = [
  {
    id: "tq-1",
    name: "",
    rank: "1st Place",
    image: "/events/prarambh/winners/tech-quiz/first-place.jpg",
    team: "Madhur Pratap Singh",
    achievement: "Champion — Top score in Rapid-Fire Finale & Computing Fundamentals",
  },
  {
    id: "tq-2",
    name: "",
    rank: "2nd Place",
    image: "/events/prarambh/winners/tech-quiz/second-place.jpg",
    team: "Harshpreet Kaur",
    achievement: "Runner-Up — Outstanding performance in Algorithm Tracing Round",
  },
  {
    id: "tq-3",
    name: "",
    rank: "3rd Place",
    image: "/events/prarambh/winners/tech-quiz/third-place.jpg",
    team: "Atanu Mondal",
    achievement: "3rd Place — High accuracy in CS Fundamentals & Preliminary Rounds",
  },
];

/**
 * Main Slide 2, Subsection A: CTF 2nd Year Winners
 */
export const ctfSecondYearWinners: WinnerRecord[] = [
  {
    id: "ctf-2y-1",
    name: "Cyra",
    rank: "1st Place",
    image: "/events/prarambh/winners/ctf-2nd-year/first-place.jpg",
    team: "Kashvi and Deepanita",
    achievement: "1st Place — Highest cumulative flag captures in Web Exploitation & Crypto",
  },
  {
    id: "ctf-2y-2",
    name: "Blaze",
    rank: "2nd Place",
    image: "/events/prarambh/winners/ctf-2nd-year/second-place.jpg",
    team: "Shahzeb and Sanidhya",
    achievement: "Runner-Up — Solved complex Network Forensics & Sandbox Challenges",
  },
  {
    id: "ctf-2y-3",
    name: "Supr Mnds",
    rank: "3rd Place",
    image: "/events/prarambh/winners/ctf-2nd-year/third-place.jpg",
    team: "Sandeep and Swaroop",
    achievement: "3rd Place — Rapid reverse engineering & binary exploit solutions",
  },
];

/**
 * Main Slide 2, Subsection B: CTF 3rd Year Winners
 */
export const ctfThirdYearWinners: WinnerRecord[] = [
  {
    id: "ctf-3y-1",
    name: "Binary",
    rank: "1st Place",
    image: "/events/prarambh/winners/ctf-3rd-year/third-place.jpg",
    team: "Rajput Aman Singh and Bhumika Mehra",
    achievement: "Champions — Flawless flag submissions across all exploit vectors",
  },
  {
    id: "ctf-3y-2",
    name: "ShadowXhat",
    rank: "2nd Place",
    image: "/events/prarambh/winners/ctf-3rd-year/first-place.jpg",
    team: "Harman Singh and Gandapalli Upendra",
    achievement: "Runner-Up — Advanced web security exploitation & binary forensics",
  },
  {
    id: "ctf-3y-3",
    name: "A Square",
    rank: "3rd Place",
    image: "/events/prarambh/winners/ctf-3rd-year/second-place.jpg",
    team: "Asif Ansari and Akul Pratap Singh",
    achievement: "3rd Place — Rapid flag submission in cryptography & system security",
  },
];

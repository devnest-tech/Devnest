// Hall of Fame data module
// Provides typed event data, interfaces, and helpers for hall-of-fame pages.

export interface TeamMember {
  name: string;
  role?: string;
}

export interface WinnerTeam {
  teamName: string;
  position: string;
  members: TeamMember[];
  image: string;
  note?: string;
  event?: string;
  year?: string;
}

export interface EventStats {
  participants: string;
  teams?: string;
  topPrize: string;
}

export interface HallOfFameEvent {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  track: string;
  date: string;
  year: string;
  location: string;
  description: string;
  poster: string;
  tags: string[];
  stats: EventStats;
  certificateLink?: string;
  eventLink?: string;
  winners: WinnerTeam[];
}

export const hallOfFameEvents: HallOfFameEvent[] = [
  {
    slug: "prarambh-2026",
    title: "Prarambh 2026 — Tech Fest by DevNest",
    shortTitle: "Prarambh 2026",
    badge: "CTF & Tech Quiz",
    track: "Cybersecurity & CS Fundamentals",
    date: "September 2026",
    year: "2026",
    location: "Laptop Lab, LTSU",
    description:
      "DevNest's flagship annual tech fest featuring two competitive tracks: a high-voltage Tech Quiz for first-year students testing programming logic and CS fundamentals, and a Capture The Flag (CTF) tournament for seniors covering web exploitation, cryptography, network forensics, and binary reverse engineering.",
    poster: "/events/prarambh-2026-poster.jpg",
    tags: ["CTF", "Tech Quiz", "Cybersecurity", "Competitive", "Flagship"],
    stats: {
      participants: "90+",
      teams: "25+ Teams",
      topPrize: "Trophy + Certificate",
    },
    certificateLink: "/certificate-download",
    eventLink: "/events/prarambh",
    winners: [
      {
        teamName: "CipherSquad",
        position: "1st Place",
        members: [
          { name: "Rahul Verma", role: "CTF Lead" },
          { name: "Sneha Gupta", role: "Web Exploitation" },
        ],
        image: "/events/prarambh-2026-poster.jpg",
        note: "Solved all CTF challenges with the highest cumulative score.",
        event: "Prarambh 2026",
        year: "2026",
      },
      {
        teamName: "ByteBreakers",
        position: "2nd Place",
        members: [
          { name: "Arjun Sharma", role: "Team Lead" },
          { name: "Meera Nair", role: "Cryptography" },
        ],
        image: "/events/prarambh-2026-poster.jpg",
        event: "Prarambh 2026",
        year: "2026",
      },
      {
        teamName: "NetNinjas",
        position: "3rd Place",
        members: [
          { name: "Vikram Patel", role: "Team Lead" },
          { name: "Anjali Reddy", role: "Forensics" },
        ],
        image: "/events/prarambh-2026-poster.jpg",
        event: "Prarambh 2026",
        year: "2026",
      },
    ],
  },
  {
    slug: "promptathon-2026",
    title: "Promptathon 2026 — AI Innovation Challenge",
    shortTitle: "Promptathon 2026",
    badge: "Generative AI",
    track: "AI & Prompt Engineering",
    date: "February 2026",
    year: "2026",
    location: "LTSU Campus",
    description:
      "A cutting-edge hackathon where participants engineered creative prompts and built AI-powered solutions using large language models. Teams competed across domains including content generation, automation, and AI-assisted applications.",
    poster: "/events/promptathon/poster.png",
    tags: ["AI", "Prompt Engineering", "LLM", "Hackathon", "Innovation"],
    stats: {
      participants: "120+",
      teams: "30+ Teams",
      topPrize: "Cash Prize + Certificate",
    },
    certificateLink: "/certificate-download",
    eventLink: "/events",
    winners: [
      {
        teamName: "Team Alpha",
        position: "1st Place",
        members: [
          { name: "John Doe", role: "Team Lead" },
          { name: "Jane Smith", role: "Developer" },
          { name: "Mike Johnson", role: "Designer" },
        ],
        image: "/events/promptathon/20260225_104627.jpg",
        event: "Promptathon 2026",
        year: "2026",
      },
      {
        teamName: "Team Beta",
        position: "2nd Place",
        members: [
          { name: "Sarah Wilson", role: "Team Lead" },
          { name: "David Brown", role: "Developer" },
        ],
        image: "/events/promptathon/20260225_104627.jpg",
        event: "Promptathon 2026",
        year: "2026",
      },
      {
        teamName: "Team Gamma",
        position: "3rd Place",
        members: [
          { name: "Emily Davis", role: "Team Lead" },
          { name: "Chris Martin", role: "Developer" },
          { name: "Alex Turner", role: "Analyst" },
        ],
        image: "/events/promptathon/20260225_104627.jpg",
        event: "Promptathon 2026",
        year: "2026",
      },
    ],
  },
  {
    slug: "datadash-2024",
    title: "DataDash 2024 — Data Science Championship",
    shortTitle: "DataDash 2024",
    badge: "Data Science",
    track: "Analytics & Machine Learning",
    date: "2024",
    year: "2024",
    location: "LTSU Campus",
    description:
      "An intensive data science and analytics competition where teams tackled real-world datasets, built predictive models, and presented insights to a panel of judges. The event celebrated excellence in data analysis, visualization, and machine learning.",
    poster: "/events/datadash-poster.jpg",
    tags: [
      "Data Science",
      "Machine Learning",
      "Analytics",
      "Visualization",
      "Competition",
    ],
    stats: {
      participants: "80+",
      teams: "20+ Teams",
      topPrize: "Trophy + Certificate",
    },
    certificateLink: "/certificate-download",
    winners: [
      {
        teamName: "Data Wizards",
        position: "1st Place",
        members: [
          { name: "Priya Sharma", role: "Team Lead" },
          { name: "Rahul Kumar", role: "Data Scientist" },
          { name: "Anjali Patel", role: "Analyst" },
        ],
        image: "/events/datadash-poster.jpg",
        event: "DataDash 2024",
        year: "2024",
      },
      {
        teamName: "Analytics Masters",
        position: "2nd Place",
        members: [
          { name: "Vikram Singh", role: "Team Lead" },
          { name: "Sneha Gupta", role: "Data Engineer" },
        ],
        image: "/events/datadash-poster.jpg",
        event: "DataDash 2024",
        year: "2024",
      },
      {
        teamName: "Insight Innovators",
        position: "3rd Place",
        members: [
          { name: "Arjun Reddy", role: "Team Lead" },
          { name: "Meera Krishnan", role: "ML Engineer" },
          { name: "Rohan Verma", role: "Data Analyst" },
        ],
        image: "/events/datadash-poster.jpg",
        event: "DataDash 2024",
        year: "2024",
      },
    ],
  },
];

/**
 * Returns a single HallOfFameEvent by its slug, or undefined if not found.
 */
export function getEventBySlug(slug: string): HallOfFameEvent | undefined {
  return hallOfFameEvents.find((event) => event.slug === slug);
}

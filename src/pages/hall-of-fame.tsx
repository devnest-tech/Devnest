import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import Image from "next/image";
import { Trophy, Award, Users, Medal } from "lucide-react";
import ShinyText from "@/components/ShinyText";

interface TeamMember {
  name: string;
  role?: string;
}

interface WinnerTeam {
  teamName: string;
  position: string;
  members: TeamMember[];
  image: string;
  event: string;
  year: string;
}

export default function HallOfFamePage() {
  const winners: WinnerTeam[] = [
    // Promptathon Winners
    {
      teamName: "Team Alpha",
      position: "1st Place",
      members: [
        { name: "John Doe", role: "Team Lead" },
        { name: "Jane Smith", role: "Developer" },
        { name: "Mike Johnson", role: "Designer" },
      ],
      image: "/events/promptathon-winner-1.jpg",
      event: "Promptathon",
      year: "2024",
    },
    {
      teamName: "Team Beta",
      position: "2nd Place",
      members: [
        { name: "Sarah Wilson", role: "Team Lead" },
        { name: "David Brown", role: "Developer" },
      ],
      image: "/events/promptathon-winner-2.jpg",
      event: "Promptathon",
      year: "2024",
    },
    {
      teamName: "Team Gamma",
      position: "3rd Place",
      members: [
        { name: "Emily Davis", role: "Team Lead" },
        { name: "Chris Martin", role: "Developer" },
        { name: "Alex Turner", role: "Analyst" },
      ],
      image: "/events/promptathon-winner-3.jpg",
      event: "Promptathon",
      year: "2024",
    },

    // DataDash Winners
    {
      teamName: "Data Wizards",
      position: "1st Place",
      members: [
        { name: "Priya Sharma", role: "Team Lead" },
        { name: "Rahul Kumar", role: "Data Scientist" },
        { name: "Anjali Patel", role: "Analyst" },
      ],
      image: "/events/datadash-winner-1.jpg",
      event: "DataDash",
      year: "2024",
    },
    {
      teamName: "Analytics Masters",
      position: "2nd Place",
      members: [
        { name: "Vikram Singh", role: "Team Lead" },
        { name: "Sneha Gupta", role: "Data Engineer" },
      ],
      image: "/events/datadash-winner-2.jpg",
      event: "DataDash",
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
      image: "/events/datadash-winner-3.jpg",
      event: "DataDash",
      year: "2024",
    },
  ];

  const promptathonWinners = winners.filter(
    (w) => w.event === "Promptathon",
  );

  const datadashWinners = winners.filter(
    (w) => w.event === "DataDash",
  );

  const getPositionIcon = (position: string) => {
    if (position === "1st Place") {
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    }

    if (position === "2nd Place") {
      return <Medal className="w-6 h-6 text-gray-400" />;
    }

    if (position === "3rd Place") {
      return <Medal className="w-6 h-6 text-amber-700" />;
    }

    return <Award className="w-6 h-6 text-primary" />;
  };

  const getPositionColor = (position: string) => {
    if (position === "1st Place") {
      return "from-yellow-500 to-amber-500";
    }

    if (position === "2nd Place") {
      return "from-gray-400 to-gray-500";
    }

    if (position === "3rd Place") {
      return "from-amber-700 to-amber-800";
    }

    return "from-primary to-primary/70";
  };

  return (
    <Layout>
      <Head>
        <title>DevNest | Hall of Fame & Competition Champions</title>
        <meta
          name="description"
          content="Celebrating our champions — Winners of DevNest Promptathon and DataDash hackathons."
        />
      </Head>

      <div className="relative min-h-screen py-16 sm:py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Header */}
          <div className="text-left mb-16 max-w-3xl">
            <div className="badge-pill mb-4">
              <Trophy className="w-3.5 h-3.5 text-primary" />
              <span>DevNest Champions Gallery</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Honor Roll</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 text-foreground">
              Hall of <span className="text-gradient-primary">Fame</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Celebrating our top performers and hackathon victors. These student squads pushed
              technical boundaries, built innovative solutions under time pressure, and set new
              benchmarks for DevNest excellence.
            </p>
          </div>

          {/* Promptathon Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">
                  Promptathon Champions
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Masters of AI Prompt Engineering & Creative AI Logic • 2024
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {promptathonWinners.map((team, index) => (
                <div
                  key={index}
                  className="group relative glass-panel rounded-3xl overflow-hidden border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Position Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${getPositionColor(
                        team.position,
                      )} text-white font-bold text-xs shadow-md`}
                    >
                      {getPositionIcon(team.position)}
                      <span>{team.position}</span>
                    </div>
                  </div>

                  {/* Team Photo */}
                  <div className="relative h-56 bg-secondary/50 overflow-hidden border-b border-border/50">
                    <Image
                      src={team.image}
                      alt={`${team.teamName} - ${team.position}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-team.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>

                  {/* Team Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-bold font-poppins text-foreground">
                          {team.teamName}
                        </h3>
                      </div>

                      {/* Team Members */}
                      <div className="space-y-1.5 mb-4">
                        {team.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-secondary/50 border border-border/40"
                          >
                            <span className="font-semibold text-foreground">
                              {member.name}
                            </span>
                            {member.role && (
                              <span className="text-[11px] text-muted-foreground font-medium">
                                {member.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Badge */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      <span className="font-medium">
                        {team.event} • {team.year}
                      </span>
                      <Trophy className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DataDash Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">
                  DataDash Champions
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Data Science Excellence & Analytics Innovation • 2024
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {datadashWinners.map((team, index) => (
                <div
                  key={index}
                  className="group relative glass-panel rounded-3xl overflow-hidden border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Position Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${getPositionColor(
                        team.position,
                      )} text-white font-bold text-xs shadow-md`}
                    >
                      {getPositionIcon(team.position)}
                      <span>{team.position}</span>
                    </div>
                  </div>

                  {/* Team Photo */}
                  <div className="relative h-56 bg-secondary/50 overflow-hidden border-b border-border/50">
                    <Image
                      src={team.image}
                      alt={`${team.teamName} - ${team.position}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-team.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>

                  {/* Team Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-bold font-poppins text-foreground">
                          {team.teamName}
                        </h3>
                      </div>

                      {/* Team Members */}
                      <div className="space-y-1.5 mb-4">
                        {team.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-secondary/50 border border-border/40"
                          >
                            <span className="font-semibold text-foreground">
                              {member.name}
                            </span>
                            {member.role && (
                              <span className="text-[11px] text-muted-foreground font-medium">
                                {member.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Badge */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      <span className="font-medium">
                        {team.event} • {team.year}
                      </span>
                      <Trophy className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center glass-panel rounded-3xl p-8 sm:p-12 border border-border/80 shadow-premium max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
              <Trophy className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
              Want to Join the Hall of Fame?
            </h3>

            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              Register for our next flagship competition, build something remarkable, and claim your place among DevNest champions.
            </p>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-xs sm:text-sm shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
            >
              <span>Explore Upcoming Hackathons</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
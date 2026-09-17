import Link from "next/link";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { TeamCard } from "@/components/TeamCard";
import teamData from "@/data/team.json";
import { openJoinCommunityModal } from "@/components/JoinCommunityDialog";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  designation: string;
  bio: string;
  image: string;
  imagePosition?: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

interface TeamData {
  coreTeam: TeamMember[];
  alumni: TeamMember[];
}

interface TeamProps {
  limit?: number;
}

export function Team({ limit }: TeamProps) {
  const team: TeamMember[] = limit ? teamData.coreTeam.slice(0, limit) : teamData.coreTeam;

  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-2xl">
            <div className="badge-pill mb-4">
              <Users className="w-3.5 h-3.5 text-foreground" />
              <span>Leadership Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-tight text-foreground">
              Core <span className="text-gradient-primary">Council</span>
            </h2>

            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              Student builders, mentors, and ambassadors coordinating workshops, open source, and hackathons.
            </p>
          </div>

          <div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl text-xs font-semibold text-foreground transition-all duration-200 group cursor-pointer"
            >
              <span>View All Members &amp; Alumni</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Team Grid with Interactive Hover Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Bottom Callout CTA */}
        <div className="mt-16 glass-panel rounded-3xl p-6 sm:p-8 border border-border/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5 text-primary font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Leadership</span>
            </div>
            <h4 className="font-bold text-foreground text-lg sm:text-xl font-poppins">
              Want to join our core council?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              We are constantly seeking passionate domain leads, open source contributors, and workshop mentors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openJoinCommunityModal()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Apply for Core Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
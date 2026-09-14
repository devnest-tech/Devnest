import Link from "next/link";
import { Code2, Cpu, Users, Terminal, ArrowRight } from "lucide-react";

export function HomeHighlights() {
  const highlights = [
    {
      icon: Code2,
      title: "Hackathons & CTFs",
      description:
        "High-stakes engineering sprints and competitive challenges that push practical skills to production level.",
    },
    {
      icon: Cpu,
      title: "Hands-on Workshops",
      description:
        "Intensive labs across Artificial Intelligence, Cloud DevOps, Cybersecurity, and Fullstack Architecture.",
    },
    {
      icon: Terminal,
      title: "Open Source Projects",
      description:
        "Student-driven products and software tools built collaboratively from ideation to deployment.",
    },
    {
      icon: Users,
      title: "Industry Mentorship",
      description:
        "Direct guidance, tech talks, and project reviews with alumni and Google Campus Ambassadors.",
    },
  ];

  return (
    <section className="relative pt-4 sm:pt-6 pb-16 sm:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div className="max-w-2xl">
            <div className="badge-pill mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Core Initiatives</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold tracking-tight text-foreground">
              What We <span className="text-gradient-primary">Build &amp; Learn</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              Empowering LTSU student developers through practical craft, competitive hackathons,
              and collaborative software engineering.
            </p>
          </div>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl text-xs font-semibold text-foreground transition-all duration-200 group cursor-pointer"
            >
              <span>Our Full Mission &amp; Foundation</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* 4 Clean Frosted Glass Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl p-5 sm:p-6 hover-lift border border-white/12 hover:border-white/25 shadow-subtle text-left flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-foreground mb-4 group-hover:bg-white/[0.12] transition-colors duration-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-base font-poppins font-bold text-foreground mb-1.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

  const highlightColors = [
    { bg: "bg-[#FFE600]", tag: "SPRINTS" },
    { bg: "bg-[#70D6FF]", tag: "HANDS-ON" },
    { bg: "bg-[#C4B5FD]", tag: "CODE" },
    { bg: "bg-[#88EA73]", tag: "NETWORK" },
  ];

  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE600] border-2 border-black text-xs font-bold tracking-wide shadow-[2px_2px_0px_#000] text-black mb-3">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Core Initiatives</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-black tracking-tight text-black">
              What We{" "}
              <span className="bg-[#FFE600] text-black px-2.5 py-0.5 rounded-md border-2 border-black shadow-[3px_3px_0px_#000] inline-block -rotate-1">
                Build &amp; Learn
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-800 mt-2 leading-relaxed font-medium">
              Empowering LTSU student developers through practical craft, competitive hackathons,
              and collaborative software engineering.
            </p>
          </div>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-black bg-white hover:bg-[#FFE600] text-xs font-bold text-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 group cursor-pointer"
            >
              <span>Our Full Mission &amp; Foundation</span>
              <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Clean Neobrutalism Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const color = highlightColors[index % highlightColors.length];
            return (
              <div
                key={index}
                className="rounded-2xl p-6 bg-white border-2 border-black shadow-[5px_5px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] transition-all duration-150 text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${color.bg} border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black`}>
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-black bg-[#FAF7EE] text-black shadow-[1px_1px_0px_#000]">
                      {color.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-space font-bold text-black mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
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

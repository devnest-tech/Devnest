import {
  Lightbulb,
  Heart,
  Code,
  Users,
  Rocket,
  Zap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function About() {
  const timeline = [
    {
      year: "Founded",
      title: "DevNest Established",
      description:
        "The official Technical Club of Lamrin Tech Skills University (LTSU) Punjab, inspiring students to explore the limitless world of technology.",
      icon: "🚀",
    },
    {
      year: "Initiative",
      title: "Google Campus Ambassador Led",
      description:
        "Led by Google Campus Ambassadors, DevNest stands as a student-driven initiative dedicated to hands-on learning and innovation.",
      icon: "🎯",
    },
    {
      year: "Domains",
      title: "Multi-Domain Excellence",
      description:
        "Bringing together passionate minds in AI, Cybersecurity, Cloud Computing, Data Science, and Web Development.",
      icon: "🌐",
    },
    {
      year: "Vision",
      title: "Preparing Digital Leaders",
      description:
        "Empowering every student to lead in the digital era through collaboration, creativity, and technical excellence.",
      icon: "🏆",
    },
  ];

  const values = [
    {
      icon: Rocket,
      title: "Collaboration",
      description:
        "Building together, growing together. We believe in the power of teamwork and shared innovation.",
    },
    {
      icon: Lightbulb,
      title: "Curiosity",
      description:
        "Constantly exploring new technologies and pushing boundaries to create impactful solutions.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "Maintaining ethical standards in all our endeavors and fostering a supportive community.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Creating solutions that make a real difference through hands-on projects and real-world experiences.",
    },
  ];

  const activities = [
    {
      icon: Code,
      title: "Hackathons",
      description:
        "Compete, code, and collaborate to solve real-world challenges and earn certifications.",
    },
    {
      icon: Users,
      title: "Workshops & Bootcamps",
      description:
        "Hands-on sessions led by experts to explore trending technologies like AI, Cloud, and more.",
    },
    {
      icon: Rocket,
      title: "Tech Talks",
      description:
        "Conversations with innovators and industry leaders to inspire new ideas and insights.",
    },
    {
      icon: Zap,
      title: "Projects & Research",
      description:
        "Build practical solutions and research emerging technologies to stay ahead of the curve.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Section Header */}
        <div className="text-left mb-16 max-w-3xl">
          <div className="badge-pill mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>About DevNest</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-foreground/80 font-medium">Engineering Ethos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-tight mb-4 text-foreground">
            Empowering Next-Gen <span className="text-gradient-primary">Innovators</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            The premier technical society of Lamrin Tech Skills University Punjab, dedicated to
            real-world software development, industry readiness, and student leadership.
          </p>
        </div>

        {/* Mission, Vision, Student-Driven Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {/* Mission */}
          <div className="glass-panel rounded-3xl p-7 sm:p-8 hover-lift group border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] transition-all duration-200 text-left bg-white">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE600] border-2 border-black flex items-center justify-center text-2xl mb-6 shadow-[2px_2px_0px_#000]">
              <span>🎯</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 text-black">
              Our Mission
            </h3>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
              Learn by doing — we provide students with a platform to connect with the outer tech
              world, bridge theory with practice, and thrive through hands-on building.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-panel rounded-3xl p-7 sm:p-8 hover-lift group border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] transition-all duration-200 text-left bg-white">
            <div className="w-12 h-12 rounded-2xl bg-[#70D6FF] border-2 border-black flex items-center justify-center text-2xl mb-6 shadow-[2px_2px_0px_#000]">
              <span>🚀</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 text-black">
              Our Vision
            </h3>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
              Cultivating a relentless culture of curiosity, collaboration, and technical craft that
              prepares students to lead high-impact engineering worldwide.
            </p>
          </div>

          {/* Student-Driven */}
          <div className="glass-panel rounded-3xl p-7 sm:p-8 hover-lift group border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] transition-all duration-200 text-left bg-white">
            <div className="w-12 h-12 rounded-2xl bg-[#C4B5FD] border-2 border-black flex items-center justify-center text-2xl mb-6 shadow-[2px_2px_0px_#000]">
              <span>🌟</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 text-black">
              Student-Driven
            </h3>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
              A vibrant community led by Google Campus Ambassadors where builders from all departments
              collaborate, organize hackathons, and ship production software.
            </p>
          </div>
        </div>

        {/* What We Do Section (Left-Aligned Header) */}
        <div className="mb-20 sm:mb-24 text-left">
          <div className="mb-10">
            <div className="badge-pill mb-3">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Core Activities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-black">
              What We <span className="text-gradient-primary">Do</span>
            </h3>
            <p className="text-sm text-neutral-700 mt-1 max-w-xl font-medium">
              High-impact student initiatives running every semester across the university.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const cardColors = ["bg-[#FFE600]", "bg-[#70D6FF]", "bg-[#FF70A6]", "bg-[#88EA73]"];
              const color = cardColors[index % cardColors.length];

              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-6 hover-lift group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all duration-200 text-left bg-white"
                >
                  <div className={`w-11 h-11 rounded-xl ${color} border-2 border-black flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000] transition-all duration-200`}>
                    <Icon className="w-5 h-5 text-black" />
                  </div>

                  <h4 className="text-base sm:text-lg font-space font-bold mb-2 text-black">
                    {activity.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {activity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section (Left-Aligned Header) */}
        <div className="mb-20 sm:mb-24 text-left">
          <div className="mb-10">
            <div className="badge-pill mb-3">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Guiding Principles</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-black">
              Our Core <span className="text-gradient-primary">Values</span>
            </h3>
            <p className="text-sm text-neutral-700 mt-1 max-w-xl font-medium">
              The fundamental standards that guide our code, community, and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const cardColors = ["bg-[#FFE600]", "bg-[#70D6FF]", "bg-[#C4B5FD]", "bg-[#88EA73]"];
              const color = cardColors[index % cardColors.length];

              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-6 hover-lift group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all duration-200 text-left bg-white"
                >
                  <div className={`w-11 h-11 rounded-xl ${color} border-2 border-black flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000] transition-all duration-200`}>
                    <Icon className="w-5 h-5 text-black" />
                  </div>

                  <h4 className="text-base sm:text-lg font-space font-bold mb-2 text-black">
                    {value.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones / Foundation Timeline (Left-Aligned Structure) */}
        <div className="text-left">
          <div className="mb-12">
            <div className="badge-pill mb-3">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Milestones & History</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-black">
              Our <span className="text-gradient-primary">Foundation</span>
            </h3>
            <p className="text-sm text-neutral-700 mt-1 max-w-xl font-medium">
              How DevNest grew from a campus initiative into the flagship technical community of LTSU.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((event, index) => (
              <div
                key={index}
                className="glass-panel rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_#000] hover-lift hover:shadow-[6px_6px_0px_#000] transition-all text-left flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{event.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFE600] text-black text-[11px] font-bold uppercase tracking-wider border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      {event.year}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-space font-bold mb-2 text-black">
                    {event.title}
                  </h4>

                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
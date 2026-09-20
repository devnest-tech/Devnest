import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  Users,
  Zap,
  CalendarDays,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Instagram,
  Bell,
  Brain,
  Flag,
  Shield,
  Trophy,
} from "lucide-react";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PrarambhApplyDialog } from "@/components/PrarambhApplyDialog";
import { TechIcon } from "@/components/TechIcon";
import type { AcademicYear } from "../../../server/prarambh-storage";

const upcomingEvents: Array<{
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  domains: string[];
  capacity: string;
  highlights: string[];
  status: "open" | "closed";
  icon: string;
  registrationUrl: string;
  learnMoreUrl: string;
  isPrarambh?: boolean;
}> = [
  {
    id: 1,
    title: "Prarambh: Tech Quiz & Capture The Flag (CTF)",
    date: "To be determined",
    time: "09:30 AM – 05:30 PM",
    location: "IBM Lab in Lamrin Tech Skills University Punjab",
    description:
      "DevNest's signature flagship event for 2026! Featuring two parallel high-octane competitions: an exclusive Tech Quiz strictly limited to 1st Year (Freshers), and an elite Capture The Flag (CTF) tournament strictly limited to Seniors (with independent competitive sections for 2nd Year and 3rd Year).",
    domains: [
      "Tech Quiz (Freshers)",
      "CTF (2nd Year)",
      "CTF (3rd Year)",
      "Cybersecurity",
      "Competitive Logic",
      "Programming",
    ],
    capacity: "250+",
    highlights: [
      "Competition 1: Tech Quiz strictly limited to 1st Year (Freshers)",
      "Competition 2: Capture The Flag (CTF) strictly for Seniors",
      "Separate sections: 2nd Year Section & 3rd Year Section",
      "Individual and team rankings with live leaderboard",
      "Cash prizes, trophies & verified merit certificates",
    ],
    status: "open",
    icon: "🏆",
    registrationUrl: "/events#prarambh",
    learnMoreUrl: "/events#prarambh",
    isPrarambh: true,
  },
  {
    id: 3,
    title: "Designathon & Ideathon",
    date: "October 2026",
    time: "TBA",
    location: "On-Campus",
    description:
      "Unleash your creativity and innovation! Design stunning UI/UX solutions and pitch groundbreaking ideas that solve real-world problems. Perfect for designers, developers, and creative thinkers.",
    domains: [
      "UI/UX Design",
      "Product Design",
      "Innovation",
      "Prototyping",
      "Problem Solving",
    ],
    capacity: "80+",
    highlights: [
      "Two parallel tracks: Design & Ideas",
      "Mentorship from industry experts",
      "Prototype your concepts",
      "Present to judges panel",
    ],
    status: "open",
    icon: "🎨",
    registrationUrl: "mailto:devnest.techclub@gmail.com",
    learnMoreUrl: "/events",
  },
  {
    id: 4,
    title: "LeetCode Competition & Webathon",
    date: "November 2026",
    time: "TBA",
    location: "On-Campus",
    description:
      "A dual-track event combining competitive programming and web development. Solve algorithmic challenges on LeetCode while building stunning web applications. Showcase both your problem-solving and development skills.",
    domains: [
      "Competitive Programming",
      "Data Structures",
      "Algorithms",
      "Web Development",
      "Frontend",
    ],
    capacity: "120+",
    highlights: [
      "LeetCode-style programming challenges",
      "Web development hackathon track",
      "Time-bound competitions",
      "Recognition for both tracks",
    ],
    status: "open",
    icon: "💻",
    registrationUrl: "mailto:devnest.techclub@gmail.com",
    learnMoreUrl: "/events",
  },
  {
    id: 5,
    title: "Startup Hackathon",
    date: "December 2026",
    time: "TBA",
    location: "On-Campus",
    description:
      "Build the next big thing! A 24-48 hour hackathon focused on creating startup-ready products. From ideation to MVP, work with your team to develop innovative solutions that could become real startups.",
    domains: [
      "Entrepreneurship",
      "Full-Stack Development",
      "Product Development",
      "Business Strategy",
      "Pitching",
    ],
    capacity: "100+",
    highlights: [
      "Extended hackathon format",
      "Mentorship from startup founders",
      "Pitch to investors",
      "Seed funding opportunities for winners",
      "Networking with startup ecosystem",
    ],
    status: "open",
    icon: "🚀",
    registrationUrl: "mailto:devnest.techclub@gmail.com",
    learnMoreUrl: "/events",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "DataDash",
    date: "April 10, 2026",
    attendees: "100+",
    highlight:
      "A data-focused innovation challenge where students transformed insights into impact through analytics, creativity, and practical problem-solving.",
    icon: "📊",
    link: "/events/datadash",
  },
  {
    id: 2,
    title: "Promptathon in Yuva Kaushal",
    date: "February 25, 2026",
    attendees: "68",
    highlight:
      "A grand success! Students showcased exceptional AI prompt engineering skills, pushing the boundaries of AI communication and critical thinking.",
    icon: "⚡",
    link: "/events/promptathon-2026",
  },
  {
    id: 3,
    title: "Guest Speaker Event",
    date: "February 5, 2026",
    attendees: "150+",
    highlight:
      "Inspiring session with Amit Kumar Jaiswal, IIM Bangalore graduate and founder of aptitude360online",
    icon: "🎤",
    link: "/events/guest-speaker-feb",
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applyDefaultYear, setApplyDefaultYear] = useState<AcademicYear>("1st Year");

  const handleOpenApply = (year: AcademicYear = "1st Year") => {
    setApplyDefaultYear(year);
    setApplyDialogOpen(true);
  };

  return (
    <Layout>
      <Head>
        <title>DevNest | Events & Hackathons</title>
        <meta
          name="description"
          content="Explore upcoming tech hackathons, workshops, and flagship competitions organized by DevNest."
        />
      </Head>

      <div className="relative min-h-screen py-16 sm:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Header */}
          <header className="text-left mb-12">
            <div className="badge-pill mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>DevNest Events Calendar</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Flagship Sprints</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 text-foreground">
                  Events & <span className="text-gradient-primary">Hackathons</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Join our community hackathons, competitive coding sprints, workshops, and tech talks.
                  Build with fellow students, earn credentials, and showcase your engineering prowess.
                </p>
              </div>

              {/* Segmented Tabs Control */}
              <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] shrink-0 self-start lg:self-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("upcoming")}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                    activeTab === "upcoming"
                      ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] border-2 border-black"
                      : "text-black hover:bg-[#FAF7EE] border-2 border-transparent"
                  }`}
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Upcoming ({upcomingEvents.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("past")}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                    activeTab === "past"
                      ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] border-2 border-black"
                      : "text-black hover:bg-[#FAF7EE] border-2 border-transparent"
                  }`}
                >
                  <Award className="w-4 h-4 text-black" />
                  <span>Past ({pastEvents.length})</span>
                </button>
              </div>
            </div>

            {/* Schedule Banner */}
            <div>
              <Link href="/events/schedule" className="block group">
                <div className="rounded-2xl p-5 sm:p-6 border border-border/80 glass-panel hover:border-primary/40 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                      <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        Complete 2026 Event Schedule
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        February – June 2026 • 5 Major Flagship Events • Hackathons, Datathons & Expert Talks
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                    <span>View Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </header>

          {/* Upcoming Events Tab */}
          {activeTab === "upcoming" && (
            <div className="space-y-8">
              {upcomingEvents.length === 0 ? (
                <div className="glass-panel rounded-3xl p-12 text-center border border-border/80 max-w-md mx-auto">
                  <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    We&apos;re planning some exciting events! Check back soon for updates.
                  </p>
                  <Button onClick={() => setActiveTab("past")} className="gap-2">
                    <Award className="w-4 h-4" />
                    View Past Events
                  </Button>
                </div>
              ) : (
                upcomingEvents.map((event) =>
                  event.isPrarambh ? (
                    <article
                      key={event.id}
                      id="prarambh"
                      className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-primary/40 bg-gradient-to-br from-background via-background to-primary/5 shadow-premium hover:shadow-glow-primary transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Decorative Top Banner */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border/60">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-subtle flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5" />
                            DevNest Flagship Event 2026
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
                            Dual Competition
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                          <Calendar className="w-4 h-4" />
                          <span>To be determined</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Left Details */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <div className="flex items-center gap-3.5 mb-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0">
                                <Trophy className="w-6 h-6 text-black stroke-[2.5]" />
                              </div>
                              <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold tracking-tight text-foreground">
                                  Prarambh <span className="text-gradient-primary">2026</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-semibold text-primary">
                                  Tech Quiz (Freshers) &amp; Capture The Flag (Seniors)
                                </p>
                              </div>
                            </div>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
                              The definitive annual tech showdown of DevNest! Two distinct competition tracks tailored by academic tier to challenge, showcase, and elevate student developers.
                            </p>
                          </div>

                          {/* Two Competition Highlights Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Competition 1: Tech Quiz */}
                            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 hover:border-blue-500/40 transition-all flex flex-col justify-between gap-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                      <Brain className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground">Tech Quiz</h3>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 text-[10px] font-bold border border-blue-500/30">
                                      1st Year Only
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-semibold border border-border/70">
                                      Individual (Solo)
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  Exclusively limited to <strong className="text-foreground">1st Year (Freshers)</strong>. Multi-round contest on programming logic, algorithms, CS fundamentals, and rapid-fire questions.
                                </p>
                              </div>
                              <Button
                                type="button"
                                onClick={() => handleOpenApply("1st Year")}
                                variant="outline"
                                className="w-full text-xs font-semibold rounded-xl border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500 cursor-pointer"
                              >
                                Apply for Tech Quiz (Freshers)
                              </Button>
                            </div>

                            {/* Competition 2: CTF */}
                            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                      <Flag className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground">Capture The Flag (CTF)</h3>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold border border-emerald-500/30">
                                      Seniors Only
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-semibold border border-border/70">
                                      Team: 1 - 2
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  Strictly for <strong className="text-foreground">2nd Year &amp; 3rd Year Seniors</strong>. Distinct competitive sections: <span className="text-emerald-500 font-medium">2nd Year Section</span> and <span className="text-purple-500 font-medium">3rd Year Section</span>. Team size 1 to 2 members.
                                </p>
                              </div>
                              <Button
                                type="button"
                                onClick={() => handleOpenApply("2nd Year")}
                                variant="outline"
                                className="w-full text-xs font-semibold rounded-xl border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 cursor-pointer"
                              >
                                Apply for CTF (Seniors)
                              </Button>
                            </div>
                          </div>

                          {/* Metadata Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Date</span>
                              </div>
                              <span className="text-xs text-foreground font-bold truncate block">
                                To be determined
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Venue</span>
                              </div>
                              <span
                                className="text-xs text-foreground font-medium truncate block"
                                title="IBM Lab in Lamrin Tech Skills University Punjab"
                              >
                                IBM Lab, LTSU Punjab
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>Eligibility</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                1st, 2nd &amp; 3rd Years
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Zap className="w-3.5 h-3.5" />
                                <span>Perks</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                Trophies &amp; Medals
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Action / Apply Card */}
                        <div className="lg:col-span-1 rounded-2xl p-6 bg-secondary/70 border border-border/80 flex flex-col justify-between items-center text-center shadow-subtle">
                          <div className="w-full flex flex-col items-center">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 shadow-2xs">
                              <Trophy className="w-7 h-7" />
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold mb-2">
                              Registrations Open
                            </span>

                            <h4 className="text-base font-bold text-foreground mb-1">
                              Register for Prarambh
                            </h4>

                            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mb-4">
                              Select your year of study to be assigned automatically to your verified competition track.
                            </p>
                          </div>

                          <div className="w-full space-y-3">
                            <Button
                              type="button"
                              onClick={() => handleOpenApply("1st Year")}
                              className="w-full py-5 rounded-xl font-bold text-sm shadow-premium hover:shadow-glow-primary bg-primary text-primary-foreground active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>Apply for Prarambh</span>
                              <ArrowRight className="w-4 h-4" />
                            </Button>

                            <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-[11px] text-muted-foreground/90">
                              <Shield className="w-3.5 h-3.5 text-primary inline mr-1" />
                              <span>Official verified registrations • Free Entry</span>
                            </div>

                            <Link
                              href="/events/schedule"
                              className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <span>View Full Event Schedule</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ) : (
                    <article
                      key={event.id}
                      className="glass-panel rounded-3xl p-6 sm:p-8 border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-premium-hover transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Left Details */}
                        <div className="lg:col-span-2">
                          {/* Domain badges */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {event.domains.map((domain, idx) => (
                              <span
                                key={`${domain}-${idx}`}
                                className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold"
                              >
                                {domain}
                              </span>
                            ))}
                          </div>

                          {/* Title with icon */}
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0">
                              <TechIcon name={event.icon} className="w-6 h-6 text-black stroke-[2.3]" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-poppins font-bold tracking-tight text-foreground">
                              {event.title}
                            </h2>
                          </div>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                            {event.description}
                          </p>

                          {/* Metadata Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Timeline</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                {event.date}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Venue</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                {event.location}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>Capacity</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                {event.capacity} Slots
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-secondary/60 border border-border/60">
                              <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-0.5">
                                <Zap className="w-3.5 h-3.5" />
                                <span>Highlights</span>
                              </div>
                              <span className="text-xs text-foreground font-medium truncate block">
                                {event.highlights.length} Perks
                              </span>
                            </div>
                          </div>

                          {/* Highlights List */}
                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Event Highlights:
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                              {event.highlights.map((highlight, idx) => (
                                <div key={`${highlight}-${idx}`} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Registration / Status Card */}
                        <div className="lg:col-span-1 rounded-2xl p-6 bg-secondary/50 border border-border/60 flex flex-col justify-between items-center text-center">
                          <div className="w-full flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 mb-3">
                              <Bell className="w-6 h-6 animate-pulse" />
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
                              Registrations Opening Soon
                            </span>

                            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                              Keep your team ready! Registration links and problem statements will be announced across our official channels.
                            </p>
                          </div>

                          <div className="w-full mt-6 space-y-2">
                            <a
                              href={event.registrationUrl}
                              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
                            >
                              <span>Express Interest</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>

                            <Link
                              href="/events/schedule"
                              className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <span>See Schedule Details</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                )
              )}
            </div>
          )}

          {/* Past Events Tab */}
          {activeTab === "past" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-base text-muted-foreground">
                  Check out the impact and highlights from our past flagship initiatives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Link key={event.id} href={event.link} className="block group h-full">
                    <article className="glass-panel rounded-2xl p-6 border border-border/80 group-hover:border-primary/40 shadow-subtle group-hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#70D6FF] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0">
                            <TechIcon name={event.icon} className="w-5 h-5 text-black stroke-[2.3]" />
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                            <Users className="w-3 h-3" />
                            {event.attendees} participants
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-poppins text-foreground group-hover:text-primary transition-colors mb-1">
                          {event.title}
                        </h3>

                        <p className="text-xs text-muted-foreground font-medium mb-3">
                          {event.date}
                        </p>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {event.highlight}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Explore Event Recap</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Community Newsletter Section */}
          <section className="mt-20">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-border/80 shadow-premium max-w-3xl mx-auto text-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                  Never Miss a Flagship Hackathon
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                  Join our official WhatsApp group and follow us on Instagram for spot updates, registration windows, and mentor announcements.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/membership"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
                  >
                    <span>Join DevNest Community</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 border border-border/80 text-xs sm:text-sm font-semibold transition-all duration-200"
                  >
                    <Instagram className="w-4 h-4 text-primary" />
                    <span>Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Prarambh Registration Dialog */}
      <PrarambhApplyDialog
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        defaultYear={applyDefaultYear}
      />
    </Layout>
  );
}
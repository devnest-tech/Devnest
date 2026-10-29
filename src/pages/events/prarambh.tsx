import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Brain,
  Flag,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PrarambhWinnersShowcase } from "@/components/PrarambhWinnersShowcase";

export default function PrarambhEventPage() {
  const stats = [
    { label: "Participants", value: "90+", icon: Users, color: "bg-[#FFE600]" },
    { label: "Competition Tracks", value: "2 Tracks", icon: Trophy, color: "bg-[#70D6FF]" },
    { label: "Academic Divisions", value: "3 Years", icon: Brain, color: "bg-[#C4B5FD]" },
    { label: "Official Venue", value: "Laptop Lab", icon: MapPin, color: "bg-[#88EA73]" },
  ];

  const highlights = [
    {
      title: "Tech Quiz (Freshers Section)",
      badge: "1st Year Only • Solo",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      description:
        "High-voltage technical quiz testing programming logic, discrete math, data structures, algorithms, and computing fundamentals with an intense rapid-fire buzzer finale.",
      icon: Brain,
      highlights: [
        "Round 1: CS Fundamentals & Rapid MCQ Preliminary",
        "Round 2: Algorithm Tracing & Code Output Analysis",
        "Finale: Live Buzzer Rapid-Fire Showdown",
      ],
    },
    {
      title: "Capture The Flag (CTF) (Seniors Section)",
      badge: "2nd & 3rd Year • Solo/Duo",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
      description:
        "Comprehensive cybersecurity tournament featuring sandboxed challenges in web exploitation, cryptographic puzzles, network forensics, and binary reverse engineering.",
      icon: Flag,
      highlights: [
        "Independent scoring sections for 2nd Year & 3rd Year",
        "Web Vulnerability Exploitation & Injection vectors",
        "Real-time dynamic scoreboard & judge verification",
      ],
    },
  ];

  return (
    <Layout>
      <Head>
        <title>DevNest | Prarambh 2026 — Tech Quiz & Capture The Flag</title>
        <meta
          name="description"
          content="Official recap and achievements from Prarambh 2026: Tech Quiz & Capture The Flag (CTF) flagship competition organized by DevNest at LTSU Punjab."
        />
      </Head>

      <div className="min-h-screen py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Events</span>
            </Link>
          </div>

          {/* Hero Header */}
          <div className="space-y-4 mb-10 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600] text-black border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000]">
                <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
                FLAGSHIP 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Event Concluded
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black tracking-tight text-foreground">
              Prarambh 2026: <span className="text-gradient-primary">Tech Quiz &amp; CTF</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              DevNest&apos;s premier annual showdown featuring two parallel high-octane competitions: an exclusive Tech Quiz strictly for 1st Year Freshers, and an elite Capture The Flag (CTF) tournament for Seniors across 2nd and 3rd Year divisions.
            </p>
          </div>

          {/* Event Concluded Notification Banner */}
          <div className="rounded-2xl p-4 sm:p-5 border-2 border-black bg-[#88EA73] shadow-[4px_4px_0px_#000] text-black mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-[#88EA73] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Registrations for Prarambh 2026 are officially closed.
                </p>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  The competition has been successfully completed. Participant certificates and merit rankings are live.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                asChild
                size="sm"
                className="w-full sm:w-auto bg-black text-white hover:bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-xs"
              >
                <Link href="/certificate-download" className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Download Certificate</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Content Grid: Left poster, Right highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-12 space-y-6">

              {/* Winners Showcase Section */}
              <PrarambhWinnersShowcase />

              {/* Schedule and Roadmap Link */}
              <div className="rounded-2xl p-5 border-2 border-black bg-secondary/50 shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Looking for the full timeline &amp; activity roadmap?
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Review phase-by-phase execution of rounds and jury evaluations.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-2 border-black bg-white hover:bg-[#FFE600] text-black font-bold text-xs shadow-[2px_2px_0px_#000]"
                >
                  <Link href="/events/schedule" className="flex items-center gap-1.5">
                    <span>View Schedule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-8 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Explore DevNest Upcoming Hackathons</span>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                asChild
                className="rounded-xl font-bold bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59]"
              >
                <Link href="/certificate-download" className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Verify / Download Certificate</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

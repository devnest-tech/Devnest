import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import {
  Trophy,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { hallOfFameEvents, HallOfFameEvent } from "@/data/hall-of-fame";

export default function HallOfFamePage() {
  return (
    <Layout>
      <Head>
        <title>DevNest | Hall of Fame &amp; Competition Champions</title>
        <meta
          name="description"
          content="Celebrating our champions — Select an event from the DevNest Hall of Fame to explore winners, podium rankings, and squad details."
        />
      </Head>

      <div className="relative min-h-screen py-12 sm:py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section matching Neobrutalism theme */}
          <div className="text-left mb-12 sm:mb-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE600] text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#000] mb-4">
              <Trophy className="w-3.5 h-3.5 text-black" />
              <span>DevNest Champions Gallery</span>
              <span className="text-black/60">•</span>
              <span className="text-black font-extrabold">Honor Roll</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight mb-4 text-black flex flex-wrap items-center gap-2 sm:gap-3">
              <span>Hall of</span>
              <span className="inline-block px-4 py-1 rounded-2xl bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_#000]">
                Fame
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              Celebrating our top performers and hackathon victors. These student squads pushed
              technical boundaries, built innovative solutions under time pressure, and set new
              benchmarks for DevNest excellence.
            </p>
          </div>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 sm:mb-16">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Featured Events
              </span>
              <span className="text-2xl sm:text-3xl font-black font-poppins text-black">
                {hallOfFameEvents.length} Competitions
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Total Turnout
              </span>
              <span className="text-2xl sm:text-3xl font-black font-poppins text-black">
                360+ Students
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Credentials
              </span>
              <span className="text-2xl sm:text-3xl font-black font-poppins text-emerald-700">
                100% Verified
              </span>
            </div>
          </div>

          {/* Section Divider & Instructions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b-2 border-black/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-poppins font-black text-black">
                  Select an Event to View Winners
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                Click any competition card below to open its dedicated winners showcase and podium ranks.
              </p>
            </div>

            <span className="px-3 py-1 rounded-xl bg-[#FAF7EE] text-xs font-bold text-black border border-black/30">
              Click to Open
            </span>
          </div>

          {/* Grid Menu of Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {hallOfFameEvents.map((event: HallOfFameEvent) => (
              <Link
                key={event.slug}
                  href={`/hall-of-fame/${event.slug}`}
                  className="group relative rounded-3xl bg-white border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Event Poster Banner */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-b-2 border-black bg-neutral-900">
                    <Image
                      src={event.poster}
                      alt={`${event.title} Poster`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    {/* Badges on Top */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-md bg-black/85 backdrop-blur-sm text-[#FFE600] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#FFE600]/40 shadow-sm">
                        Official Poster
                      </span>

                      <span className="px-3 py-1 rounded-md bg-[#FFE600] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
                        {event.badge}
                      </span>
                    </div>

                    {/* Bottom Info on Poster */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white text-xs font-bold">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20">
                        <Calendar className="w-3.5 h-3.5 text-[#FFE600]" />
                        {event.date}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-[#FFE600]" />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Track Category Pill */}
                      <div className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF7EE] border border-black/30 text-xs font-bold text-neutral-800 mb-2.5">
                        {event.track}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl sm:text-2xl font-black font-poppins text-black mb-3 leading-snug group-hover:underline">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium line-clamp-3 mb-6">
                        {event.description}
                      </p>
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-4 border-t-2 border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600">
                        <Users className="w-3.5 h-3.5 text-black" />
                        <span>{event.stats.participants} Participated</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFE600] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] group-hover:shadow-[3px_3px_0px_#000] group-hover:bg-[#FFDE59] transition-all">
                        <span>View Winners</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center rounded-3xl p-8 sm:p-12 bg-white border-2 border-black shadow-[5px_5px_0px_#000] max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black mx-auto mb-4">
              <Trophy className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-poppins font-black text-black mb-3">
              Want to Join the Hall of Fame?
            </h3>

            <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto leading-relaxed font-medium">
              Register for our next flagship competition, build something remarkable, and claim your place among DevNest champions.
            </p>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE600] hover:bg-[#FFDE59] text-black rounded-xl font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200"
            >
              <span>Explore Upcoming Hackathons</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
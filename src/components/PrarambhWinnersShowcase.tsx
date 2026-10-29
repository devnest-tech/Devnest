import { useState, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import {
  Trophy,
  Medal,
  Award,
  Brain,
  Flag,
  Users,
  Sparkles,
  Shield,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import {
  WinnerRecord,
  techQuizWinners,
  ctfSecondYearWinners,
  ctfThirdYearWinners,
} from "@/data/prarambh-winners";

type MainTabType = "tech-quiz" | "ctf";
type CtfYearType = "2nd-year" | "3rd-year";

interface WinnerCardProps {
  winner: WinnerRecord;
  isFirstPlace?: boolean;
}

function WinnerCard({ winner, isFirstPlace = false }: WinnerCardProps) {
  const [imageError, setImageError] = useState(false);

  // Determine badge styling based on rank
  const is1st = winner.rank.toLowerCase().includes("1st");
  const is2nd = winner.rank.toLowerCase().includes("2nd");
  const is3rd = winner.rank.toLowerCase().includes("3rd");

  const getRankBadge = () => {
    if (is1st) {
      return {
        badgeClass: "bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black",
        icon: <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />,
        label: winner.rank,
      };
    }
    if (is2nd) {
      return {
        badgeClass: "bg-slate-200 text-slate-900 border-2 border-black shadow-[2px_2px_0px_#000] font-bold",
        icon: <Medal className="w-3.5 h-3.5 stroke-[2.5]" />,
        label: winner.rank,
      };
    }
    if (is3rd) {
      return {
        badgeClass: "bg-amber-100 text-amber-950 border-2 border-black shadow-[2px_2px_0px_#000] font-bold",
        icon: <Medal className="w-3.5 h-3.5 stroke-[2.5]" />,
        label: winner.rank,
      };
    }
    return {
      badgeClass: "bg-neutral-100 text-neutral-900 border-2 border-black shadow-[2px_2px_0px_#000] font-bold",
      icon: <Award className="w-3.5 h-3.5 stroke-[2.5]" />,
      label: winner.rank,
    };
  };

  const rankInfo = getRankBadge();

  return (
    <div
      className={`group relative bg-white rounded-2xl border-2 border-black overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 ${isFirstPlace
        ? "shadow-[5px_5px_0px_#000] ring-2 ring-[#FFE600]/80"
        : "shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
        }`}
    >
      {/* 1st Place Highlight Tag */}
      <div className="bg-[#FFE600] px-3 py-1 border-b-2 border-black flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-black">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 stroke-[2.5]" />
          {is1st
            ? "First Place Winner"
            : is2nd
              ? "Second Place Winner"
              : is3rd
                ? "Third Place Winner"
                : `${winner.rank} Winner`}
        </span>

        {isFirstPlace && (
          <span className="text-[10px] bg-black text-[#FFE600] px-1.5 py-0.5 rounded font-mono font-bold">
            CHAMPION
          </span>
        )}

      </div>

      {/* Winner Photo Area */}
      <div className="relative aspect-video w-full bg-[#FAF7EE] border-b-2 border-black overflow-hidden">
        {/* Rank Badge Floating on Top Right */}
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${rankInfo.badgeClass}`}>
            {rankInfo.icon}
            <span>{rankInfo.label}</span>
          </span>
        </div>

        {!imageError && winner.image ? (
          <img
            src={winner.image}
            alt={`${winner.name} — ${winner.rank}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          /* Graceful Neobrutalist Fallback when photo is missing / pending */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none bg-[#FAF7EE] relative">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black mb-2">
              {is1st ? (
                <Trophy className="w-6 h-6 text-[#FFE600] fill-[#FFE600] stroke-black stroke-[1.8]" />
              ) : (
                <ImageIcon className="w-6 h-6 text-neutral-400 stroke-[2]" />
              )}
            </div>
            <p className="text-xs font-black text-black">Photograph Pending</p>
            <p className="text-[10px] font-bold text-neutral-500 font-mono mt-0.5">
              To be uploaded
            </p>
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex flex-col text-left bg-white">
        {/* Winner Name and Team */}
        <div>
          <h4 className="font-poppins font-black text-base sm:text-lg text-black leading-snug break-words">
            {winner.name}
          </h4>

          {winner.team && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 mt-1.5">
              <Users className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="truncate">{winner.team}</span>
            </div>
          )}
        </div>

        {/* Achievement Description */}
        {winner.achievement && (
          <div className="mt-3 pt-2.5 border-t border-black/10 text-xs text-neutral-600 font-medium leading-relaxed">
            {winner.achievement}
          </div>
        )}
      </div>
    </div>
  );
}

export function PrarambhWinnersShowcase() {
  const [mainTab, setMainTab] = useState<MainTabType>("tech-quiz");
  const [ctfYear, setCtfYear] = useState<CtfYearType>("2nd-year");

  // Keyboard navigation for main tabs
  const mainTabListRef = useRef<HTMLDivElement>(null);
  const ctfTabListRef = useRef<HTMLDivElement>(null);

  const handleMainTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextTab = mainTab === "tech-quiz" ? "ctf" : "tech-quiz";
      setMainTab(nextTab);
    }
  };

  const handleCtfTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextYear = ctfYear === "2nd-year" ? "3rd-year" : "2nd-year";
      setCtfYear(nextYear);
    }
  };

  // Select active winners dataset
  const currentWinners: WinnerRecord[] =
    mainTab === "tech-quiz"
      ? techQuizWinners
      : ctfYear === "2nd-year"
        ? ctfSecondYearWinners
        : ctfThirdYearWinners;

  return (
    <section
      aria-label="Prarambh 2026 Winners Showcase"
      className="space-y-5 pt-3 text-left"
    >
      {/* Section Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE600] text-black border-2 border-black text-[11px] font-black uppercase shadow-[2px_2px_0px_#000]">
          <Trophy className="w-3 h-3 stroke-[2.5]" />
          Official Results
        </div>
        <h2 className="text-xl sm:text-2xl font-poppins font-black text-foreground">
          Prarambh 2026 — Winners Showcase
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
          DevNest celebrates the standout performers, problem-solvers, and cyber defense champions who conquered the competitive arenas at LTSU Punjab.
        </p>
      </div>

      {/* Main Slide Navigation Tabs */}
      <div
        ref={mainTabListRef}
        role="tablist"
        aria-label="Prarambh Winners Competition Tracks"
        className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 bg-[#FAF7EE] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000]"
      >
        {/* Main Tab 1: Tech Quiz Winners */}
        <button
          type="button"
          role="tab"
          id="tab-tech-quiz"
          aria-selected={mainTab === "tech-quiz"}
          aria-controls="panel-tech-quiz"
          tabIndex={mainTab === "tech-quiz" ? 0 : -1}
          onClick={() => setMainTab("tech-quiz")}
          onKeyDown={handleMainTabKeyDown}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-black text-xs sm:text-sm font-black transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${mainTab === "tech-quiz"
            ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
            : "bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black shadow-none border-transparent"
            }`}
        >
          <Brain className="w-4 h-4 stroke-[2.4] shrink-0" />
          <span className="truncate">Tech Quiz Winners</span>
          <span className="hidden md:inline-block text-[10px] px-1.5 py-0.2 rounded-full border border-black/30 font-bold opacity-80">
            1st Year
          </span>
        </button>

        {/* Main Tab 2: CTF Winners */}
        <button
          type="button"
          role="tab"
          id="tab-ctf"
          aria-selected={mainTab === "ctf"}
          aria-controls="panel-ctf"
          tabIndex={mainTab === "ctf" ? 0 : -1}
          onClick={() => setMainTab("ctf")}
          onKeyDown={handleMainTabKeyDown}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-black text-xs sm:text-sm font-black transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${mainTab === "ctf"
            ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
            : "bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black shadow-none border-transparent"
            }`}
        >
          <Flag className="w-4 h-4 stroke-[2.4] shrink-0" />
          <span className="truncate">CTF Winners</span>
          <span className="hidden md:inline-block text-[10px] px-1.5 py-0.2 rounded-full border border-black/30 font-bold opacity-80">
            2nd &amp; 3rd Year
          </span>
        </button>
      </div>

      {/* CTF Subsections (Year Tabs) — Visible when CTF Winners is active */}
      {mainTab === "ctf" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            <span className="text-xs font-bold text-neutral-800">
              Select CTF Division:
            </span>
          </div>

          <div
            ref={ctfTabListRef}
            role="tablist"
            aria-label="CTF Year Divisions"
            className="inline-flex items-center gap-2 self-start sm:self-auto"
          >
            {/* 2nd Year Winners Sub-tab */}
            <button
              type="button"
              role="tab"
              id="subtab-ctf-2nd"
              aria-selected={ctfYear === "2nd-year"}
              aria-controls="panel-ctf-content"
              tabIndex={ctfYear === "2nd-year" ? 0 : -1}
              onClick={() => setCtfYear("2nd-year")}
              onKeyDown={handleCtfTabKeyDown}
              className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${ctfYear === "2nd-year"
                ? "bg-black text-[#FFE600] shadow-[2px_2px_0px_#000]"
                : "bg-white text-neutral-700 hover:bg-neutral-100 shadow-[1px_1px_0px_#000]"
                }`}
            >
              2nd Year Winners
            </button>

            {/* 3rd Year Winners Sub-tab */}
            <button
              type="button"
              role="tab"
              id="subtab-ctf-3rd"
              aria-selected={ctfYear === "3rd-year"}
              aria-controls="panel-ctf-content"
              tabIndex={ctfYear === "3rd-year" ? 0 : -1}
              onClick={() => setCtfYear("3rd-year")}
              onKeyDown={handleCtfTabKeyDown}
              className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${ctfYear === "3rd-year"
                ? "bg-black text-[#FFE600] shadow-[2px_2px_0px_#000]"
                : "bg-white text-neutral-700 hover:bg-neutral-100 shadow-[1px_1px_0px_#000]"
                }`}
            >
              3rd Year Winners
            </button>
          </div>
        </div>
      )}

      {/* Active Track Status Pill */}
      <div className="flex items-center justify-between text-xs font-medium text-neutral-600 px-1">
        <span className="flex items-center gap-1.5 font-bold text-black">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {mainTab === "tech-quiz"
            ? "Showing 1st Year Freshers Tech Quiz Leaders"
            : ctfYear === "2nd-year"
              ? "Showing 2nd Year Senior CTF Cybersecurity Division"
              : "Showing 3rd Year Senior CTF Cybersecurity Division"}
        </span>
        <span className="text-[11px] font-mono text-neutral-500 font-bold">
          {currentWinners.length} {currentWinners.length === 1 ? "Winner" : "Winners"}
        </span>
      </div>

      {/* Tab Panels: Winners Grid with smooth subtle transition */}
      <div
        role="tabpanel"
        id={
          mainTab === "tech-quiz"
            ? "panel-tech-quiz"
            : ctfYear === "2nd-year"
              ? "panel-ctf-2nd"
              : "panel-ctf-3rd"
        }
        aria-labelledby={
          mainTab === "tech-quiz"
            ? "tab-tech-quiz"
            : ctfYear === "2nd-year"
              ? "subtab-ctf-2nd"
              : "subtab-ctf-3rd"
        }
        tabIndex={0}
        className="focus-visible:outline-none transition-all duration-300 ease-in-out"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentWinners.map((winner, idx) => (
            <WinnerCard
              key={winner.id}
              winner={winner}
              isFirstPlace={idx === 0 || winner.rank.toLowerCase().includes("1st")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default PrarambhWinnersShowcase;

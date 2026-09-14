import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
  RefreshCw,
} from "lucide-react";
import TextType from "@/components/TextType";
import { useJoinModal } from "@/context/JoinModalContext";

const HERO_QUOTES = [
  '"Build something that makes a difference."',
  '"Together, we build. Together, we innovate. Together, we are DevNest."',
  '"The future belongs to those who believe in the beauty of their dreams."',
  '"Innovation is the ability to see change as an opportunity, not a threat."',
  '"Learn by doing — we provide a platform to connect with the outer tech world."',
] as const;

export function Hero() {
  const { openJoinModal } = useJoinModal();
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
  });

  const [displayedQuote, setDisplayedQuote] = useState(
    '"Together, we build. Together, we innovate. Together, we are DevNest."',
  );
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastProgressRef = useRef(0);

  // Screen width detection throttled with requestAnimationFrame, only updates if breakpoint changes
  useEffect(() => {
    let resizeRaf: number | null = null;
    const updateWidth = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop((prev) => (prev !== desktop ? desktop : prev));
      });
    };
    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    return () => {
      window.removeEventListener("resize", updateWidth);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, []);

  // Scroll position tracking for left/right parting animation
  // Throttled via requestAnimationFrame and short-circuited when beyond the 500px threshold
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = 500;
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

          // Only trigger state update if progress change is noticeable or hits bounds (0 or 1)
          if (
            Math.abs(progress - lastProgressRef.current) > 0.005 ||
            (progress === 0 && lastProgressRef.current !== 0) ||
            (progress === 1 && lastProgressRef.current !== 1)
          ) {
            lastProgressRef.current = progress;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Defer counter animation until after initial render
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const counterTargets = {
        members: 150,
        events: 3,
      };

      const duration = 1800;
      const steps = 50;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          members: Math.floor(counterTargets.members * progress),
          events: Math.floor(counterTargets.events * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(counterTargets);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Rotate quote
  const handleRotateQuote = () => {
    const nextIndex = (quoteIndex + 1) % HERO_QUOTES.length;
    setQuoteIndex(nextIndex);
    setDisplayedQuote(HERO_QUOTES[nextIndex]);
  };

  const shiftAmount = isDesktop ? 130 : 35;

  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute inset-0 -z-9 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[250px] bg-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-clip">
        {/* Full Viewport First Fold - Ensures nothing below is visible without scrolling */}
        <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center py-6 sm:py-8">
          {/* 2-Column Asymmetric Left-Aligned Grid with Parting Parallax */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
            {/* Left Column (Content & CTAs) - Shifts Left on Scroll */}
            <div
              className="lg:col-span-7 flex flex-col items-start text-left transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(-${scrollProgress * shiftAmount}px)`,
                opacity: Math.max(1 - scrollProgress * 0.4, 0.5),
                willChange: "transform, opacity",
              }}
            >
              {/* Top Brand Pill with Live Beacon */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/12 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-md mb-4 sm:mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-foreground/90">Google Campus Ambassador Initiative</span>
              </div>

              {/* Display Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[46px] font-poppins font-bold tracking-tight text-foreground leading-[1.16] mb-3.5 transition-all"
                style={{
                  letterSpacing: `${-0.02 - scrollProgress * 0.015}em`,
                }}
              >
                Where Student Developers Build{" "}
                <span className="text-gradient-primary">The Future</span>
              </h1>

              {/* Subheading / Typing Line */}
              <div className="text-sm sm:text-base font-medium text-foreground/85 mb-3 min-h-[24px]">
                <TextType
                  text={[
                    "At DevNest, we don't just learn technology — we live it.",
                    "Build. Innovate. Transform.",
                    "Where student ideas become real-world products.",
                  ]}
                  typingSpeed={45}
                  pauseDuration={1400}
                  showCursor
                  cursorCharacter="|"
                  deletingSpeed={25}
                  cursorBlinkDuration={0.6}
                  className="text-foreground/90"
                />
              </div>

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mb-6">
                A premier student-driven technical society at Lamrin Tech Skills University Punjab.
                Fostering hands-on engineering across Artificial Intelligence, Cybersecurity, Cloud
                Systems, and Fullstack Web & Mobile Development.
              </p>

              {/* Left-Aligned CTA Button */}
              <div className="flex flex-wrap items-center gap-3 justify-start w-full sm:w-auto">
                <Button
                  asChild
                  size="default"
                  className="rounded-xl px-6 h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold shadow-glow-primary gap-2 text-xs sm:text-sm transition-all duration-200 w-full sm:w-auto cursor-pointer group"
                >
                  <Link href="/events" className="flex items-center gap-2">
                    <span>Explore 2026 Events</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column (Executive Terminal / Preview Card) - Shifts Right on Scroll */}
            <div
              className="lg:col-span-5 transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(${scrollProgress * shiftAmount}px)`,
                opacity: Math.max(1 - scrollProgress * 0.4, 0.5),
                willChange: "transform, opacity",
              }}
            >
              <div className="relative rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-4 sm:p-5 shadow-premium overflow-hidden">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-[11px] font-mono text-muted-foreground ml-2">
                      ~/devnest/session
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-foreground bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>
                </div>

                {/* Terminal / Quote Display */}
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-foreground" />
                        Club Philosophy
                      </span>
                      <button
                        onClick={handleRotateQuote}
                        className="p-1 rounded-md text-muted-foreground hover:text-white transition-colors"
                        title="Next Quote"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm italic text-foreground/90 font-medium leading-relaxed">
                      {displayedQuote}
                    </p>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-2.5">
                      — DevNest Tech Society
                    </p>
                  </div>

                  {/* Upcoming Event Highlight */}
                  <Link
                    href="/events"
                    className="flex items-center justify-between p-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all group backdrop-blur-md"
                  >
                    <span className="text-muted-foreground text-xs flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-foreground" />
                      Upcoming Event
                    </span>
                    <span className="text-xs font-semibold text-foreground group-hover:text-white transition-colors flex items-center gap-1.5">
                      Tech Quiz &amp; CTF
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Left-Aligned Metrics Strip - Positioned Below Initial Viewport Fold */}
        <div className="pt-10 sm:pt-14 pb-8 sm:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover-lift hover:border-white/25 hover:bg-white/[0.06] transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-foreground flex items-center justify-center mb-2 border border-white/15">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-foreground tracking-tight mb-0.5">
                {counters.members}+
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Active Members
              </p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover-lift hover:border-white/25 hover:bg-white/[0.06] transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-foreground flex items-center justify-center mb-2 border border-white/15">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-foreground tracking-tight mb-0.5">
                {counters.events}+
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Flagship Events
              </p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover-lift hover:border-white/25 hover:bg-white/[0.06] transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-foreground flex items-center justify-center mb-2 border border-white/15">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-foreground tracking-tight mb-0.5">
                5
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tech Domains
              </p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover-lift hover:border-white/25 hover:bg-white/[0.06] transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-foreground flex items-center justify-center mb-2 border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-foreground tracking-tight mb-0.5">
                100%
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Student Driven
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

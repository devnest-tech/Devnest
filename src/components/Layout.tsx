import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Home,
  Calendar,
  Code,
  Zap,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJoinModal } from "@/context/JoinModalContext";

const LiquidEther = dynamic(() => import("./LiquidEther"), { ssr: false });

interface LayoutProps {
  children: ReactNode;
  pauseTerminal?: boolean;
  customTheme?: "blue-gold" | "violet" | "default";
  enableTerminal?: boolean;
}

export function Layout({
  children,
  pauseTerminal = false,
  customTheme = "default",
  enableTerminal = false,
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openJoinModal } = useJoinModal();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileBottomNav = [
    { label: "Home", href: "/", icon: Home },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Projects", href: "/projects", icon: Code },
    { label: "Blog", href: "/blogs", icon: BookOpen },
    { label: "Join", href: "/membership", icon: Zap, highlight: true },
  ];

  const isNavActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col relative selection:bg-white/20 selection:text-white">
      {/* LiquidEther WebGL fluid background — purple/pink fluid theme */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          backgroundColor="#000000"
          lightMode={false}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          takeoverDuration={0.25}
          BFECC={true}
          isViscous={false}
          isBounce={false}
          style={{ width: '100%', height: '100%' }}
        />
        {/* Subtle vignette overlay to keep nav/footer readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-black/40 border-b border-white/10 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        {/* Top Accent Gradient Line */}
        <div
          className={`h-[2px] w-full bg-gradient-to-r from-transparent ${
            customTheme === "blue-gold"
              ? "via-blue-400"
              : customTheme === "violet"
                ? "via-violet-400"
                : "via-primary/50"
          } to-transparent opacity-80`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-1 bg-white/[0.04] backdrop-blur-md border border-white/15 group-hover:border-white/35 transition-all duration-200 flex items-center justify-center shadow-subtle">
                <Image
                  src="/logo.svg"
                  alt="DevNest Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-poppins font-bold text-xl tracking-tight leading-none ${
                      customTheme === "blue-gold"
                        ? "text-blue-400"
                        : customTheme === "violet"
                          ? "text-violet-400"
                          : "text-foreground group-hover:text-primary"
                    } transition-colors duration-200`}
                  >
                    Dev<span className="text-primary">Nest</span>
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/90 bg-white/[0.06] backdrop-blur-md border border-white/15 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-2.5 h-2.5" />
                    Tech Club
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium tracking-tight mt-0.5">
                  LTSU Punjab
                </span>
              </div>
            </Link>

            {/* Desktop Segmented Navigation */}
            <nav className="hidden md:flex items-center p-1 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-subtle">
              {navItems.map((item) => {
                const active = isNavActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-primary font-semibold bg-white/[0.08] shadow-sm border border-white/15 backdrop-blur-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="flex items-center gap-2.5">
              <Button
                size="sm"
                onClick={openJoinModal}
                className={`hidden sm:inline-flex gap-1.5 shadow-sm hover:shadow-glow-primary ${
                  customTheme === "violet"
                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                    : "bg-primary hover:bg-primary/95 text-primary-foreground"
                }`}
              >
                <span>Join Community</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>

              {/* Mobile hamburger toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-200 ${
                      isMenuOpen ? "w-5 rotate-45 translate-y-1.5" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-200 ${
                      isMenuOpen ? "opacity-0 scale-x-0" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-200 ${
                      isMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 pt-3 space-y-1.5 border-t border-border/60 animate-in slide-in-from-top duration-200">
              {navItems.map((item) => {
                const active = isNavActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 ${
                      active
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        active ? "text-primary translate-x-0.5" : "text-muted-foreground"
                      }`}
                    />
                  </Link>
                );
              })}

              <div className="pt-2 px-1">
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openJoinModal();
                  }}
                  className="w-full gap-2 py-3.5 rounded-xl font-semibold bg-primary hover:bg-primary/95 text-primary-foreground shadow-glow-primary"
                >
                  <span>Join DevNest Community</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area with clearance for mobile bottom bar */}
      <main className="flex-grow relative z-10 pb-20 md:pb-0">{children}</main>

      {/* Luxury Glass Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-2xl border-t border-white/10 mt-24 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        {/* Subtle top edge glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
            {/* Column 1: Brand Bio */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl p-1 bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="DevNest Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-poppins font-bold text-xl tracking-tight text-foreground">
                  Dev<span className="text-primary">Nest</span>
                </span>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                The premier technical club of Lamrin Tech Skills University Punjab. Fostering hands-on innovation, curiosity, and leadership across software, AI, cloud, and cybersecurity.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border/80 text-xs text-muted-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Google Campus Ambassador Initiative
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.15em] text-foreground mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-150 inline-flex items-center gap-1 group"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Community & Resources */}
            <div>
              <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.15em] text-foreground mb-4">
                Community
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/membership"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    Membership Registration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events/schedule"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    2026 Event Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certificate-download"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    Download Certificate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hall-of-fame"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    Hall of Fame
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.15em] text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Get notified about upcoming hackathons, workshops, and tech talks.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-input/70 text-xs text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  onClick={() => alert("Thank you for subscribing to DevNest updates!")}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Sub-Footer Divider & Socials */}
          <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © 2026 DevNest • Lamrin Tech Skills University Punjab • All rights reserved.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/devnest-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-background border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-subtle transition-all duration-200"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/devnestclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-background border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-subtle transition-all duration-200"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/devnest_tech_club/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-background border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-subtle transition-all duration-200"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="mailto:devnest.techclub@gmail.com"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-background border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-subtle transition-all duration-200"
                aria-label="Email"
                title="Email DevNest"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Ergonomic Thumb-Friendly Mobile Bottom Navigation Dock */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-2xl border-t border-white/10 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all duration-200"
      >
        <div className="grid grid-cols-5 items-center h-16 px-2">
          {mobileBottomNav.map((item) => {
            const active =
              item.href === "/"
                ? router.pathname === "/"
                : router.pathname.startsWith(item.href) ||
                  (item.href === "/blogs" && router.pathname.startsWith("/blog"));
            const Icon = item.icon;

            if (item.highlight) {
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={openJoinModal}
                  className="flex flex-col items-center justify-center -mt-3.5 group focus:outline-none"
                  aria-label="Join DevNest Community"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-glow-primary group-hover:scale-105 active:scale-95 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-primary mt-1">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-150 min-h-[44px] ${
                  active
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-1 rounded-lg ${active ? "bg-primary/10" : ""}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium tracking-tight mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
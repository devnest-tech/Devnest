import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative">
        {/* Terminal is optional per page for better performance */}

        {/* Minimal page background */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/95 border-b border-border shadow-sm">
          {/* Gradient Accent Line */}
          <div
            className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${
              customTheme === "blue-gold"
                ? "via-blue-400"
                : customTheme === "violet"
                  ? "via-violet-400"
                  : "via-primary"
            } to-transparent opacity-50`}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group relative">
                <Image
                  src="/logo.svg"
                  alt="DevNest Logo"
                  width={44}
                  height={44}
                  priority
                  className="w-11 h-11 object-contain group-hover:scale-105 transition-transform duration-150"
                />

                <div className="hidden sm:flex flex-col">
                  <span
                    className={`font-poppins font-bold text-xl ${
                      customTheme === "blue-gold"
                        ? "text-blue-400"
                        : customTheme === "violet"
                          ? "text-violet-400"
                          : "text-primary"
                    }`}
                  >
                    DevNest
                  </span>

                  <span className="text-[10px] text-muted-foreground font-medium -mt-1">
                    Tech Community
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                      customTheme === "blue-gold"
                        ? "hover:text-blue-400"
                        : customTheme === "violet"
                          ? "hover:text-violet-300"
                          : "hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className={`${
                    customTheme === "violet"
                      ? "bg-violet-600 hover:bg-violet-500 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  } hidden sm:inline-flex gap-2 transition-colors duration-150`}
                >
                  <Link href="/membership">
                    <span className="emoji-white">🚀</span> Join
                  </Link>
                </Button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`md:hidden p-2.5 rounded-xl transition-colors duration-150 border border-transparent ${
                    customTheme === "violet"
                      ? "hover:bg-violet-500/10 hover:border-violet-400/30"
                      : "hover:bg-primary/10 hover:border-primary/30"
                  }`}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-6 h-5 flex flex-col justify-between items-end relative">
                    <span
                      className={`h-0.5 bg-foreground rounded-full transition-[width,transform] duration-200 ${
                        isMenuOpen
                          ? "w-6 rotate-45 translate-y-2"
                          : "w-6"
                      }`}
                    />

                    <span
                      className={`h-0.5 bg-foreground rounded-full transition-[width,opacity] duration-200 ${
                        isMenuOpen
                          ? "w-0 opacity-0"
                          : "w-5"
                      }`}
                    />

                    <span
                      className={`h-0.5 bg-foreground rounded-full transition-[width,transform] duration-200 ${
                        isMenuOpen
                          ? "w-6 -rotate-45 -translate-y-2"
                          : "w-4"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
              <div className="md:hidden pb-6 pt-4 space-y-2 animate-in slide-in-from-top duration-150 border-t border-border mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-5 py-3.5 rounded-xl text-base font-medium transition-colors duration-150 active:scale-[0.98] border border-border group ${
                      customTheme === "violet"
                        ? "hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-400/40"
                        : "hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}

                      <span
                        className={`${
                          customTheme === "violet"
                            ? "text-violet-300"
                            : "text-primary"
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-150`}
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}

                <div className="pt-3 px-1">
                  <Button
                    className={`w-full gap-2 py-4 font-semibold text-base rounded-xl ${
                      customTheme === "violet"
                        ? "bg-violet-600 hover:bg-violet-500 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    } transition-colors duration-150`}
                    asChild
                  >
                    <Link href="/join">
                      <span className="flex items-center gap-2 justify-center">
                        <span className="emoji-white">🚀</span>
                        Join DevNest
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow relative z-[2]">{children}</main>

        {/* Footer */}
        <footer className="bg-muted/50 border-t border-border/40 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
              {/* Brand */}
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                  <Image
                    src="/logo.svg"
                    alt="DevNest Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />

                  <span
                    className={`font-poppins font-bold text-lg ${
                      customTheme === "violet"
                        ? "text-violet-400"
                        : "text-primary"
                    }`}
                  >
                    DevNest
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Build. Learn. Innovate.
                </p>
              </div>

              {/* Quick Links */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-sm">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-muted-foreground transition-colors duration-150 ${
                          customTheme === "violet"
                            ? "hover:text-violet-300"
                            : "hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">
                  Community
                </h3>

                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/blogs"
                      className={`text-muted-foreground transition-colors duration-150 ${
                        customTheme === "violet"
                          ? "hover:text-violet-300"
                          : "hover:text-primary"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>

                  <li>
                    <a
                      href="#"
                      className={`text-muted-foreground transition-colors duration-150 ${
                        customTheme === "violet"
                          ? "hover:text-violet-300"
                          : "hover:text-primary"
                      }`}
                    >
                      Discord
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className={`text-muted-foreground transition-colors duration-150 ${
                        customTheme === "violet"
                          ? "hover:text-violet-300"
                          : "hover:text-primary"
                      }`}
                    >
                      Forum
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">
                  Stay Updated
                </h3>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-1 px-3 py-2 rounded-lg bg-input text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 ${
                      customTheme === "violet"
                        ? "focus:ring-violet-400"
                        : "focus:ring-primary"
                    }`}
                  />

                  <Button
                    size="sm"
                    className={`w-full sm:w-auto transition-colors duration-150 ${
                      customTheme === "violet"
                        ? "bg-violet-600 hover:bg-violet-500 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                © 2026 DevNest | Built with{" "}
                <span className="emoji-white">💚</span> by Innovators
              </p>

              <div className="flex items-center gap-4 sm:gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors duration-150 p-2 rounded-lg ${
                    customTheme === "violet"
                      ? "hover:text-violet-300 hover:bg-violet-500/10"
                      : "hover:text-primary hover:bg-primary/10"
                  }`}
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/company/devnestclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors duration-150 p-2 rounded-lg ${
                    customTheme === "violet"
                      ? "hover:text-violet-300 hover:bg-violet-500/10"
                      : "hover:text-primary hover:bg-primary/10"
                  }`}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/devnest_tech_club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors duration-150 p-2 rounded-lg ${
                    customTheme === "violet"
                      ? "hover:text-violet-300 hover:bg-violet-500/10"
                      : "hover:text-primary hover:bg-primary/10"
                  }`}
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="mailto:devnest.techclub@gmail.com"
                  className={`text-muted-foreground transition-colors duration-150 p-2 rounded-lg ${
                    customTheme === "violet"
                      ? "hover:text-violet-300 hover:bg-violet-500/10"
                      : "hover:text-primary hover:bg-primary/10"
                  }`}
                  aria-label="Email"
                  title="Email"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
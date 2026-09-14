import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
  BrainCircuit,
  Shield,
  Cloud,
  Cpu,
  Star,
  Users,
  Search,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "all" | "web" | "ai" | "security" | "iot";
  categoryLabel: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "devnest-portal",
    title: "DevNest Community Platform",
    category: "web",
    categoryLabel: "Web & Mobile",
    description:
      "The flagship digital ecosystem for DevNest tech club. Features automated membership onboarding, real-time event registrations, admin console, and certificate verification.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    githubUrl: "https://github.com/devnest-tech/Devnest",
    liveUrl: "https://devnest.tech",
    stars: 48,
    featured: true,
  },
  {
    id: "promptathon",
    title: "Promptathon Arena & Evaluator",
    category: "ai",
    categoryLabel: "AI & ML",
    description:
      "Competitive prompt engineering contest suite with real-time automated scoring, benchmark leaderboards, and generative output evaluation against test suites.",
    techStack: ["Next.js", "OpenAI API", "Python", "LangChain"],
    liveUrl: "/certificates/promptathon",
    githubUrl: "https://github.com/devnest-tech",
    stars: 32,
    featured: true,
  },
  {
    id: "datadash",
    title: "DataDash Analytics Suite",
    category: "ai",
    categoryLabel: "AI & ML",
    description:
      "Comprehensive data analytics dashboard for campus hackathons and student hack squads. Includes cryptographic certificate generation and roll-number verification.",
    techStack: ["React", "Python", "Pandas", "Tailwind CSS"],
    liveUrl: "/certificates/datadash",
    githubUrl: "https://github.com/devnest-tech",
    stars: 26,
    featured: true,
  },
  {
    id: "ctf-arena",
    title: "DevNest CTF Defense Sandbox",
    category: "security",
    categoryLabel: "Cybersecurity",
    description:
      "Sandboxed cybersecurity capture-the-flag platform hosting challenges in web penetration, binary exploitation, cryptographic puzzles, and forensics.",
    techStack: ["Docker", "Node.js", "Redis", "Kali Linux"],
    githubUrl: "https://github.com/devnest-tech",
    stars: 37,
    featured: false,
  },
  {
    id: "campus-iot",
    title: "Campus Telemetry & Weather IoT",
    category: "iot",
    categoryLabel: "IoT & Systems",
    description:
      "Smart micro-weather monitoring station deployed on campus. Streams ambient temperature, humidity, air quality, and noise index via MQTT protocols.",
    techStack: ["ESP32", "C++", "MQTT", "Grafana", "Node.js"],
    githubUrl: "https://github.com/devnest-tech",
    stars: 19,
    featured: false,
  },
  {
    id: "three-campus",
    title: "DevNest 3D Virtual Expo",
    category: "web",
    categoryLabel: "Web & Mobile",
    description:
      "Interactive 3D WebGL showcase enabling students to explore student project booths, interact with digital club avatars, and attend virtual workshops in the browser.",
    techStack: ["Three.js", "React Three Fiber", "GLSL", "TypeScript"],
    githubUrl: "https://github.com/devnest-tech",
    stars: 41,
    featured: false,
  },
];

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web & Mobile" },
  { key: "ai", label: "AI & ML" },
  { key: "security", label: "Cybersecurity" },
  { key: "iot", label: "IoT & Embedded" },
] as const;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Layout>
      <Head>
        <title>DevNest | Projects & Showcases</title>
        <meta
          name="description"
          content="Explore open-source software, hackathon builds, and technical showcases crafted by DevNest club members."
        />
      </Head>

      <div className="relative min-h-screen py-16 md:py-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Left-Aligned Header */}
          <div className="text-left max-w-3xl">
            <div className="badge-pill mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>DevNest Builds</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Open Source</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins tracking-tight mb-4">
              Projects & <span className="text-gradient-primary">Showcases</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real-world software engineered by student developers, domain leads, and hackathon
              teams. Explore production apps, AI models, CTF sandboxes, and embedded systems.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-subtle">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground shadow-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-background/80 border border-border/70 focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-border/70 bg-card/50">
              <FolderGit2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">No Projects Found</h3>
              <p className="text-sm text-muted-foreground">
                No projects matched your active search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-3xl border border-border/80 bg-card/90 backdrop-blur-sm p-6 shadow-subtle hover-lift transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-primary/10 text-primary border border-primary/20">
                        {project.categoryLabel}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          <Star className="w-3 h-3 fill-amber-500" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold font-poppins text-foreground mb-2.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-background border border-border/60 text-[11px] font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted/50 transition-colors"
                            title="View GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            className="p-2 rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted/50 transition-colors"
                            title="Open Project"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>

                      <Button asChild size="sm" variant="ghost" className="text-xs gap-1.5 text-primary hover:text-primary rounded-xl">
                        <Link href="/membership">
                          <span>Contribute</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submit Project Banner (Left-Aligned) */}
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/[0.04] p-8 sm:p-10 shadow-premium flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 border border-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-2">
                Building something extraordinary?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                DevNest showcases projects built by club members and student squads. Get peer reviews,
                find collaborators, and feature your project in the official gallery.
              </p>
            </div>
            <Button asChild className="rounded-xl px-6 h-11 shadow-subtle shrink-0">
              <Link href="/contact">
                Submit Project for Review
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

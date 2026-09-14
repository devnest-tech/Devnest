import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Code2,
  BrainCircuit,
  Shield,
  Cloud,
  Cpu,
  Sparkles,
  ArrowRight,
  Layers,
  Terminal,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";

interface Domain {
  id: string;
  title: string;
  badge: string;
  icon: typeof Code2;
  description: string;
  color: string;
  techStack: string[];
  features: string[];
  projectExamples: string[];
}

const DOMAINS: Domain[] = [
  {
    id: "web-dev",
    title: "Web & Mobile Development",
    badge: "Core Pillar",
    icon: Code2,
    description:
      "Crafting high-performance, accessible, and responsive digital interfaces with modern frameworks, fullstack architectures, and fluid animations.",
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Node.js"],
    features: [
      "Fullstack web architecture & SSR/SSG workflows",
      "Modern design systems & reactive micro-interactions",
      "Cross-platform mobile apps using React Native",
      "REST & GraphQL API integration",
    ],
    projectExamples: ["DevNest Portal", "Campus Event Manager", "Alumni Connect"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    badge: "Cutting Edge",
    icon: BrainCircuit,
    description:
      "Exploring deep learning, neural networks, natural language processing, and generative AI to solve challenging real-world problems.",
    color: "from-purple-500/20 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    techStack: ["PyTorch", "TensorFlow", "OpenCV", "Hugging Face", "LangChain", "Python"],
    features: [
      "Large Language Model prompting & RAG architectures",
      "Computer vision & real-time object detection",
      "Data preprocessing, statistical analysis & visualization",
      "Model deployment with FastAPI & ONNX",
    ],
    projectExamples: ["Promptathon Evaluator", "Campus AI Assistant", "Sign Language Translator"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & CTF",
    badge: "Defense & Offense",
    icon: Shield,
    description:
      "Diving into network defenses, vulnerability assessments, ethical hacking, cryptography, and competing in premier Capture The Flag competitions.",
    color: "from-rose-500/20 to-orange-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    techStack: ["Wireshark", "Burp Suite", "Ghidra", "Metasploit", "Kali Linux", "Bash"],
    features: [
      "Capture The Flag (CTF) training across Web, Reverse, & Crypto",
      "Penetration testing & OWASP Top 10 vulnerabilities",
      "Secure coding practices & threat modeling",
      "Network analysis & packet inspection",
    ],
    projectExamples: ["DevNest CTF Arena", "Security Audit Toolkit", "Secure Pass Vault"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Systems",
    badge: "Scalable Infrastructure",
    icon: Cloud,
    description:
      "Automating infrastructure, streamlining CI/CD pipelines, containerizing services, and orchestrating robust cloud deployments at scale.",
    color: "from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    techStack: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform", "Linux"],
    features: [
      "Continuous Integration and Continuous Deployment (CI/CD)",
      "Container orchestration with Docker & Kubernetes",
      "Serverless architectures & microservices management",
      "System monitoring, logging & performance optimization",
    ],
    projectExamples: ["Automated Deploy Engine", "Club Cloud Sandbox", "Microservice Mesh"],
  },
  {
    id: "iot-embedded",
    title: "AR/VR & Embedded Systems",
    badge: "Hardware & Immersion",
    icon: Cpu,
    description:
      "Bridging the physical and digital universes through embedded microcontrollers, IoT sensor networks, robotics, and immersive 3D/AR environments.",
    color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    techStack: ["Arduino", "ESP32", "Raspberry Pi", "Three.js", "Unity", "C/C++"],
    features: [
      "Microcontroller programming & sensor telemetry",
      "Smart campus IoT automations & embedded robotics",
      "Interactive 3D WebGL scenes with Three.js",
      "Immersive virtual & augmented reality simulations",
    ],
    projectExamples: ["Smart Campus Weather Station", "Gesture Rover", "3D Campus Tour"],
  },
];

export default function DomainsPage() {
  return (
    <Layout>
      <Head>
        <title>DevNest | Domains of Innovation</title>
        <meta
          name="description"
          content="Explore DevNest core technical tracks: Web Development, AI/ML, Cybersecurity, Cloud DevOps, and Embedded Systems."
        />
      </Head>

      <div className="relative min-h-screen py-16 md:py-24">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Left-Aligned Header */}
          <div className="text-left max-w-3xl">
            <div className="badge-pill mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Technical Pillars</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Specialized Tracks</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins tracking-tight mb-4">
              Domains of <span className="text-gradient-primary">Innovation</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              At DevNest, students specialize in high-impact technology domains. Join focused
              study groups, collaborate on real-world capstone projects, and build production-ready
              skills alongside passionate peers and senior mentors.
            </p>
          </div>

          {/* Domains Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-sm p-6 sm:p-8 shadow-subtle hover-lift transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header bar */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center border shadow-sm`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground mb-1">
                            {domain.badge}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-poppins text-foreground">
                            {domain.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {domain.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Tech Stack & Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {domain.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-background border border-border/70 text-xs font-mono font-medium text-foreground/90 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Core Highlights */}
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Learning Areas
                      </h3>
                      {domain.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Flagship Projects */}
                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Flagship Work: </span>
                      {domain.projectExamples.join(", ")}
                    </div>

                    <Button asChild size="sm" variant="outline" className="rounded-xl gap-2 text-xs">
                      <Link href="/membership">
                        <span>Join Track</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner (Left-Aligned) */}
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 sm:p-10 shadow-premium flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-3 border border-primary/30">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-2">
                Not sure which domain fits you best?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You do not need prior expertise to join. DevNest welcomes curious learners of all levels.
                Our senior members and domain leads provide roadmaps, hands-on bootcamps, and 1-on-1 mentorship.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button asChild className="rounded-xl px-6 h-11 shadow-subtle">
                <Link href="/membership">
                  Apply for Membership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-6 h-11 border-border/80">
                <Link href="/contact">
                  Talk to a Domain Lead
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

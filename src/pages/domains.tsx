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
  ArrowRight,
  CheckCircle2,
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
    color: "bg-[#FFE600]",
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
    color: "bg-[#C4B5FD]",
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
    color: "bg-[#FF70A6]",
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
    color: "bg-[#70D6FF]",
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
    color: "bg-[#88EA73]",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Left-Aligned Header */}
          <div className="text-left max-w-3xl">
            <div className="badge-pill mb-4">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span>Technical Pillars</span>
              <span className="text-black/40">•</span>
              <span className="text-black font-bold">Specialized Tracks</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space tracking-tight mb-4 text-foreground">
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
                  className="rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header bar */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${domain.color} text-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000]`}
                        >
                          <Icon className="w-7 h-7 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold font-space uppercase tracking-wider bg-black text-white mb-1 shadow-[1px_1px_0px_#000]">
                            {domain.badge}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-space text-foreground">
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
                      <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-2.5 font-space">
                        Tech Stack &amp; Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {domain.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs font-mono font-bold text-black shadow-[1.5px_1.5px_0px_#000]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Core Highlights */}
                    <div className="rounded-2xl border-2 border-black bg-[#FAF7EE] p-4 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-2 font-space">
                        Key Learning Areas
                      </h3>
                      {domain.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-black font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Flagship Projects */}
                  <div className="pt-6 mt-6 border-t-2 border-black flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-bold text-black font-space">Flagship Work: </span>
                      {domain.projectExamples.join(", ")}
                    </div>

                    <Button asChild size="sm" className="rounded-xl gap-2 text-xs bg-[#FFE600] text-black hover:bg-[#FFE600]/90 border-2 border-black shadow-[2px_2px_0px_#000] font-space font-bold active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                      <Link href="/membership">
                        <span>Join Track</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner (Left-Aligned) */}
          <div className="rounded-3xl border-3 border-black bg-[#FFE600] text-black p-8 sm:p-10 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-space mb-2 text-black">
                Not sure which domain fits you best?
              </h2>
              <p className="text-sm text-black/85 font-medium leading-relaxed">
                You do not need prior expertise to join. DevNest welcomes curious learners of all levels.
                Our senior members and domain leads provide roadmaps, hands-on bootcamps, and 1-on-1 mentorship.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button asChild className="rounded-xl px-6 h-11 bg-black text-white hover:bg-zinc-800 border-2 border-black shadow-[3px_3px_0px_#000] font-space font-bold active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                <Link href="/membership">
                  Apply for Membership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-6 h-11 bg-white text-black hover:bg-zinc-100 border-2 border-black shadow-[3px_3px_0px_#000] font-space font-bold active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
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

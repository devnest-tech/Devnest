import React from "react";
import {
  Target,
  Rocket,
  Sparkles,
  Globe,
  Trophy,
  Palette,
  Code2,
  Layers,
  Radio,
  ShieldCheck,
  RefreshCw,
  Bot,
  Blocks,
  BarChart3,
  Zap,
  Mic,
  Lightbulb,
  GraduationCap,
  Shield,
  KeyRound,
  Smartphone,
  Brain,
  Atom,
  BookOpen,
  ShieldAlert,
  FileText,
  LucideIcon,
} from "lucide-react";

// Mapping emoji or tech key to Lucide Icon
const ICON_MAP: Record<string, LucideIcon> = {
  // Goals & Initiatives
  "🎯": Target,
  target: Target,
  "🚀": Rocket,
  rocket: Rocket,
  "🌟": Sparkles,
  star: Sparkles,
  sparkles: Sparkles,
  "🌐": Globe,
  globe: Globe,
  "🏆": Trophy,
  trophy: Trophy,

  // Event Categories
  "🎨": Palette,
  palette: Palette,
  "💻": Code2,
  laptop: Code2,
  code: Code2,
  "📊": BarChart3,
  chart: BarChart3,
  "⚡": Zap,
  zap: Zap,
  "🎤": Mic,
  mic: Mic,
  "💡": Lightbulb,
  idea: Lightbulb,
  "🎓": GraduationCap,
  education: GraduationCap,

  // Domains & Blog Topics
  "🏗️": Layers,
  microservices: Layers,
  "📡": Radio,
  iot: Radio,
  "🔒": ShieldCheck,
  lock: ShieldCheck,
  "🔄": RefreshCw,
  sync: RefreshCw,
  "🤖": Bot,
  ai: Bot,
  robot: Bot,
  "⛓️": Blocks,
  blockchain: Blocks,
  "🛡️": Shield,
  shield: Shield,
  "🔐": KeyRound,
  security: KeyRound,
  "📱": Smartphone,
  mobile: Smartphone,
  "🧠": Brain,
  brain: Brain,
  "⚛️": Atom,
  react: Atom,
  "📘": BookOpen,
  book: BookOpen,
  "🎭": ShieldAlert,
  pentest: ShieldAlert,
  "📝": FileText,
  article: FileText,
};

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-5 h-5", ...props }: TechIconProps) {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent className={className} {...props} />;
}

export default TechIcon;

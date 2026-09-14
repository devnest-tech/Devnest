import Head from "next/head";
import { Layout } from "@/components/Layout";
import { MembershipForm } from "@/components/MembershipForm";
import { Users, Zap, Trophy, Rocket, Sparkles, Mail, Instagram, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join an active network of 500+ builders, student engineers, and domain leads.",
  },
  {
    icon: Zap,
    title: "Flagship Hackathons",
    description: "Get priority admission to datathons, CTF defense sprints, and ideathons.",
  },
  {
    icon: Trophy,
    title: "Prizes & Recognition",
    description: "Compete in algorithmic challenges, win awards, and earn verified certificates.",
  },
  {
    icon: Rocket,
    title: "Industry Mentorship",
    description: "Learn industry-grade workflows, web architectures, and career pathways from experts.",
  },
];

export default function MembershipPage() {
  return (
    <Layout>
      <Head>
        <title>DevNest | Official Club Membership</title>
        <meta
          name="description"
          content="Apply to join DevNest tech club at LTSU Punjab. Unlock hackathon access, hands-on learning, and community perks."
        />
      </Head>

      <div className="relative min-h-screen py-8 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Header Section */}
          <header className="text-left mb-10 sm:mb-16 max-w-3xl">
            <div className="badge-pill mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Membership Registration</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Cohort 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 text-foreground">
              Join <span className="text-gradient-primary">DevNest</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Be part of a student-driven tech community at Lamrin Tech Skills University Punjab.
              Learn, build, and innovate alongside passionate developers. Complete the registration
              form below to activate your club membership.
            </p>
          </header>

          {/* Benefits Section (Left-Aligned) */}
          <div className="mb-20 text-left">
            <div className="mb-8">
              <div className="badge-pill mb-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Member Privileges</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">
                Membership Benefits
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Everything you need to accelerate your engineering journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="glass-panel rounded-2xl p-6 border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold font-poppins text-foreground mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <MembershipForm />

          {/* Questions Contact Section (Left-Aligned) */}
          <section className="mt-20">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-border/80 shadow-premium flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="max-w-xl">
                <div className="badge-pill mb-3">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Direct Inquiries</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-2">
                  Have Any Questions?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Reach out to our leadership team for queries regarding membership eligibility, club domains, or upcoming initiatives.
                </p>
              </div>
              <div className="flex gap-3 shrink-0 flex-wrap">
                <a
                  href="mailto:devnest.techclub@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Core Team</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 border border-border/80 text-xs sm:text-sm font-semibold transition-all duration-200"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

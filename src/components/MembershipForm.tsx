import React from "react";
import { Sparkles } from "lucide-react";
import { JoinCommunityStepper } from "./JoinCommunityStepper";

export function MembershipForm() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl glass-panel border border-border/80 shadow-premium overflow-hidden transition-all duration-300">
      {/* Form Top Banner */}
      <div className="px-6 py-8 sm:px-10 sm:py-10 bg-gradient-to-b from-primary/[0.08] to-transparent border-b border-border/60">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Membership Cohort 2026</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground tracking-tight">
          Register for <span className="text-gradient-primary">DevNest</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
          Join 500+ student developers, creators, and innovators. Fast-track onboarding powered by the interactive React Bits Stepper.
        </p>
      </div>

      <div className="p-6 sm:p-10">
        <JoinCommunityStepper isDialog={false} />
      </div>
    </div>
  );
}

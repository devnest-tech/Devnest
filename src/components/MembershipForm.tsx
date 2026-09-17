import React from "react";
import { Sparkles } from "lucide-react";
import { JoinCommunityStepper } from "./JoinCommunityStepper";

export function MembershipForm() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden transition-all duration-300">
      {/* Form Top Banner */}
      <div className="px-6 py-8 sm:px-10 sm:py-10 bg-[#FAF7EE] border-b-2 border-black">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE600] border-2 border-black text-black text-xs font-bold tracking-wide uppercase mb-3 shadow-[2px_2px_0px_#000]">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Membership Cohort 2026</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-black tracking-tight">
          Register for <span className="text-gradient-primary">DevNest</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-700 mt-2 max-w-xl leading-relaxed font-medium">
          Join 500+ student developers, creators, and innovators. Fast-track onboarding powered by the interactive React Bits Stepper.
        </p>
      </div>

      <div className="p-6 sm:p-10 bg-white">
        <JoinCommunityStepper isDialog={false} />
      </div>
    </div>
  );
}

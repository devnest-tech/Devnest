import React, { useState } from "react";
import Stepper, { Step } from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Users,
  Zap,
  Rocket,
  User,
  Mail,
  Phone,
  Terminal,
  Building2,
  GraduationCap,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { WHATSAPP_GROUP_LINK, WHATSAPP_GROUP_NAME } from "@/config/whatsapp";
import Link from "next/link";

const DOMAINS = [
  "Web & Fullstack",
  "Artificial Intelligence & ML",
  "Cybersecurity & CTF",
  "Cloud & DevOps",
  "Mobile App Development",
  "UI/UX & Product Design",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export interface JoinCommunityStepperProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isDialog?: boolean;
}

export function JoinCommunityStepper({
  onSuccess,
  onCancel,
  isDialog = false,
}: JoinCommunityStepperProps) {
  const [stepIndex, setStepIndex] = useState(1);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [college] = useState("Lamrin Tech Skills University Punjab");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [year, setYear] = useState("1st Year");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Web & Fullstack",
  ]);
  const [github, setGithub] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleInterest = (domain: string) => {
    setSelectedInterests((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const handleStepValidation = (targetStep: number): boolean => {
    setSubmitError("");

    // Step 2 validation (Personal Details)
    if (targetStep > 2) {
      if (!fullName.trim()) {
        setSubmitError("Please enter your Full Name.");
        return false;
      }
      if (!email.trim() || !email.includes("@")) {
        setSubmitError("Please enter a valid university or personal email address.");
        return false;
      }
      if (!phone.trim()) {
        setSubmitError("Please enter your WhatsApp / phone number.");
        return false;
      }
      if (!rollNumber.trim()) {
        setSubmitError("Please enter your University Roll / ID Number.");
        return false;
      }
    }

    // Step 3 validation (Academic & Track)
    if (targetStep > 3) {
      if (!branch.trim()) {
        setSubmitError("Please enter your branch / department.");
        return false;
      }
      if (selectedInterests.length === 0) {
        setSubmitError("Please select at least one tech interest domain.");
        return false;
      }
    }

    return true;
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          enrollmentNumber: rollNumber.trim().toUpperCase(),
          college,
          branch: branch.trim(),
          year,
          semester: year === "1st Year" ? "1st" : year === "2nd Year" ? "3rd" : "5th",
          interests: selectedInterests,
          github: github.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to complete registration");
      }

      setIsCompleted(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting details";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStepIndex(1);
    setIsCompleted(false);
    setSubmitError("");
    setFullName("");
    setEmail("");
    setPhone("");
    setRollNumber("");
    setGithub("");
  };

  if (isCompleted) {
    return (
      <div className="py-6 sm:py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-[#88EA73] border-2 border-black text-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000]">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold font-space text-foreground">
            Welcome to DevNest, {fullName}!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your membership application has been recorded. Tap below to join our official WhatsApp group for instant announcements, hackathon updates, and mentorship.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-black text-left text-xs space-y-2 max-w-sm mx-auto shadow-[3px_3px_0px_#000]">
          <div className="flex justify-between py-1 border-b-2 border-black/10">
            <span className="text-muted-foreground font-semibold">Member Name:</span>
            <span className="font-bold text-foreground">{fullName}</span>
          </div>
          <div className="flex justify-between py-1 border-b-2 border-black/10">
            <span className="text-muted-foreground font-semibold">Roll / ID:</span>
            <span className="font-mono font-bold text-foreground">{rollNumber}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground font-semibold">Branch &amp; Year:</span>
            <span className="font-bold text-foreground">{branch} ({year})</span>
          </div>
        </div>

        {/* DIRECT WHATSAPP JOIN CTA */}
        <div className="pt-2 max-w-sm mx-auto space-y-2">
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-space font-extrabold text-sm sm:text-base border-2 border-black shadow-[4px_4px_0px_#000] transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <MessageCircle className="w-5 h-5 fill-current stroke-black stroke-2" />
            <span>Join {WHATSAPP_GROUP_NAME}</span>
          </a>
          <p className="text-[11px] text-muted-foreground font-medium">
            Official invite link: <span className="font-mono font-bold text-foreground">chat.whatsapp.com/GEjvOGVbtWZ51wAjNKwS0V</span>
          </p>
        </div>

        <div className="pt-3 flex items-center justify-center gap-3">
          {onCancel ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="rounded-xl text-xs font-semibold"
            >
              Close Window
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="rounded-xl text-xs font-semibold"
            >
              Register Another Member
            </Button>
          )}
          <Button asChild size="sm" variant="ghost" className="rounded-xl text-xs gap-1">
            <Link href="/events" onClick={onCancel}>
              <span>Explore 2026 Events</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {submitError && (
        <div className="mb-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <Stepper
        initialStep={stepIndex}
        onStepChange={(newStep) => {
          if (handleStepValidation(newStep)) {
            setStepIndex(newStep);
          }
        }}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Previous"
        nextButtonText="Continue"
        completeButtonText={isSubmitting ? "Submitting..." : "Activate Membership"}
        nextButtonProps={{
          disabled: isSubmitting,
        }}
        stepCircleContainerClassName="!border-none !bg-transparent !shadow-none !max-w-none"
        stepContainerClassName="!px-0 !py-2"
        contentClassName="!min-h-[290px]"
        footerClassName="!px-0 !pb-1 !pt-2"
      >
        {/* STEP 1: Welcome & Community Perks */}
        <Step>
          <div className="space-y-4 text-left py-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold tracking-wider uppercase">
                Cohort 2026
              </span>
              <span className="text-xs text-muted-foreground">
                Lamrin Tech Skills University Punjab
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold font-poppins text-foreground">
                Accelerate your tech journey with DevNest
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                DevNest is the premier technical club at LTSU Punjab. Join hundreds of passionate student developers building real software, competing in hackathons, and learning modern tech stacks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] text-black space-y-1">
                <div className="w-7 h-7 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <h4 className="text-xs font-bold text-black font-space">Priority Entry</h4>
                <p className="text-[11px] text-black/80 font-medium leading-snug">
                  Early admission to flagship hackathons, CTFs, and ideathons.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#70D6FF] border-2 border-black shadow-[3px_3px_0px_#000] text-black space-y-1">
                <div className="w-7 h-7 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                  <Users className="w-4 h-4 text-black" />
                </div>
                <h4 className="text-xs font-bold text-black font-space">500+ Network</h4>
                <p className="text-[11px] text-black/80 font-medium leading-snug">
                  Peer builders, mentors, and past national winners.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#C4B5FD] border-2 border-black shadow-[3px_3px_0px_#000] text-black space-y-1">
                <div className="w-7 h-7 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                  <Rocket className="w-4 h-4 text-black" />
                </div>
                <h4 className="text-xs font-bold text-black font-space">Tech Stacks</h4>
                <p className="text-[11px] text-black/80 font-medium leading-snug">
                  Hands-on roadmaps for AI/ML, Web, Security &amp; Cloud.
                </p>
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 2: Student Identity */}
        <Step>
          <div className="space-y-3 text-left py-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-poppins text-foreground flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                <span>Student Identity &amp; Contact</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Enter your university credentials to verify your club profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3 text-primary" />
                  <span>Full Name</span>
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-xl bg-secondary/50 border-border text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3 text-primary" />
                  <span>Email Address</span>
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl bg-secondary/50 border-border text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3 h-3 text-primary" />
                  <span>WhatsApp / Phone</span>
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl bg-secondary/50 border-border text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-primary" />
                  <span>University Roll / ID</span>
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. 24BCSE102"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="rounded-xl bg-secondary/50 border-border text-xs h-9"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-primary" />
                  <span>Institution</span>
                </label>
                <Input
                  disabled
                  value={college}
                  className="rounded-xl bg-secondary/30 border-border text-xs h-9 opacity-80"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 3: Academic Department & Tech Interests */}
        <Step>
          <div className="space-y-3 text-left py-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-poppins text-foreground flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>Academic &amp; Technical Interests</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tell us your academic tier and what domains you are passionate about.
              </p>
            </div>

            {/* Year Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Year of Study <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYear(y)}
                    className={`py-1.5 px-2 rounded-xl border-2 border-black text-xs font-space font-bold transition-all ${
                      year === y
                        ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                        : "bg-white text-black/80 hover:bg-zinc-100"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Branch / Department <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Computer Science & Engineering / Cyber Security"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="rounded-xl border-2 border-black text-xs h-9 bg-white text-black"
              />
            </div>

            {/* Domains Chips */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-semibold text-muted-foreground flex items-center justify-between">
                <span>Select Technical Domains (Multi-select)</span>
                <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DOMAINS.map((domain) => {
                  const active = selectedInterests.includes(domain);
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => toggleInterest(domain)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] border-2 border-black font-space transition-all ${
                        active
                          ? "bg-[#FFE600] text-black font-bold shadow-[2px_2px_0px_#000]"
                          : "bg-white text-black/80 hover:bg-zinc-100 font-medium"
                      }`}
                    >
                      {domain}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GitHub Profile (Optional) */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-medium text-muted-foreground">
                GitHub or Portfolio URL (Optional)
              </label>
              <Input
                placeholder="https://github.com/username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="rounded-xl bg-secondary/50 border-border text-xs h-9"
              />
            </div>
          </div>
        </Step>

        {/* STEP 4: Review & Finalize */}
        <Step>
          <div className="space-y-3.5 text-left py-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-poppins text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Review &amp; Unlock Membership</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Verify your registration details before confirming.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b-2 border-black/10">
                <span className="text-muted-foreground font-semibold">Full Name:</span>
                <span className="font-bold text-foreground">{fullName || "Not provided"}</span>
              </div>
              <div className="flex justify-between py-1 border-b-2 border-black/10">
                <span className="text-muted-foreground font-semibold">University Email:</span>
                <span className="font-medium text-foreground">{email || "Not provided"}</span>
              </div>
              <div className="flex justify-between py-1 border-b-2 border-black/10">
                <span className="text-muted-foreground font-semibold">Roll / ID Number:</span>
                <span className="font-mono font-bold text-foreground">{rollNumber || "Not provided"}</span>
              </div>
              <div className="flex justify-between py-1 border-b-2 border-black/10">
                <span className="text-muted-foreground font-semibold">Academic Tier:</span>
                <span className="font-bold text-foreground">{year} • {branch}</span>
              </div>
              <div className="py-1">
                <span className="text-muted-foreground font-semibold block mb-1">Selected Domains:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-0.5 rounded-md bg-[#FFE600] text-black border border-black text-[10px] font-bold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#88EA73] border-2 border-black shadow-[2px_2px_0px_#000] text-[11px] text-black font-semibold flex items-center gap-2">
              <MessageCircle className="w-4 h-4 shrink-0 text-black stroke-[2.5]" />
              <span>Click Activate to unlock instant access to the DevNest WhatsApp community.</span>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}

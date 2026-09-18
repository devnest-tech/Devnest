import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Brain,
  Flag,
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Users,
  Terminal,
  MapPin,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import type { AcademicYear, CompetitionTrack } from "../../server/prarambh-storage";

interface PrarambhApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultYear?: AcademicYear;
  onSuccess?: () => void;
}

export function PrarambhApplyDialog({
  open,
  onOpenChange,
  defaultYear = "1st Year",
  onSuccess,
}: PrarambhApplyDialogProps) {
  const [year, setYear] = useState<AcademicYear>(defaultYear);
  const [teamSize, setTeamSize] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [college, setCollege] = useState("Lamrin Tech Skills University Punjab");
  const [course, setCourse] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [section, setSection] = useState("");
  const [teamName, setTeamName] = useState("");
  const [handleOrGithub, setHandleOrGithub] = useState("");

  // Teammate 2 Details (for CTF team size = 2)
  const [teammateName, setTeammateName] = useState("");
  const [teammatePhone, setTeammatePhone] = useState("");
  const [teammateRollNumber, setTeammateRollNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Derive competition based on strict eligibility rules
  const getCompetitionForYear = (selectedYear: AcademicYear): CompetitionTrack => {
    switch (selectedYear) {
      case "1st Year":
        return "tech-quiz";
      case "2nd Year":
        return "ctf-2nd-year";
      case "3rd Year":
        return "ctf-3rd-year";
    }
  };

  const currentCompetition = getCompetitionForYear(year);
  const isFresher = year === "1st Year" || currentCompetition === "tech-quiz";

  // When year is 1st Year, force teamSize to 1 (individual only)
  const handleYearChange = (newYear: AcademicYear) => {
    setYear(newYear);
    if (newYear === "1st Year") {
      setTeamSize(1);
    }
  };

  const getCompetitionDetails = (comp: CompetitionTrack) => {
    switch (comp) {
      case "tech-quiz":
        return {
          title: "Tech Quiz",
          eligibility: "1st Year (Freshers) Only",
          teamRule: "Individual Participation Only (1 participant)",
          badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/30",
          icon: <Brain className="w-5 h-5 text-blue-500" />,
          desc: "Fast-paced quiz on programming concepts, data structures, logic, and modern tech trends.",
        };
      case "ctf-2nd-year":
        return {
          title: "Capture The Flag (CTF)",
          section: "2nd Year Senior Section",
          eligibility: "2nd Year Seniors",
          teamRule: "Team Size: 1 - 2 Members (Solo or Duo)",
          badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
          icon: <Flag className="w-5 h-5 text-emerald-500" />,
          desc: "Hands-on cybersecurity challenges: web exploits, crypto, steganography, and reverse engineering.",
        };
      case "ctf-3rd-year":
        return {
          title: "Capture The Flag (CTF)",
          section: "3rd Year Senior Section",
          eligibility: "3rd Year Seniors",
          teamRule: "Team Size: 1 - 2 Members (Solo or Duo)",
          badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/30",
          icon: <Flag className="w-5 h-5 text-purple-500" />,
          desc: "Advanced security challenges: binary exploitation, network forensics, privileges, and CTF flags.",
        };
    }
  };

  const compDetails = getCompetitionDetails(currentCompetition);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !rollNumber.trim() || !college.trim()) {
      setError("Please fill in all mandatory personal details.");
      return;
    }

    if (!course.trim() || !specialization.trim()) {
      setError("Course Name and Specialization are compulsory. Please type both manually.");
      return;
    }

    if (!section.trim()) {
      setError("Section is compulsory. Please type your section manually.");
      return;
    }

    if (!isFresher && !teamName.trim()) {
      setError("Please enter your Team / Squad Name.");
      return;
    }

    const effectiveTeamSize: 1 | 2 = isFresher ? 1 : teamSize;

    if (effectiveTeamSize === 2) {
      if (!teammateName.trim() || !teammatePhone.trim() || !teammateRollNumber.trim()) {
        setError("Please provide Team Member 2's Full Name, Phone Number, and University Roll Number.");
        return;
      }
    }

    setLoading(true);

    try {
      const formattedBranch = `${course.trim()} - ${specialization.trim()} (${section.trim()})`;
      const resolvedTeamName = isFresher
        ? (teamName.trim() || "Individual")
        : teamName.trim();

      const res = await fetch("/api/events/prarambh-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          rollNumber: rollNumber.trim().toUpperCase(),
          college: college.trim(),
          branch: formattedBranch,
          course: course.trim(),
          specialization: specialization.trim(),
          section: section.trim(),
          year,
          competition: currentCompetition,
          teamSize: effectiveTeamSize,
          teammateName: effectiveTeamSize === 2 ? teammateName.trim() : undefined,
          teammatePhone: effectiveTeamSize === 2 ? teammatePhone.trim() : undefined,
          teammateRollNumber: effectiveTeamSize === 2 ? teammateRollNumber.trim() : undefined,
          venue: "IBM Lab in Lamrin Tech Skills University Punjab",
          teamName: resolvedTeamName,
          handleOrGithub: handleOrGithub ? handleOrGithub.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting application";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
    setTeamSize(1);
    setFullName("");
    setEmail("");
    setPhone("");
    setRollNumber("");
    setCourse("");
    setSpecialization("");
    setSection("");
    setTeamName("");
    setHandleOrGithub("");
    setTeammateName("");
    setTeammatePhone("");
    setTeammateRollNumber("");
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 rounded-3xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-left pb-3 border-b border-border/50">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold tracking-wider uppercase">
              DevNest Flagship 2026
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              To be determined
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              IBM Lab, LTSU Punjab
            </span>
          </div>

          <DialogTitle className="text-2xl sm:text-3xl font-poppins font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <span>Prarambh</span>
            <span className="text-gradient-primary">Registration</span>
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Apply for DevNest&apos;s premier dual-track competition. Tech Quiz (Individual) for 1st years &amp; Capture The Flag (1-2 Members) for 2nd/3rd year seniors.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Application Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Thank you, <strong className="text-foreground">{fullName}</strong>. Your registration for{" "}
                <strong className="text-primary">{compDetails.title} ({compDetails.section || compDetails.eligibility})</strong>{" "}
                has been recorded successfully.
              </p>
            </div>

            {/* Confirmation Box */}
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Candidate:</span>
                <span className="font-semibold text-foreground">{fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Academic Year:</span>
                <span className="font-semibold text-foreground">{year}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Course &amp; Spec:</span>
                <span className="font-semibold text-foreground">{course} - {specialization}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Class Section:</span>
                <span className="font-mono font-semibold text-foreground">{section}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Allocated Competition:</span>
                <span className="font-semibold text-primary">{compDetails.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Team Size:</span>
                <span className="font-semibold text-foreground">
                  {currentCompetition === "tech-quiz"
                    ? "Individual (Solo)"
                    : teamSize === 2
                    ? `Team of 2 (Duo: ${fullName} & ${teammateName})`
                    : "Solo (1 Member)"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Venue:</span>
                <span className="font-semibold text-foreground text-right">
                  IBM Lab in Lamrin Tech Skills University Punjab
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Event Date:</span>
                <span className="font-semibold text-foreground">To be determined</span>
              </div>
            </div>

            {/* WHATSAPP GROUP INVITE CTA */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2.5 max-w-md mx-auto shadow-subtle">
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Join Official Prarambh WhatsApp Group</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Stay updated on spot reporting schedules in IBM Lab, track briefings, rules, and problem credentials.
              </p>
              <a
                href="https://chat.whatsapp.com/J924mHUIKklKwG57rmTA1b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/30 transition-all duration-200 transform active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Join WhatsApp Group Now</span>
              </a>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => handleClose(false)}
                className="w-full sm:w-auto px-8 rounded-xl font-semibold shadow-subtle hover:shadow-glow-primary"
              >
                Close &amp; Return to Events
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Academic Year Selection (Rules Enforcer) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                <span>Select Your Academic Year (Strict Eligibility)</span>
                <span className="text-destructive">*</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(["1st Year", "2nd Year", "3rd Year"] as AcademicYear[]).map((y) => {
                  const isSelected = year === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => handleYearChange(y)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-subtle scale-[1.02]"
                          : "bg-secondary/60 text-muted-foreground border-border/70 hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="font-bold">{y}</span>
                      <span className="text-[10px] opacity-80">
                        {y === "1st Year" ? "Freshers" : "Senior"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assigned Competition Banner & Team Size Rule */}
            <div className={`p-3.5 rounded-2xl border ${compDetails.badgeColor} flex items-start gap-3 transition-colors duration-200`}>
              <div className="p-2 rounded-xl bg-background/80 shadow-2xs shrink-0">
                {compDetails.icon}
              </div>
              <div className="text-left space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Allocated Track:
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {compDetails.title}
                  </span>
                  {compDetails.section && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-background/60 border border-current">
                      {compDetails.section}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium opacity-90 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{compDetails.teamRule}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-85 pt-0.5">
                  {compDetails.desc}
                </p>
              </div>
            </div>

            {/* Venue Card Notice */}
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="font-medium text-foreground">Venue:</span>
                <span>IBM Lab in Lamrin Tech Skills University Punjab</span>
              </div>
            </div>

            {/* Team Size Selector for CTF (2nd and 3rd Year Seniors) */}
            {currentCompetition !== "tech-quiz" ? (
              <div className="space-y-2 p-3 rounded-2xl bg-secondary/30 border border-border/70">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>CTF Team Size (1 - 2 Members)</span>
                    <span className="text-destructive">*</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">Max 2 participants</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTeamSize(1)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      teamSize === 1
                        ? "bg-primary text-primary-foreground border-primary shadow-subtle"
                        : "bg-secondary/60 text-muted-foreground border-border/70 hover:bg-secondary"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Solo (1 Member)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTeamSize(2)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      teamSize === 2
                        ? "bg-primary text-primary-foreground border-primary shadow-subtle"
                        : "bg-secondary/60 text-muted-foreground border-border/70 hover:bg-secondary"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Team of 2 (Duo)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center gap-2">
                <Brain className="w-4 h-4 shrink-0" />
                <span>Tech Quiz is strictly individual. Each fresher competes solo.</span>
              </div>
            )}

            {/* Candidate 1 (Primary Applicant) Details */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>
                  {currentCompetition !== "tech-quiz" && teamSize === 2
                    ? "Team Leader / Member 1 Details"
                    : "Participant Details"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    WhatsApp / Phone <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    University Roll / ID <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. 24BCSE102"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    College / Institution <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="Lamrin Tech Skills University Punjab"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    <span>Course Name</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. B.Tech / BCA / MCA"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    <span>Specialization</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. CSE / AI & ML / Cyber Security"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1 text-left sm:col-span-2">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>Section (Type your section manually)</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. Section A / Section B / Group 1"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>
              </div>
            </div>

            {/* Team Member 2 Section (When CTF and teamSize === 2) */}
            {currentCompetition !== "tech-quiz" && teamSize === 2 && (
              <div className="space-y-2 p-3.5 rounded-2xl bg-secondary/40 border border-primary/30 animate-in fade-in-50 duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Team Member 2 (Second Participant)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      Member 2 Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. Rohan Gupta"
                      value={teammateName}
                      onChange={(e) => setTeammateName(e.target.value)}
                      className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      Member 2 Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 98123 45678"
                      value={teammatePhone}
                      onChange={(e) => setTeammatePhone(e.target.value)}
                      className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1 text-left sm:col-span-2">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-primary" />
                      <span>Member 2 University Roll / ID Number</span>
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. 24BCSE145"
                      value={teammateRollNumber}
                      onChange={(e) => setTeammateRollNumber(e.target.value)}
                      className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Team / Squad Name (Mandatory only for CTF seniors, removed for Freshers) & Profile Handle (Optional) */}
            <div className={`grid grid-cols-1 ${!isFresher ? "sm:grid-cols-2" : ""} gap-3 pt-1`}>
              {!isFresher && (
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>Team / Squad Name</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. CyberKnights"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                  />
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span>GitHub / Discord / CTF Handle (Optional)</span>
                </label>
                <Input
                  placeholder="@handle or github.com/user"
                  value={handleOrGithub}
                  onChange={(e) => setHandleOrGithub(e.target.value)}
                  className="rounded-xl bg-secondary/50 border-border/70 text-xs sm:text-sm h-10"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Zero registration fee • Verified certificate &amp; prizes</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleClose(false)}
                  disabled={loading}
                  className="rounded-xl text-xs flex-1 sm:flex-initial"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl text-xs sm:text-sm font-semibold shadow-subtle hover:shadow-glow-primary min-w-[140px] flex-1 sm:flex-initial"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <span>Apply for Prarambh</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

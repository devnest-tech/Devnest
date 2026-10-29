import Head from "next/head";
import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import {
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  FileText,
  Award,
  ArrowLeft,
  Loader2,
  User,
  Hash,
  Layers,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VerifiedCertificate, VerifyApiResponse } from "@/pages/api/certificates/verify";

const EVENT_MAP: Record<string, string> = {
  "prarambh-2026": "Prarambh 2026: Tech Quiz & Capture The Flag (CTF)",
};

export default function CertificateDownloadPage() {
  const [nameInput, setNameInput] = useState("");
  const [rollInput, setRollInput] = useState("");
  const [eventName, setEventName] = useState("prarambh-2026");
  const [isSearching, setIsSearching] = useState(false);
  const [lookupResult, setLookupResult] = useState<VerifyApiResponse | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<VerifiedCertificate | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const rollInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const trimmedName = nameInput.trim();
    const trimmedRoll = rollInput.trim();

    if (!trimmedName || !trimmedRoll) {
      setClientError("Please fill in both your Full Name and University Roll Number.");
      return;
    }

    setIsSearching(true);
    setLookupResult(null);
    setSelectedRecord(null);

    try {
      const response = await fetch("/api/certificates/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          rollNumber: trimmedRoll,
          eventId: eventName,
        }),
      });

      const data: VerifyApiResponse = await response.json();
      setLookupResult(data);

      if (data.status === "found" && data.records && data.records.length > 0) {
        setSelectedRecord(data.primaryRecord || data.records[0]);
      } else {
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error("[CertificateDownload] Search request error:", err);
      setLookupResult({
        status: "error",
        message: "Unable to connect to certificate verification service. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setNameInput("");
    setRollInput("");
    setEventName("prarambh-2026");
    setLookupResult(null);
    setSelectedRecord(null);
    setClientError(null);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  return (
    <Layout>
      <Head>
        <title>DevNest | Find Your Certificate</title>
        <meta
          name="description"
          content="Find and download your official DevNest event and competition certificates using your registered name and university roll number."
        />
      </Head>

      <div className="min-h-screen py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Events</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600] text-black border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000]">
              <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              Official Credentials Registry
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black tracking-tight text-foreground">
              Download <span className="text-gradient-primary">Certificate</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium">
              Enter both your registered full name and university roll number to locate and verify your official DevNest event certificate.
            </p>
          </div>

          {/* Main Lookup Card */}
          <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-10 shadow-[5px_5px_0px_#000]">
            {/* Search Input Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Field 1: Full Name */}
              <div>
                <Label
                  htmlFor="nameInput"
                  className="block text-xs sm:text-sm font-bold text-black mb-1.5 text-left"
                >
                  Full Name (as registered) *
                </Label>
                <div className="relative">
                  <Input
                    ref={nameInputRef}
                    id="nameInput"
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (clientError) setClientError(null);
                      if (lookupResult) setLookupResult(null);
                    }}
                    placeholder="e.g. Alex"
                    className="h-12 pl-4 pr-10 rounded-2xl border-2 border-black bg-[#FAF7EE] text-black placeholder:text-neutral-500 font-semibold text-sm sm:text-base shadow-[2px_2px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
                    disabled={isSearching}
                    autoComplete="name"
                    required
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5 text-left font-medium">
                  Enter your full name as provided during event registration (case-insensitive).
                </p>
              </div>

              {/* Field 2: University Roll Number */}
              <div>
                <Label
                  htmlFor="rollInput"
                  className="block text-xs sm:text-sm font-bold text-black mb-1.5 text-left"
                >
                  University Roll / Enrollment Number *
                </Label>
                <div className="relative">
                  <Input
                    ref={rollInputRef}
                    id="rollInput"
                    type="text"
                    value={rollInput}
                    onChange={(e) => {
                      setRollInput(e.target.value);
                      if (clientError) setClientError(null);
                      if (lookupResult) setLookupResult(null);
                    }}
                    placeholder="e.g. 24100010001 or 25100030016"
                    className="h-12 pl-4 pr-10 rounded-2xl border-2 border-black bg-[#FAF7EE] text-black placeholder:text-neutral-500 font-mono text-sm sm:text-base font-bold shadow-[2px_2px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
                    disabled={isSearching}
                    autoComplete="off"
                    required
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <Hash className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5 text-left font-medium">
                  Enter your complete roll number. Leading zeros and digits are strictly preserved.
                </p>
              </div>

              {/* Field 3: Event */}
              <div>
                <Label
                  htmlFor="eventName"
                  className="block text-xs sm:text-sm font-bold text-black mb-1.5 text-left"
                >
                  Event *
                </Label>
                <Select
                  value={eventName}
                  onValueChange={(val) => {
                    setEventName(val);
                    if (clientError) setClientError(null);
                    if (lookupResult) setLookupResult(null);
                  }}
                  required
                >
                  <SelectTrigger
                    id="eventName"
                    className="h-12 rounded-2xl border-2 border-black bg-[#FAF7EE] text-black font-semibold text-sm shadow-[2px_2px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
                    {Object.entries(EVENT_MAP).map(([id, displayName]) => (
                      <SelectItem
                        key={id}
                        value={id}
                        className="text-xs sm:text-sm font-bold cursor-pointer focus:bg-[#FFE600] focus:text-black"
                      >
                        {displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-neutral-500 mt-1.5 text-left font-medium">
                  Select the official DevNest event you participated in.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="w-full sm:flex-1 h-12 rounded-2xl bg-[#FFE600] text-black hover:bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 font-black text-sm transition-all gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Searching certificates...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      <span>Download Official Certificate</span>
                    </>
                  )}
                </Button>

                {(lookupResult || nameInput || rollInput) && (
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="w-full sm:w-auto h-12 rounded-2xl border-2 border-black bg-white hover:bg-neutral-100 text-black font-bold text-xs shadow-[2px_2px_0px_#000] gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Search</span>
                  </Button>
                )}
              </div>
            </form>

            {/* Validation / Client Error Alert */}
            {clientError && (
              <div
                role="alert"
                className="mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-black shadow-[3px_3px_0px_#000] text-left flex items-start gap-3 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs sm:text-sm text-black">
                    Incomplete Details
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {clientError}
                  </p>
                </div>
              </div>
            )}

            {/* General Server Error Alert */}
            {lookupResult?.status === "error" && (
              <div
                role="alert"
                className="mt-6 p-4 rounded-2xl bg-red-50 border-2 border-black shadow-[3px_3px_0px_#000] text-left flex items-start gap-3 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs sm:text-sm text-black">
                    Search Error
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {lookupResult.message || "An error occurred while searching. Please try again."}
                  </p>
                </div>
              </div>
            )}

            {/* Not Found State */}
            {lookupResult?.status === "not_found" && (
              <div
                role="status"
                className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#FAF7EE] border-2 border-black shadow-[4px_4px_0px_#000] text-left space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                    <AlertCircle className="w-5 h-5 text-amber-800" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-poppins font-black text-sm sm:text-base text-black">
                      No Certificate Found
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                      No certificate matches this name and roll number. Please check your details or contact DevNest.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-black/20 text-xs text-neutral-700 space-y-1">
                  <p>
                    <span className="font-bold text-black">Searched Name:</span>{" "}
                    <span className="font-semibold">{nameInput.trim()}</span>
                  </p>
                  <p>
                    <span className="font-bold text-black">Searched Roll Number:</span>{" "}
                    <span className="font-mono font-bold">{rollInput.trim()}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-black/10 text-xs text-neutral-600 space-y-1.5">
                  <p className="font-bold text-neutral-800">Verification Guidelines:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Both the student name and roll number must match the certificate record.</li>
                    <li>Verify there are no typos in your roll number or name spelling.</li>
                    <li>
                      Need assistance? Contact our team at{" "}
                      <a
                        href="mailto:devnest.techclub@gmail.com"
                        className="font-bold text-black underline underline-offset-2 hover:text-primary"
                      >
                        devnest.techclub@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>

                <Button
                  type="button"
                  onClick={handleReset}
                  size="sm"
                  className="rounded-xl border-2 border-black bg-white hover:bg-[#FFE600] text-black font-bold text-xs shadow-[2px_2px_0px_#000]"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Try Another Search
                </Button>
              </div>
            )}

            {/* Found State: Matched Certificate Record */}
            {lookupResult?.status === "found" && selectedRecord && (
              <div
                role="region"
                aria-label="Certificate Details"
                className="mt-6 p-5 sm:p-7 rounded-2xl bg-[#FAF7EE] border-2 border-black shadow-[4px_4px_0px_#000] text-left space-y-5 animate-in fade-in duration-200"
              >
                {/* Status Banner */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b-2 border-black/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#88EA73] border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-black text-sm sm:text-base text-black">
                        Certificate Found
                      </h3>
                      <p className="text-[11px] text-neutral-600 font-semibold">
                        Official document verified in DevNest records
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-black text-[11px] font-bold text-black shadow-[1px_1px_0px_#000]">
                    <FileText className="w-3 h-3 text-red-600" />
                    PDF Document
                  </span>
                </div>

                {/* Multiple Certificates Selector (if student has multiple matches) */}
                {lookupResult.records && lookupResult.records.length > 1 && (
                  <div className="p-3 rounded-xl bg-white border-2 border-black space-y-2">
                    <p className="text-xs font-bold text-black flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Multiple certificates found ({lookupResult.records.length} available):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lookupResult.records.map((rec, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedRecord(rec)}
                          className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${selectedRecord.fileName === rec.fileName
                            ? "bg-[#FFE600] text-black border-black shadow-[2px_2px_0px_#000]"
                            : "bg-[#FAF7EE] text-neutral-700 border-neutral-300 hover:border-black"
                            }`}
                        >
                          <p className="truncate">{rec.fileName}</p>
                          <p className="text-[10px] text-neutral-600 font-normal">
                            {rec.division || rec.eventName || "Participation Certificate"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verified Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  {/* Student Name */}
                  <div className="sm:col-span-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block">
                      Student Full Name
                    </span>
                    <p className="font-poppins font-black text-lg sm:text-xl text-black mt-0.5">
                      {selectedRecord.studentName}
                    </p>
                  </div>

                  {/* University Roll Number */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block">
                      University Roll Number
                    </span>
                    <p className="font-mono font-bold text-sm sm:text-base text-black mt-0.5">
                      {selectedRecord.rollNumber}
                    </p>
                  </div>

                  {/* Division / Track */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block">
                      Academic Division
                    </span>
                    <p className="font-bold text-xs sm:text-sm text-black mt-0.5">
                      {selectedRecord.division || "Official Competition Division"}
                    </p>
                  </div>

                  {/* Matching PDF File */}
                  <div className="sm:col-span-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block">
                      Matching PDF File
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-neutral-800 font-bold mt-0.5 truncate bg-[#FAF7EE] p-2 rounded-lg border border-black/15">
                      {selectedRecord.fileName}
                    </p>
                  </div>
                </div>

                {/* Primary Actions: View & Download */}
                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* View Certificate in New Tab */}
                    <Button
                      asChild
                      className="w-full h-12 rounded-2xl bg-[#FFE600] text-black hover:bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] font-black text-xs sm:text-sm transition-all"
                    >
                      <a
                        href={selectedRecord.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                        <span>View Certificate</span>
                      </a>
                    </Button>

                    {/* Download Certificate */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 rounded-2xl bg-black text-white hover:bg-neutral-800 border-2 border-black shadow-[3px_3px_0px_#000] font-bold text-xs sm:text-sm transition-all"
                    >
                      <a
                        href={selectedRecord.filePath}
                        download={selectedRecord.fileName}
                        className="flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>Download Certificate</span>
                      </a>
                    </Button>
                  </div>

                  {/* Search another roll number */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black underline underline-offset-4 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Search another certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Institutional Note & Help */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              DevNest event certificates are verified academic credentials issued by Lamrin Tech Skills University Punjab.
            </p>
            <p className="text-xs text-muted-foreground">
              Questions regarding certificates or results? Contact us at{" "}
              <a
                href="mailto:devnest.techclub@gmail.com"
                className="font-bold text-foreground underline underline-offset-2 hover:text-primary"
              >
                devnest.techclub@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

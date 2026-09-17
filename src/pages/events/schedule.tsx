import { Calendar, Clock, Users, Zap, ChevronDown, ArrowLeft, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const events = [
	{
		id: 1,
		title: "Industry Guest Lecture",
		subtitle: "Competitive Exams, Aptitude Skills & Career Pathways",
		month: "February 2026",
		speaker: "Mr. Amit Kumar Jaiswal",
		speakerRole: "Founder – Aptitude360.online",
		speakerDetails: "IIM Graduate | 15+ years | Mentored 10,000+ students | UPSC, CAT, SSC, Banking Expert",
		icon: "🎓",
		status: "completed",
		schedule: [
			{ time: "10:00 - 10:10", activity: "Inaugural Address", description: "Welcome address and introduction of the speaker" },
			{ time: "10:10 - 11:20", activity: "Expert Guest Lecture", description: "Session on competitive examinations, skill development, career pathways, and industry expectations" },
			{ time: "11:20 - 11:40", activity: "Interactive Q&A Session", description: "Open interaction between students and the guest speaker" },
			{ time: "11:40 - 11:55", activity: "Felicitation", description: "Presentation of memento and certificate of appreciation" },
			{ time: "11:55 - 12:00", activity: "Vote of Thanks", description: "Formal closure of the session" },
		],
	},
	{
		id: 2,
		title: "Promptathon in Yuva Kaushal",
		subtitle: "AI Prompt Engineering Competition – Grand Success!",
		month: "February 25, 2026",
		duration: "4 Hours",
		teamSize: "Individual or 2 members",
		icon: "⚡",
		status: "completed",
		attendees: "68",
		schedule: [
			{ time: "10:30 - 11:00", activity: "Registration & Setup", description: "Participant check-in and system allocation at IBM Lab" },
			{ time: "11:00 - 11:15", activity: "Opening & Briefing", description: "Event rules, judging criteria, and prompt engineering basics" },
			{ time: "11:15 - 13:00", activity: "Competition Phase I", description: "Solving prompt engineering challenges - Pure thinking power" },
			{ time: "13:00 - 13:30", activity: "Break & Evaluation", description: "Short break while initial submissions are evaluated" },
			{ time: "13:30 - 14:45", activity: "Competition Phase II", description: "Advanced challenges - Craft prompts that push AI past the obvious" },
			{ time: "14:45 - 15:00", activity: "Final Submission & Results", description: "Code freeze, evaluation completion, and result declaration" },
		],
	},
	{
		id: 3,
		title: "DataForge Datathon & CyberSprint CTF",
		subtitle: "Dual Track Flagship Innovation Competition",
		month: "April 2026",
		icon: "🛡️",
		status: "upcoming",
		schedule: [
			{ time: "09:00 - 09:30", activity: "Registration", description: "Participant check-in for Datathon and CTF tracks" },
			{ time: "09:30 - 10:00", activity: "Orientation Session", description: "Rules, datasets, tools, and CTF platform briefing" },
			{ time: "10:00 - 13:00", activity: "Phase I", description: "Data analysis, model building, initial CTF challenges" },
			{ time: "13:00 - 14:00", activity: "Lunch Break", description: "Lunch" },
			{ time: "14:00 - 16:30", activity: "Phase II", description: "Advanced analytics, visualization, complex security challenges" },
			{ time: "16:30 - 17:00", activity: "Final Submission", description: "Submission of reports, dashboards, and captured flags" },
			{ time: "17:00 - 18:00", activity: "Evaluation & Results", description: "Score validation, winner announcement, prize distribution" },
		],
	},
	{
		id: 4,
		title: "IdeaFusion Ideathon",
		subtitle: "Innovation & Startup Ideation",
		month: "May 2026",
		icon: "💡",
		status: "upcoming",
		schedule: [
			{ time: "09:30 - 10:00", activity: "Registration", description: "Team check-in and seating" },
			{ time: "10:00 - 10:30", activity: "Idea Briefing", description: "Theme explanation, evaluation parameters" },
			{ time: "10:30 - 12:30", activity: "Idea Development", description: "Problem identification, solution framing" },
			{ time: "12:30 - 13:30", activity: "Lunch Break", description: "Lunch" },
			{ time: "13:30 - 15:30", activity: "Prototype & Pitch Preparation", description: "Business model, prototype/mock-up, pitch deck" },
			{ time: "15:30 - 16:30", activity: "Final Pitch", description: "Presentation before evaluation panel" },
			{ time: "16:30 - 17:00", activity: "Results & Closing", description: "Announcement of winners and closing remarks" },
		],
	},
	{
		id: 5,
		title: "CyberSprint Hackathon",
		subtitle: "Cybersecurity & Web Defense Focus",
		month: "June 2026",
		icon: "🔐",
		status: "upcoming",
		schedule: [
			{ time: "09:00 - 09:30", activity: "Registration & Team Check-in", description: "Team verification, ID confirmation, system allocation" },
			{ time: "09:30 - 09:45", activity: "Event Briefing", description: "Explanation of rules, problem statements, judging criteria" },
			{ time: "09:45 - 13:00", activity: "Development Phase I", description: "Ideation, requirement analysis, initial coding" },
			{ time: "13:00 - 13:30", activity: "Working Lunch", description: "Lunch break with continued development" },
			{ time: "13:30 - 16:00", activity: "Development Phase II", description: "Core development, debugging, mentor interactions" },
			{ time: "16:00 - 16:30", activity: "Final Submission", description: "Code freeze and project submission" },
			{ time: "16:30 - 17:30", activity: "Project Demonstrations", description: "Live demos and evaluation by jury" },
			{ time: "17:30 - 18:00", activity: "Valedictory Session", description: "Result declaration, prize distribution, closing remarks" },
		],
	},
	{
		id: 6,
		title: "Prarambh 2026: Tech Quiz & Capture The Flag (CTF)",
		subtitle: "Venue: IBM Lab in Lamrin Tech Skills University Punjab — Tech Quiz (1st Year) & CTF (2nd/3rd Year Seniors)",
		month: "August 18, 2026",
		duration: "Full Day (09:30 - 17:30)",
		teamSize: "Tech Quiz: Individual | CTF: 1-2 Members",
		icon: "🏆",
		status: "upcoming",
		schedule: [
			{ time: "09:30 - 10:00", activity: "Reporting & Verification", description: "Candidate check-in, student ID verification, and system setup in IBM Lab, Lamrin Tech Skills University Punjab" },
			{ time: "10:00 - 10:30", activity: "Opening Address & Rules Briefing", description: "Inauguration, announcement of rules for Tech Quiz (Freshers) and CTF (2nd & 3rd Year separate sections)" },
			{ time: "10:30 - 13:00", activity: "Phase I: Tech Quiz & CTF Preliminary", description: "Tech Quiz Round 1 & 2 (1st Year Freshers) | CTF Jeopardy Challenges & Flag Captures (Senior Divisions)" },
			{ time: "13:00 - 14:00", activity: "Lunch & Networking Break", description: "Buffet lunch & networking with senior mentors" },
			{ time: "14:00 - 16:15", activity: "Phase II: Tech Quiz Finale & CTF Advanced", description: "Tech Quiz Rapid-Fire Buzzer Finale | CTF Advanced Exploitation & Defense flags" },
			{ time: "16:15 - 17:00", activity: "Scoreboard Freeze & Final Evaluation", description: "Jury verification of flags and scores across all three divisions" },
			{ time: "17:00 - 17:30", activity: "Prize Distribution & Valedictory", description: "Announcement of Freshers Tech Quiz Champions, 2nd Year CTF Winners, and 3rd Year CTF Winners" },
		],
	},
];

export default function SchedulePage() {
	return (
		<Layout>
			<Head>
				<title>DevNest | 2026 Event Schedule & Roadmap</title>
				<meta
					name="description"
					content="Complete official schedule of DevNest hackathons, technical sessions, and competitions for 2026."
				/>
			</Head>

			<div className="min-h-screen py-16 sm:py-24">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
					{/* Navigation Back Link */}
					<div className="mb-8">
						<Link
							href="/events"
							className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
						>
							<ArrowLeft className="w-4 h-4" />
							<span>Back to All Events</span>
						</Link>
					</div>

					{/* Left-Aligned Header */}
					<div className="mb-12 text-left">
						<div className="badge-pill mb-4">
							<Sparkles className="w-3.5 h-3.5 text-primary" />
							<span>February – June 2026 Roadmap</span>
							<span className="text-muted-foreground/60">•</span>
							<span className="text-foreground/80 font-medium">Official Timeline</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 text-foreground">
							Event <span className="text-gradient-primary">Schedule</span>
						</h1>

						<p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
							Technical, Innovation & Industry Connect Flagship Events — Lamrin Tech Skills University Punjab.
							Click any session to view the complete hourly breakdown and participation details.
						</p>
					</div>

					{/* Events Accordion */}
					<Accordion type="single" collapsible className="space-y-4">
						{events.map((event, idx) => (
							<AccordionItem
								key={event.id}
								value={`event-${event.id}`}
								className="glass-panel rounded-2xl border border-border/80 hover:border-primary/40 shadow-subtle transition-all duration-200 overflow-hidden"
							>
								<AccordionTrigger className="hover:no-underline p-5 sm:p-7 [&[data-state=open]>div>div>div>svg]:rotate-180">
									<div className="flex flex-col sm:flex-row items-start justify-between gap-4 w-full text-left">
										<div className="flex items-start gap-3.5 sm:gap-4 flex-1">
											<span className="text-3xl sm:text-4xl shrink-0" aria-hidden="true">{event.icon}</span>

											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1 flex-wrap">
													<span className="px-2 py-0.5 rounded-md bg-secondary text-[11px] font-semibold text-muted-foreground border border-border/60">
														Event {idx + 1}
													</span>
													<h2 className="text-base sm:text-lg md:text-xl font-poppins font-bold text-foreground">
														{event.title}
													</h2>
												</div>

												<p className="text-xs sm:text-sm text-muted-foreground">
													{event.subtitle}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
											{event.status === "completed" ? (
												<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
													<CheckCircle2 className="w-3.5 h-3.5" />
													<span>Completed</span>
												</div>
											) : (
												<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium border border-border/60">
													<Clock className="w-3.5 h-3.5" />
													<span>Upcoming</span>
												</div>
											)}

											<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-semibold border border-border/60">
												<Calendar className="h-3 w-3 text-primary" />
												<span>{event.month}</span>
											</div>

											<div className="p-1 rounded-lg bg-secondary text-muted-foreground">
												<ChevronDown className="h-4 w-4 text-primary shrink-0 transition-transform duration-200" />
											</div>
										</div>
									</div>
								</AccordionTrigger>

								<AccordionContent className="px-5 sm:px-7 pb-6 sm:pb-7">
									<div className="pt-4 border-t border-border/50">
										{/* Completion Badge */}
										{event.status === "completed" && (
											<div className="mb-6 rounded-xl bg-primary/5 border border-primary/20 p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap">
												<div className="flex items-center gap-3">
													<div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary">
														<CheckCircle2 className="w-5 h-5" />
													</div>
													<div>
														<p className="font-bold text-sm text-foreground">
															Event Successfully Executed
														</p>
														{event.attendees && (
															<p className="text-xs text-muted-foreground">
																<strong>{event.attendees}</strong> participants took part and received certificates
															</p>
														)}
													</div>
												</div>

												<Link
													href="/certificate-download"
													className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
												>
													<span>Download Certificate</span>
													<ArrowRight className="w-3.5 h-3.5" />
												</Link>
											</div>
										)}

										{/* Speaker Box */}
										{event.speaker && (
											<div className="mb-6 rounded-xl bg-secondary/50 border border-border/60 p-4 sm:p-5">
												<p className="font-bold text-sm text-foreground mb-0.5">
													Featured Speaker: {event.speaker}
												</p>
												<p className="text-xs font-medium text-primary mb-1.5">
													{event.speakerRole}
												</p>
												<p className="text-xs text-muted-foreground leading-relaxed">
													{event.speakerDetails}
												</p>
											</div>
										)}

										{event.duration && (
											<div className="mb-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
												<span className="flex items-center gap-1.5">
													<Clock className="h-3.5 w-3.5 text-primary" />
													Duration: <strong className="text-foreground">{event.duration}</strong>
												</span>

												{event.teamSize && (
													<span className="flex items-center gap-1.5">
														<Users className="h-3.5 w-3.5 text-primary" />
														Format: <strong className="text-foreground">{event.teamSize}</strong>
													</span>
												)}
											</div>
										)}

										{/* Timeline */}
										<div>
											<h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
												<Clock className="h-3.5 w-3.5 text-primary" />
												<span>Detailed Session Timeline</span>
											</h3>

											<div className="space-y-2.5">
												{event.schedule.map((item, schedIdx) => (
													<div
														key={schedIdx}
														className="flex flex-col sm:flex-row gap-3 rounded-xl bg-secondary/40 border border-border/50 p-3 sm:p-4 hover:border-primary/30 transition-colors"
													>
														<div className="shrink-0">
															<span className="inline-block px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
																{item.time}
															</span>
														</div>

														<div className="flex-1">
															<p className="font-bold text-xs sm:text-sm text-foreground mb-0.5">
																{item.activity}
															</p>
															<p className="text-xs text-muted-foreground leading-relaxed">
																{item.description}
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>

					{/* Bottom Callout */}
					<section className="mt-16">
						<div className="glass-panel rounded-3xl p-8 sm:p-10 text-center border border-border/80 shadow-premium">
							<h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
								Ready to Compete & Innovate?
							</h2>

							<p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
								Gain hands-on skills, expand your peer network, and build winning projects under guidance from mentors.
							</p>

							<div className="flex gap-3 justify-center flex-wrap">
								<Link
									href="/events"
									className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
								>
									<span>View Upcoming Events</span>
									<ArrowRight className="w-4 h-4" />
								</Link>

								<Link
									href="/membership"
									className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 border border-border/80 font-semibold text-xs sm:text-sm transition-all duration-200"
								>
									<span>Join DevNest</span>
								</Link>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
}
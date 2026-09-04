import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DAeJBINDPNI64g6zV0b2TF";
const CONTACT_EMAILS = [
	"devnest.techclub@gmail.com",
] as const;
const PAYMENT_QR_ENDPOINT = "/api/payment-qr";

const normalizeRoll = (roll?: string | null) => roll?.trim().toLowerCase() ?? "";

export default function PromptathonRegistrationForm() {
	const { toast } = useToast();
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
		"idle"
	);
	const [paymentQr, setPaymentQr] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			rollNumber: "",
			year: "",
			department: "",
			participationType: "individual",
			teamName: "",
			teamMemberName: "",
			teamMemberEmail: "",
			teamMemberPhone: "",
			teamMemberRoll: "",
			teamMemberYear: "",
			teamMemberDepartment: "",
			questions: "",
			terms: false,
		},
	});

	const participationType = useWatch({
		control: form.control,
		name: "participationType",
	});

	const fetchPaymentQr = useCallback(async () => {
		try {
			const response = await fetch(PAYMENT_QR_ENDPOINT);
			if (!response.ok) return;

			const data = await response.json();
			if (data?.qrCode) {
				setPaymentQr(data.qrCode);
			}
		} catch {
			// QR loading failure should not block registration.
		}
	}, []);

	useEffect(() => {
		fetchPaymentQr();
	}, [fetchPaymentQr]);

	const onSubmit = async (values: Record<string, unknown>) => {
		setStatus("loading");

		try {
			const response = await fetch("/api/promptathon/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					rollNumber: normalizeRoll(values.rollNumber as string),
					teamMemberRoll: normalizeRoll(values.teamMemberRoll as string),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data?.message || "Registration failed");
			}

			setStatus("success");

			toast({
				title: "Registration successful!",
				description:
					"Your Promptathon registration has been submitted successfully.",
			});

			form.reset();

			window.open(WHATSAPP_GROUP_LINK, "_blank", "noopener,noreferrer");
		} catch (error) {
			setStatus("error");

			toast({
				variant: "destructive",
				title: "Registration failed",
				description:
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again.",
			});
		}
	};

	return (
		<section className="mx-auto max-w-4xl px-4 py-12">
			<div className="mb-10 text-center">
				<h2 className="text-3xl font-bold">Promptathon Registration</h2>
				<p className="mt-3 text-muted-foreground">
					Fill in your details to participate. You can register as an
					individual or as a team (max 2 members).
					<br />
					Fields marked with * are mandatory.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
					<div className="space-y-4">
						<div>
							<h3 className="text-xl font-semibold">Participant Details</h3>
							<p className="text-sm text-muted-foreground">
								We&apos;ll use this information to contact you about the event.
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="fullName"
								rules={{ required: "Name is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name *</FormLabel>
										<FormControl>
											<Input placeholder="Enter your full name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								rules={{
									required: "Email is required",
									pattern: {
										value: /^\S+@\S+\.\S+$/,
										message: "Enter a valid email address",
									},
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email *</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="you@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone"
								rules={{ required: "Phone number is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number *</FormLabel>
										<FormControl>
											<Input
												type="tel"
												placeholder="Enter your phone number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rollNumber"
								rules={{ required: "Roll number is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Roll Number *</FormLabel>
										<FormControl>
											<Input placeholder="Enter your roll number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="year"
								rules={{ required: "Year is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Year *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select year" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1st">1st Year</SelectItem>
												<SelectItem value="2nd">2nd Year</SelectItem>
												<SelectItem value="3rd">3rd Year</SelectItem>
												<SelectItem value="4th">4th Year</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="department"
								rules={{ required: "Department is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Department *</FormLabel>
										<FormControl>
											<Input placeholder="e.g. CSE, IT, ECE" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold">Participation</h3>
							<p className="text-sm text-muted-foreground">
								Choose whether you are participating individually or with a
								partner.
							</p>
						</div>

						<FormField
							control={form.control}
							name="participationType"
							rules={{ required: "Please select a participation type" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Participation Type *</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select participation type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="individual">Individual</SelectItem>
											<SelectItem value="team">Team of 2</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{participationType === "team" && (
							<div className="space-y-6 rounded-xl border p-5">
								<FormField
									control={form.control}
									name="teamName"
									rules={{
										required:
											participationType === "team"
												? "Team name is required"
												: false,
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Team Name *</FormLabel>
											<FormControl>
												<Input placeholder="Enter your team name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div>
									<h4 className="font-medium">Team Member Details</h4>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="teamMemberName"
										rules={{
											required:
												participationType === "team"
													? "Team member name is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Name *</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter team member name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="teamMemberEmail"
										rules={{
											required:
												participationType === "team"
													? "Team member email is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Email *</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="team@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="teamMemberPhone"
										rules={{
											required:
												participationType === "team"
													? "Team member phone is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Phone *</FormLabel>
												<FormControl>
													<Input
														type="tel"
														placeholder="Enter phone number"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="teamMemberRoll"
										rules={{
											required:
												participationType === "team"
													? "Team member roll number is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Roll Number *</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter roll number"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="teamMemberYear"
										rules={{
											required:
												participationType === "team"
													? "Team member year is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Year *</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select year" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="1st">1st Year</SelectItem>
														<SelectItem value="2nd">2nd Year</SelectItem>
														<SelectItem value="3rd">3rd Year</SelectItem>
														<SelectItem value="4th">4th Year</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="teamMemberDepartment"
										rules={{
											required:
												participationType === "team"
													? "Team member department is required"
													: false,
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Member Department *</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g. CSE, IT, ECE"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}
					</div>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold">Payment</h3>
							<p className="text-sm text-muted-foreground">
								Complete the payment using the QR code below and keep your
								payment proof ready if required.
							</p>
						</div>

						{paymentQr && (
							<div className="flex justify-center">
								<Image
									src={paymentQr}
									alt="Payment QR code"
									width={300}
									height={300}
									className="rounded-xl border"
								/>
							</div>
						)}

						<p className="text-center text-sm text-muted-foreground">
							For payment-related queries, contact{" "}
							<Link
								href={`mailto:${CONTACT_EMAILS[0]}`}
								className="text-primary underline-offset-4 hover:underline"
							>
								{CONTACT_EMAILS[0]}
							</Link>
							.
						</p>
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="questions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Questions or Special Requirements (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Any questions or special requirements?"
											className="resize-none"
											rows={3}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-start gap-3">
						<FormField
							control={form.control}
							name="terms"
							rules={{
								validate: (value) =>
									value || "You must agree before submitting",
							}}
							render={({ field }) => (
								<FormItem className="flex items-start space-x-3 space-y-0">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>
											I agree to share my details with DevNest Technical Club
											for event coordination. *
										</FormLabel>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-center">
						<Button
							type="submit"
							size="lg"
							disabled={status === "loading"}
							className="min-w-[200px]"
						>
							{status === "loading" ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit Registration"
							)}
						</Button>
					</div>

					<p className="text-center text-sm text-muted-foreground">
						By submitting this form, you agree to share your details with
						DevNest Technical Club for event coordination. For queries, contact{" "}
						{CONTACT_EMAILS[0]}.
					</p>
				</form>
			</Form>
		</section>
	);
}
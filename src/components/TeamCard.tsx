import Image from "next/image";
import { Github, Linkedin, Instagram, ArrowUpRight, Sparkles } from "lucide-react";

interface TeamMember {
	id: number;
	name: string;
	role: string;
	designation: string;
	bio: string;
	image: string;
	imagePosition?: string;
	socials: {
		github: string;
		linkedin: string;
		instagram: string;
	};
}

interface TeamCardProps {
	member: TeamMember;
}

const isValidLink = (link: string | undefined): boolean => {
	return !!link && link !== "#" && link.trim() !== "";
};

const renderMemberImage = (image: string, name: string, position?: string) => {
	const isFilePath =
		image.startsWith("/") ||
		image.startsWith("http") ||
		/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(image);

	if (isFilePath) {
		return (
			<div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden ring-2 ring-primary/20 border border-border/80 bg-secondary flex items-center justify-center shadow-subtle group-hover:ring-primary/40 transition-all duration-300">
				<Image
					src={image}
					alt={name}
					fill
					sizes="(max-width: 640px) 80px, 96px"
					style={position ? { objectPosition: position } : undefined}
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
		);
	}

	return (
		<div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl shadow-subtle group-hover:scale-105 transition-all duration-300">
			{image}
		</div>
	);
};

export function TeamCard({ member }: TeamCardProps) {
	return (
		<div className="group relative rounded-2xl p-6 glass-panel border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[340px]">
			{/* Top accent shine on hover */}
			<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

			{/* Front / Default Face (Visible on mobile and desktop until hover) */}
			<div className="flex flex-col items-center text-center w-full z-10">
				{/* Avatar */}
				<div className="mb-4">{renderMemberImage(member.image, member.name, member.imagePosition)}</div>

				{/* Designation Pill */}
				<span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
					{member.designation}
				</span>

				{/* Name */}
				<h3 className="text-lg font-bold font-poppins text-foreground group-hover:text-primary transition-colors duration-200">
					{member.name}
				</h3>

				{/* Role */}
				<p className="text-xs font-medium text-muted-foreground mt-0.5 mb-2">
					{member.role}
				</p>

				{/* Bio snippet on mobile, hover prompt on desktop */}
				<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 px-1 lg:hidden">
					{member.bio}
				</p>

				{/* Desktop Hover Hint */}
				<div className="hidden lg:flex items-center gap-1.5 text-xs text-primary/90 font-medium mt-4 pt-4 border-t border-border/60 w-full justify-center">
					<Sparkles className="w-3.5 h-3.5" />
					<span>Hover to reveal profiles</span>
				</div>

				{/* Mobile-only social links */}
				<div className="flex lg:hidden items-center justify-center gap-2 pt-4 mt-3 border-t border-border/60 w-full">
					{isValidLink(member.socials.github) && (
						<a
							href={member.socials.github}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 rounded-xl bg-muted/60 text-foreground/80 hover:text-primary hover:bg-primary/10 border border-border/70 transition-colors"
							title="GitHub"
						>
							<Github className="w-4 h-4" />
						</a>
					)}
					{isValidLink(member.socials.linkedin) && (
						<a
							href={member.socials.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 rounded-xl bg-muted/60 text-foreground/80 hover:text-primary hover:bg-primary/10 border border-border/70 transition-colors"
							title="LinkedIn"
						>
							<Linkedin className="w-4 h-4" />
						</a>
					)}
					{isValidLink(member.socials.instagram) && (
						<a
							href={member.socials.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 rounded-xl bg-muted/60 text-foreground/80 hover:text-primary hover:bg-primary/10 border border-border/70 transition-colors"
							title="Instagram"
						>
							<Instagram className="w-4 h-4" />
						</a>
					)}
				</div>
			</div>

			{/* Slide-In Desktop Hover Panel */}
			<div className="hidden lg:flex absolute inset-0 p-6 flex-col justify-between rounded-2xl backdrop-blur-xl bg-card/95 border border-primary/35 shadow-premium translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
				<div className="flex flex-col">
					{/* Header inside hover panel */}
					<div className="flex items-center justify-between gap-2 pb-3 border-b border-border/70">
						<div>
							<h4 className="font-bold text-sm text-foreground">{member.name}</h4>
							<p className="text-[11px] font-semibold text-primary">{member.designation}</p>
						</div>
						<span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
					</div>

					{/* Full Bio */}
					<div className="py-4">
						<p className="text-xs text-muted-foreground leading-relaxed max-h-[140px] overflow-y-auto pr-1">
							{member.bio}
						</p>
					</div>
				</div>

				{/* Interactive Social Buttons */}
				<div className="pt-3 border-t border-border/70">
					<p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 text-center">
						Connect with {member.name.split(" ")[0]}
					</p>
					<div className="flex items-center justify-center gap-2">
						{isValidLink(member.socials.github) && (
							<a
								href={member.socials.github}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-xl bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs transition-all duration-200 active:scale-95 group/link"
								title="GitHub Profile"
							>
								<Github className="w-4 h-4 transition-transform group-hover/link:scale-110" />
							</a>
						)}
						{isValidLink(member.socials.linkedin) && (
							<a
								href={member.socials.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-xl bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs transition-all duration-200 active:scale-95 group/link"
								title="LinkedIn Profile"
							>
								<Linkedin className="w-4 h-4 transition-transform group-hover/link:scale-110" />
							</a>
						)}
						{isValidLink(member.socials.instagram) && (
							<a
								href={member.socials.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-xl bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs transition-all duration-200 active:scale-95 group/link"
								title="Instagram Profile"
							>
								<Instagram className="w-4 h-4 transition-transform group-hover/link:scale-110" />
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
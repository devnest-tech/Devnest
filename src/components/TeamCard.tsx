import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";

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
	const isFilePath = image.startsWith('/') || image.startsWith('http') || /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(image);

	if (isFilePath) {
		return (
			<div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden mb-1.5 sm:mb-2 border-2 border-[#00B871]/20 bg-white/10 flex items-center justify-center">
				<Image
					src={image}
					alt={name}
					fill
					style={position ? { objectPosition: position } : undefined}
					className="object-cover"
				/>
			</div>
		);
	}

	return <div className="text-3xl mb-1.5 sm:mb-2 text-center">{image}</div>;
};

export function TeamCard({ member }: TeamCardProps) {

	const cardContent = (
		<div className="relative rounded-2xl p-4 sm:p-5 hover-lift min-h-[230px] sm:min-h-[250px] flex flex-col">

			{/* Profile Info - Always visible on mobile, hover effect on desktop */}
			<div className="relative z-10 lg:group-hover:translate-y-full transition-transform duration-150 flex-1 flex flex-col">
				{renderMemberImage(member.image, member.name, member.imagePosition)}
				<h3 className="text-base sm:text-lg font-poppins font-bold mb-1 text-center text-gray-900 dark:text-white">
					{member.name}
				</h3>
				<p className="text-xs sm:text-sm font-semibold text-center mb-1 text-[#00B871]">
					{member.designation}
				</p>
				<p className="text-xs sm:text-sm text-center mb-1.5 sm:mb-2 opacity-90 text-gray-600 dark:text-gray-300">
					{member.role}
				</p>
				<div className="h-px bg-gradient-to-r from-transparent via-[#00B871]/80 to-transparent mb-1.5 sm:mb-2" />

				{/* Show bio on mobile, hide on desktop (shown on hover) */}
				<p className="text-xs sm:text-sm text-center mb-1.5 sm:mb-2 line-clamp-2 lg:hidden opacity-90 text-gray-600 dark:text-gray-300">
					{member.bio}
				</p>
				<p className="text-xs sm:text-sm text-center hidden lg:block opacity-90 text-gray-600 dark:text-gray-300">
					Hover to learn more
				</p>

				{/* Spacer to push social links to bottom */}
				<div className="flex-1 min-h-[4px]" />

				{/* Social Links - Mobile only, desktop on hover - Fixed height container */}
				<div className="flex gap-1.5 sm:gap-2 justify-center mt-1.5 sm:mt-2 min-h-[36px] sm:min-h-[40px] items-center lg:hidden">
					{isValidLink(member.socials.github) && (
						<a
							href={member.socials.github}
							target="_blank"
							rel="noopener noreferrer"
							className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
							title="GitHub"
						>
							<Github className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
						</a>
					)}
					{isValidLink(member.socials.linkedin) && (
						<a
							href={member.socials.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
							title="LinkedIn"
						>
							<Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
						</a>
					)}
					{isValidLink(member.socials.instagram) && (
						<a
							href={member.socials.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
							title="Instagram"
						>
							<Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
						</a>
					)}
				</div>
			</div>

			{/* Hover State Content - Desktop only */}
			<div className="hidden lg:flex absolute inset-0 p-4 sm:p-5 flex-col rounded-2xl -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white dark:bg-gray-950 z-20">

				<div className="relative z-10 flex flex-col flex-1">
					{renderMemberImage(member.image, member.name, member.imagePosition)}
					<h3 className="text-base sm:text-lg font-poppins font-bold mb-1 text-center text-gray-900 dark:text-white">
						{member.name}
					</h3>
					<p className="text-xs sm:text-sm font-semibold text-center mb-1.5 text-[#00B871]">
						{member.designation}
					</p>
					<div className="h-px bg-gradient-to-r from-transparent via-[#00B871]/80 to-transparent mb-1.5" />

					<div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
						<p className="text-xs sm:text-sm text-center mb-2 opacity-90 text-gray-600 dark:text-gray-300">
							{member.bio}
						</p>
					</div>

					<div className="flex gap-2 justify-center mt-2 min-h-[40px] items-center">
						{isValidLink(member.socials.github) && (
							<a
								href={member.socials.github}
								target="_blank"
								rel="noopener noreferrer"
								className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
								title="GitHub"
							>
								<Github className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
							</a>
						)}
						{isValidLink(member.socials.linkedin) && (
							<a
								href={member.socials.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
								title="LinkedIn"
							>
								<Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
							</a>
						)}
						{isValidLink(member.socials.instagram) && (
							<a
								href={member.socials.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="group/social p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-colors duration-150 border border-gray-200 dark:border-gray-800"
								title="Instagram"
							>
								<Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B871] transition-transform group-hover/social:scale-110" />
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	return (
        <div
            className="group relative overflow-hidden rounded-2xl"
       >
            <div
                className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-shadow duration-150 hover:shadow-md"
    		>
                {cardContent}
            </div>
        </div>
    );
}
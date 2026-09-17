import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-black px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#FFE600] text-black hover:bg-[#FFDE59]",
        secondary:
          "bg-[#C4B5FD] text-black hover:bg-[#B794F4]",
        destructive:
          "bg-[#FF5F56] text-white hover:bg-[#FA4D44]",
        outline: "bg-white text-black hover:bg-[#FAF7EE]",
        mint: "bg-[#88EA73] text-black hover:bg-[#78DA63]",
        blue: "bg-[#70D6FF] text-black hover:bg-[#5EC6EF]",
        pink: "bg-[#FF70A6] text-black hover:bg-[#EF6096]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

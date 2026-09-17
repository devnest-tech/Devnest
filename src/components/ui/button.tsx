import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold border-2 border-black transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#FFE600] text-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFDE59] hover:shadow-[5px_5px_0px_0px_#000]",
        destructive:
          "bg-[#FF5F56] text-white shadow-[3px_3px_0px_0px_#000] hover:bg-[#FA4D44] hover:shadow-[5px_5px_0px_0px_#000]",
        outline:
          "bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FAF7EE] hover:shadow-[5px_5px_0px_0px_#000]",
        secondary:
          "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#B794F4] hover:shadow-[5px_5px_0px_0px_#000]",
        ghost:
          "border-transparent hover:border-black hover:bg-[#FFE600] hover:text-black hover:shadow-[2px_2px_0px_0px_#000]",
        link: "border-none text-black underline-offset-4 hover:underline shadow-none font-bold hover:translate-x-0 hover:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000]",
        lg: "h-12 rounded-xl px-7 text-base shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
        icon: "h-10 w-10 rounded-xl shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

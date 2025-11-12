import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          variant === "default" && "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
          variant === "outline" && "border-[0.5px] border-input/50 bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "destructive" && "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
          variant === "secondary" && "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-lg px-3 text-xs",
          size === "lg" && "h-10 rounded-lg px-8",
          size === "icon" && "h-9 w-9",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };


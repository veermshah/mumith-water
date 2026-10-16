import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "lg" };

/** Anchor styled as a pill button. */
export function CtaLink({ variant = "primary", size = "md", className, ...props }: Props) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        size === "lg" ? "h-13 px-7 text-base" : "h-10 px-5 text-sm",
        variant === "primary" && "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-primary/90",
        variant === "secondary" && "border border-border bg-card text-foreground shadow-soft hover:-translate-y-0.5 hover:border-foreground/30",
        variant === "ghost" && "text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

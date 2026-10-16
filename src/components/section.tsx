import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("px-5 py-24 sm:px-8 md:py-32", className)}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-water-ink">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {intro && <div className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</div>}
        </Reveal>
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

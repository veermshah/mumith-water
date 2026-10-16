import { ArrowDown } from "lucide-react";
import { BottleSlot } from "@/components/bottle/bottle-slot";
import { CtaLink } from "@/components/cta-link";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(60%_50%_at_70%_40%,color-mix(in_oklch,var(--water)_18%,transparent),transparent_70%),radial-gradient(50%_40%_at_20%_20%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-sm font-medium text-muted-foreground shadow-soft">
            <span className="size-2 rounded-full bg-water" aria-hidden />
            Pre-launch idea · no product yet
          </p>
          <h1 id="hero-title" className="mt-6 text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">
            Water bottles designed to <span className="text-primary">break down</span>, not pile up.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We’re exploring plant-based bottle materials — paid for by sponsors who put their brand on the label, so the bottle
            can reach you free or for very little.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#waitlist" size="lg">
              Join the waitlist
            </CtaLink>
            <CtaLink href="#sponsor-interest" size="lg" variant="secondary">
              Become a sponsor
            </CtaLink>
          </div>
          <a href="#problem" className="mt-12 hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex">
            <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden />
            Why this matters
          </a>
        </div>
        <BottleSlot variant="hero" className="h-[420px] sm:h-[500px] md:h-[600px]" />
      </div>
    </section>
  );
}

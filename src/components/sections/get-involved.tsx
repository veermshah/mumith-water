import { WaitlistForm } from "@/components/forms/waitlist-form";
import { SponsorForm } from "@/components/forms/sponsor-form";
import { Reveal } from "@/components/reveal";

export function GetInvolved() {
  return (
    <section aria-label="Sign up" className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.25fr]">
        <Reveal className="h-full">
          <div id="waitlist" className="h-full scroll-mt-24 rounded-[2rem] border border-border/70 bg-card p-7 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-water-ink">Waitlist</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Want a bottle?</h2>
            <p className="mt-3 text-muted-foreground">Tell us you’re interested and we’ll email you if and when Mumith Water launches.</p>
            <div className="mt-8"><WaitlistForm /></div>
          </div>
        </Reveal>
        <Reveal className="h-full" delay={0.08}>
          <div id="sponsor-interest" className="h-full scroll-mt-24 rounded-[2rem] bg-primary/[0.06] p-7 ring-1 ring-primary/15 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-water-ink">Sponsors</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Interested in sponsoring?</h2>
            <p className="mt-3 text-muted-foreground">Share a few details and we’ll reach out as we shape pricing and minimum runs.</p>
            <div className="mt-8"><SponsorForm /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

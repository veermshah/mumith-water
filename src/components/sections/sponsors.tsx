"use client";

import { Check, MapPin, Palette, ScrollText } from "lucide-react";
import { BottleSlot } from "@/components/bottle/bottle-slot";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { bottleStore, useBottleStore } from "@/lib/bottle-store";
import { labelDesigns } from "@/lib/label-designs";
import { cn } from "@/lib/utils";

const reasons = [
  { icon: Palette, title: "Your design on the whole label", body: "The label wraps all the way around the bottle — the space a sponsor would be paying for." },
  { icon: MapPin, title: "Pick where bottles go", body: "The plan is to let sponsors choose the campuses, gyms or events their bottles are handed out at." },
  { icon: ScrollText, title: "Honest material claims", body: "Every bottle would state what it’s made of and how to dispose of it, following the FTC Green Guides." },
];

export function Sponsors() {
  const active = useBottleStore((s) => s.label);
  return (
    <Section
      id="sponsors"
      eyebrow="For sponsors"
      title="Put your brand in people’s hands."
      intro={
        <>
          We’re still shaping the sponsor offer — there’s no pricing yet, and these are plans, not promises. Try a sample label to
          see how it could look.
        </>
      }
      className="bg-secondary/50"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <ul className="space-y-6">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.05} className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-water/15 text-water-ink">
                  <r.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <fieldset>
              <legend className="text-sm font-semibold">Label designer — sample designs</legend>
              <p className="mt-1 text-sm text-muted-foreground">Generic placeholders only; no real brands.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Sample label designs">
                {labelDesigns.map((d) => {
                  const selected = d.id === active;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => bottleStore.set({ label: d.id })}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-ring",
                        selected ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30",
                      )}
                    >
                      <span
                        className="relative size-9 shrink-0 overflow-hidden rounded-xl border border-black/10"
                        style={{ background: `linear-gradient(135deg, ${d.swatch[0]} 55%, ${d.swatch[1]} 55%)` }}
                        aria-hidden
                      >
                        {selected && (
                          <Check className="absolute inset-0 m-auto size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{d.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{d.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>
          <CtaLink href="#sponsor-interest" className="mt-8">
            Register sponsor interest
          </CtaLink>
        </div>
        <BottleSlot variant="sponsor" className="h-[440px] md:h-[620px]" />
      </div>
    </Section>
  );
}

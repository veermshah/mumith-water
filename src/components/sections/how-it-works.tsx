import { HandCoins, Package, Sprout } from "lucide-react";
import { BottleSlot } from "@/components/bottle/bottle-slot";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const steps = [
  {
    icon: HandCoins,
    title: "Sponsors fund the bottles",
    body: "A brand pays for a run of bottles and gets its design on the label. That sponsorship is meant to cover the cost of the bottle and water.",
  },
  {
    icon: Package,
    title: "Bottles reach people",
    body: "Sponsored bottles are handed out free or sold cheaply where people need water — campuses, gyms and events are the places we’d start.",
  },
  {
    icon: Sprout,
    title: "The bottle breaks down after use",
    body: "We’re exploring materials designed to break down after use. Where and how fast depends on the material — some need industrial compost — so every bottle would carry clear disposal instructions.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Brands pay. You drink. The bottle breaks down."
      intro="Three steps — scroll to watch the bottle come apart."
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <ol className="flex flex-col gap-6 md:gap-[22vh] md:py-[10vh]">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="order-first md:order-none">
          <div className="md:sticky md:top-24">
            <BottleSlot variant="breakdown" targetId="how-it-works" className="h-[340px] md:h-[calc(100vh-8rem)] md:max-h-[640px]" />
          </div>
        </div>
      </div>
    </Section>
  );
}

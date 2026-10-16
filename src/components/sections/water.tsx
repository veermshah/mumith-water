import { Cite } from "@/components/cite";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { sourcingSteps } from "@/lib/content";

export function Water() {
  return (
    <Section
      id="water"
      eyebrow="Where the water comes from"
      title="Texas water, bottled by people who already do it well."
      intro="We don’t have a bottler yet. This is the approach our research points to for a new Texas brand."
      className="bg-secondary/50"
    >
      <ol className="grid gap-4 md:grid-cols-2">
        {sourcingSteps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.05} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
            <span className="font-display text-sm font-bold text-water-ink">0{i + 1}</span>
            <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {s.body}
              <Cite ids={s.source} />
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

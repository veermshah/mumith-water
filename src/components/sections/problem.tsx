import { Cite } from "@/components/cite";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="Most plastic bottles never get a second life."
      intro="Recycling exists, but the numbers show how much plastic packaging still ends up landfilled, burned or loose in the environment."
      className="bg-secondary/50"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map((s, i) => (
          <Reveal
            as="li"
            key={s.label}
            delay={i * 0.06}
            className={cn(
              "flex flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-soft",
              i < 2 ? "lg:col-span-3" : "lg:col-span-2",
            )}
          >
            <p className="font-display text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
              {s.numeric ? <CountUp to={s.numeric.to} decimals={s.numeric.decimals} suffix={s.numeric.suffix} prefix={s.value.startsWith("~") ? "~" : ""} fallback={s.value} /> : s.value}
            </p>
            {i < 2 && (
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
                <div className="h-full rounded-full bg-water" style={{ width: s.value }} />
              </div>
            )}
            <p className="mt-4 text-lg font-medium leading-snug">
              {s.label}
              <Cite ids={s.source} />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.context}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

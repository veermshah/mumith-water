import { Cite } from "@/components/cite";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { materials } from "@/lib/content";

const rows = [
  { key: "madeFrom", label: "Made from" },
  { key: "breaksDown", label: "How it breaks down" },
  { key: "timeframe", label: "How long" },
  { key: "certifications", label: "Certifications" },
  { key: "examples", label: "Who makes it" },
] as const;

export function Materials() {
  return (
    <Section
      id="materials"
      eyebrow="Materials we’re exploring"
      title="No material is perfect. Here’s the honest comparison."
      intro={
        <>
          We haven’t chosen a material and have no supplier. Breakdown details below are as reported by manufacturers or published
          studies — we haven’t tested any of them ourselves.
        </>
      }
    >
      <Reveal className="hidden overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft lg:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">Comparison of bottle materials Mumith Water is exploring</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-36 p-5 font-semibold text-muted-foreground">
                <span className="sr-only">Attribute</span>
              </th>
              {materials.map((m) => (
                <th key={m.name} scope="col" className="p-5 align-bottom">
                  <span className="block font-display text-xl font-bold">{m.name}</span>
                  <span className="block text-xs font-normal text-muted-foreground">{m.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-border/70">
                <th scope="row" className="p-5 align-top font-semibold">
                  {r.label}
                </th>
                {materials.map((m) => (
                  <td key={m.name} className="p-5 align-top leading-relaxed text-muted-foreground">
                    {m[r.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-border/70">
              <th scope="row" className="p-5 align-top font-semibold">Pros</th>
              {materials.map((m) => (
                <td key={m.name} className="p-5 align-top">
                  <ul className="space-y-2">
                    {m.pros.map((p) => (
                      <li key={p} className="flex gap-2 leading-snug"><span className="text-success" aria-hidden>+</span>{p}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="border-b border-border/70">
              <th scope="row" className="p-5 align-top font-semibold">Cons</th>
              {materials.map((m) => (
                <td key={m.name} className="p-5 align-top">
                  <ul className="space-y-2">
                    {m.cons.map((c) => (
                      <li key={c} className="flex gap-2 leading-snug"><span className="text-destructive" aria-hidden>−</span>{c}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="p-5 align-top font-semibold">Sources</th>
              {materials.map((m) => (
                <td key={m.name} className="p-5 align-top"><Cite ids={m.source} /></td>
              ))}
            </tr>
          </tbody>
        </table>
      </Reveal>

      <ul className="grid gap-4 lg:hidden">
        {materials.map((m, i) => (
          <Reveal as="li" key={m.name} delay={i * 0.04} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <h3 className="text-2xl font-bold">
              {m.name} <span className="text-base font-normal text-muted-foreground">· {m.short}</span>
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              {rows.map((r) => (
                <div key={r.key}>
                  <dt className="font-semibold">{r.label}</dt>
                  <dd className="mt-0.5 leading-relaxed text-muted-foreground">{m[r.key]}</dd>
                </div>
              ))}
              <div>
                <dt className="font-semibold">Pros</dt>
                <dd className="mt-0.5 text-muted-foreground">{m.pros.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-semibold">Cons</dt>
                <dd className="mt-0.5 text-muted-foreground">{m.cons.join(" · ")}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">Sources <Cite ids={m.source} /></p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        The 3D bottle above is styled after PHA — a matte, natural finish — because it’s the material with the widest range of
        reported breakdown environments. That’s a visual choice, not a decision.
      </p>
    </Section>
  );
}

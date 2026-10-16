import { Cite } from "@/components/cite";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered honestly.">
      <Reveal className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-card px-6 shadow-soft sm:px-8">
        <Accordion>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border/70">
              <AccordionTrigger className="py-6 text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                <p>
                  {f.a}
                  <Cite ids={f.source} />
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

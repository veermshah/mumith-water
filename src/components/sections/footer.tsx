import { Wordmark } from "@/components/wordmark";
import { sources } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 px-5 pb-12 pt-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Wordmark className="text-2xl" />
            <p className="mt-2 text-muted-foreground">Launching soon.</p>
          </div>
          <nav aria-label="Get in touch">
            <p className="text-sm font-semibold">Get in touch</p>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li><a className="underline-offset-4 hover:underline" href="#waitlist">Join the waitlist</a></li>
              <li><a className="underline-offset-4 hover:underline" href="#sponsor-interest">Sponsor interest form</a></li>
            </ul>
          </nav>
        </div>

        <section aria-labelledby="sources-title" className="mt-14 border-t border-border pt-10">
          <h2 id="sources-title" className="font-display text-xl font-bold">Sources</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Every figure on this page links here. Companies listed are examples from our research — Mumith Water has no
            partnership or supplier relationship with any of them.
          </p>
          <ol className="mt-6 grid gap-x-10 gap-y-2 text-sm md:grid-cols-2">
            {sources.map((s, i) => (
              <li key={s.id} id={`source-${i + 1}`} className="scroll-mt-24 leading-snug target:rounded target:bg-water/15">
                <span className="mr-1 tabular-nums text-muted-foreground">{i + 1}.</span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:decoration-foreground">
                  {s.publisher} — {s.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
        <p className="mt-12 text-xs text-muted-foreground">
          © Mumith Water. A pre-launch concept — no products are for sale.
        </p>
      </div>
    </footer>
  );
}

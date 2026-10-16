import { sourceIndex, sources, type SourceId } from "@/lib/content";

/** Superscript citation links pointing at the numbered Sources list in the footer. */
export function Cite({ ids }: { ids: SourceId[] }) {
  if (!ids.length) return null;
  return (
    <sup className="ml-0.5 whitespace-nowrap text-[0.7em] font-medium">
      {ids.map((id, i) => {
        const n = sourceIndex(id);
        const src = sources[n - 1];
        return (
          <span key={id}>
            {i > 0 && ","}
            <a
              href={`#source-${n}`}
              className="text-water-ink underline-offset-2 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={`Source ${n}: ${src.publisher}, ${src.label}`}
            >
              [{n}]
            </a>
          </span>
        );
      })}
    </sup>
  );
}

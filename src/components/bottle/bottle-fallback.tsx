import { labelDesigns, type LabelDesignId } from "@/lib/label-designs";
import { cn } from "@/lib/utils";

type Props = { className?: string; label?: LabelDesignId; scattered?: boolean };

const DOTS = Array.from({ length: 36 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 30 + ((i * 47) % 70);
  return { cx: 120 + Math.cos(a) * r, cy: 260 + Math.sin(a) * r * 0.5, r: 2 + (i % 3) };
});

/** Static illustration shown before the 3D scene loads, on low-power devices, or without WebGL. */
export function BottleFallback({ className, label = "mumith", scattered = false }: Props) {
  const design = labelDesigns.find((d) => d.id === label) ?? labelDesigns[0];
  const [bg, fg] = design.swatch;
  const isDefault = design.id === "mumith";
  return (
    <svg
      viewBox="0 0 240 380"
      role="img"
      aria-label={
        scattered
          ? "Illustration of a bottle breaking down into small particles"
          : `Illustration of a Mumith Water bottle with the ${design.name} label`
      }
      className={cn("mx-auto h-full w-auto", className)}
    >
      <defs>
        <linearGradient id="fb-body" x1="0" x2="1">
          <stop offset="0" stopColor="#bba985" />
          <stop offset="0.45" stopColor="#e3d6bb" />
          <stop offset="1" stopColor="#b09d78" />
        </linearGradient>
        <radialGradient id="fb-shadow">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="352" rx="70" ry="10" fill="url(#fb-shadow)" />
      <g opacity={scattered ? 0.35 : 1}>
        <path
          d="M98 40 h44 v28 c0 14 14 24 30 42 c12 14 16 26 16 46 v170 c0 14 -8 24 -22 24 h-92 c-14 0 -22 -10 -22 -24 v-170 c0 -20 4 -32 16 -46 c16 -18 30 -28 30 -42 z"
          fill="url(#fb-body)"
        />
        <rect x="95" y="14" width="50" height="32" rx="7" fill="#285a43" />
        <rect x="52" y="178" width="136" height="92" fill={bg} />
        <text x="120" y={isDefault ? 222 : 226} textAnchor="middle" fill={fg} fontSize={isDefault ? 26 : 20} fontWeight={700}>
          {isDefault ? "Mumith" : "Your Logo"}
        </text>
        <text x="120" y={isDefault ? 248 : 250} textAnchor="middle" fill={isDefault ? "#2f8fc4" : fg} fontSize="11" letterSpacing="3">
          {isDefault ? "WATER" : "HERE"}
        </text>
      </g>
      {scattered && DOTS.map((d, i) => <circle key={i} {...d} fill={i % 4 === 0 ? "#3f7a5a" : "#c4b08a"} opacity="0.8" />)}
    </svg>
  );
}

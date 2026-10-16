"use client";

import dynamic from "next/dynamic";
import { useBottleStore } from "@/lib/bottle-store";
import { cn } from "@/lib/utils";
import { BottleFallback } from "./bottle-fallback";

const HeroBottleView = dynamic(() => import("./bottle-views").then((m) => m.HeroBottleView), { ssr: false });
const SponsorBottleView = dynamic(() => import("./bottle-views").then((m) => m.SponsorBottleView), { ssr: false });
const BreakdownBottleView = dynamic(() => import("./bottle-views").then((m) => m.BreakdownBottleView), { ssr: false });

type Props =
  | { variant: "hero" | "sponsor"; className?: string; targetId?: never }
  | { variant: "breakdown"; className?: string; targetId: string };

/** Reserves layout space for a bottle and swaps the static fallback for the 3D view once WebGL is ready. */
export function BottleSlot({ variant, className, targetId }: Props) {
  const webgl = useBottleStore((s) => s.webgl);
  const label = useBottleStore((s) => s.label);
  const live = webgl === "loading" || webgl === "ready";
  const viewClass = "absolute inset-0 cursor-grab active:cursor-grabbing";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center py-6 transition-opacity duration-700",
          webgl === "ready" ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <BottleFallback label={variant === "breakdown" ? "mumith" : label} scattered={variant === "breakdown" && webgl === "fallback"} />
      </div>
      {live && variant === "hero" && <HeroBottleView className={viewClass} />}
      {live && variant === "sponsor" && <SponsorBottleView className={viewClass} />}
      {live && variant === "breakdown" && <BreakdownBottleView className="absolute inset-0" targetId={targetId} />}
      {variant !== "breakdown" && webgl === "ready" && (
        <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs text-muted-foreground">
          Drag to rotate
        </p>
      )}
    </div>
  );
}

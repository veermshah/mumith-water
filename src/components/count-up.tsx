"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string; fallback: string };

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up to a cited value when it scrolls into view; the final value is server-rendered. */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", fallback }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(`${prefix}${format(v, decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduced, to, decimals, prefix, suffix]);

  return (
    <span ref={ref} aria-label={fallback}>
      <span aria-hidden>{text ?? fallback}</span>
    </span>
  );
}

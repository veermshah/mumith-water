"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { bottleStore, pointer, useBottleStore } from "@/lib/bottle-store";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

/** Start the 3D scene on first interaction, or after this long once the page has loaded. */
const IDLE_START_MS = 6000;

type NavigatorHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function canRender3D() {
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Decides whether to load the 3D scene and defers it until the visitor interacts or the page settles. */
export function ThreeLoader() {
  const webgl = useBottleStore((s) => s.webgl);

  useEffect(() => {
    if (!canRender3D()) {
      bottleStore.set({ webgl: "fallback" });
      return;
    }
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    let timer: number | undefined;
    const start = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
      if (bottleStore.get().webgl === "idle") bottleStore.set({ webgl: "loading" });
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    const schedule = () => {
      timer = window.setTimeout(start, IDLE_START_MS);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return webgl === "loading" || webgl === "ready" ? <SceneCanvas /> : null;
}

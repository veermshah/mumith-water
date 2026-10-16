"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { bottleStore, pointer, useBottleStore } from "@/lib/bottle-store";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

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

/** Decides whether to load the 3D scene and defers it until the browser is idle. */
export function ThreeLoader() {
  const webgl = useBottleStore((s) => s.webgl);

  useEffect(() => {
    if (!canRender3D()) {
      bottleStore.set({ webgl: "fallback" });
      return;
    }
    const start = () => bottleStore.get().webgl === "idle" && bottleStore.set({ webgl: "loading" });
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return webgl === "loading" || webgl === "ready" ? <SceneCanvas /> : null;
}

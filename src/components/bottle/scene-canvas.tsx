"use client";

import { View } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, type ReactNode } from "react";
import { bottleStore } from "@/lib/bottle-store";
import { getLabelTexture } from "./label-texture";

function LabelDriver() {
  useEffect(() => {
    const label = getLabelTexture();
    label.warm();
    label.setTarget(bottleStore.get().label, true);
    return bottleStore.subscribe(() => label.setTarget(bottleStore.get().label));
  }, []);
  useFrame((_, delta) => getLabelTexture().tick(delta));
  return null;
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    bottleStore.set({ webgl: "fallback" });
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * One fixed, full-viewport canvas renders every bottle on the page through drei <View>s,
 * so the page only ever holds a single WebGL context.
 */
export default function SceneCanvas() {
  return (
    <WebGLBoundary>
      <Canvas
        aria-hidden
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 10 }}
        onCreated={() => bottleStore.set({ webgl: "ready" })}
      >
        <View.Port />
        <LabelDriver />
      </Canvas>
    </WebGLBoundary>
  );
}

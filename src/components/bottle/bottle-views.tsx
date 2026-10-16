"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { pointer } from "@/lib/bottle-store";
import { ProceduralBottle } from "./procedural-bottle";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Soft studio setup built from Lightformers so no HDR files are downloaded. */
function Studio() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#cfe8f5" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#bfe3f7" position={[4, 0, -1]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
        <Lightformer form="ring" intensity={1} position={[0, -2, 4]} scale={2} />
      </Environment>
      <ContactShadows position={[0, -1.66, 0]} opacity={0.35} scale={5} blur={2.6} far={2} resolution={256} frames={1} />
    </>
  );
}

/** Drag rotates horizontally; vertical swipes still scroll the page on touch devices. */
function AllowVerticalScroll() {
  const connected = useThree((s) => s.events.connected) as HTMLElement | undefined;
  useEffect(() => {
    if (!connected) return;
    const id = requestAnimationFrame(() => {
      connected.style.touchAction = "pan-y";
    });
    return () => cancelAnimationFrame(id);
  }, [connected]);
  return null;
}

function InteractiveBottle({ tilt = true }: { tilt?: boolean }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const group = useRef<THREE.Group>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  useFrame((_, delta) => {
    if (!group.current || !tilt || reduced) return;
    const k = 1 - Math.exp(-delta * 4);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.12, k);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.08, k);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, 7.4]} fov={32} />
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        enableDamping
        autoRotate={!reduced}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 2 - 0.35}
        maxPolarAngle={Math.PI / 2 + 0.2}
        onStart={() => {
          window.clearTimeout(idleTimer.current);
          if (controls.current) controls.current.autoRotate = false;
        }}
        onEnd={() => {
          idleTimer.current = window.setTimeout(() => {
            if (controls.current && !reduced) controls.current.autoRotate = true;
          }, 2500);
        }}
      />
      <AllowVerticalScroll />
      <group ref={group}>
        <ProceduralBottle />
      </group>
      <Studio />
    </>
  );
}

export function HeroBottleView({ className }: { className?: string }) {
  return (
    <View className={className}>
      <InteractiveBottle />
    </View>
  );
}

export function SponsorBottleView({ className }: { className?: string }) {
  return (
    <View className={className}>
      <InteractiveBottle tilt={false} />
    </View>
  );
}

function ScrollBreakdown({ targetId }: { targetId: string }) {
  const progress = useRef(0);
  const spin = useRef<THREE.Group>(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    const el = document.getElementById(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.7 - rect.top) / Math.max(1, Math.min(rect.height, vh) * 0.8);
      const target = THREE.MathUtils.clamp(raw, 0, 1);
      progress.current = reduced
        ? target
        : THREE.MathUtils.lerp(progress.current, target, 1 - Math.exp(-delta * 5));
    }
    if (spin.current && !reduced) spin.current.rotation.y += delta * 0.15;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 7.6]} fov={34} />
      <group ref={spin}>
        <ProceduralBottle progress={progress} />
      </group>
      <Studio />
    </>
  );
}

export function BreakdownBottleView({ className, targetId }: { className?: string; targetId: string }) {
  return (
    <View className={className}>
      <ScrollBreakdown targetId={targetId} />
    </View>
  );
}

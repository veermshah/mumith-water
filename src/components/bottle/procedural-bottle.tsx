"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { getGrainTexture, getLabelTexture } from "./label-texture";
import { BOTTLE_HEIGHT, bodyProfile, capProfile, labelProfile, radiusAt, RADIAL_SEGMENTS } from "./profile";

const BODY_COLOR = "#d8c9ab";
const CAP_COLOR = "#285a43";
const PARTICLE_COLORS = ["#d8c9ab", "#c4b08a", "#8a6f4c", "#3f7a5a", "#5fb3df"];

const particleVertex = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  attribute vec3 aDir;
  attribute float aDelay;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float p = clamp((uProgress - aDelay * 0.35) / 0.65, 0.0, 1.0);
    float e = p * p * (3.0 - 2.0 * p);
    vec3 pos = position + aDir * e * 1.4;
    pos.y -= e * e * 1.1;
    pos.x += sin(uTime * 0.6 + aDelay * 12.0) * 0.06 * e;
    pos.z += cos(uTime * 0.5 + aDelay * 9.0) * 0.06 * e;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (1.0 - 0.35 * e) * (34.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vAlpha = smoothstep(0.0, 0.12, uProgress) * (1.0 - 0.5 * e);
  }
`;

const particleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.2, d));
    #include <colorspace_fragment>
  }
`;

function buildParticles(count: number) {
  const profile = bodyProfile(200);
  const positions = new Float32Array(count * 3);
  const dirs = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const onCap = Math.random() < 0.06;
    const y = onCap ? 2.82 + Math.random() * 0.4 : Math.random() * 2.9;
    const r = onCap ? 0.3 : radiusAt(profile, y);
    const phi = Math.random() * Math.PI * 2;
    const x = Math.sin(phi) * r;
    const z = Math.cos(phi) * r;
    positions.set([x, y, z], i * 3);
    const out = new THREE.Vector3(x, (Math.random() - 0.3) * 0.6, z).normalize();
    out.multiplyScalar(0.4 + Math.random() * 0.9);
    dirs.set([out.x, out.y, out.z], i * 3);
    delays[i] = (y / BOTTLE_HEIGHT) * 0.6 + Math.random() * 0.4;
    sizes[i] = 0.6 + Math.random() * 1.4;
    color.set(onCap ? PARTICLE_COLORS[3] : PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
  g.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
  g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  return g;
}

type Props = {
  /** 0 = fully assembled, 1 = fully broken down into particles. */
  progress?: RefObject<number>;
  particleCount?: number;
};

/**
 * Procedural bottle: lathe-turned body, separate cap, wrap-around CanvasTexture label and an
 * optional particle system for the breakdown animation. Swap this component for a .glb loader
 * later without changing the views that use it.
 */
export function ProceduralBottle({ progress, particleCount = 2400 }: Props) {
  const dpr = useThree((s) => s.viewport.dpr);
  const solid = useRef<THREE.Group>(null);
  const cloud = useRef<THREE.Points>(null);

  const { body, cap, label } = useMemo(
    () => ({
      body: new THREE.LatheGeometry(bodyProfile(), RADIAL_SEGMENTS),
      cap: new THREE.LatheGeometry(capProfile(), RADIAL_SEGMENTS),
      label: new THREE.LatheGeometry(labelProfile(), RADIAL_SEGMENTS),
    }),
    [],
  );

  const materials = useMemo(() => {
    const grain = getGrainTexture();
    return {
      body: new THREE.MeshStandardMaterial({
        color: BODY_COLOR,
        roughness: 0.82,
        metalness: 0,
        bumpMap: grain,
        bumpScale: 0.6,
        roughnessMap: grain,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      cap: new THREE.MeshStandardMaterial({ color: CAP_COLOR, roughness: 0.7, bumpMap: grain, bumpScale: 0.8, transparent: true }),
      label: new THREE.MeshStandardMaterial({ map: getLabelTexture().texture, roughness: 0.9, transparent: true }),
    };
  }, []);

  const particles = useMemo(() => (progress ? buildParticles(particleCount) : null), [progress, particleCount]);
  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uProgress: { value: 0 }, uTime: { value: 0 }, uPixelRatio: { value: 1 } },
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      body.dispose();
      cap.dispose();
      label.dispose();
      particles?.dispose();
      Object.values(materials).forEach((m) => m.dispose());
      particleMaterial.dispose();
    },
    [body, cap, label, particles, materials, particleMaterial],
  );

  useFrame((state) => {
    const group = solid.current;
    if (!progress || !group) return;
    const p = progress.current ?? 0;
    const opacity = 1 - THREE.MathUtils.smoothstep(p, 0.02, 0.35);
    group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = opacity;
        child.material.depthWrite = opacity > 0.95;
      }
    });
    group.visible = opacity > 0.001;
    group.scale.setScalar(1 - 0.04 * (1 - opacity));
    const points = cloud.current;
    if (points && points.material instanceof THREE.ShaderMaterial) {
      const u = points.material.uniforms;
      u.uProgress.value = p;
      u.uTime.value = state.clock.elapsedTime;
      u.uPixelRatio.value = dpr;
    }
  });

  return (
    <group position={[0, -BOTTLE_HEIGHT / 2, 0]} rotation={[0, Math.PI, 0]}>
      <group ref={solid}>
        <mesh geometry={body} material={materials.body} castShadow />
        <mesh geometry={label} material={materials.label} />
        <mesh geometry={cap} material={materials.cap} castShadow />
      </group>
      {particles && <points ref={cloud} geometry={particles} material={particleMaterial} frustumCulled={false} />}
    </group>
  );
}

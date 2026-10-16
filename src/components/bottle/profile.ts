import * as THREE from "three";

/** Half-profile of the bottle (x = radius, y = height), bottom to top. */
const BODY_CONTROL: [number, number][] = [
  [0.0, 0.0],
  [0.4, 0.0],
  [0.6, 0.03],
  [0.68, 0.12],
  [0.7, 0.3],
  [0.695, 0.9],
  [0.685, 1.5],
  [0.675, 1.85],
  [0.64, 2.05],
  [0.52, 2.3],
  [0.36, 2.5],
  [0.27, 2.62],
  [0.26, 2.72],
  [0.26, 2.92],
];

const CAP_PROFILE: [number, number][] = [
  [0.0, 3.24],
  [0.22, 3.24],
  [0.285, 3.215],
  [0.305, 3.16],
  [0.305, 2.84],
  [0.29, 2.8],
  [0.27, 2.8],
];

export const BOTTLE_HEIGHT = 3.24;
export const LABEL_RANGE: [number, number] = [0.55, 1.6];
export const RADIAL_SEGMENTS = 96;

export function bodyProfile(samples = 120): THREE.Vector2[] {
  const curve = new THREE.SplineCurve(BODY_CONTROL.map(([x, y]) => new THREE.Vector2(x, y)));
  return curve.getPoints(samples).map((p) => new THREE.Vector2(Math.max(0, p.x), p.y));
}

export function capProfile(): THREE.Vector2[] {
  return CAP_PROFILE.map(([x, y]) => new THREE.Vector2(x, y));
}

export function labelProfile(offset = 0.006): THREE.Vector2[] {
  const [lo, hi] = LABEL_RANGE;
  return bodyProfile(240)
    .filter((p) => p.y >= lo && p.y <= hi)
    .map((p) => new THREE.Vector2(p.x + offset, p.y));
}

/** Radius of the body at height y, linearly interpolated from the sampled profile. */
export function radiusAt(profile: THREE.Vector2[], y: number): number {
  for (let i = 1; i < profile.length; i++) {
    const a = profile[i - 1];
    const b = profile[i];
    if (y >= a.y && y <= b.y) {
      const t = (y - a.y) / Math.max(1e-6, b.y - a.y);
      return a.x + (b.x - a.x) * t;
    }
  }
  return 0;
}

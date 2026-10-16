import * as THREE from "three";
import { drawLabel, LABEL_HEIGHT, LABEL_WIDTH, labelDesigns, type LabelDesignId } from "@/lib/label-designs";

const FADE_SECONDS = 0.6;

function readFont(variable: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value ? `${value}, ${fallback}` : fallback;
}

/**
 * Shared, runtime-swappable label texture. Each design is pre-rendered once to its own
 * canvas; switching designs cross-fades between them on the visible canvas.
 */
class LabelTexture {
  readonly canvas: HTMLCanvasElement;
  readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly cache = new Map<LabelDesignId, HTMLCanvasElement>();
  private from: LabelDesignId = "mumith";
  private to: LabelDesignId = "mumith";
  private t = 1;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = LABEL_WIDTH;
    this.canvas.height = LABEL_HEIGHT;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
    this.compose();
    document.fonts?.ready.then(() => {
      this.cache.clear();
      this.compose();
    });
  }

  private design(id: LabelDesignId) {
    let c = this.cache.get(id);
    if (!c) {
      c = document.createElement("canvas");
      c.width = LABEL_WIDTH;
      c.height = LABEL_HEIGHT;
      drawLabel(c.getContext("2d")!, id, {
        display: readFont("--font-display", "system-ui, sans-serif"),
        body: readFont("--font-sans", "system-ui, sans-serif"),
      });
      this.cache.set(id, c);
    }
    return c;
  }

  private compose() {
    const { ctx } = this;
    const eased = this.t * this.t * (3 - 2 * this.t);
    ctx.globalAlpha = 1;
    ctx.drawImage(this.design(this.from), 0, 0);
    if (eased > 0 && this.from !== this.to) {
      ctx.globalAlpha = eased;
      ctx.drawImage(this.design(this.to), 0, 0);
      ctx.globalAlpha = 1;
    }
    this.texture.needsUpdate = true;
  }

  setTarget(id: LabelDesignId, instant = false) {
    if (id === this.to) return;
    this.from = this.t >= 1 ? this.to : this.from;
    this.to = id;
    this.t = instant ? 1 : 0;
    if (instant) this.from = id;
    this.compose();
  }

  tick(delta: number) {
    if (this.t >= 1) return;
    this.t = Math.min(1, this.t + delta / FADE_SECONDS);
    if (this.t >= 1) this.from = this.to;
    this.compose();
  }

  warm() {
    labelDesigns.forEach((d) => this.design(d.id));
  }
}

let instance: LabelTexture | null = null;
export function getLabelTexture() {
  if (!instance) instance = new LabelTexture();
  return instance;
}

let noise: THREE.CanvasTexture | null = null;
/** Subtle fibrous grain used as a bump/roughness map for the matte bio-based look. */
export function getGrainTexture() {
  if (noise) return noise;
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = 150 + Math.random() * 70;
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v;
    img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#000";
  for (let i = 0; i < 260; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 6);
    ctx.stroke();
  }
  noise = new THREE.CanvasTexture(c);
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
  noise.repeat.set(4, 3);
  return noise;
}

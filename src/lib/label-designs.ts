export type LabelDesignId = "mumith" | "bold" | "minimal" | "wave" | "badge";

export type LabelDesign = {
  id: LabelDesignId;
  name: string;
  description: string;
  /** Swatch colors for the picker UI. */
  swatch: [string, string];
};

export const labelDesigns: LabelDesign[] = [
  { id: "mumith", name: "Mumith default", description: "Our own wordmark", swatch: ["#f4efe4", "#1f4d3a"] },
  { id: "bold", name: "Bold block", description: "Full-color band, large logo", swatch: ["#1f4d3a", "#f4efe4"] },
  { id: "minimal", name: "Minimal", description: "Quiet logo and tagline", swatch: ["#ffffff", "#2b2a27"] },
  { id: "wave", name: "Wave", description: "Gradient with a flowing line", swatch: ["#2f8fc4", "#e9f5fb"] },
  { id: "badge", name: "Badge", description: "Centered seal-style mark", swatch: ["#e7dcc5", "#7a4b2a"] },
];

export const LABEL_WIDTH = 2048;
export const LABEL_HEIGHT = 448;

type Fonts = { display: string; body: string };

function drawSampleNote(ctx: CanvasRenderingContext2D, fonts: Fonts, color: string) {
  ctx.fillStyle = color;
  ctx.font = `600 30px ${fonts.body}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SAMPLE SPONSOR DESIGN", 2048 * 0.05 + 160, LABEL_HEIGHT / 2);
  ctx.fillText("SAMPLE SPONSOR DESIGN", 2048 * 0.95 - 160, LABEL_HEIGHT / 2);
}

export function drawLabel(ctx: CanvasRenderingContext2D, id: LabelDesignId, fonts: Fonts) {
  const w = LABEL_WIDTH;
  const h = LABEL_HEIGHT;
  const cx = w / 2;
  const cy = h / 2;
  ctx.save();
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  switch (id) {
    case "mumith": {
      ctx.fillStyle = "#f4efe4";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#1f4d3a";
      ctx.fillRect(0, 26, w, 6);
      ctx.fillRect(0, h - 32, w, 6);
      ctx.font = `700 132px ${fonts.display}`;
      ctx.fillText("Mumith", cx, cy - 28);
      ctx.fillStyle = "#2f8fc4";
      ctx.font = `600 46px ${fonts.body}`;
      ctx.letterSpacing = "18px";
      ctx.fillText("WATER", cx + 9, cy + 82);
      ctx.letterSpacing = "0px";
      ctx.fillStyle = "#5c5a54";
      ctx.font = `500 30px ${fonts.body}`;
      ctx.fillText("Pre-launch concept · not for sale", w * 0.05 + 220, cy);
      ctx.fillText("Pre-launch concept · not for sale", w * 0.95 - 220, cy);
      break;
    }
    case "bold": {
      ctx.fillStyle = "#1f4d3a";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(244,239,228,0.5)";
      ctx.setLineDash([18, 14]);
      ctx.lineWidth = 5;
      ctx.strokeRect(cx - 420, cy - 130, 840, 260);
      ctx.setLineDash([]);
      ctx.fillStyle = "#f4efe4";
      ctx.font = `800 104px ${fonts.display}`;
      ctx.fillText("YOUR LOGO", cx, cy - 26);
      ctx.font = `700 54px ${fonts.display}`;
      ctx.fillText("HERE", cx, cy + 70);
      drawSampleNote(ctx, fonts, "rgba(244,239,228,0.7)");
      break;
    }
    case "minimal": {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#2b2a27";
      ctx.fillRect(cx - 60, cy - 120, 120, 4);
      ctx.font = `500 84px ${fonts.body}`;
      ctx.fillText("Your Logo Here", cx, cy - 20);
      ctx.fillStyle = "#77746c";
      ctx.font = `400 40px ${fonts.body}`;
      ctx.fillText("your tagline goes here", cx, cy + 66);
      drawSampleNote(ctx, fonts, "#9b978d");
      break;
    }
    case "wave": {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#1d6f9e");
      g.addColorStop(0.5, "#2f8fc4");
      g.addColorStop(1, "#5fb3df");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(233,245,251,0.55)";
      ctx.lineWidth = 6;
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = h * (0.72 + k * 0.08) + Math.sin((x / w) * Math.PI * 6 + k) * 18;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.fillStyle = "#ffffff";
      ctx.font = `700 112px ${fonts.display}`;
      ctx.fillText("Your Logo", cx, cy - 40);
      ctx.font = `500 40px ${fonts.body}`;
      ctx.fillText("goes here", cx, cy + 46);
      drawSampleNote(ctx, fonts, "rgba(255,255,255,0.75)");
      break;
    }
    case "badge": {
      ctx.fillStyle = "#e7dcc5";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#7a4b2a";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 150, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#7a4b2a";
      ctx.font = `800 64px ${fonts.display}`;
      ctx.fillText("YOUR", cx, cy - 44);
      ctx.fillText("BRAND", cx, cy + 26);
      ctx.font = `600 26px ${fonts.body}`;
      ctx.fillText("★ EST. YEAR ★", cx, cy + 92);
      drawSampleNote(ctx, fonts, "#8d6a4f");
      break;
    }
  }
  ctx.restore();
}

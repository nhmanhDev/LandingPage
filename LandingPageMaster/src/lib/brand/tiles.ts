export type ImageKey =
  | "game-truth" | "game-dare" | "game-oanquan" | "game-baucua" | "game-puzzle" | "game-riddle"
  | "game-history" | "game-party" | "game-guess" | "game-math" | "game-memory" | "game-rps" | "game-vua"
  | "play-family" | "play-phone" | "studio-hero" | "studio-phone";

export const IMAGE_SIZE: Record<ImageKey, { w: number; h: number }> = {
  "game-truth": { w: 520, h: 390 },
  "game-dare": { w: 520, h: 390 },
  "game-oanquan": { w: 520, h: 390 },
  "game-baucua": { w: 520, h: 390 },
  "game-puzzle": { w: 520, h: 390 },
  "game-riddle": { w: 520, h: 390 },
  "game-history": { w: 520, h: 390 },
  "game-party": { w: 520, h: 390 },
  "game-guess": { w: 520, h: 390 },
  "game-math": { w: 520, h: 390 },
  "game-memory": { w: 520, h: 390 },
  "game-rps": { w: 520, h: 390 },
  "game-vua": { w: 520, h: 390 },
  "play-family": { w: 365, h: 285 },
  "play-phone": { w: 390, h: 640 },
  "studio-hero": { w: 520, h: 309 },
  "studio-phone": { w: 390, h: 640 },
};

export type TextKey = "free" | "brand" | "tools";

export type Tile =
  | { kind: "image"; key: ImageKey; tilt: number }
  | { kind: "text"; key: TextKey; tilt: number; ratio: number };

const img = (key: ImageKey, tilt: number): Tile => ({ kind: "image", key, tilt });
const txt = (key: TextKey, tilt: number, ratio = 1): Tile => ({ kind: "text", key, tilt, ratio });

export const WALL_COLUMNS: Tile[][] = [
  [img("game-truth", -1.6), txt("free", 1.2, 1), img("play-phone", -0.8), img("game-rps", 1.4)],
  [img("studio-hero", 1.8), img("game-oanquan", -1.2), img("game-history", 1.1), txt("tools", -1.5, 0.8)],
  [img("game-baucua", 1.3), img("studio-phone", -1.4), img("game-memory", 0.9), img("game-vua", -1.1)],
  [img("play-family", -1.5), img("game-riddle", 1.6), txt("brand", -0.9, 1), img("game-guess", 1.2)],
  [img("game-puzzle", 1.1), img("game-party", -1.7), img("game-math", 1.3), img("game-dare", -0.9)],
  [img("game-dare", 1.5), img("game-history", -1.3), img("game-oanquan", 1.0), img("game-truth", -1.6)],
];

export interface WorldItem {
  kind: "image";
  id: string;
  src: string;
  darkSrc?: string;
  w: number;
  h: number;
  label: string;
  contain?: boolean;
  heavy?: boolean;
}

/**
 * Full 21-item catalog of real AI42E product screenshots and game illustrations
 * distributed around the 360-degree cylindrical hero world (image-only, theme-aware).
 */
export const WORLD_ITEMS: WorldItem[] = [
  { kind: "image", id: "studio-hero", src: "/brand/tiles/studio-hero.webp", w: 520, h: 309, label: "AI42E Studio" },
  { kind: "image", id: "game-oanquan", src: "/brand/tiles/game-oanquan.webp", w: 520, h: 390, label: "Ô Ăn Quan · AI42E Game" },
  { kind: "image", id: "voice-studio", src: "/brand/tiles/voice-studio.png", w: 640, h: 400, label: "Voice Studio", heavy: true },
  { kind: "image", id: "game-baucua", src: "/brand/tiles/game-baucua.webp", w: 520, h: 390, label: "Bầu Cua · AI42E Game" },
  { kind: "image", id: "studio-phone", src: "/brand/tiles/studio-phone.webp", w: 390, h: 640, label: "AI42E Studio" },
  { kind: "image", id: "game-vua", src: "/brand/tiles/game-vua.webp", w: 520, h: 390, label: "Vua Tiếng Việt · AI42E Game" },
  { kind: "image", id: "play-family", src: "/brand/tiles/play-family.webp", w: 365, h: 285, label: "AI42E Game" },
  { kind: "image", id: "download", src: "/brand/tiles/download-light.png", darkSrc: "/brand/tiles/download-dark.png", w: 640, h: 400, label: "DownloadAnything", heavy: true },
  { kind: "image", id: "game-truth", src: "/brand/tiles/game-truth.webp", w: 520, h: 390, label: "Thật hay Thách · AI42E Game" },
  { kind: "image", id: "game-history", src: "/brand/tiles/game-history.webp", w: 520, h: 390, label: "Sử Việt · AI42E Game" },
  { kind: "image", id: "play-phone", src: "/brand/tiles/play-phone.webp", w: 390, h: 640, label: "AI42E Game" },
  { kind: "image", id: "game-riddle", src: "/brand/tiles/game-riddle.webp", w: 520, h: 390, label: "Đố vui · AI42E Game" },
  { kind: "image", id: "oneforall", src: "/brand/tiles/oneforall.svg", w: 400, h: 300, label: "OneForAll · AI42E", contain: true },
  { kind: "image", id: "game-party", src: "/brand/tiles/game-party.webp", w: 520, h: 390, label: "Tụ họp · AI42E Game" },
  { kind: "image", id: "game-puzzle", src: "/brand/tiles/game-puzzle.webp", w: 520, h: 390, label: "Giải đố · AI42E Game" },
  { kind: "image", id: "game-guess", src: "/brand/tiles/game-guess.webp", w: 520, h: 390, label: "Đoán ý · AI42E Game" },
  { kind: "image", id: "trading-system", src: "/brand/tiles/trading-system.svg", w: 400, h: 300, label: "Trading System · AI42E", contain: true },
  { kind: "image", id: "game-math", src: "/brand/tiles/game-math.webp", w: 520, h: 390, label: "Toán nhanh · AI42E Game" },
  { kind: "image", id: "game-memory", src: "/brand/tiles/game-memory.webp", w: 520, h: 390, label: "Trí nhớ · AI42E Game" },
  { kind: "image", id: "game-rps", src: "/brand/tiles/game-rps.webp", w: 520, h: 390, label: "Oẳn tù tì · AI42E Game" },
  { kind: "image", id: "game-dare", src: "/brand/tiles/game-dare.webp", w: 520, h: 390, label: "Thử thách · AI42E Game" },
];

export interface CylinderMetrics {
  W: number;
  R: number;
  Z: number;
  P: number;
  GAP: number;
  isMobile: boolean;
}

export interface CylinderColumn {
  phi: number;
  L: number;
  off: number;
}

export interface CylinderCard {
  index: number;
  col: number;
  y: number;
  h: number;
  item: WorldItem;
  eager: boolean;
  initialTransform: string;
  initialVisible: boolean;
}

export interface CylinderLayout {
  metrics: CylinderMetrics;
  columns: CylinderColumn[];
  cards: CylinderCard[];
}

const ASPECT_CYCLE = [1.33, 1, 0.8, 1.6, 1.25, 0.75];

/**
 * Exact 360-degree cylindrical gallery builder modeled after baked.design's World engine:
 * computes column angles around a cylinder of radius R, assigns varied card aspect ratios,
 * and deduplicates neighboring slots across both horizontal columns and vertical wraparound.
 */
export function buildCylinderLayout(viewportW = 1440, viewportH = 900): CylinderLayout {
  const isMobile = viewportW < 760;
  const r = Math.max(1, viewportW / 1440);
  const metrics: CylinderMetrics = isMobile
    ? { W: 150, R: 560, Z: 330, P: 760, GAP: 22, isMobile: true }
    : {
        W: Math.round(250 * Math.min(r, 1.35)),
        R: Math.round(900 * r),
        Z: Math.round(540 * r),
        P: Math.round(1100 * r),
        GAP: Math.round(34 * Math.min(r, 1.35)),
        isMobile: false,
      };

  const colCount = Math.round(360 / (((metrics.W + metrics.GAP + 14) / metrics.R) * (180 / Math.PI)));
  const minLoopH = isMobile ? Math.max(1100, viewportH * 2.4) : 2300 * Math.max(1, viewportW / 1440);

  const slots: { c: number; y: number; h: number; row: number }[] = [];
  const columns: CylinderColumn[] = [];

  for (let c = 0; c < colCount; c++) {
    let y = 0;
    let ratioIdx = c * 2;
    let row = 0;
    while (y < minLoopH) {
      const h = Math.round(metrics.W / ASPECT_CYCLE[ratioIdx % ASPECT_CYCLE.length]);
      ratioIdx++;
      slots.push({ c, y, h, row: row++ });
      y += h + metrics.GAP;
    }
    columns.push({
      phi: (360 / colCount) * c,
      L: y,
      off: (c * 173) % 400,
    });
  }

  const isNeighbor = (idxA: number, idxB: number) => {
    const a = slots[idxA];
    const b = slots[idxB];
    const dc = Math.abs(a.c - b.c);
    if (Math.min(dc, colCount - dc) > 2) return false;
    const loopLen = columns[a.c]?.L || 1;
    const dy = Math.abs(a.y + a.h / 2 - (b.y + b.h / 2));
    return Math.min(dy, Math.abs(loopLen - dy)) < metrics.W * 2.6;
  };

  const order = slots.map((_, idx) => idx).sort((a, b) => slots[a].row - slots[b].row || slots[a].c - slots[b].c);
  const assigned = new Array<WorldItem>(slots.length);
  const usage = new Map<string, number>();
  const placed: number[] = [];
  let cursor = 0;

  for (const slotIdx of order) {
    const forbidden = new Set(placed.filter((prev) => isNeighbor(slotIdx, prev)).map((prev) => assigned[prev].id));
    let bestIdx = -1;
    let bestCount = Infinity;

    for (let k = 0; k < WORLD_ITEMS.length; k++) {
      const candidateIdx = (cursor + k) % WORLD_ITEMS.length;
      const candidate = WORLD_ITEMS[candidateIdx];
      if (forbidden.has(candidate.id)) continue;
      const count = usage.get(candidate.id) || 0;
      if (count < bestCount) {
        bestIdx = candidateIdx;
        bestCount = count;
      }
    }

    if (bestIdx < 0) bestIdx = cursor % WORLD_ITEMS.length;
    const chosen = WORLD_ITEMS[bestIdx];
    assigned[slotIdx] = chosen;
    usage.set(chosen.id, (usage.get(chosen.id) || 0) + 1);
    placed.push(slotIdx);
    cursor = bestIdx + 1;
  }

  const cards: CylinderCard[] = slots.map((slot, index) => {
    const colMeta = columns[slot.c];
    const s = (((colMeta.phi % 360) + 540) % 360) - 180;
    const inFrontArc = Math.abs(s) <= 82;
    const rad = (s * Math.PI) / 180;
    const u = metrics.R * Math.sin(rad);
    const d = metrics.Z - metrics.R * Math.cos(rad);
    const l = (((slot.y + colMeta.off) % colMeta.L) + colMeta.L) % colMeta.L - colMeta.L / 2 + slot.h / 2;
    const maxY = isMobile ? colMeta.L / 2 + 200 : (1000 * metrics.R) / 900;
    const initialVisible = inFrontArc && Math.abs(l) <= maxY && d <= metrics.P * 0.7;
    const item = assigned[index];
    const eager = initialVisible && Math.abs(s) <= 52 && Math.abs(l) <= 460 && !item.heavy;

    return {
      index,
      col: slot.c,
      y: slot.y,
      h: slot.h,
      item,
      eager,
      initialVisible,
      initialTransform: initialVisible
        ? `translate3d(${(u - metrics.W / 2).toFixed(1)}px, ${(l - slot.h / 2).toFixed(1)}px, ${d.toFixed(1)}px) rotateY(${(-s).toFixed(2)}deg)`
        : "none",
    };
  });

  return { metrics, columns, cards };
}

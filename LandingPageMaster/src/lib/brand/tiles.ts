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

/**
 * Six columns of real AI42E material (game illustrations, product screenshots).
 * Phones show the first three columns only, so those three carry a full mix.
 * Tilts are fixed, not random, so the server and the client render the same wall.
 */
export const WALL_COLUMNS: Tile[][] = [
  [img("game-truth", -1.6), txt("free", 1.2, 1), img("play-phone", -0.8), img("game-rps", 1.4)],
  [img("studio-hero", 1.8), img("game-oanquan", -1.2), img("game-history", 1.1), txt("tools", -1.5, 0.8)],
  [img("game-baucua", 1.3), img("studio-phone", -1.4), img("game-memory", 0.9), img("game-vua", -1.1)],
  [img("play-family", -1.5), img("game-riddle", 1.6), txt("brand", -0.9, 1), img("game-guess", 1.2)],
  [img("game-puzzle", 1.1), img("game-party", -1.7), img("game-math", 1.3), img("game-dare", -0.9)],
  [img("game-dare", 1.5), img("game-history", -1.3), img("game-oanquan", 1.0), img("game-truth", -1.6)],
];

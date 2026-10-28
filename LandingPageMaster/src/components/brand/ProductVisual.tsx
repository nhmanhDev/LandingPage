import Image from "next/image";
import { AudioLines, Download, Languages, Plus } from "lucide-react";
import type { Product } from "@/lib/brand/content";
import { IMAGE_SIZE, type ImageKey } from "@/lib/brand/tiles";

function Shot({ name, className, style }: { name: ImageKey; className?: string; style?: React.CSSProperties }) {
  const { w, h } = IMAGE_SIZE[name];
  return (
    <div className={`overflow-hidden rounded-xl shadow-[0_18px_40px_-14px_rgba(0,0,0,0.45)] ${className ?? ""}`} style={style}>
      <Image src={`/brand/tiles/${name}.webp`} alt="" width={w} height={h} unoptimized loading="lazy" draggable={false} className="block h-auto w-full" />
    </div>
  );
}

function StudioMotif() {
  return (
    <div className="relative h-[82%] w-[84%]">
      <div className="float absolute left-0 top-[6%] w-[72%]" style={{ ["--r" as string]: "-3deg" }}>
        <Shot name="studio-hero" />
      </div>
      <div className="float absolute bottom-0 right-[2%] w-[24%]" style={{ ["--r" as string]: "4deg", animationDelay: "-3s" }}>
        <Shot name="studio-phone" />
      </div>
    </div>
  );
}

function GameMotif() {
  const covers: { name: ImageKey; left: string; rot: string; z: number; delay: string }[] = [
    { name: "game-oanquan", left: "4%", rot: "-9deg", z: 1, delay: "-1s" },
    { name: "game-baucua", left: "52%", rot: "8deg", z: 1, delay: "-4s" },
    { name: "game-truth", left: "27%", rot: "-1deg", z: 2, delay: "-2.5s" },
  ];
  return (
    <div className="relative h-[78%] w-[88%]">
      {covers.map((cover) => (
        <div key={cover.name} className="float absolute top-[8%] w-[44%]" style={{ left: cover.left, zIndex: cover.z, ["--r" as string]: cover.rot, animationDelay: cover.delay }}>
          <Shot name={cover.name} />
        </div>
      ))}
    </div>
  );
}

function ToolTile({ children, delay }: { children: React.ReactNode; delay: string }) {
  return (
    <div className="float glass grid aspect-square w-full place-items-center rounded-2xl" style={{ ["--r" as string]: "0deg", animationDelay: delay }}>
      {children}
    </div>
  );
}

function ToolsMotif() {
  return (
    <div className="grid w-[46%] max-w-[210px] grid-cols-2 gap-3">
      <ToolTile delay="0s"><Download size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-2s"><AudioLines size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-4s"><Languages size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-6s"><Plus size={26} strokeWidth={1.6} /></ToolTile>
    </div>
  );
}

function VoiceMotif() {
  const bars = Array.from({ length: 29 }, (_, i) => Math.round(18 + 62 * Math.abs(Math.sin(i * 0.72) * Math.cos(i * 0.29))));
  return (
    <div className="flex h-[46%] w-[72%] items-center justify-between gap-[3px]">
      {bars.map((height, i) => (
        <span key={i} className="bar block w-[3px] rounded-full bg-[var(--b-ink)] opacity-70" style={{ height: `${height}%`, animationDelay: `${(-i * 0.13).toFixed(2)}s` }} />
      ))}
    </div>
  );
}

function DownloadMotif() {
  return (
    <div className="relative grid h-[58%] aspect-square place-items-center">
      <span className="ripple absolute inset-0 rounded-full border border-[var(--b-ink)]/25" />
      <span className="ripple absolute inset-[14%] rounded-full border border-[var(--b-ink)]/25" style={{ animationDelay: "-1.2s" }} />
      <span className="glass relative grid h-[46%] aspect-square place-items-center rounded-full">
        <Download size={24} strokeWidth={1.6} />
      </span>
    </div>
  );
}

function TradingMotif() {
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 100;
    const y = 58 - i * 0.55 + Math.sin(i * 0.6) * 9 + Math.sin(i * 1.7) * 4;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-[70%] w-[84%]">
      <defs>
        <linearGradient id="trade-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.18" strokeDasharray="1 2" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L100 80 L0 80 Z`} fill="url(#trade-fill)" />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const MOTIFS: Record<string, () => React.JSX.Element> = {
  studio: StudioMotif,
  game: GameMotif,
  oneforall: ToolsMotif,
  voice: VoiceMotif,
  download: DownloadMotif,
  trading: TradingMotif,
};

const HEIGHT: Record<string, string> = {
  studio: "h-[250px] sm:h-[300px] lg:h-[380px]",
  game: "h-[250px] sm:h-[300px] lg:h-[380px]",
  oneforall: "h-[230px] lg:h-[270px]",
  voice: "h-[230px] lg:h-[270px]",
  download: "h-[230px] lg:h-[270px]",
  trading: "h-[190px] sm:h-[210px]",
};

/** The picture on top of a product card: a slow-moving glow field with that product's own material floating in it. */
export function ProductVisual({ product, flush = false }: { product: Product; flush?: boolean }) {
  const Motif = MOTIFS[product.id];
  const dim = product.status === "maintenance";
  return (
    <div
      className={`aurora au-${product.id} ${dim ? "is-dim" : ""} grid place-items-center ${flush ? "rounded-t-[28px]" : "rounded-[22px]"} text-[var(--b-ink)] ${HEIGHT[product.id]}`}
      aria-hidden="true"
    >
      <Motif />
    </div>
  );
}

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
  return (
    <div className="relative h-[82%] w-[88%]">
      <div
        className="float absolute inset-x-0 top-[6%] overflow-hidden rounded-xl shadow-[0_20px_45px_-14px_rgba(0,0,0,0.4)]"
        style={{ ["--r" as string]: "1deg" }}
      >
        <Image
          src="/brand/tiles/voice-studio.png"
          alt="Voice Studio Screenshot"
          width={1440}
          height={900}
          unoptimized
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

function DownloadMotif() {
  return (
    <div className="relative h-[84%] w-[90%]">
      <div
        className="float absolute right-0 top-[2%] w-[68%] overflow-hidden rounded-xl shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]"
        style={{ ["--r" as string]: "2.5deg", animationDelay: "-2.5s" }}
      >
        <Image
          src="/brand/tiles/download-dark.png"
          alt="DownloadAnything Dark Screenshot"
          width={1024}
          height={575}
          unoptimized
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
      <div
        className="float absolute left-0 top-[10%] w-[72%] overflow-hidden rounded-xl shadow-[0_20px_45px_-12px_rgba(0,0,0,0.4)] z-10"
        style={{ ["--r" as string]: "-2deg" }}
      >
        <Image
          src="/brand/tiles/download-light.png"
          alt="DownloadAnything Light Screenshot"
          width={1024}
          height={575}
          unoptimized
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
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
  voice: "h-[250px] sm:h-[300px] lg:h-[360px]",
  download: "h-[250px] sm:h-[300px] lg:h-[360px]",
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

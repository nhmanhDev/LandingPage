import Image from "next/image";
import { AudioLines, Download, Languages, Plus } from "lucide-react";
import type { Product } from "@/lib/brand/content";
import { IMAGE_SIZE, type ImageKey } from "@/lib/brand/tiles";

function Shot({ name, className, style }: { name: ImageKey; className?: string; style?: React.CSSProperties }) {
  const { w, h } = IMAGE_SIZE[name];
  return (
    <div className={`overflow-hidden rounded-xl shadow-[0_16px_36px_-12px_rgba(45,47,52,0.18)] ${className ?? ""}`} style={style}>
      <Image src={`/brand/tiles/${name}.webp`} alt="" width={w} height={h} unoptimized loading="lazy" draggable={false} className="block h-auto w-full" />
    </div>
  );
}

/** Studio: Physical Video Editor Mockup with Timeline & Frame */
function StudioMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      <div className="mx-auto w-[92%] rounded-t-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-2.5 pb-0 shadow-[0_20px_45px_-12px_rgba(45,47,52,0.15)]">
        {/* Editor Window Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[13px] font-semibold text-[var(--b-muted)]">studio.ai42e.com</span>
          <span className="text-[13px] font-bold text-[var(--b-brand)] bg-[var(--b-chip)] px-2 py-0.5 rounded-full">AI Render</span>
        </div>
        
        {/* Editor Screen Viewport */}
        <div className="relative mt-2 overflow-hidden rounded-t-xl">
          <Image
            src="/brand/tiles/studio-hero.webp"
            alt="AI42E Studio Editor"
            width={1200}
            height={675}
            unoptimized
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

/** Game: Overlapping Tactile Game Cards */
function GameMotif() {
  const covers: { name: ImageKey; left: string; rot: string; z: number; delay: string }[] = [
    { name: "game-oanquan", left: "6%", rot: "-8deg", z: 1, delay: "-1s" },
    { name: "game-baucua", left: "50%", rot: "7deg", z: 1, delay: "-4s" },
    { name: "game-truth", left: "28%", rot: "-1deg", z: 2, delay: "-2.5s" },
  ];
  return (
    <div className="relative w-full h-[88%] flex items-end justify-center pb-2">
      <div className="relative w-[90%] h-full">
        {covers.map((cover) => (
          <div
            key={cover.name}
            className="float absolute bottom-0 w-[46%]"
            style={{
              left: cover.left,
              zIndex: cover.z,
              ["--r" as string]: cover.rot,
              animationDelay: cover.delay,
            }}
          >
            <Shot name={cover.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** DownloadAnything: Dual-Theme Layered Browser Window */
function DownloadMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      <div className="relative mx-auto w-[94%] h-[88%]">
        {/* Dark Theme Underneath */}
        <div
          className="float absolute right-0 top-[4%] w-[68%] overflow-hidden rounded-t-xl border border-[var(--b-line)] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.35)]"
          style={{ ["--r" as string]: "2deg", animationDelay: "-2.5s" }}
        >
          <Image
            src="/brand/tiles/download-dark.png"
            alt="DownloadAnything Dark Interface"
            width={1024}
            height={575}
            unoptimized
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>

        {/* Light Theme Dominant on Top */}
        <div
          className="float absolute left-0 top-[12%] w-[74%] overflow-hidden rounded-t-xl border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[0_24px_50px_-14px_rgba(45,47,52,0.2)] z-10"
          style={{ ["--r" as string]: "-2deg" }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[var(--b-line)] bg-[var(--b-surface)]">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[13px] text-[var(--b-muted)] truncate">downloader.ai42e.com</span>
          </div>
          <Image
            src="/brand/tiles/download-light.png"
            alt="DownloadAnything Light Interface"
            width={1024}
            height={575}
            unoptimized
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

/** Voice Studio: Audio Workstation Window */
function VoiceMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      <div className="mx-auto w-[94%] rounded-t-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-2.5 pb-0 shadow-[0_20px_45px_-12px_rgba(45,47,52,0.15)]">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[13px] font-semibold text-[var(--b-muted)]">voice.ai42e.com</span>
          <span className="text-[13px] font-bold text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] px-2 py-0.5 rounded-full">Studio Voice</span>
        </div>
        
        <div className="relative mt-2 overflow-hidden rounded-t-xl">
          <Image
            src="/brand/tiles/voice-studio.png"
            alt="Voice Studio Desktop Interface"
            width={1440}
            height={900}
            unoptimized
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ToolTile({ children, delay }: { children: React.ReactNode; delay: string }) {
  return (
    <div className="float glass grid aspect-square w-full place-items-center rounded-2xl shadow-sm" style={{ ["--r" as string]: "0deg", animationDelay: delay }}>
      {children}
    </div>
  );
}

function ToolsMotif() {
  return (
    <div className="grid w-[46%] max-w-[210px] grid-cols-2 gap-3 pb-6">
      <ToolTile delay="0s"><Download size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-2s"><AudioLines size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-4s"><Languages size={26} strokeWidth={1.6} /></ToolTile>
      <ToolTile delay="-6s"><Plus size={26} strokeWidth={1.6} /></ToolTile>
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
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-[70%] w-[84%] pb-4">
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
  studio: "h-[260px] sm:h-[310px] lg:h-[360px]",
  game: "h-[260px] sm:h-[310px] lg:h-[360px]",
  oneforall: "h-[220px] lg:h-[260px]",
  voice: "h-[260px] sm:h-[310px] lg:h-[340px]",
  download: "h-[260px] sm:h-[310px] lg:h-[340px]",
  trading: "h-[190px] sm:h-[210px]",
};

/**
 * Physical product preview widget bleeding off the bottom of the sand card (Slite signature pattern)
 */
export function ProductVisual({ product }: { product: Product; flush?: boolean }) {
  const Motif = MOTIFS[product.id];
  const dim = product.status === "maintenance";
  return (
    <div
      className={`relative w-full overflow-hidden ${dim ? "opacity-50" : ""} flex items-end justify-center text-[var(--b-ink)] ${HEIGHT[product.id]}`}
      aria-hidden="true"
    >
      <Motif />
    </div>
  );
}

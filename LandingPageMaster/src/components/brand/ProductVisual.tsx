import Image from "next/image";
import { AudioLines, Download, Languages, Play, Plus } from "lucide-react";
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

const VOICE_BAR_HEIGHTS = [38, 68, 92, 54, 84, 100, 62, 44, 88, 96, 68, 48, 82, 95, 58, 76, 46, 86, 98, 64, 52, 78, 90, 44];

/** Studio: Physical Video Editor Mockup with Live Sweeping Timeline & Playhead */
function StudioMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-start pt-1">
      <div className="mx-auto w-[92%] rounded-t-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-2.5 pb-0 shadow-[0_20px_45px_-12px_rgba(45,47,52,0.15)]">
        {/* Editor Window Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[13px] font-semibold text-[var(--b-muted)]">studio.ai42e.com</span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--b-ink)] bg-white/95 dark:bg-[#25221d] border border-[var(--b-brand)]/35 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--b-brand)]" />
            AI Render
          </span>
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

      {/* Interactive Timeline Strip Docked Cleanly Above Card Bottom */}
      <div className="pointer-events-none absolute left-7 right-7 bottom-3.5 z-20 rounded-xl border border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-surface)_92%,transparent)] px-3 py-2 backdrop-blur-md shadow-[var(--sh-card)]">
        <div className="relative space-y-1.5 overflow-hidden py-0.5">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-4 h-2 rounded-sm bg-[var(--b-brand)]/25 border border-[var(--b-brand)]/40" />
            <div className="col-span-5 h-2 rounded-sm bg-[var(--b-chip-hover)] border border-[var(--b-line)]" />
            <div className="col-span-3 h-2 rounded-sm bg-[var(--b-brand)]/20 border border-[var(--b-brand)]/35" />
          </div>
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-3 h-1.5 rounded-full bg-[var(--b-pos-bg)] border border-[var(--b-pos-fg)]/30" />
            <div className="col-span-6 h-1.5 rounded-full bg-[var(--b-pos-bg)] border border-[var(--b-pos-fg)]/30" />
            <div className="col-span-3 h-1.5 rounded-full bg-[var(--b-chip)]" />
          </div>

          {/* Live Sweeping Playhead (Pure GPU translateX) */}
          <div className="studio-playhead absolute inset-y-0 left-0 w-full">
            <div className="relative h-full w-[2px] bg-[var(--b-brand)] shadow-[0_0_8px_rgba(246,119,72,0.7)]">
              <span className="absolute -top-0.5 -left-[3px] h-2 w-2 rotate-45 rounded-[1px] bg-[var(--b-brand)]" />
            </div>
          </div>
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

/** DownloadAnything: Theme-Matched Layered Browser Window + Live Extraction Pill */
function DownloadMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      <div className="relative mx-auto w-[94%] h-[88%]">
        {/* Secondary Stacked Window Underneath (warm light in Light mode, dark in Dark mode) */}
        <div
          className="float absolute right-0 top-[4%] w-[68%] overflow-hidden rounded-t-xl border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[var(--sh-card)]"
          style={{ ["--r" as string]: "2deg", animationDelay: "-2.5s" }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 border-b border-[var(--b-line)] bg-[var(--b-lav-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-line)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-line)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-line)]" />
          </div>
          <Image
            src="/brand/tiles/download-light.png"
            alt=""
            width={1024}
            height={575}
            unoptimized
            loading="lazy"
            className="block dark:hidden h-auto w-full opacity-75"
          />
          <Image
            src="/brand/tiles/download-dark.png"
            alt=""
            width={1024}
            height={575}
            unoptimized
            loading="lazy"
            className="hidden dark:block h-auto w-full opacity-80"
          />
        </div>

        {/* Dominant Window on Top (matches active theme) */}
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
            className="block dark:hidden h-auto w-full"
          />
          <Image
            src="/brand/tiles/download-dark.png"
            alt="DownloadAnything Dark Interface"
            width={1024}
            height={575}
            unoptimized
            loading="lazy"
            className="hidden dark:block h-auto w-full"
          />
        </div>
      </div>

      {/* Live Media Extraction Badge Docked Above Bottom Edge */}
      <div className="pointer-events-none absolute right-5 bottom-4 z-20 flex items-center gap-2.5 rounded-2xl border border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-surface)_94%,transparent)] px-3.5 py-2 shadow-[var(--sh-card)] backdrop-blur-md">
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-[var(--b-pos-bg)] text-[var(--b-pos-fg)]">
          <span className="ripple absolute inset-0 rounded-full border border-[var(--b-pos-fg)]/50" />
          <Download size={13} strokeWidth={2.4} />
        </span>
        <div className="w-24">
          <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--b-ink)]">
            <span>MP4 · 4K</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--b-chip)]">
            <div className="dl-progress h-full w-full rounded-full bg-[var(--b-brand)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Voice Studio: Audio Workstation Window + Live Studio Spectrum Equalizer */
function VoiceMotif() {
  return (
    <div className="relative w-full h-full flex flex-col justify-start pt-1">
      <div className="mx-auto w-[94%] rounded-t-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-2.5 pb-0 shadow-[0_20px_45px_-12px_rgba(45,47,52,0.15)]">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[13px] font-semibold text-[var(--b-muted)]">voice.ai42e.com</span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] px-2.5 py-0.5 rounded-full">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--b-pos-fg)]" />
            Studio Voice
          </span>
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

      {/* Live Voice Equalizer Dock Anchored Above Bottom Edge */}
      <div className="pointer-events-none absolute left-7 right-7 bottom-4 z-20 flex items-center gap-2.5 rounded-2xl border border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-surface)_92%,transparent)] px-3.5 py-2 shadow-[var(--sh-card)] backdrop-blur-md">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--b-brand)] text-white">
          <Play size={11} fill="currentColor" />
        </span>
        <div className="flex h-5 flex-1 items-end justify-between px-1">
          {VOICE_BAR_HEIGHTS.map((pct, i) => (
            <span
              key={i}
              className="bar w-[3.5px] shrink-0 rounded-full bg-[var(--b-brand)]"
              style={{
                height: `${pct}%`,
                animationDelay: `${(i * -0.14).toFixed(2)}s`,
                animationDuration: `${(1.05 + (i % 4) * 0.22).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-[var(--b-muted)]">48kHz</span>
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
      <path d={`${line} L100 60 L0 60 Z`} fill="url(#trade-fill)" />
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
      data-decor=""
      className={`relative w-full overflow-hidden ${dim ? "opacity-50 is-dim" : ""} flex items-end justify-center text-[var(--b-ink)] ${HEIGHT[product.id]}`}
      aria-hidden="true"
    >
      <Motif />
    </div>
  );
}

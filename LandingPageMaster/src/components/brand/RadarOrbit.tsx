"use client";

import React from "react";
import Image from "next/image";
import { AudioLines, Boxes, CandlestickChart, Gamepad2, Music, Sparkles } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";

interface OrbitItem {
  id: string;
  nameVi: string;
  nameEn: string;
  taglineVi: string;
  taglineEn: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  x: number;        // Pre-computed integer coordinate to guarantee 100% exact SSR/Client hydration match
  y: number;        // Pre-computed integer coordinate
  size: number;     // Item badge diameter in px
  iconSize: number; // Icon size in px
  colors: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

const ORBIT_ITEMS: OrbitItem[] = [
  // Ring 2 (Inner Ring - radius: 105px, centered at 250, 250)
  {
    id: "studio",
    nameVi: "AI42E Studio",
    nameEn: "AI42E Studio",
    taglineVi: "Dựng video tự động",
    taglineEn: "Automated video creation",
    href: "https://studio.ai42e.com",
    icon: Sparkles,
    x: 250,
    y: 355,
    size: 38,
    iconSize: 18,
    colors: {
      bg: "bg-blue-50 dark:bg-blue-950/60",
      border: "border-blue-200/90 dark:border-blue-800/60",
      text: "text-blue-600 dark:text-blue-400",
      glow: "hover:shadow-[0_4px_16px_rgba(59,130,246,0.3)]",
    },
  },
  {
    id: "voice",
    nameVi: "Voice Studio",
    nameEn: "Voice Studio",
    taglineVi: "Đọc văn bản cảm xúc",
    taglineEn: "Expressive TTS & Clone",
    href: "https://voice.ai42e.com",
    icon: AudioLines,
    x: 198,
    y: 159,
    size: 38,
    iconSize: 18,
    colors: {
      bg: "bg-teal-50 dark:bg-teal-950/60",
      border: "border-teal-200/90 dark:border-teal-800/60",
      text: "text-teal-600 dark:text-teal-400",
      glow: "hover:shadow-[0_4px_16px_rgba(20,184,166,0.3)]",
    },
  },

  // Ring 3 (Middle Ring - radius: 165px, centered at 250, 250)
  {
    id: "audio",
    nameVi: "Tách nhạc AI",
    nameEn: "Audio Stem AI",
    taglineVi: "Tách vocal & beat",
    taglineEn: "Vocal & stem isolate",
    href: "https://audio.ai42e.com",
    icon: Music,
    x: 400,
    y: 180,
    size: 40,
    iconSize: 19,
    colors: {
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      border: "border-emerald-200/90 dark:border-emerald-800/60",
      text: "text-emerald-600 dark:text-emerald-400",
      glow: "hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)]",
    },
  },
  {
    id: "game",
    nameVi: "AI42E Game Hub",
    nameEn: "AI42E Game Hub",
    taglineVi: "11 trò chơi kết nối",
    taglineEn: "11 web board games",
    href: "https://play.ai42e.com",
    icon: Gamepad2,
    x: 100,
    y: 320,
    size: 40,
    iconSize: 19,
    colors: {
      bg: "bg-purple-50 dark:bg-purple-950/60",
      border: "border-purple-200/90 dark:border-purple-800/60",
      text: "text-purple-600 dark:text-purple-400",
      glow: "hover:shadow-[0_4px_16px_rgba(168,85,247,0.3)]",
    },
  },

  // Ring 4 (Outer Ring - radius: 225px, centered at 250, 250)
  {
    id: "trading",
    nameVi: "Trading System",
    nameEn: "Trading System",
    taglineVi: "Quant AI thị trường",
    taglineEn: "Quant market intelligence",
    href: "#horizon",
    icon: CandlestickChart,
    x: 445,
    y: 363,
    size: 42,
    iconSize: 20,
    colors: {
      bg: "bg-amber-50 dark:bg-amber-950/60",
      border: "border-amber-200/90 dark:border-amber-800/60",
      text: "text-amber-600 dark:text-amber-400",
      glow: "hover:shadow-[0_4px_16px_rgba(245,158,11,0.3)]",
    },
  },
  {
    id: "oneforall",
    nameVi: "OneForAll",
    nameEn: "OneForAll",
    taglineVi: "Trạm tiện ích AI",
    taglineEn: "All-in-one workspace",
    href: "#horizon",
    icon: Boxes,
    x: 39,
    y: 173,
    size: 42,
    iconSize: 20,
    colors: {
      bg: "bg-rose-50 dark:bg-rose-950/60",
      border: "border-rose-200/90 dark:border-rose-800/60",
      text: "text-rose-600 dark:text-rose-400",
      glow: "hover:shadow-[0_4px_16px_rgba(244,63,94,0.3)]",
    },
  },
];

export function RadarOrbit() {
  const { locale } = useBrand();
  const isVi = locale === "vi";

  return (
    <div
      className="group/radar relative flex items-center justify-center w-full h-[190px] sm:h-[210px] lg:h-[220px] select-none"
      aria-hidden="true"
    >
      {/* Scaling container that scales down smoothly on mobile while staying centered */}
      <div className="relative w-[500px] h-[500px] shrink-0 scale-[0.52] sm:scale-[0.62] lg:scale-[0.70] xl:scale-[0.75] transition-transform">
        
        {/* 4 Concentric Dashed Rings (Absolute Circles centered at 250, 250) */}
        {/* Ring 1: Inner Breathing Ring (r=50) */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15"
        />

        {/* Ring 2: First Orbital Ring (r=105) */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15"
        />

        {/* Ring 3: Second Orbital Ring (r=165) */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15"
        />

        {/* Ring 4: Outermost Orbital Ring (r=225) */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15"
        />

        {/* Rotating Constellation Layer: Rotates Clockwise (40s full cycle) */}
        <div className="absolute inset-0 animate-radar-spin group-hover/radar:[animation-play-state:paused]">
          {ORBIT_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  top: `${item.y}px`,
                  left: `${item.x}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Counter-rotating Wrapper: Keeps Icon Upright (Counter-clockwise 40s) */}
                <div className="animate-radar-counter group-hover/radar:[animation-play-state:paused]">
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group/item relative flex items-center justify-center rounded-full border shadow-xs transition-all duration-200 hover:scale-125 hover:z-30 cursor-pointer ${item.colors.bg} ${item.colors.border} ${item.colors.text} ${item.colors.glow}`}
                    style={{
                      width: `${item.size}px`,
                      height: `${item.size}px`,
                    }}
                    title={`${isVi ? item.nameVi : item.nameEn} · ${isVi ? item.taglineVi : item.taglineEn}`}
                  >
                    <Icon size={item.iconSize} aria-hidden="true" />

                    {/* Subtle Hover Tooltip */}
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--b-ink)] px-2 py-0.5 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover/item:opacity-100 z-40">
                      {isVi ? item.nameVi : item.nameEn}
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Logo: Fixed, Stationary Anchor in the Center of All Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white dark:bg-[#2b2721] border border-[var(--b-line)] shadow-sm">
            <Image
              src={logo}
              alt="AI42E"
              width={26}
              height={26}
              className="rounded-lg drop-shadow-2xs"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
}

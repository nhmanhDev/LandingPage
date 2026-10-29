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
  radius: number; // distance from center in px
  angle: number;  // in degrees (0 = 3 o'clock, 90 = 6 o'clock, etc.)
  size: number;   // item size in px
  colors: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

const ORBIT_ITEMS: OrbitItem[] = [
  // Ring 2 (Inner Ring - radius: 105px)
  {
    id: "studio",
    nameVi: "AI42E Studio",
    nameEn: "AI42E Studio",
    taglineVi: "Dựng video tự động",
    taglineEn: "Automated video creation",
    href: "https://studio.ai42e.com",
    icon: Sparkles,
    radius: 105,
    angle: 90, // Top
    size: 38,
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
    radius: 105,
    angle: 240, // Bottom-left
    size: 38,
    colors: {
      bg: "bg-teal-50 dark:bg-teal-950/60",
      border: "border-teal-200/90 dark:border-teal-800/60",
      text: "text-teal-600 dark:text-teal-400",
      glow: "hover:shadow-[0_4px_16px_rgba(20,184,166,0.3)]",
    },
  },

  // Ring 3 (Middle Ring - radius: 165px)
  {
    id: "audio",
    nameVi: "Tách nhạc AI",
    nameEn: "Audio Stem AI",
    taglineVi: "Tách vocal & beat",
    taglineEn: "Vocal & stem isolate",
    href: "https://audio.ai42e.com",
    icon: Music,
    radius: 165,
    angle: 335, // Bottom-right
    size: 40,
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
    radius: 165,
    angle: 155, // Top-left
    size: 40,
    colors: {
      bg: "bg-purple-50 dark:bg-purple-950/60",
      border: "border-purple-200/90 dark:border-purple-800/60",
      text: "text-purple-600 dark:text-purple-400",
      glow: "hover:shadow-[0_4px_16px_rgba(168,85,247,0.3)]",
    },
  },

  // Ring 4 (Outer Ring - radius: 225px)
  {
    id: "trading",
    nameVi: "Trading System",
    nameEn: "Trading System",
    taglineVi: "Quant AI thị trường",
    taglineEn: "Quant market intelligence",
    href: "#horizon",
    icon: CandlestickChart,
    radius: 225,
    angle: 30, // Top-right
    size: 42,
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
    radius: 225,
    angle: 200, // Bottom-left outer
    size: 42,
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

  // Center coordinate of our virtual 500x500 constellation canvas
  const center = 250;

  return (
    <div
      className="group/radar relative flex items-center justify-center w-full h-[260px] sm:h-[300px] lg:h-[320px] select-none"
      aria-hidden="true"
    >
      {/* Scaling container that scales down smoothly on mobile while staying centered */}
      <div className="relative w-[500px] h-[500px] shrink-0 scale-[0.62] sm:scale-[0.78] lg:scale-[0.9] xl:scale-100 transition-transform">
        
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
            // Convert polar to cartesian coordinates
            const rad = (item.angle * Math.PI) / 180;
            const x = center + item.radius * Math.cos(rad);
            const y = center + item.radius * Math.sin(rad);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  top: `${y}px`,
                  left: `${x}px`,
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
                    <Icon size={Math.round(item.size * 0.48)} aria-hidden="true" />

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

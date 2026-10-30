"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { useReducedMotion } from "./useReducedMotion";

interface OrbitItem {
  id: string;
  href: string;
  image: string;    // Real app screenshot/thumbnail
  x: number;        // Pre-computed integer coordinate
  y: number;        // Pre-computed integer coordinate
  size: number;     // Item badge diameter in px
}

const ORBIT_ITEMS: OrbitItem[] = [
  // Ring 2 (Inner Ring - radius: 105px, centered at 250, 250)
  {
    id: "studio",
    href: "https://studio.ai42e.com",
    image: "/brand/tiles/studio-hero.webp",
    x: 250,
    y: 355,
    size: 48,
  },
  {
    id: "voice",
    href: "https://voice.ai42e.com",
    image: "/brand/tiles/voice-studio.png",
    x: 198,
    y: 159,
    size: 48,
  },

  // Ring 3 (Middle Ring - radius: 165px, centered at 250, 250)
  {
    id: "download",
    href: "https://downloader.ai42e.com",
    image: "/brand/tiles/download-light.png",
    x: 400,
    y: 180,
    size: 52,
  },
  {
    id: "game",
    href: "https://play.ai42e.com",
    image: "/brand/tiles/game-oanquan.webp",
    x: 100,
    y: 320,
    size: 52,
  },

  // Ring 4 (Outer Ring - radius: 225px, centered at 250, 250)
  {
    id: "trading",
    href: "#horizon",
    image: "/brand/tiles/trading-system.svg",
    x: 445,
    y: 363,
    size: 56,
  },
  {
    id: "oneforall",
    href: "#horizon",
    image: "/brand/tiles/oneforall.svg",
    x: 39,
    y: 173,
    size: 56,
  },
];

export function RadarOrbit() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end end"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.5,
  });

  // Bidirectional scroll phase boost: advances orbital angle as you scroll down, rewinds smoothly as you scroll up
  const scrollSpin = useTransform(smoothScroll, [0, 1], [-36, 36]);
  const scrollCounter = useTransform(smoothScroll, [0, 1], [36, -36]);

  return (
    <div
      ref={rootRef}
      className="group/radar relative flex items-center justify-center w-full h-[200px] sm:h-[210px] lg:h-[215px] select-none"
      aria-hidden="true"
    >
      {/* Scaling container that scales down smoothly on mobile while staying centered */}
      <div className="relative w-[500px] h-[500px] shrink-0 scale-[0.54] sm:scale-[0.64] lg:scale-[0.70] xl:scale-[0.73] transition-transform">
        {/* 4 Concentric Dashed Rings (Absolute Circles centered at 250, 250) */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-gray-300/80 dark:border-white/15" />

        {/* Scroll-linked orbital phase wrapper layered seamlessly around the 40s CSS constellation spin */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { rotate: scrollSpin, willChange: "transform" }}
        >
          <div className="absolute inset-0 animate-radar-spin group-hover/radar:[animation-play-state:paused]">
            {ORBIT_ITEMS.map((item) => {
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
                  {/* Counter-rotating Wrapper: Keeps Image Upright against both CSS spin & scroll phase */}
                  <motion.div style={reduced ? undefined : { rotate: scrollCounter, willChange: "transform" }}>
                    <div className="animate-radar-counter group-hover/radar:[animation-play-state:paused]">
                      <a
                        href={item.href}
                        tabIndex={-1}
                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group/item relative flex items-center justify-center rounded-full border-2 border-white dark:border-[#38332b] shadow-[0_4px_14px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-130 hover:z-30 cursor-pointer overflow-hidden bg-white dark:bg-[#201d19]"
                        style={{
                          width: `${item.size}px`,
                          height: `${item.size}px`,
                        }}
                        title={`${c.closing.orbit[item.id].name} · ${c.closing.orbit[item.id].tagline}`}
                      >
                        <Image
                          src={item.image}
                          alt={c.closing.orbit[item.id].name}
                          width={item.size * 2}
                          height={item.size * 2}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover/item:scale-115"
                          unoptimized
                        />

                        {/* Subtle Hover Tooltip */}
                        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--b-surface)] px-2.5 py-1 text-[13px] font-semibold text-[var(--b-ink)] opacity-0 shadow-[var(--sh-card)] transition-opacity duration-150 group-hover/item:opacity-100 z-40 border border-[var(--b-line)]">
                          {c.closing.orbit[item.id].name}
                        </div>
                      </a>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

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

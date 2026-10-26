"use client";

import { useEffect, useRef } from "react";

interface RibbonProps {
  dark: boolean;
}

const LIGHT_STOPS: [number, number, number][] = [
  [79, 70, 229], // indigo
  [2, 132, 199], // sky
  [5, 150, 105], // emerald
  [217, 119, 6], // warm amber, only to lift the cream background
];
const DARK_STOPS: [number, number, number][] = [
  [129, 140, 248],
  [56, 189, 248],
  [52, 211, 153],
  [251, 191, 36],
];

const BUCKETS = 24;

function sampleStops(stops: [number, number, number][], t: number): [number, number, number] {
  const scaled = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = stops[i];
  const b = stops[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

interface Particle {
  t: number;
  u: number;
  size: number;
  bucket: number;
}

/**
 * A slow, grainy ribbon of particles. One <canvas>, no WebGL, no libraries:
 * cheap enough for phones. Pauses off-screen and when the tab is hidden, and
 * draws a single still frame for people who prefer reduced motion.
 */
export function Ribbon({ dark }: RibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stops = dark ? DARK_STOPS : LIGHT_STOPS;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let phase = 1.2;
    let raf = 0;
    let last = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const small = width < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = small ? 2400 : 7000;
      particles = Array.from({ length: count }, () => {
        const t = Math.random();
        return {
          t,
          u: Math.random() * 2 - 1,
          size: 0.8 + Math.random() * 1.0,
          bucket: Math.min(BUCKETS - 1, Math.floor(t * BUCKETS)),
        };
      });
    };

    const paths: Path2D[] = [];
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const amp = height * 0.2;
      const baseWidth = height * 0.34;
      for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D();

      for (const p of particles) {
        const x = p.t * width;
        const angle = p.t * Math.PI * 2;
        const center = height / 2 + Math.sin(angle * 1.25 + phase) * amp;
        // |cos| pinches the ribbon to a point now and then, like a twist.
        const half = baseWidth * (0.18 + 0.82 * Math.abs(Math.cos(angle * 0.9 + phase * 0.7)));
        const y = center + p.u * half;
        paths[p.bucket].rect(x, y, p.size, p.size);
      }

      for (let b = 0; b < BUCKETS; b++) {
        const [r, g, bl] = sampleStops(stops, (b + 0.5) / BUCKETS);
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${dark ? 0.85 : 0.8})`;
        ctx.fill(paths[b]);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      phase += dt * 0.35;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion.matches) {
        draw();
        return;
      }
      if (!raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    build();
    draw();
    start();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(canvas);

    const resize = new ResizeObserver(() => {
      build();
      draw();
    });
    resize.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    const onMotionChange = () => {
      if (reduceMotion.matches) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        draw();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}

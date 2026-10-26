"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMotionPaused } from "./MotionContext";

// WebGL is loaded on demand and only on big screens with a mouse; everyone else keeps the CSS glow behind it.
const Grainient = dynamic(() => import("@/components/react-bits/Grainient"), { ssr: false });

const COLORS = ["#4f46e5", "#22d3ee", "#f472b6"];

export function GlowBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const paused = useMotionPaused();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const capable =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!capable) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
      {visible ? (
        <Grainient colors={COLORS} speed={paused ? 0 : 0.5} grainAmount={0.14} contrast={1.1} saturation={1.05} interactive={false} />
      ) : null}
    </div>
  );
}

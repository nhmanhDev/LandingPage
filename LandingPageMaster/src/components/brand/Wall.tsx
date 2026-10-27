"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { IMAGE_SIZE, WALL_COLUMNS, type Tile } from "@/lib/brand/tiles";
import type { Content } from "@/lib/brand/content";

interface WallProps {
  paused: boolean;
  text: Content["wall"];
}

const TEXT_TONE: Record<string, string> = {
  free: "bg-[var(--b-ink)] text-[var(--b-bg)]",
  brand: "bg-[var(--b-surface)] text-[var(--b-ink)]",
  tools: "bg-[var(--b-chip)] text-[var(--b-ink)]",
};

function WallTile({ tile, text, eager }: { tile: Tile; text: Content["wall"]; eager: boolean }) {
  const style = { transform: `rotate(${tile.tilt}deg)` };
  if (tile.kind === "text") {
    return (
      <div
        className={`wall-tile grid place-items-center p-4 text-center t-title ${TEXT_TONE[tile.key]}`}
        style={{ ...style, aspectRatio: `1 / ${tile.ratio}` }}
      >
        {text[tile.key]}
      </div>
    );
  }
  const { w, h } = IMAGE_SIZE[tile.key];
  return (
    <div className="wall-tile" style={{ ...style, aspectRatio: `${w} / ${h}` }}>
      <Image src={`/brand/tiles/${tile.key}.webp`} alt="" width={w} height={h} unoptimized loading={eager ? "eager" : "lazy"} draggable={false} />
    </div>
  );
}

/**
 * A tilted wall of real AI42E material. The pointer eases the whole wall (one transform on one element),
 * the columns drift on their own with CSS only, and `paused` stops both.
 */
export function Wall({ paused, text }: WallProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const wall = wallRef.current;
    if (!stage || !wall) return;

    const reset = () => {
      for (const name of ["--px", "--py", "--rx", "--ry"]) wall.style.removeProperty(name);
    };
    if (paused || !window.matchMedia("(pointer: fine)").matches) {
      reset();
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const apply = () => {
      wall.style.setProperty("--px", `${(-x * 56).toFixed(1)}px`);
      wall.style.setProperty("--py", `${(-y * 40).toFixed(1)}px`);
      wall.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
      wall.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
    };
    const loop = () => {
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      apply();
      raf = Math.abs(targetX - x) > 0.002 || Math.abs(targetY - y) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      reset();
    };
  }, [paused]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      stage.dataset.wallOff = entry.isIntersecting ? "false" : "true";
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden" data-wall-paused={paused} aria-hidden="true">
      <div ref={wallRef} className="wall">
        {WALL_COLUMNS.map((column, index) => (
          <div key={index} className="wall-col">
            {[...column, ...column].map((tile, i) => (
              <WallTile key={`${index}-${i}`} tile={tile} text={text} eager={i < 3} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

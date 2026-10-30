"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { buildCylinderLayout, type CylinderCard, type CylinderLayout } from "@/lib/brand/tiles";
interface WallProps {
  paused: boolean;
  heroRef: React.RefObject<HTMLElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  onFrame?: (q: number, stageH: number) => void;
}

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const pseudoRand = (seed: number) => {
  const x = Math.sin(seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function CylinderTile({
  card,
  width,
  setEl,
  onEnter,
  onLeave,
}: {
  card: CylinderCard;
  width: number;
  setEl: (el: HTMLDivElement | null) => void;
  onEnter: (e: React.PointerEvent<HTMLDivElement>) => void;
  onLeave: () => void;
}) {
  const { item } = card;
  const baseStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${card.h}px`,
    transform: card.initialTransform,
    visibility: card.initialVisible ? "visible" : "hidden",
  };

  return (
    <div
      ref={setEl}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`wall-tile ${item.contain ? "wall-tile-contain !bg-[#f5f0e8]" : ""}`}
      style={baseStyle}
    >
      <Image
        src={item.src}
        alt=""
        width={item.w}
        height={item.h}
        unoptimized
        loading={card.eager ? "eager" : "lazy"}
        draggable={false}
        className={item.darkSrc ? "tile-img-light" : undefined}
      />
      {item.darkSrc ? (
        <Image
          src={item.darkSrc}
          alt=""
          width={item.w}
          height={item.h}
          unoptimized
          loading={card.eager ? "eager" : "lazy"}
          draggable={false}
          className="tile-img-dark"
        />
      ) : null}
    </div>
  );
}

/**
 * 360-degree 3D Cylindrical Hero World modeled directly on baked.design's World engine:
 * - ~19 columns arranged around a 360° cylinder (radius R=900, center Z=540, perspective=1100px)
 *   curving from z=-360px at center forward to z=+415px around peripheral vision.
 * - Spins continuously in 360° horizontally (7°/s) while streaming upward (22px/s).
 * - Pointer look-around (±24° yaw, ±9% perspective-origin pitch, ±70px vertical pan),
 *   edge cruise, drag/trackpad 360° spin with momentum inertia, and +70px 3D card hover lift.
 * - Radial 360° iris "scroll to open" parting smoothly on downward scroll and reassembling on upward scroll.
 */
export function Wall({ paused, heroRef, stageRef, onFrame }: WallProps) {
  const [layout, setLayout] = useState<CylinderLayout>(() => buildCylinderLayout(1440, 900));
  const viewportRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverStateRef = useRef<{ idx: number; label: string }>({ idx: -1, label: "" });
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  // Measure actual viewport on client mount and debounced resize
  useEffect(() => {
    let lastW = 1440;
    let lastH = 900;
    let timer = 0;

    const rebuildIfNeeded = (force: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!force && w === lastW && Math.abs(h - lastH) < 160) return;
      lastW = w;
      lastH = h;
      setLayout(buildCylinderLayout(w, h));
    };

    if (window.innerWidth !== 1440 || Math.abs(window.innerHeight - 900) >= 120) {
      rebuildIfNeeded(true);
    }

    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => rebuildIfNeeded(false), 120);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Main 360° 3D cylinder + scroll-to-open animation loop
  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const wall = wallRef.current;
    const chip = chipRef.current;
    if (!hero || !stage || !viewport || !wall) return;

    const { metrics: E, columns, cards } = layout;
    viewport.style.perspective = `${E.P}px`;

    if (paused) {
      viewport.style.perspectiveOrigin = "50% 50%";
      wall.style.removeProperty("transform");
      chip?.classList.remove("on");
      cards.forEach((card, i) => {
        const el = cardElsRef.current[i];
        if (!el) return;
        el.style.visibility = card.initialVisible ? "visible" : "hidden";
        el.style.opacity = "1";
        el.style.transform = card.initialTransform;
      });
      onFrameRef.current?.(1, stage.offsetHeight || window.innerHeight);
      return;
    }

    const shown = cards.map((c) => c.initialVisible);
    const lifts = new Float32Array(cards.length);
    const prevOpacity = new Array<string>(cards.length).fill("1.000");

    let yaw = 0;
    let dragVel = 0;
    let driftScale = 1;
    let vScroll = 0;
    let lastMoveAt = -1e9;

    let N = 0;
    let P = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let normX = 0;
    let pointerInside = false;
    let edgeCruise = 0;

    let dragging = false;
    let movedPx = 0;
    let lastDragX = 0;
    let downX = 0;
    let downY = 0;
    let isTouch = false;
    let axisLock = 0;

    let q = -1;
    let lastPerspOrigin = "";
    let lastWallTransform = "";
    const mountAt = performance.now();
    let prevAt = mountAt;
    let rafId = 0;

    const hideChip = () => {
      hoverStateRef.current.idx = -1;
      chip?.classList.remove("on");
    };

    const moveChip = (clientX: number, clientY: number) => {
      if (!chip) return;
      chip.style.transform = `translate3d(${(clientX + 14).toFixed(0)}px, ${(clientY + 14).toFixed(0)}px, 0)`;
    };

    const onStagePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      normX = ((e.clientX - rect.left) / w) * 2 - 1;
      const normY = ((e.clientY - rect.top) / h) * 2 - 1;
      if (!dragging) {
        targetYaw = normX * 24;
        targetPitch = normY;
      }
      pointerInside = true;
      lastMoveAt = performance.now();
      if (hoverStateRef.current.idx >= 0 && q < 0.22) {
        moveChip(e.clientX, e.clientY);
      }
    };

    const onPointerReset = () => {
      pointerInside = false;
      targetYaw = 0;
      targetPitch = 0;
      edgeCruise = 0;
      hideChip();
    };

    const onViewportDown = (e: PointerEvent) => {
      if (q > 0.6) return;
      dragging = true;
      movedPx = 0;
      lastDragX = downX = e.clientX;
      downY = e.clientY;
      dragVel = 0;
      isTouch = e.pointerType !== "mouse";
      axisLock = isTouch ? 0 : 1;
    };

    const onViewportMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (!axisLock) {
        const dx0 = Math.abs(e.clientX - downX);
        const dy0 = Math.abs(e.clientY - downY);
        if (dx0 + dy0 < 8) return;
        axisLock = dx0 > dy0 * 1.2 ? 1 : -1;
        lastDragX = e.clientX;
      }
      if (axisLock < 0) return;
      const dx = e.clientX - lastDragX;
      lastDragX = e.clientX;
      movedPx += Math.abs(dx);
      if (movedPx > 6 && !viewport.hasPointerCapture(e.pointerId)) {
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch {}
        viewport.classList.add("grab");
        hideChip();
      }
      yaw += dx * 0.09;
      dragVel += (dx * 6 - dragVel) * (isTouch ? 0.35 : 1);
    };

    const onViewportUp = () => {
      dragging = false;
      viewport.classList.remove("grab");
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && q < 0.85) {
        dragVel -= e.deltaX * 0.9;
        e.preventDefault();
      }
    };

    stage.addEventListener("pointermove", onStagePointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerReset);
    document.addEventListener("mouseleave", onPointerReset);
    window.addEventListener("blur", onPointerReset);
    stage.addEventListener("wheel", onWheel, { passive: false });

    viewport.addEventListener("pointerdown", onViewportDown);
    viewport.addEventListener("pointermove", onViewportMove);
    viewport.addEventListener("pointerup", onViewportUp);
    viewport.addEventListener("pointercancel", onViewportUp);

    let lastSentQ = -1;
    let lastSentH = -1;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prevAt) / 1000));
      prevAt = now;
      const elapsed = (now - mountAt) / 1000;

      const heroRect = hero.getBoundingClientRect();
      const stageH = stage.offsetHeight || window.innerHeight;
      const stageW = stage.offsetWidth || window.innerWidth;
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const maxSticky = Math.max(1, heroRect.height - stageH);
      const openDist = Math.max(1, maxSticky * 0.88);
      const rawQ = clamp(Math.max(0, stickyTop - heroRect.top) / openDist, 0, 1);

      if (q < 0) {
        q = rawQ;
      } else {
        q = Math.abs(rawQ - q) < 0.0004 ? rawQ : q + (rawQ - q) * (1 - Math.exp(-dt / 0.1));
      }

      if (Math.abs(q - lastSentQ) > 0.0004 || stageH !== lastSentH) {
        lastSentQ = q;
        lastSentH = stageH;
        onFrameRef.current?.(q, stageH);
      }

      if (q >= 0.22 && hoverStateRef.current.idx >= 0) {
        hideChip();
      }

      // Only compute 3D cylinder cards while #top is in or near the viewport
      if (heroRect.bottom > -40) {
        const isHoveringTile = hoverStateRef.current.idx >= 0 && q < 0.22;

        if (!dragging) {
          dragVel *= Math.pow(0.04, dt);
          const recentlyMoved = now - lastMoveAt < 900;
          const targetDrift = isHoveringTile ? 0 : recentlyMoved ? 0.35 : 1;
          driftScale += (targetDrift - driftScale) * (1 - Math.pow(0.05, dt));

          const wantsEdgeCruise = pointerInside && now - lastMoveAt > 450 && Math.abs(normX) > 0.78 && !isHoveringTile;
          const targetCruise = wantsEdgeCruise
            ? Math.sign(normX) * 14 * Math.min(1, (Math.abs(normX) - 0.78) / 0.2)
            : 0;
          edgeCruise += (targetCruise - edgeCruise) * (1 - Math.pow(0.02, dt));

          yaw += (7 * driftScale + dragVel + edgeCruise) * dt;
        }

        vScroll += 22 * driftScale * dt;

        const ptrLerp = 1 - Math.pow(0.0004, dt);
        N += (targetYaw - N) * ptrLerp;
        P += (targetPitch - P) * ptrLerp;

        const perspOrigin = `50% ${(50 + P * 9).toFixed(2)}%`;
        if (perspOrigin !== lastPerspOrigin) {
          lastPerspOrigin = perspOrigin;
          viewport.style.perspectiveOrigin = perspOrigin;
        }

        const wallTf = `translate3d(${(-N * 0.35).toFixed(2)}px, ${(-P * 8).toFixed(2)}px, 0px)`;
        if (wallTf !== lastWallTransform) {
          lastWallTransform = wallTf;
          wall.style.transform = wallTf;
        }

        const netYaw = yaw - N;
        const vPan = -P * 70;
        const maxCullY = E.isMobile ? 0 : (1000 * E.R) / 900;
        const diagHalf = Math.hypot(stageW, stageH) / 1.7;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const el = cardElsRef.current[i];
          if (!el) continue;

          const col = columns[card.col];
          const s = ((((col.phi + netYaw) % 360) + 540) % 360) - 180;
          let vis = Math.abs(s) <= 82 && q < 0.998;
          let alpha = 1;

          if (vis) {
            const rad = (s * Math.PI) / 180;
            let u = E.R * Math.sin(rad);
            const baseZ = E.Z - E.R * Math.cos(rad);
            let l = ((((card.y + col.off - vScroll) % col.L) + col.L) % col.L) - col.L / 2 + card.h / 2 + vPan;
            const yLimit = E.isMobile ? col.L / 2 + 200 : maxCullY;

            if (Math.abs(l) > yLimit) {
              vis = false;
            } else {
              const proj = E.P / (E.P - baseZ);
              const sx = u * proj;
              const sy = l * proj;
              const dist = Math.hypot(sx, sy);
              const angle = dist < 40 ? pseudoRand(i + 13) * Math.PI * 2 : Math.atan2(sy, sx);

              const v = clamp((q - Math.min(1, dist / 900) * 0.3) / 0.7, 0, 1);
              const iris = smoothstep(v);

              if (iris > 0.995) {
                vis = false;
              } else {
                const radialPush = ((Math.max(0, diagHalf - dist) + 250) / proj) * iris;
                const stagger = Math.abs(s) / 82 + Math.abs(l) / 1400;
                const intro = 1 - Math.pow(1 - clamp((elapsed - 0.08 - stagger * 0.85) / 0.85, 0, 1), 3);

                u += Math.cos(angle) * radialPush;
                l += Math.sin(angle) * radialPush;

                const hoverTarget = hoverStateRef.current.idx === i && q < 0.22 ? 1 : 0;
                lifts[i] += (hoverTarget - lifts[i]) * (1 - Math.pow(0.001, dt));

                const d = baseZ - (1 - intro) * 500 + 160 * iris + lifts[i] * 70;
                if (d > E.P * 0.7) {
                  vis = false;
                } else {
                  alpha = intro * Math.min(1, (E.P * 0.7 - d) / 250);
                  el.style.transform = `translate3d(${(u - E.W / 2).toFixed(1)}px, ${(l - card.h / 2).toFixed(1)}px, ${d.toFixed(1)}px) rotateY(${(-s).toFixed(2)}deg)`;
                }
              }
            }
          }

          if (vis !== shown[i]) {
            shown[i] = vis;
            el.style.visibility = vis ? "visible" : "hidden";
            if (!vis) {
              el.style.transform = "none";
            }
          }

          if (vis) {
            const opStr = alpha.toFixed(3);
            if (opStr !== prevOpacity[i]) {
              prevOpacity[i] = opStr;
              el.style.opacity = opStr;
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("pointermove", onStagePointerMove);
      stage.removeEventListener("pointerleave", onPointerReset);
      document.removeEventListener("mouseleave", onPointerReset);
      window.removeEventListener("blur", onPointerReset);
      stage.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("pointerdown", onViewportDown);
      viewport.removeEventListener("pointermove", onViewportMove);
      viewport.removeEventListener("pointerup", onViewportUp);
      viewport.removeEventListener("pointercancel", onViewportUp);
      viewport.classList.remove("grab");
      hideChip();
    };
  }, [layout, paused, heroRef, stageRef]);

  return (
    <div
      ref={viewportRef}
      className="wall-viewport"
      data-wall-paused={paused}
      data-decor=""
      aria-hidden="true"
    >
      <div ref={wallRef} className="wall">
        <div className="wall-col" />
      </div>

      {layout.cards.map((card, i) => (
        <CylinderTile
          key={`${layout.metrics.W}-${card.index}`}
          card={card}
          width={layout.metrics.W}
          setEl={(el) => {
            cardElsRef.current[i] = el;
          }}
          onEnter={(e) => {
            if (paused || e.pointerType !== "mouse") return;
            hoverStateRef.current.idx = i;
            hoverStateRef.current.label = card.item.label;
            if (chipRef.current) {
              chipRef.current.textContent = card.item.label;
              chipRef.current.style.transform = `translate3d(${(e.clientX + 14).toFixed(0)}px, ${(e.clientY + 14).toFixed(0)}px, 0)`;
              chipRef.current.classList.add("on");
            }
          }}
          onLeave={() => {
            if (hoverStateRef.current.idx === i) {
              hoverStateRef.current.idx = -1;
              chipRef.current?.classList.remove("on");
            }
          }}
        />
      ))}

      <span ref={chipRef} data-decor="" aria-hidden="true" className="wall-chip" />
    </div>
  );
}

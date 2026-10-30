"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface ScrollTiltProps {
  children: React.ReactNode;
  className?: string;
  /** Initial 3D X-tilt in degrees when entering from bottom (inverts when exiting top). */
  tiltX?: number;
  /** Subtle 3D Y-tilt in degrees (e.g. negative for left column, positive for right column). */
  tiltY?: number;
  /** Vertical travel [onEnterBottom, onExitTop] in px. */
  yRange?: [number, number];
  /** Scale envelope [onEdge, atCenter]. Keep >= 0.94 so cards feel tactile without layout jump. */
  scaleEdge?: number;
}

function ScrollTiltActive({
  children,
  className,
  tiltX = 6.5,
  tiltY = 0,
  yRange = [34, -26],
  scaleEdge = 0.962,
}: ScrollTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "end 0.02"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    mass: 0.45,
  });

  const y = useTransform(smooth, [0, 0.34, 0.66, 1], [yRange[0], 0, 0, yRange[1]]);
  const rotateX = useTransform(smooth, [0, 0.34, 0.66, 1], [tiltX, 0, 0, -tiltX * 0.78]);
  const rotateY = useTransform(smooth, [0, 0.36, 0.64, 1], [tiltY, 0, 0, -tiltY * 0.7]);
  const scale = useTransform(smooth, [0, 0.32, 0.68, 1], [scaleEdge, 1, 1, Math.min(1, scaleEdge + 0.015)]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{
        transformPerspective: 1300,
        y,
        rotateX,
        rotateY,
        scale,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Bidirectional 3D perspective stage inspired by baked.design & handhold.io.
 * Articulates smoothly on BOTH top-to-bottom scroll and bottom-to-top reverse scroll,
 * locking flat and crisp in the central reading zone while keeping 100% text contrast.
 */
export function ScrollTilt(props: ScrollTiltProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={props.className}>{props.children}</div>;
  }
  return <ScrollTiltActive {...props} />;
}

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset [whenEnteringBottom, whenExitingTop] in px. */
  offsetY?: [number, number];
}

function ScrollParallaxActive({ children, className, offsetY = [28, -22] }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 145,
    damping: 28,
    mass: 0.45,
  });

  const y = useTransform(smooth, [0, 0.5, 1], [offsetY[0], 0, offsetY[1]]);

  return (
    <motion.div ref={ref} className={`relative ${className ?? ""}`} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

/** Pure GPU translate3d vertical parallax scrubber (safe around interactive 40px tap targets). */
export function ScrollParallax(props: ScrollParallaxProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={props.className}>{props.children}</div>;
  }
  return <ScrollParallaxActive {...props} />;
}

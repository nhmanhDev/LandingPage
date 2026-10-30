"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function RevealActive({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "end 0.04"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 165,
    damping: 28,
    mass: 0.42,
  });

  const enterOffset = 26 + Math.min(delay, 0.25) * 70;
  const exitOffset = -(18 + Math.min(delay, 0.25) * 45);
  const settleIn = Math.min(0.42, 0.26 + delay * 0.35);
  const settleOut = Math.max(0.58, 0.74 - delay * 0.2);

  const y = useTransform(smooth, [0, settleIn, settleOut, 1], [enterOffset, 0, 0, exitOffset]);

  return (
    <motion.div ref={ref} className={`relative ${className ?? ""}`} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

/**
 * Bidirectional scroll-scrubbed glide wrapper.
 * Glides smoothly into alignment when scrolling down AND reverses fluidly when scrolling back up,
 * while preserving 100% opacity and 1:1 scale so WCAG AA contrast, no-JS, and 40px tap targets stay intact.
 */
export function Reveal(props: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={props.className}>{props.children}</div>;
  }
  return <RevealActive {...props} />;
}

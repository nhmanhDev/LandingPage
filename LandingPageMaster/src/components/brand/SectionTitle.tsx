"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface SectionTitleProps {
  text: string;
  /** Optional second half shown in a softer tone, the two-tone headline used by HeyRetro. */
  tone?: string;
  className?: string;
}

function ScrollWord({
  word,
  soft,
  index,
  total,
  progress,
}: {
  word: string;
  soft: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const stagger = total > 1 ? (index / (total - 1)) * 0.12 : 0;
  const inEnd = Math.min(0.44, 0.24 + stagger);
  const outStart = Math.max(0.56, 0.76 - (0.12 - stagger) * 0.5);
  const y = useTransform(progress, [0, inEnd, outStart, 1], [20 + index * 1.6, 0, 0, -(14 + (total - index) * 1.1)]);

  return (
    <motion.span className={`inline-block ${soft ? "tone" : ""}`} style={{ y, willChange: "transform" }}>
      {word}
    </motion.span>
  );
}

/**
 * Heading whose words ripple smoothly into alignment on BOTH downward and upward scroll.
 * The text stays one ordinary sentence in the DOM, so it reads, copies and pastes as one line.
 */
export function SectionTitle({ text, tone, className = "t-title" }: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.05"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 175,
    damping: 28,
    mass: 0.4,
  });

  const words = [
    ...text.split(" ").map((word) => ({ word, soft: false })),
    ...(tone ? tone.split(" ").map((word) => ({ word, soft: true })) : []),
  ];

  return (
    <h2 ref={ref} className={`relative ${className}`}>
      {words.map(({ word, soft }, index) => (
        <Fragment key={`${word}-${index}`}>
          {reduced ? (
            <span className={soft ? "tone" : undefined}>{word}</span>
          ) : (
            <ScrollWord word={word} soft={soft} index={index} total={words.length} progress={smooth} />
          )}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}

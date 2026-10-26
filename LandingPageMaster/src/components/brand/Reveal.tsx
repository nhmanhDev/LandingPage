"use client";

import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Fade-and-rise on first scroll into view. MotionConfig in BrandPage turns the movement off for reduced-motion users. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

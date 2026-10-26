"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

interface SectionTitleProps {
  text: string;
  /** Optional second half shown in a softer tone, the two-tone headline used by HeyRetro. */
  tone?: string;
  className?: string;
}

/**
 * Heading whose words blur in one after another.
 * The text stays one ordinary sentence in the DOM, so it reads, copies and pastes as a sentence.
 */
export function SectionTitle({ text, tone, className = "t-title" }: SectionTitleProps) {
  const words = [
    ...text.split(" ").map((word) => ({ word, soft: false })),
    ...(tone ? tone.split(" ").map((word) => ({ word, soft: true })) : []),
  ];
  return (
    <h2 className={className}>
      {words.map(({ word, soft }, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className={`inline-block ${soft ? "tone" : ""}`}
            initial={{ opacity: 0, filter: "blur(8px)", y: 14 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}

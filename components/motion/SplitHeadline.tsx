"use client";

import { m, type Variants } from "motion/react";
import { duration, ease, stagger } from "@/lib/motion";

export interface SplitHeadlineProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  delay?: number;
  /** Exact substring of `text` rendered as styled emphasis (word-by-word). */
  accent?: string;
  /** Classes applied to each word inside `accent`. Defaults to italic. */
  accentClassName?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (customDelay: number) => ({
    transition: {
      delayChildren: customDelay,
      staggerChildren: stagger.fast,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: duration.base,
      ease: ease.out,
    },
  },
};

/** Split into words with running offsets, flagging those inside the accent span. */
function tokenize(text: string, accent?: string) {
  let accentStart = -1;
  let accentEnd = -1;
  if (accent) {
    accentStart = text.indexOf(accent);
    if (accentStart >= 0) accentEnd = accentStart + accent.length;
  }

  let cursor = 0;
  return text.split(" ").map((word) => {
    const start = cursor;
    cursor = start + word.length + 1;
    return {
      word,
      isAccent: accentStart >= 0 && start >= accentStart && start < accentEnd,
    };
  });
}

export function SplitHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0.1,
  accent,
  accentClassName = "italic",
}: SplitHeadlineProps) {
  const words = tokenize(text, accent);

  return (
    <Tag className={className} aria-label={text}>
      <m.span
        variants={containerVariants}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block"
        aria-hidden="true"
      >
        {words.map(({ word, isAccent }, index) => (
          <span
            key={`${word}-${index}`}
            className="-mt-[0.1em] mr-[0.28em] -mb-[0.18em] inline-block overflow-hidden pt-[0.1em] pb-[0.18em] align-top last:mr-0"
          >
            <m.span
              variants={wordVariants}
              className={`inline-block will-change-transform ${
                isAccent ? accentClassName : ""
              }`}
            >
              {word}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}

"use client";

import { m, type Variants } from "motion/react";
import { duration, ease, stagger } from "@/lib/motion";

export interface SplitHeadlineProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  delay?: number;
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
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: duration.base,
      ease: ease.out,
    },
  },
};

export function SplitHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0.1,
}: SplitHeadlineProps) {
  const words = text.split(" ");

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
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <m.span
              variants={wordVariants}
              className="inline-block will-change-transform"
            >
              {word}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}

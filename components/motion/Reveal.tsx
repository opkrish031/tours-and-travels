"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, viewportOnce } from "@/lib/motion";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "p" | "article" | "section";
}

export function Reveal({
  children,
  delay = 0,
  duration: customDuration,
  y = 20,
  className = "",
  as = "div",
}: RevealProps) {
  const motionProps = {
    initial: { opacity: 0, y, filter: "blur(4px)" },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: customDuration ?? duration.base,
        delay,
        ease: ease.out,
      },
    },
    viewport: viewportOnce,
    className,
  };

  switch (as) {
    case "span":
      return <m.span {...motionProps}>{children}</m.span>;
    case "p":
      return <m.p {...motionProps}>{children}</m.p>;
    case "article":
      return <m.article {...motionProps}>{children}</m.article>;
    case "section":
      return <m.section {...motionProps}>{children}</m.section>;
    default:
      return <m.div {...motionProps}>{children}</m.div>;
  }
}

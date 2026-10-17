"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion";

export const defaultStaggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (customStagger = stagger.base) => ({
    opacity: 1,
    transition: {
      staggerChildren: customStagger,
      delayChildren: 0.05,
    },
  }),
};

export const defaultStaggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.base,
      ease: ease.out,
    },
  },
};

export interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

export function Stagger({
  children,
  staggerDelay = stagger.base,
  className = "",
  as = "div",
}: StaggerProps) {
  const motionProps = {
    variants: defaultStaggerContainerVariants,
    custom: staggerDelay,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportOnce,
    className,
  };

  switch (as) {
    case "ul":
      return <m.ul {...motionProps}>{children}</m.ul>;
    case "ol":
      return <m.ol {...motionProps}>{children}</m.ol>;
    case "section":
      return <m.section {...motionProps}>{children}</m.section>;
    default:
      return <m.div {...motionProps}>{children}</m.div>;
  }
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: StaggerItemProps) {
  const motionProps = {
    variants: defaultStaggerItemVariants,
    className,
  };

  switch (as) {
    case "li":
      return <m.li {...motionProps}>{children}</m.li>;
    case "article":
      return <m.article {...motionProps}>{children}</m.article>;
    default:
      return <m.div {...motionProps}>{children}</m.div>;
  }
}

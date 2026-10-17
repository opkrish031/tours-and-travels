"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";

export interface ParallaxImageProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  wrapperClassName?: string;
}

export function ParallaxImage({
  children,
  offset = 24,
  className = "",
  wrapperClassName = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-offset, offset],
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      <m.div
        style={{ y }}
        className={`h-full w-full will-change-transform ${className}`}
      >
        {children}
      </m.div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

export interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatLocale?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
  formatLocale = "en-IN",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const motionVal = useMotionValue(shouldReduceMotion ? value : 0);
  const springVal = useSpring(motionVal, {
    stiffness: spring.soft.stiffness,
    damping: spring.soft.damping,
  });

  useEffect(() => {
    const formatter = new Intl.NumberFormat(formatLocale);
    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatter.format(value)}${suffix}`;
      }
      return;
    }

    motionVal.set(value);
  }, [value, shouldReduceMotion, prefix, suffix, formatLocale, motionVal]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const formatter = new Intl.NumberFormat(formatLocale);

    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatter.format(Math.round(latest))}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springVal, shouldReduceMotion, prefix, suffix, formatLocale]);

  // Initial SSR render
  const initialText = `${prefix}${new Intl.NumberFormat(formatLocale).format(value)}${suffix}`;

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {initialText}
    </span>
  );
}

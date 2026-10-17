"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useSpring, useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

export interface MagneticProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.25,
  radius = 12,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, spring.snappy);
  const y = useSpring(0, spring.snappy);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    const clampedX = Math.max(-radius, Math.min(radius, deltaX));
    const clampedY = Math.max(-radius, Math.min(radius, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={!shouldReduceMotion ? { x, y } : undefined}
      className={`inline-block ${className}`}
    >
      {children}
    </m.div>
  );
}

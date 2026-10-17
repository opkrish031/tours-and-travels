"use client";

import { type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.fast,
        ease: ease.out,
      }}
    >
      {children}
    </m.div>
  );
}

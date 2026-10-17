/**
 * Motion tokens — every animation in the project references these values.
 * No ad-hoc durations or easings elsewhere.
 */

export const ease = {
  /** Default entrance: fast start, gentle settle */
  out: [0.22, 1, 0.36, 1] as const,
  /** Symmetric entrance/exit */
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

export const spring = {
  /** Soft, natural feel — reveals, fades */
  soft: { type: "spring" as const, stiffness: 140, damping: 22 },
  /** Snappy, responsive — buttons, toggles */
  snappy: { type: "spring" as const, stiffness: 380, damping: 30 },
};

/** Stagger delay between children (ms converted to seconds) */
export const stagger = {
  fast: 0.06,
  base: 0.07,
  slow: 0.08,
} as const;

/** Default viewport trigger for whileInView */
export const viewportOnce = { once: true, margin: "-10%" } as const;

/** Reveal animation: fade + rise + blur */
export const revealVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.base, ease: ease.out },
  },
} as const;

/** Reduced motion fallback: opacity only, fast */
export const revealReducedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast },
  },
} as const;

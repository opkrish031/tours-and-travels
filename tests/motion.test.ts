import { describe, it, expect } from "vitest";
import { ease, duration, spring, stagger, revealVariants } from "@/lib/motion";

describe("Motion Tokens", () => {
  it("defines cubic-bezier ease curves", () => {
    expect(ease.out).toHaveLength(4);
    expect(ease.inOut).toHaveLength(4);
    expect(ease.out[0]).toBeGreaterThanOrEqual(0);
  });

  it("defines standard duration tiers", () => {
    expect(duration.fast).toBeLessThan(duration.base);
    expect(duration.base).toBeLessThan(duration.slow);
  });

  it("defines natural spring configs", () => {
    expect(spring.soft.type).toBe("spring");
    expect(spring.soft.stiffness).toBeGreaterThan(0);
    expect(spring.soft.damping).toBeGreaterThan(0);
    expect(spring.snappy.stiffness).toBeGreaterThan(spring.soft.stiffness);
  });

  it("defines stagger intervals", () => {
    expect(stagger.fast).toBeLessThanOrEqual(stagger.base);
    expect(stagger.base).toBeLessThanOrEqual(stagger.slow);
  });

  it("provides valid reveal animation variants", () => {
    expect(revealVariants.hidden).toHaveProperty("opacity", 0);
    expect(revealVariants.visible).toHaveProperty("opacity", 1);
    expect(revealVariants.visible).toHaveProperty("y", 0);
  });
});

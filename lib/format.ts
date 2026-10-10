// Presentation-only formatting helpers shared across pages.

/** "5.5" → "5 hr 30 min", "1.25" → "1 hr 15 min", "4" → "4 hr". */
export function durationLabel(hours: number): string {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  return minutes ? `${whole} hr ${minutes} min` : `${whole} hr`;
}

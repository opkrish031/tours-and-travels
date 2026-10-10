/**
 * PhotoPlaceholder — CSS-only stand-in until real client photos arrive.
 *
 * To swap for a real image later, replace the inner <div role="img"> with:
 *   <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
 */
import type { CSSProperties } from "react";

type Tone = "sand" | "umber" | "ink";

const toneStyles: Record<
  Tone,
  { bg: string; fg: string; line: string; vignette: string }
> = {
  sand: {
    bg: "bg-sand",
    fg: "text-stone",
    line: "rgba(22,19,15,0.05)",
    vignette: "inset 0 0 90px rgba(22,19,15,0.07)",
  },
  umber: {
    bg: "bg-umber",
    fg: "text-stone-light",
    line: "rgba(246,241,233,0.055)",
    vignette: "inset 0 0 90px rgba(0,0,0,0.25)",
  },
  ink: {
    bg: "bg-ink",
    fg: "text-stone-light",
    line: "rgba(246,241,233,0.05)",
    vignette: "inset 0 0 90px rgba(0,0,0,0.3)",
  },
};

export function PhotoPlaceholder({
  label,
  alt,
  caption,
  aspect = "3 / 2",
  tone = "sand",
  className = "",
}: {
  /** Short visible label, e.g. "Innova Crysta, front 3/4" */
  label: string;
  /** Descriptive alternative text announced to assistive tech */
  alt: string;
  caption?: string;
  aspect?: string;
  tone?: Tone;
  className?: string;
}) {
  const t = toneStyles[tone];

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className={`relative flex aspect-[var(--photo-aspect)] items-center justify-center overflow-hidden rounded-xs ${t.bg} ${t.fg}`}
        style={
          {
            "--photo-aspect": aspect,
            backgroundImage: `repeating-linear-gradient(45deg, ${t.line} 0 1px, transparent 1px 7px)`,
            boxShadow: t.vignette,
          } as CSSProperties
        }
      >
        <span className="eyebrow px-6 text-center">Photo · {label}</span>
        <span
          aria-hidden="true"
          className="absolute inset-3 rounded-xs border border-current opacity-[0.14]"
        />
      </div>
      {caption ? (
        <figcaption className="text-stone mt-2.5 text-xs tracking-wide">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

export type MediaAspect = "16 / 9" | "4 / 3" | "3 / 2" | "1 / 1" | "21 / 9";

export interface MediaFrameProps {
  label: string;
  alt: string;
  src?: string;
  aspect?: MediaAspect | string;
  caption?: string;
  className?: string;
  category?: string;
  priority?: boolean;
  children?: ReactNode;
  icon?: "car" | "route" | "fort" | "generic";
}

export function MediaFrame({
  label,
  alt,
  src,
  aspect = "16 / 9",
  caption,
  className = "",
  category,
  priority = false,
  children,
  icon = "car",
}: MediaFrameProps) {
  return (
    <figure className={`group relative w-full ${className}`}>
      <div
        role={src ? undefined : "img"}
        aria-label={src ? undefined : alt}
        className="relative flex w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#18181B] to-[#0D0D0F] p-[1px] ring-1 ring-white/10 transition-all duration-300 group-hover:ring-gold/30"
        style={{ aspectRatio: aspect } as CSSProperties}
      >
        {/* Subtle gold inner border glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold/5 via-transparent to-white/5 opacity-70"
        />

        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              priority={priority}
            />
            {category ? (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-block rounded-full border border-gold/40 bg-black/70 px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-gold backdrop-blur-xs shadow-sm">
                  {category}
                </span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center select-none">
            {/* Fine geometric watermark / SVG silhouette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04] flex items-center justify-center"
            >
              {icon === "car" ? (
                <svg
                  className="h-4/5 w-4/5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.2-.1.4-.1.6v4.5c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              ) : icon === "route" ? (
                <svg
                  className="h-4/5 w-4/5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                >
                  <circle cx="6" cy="19" r="3" />
                  <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                  <circle cx="18" cy="5" r="3" />
                </svg>
              ) : (
                <svg
                  className="h-4/5 w-4/5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              )}
            </div>

            {/* Subtle center gold rim badge */}
            <div className="relative z-10 flex flex-col items-center gap-2 max-w-[80%]">
              {category ? (
                <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide text-gold">
                  {category}
                </span>
              ) : null}
              <p className="text-sm font-medium tracking-tight text-white/90">
                {label}
              </p>
              <span className="text-[0.6875rem] text-white/40 tracking-wider">
                Photo placeholder
              </span>
            </div>

            {children}
          </div>
        )}

        {/* Ambient bottom gradient for text contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"
        />
      </div>

      {caption ? (
        <figcaption className="mt-2 text-xs text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

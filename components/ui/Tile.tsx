import type { ReactNode } from "react";

export interface TileProps {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  badge?: string;
  dark?: boolean;
  highlight?: boolean;
  className?: string;
}

export function Tile({
  children,
  title,
  subtitle,
  icon,
  badge,
  dark = false,
  highlight = false,
  className = "",
}: TileProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 md:p-8 transition-all duration-300 ${
        dark
          ? "bg-graphite text-text-dark border border-line-dark hover:border-gold/30 hover:bg-[#18181B]"
          : "bg-white text-text border border-line shadow-xs hover:border-black/15 hover:shadow-sm"
      } ${highlight ? (dark ? "ring-1 ring-gold/40" : "ring-1 ring-gold/50") : ""} ${className}`}
    >
      {/* Subtle ambient gold corner glow */}
      {highlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gold/10 blur-2xl"
        />
      )}

      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          {icon ? (
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                dark
                  ? "bg-white/8 text-gold border border-white/10"
                  : "bg-mist text-gold-deep border border-line"
              }`}
            >
              {icon}
            </div>
          ) : <div />}

          {badge ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium tracking-tight ${
                dark
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "bg-gold/15 text-gold-deep border border-gold/30"
              }`}
            >
              {badge}
            </span>
          ) : null}
        </div>

        {title ? (
          <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-snug mb-2">
            {title}
          </h3>
        ) : null}

        {subtitle ? (
          <p
            className={`text-sm md:text-[0.9375rem] leading-relaxed ${
              dark ? "text-text-dark-muted" : "text-text-muted"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {children ? <div className="mt-6 pt-2">{children}</div> : null}
    </div>
  );
}

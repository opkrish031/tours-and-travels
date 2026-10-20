import type { ReactNode } from "react";

export const thClass =
  "border-b border-line px-5 py-3.5 text-left align-bottom eyebrow text-text-muted whitespace-nowrap font-semibold";

export const tdClass =
  "border-b border-line/60 px-5 py-4 align-middle text-sm text-text";

export const thClassDark =
  "border-b border-white/10 px-5 py-3.5 text-left align-bottom eyebrow text-white/70 whitespace-nowrap font-semibold";

export const tdClassDark =
  "border-b border-white/10 px-5 py-4 align-middle text-sm text-white";

export function Table({
  caption,
  minWidth,
  children,
  className = "",
  dark = false,
}: {
  caption: string;
  minWidth?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        dark
          ? "border-line-dark bg-graphite shadow-sm"
          : "border-line bg-white shadow-xs"
      } ${className}`}
    >
      <div className="overflow-x-auto">
        <table
          className={`tabular w-full border-collapse text-sm [&_tbody_tr]:transition-colors ${
            dark
              ? "[&_tbody_tr:hover]:bg-white/[0.04]"
              : "[&_tbody_tr:hover]:bg-mist/60"
          }`}
          style={minWidth ? { minWidth } : undefined}
        >
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
    </div>
  );
}

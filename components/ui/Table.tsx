import type { ReactNode } from "react";

export const thClass =
  "border-b border-line px-5 py-3.5 text-left align-bottom eyebrow text-text-muted whitespace-nowrap font-medium";

export const tdClass =
  "border-b border-line/60 px-5 py-4 align-middle text-sm text-text";

export function Table({
  caption,
  minWidth,
  children,
  className = "",
}: {
  caption: string;
  minWidth?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white shadow-xs dark:border-line-dark dark:bg-graphite ${className}`}
    >
      <div className="overflow-x-auto">
        <table
          className="tabular w-full border-collapse text-sm [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-mist/60 dark:[&_tbody_tr:hover]:bg-white/[0.03]"
          style={minWidth ? { minWidth } : undefined}
        >
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
    </div>
  );
}

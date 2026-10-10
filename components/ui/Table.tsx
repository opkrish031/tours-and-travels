import type { ReactNode } from "react";

export const thClass =
  "border-b border-line-strong px-4 py-3 text-left align-bottom eyebrow text-stone whitespace-nowrap";

export const tdClass = "border-b border-line px-4 py-4 align-middle";

export function Table({
  caption,
  minWidth,
  children,
}: {
  caption: string;
  minWidth?: string;
  children: ReactNode;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table
        className="tabular w-full border-collapse text-sm"
        style={minWidth ? { minWidth } : undefined}
      >
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

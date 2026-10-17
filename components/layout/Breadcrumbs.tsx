import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-text-muted">
        <li>
          <Link href="/" className="hover:text-gold-deep transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="text-line-dark opacity-40">
                /
              </span>
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-gold-deep transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="text-text font-medium"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="text-stone flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <li>
          <Link href="/" className="hover:text-brass-deep transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-brass-deep transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ink">
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

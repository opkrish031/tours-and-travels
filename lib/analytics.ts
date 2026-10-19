export type AnalyticsEvent =
  | "call_click"
  | "whatsapp_click"
  | "form_submit"
  | "calculator_use"
  | "calculator_book_click"
  | "popular_route_click";

type EventParams = Record<string, string | number | undefined>;

/** Fire a GA4 event if gtag is loaded; silently no-ops otherwise. */
export function trackEvent(name: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", name, params ?? {});
  }
}

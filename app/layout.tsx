import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { site } from "@/data/site";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.domain),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.brandName}`,
  },
  description: HOME_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="focus:bg-ink focus:text-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyActionBar />
      </body>
    </html>
  );
}

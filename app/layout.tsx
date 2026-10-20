import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/data/site";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.domain),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.brandName}`,
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    siteName: site.brandName,
    locale: "en_IN",
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: site.domain,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${site.brandName} - Jodhpur Taxi Service & Outstation Cabs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0"
      >
        <MotionProvider>
          <SmoothScroll />
          <a
            href="#main"
            className="focus:text-text-dark sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:bg-black focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <StickyActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { canonicalUrl } from "@/lib/seo";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: canonicalUrl("/taxi-fare"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: canonicalUrl(`/${service.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const routePages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: canonicalUrl(`/${route.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: canonicalUrl(`/${vehicle.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/refund-policy", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: canonicalUrl(path),
    lastModified,
    changeFrequency: "yearly" as const,
    priority,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...routePages,
    ...vehiclePages,
    ...legalPages,
  ];
}

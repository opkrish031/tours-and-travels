import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteTemplate } from "@/components/templates/RouteTemplate";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { VehicleTemplate } from "@/components/templates/VehicleTemplate";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...services.map((service) => ({ slug: service.slug })),
    ...routes.map((route) => ({ slug: route.slug })),
    ...vehicles.map((vehicle) => ({ slug: vehicle.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);
  if (service) {
    return buildMetadata({
      title: service.seo.title,
      description: service.seo.description,
      path: `/${slug}`,
    });
  }

  const route = routes.find((item) => item.slug === slug);
  if (route) {
    return buildMetadata({
      title: route.seo.title,
      description: route.seo.description,
      path: `/${slug}`,
    });
  }

  const vehicle = vehicles.find((item) => item.slug === slug);
  if (vehicle) {
    return buildMetadata({
      title: vehicle.seo.title,
      description: vehicle.seo.description,
      path: `/${slug}`,
    });
  }

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);
  if (service) return <ServiceTemplate service={service} />;

  const route = routes.find((item) => item.slug === slug);
  if (route) return <RouteTemplate route={route} />;

  const vehicle = vehicles.find((item) => item.slug === slug);
  if (vehicle) return <VehicleTemplate vehicle={vehicle} />;

  notFound();
}

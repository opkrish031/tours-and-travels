import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; items: NavLink[] };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Fares", href: "/taxi-fare" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceLinks: NavLink[] = services.map((service) => ({
  label: service.name,
  href: `/${service.slug}`,
}));

export const vehicleLinks: NavLink[] = vehicles.map((vehicle) => ({
  label: vehicle.name,
  href: `/${vehicle.slug}`,
}));

export const routeLinks: NavLink[] = routes.map((route) => ({
  label: `${route.from} to ${route.to}`,
  href: `/${route.slug}`,
}));

export const navGroups: NavGroup[] = [
  { label: "Services", items: serviceLinks },
  { label: "Fleet", items: vehicleLinks },
  { label: "Routes", items: routeLinks },
];

export const footerNav: NavGroup[] = [
  { label: "Company", items: primaryNav },
  { label: "Services", items: serviceLinks },
  { label: "Routes", items: routeLinks },
  { label: "Fleet", items: vehicleLinks },
];

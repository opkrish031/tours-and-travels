export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; items: NavLink[] };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Fares", href: "/taxi-fare" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const conciseServiceLinks: NavLink[] = [
  { label: "Jodhpur Local Sightseeing", href: "/local-taxi-jodhpur" },
  { label: "Airport & Junction Pickup", href: "/airport-taxi-jodhpur" },
  { label: "Outstation Cabs (One-Way & Return)", href: "/outstation-taxi-jodhpur" },
  { label: "Bishnoi Village Safari", href: "/bishnoi-village-safari-jodhpur" },
  { label: "Wedding & Luxury Car Rental", href: "/wedding-car-rental-jodhpur" },
];

export const conciseRouteLinks: NavLink[] = [
  { label: "Jodhpur to Jaisalmer (Dunes)", href: "/jodhpur-to-jaisalmer-taxi" },
  { label: "Jodhpur to Udaipur (Ranakpur)", href: "/jodhpur-to-udaipur-taxi" },
  { label: "Jodhpur to Osian Desert Camp", href: "/jodhpur-to-osian-taxi" },
  { label: "Jodhpur to Jaipur (Expressway)", href: "/jodhpur-to-jaipur-taxi" },
  { label: "Jodhpur to Mount Abu (Hills)", href: "/jodhpur-to-mount-abu-taxi" },
];

export const conciseVehicleLinks: NavLink[] = [
  { label: "AC Sedan (Dzire / Etios) · ₹11/km", href: "/sedan-taxi-jodhpur" },
  { label: "Maruti Ertiga (Family MUV) · ₹13/km", href: "/suv-taxi-jodhpur" },
  { label: "Toyota Innova Crysta · ₹16/km", href: "/innova-crysta-jodhpur" },
  { label: "Tempo Traveller (12–26 Seater) · ₹24/km", href: "/tempo-traveller-jodhpur" },
  { label: "Force Urbania (Luxury Van) · ₹30/km", href: "/force-urbania-jodhpur" },
  { label: "All Taxi Rates & Calculator ➔", href: "/taxi-fare" },
];

export const navGroups: NavGroup[] = [
  { label: "Services", items: conciseServiceLinks },
  { label: "Routes", items: conciseRouteLinks },
  { label: "Fleet", items: conciseVehicleLinks },
];

export const footerNav: NavGroup[] = [
  { label: "Company", items: primaryNav },
  { label: "Services", items: conciseServiceLinks },
  { label: "Routes", items: conciseRouteLinks },
  { label: "Fleet", items: conciseVehicleLinks },
];

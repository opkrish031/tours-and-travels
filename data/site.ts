export const site = {
  brandName: "Marwad Cabs",
  tagline:
    "Jodhpur Local Sightseeing, Outstation Cabs & Airport Taxi — Fixed Per-KM Rates",
  legalName: "Marwad Cabs — Tour and Travels",
  domain: "https://marwadcabs.com",
  phone: "+918955033005",
  phoneDisplay: "+91 89550 33005",
  whatsapp: "918955033005",
  email: "booking@marwadcabs.com",
  address: {
    street: "Jodhpur",
    locality: "Jodhpur",
    region: "Rajasthan",
    postalCode: "342001",
    country: "IN",
  },
  geo: { lat: 26.2735, lng: 73.0315 },
  hours: "24x7",
  socials: {
    facebook: "",
    instagram: "https://www.instagram.com/marwarcabs/",
    youtube: "",
    googleBusiness: "",
  },
  /** Optional GST / registration line — leave empty until verified details are available. */
  gstNumber: "",
  cancellationWindowHours: 6,
  description:
    "Direct cab booking in Jodhpur with Marwad Cabs. Clean AC Dzire, Ertiga, Innova Crysta & Tempo Travellers with local Marwari drivers. Upfront per-km rates for Jodhpur sightseeing, Jaisalmer, Udaipur, Ranakpur, Mount Abu & Osian.",
  trustStats: [
    { value: "₹11/km", label: "AC sedan starting rate" },
    { value: "300 km", label: "Daily minimum, outstation" },
    { value: "₹300", label: "Driver allowance per day" },
    { value: "Local Drivers", label: "Jodhpur-based, Marwar routes" },
  ],
} as const;

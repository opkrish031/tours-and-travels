// DUMMY DATA: replace with client data before launch
export type Vehicle = {
  slug: string;
  name: string;
  category: "sedan" | "suv" | "mpv" | "tempo";
  models: string[];
  seats: string;
  luggage: string;
  perKm: number;
  dailyKmLimit: number;
  comfort: string;
  idealFor: string[];
  image: string;
  imageAlt: string;
  popular?: boolean;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "sedan-taxi-jodhpur",
    name: "Sedan",
    category: "sedan",
    models: ["Maruti Dzire", "Toyota Etios"],
    seats: "4",
    luggage: "2 large bags",
    perKm: 11,
    dailyKmLimit: 250,
    comfort:
      "A quiet four-seat sedan, usually a Dzire or Etios or similar, with a boot that holds two large bags.",
    idealFor: ["Airport transfers", "City sightseeing", "Couples on a trip"],
    image: "/images/vehicles/sedan-taxi-jodhpur.jpg",
    imageAlt: "Sedan taxi waiting at a hotel entrance in Jodhpur",
    seo: {
      title: "Sedan Taxi in Jodhpur | Marwar Cabs",
      description:
        "Book a sedan taxi in Jodhpur for city trips, airport travel, and outstation runs. Dzire or Etios with trained drivers. Ask for a fare estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "Which car will I get in the sedan class?",
        a: "You book the sedan class and we assign a Maruti Dzire or Toyota Etios, or a similar car in the same class. The exact model depends on what is free on your travel date.",
      },
      {
        q: "How much luggage fits in a sedan?",
        a: "The boot holds two large bags without stacking, plus a couple of soft bags. Tell us your luggage count when you book and we will suggest the class that suits.",
      },
      {
        q: "Is a sedan enough for Jodhpur to Jaipur?",
        a: "Two people with two bags travel comfortably on that highway. For three passengers or heavy luggage, the SUV or the Innova Crysta gives everyone more room for the same kind of day.",
      },
    ],
  },
  {
    slug: "suv-taxi-jodhpur",
    name: "SUV",
    category: "suv",
    models: ["Maruti Ertiga", "Mahindra Marazzo"],
    seats: "6",
    luggage: "3 large bags",
    perKm: 14,
    dailyKmLimit: 250,
    comfort:
      "A six-seat SUV with a higher seat and steady ride, and room for three large bags when all seats are not full.",
    idealFor: ["Family holidays", "Hill road trips", "Three or four travellers"],
    image: "/images/vehicles/suv-taxi-jodhpur.jpg",
    imageAlt: "SUV taxi parked near a heritage building in Jodhpur",
    seo: {
      title: "SUV Taxi in Jodhpur | Marwar Cabs",
      description:
        "Book an SUV taxi in Jodhpur for family trips and highway drives. Ertiga or Marazzo, six seats, room for three large bags. Ask for a fare estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "How many people can travel in the SUV?",
        a: "Six passengers sit across two rows with headroom to spare. With all six seats taken, keep luggage to three large bags so everyone travels without crowding the aisle.",
      },
      {
        q: "Does the SUV handle hill roads well?",
        a: "The higher seating and steady suspension suit the ghat sections toward Mount Abu and the curves near Ranakpur. The driver keeps a slow pace on the climbs and stops when you ask.",
      },
      {
        q: "Can I book the SUV for a one-way trip?",
        a: "Yes. The SUV runs on one-way, round-trip, and outstation bookings alike. Share your route, dates, and passenger count and we will send the estimate for that class.",
      },
    ],
  },
  {
    slug: "innova-crysta-jodhpur",
    name: "Innova Crysta",
    category: "mpv",
    models: ["Toyota Innova Crysta"],
    seats: "6",
    luggage: "4 large bags",
    perKm: 18,
    dailyKmLimit: 300,
    popular: true,
    comfort:
      "A spacious six-seater that stays quiet on long highway stretches, with room for four large bags in the back.",
    idealFor: ["Outstation families", "Long highway runs", "Airport pickups"],
    image: "/images/vehicles/innova-crysta-jodhpur.jpg",
    imageAlt: "Innova Crysta taxi parked outside a hotel in Jodhpur",
    seo: {
      title: "Innova Crysta Taxi in Jodhpur | Marwar Cabs",
      description:
        "Book an Innova Crysta taxi in Jodhpur for outstation trips with family. Six seats, four large bags, a quiet cabin. Get a fare estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "Why do travellers pick the Innova Crysta?",
        a: "It carries six people with four large bags and holds a steady pace on the highway without straining. Families find it the most balanced car for Rajasthan distances.",
      },
      {
        q: "Do you provide a child seat in the Crysta?",
        a: "Child seats are not fitted as standard in any of our cars. Tell us the child's age when you book and we will confirm what can be arranged for your dates.",
      },
      {
        q: "Can the Crysta run a multi-day trip?",
        a: "Yes. Daily kilometre limits and overnight halts are written into your estimate, so plan the days and stops first and we will price the whole journey before you confirm.",
      },
    ],
  },
  {
    slug: "tempo-traveller-jodhpur",
    name: "Tempo Traveller",
    category: "tempo",
    models: ["12 seater", "17 seater"],
    seats: "12",
    luggage: "Roof carrier available",
    perKm: 24,
    dailyKmLimit: 300,
    comfort:
      "A twelve-seat traveller with push-back seats and storage inside, plus a roof carrier for larger groups.",
    idealFor: ["Group tours", "Family weddings", "Temple circuits"],
    image: "/images/vehicles/tempo-traveller-jodhpur.jpg",
    imageAlt: "Tempo Traveller minibus ready for a group trip in Jodhpur",
    seo: {
      title: "Tempo Traveller on Rent in Jodhpur | Marwar Cabs",
      description:
        "Hire a tempo traveller in Jodhpur for group trips and temple circuits. Twelve or seventeen seats with a roof carrier. Check availability on WhatsApp.",
    },
    faqs: [
      {
        q: "How many seats does the traveller have?",
        a: "The standard vehicle is a twelve-seater, and a seventeen-seater is available for larger groups. Both keep the same comfort level, with bags carried inside or on the roof.",
      },
      {
        q: "Is a roof carrier included?",
        a: "The roof carrier is available on request and is fitted before pickup. Tell us the luggage size when you book so we assign the right vehicle and allow time for loading.",
      },
      {
        q: "Which trips suit the tempo traveller?",
        a: "Group tours, family weddings, and temple circuits such as Osian or Ranakpur. Short city days and long outstation runs both work, with the same driver through the whole trip.",
      },
    ],
  },
];

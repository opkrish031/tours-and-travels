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
  localPackages?: {
    fourHours: string;
    eightHours: string;
    airportDrop: string;
  };
  driverBhatta?: string;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "sedan-taxi-jodhpur",
    name: "Swift Dzire / Toyota Etios",
    category: "sedan",
    models: ["Maruti Suzuki Dzire", "Toyota Etios"],
    seats: "4 Passengers + 1 Driver",
    luggage: "2 Medium Suitcases + 1 Duffel (Boot space)",
    perKm: 11,
    dailyKmLimit: 250,
    comfort:
      "Best for couples or 3 adults. Toyota Etios has a bigger 592-liter boot if you are carrying 3 large suitcases; tell us on WhatsApp if you specifically need an Etios over a Dzire.",
    idealFor: [
      "Couples & Solo Travelers",
      "Airport & Junction Drops",
      "Budget Outstation Runs",
    ],
    image: "/images/vehicles/sedan-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs white AC sedan waiting at Jodhpur Junction Platform 1 exit",
    localPackages: {
      fourHours: "₹1,200 (4 Hr / 40 Km)",
      eightHours: "₹1,800 (8 Hr / 80 Km)",
      airportDrop: "₹450 – ₹600 (Fixed)",
    },
    driverBhatta: "₹300/day",
    seo: {
      title: "Sedan Taxi in Jodhpur | Marwad Cabs",
      description:
        "Book an AC Dzire or Etios sedan taxi in Jodhpur with Marwad Cabs. Fixed per-km outstation rates from Rs 11/km and local 8hr/80km packages from Rs 1,800.",
    },
    faqs: [
      {
        q: "Which sedan will be sent for my booking?",
        a: "We assign either a clean Maruti Suzuki Dzire or Toyota Etios. If you are carrying 3 large trolley bags, tell us in advance so we specifically dispatch an Etios with its larger 592-litre boot.",
      },
      {
        q: "What is included in the ₹11/km outstation rate?",
        a: "The ₹11/km rate covers the vehicle, driver, and diesel for a minimum of 250 km/day. Driver bhatta is ₹300/day. Tolls, parking, and state border taxes are paid directly against actual receipts.",
      },
      {
        q: "Can the sedan pick up from Jodhpur Railway Station?",
        a: "Yes. Our driver reaches ahead of your train, tracking the PNR, and parks at either Platform 1 (main entrance) or Platform 2 (Subhash Nagar side), sending the vehicle number and live location to your WhatsApp.",
      },
    ],
  },
  {
    slug: "suv-taxi-jodhpur",
    name: "Maruti Suzuki Ertiga",
    category: "suv",
    models: ["Maruti Suzuki Ertiga"],
    seats: "5–6 Passengers + 1 Driver",
    luggage: "3–4 Suitcases (Roof carrier included)",
    perKm: 13,
    dailyKmLimit: 250,
    comfort:
      "Good budget choice for a family of 4–5 with kids. If 6 adults are travelling with heavy bags, we fold the last row or load bags on the roof carrier with a waterproof tarpaulin cover.",
    idealFor: [
      "Family Trips with Kids",
      "Jodhpur Sightseeing",
      "Jaisalmer & Osian Highway Runs",
    ],
    image: "/images/vehicles/suv-taxi-jodhpur.jpg",
    imageAlt: "Maruti Suzuki Ertiga cab parked outside Umaid Bhawan Palace Jodhpur",
    localPackages: {
      fourHours: "₹1,600 (4 Hr / 40 Km)",
      eightHours: "₹2,400 (8 Hr / 80 Km)",
      airportDrop: "₹650 – ₹800 (Fixed)",
    },
    driverBhatta: "₹300/day",
    seo: {
      title: "Ertiga MUV Taxi in Jodhpur | Marwad Cabs",
      description:
        "Book an AC Ertiga taxi in Jodhpur with Marwad Cabs. Spacious 6-seater MUV with roof carrier for family trips. Fixed rates from Rs 13/km. Reserve on WhatsApp.",
    },
    faqs: [
      {
        q: "How many passengers fit comfortably in the Ertiga?",
        a: "The Ertiga seats up to 6 passengers plus driver. For long highway trips like Jodhpur to Jaisalmer or Udaipur, 4 to 5 passengers travel with maximum legroom.",
      },
      {
        q: "Is there a roof carrier for luggage on the Ertiga?",
        a: "Yes. All our outstation Ertigas come fitted with a sturdy roof carrier and waterproof tarpaulin so luggage stays protected from rain and desert dust.",
      },
      {
        q: "What is the daily billing for an outstation Ertiga?",
        a: "Outstation round trips are billed at ₹13/km with a standard 250 km/day minimum floor plus ₹300/day driver allowance. Highway FASTag tolls and monument parking are extra at actual cost.",
      },
    ],
  },
  {
    slug: "toyota-innova-jodhpur",
    name: "Toyota Innova",
    category: "suv",
    models: ["Toyota Innova (Standard AC)"],
    seats: "6–7 Passengers + 1 Driver",
    luggage: "5 Large Suitcases (Heavy-duty roof carrier)",
    perKm: 15,
    dailyKmLimit: 250,
    comfort:
      "Proven highway workhorse for long Rajasthan circuits (Jodhpur–Jaisalmer–Bikaner–Jaipur). Strong AC vents in all 3 rows even in 45°C summer heat.",
    idealFor: [
      "Long Rajasthan Circuits",
      "Large Family Groups",
      "Rough Desert Roads & Summer Heat",
    ],
    image: "/images/vehicles/toyota-innova-jodhpur.jpg",
    imageAlt: "Toyota Innova taxi waiting near Mehrangarh Fort parking lot",
    localPackages: {
      fourHours: "₹1,900 (4 Hr / 40 Km)",
      eightHours: "₹2,800 (8 Hr / 80 Km)",
      airportDrop: "₹800 – ₹1,000 (Fixed)",
    },
    driverBhatta: "₹300/day",
    seo: {
      title: "Toyota Innova Taxi in Jodhpur | Marwad Cabs",
      description:
        "Hire a Toyota Innova taxi in Jodhpur with Marwad Cabs. Reliable 7-seater SUV with roof carrier for Rajasthan highways. Fixed rates from Rs 15/km. WhatsApp us.",
    },
    faqs: [
      {
        q: "How does the Toyota Innova perform on long Rajasthan routes?",
        a: "The Innova is famous for highway stability, high road clearance, and dual AC blowers that keep all 3 rows chilled even during 45°C summer drives through Pokhran and Bikaner.",
      },
      {
        q: "How much luggage can an Innova carry?",
        a: "With the full-length roof luggage carrier, an Innova easily carries 5 to 6 large suitcases tied down with weather-resistant tarpaulin covers.",
      },
      {
        q: "Can we hire an Innova for a multi-day Rajasthan tour?",
        a: "Yes. Multi-day tours from Jodhpur to Jaisalmer, Udaipur, Mount Abu, and Jaipur are billed at ₹15/km with a 250 km/day minimum average plus ₹300/day driver bhatta.",
      },
    ],
  },
  {
    slug: "innova-crysta-jodhpur",
    name: "Toyota Innova Crysta",
    category: "mpv",
    models: ["Toyota Innova Crysta (6+1 Captain / 7+1 Bench)"],
    seats: "6+1 (Captain Seats) or 7+1 (Bench)",
    luggage: "5–6 Large Suitcases (Roof carrier + cover)",
    perKm: 16,
    dailyKmLimit: 250,
    popular: true,
    comfort:
      "Our most booked family SUV for Jodhpur to Udaipur (via Ranakpur & Kumbhalgarh ghat roads) and Jaisalmer Sam Sand Dunes. Captain seats available on request.",
    idealFor: [
      "Premium Family Touring",
      "Udaipur via Ranakpur Ghat Road",
      "Sam Sand Dunes Luxury Transfers",
    ],
    image: "/images/vehicles/innova-crysta-jodhpur.jpg",
    imageAlt: "Toyota Innova Crysta parked at Ratanada Civil Airport Road Jodhpur",
    localPackages: {
      fourHours: "₹2,200 (4 Hr / 40 Km)",
      eightHours: "₹3,200 (8 Hr / 80 Km)",
      airportDrop: "₹900 – ₹1,200 (Fixed)",
    },
    driverBhatta: "₹300/day",
    seo: {
      title: "Innova Crysta Taxi in Jodhpur | Marwad Cabs",
      description:
        "Book a premium Innova Crysta taxi in Jodhpur with Marwad Cabs. Captain seats, roof carrier, and experienced drivers. Outstation from Rs 16/km. Call or WhatsApp.",
    },
    faqs: [
      {
        q: "Can I choose captain seats or bench seats in the Innova Crysta?",
        a: "Yes. We offer both 6+1 (middle row luxury captain recliner seats) and 7+1 (bench seating) configurations. Specify your preference when messaging on WhatsApp.",
      },
      {
        q: "Is the Innova Crysta suitable for the Ranakpur and Kumbhalgarh ghats?",
        a: "It is the gold standard for that stretch. Its powerful engine and balanced suspension handle the winding hairpins and steep climbs with zero engine strain and no AC drop.",
      },
      {
        q: "What is the per-km rate and driver allowance for Crysta?",
        a: "Outstation rate is ₹16/km on a 250 km/day minimum calculation. Driver allowance (bhatta) is ₹300/day covering driver food and accommodation.",
      },
    ],
  },
  {
    slug: "tempo-traveller-jodhpur",
    name: "Force Tempo Traveller",
    category: "tempo",
    models: ["12 Seater", "17 Seater", "20 Seater", "26 Seater"],
    seats: "12, 17, 20, or 26 Pushback Seats + Driver & Helper",
    luggage: "Dedicated rear boot + full roof rack",
    perKm: 24,
    dailyKmLimit: 250,
    comfort:
      "Equipped with Maharaja 1x1 or 2x1 pushback seats, individual AC vents, charging sockets at every row, icebox, and curtain blinds for wedding guests and group tours.",
    idealFor: [
      "Destination Wedding Guests",
      "Large Family Group Vacations",
      "Corporate Offsites & Pilgrimages",
    ],
    image: "/images/vehicles/tempo-traveller-jodhpur.jpg",
    imageAlt: "Force Tempo Traveller tourist coach parked at Mandore Gardens Jodhpur",
    localPackages: {
      fourHours: "₹3,800 (4 Hr / 40 Km)",
      eightHours: "₹5,500 (8 Hr / 80 Km)",
      airportDrop: "₹1,800 – ₹2,500 (Fixed)",
    },
    driverBhatta: "₹500/day",
    seo: {
      title: "Tempo Traveller Rent Jodhpur | Marwad Cabs",
      description:
        "Rent a Force Tempo Traveller in Jodhpur with Marwad Cabs. 12 to 26 seater pushback AC minibuses for weddings & family tours. Fares from Rs 24/km.",
    },
    faqs: [
      {
        q: "Which seating capacities are available in your Tempo Travellers?",
        a: "We maintain 12-seater Maharaja (1x1 recliner seats), 17-seater, 20-seater, and 26-seater AC configurations. All models feature separate rear luggage space and top roof racks.",
      },
      {
        q: "Do your tempo travellers have individual AC vents and charging ports?",
        a: "Yes. Every passenger seat has dedicated cooling vents, individual USB charging points, reclining backrests, and blackout curtains.",
      },
      {
        q: "Can a tempo traveller navigate into Jodhpur old city?",
        a: "No 4-wheel commercial vehicle larger than an auto-rickshaw can enter Clock Tower or Navchokiya lanes. We drop groups at Sojati Gate or Jalori Gate and coordinate local autos for haveli access.",
      },
    ],
  },
  {
    slug: "force-urbania-jodhpur",
    name: "Force Urbania Luxury Van",
    category: "tempo",
    models: ["Force Urbania 10-Seater", "Force Urbania 13-Seater", "Force Urbania 17-Seater"],
    seats: "10, 13, or 17 Luxury Recliner Seats + Driver",
    luggage: "Executive Rear Boot + Overhead Storage",
    perKm: 30,
    dailyKmLimit: 250,
    comfort:
      "Next-generation luxury passenger van featuring individual aircraft-style reclining seats, panoramic windows, independent air suspension, sealed dust-proof cabin, and individual USB charging ports at every row.",
    idealFor: [
      "Royal Palace Weddings (Umaid Bhawan, Ajit Bhawan, Indana)",
      "VIP & Corporate Executive Delegations",
      "Luxury Family Circuits (Jodhpur, Jaisalmer, Udaipur)",
    ],
    image: "/images/vehicles/force-urbania-jodhpur.jpg",
    imageAlt: "White Force Urbania luxury van parked in front of Umaid Bhawan Palace in Jodhpur",
    localPackages: {
      fourHours: "₹3,500 (4 Hr / 40 Km)",
      eightHours: "₹5,500 (8 Hr / 80 Km)",
      airportDrop: "₹2,000 – ₹2,800 (Fixed)",
    },
    driverBhatta: "₹500/day",
    seo: {
      title: "Force Urbania Rental in Jodhpur | ₹30/km | Marwad Cabs",
      description:
        "Rent Force Urbania luxury van in Jodhpur at ₹30/km with Marwad Cabs. 10 to 17 seater premium luxury travel with reclining seats for weddings & VIP tours.",
    },
    faqs: [
      {
        q: "What is the per-km billing for Force Urbania?",
        a: "Force Urbania outstation billing is ₹30/km with a 250 km/day minimum floor plus ₹500/day driver allowance (bhatta). FASTag highway tolls and parking are charged at actuals.",
      },
      {
        q: "Which seating capacities are available for Force Urbania in Jodhpur?",
        a: "We offer 10-seater, 13-seater, and 17-seater configurations, all equipped with pushback reclining seats, separate luggage compartment, and powerful rooftop AC.",
      },
      {
        q: "Is the Force Urbania suitable for wedding guest convoys?",
        a: "Yes. It is our most requested luxury group vehicle for palace weddings at Umaid Bhawan, Ajit Bhawan, Indana Palace, and Welcomhotel Jodhpur.",
      },
    ],
  },
  {
    slug: "luxury-cab-jodhpur",
    name: "Toyota Fortuner (Luxury SUV)",
    category: "suv",
    models: ["Toyota Fortuner 4x4 Sigma"],
    seats: "6–7 Passengers + 1 Driver",
    luggage: "Executive luggage capacity",
    perKm: 35,
    dailyKmLimit: 250,
    comfort:
      "Booked heavily during October–March wedding and NRI season in Jodhpur (Umaid Bhawan, Ajit Bhawan, Indana Palace events). Advance booking required.",
    idealFor: [
      "Umaid Bhawan & Palace Weddings",
      "VIP & Corporate Executives",
      "Luxury High-Speed Highway Travel",
    ],
    image: "/images/vehicles/luxury-cab-jodhpur.jpg",
    imageAlt: "Toyota Fortuner luxury SUV parked at heritage palace courtyard in Jodhpur",
    localPackages: {
      fourHours: "₹5,000 (4 Hr / 40 Km)",
      eightHours: "₹8,500 (8 Hr / 80 Km)",
      airportDrop: "₹2,500 – ₹3,500 (Fixed)",
    },
    driverBhatta: "₹500/day",
    seo: {
      title: "Luxury Fortuner Rental Jodhpur | Marwad Cabs",
      description:
        "Hire Toyota Fortuner luxury 4x4 in Jodhpur for palace weddings, VIP transfers and royal events. Premium chauffeurs. Reserve on WhatsApp.",
    },
    faqs: [
      {
        q: "How far in advance should I book a Fortuner?",
        a: "During the high wedding season (October to March), we recommend locking these vehicles at least 2 to 3 weeks ahead with a small advance.",
      },
      {
        q: "Are these vehicles suited for palace wedding entries in Jodhpur?",
        a: "Yes. They are commonly booked for bridal entries, VIP guest pickup from Jodhpur Airport (JDH), and convoy duty for celebrations at Umaid Bhawan, Ajit Bhawan, and Indana Palace.",
      },
      {
        q: "What is the per-km billing for Toyota Fortuner?",
        a: "Toyota Fortuner 4x4 outstation runs start at ₹35/km with a 250 km/day minimum floor plus ₹500/day driver allowance.",
      },
    ],
  },
];

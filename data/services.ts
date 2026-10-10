// DUMMY DATA: replace with client data before launch
export type Service = {
  slug: string;
  name: string;
  summary: string;
  features: string[];
  packages?: { label: string; hours?: number; km?: number }[];
  applicableVehicles: string[];
  relatedRoutes: string[];
  body: string[];
  image: string;
  imageAlt: string;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "local-taxi-jodhpur",
    name: "Local Taxi in Jodhpur",
    summary:
      "Hire a car by the hour for sightseeing inside Jodhpur. The driver waits at each stop and follows the plan you set for the day.",
    features: [
      "Mehrangarh Fort and its rampart views over the city",
      "Umaid Bhawan Palace from the outside or the museum inside",
      "Jaswant Thada marble cenotaph beside the fort road",
      "Mandore Gardens and the old royal cenotaphs",
      "Clock Tower and Sardar Market for spice, cloth, and silver",
      "Driver waits at every stop, the itinerary stays yours",
    ],
    packages: [
      { label: "8 hours / 80 km", hours: 8, km: 80 },
      { label: "12 hours / 120 km", hours: 12, km: 120 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-ranakpur-taxi"],
    body: [
      "A local booking reserves the car for a block of hours rather than a fixed list of stops. Tell us where you want to begin, usually your hotel, and the places you care about: Mehrangarh Fort first for the morning light, Jaswant Thada next because it is close, then the old city lanes around Clock Tower. The driver waits while you look around and moves on when you are ready. Package limits of eight or twelve hours cover a full sightseeing day, with meals and breaks inside the clock.",
      "This suits first-time visitors who want the city in one day, families with elders who prefer short hops between sights, and photographers chasing the fort at different hours. Carry water, a scarf for the sun, and cash for entry tickets at the monuments. Tell us the number of people and any mobility needs when you book, so we send a car with enough room. The itinerary stays flexible: if you want longer at Mandore Gardens and less at the palace, the day adjusts without a fuss.",
    ],
    image: "/images/services/local-taxi-jodhpur.jpg",
    imageAlt: "Local taxi waiting near Mehrangarh Fort in Jodhpur",
    seo: {
      title: "Local Taxi in Jodhpur | Marwar Cabs",
      description:
        "Hire a local taxi in Jodhpur to see Mehrangarh Fort, Umaid Bhawan Palace, and the old city. Hourly packages with a waiting driver. Ask for timings on WhatsApp.",
    },
    faqs: [
      {
        q: "How does the eight-hour package work?",
        a: "The package covers eight hours and eighty kilometres of sightseeing, starting when the car reaches you, with time for meals and waiting at each monument. Message us your list and we suggest the package that fits.",
      },
      {
        q: "Can we change the sightseeing order on the day?",
        a: "Yes. The list in your booking is a starting point; you can swap Mandore Gardens for the palace or add a market stop. The driver follows your call at each turn.",
      },
      {
        q: "Do entry tickets come with the taxi?",
        a: "Monument tickets are yours to buy, at the gate or online. The driver can suggest a quieter hour for Mehrangarh Fort and wait while you go inside and walk the ramparts.",
      },
    ],
  },
  {
    slug: "airport-taxi-jodhpur",
    name: "Airport Taxi in Jodhpur",
    summary:
      "Pickup arranged at Jodhpur Airport (JDH) and the railway station, with a drop at your hotel or address in the city.",
    features: [
      "Pickup arranged at the Jodhpur Airport (JDH) terminal",
      "Railway station arrivals covered at the car stand",
      "Sedan, SUV, or Innova Crysta matched to your luggage",
      "Direct drop at your hotel or address",
      "Share flight or train details when you book",
      "Luggage space checked before the car is assigned",
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "innova-crysta-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaipur-taxi",
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-udaipur-taxi",
    ],
    body: [
      "Airport and station pickups start with your arrival details. Send the flight or train number, the date, and where you are being dropped in the city, and we assign a car for that slot. The driver reaches the terminal in time to meet you at the designated pickup point, and you settle the luggage and leave. Railway arrivals work the same way at the station car stand. If your timing shifts on the day, message us and we adjust the pickup as the schedule allows.",
      "This suits travellers landing late, families with luggage, and anyone who would rather not search for a car after a long journey. Jodhpur airport is small and the exit is quick, so the wait is short once the car is in place. Keep your hotel address written down; old-city lanes are easier to navigate with a landmark than with a map pin. For railway arrivals, share the coach number if you know it. Larger groups should book a sedan or SUV in advance so the luggage fits.",
    ],
    image: "/images/services/airport-taxi-jodhpur.jpg",
    imageAlt: "Airport taxi waiting outside the terminal at Jodhpur airport",
    seo: {
      title: "Airport Taxi in Jodhpur | Marwar Cabs",
      description:
        "Book a Jodhpur airport taxi for JDH and railway station pickups with Marwar Cabs. Share your arrival details and we arrange the car. Confirm on WhatsApp.",
    },
    faqs: [
      {
        q: "How do I confirm an airport pickup?",
        a: "Send your flight or train number, the date, and your hotel address when you book. We assign a car to that arrival and share the pickup detail before you travel.",
      },
      {
        q: "What if my flight or train is delayed?",
        a: "Message us with the new timing and we adjust the pickup as the schedule allows. The car class you booked is held for you unless you ask to change it.",
      },
      {
        q: "Can you pick up from the railway station too?",
        a: "Yes. Station arrivals are covered at the car stand; share the train number and coach if you know it, so the driver waits at the right side of the platform exit.",
      },
      {
        q: "Is waiting time charged after I land?",
        a: "Waiting arrangements are part of the booking detail we agree before the travel day. Confirm the current policy on WhatsApp when you book.",
      },
    ],
  },
  {
    slug: "one-way-taxi-jodhpur",
    name: "One-Way Taxi from Jodhpur",
    summary:
      "A car for the journey you make, with a drop at the destination door and no return leg to pay for.",
    features: [
      "Fare for the journey you make, no return charge",
      "Pickup at your Jodhpur address, drop at the destination door",
      "Sedan, SUV, Innova Crysta, and Tempo Traveller classes",
      "Estimate sent before you confirm",
      "Tolls and state entry tax as per actual receipts",
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "innova-crysta-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaipur-taxi",
      "jodhpur-to-udaipur-taxi",
      "jodhpur-to-jaisalmer-taxi",
    ],
    body: [
      "A one-way booking moves you from Jodhpur to another city without paying for a return the car does not make. You give the destination, the date, and the pickup point; we quote for that single run and assign a car from the class you choose. The driver stays with you from the door to the drop address, and you pay for the leg you travel. It suits travellers whose plans continue at the destination, whether that is a train from Jaipur, a flight, or family staying on.",
      "Have the destination address and your travel date ready before you message us; a hotel name and a nearby landmark work better than a bare map pin in rural areas. Luggage count matters for the class, so mention large bags when you ask. One-way trips work on every route we run, whether it is the short hop to Osian or the long run to Jaipur. If your plans are still moving, book the day before and tell us the pickup window.",
    ],
    image: "/images/services/one-way-taxi-jodhpur.jpg",
    imageAlt: "One-way taxi loaded for a journey out of Jodhpur",
    seo: {
      title: "One-Way Taxi from Jodhpur | Marwar Cabs",
      description:
        "Take a one-way taxi from Jodhpur and pay only for the journey you make. Sedans, SUVs, and Innova Crysta cars. Get a fare estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "Why is a one-way fare different from a round trip?",
        a: "The car comes back empty after dropping you, so the price covers only the leg you travel. That keeps single journeys honest for travellers who do not need the car for the return.",
      },
      {
        q: "Can I book a one-way taxi to Delhi?",
        a: "Any city on our route list works as a one-way trip. Destinations beyond the list are quoted on request, so send the address and date on WhatsApp and we will check.",
      },
      {
        q: "What do I need to share for the booking?",
        a: "The destination address, pickup point, date, and passenger count with luggage size. A hotel name and a nearby landmark help the driver reach you without a long phone call.",
      },
    ],
  },
  {
    slug: "round-trip-taxi-jodhpur",
    name: "Round-Trip Taxi from Jodhpur",
    summary:
      "Keep the same car and driver from the first pickup to the final drop back in Jodhpur, planned around your days.",
    features: [
      "Same car and driver for the whole journey",
      "Days and distance priced before you confirm",
      "Overnight halts planned with your itinerary",
      "Daily kilometre limit written into the estimate",
      "Suited to multi-city Rajasthan circuits",
    ],
    applicableVehicles: [
      "suv-taxi-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-udaipur-taxi",
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-ranakpur-taxi",
    ],
    body: [
      "A round trip keeps the same car and driver from the first pickup to the final drop back in Jodhpur. You plan the days, the distance, and the halts, and we price the whole journey before you confirm. The daily kilometre limit and overnight stays are written into the estimate, so the number holds. The car rests wherever you stay, so mornings start with the same driver who already knows your luggage and your pace. This works well for circuits like Udaipur with Ranakpur, or Jaisalmer with Osian on the way.",
      "Round trips suit families on a week-long holiday, small groups visiting several cities, and travellers who prefer one familiar car over a new pickup each day. Write down the day plan before you book: which city on which night, and where you want the driver to wait. Temple days like Ranakpur or Osian need only a few hours, while wedding trips need a car on call through the evening. Share the plan and we shape the estimate around it, day by day.",
    ],
    image: "/images/services/round-trip-taxi-jodhpur.jpg",
    imageAlt: "Round-trip taxi ready at a hotel in Jodhpur for a multi-day tour",
    seo: {
      title: "Round-Trip Taxi from Jodhpur | Marwar Cabs",
      description:
        "Book a round-trip taxi from Jodhpur and keep the same car and driver for the whole journey. Plan the days first, then ask for an estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "How is a round trip priced?",
        a: "We price the total days and planned distance before you confirm, with the daily kilometre limit written into the estimate. Share the day plan and we send one clear figure for the journey.",
      },
      {
        q: "Does the same driver stay with us every day?",
        a: "Yes, the same car and driver are assigned for the whole trip, including overnight halts. You do not explain the route or the luggage twice on the second morning.",
      },
      {
        q: "Can we add a day mid-trip?",
        a: "Usually, message us as soon as plans change and we will confirm whether the car is free for the extra day. Any change is agreed before it appears in the final account.",
      },
    ],
  },
  {
    slug: "outstation-taxi-jodhpur",
    name: "Outstation Taxi from Jodhpur",
    summary:
      "Long-distance cars from Jodhpur to any city in Rajasthan, priced per kilometre with a daily limit and receipts for the road.",
    features: [
      "Per-km fare with a daily kilometre limit",
      "Tolls and state entry tax charged as per actual receipts",
      "One-way and round-trip outstation options",
      "Cars for two to twelve passengers",
      "Route and dates confirmed before the car is assigned",
      "Overnight halts planned around your stops",
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-jaipur-taxi",
      "jodhpur-to-bikaner-taxi",
    ],
    body: [
      "An outstation booking takes you from Jodhpur to another city and back, or across several days of Rajasthan. You share the route, the dates, and the number of passengers; we quote per kilometre with a daily limit so the cost stays predictable. Tolls and state entry tax are charged as per actual receipts, and they are shown to you at the end of the trip. The car and driver stay with your group for the whole journey, with overnight halts planned around the stops you name.",
      "This suits long weekends, wedding parties travelling with baggage, and families covering three or four cities in one trip. Prepare the route in order before you ask for a quote, with the overnight city for each day; it keeps the estimate honest and the mornings simple. Carry identification for the toll plazas and hotel check-ins, and keep the daily plan on one page for the driver. If plans change mid-trip, tell the driver and message us; the kilometres and days are adjusted in the final account.",
    ],
    image: "/images/services/outstation-taxi-jodhpur.jpg",
    imageAlt: "Outstation taxi loaded for a long trip from Jodhpur",
    seo: {
      title: "Outstation Taxi from Jodhpur | Marwar Cabs",
      description:
        "Book an outstation taxi from Jodhpur to any Rajasthan city with Marwar Cabs. Per-km fares, daily limits, and receipts for tolls. Get an estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "Are tolls included in the fare?",
        a: "Tolls and state entry tax are charged as per actual receipts and shown to you during the trip. The car and driver charge is quoted separately, per kilometre with a daily limit.",
      },
      {
        q: "Do we need permits for another state?",
        a: "Some routes cross a state border and need entry formalities. Confirm the current policy on WhatsApp when you book, and we will tell you what applies to your destination.",
      },
      {
        q: "How many days can we book the car?",
        a: "One day to a fortnight works. Plan the route with the overnight cities and we quote the same way, day by day, so a longer tour stays easy to follow.",
      },
      {
        q: "Is fuel covered in the per-km rate?",
        a: "The per-km rate covers the car, the driver, and the fuel for the kilometres planned. Tolls and state entry tax come from receipts, and nothing else is added without telling you first.",
      },
    ],
  },
];

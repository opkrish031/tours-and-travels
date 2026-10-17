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
    name: "Jodhpur Local Sightseeing Taxi",
    summary:
      "Full-day and half-day sightseeing cabs in Jodhpur with fixed rates. Driver waits at Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace without rushing.",
    features: [
      "Mehrangarh Fort, Jaswant Thada & Rao Jodha Desert Rock Park",
      "Umaid Bhawan Palace Museum & Vintage Car Collection",
      "Mandore Gardens Royal Cenotaphs & Hall of Heroes",
      "Evening drop at Clock Tower (Ghanta Ghar) & Toorji Ka Jhalra Stepwell",
      "Fixed 8 Hr / 80 Km or 4 Hr / 40 Km packages with zero hidden parking fees",
      "Zero commission shopping promise — no forced souvenir stops",
    ],
    packages: [
      { label: "Full Day: 8 Hours / 80 Km", hours: 8, km: 80 },
      { label: "Half Day: 4 Hours / 40 Km", hours: 4, km: 40 },
      { label: "Extended: 12 Hours / 120 Km", hours: 12, km: 120 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "toyota-innova-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-ranakpur-taxi"],
    body: [
      "A local sightseeing cab with Marwad Cabs gives you a dedicated vehicle and local Marwari driver for the entire day. We usually begin pickup at your hotel at 9:00 AM, heading first to Mehrangarh Fort, Jaswant Thada, and Rao Jodha Desert Rock Park. Because these three landmarks sit on the same elevated rocky ridge, visiting them together saves nearly an hour of crosstown driving time.",
      "In the afternoon, your driver brings you to Umaid Bhawan Palace Museum (open until 5:00 PM) and Mandore Gardens. In the late afternoon, we drop you near Toorji Ka Jhalra stepwell and Sardar Market by the Clock Tower. You can sample Makhaniya Lassi at Shri Mishrilal Hotel and hot Mirchi Bada at Janta Sweet Home while your cab stays parked at the perimeter for your return ride.",
    ],
    image: "/images/services/local-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs sedan waiting at the upper parking of Mehrangarh Fort Jodhpur",
    seo: {
      title: "Local Sightseeing Taxi Jodhpur | Marwad Cabs",
      description:
        "Book Jodhpur local sightseeing cabs for Mehrangarh Fort, Jaswant Thada & Umaid Bhawan. 8hr/80km full day packages from Rs 1,800. No commission shopping stops.",
    },
    faqs: [
      {
        q: "What are the rates for Jodhpur local sightseeing?",
        a: "Full-day 8 hours / 80 km packages are ₹1,800 in an AC Sedan (Dzire / Etios), ₹2,400 in an Ertiga, and ₹3,200 in an Innova Crysta. Extra hours are ₹150/hr and extra km is ₹11/km.",
      },
      {
        q: "Where does the driver park at Mehrangarh Fort?",
        a: "Our drivers park at the upper fort parking lot right near the elevator and ticket gate so you do not have to climb steep ramps in the heat.",
      },
      {
        q: "Will the driver take us to commission handicraft or textile shops?",
        a: "No. We operate under a strict zero-commission policy. Drivers take you only to genuine historical monuments and eateries you choose, never to sponsored commercial emporiums.",
      },
    ],
  },
  {
    slug: "airport-taxi-jodhpur",
    name: "Jodhpur Airport (JDH) & Railway Station Taxi",
    summary:
      "Reliable pickup and drop service for Jodhpur Civil Airport (JDH) and Jodhpur Junction Railway Station with flight tracking and old city auto-transfer assistance.",
    features: [
      "Punctual arrival 15 minutes before flight landing or train arrival",
      "Coordination at Platform 1 (Main Gate) or Platform 2 (Subhash Nagar)",
      "Civil Airport Road Ratanada transfer in under 15 minutes",
      "Old city haveli drop assistance via Sojati Gate, Jalori Gate, or Chandpole",
      "Fixed transfer pricing with zero midnight or luggage surcharges",
    ],
    packages: [
      { label: "Airport Drop / Pickup (Sedan): ₹450 – ₹600", km: 15 },
      { label: "Airport Drop / Pickup (Ertiga / Crysta): ₹650 – ₹900", km: 15 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: ["jodhpur-to-jaisalmer-taxi", "jodhpur-to-udaipur-taxi"],
    body: [
      "Marwad Cabs operates its dispatch office from Ratanada, situated just 5 minutes from Jodhpur Civil Airport (JDH) and 7 minutes from Jodhpur Railway Junction. Our drivers monitor domestic flight schedules and train running status so your driver is already at the exit with an identification placard when you step out of the terminal.",
      "If you are staying at a heritage haveli inside the Blue City old lanes (such as Navchokiya, Brahmpuri, or near Clock Tower) where commercial 4-wheelers are prohibited by police barriers, our driver drops you at the nearest gate (Jalori Gate, Sojati Gate, or Gulab Sagar) and coordinates a trusted ₹100–₹150 local auto-rickshaw directly to your haveli doorstep.",
    ],
    image: "/images/services/airport-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs airport taxi waiting at Jodhpur Civil Airport Ratanada",
    seo: {
      title: "Jodhpur Airport & Railway Taxi | Marwad Cabs",
      description:
        "Book Jodhpur Airport (JDH) and Junction railway station taxi with Marwad Cabs. Fixed rates from Rs 450. Punctual flight tracking & old city haveli assistance.",
    },
    faqs: [
      {
        q: "What is the fixed fare for Jodhpur Airport pickup or drop?",
        a: "Standard airport and railway station transfers within Jodhpur city are ₹450 to ₹600 in an AC Sedan, ₹650 to ₹800 in an Ertiga, and ₹900 in an Innova Crysta.",
      },
      {
        q: "How do you coordinate pickups at Jodhpur Railway Junction?",
        a: "Jodhpur Junction has two exits: Platform 1 (Main City Side) and Platform 2 (Subhash Nagar / Bhagat Ki Kothi side). We call you before your train arrives to guide you to the exact exit where the cab is parked.",
      },
      {
        q: "What if my flight or train is delayed past midnight?",
        a: "We track your flight number and PNR. We never charge waiting penalties for verified airline or railway delays, and your driver remains on standby until you safely exit.",
      },
    ],
  },
  {
    slug: "one-way-taxi-jodhpur",
    name: "One-Way Outstation Taxi from Jodhpur",
    summary:
      "Affordable one-way intercity drops from Jodhpur to Jaisalmer, Udaipur, Jaipur, Bikaner, Mount Abu, and Ahmedabad without return fare penalties.",
    features: [
      "Point-to-point drop pricing with zero return kilometer charges",
      "Sedan, Ertiga, Innova Crysta, and Fortuner options",
      "FASTag highway toll receipts provided at journey completion",
      "Doorstep pickup anywhere in Jodhpur including airport and railway station",
    ],
    packages: [
      { label: "Jodhpur to Jaisalmer One-Way: ₹4,200", km: 285 },
      { label: "Jodhpur to Udaipur One-Way: ₹4,000", km: 255 },
      { label: "Jodhpur to Jaipur One-Way: ₹4,500", km: 335 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "toyota-innova-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-udaipur-taxi",
      "jodhpur-to-jaipur-taxi",
    ],
    body: [
      "Traditional taxi operators in Rajasthan often charge two-way fares even when a traveler only requires a single drop to another city. Marwad Cabs offers true one-way drop fares across all major highways connecting Jodhpur to Jaisalmer, Udaipur, Mount Abu, Jaipur, and Bikaner.",
      "Your driver arrives at your home, hotel, or station at the agreed minute. Luggage is loaded carefully in boot space or secured on heavy-duty roof carriers. Highway FASTag toll receipts and state tax slips are presented directly at journey completion for exact reimbursement with zero markups.",
    ],
    image: "/images/services/one-way-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs one-way intercity cab cruising on Rajasthan highway",
    seo: {
      title: "One Way Taxi from Jodhpur | Marwad Cabs",
      description:
        "Book one way outstation cabs from Jodhpur to Jaisalmer, Udaipur, Jaipur, Mount Abu & Bikaner. Fixed drop fares with no return charges. Reserve on WhatsApp.",
    },
    faqs: [
      {
        q: "Do I have to pay return fare on a one-way trip?",
        a: "No. Our one-way taxi fares are all-inclusive drop rates for that single leg. You only pay for the distance travelled to your destination city.",
      },
      {
        q: "Can we take a detour for sightseeing on a one-way trip?",
        a: "Yes. For example, on a Jodhpur to Udaipur drop, you can halt at Ranakpur Jain Temple or Kumbhalgarh Fort. We calculate the slight extra distance at your vehicle's standard per-km rate.",
      },
      {
        q: "How is highway toll tax charged on one-way journeys?",
        a: "Tolls are recorded automatically via our FASTag electronic device and verified against the official toll receipts at the end of your trip.",
      },
    ],
  },
  {
    slug: "round-trip-taxi-jodhpur",
    name: "Round-Trip Rajasthan Tour Cabs",
    summary:
      "Multi-day Rajasthan circuit packages with dedicated AC vehicle, experienced local driver, standard 250 km/day calculation, and ₹300 driver bhatta.",
    features: [
      "Fixed 250 km/day minimum average calculation for fair highway billing",
      "Same vehicle and courteous driver stays with you throughout your tour",
      "Nominal ₹300/day driver allowance covering food and stay",
      "Customizable itineraries covering Jodhpur, Jaisalmer, Udaipur, and Mount Abu",
    ],
    packages: [
      { label: "2 Days / 500 Km Minimum Floor", km: 500 },
      { label: "3 Days / 750 Km Minimum Floor", km: 750 },
      { label: "5 Days / 1250 Km Minimum Floor", km: 1250 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "toyota-innova-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-udaipur-taxi",
      "jodhpur-to-mount-abu-taxi",
    ],
    body: [
      "When planning a holiday circuit across western Rajasthan, hiring a single dedicated cab and driver ensures your luggage stays safely in the vehicle during sightseeing stops and gives you total schedule freedom. Marwad Cabs provides round-trip vehicles starting at ₹10/km for sedans and ₹17/km for Innova Crystas.",
      "We follow the transparent Rajasthan tour transport standard: a 250 km/day minimum average, which allows you to take relaxed short-distance days in cities like Udaipur or Jaisalmer while balancing longer highway driving days without penalty. Driver bhatta is capped at ₹300/day.",
    ],
    image: "/images/services/round-trip-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs touring vehicle parked beside a scenic lake in Rajasthan",
    seo: {
      title: "Round Trip Taxi from Jodhpur | Marwad Cabs",
      description:
        "Book round trip Rajasthan tour cabs from Jodhpur. Fixed 250 km/day minimum, Rs 300 driver allowance, and same dedicated chauffeur for your whole trip.",
    },
    faqs: [
      {
        q: "How does the 250 km/day minimum calculation work on round trips?",
        a: "On a 3-day trip, the minimum billed distance is 750 km (3 x 250 km). If your total meter reading is 710 km, you pay for 750 km. If you drive 820 km, you pay for exactly 820 km at your per-km vehicle rate.",
      },
      {
        q: "Do I have to arrange hotel accommodation for the driver?",
        a: "No. The ₹300/day driver allowance (bhatta) covers the driver's food and night accommodation. Most Rajasthan tourist hotels also offer complimentary driver dormitories.",
      },
      {
        q: "Can the driver recommend good food stops on the highway?",
        a: "Yes. Our drivers know clean, family-friendly highway dhabas with hygienic washrooms along all major Rajasthan routes.",
      },
    ],
  },
  {
    slug: "outstation-taxi-jodhpur",
    name: "Outstation Cabs from Jodhpur",
    summary:
      "Per-kilometre outstation cabs across Rajasthan, Gujarat, and Delhi NCR with clean AC vehicles, roof carriers, and verified local chauffeurs.",
    features: [
      "Full fleet availability: Dzire, Etios, Ertiga, Innova Crysta, and Tempo Travellers",
      "Transparent per-km pricing starting at ₹10/km with clear written estimates",
      "Heavy-duty roof luggage carriers with waterproof protective covers",
      "Coverage for desert runs, pilgrimage tirths, and hill stations",
    ],
    packages: [
      { label: "Outstation Sedan: ₹10 – ₹11 / km", km: 250 },
      { label: "Outstation Ertiga: ₹13 – ₹14 / km", km: 250 },
      { label: "Outstation Innova Crysta: ₹17 – ₹18 / km", km: 250 },
      { label: "Outstation Tempo Traveller: ₹24 – ₹32 / km", km: 250 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "toyota-innova-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
      "luxury-cab-jodhpur",
    ],
    relatedRoutes: [
      "jodhpur-to-jaisalmer-taxi",
      "jodhpur-to-udaipur-taxi",
      "jodhpur-to-jaipur-taxi",
      "jodhpur-to-mount-abu-taxi",
    ],
    body: [
      "Whether you are planning an outstation road trip to the Sam sand dunes of Jaisalmer, the marble palaces of Udaipur, the holy shrine of Shri Nakoda Ji, or Ahmedabad airport, Marwad Cabs provides clean, verified vehicles maintained specifically for long highway stretches.",
      "Every vehicle undergoes inspection of tire tread, air conditioning pressure, and coolant before departing on an outstation trip. We provide written fare breakdowns on WhatsApp before you pay any advance so you have total clarity on kilometre rates, driver bhatta, and toll procedures.",
    ],
    image: "/images/services/outstation-taxi-jodhpur.jpg",
    imageAlt: "Marwad Cabs fleet lined up ready for long highway outstation departure",
    seo: {
      title: "Outstation Taxi from Jodhpur | Marwad Cabs",
      description:
        "Book an outstation taxi from Jodhpur to any Rajasthan city with Marwad Cabs. Per-km fares, daily limits, and receipts for tolls. Get an estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "What is the starting per-km rate for an outstation cab from Jodhpur?",
        a: "Outstation rates start at ₹10/km for a Swift Dzire / Toyota Etios sedan, ₹13/km for a Maruti Ertiga, ₹17/km for an Innova Crysta, and ₹24/km for a Force Tempo Traveller.",
      },
      {
        q: "Are outstation cabs equipped with luggage carriers?",
        a: "Yes. All our outstation Ertigas, Innovas, and Tempo Travellers are equipped with heavy-duty roof luggage carriers and rain-proof tarpaulins.",
      },
      {
        q: "How do I book an outstation cab?",
        a: "Send your itinerary, travel dates, pickup location, and passenger count on WhatsApp. We send a complete quote with vehicle options in under 10 minutes.",
      },
    ],
  },
  {
    slug: "bishnoi-village-safari-jodhpur",
    name: "Bishnoi Village Safari & Craft Tour",
    summary:
      "Half-day cultural village safari south of Jodhpur visiting Guda Bishnoi Lake, blackbuck habitats, Salawas rug weavers, and traditional pottery makers.",
    features: [
      "Guda Bishnoi Lake: Spot native blackbucks, chinkaras, and migratory cranes",
      "Salawas Durrie Weavers: Watch traditional handloom rug making without sales pressure",
      "Kakani Potter's Village: Hands-on clay wheel pottery demonstration",
      "Khejarli Memorial: Sacred forest conservation landmark of the Bishnoi community",
      "Comfortable 4 to 5 hour morning or afternoon excursion (45 km round trip)",
    ],
    packages: [
      { label: "Half-Day Safari: 4 to 5 Hours / 45 Km", hours: 5, km: 45 },
    ],
    applicableVehicles: [
      "sedan-taxi-jodhpur",
      "suv-taxi-jodhpur",
      "innova-crysta-jodhpur",
      "tempo-traveller-jodhpur",
    ],
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-nakodaji-taxi"],
    body: [
      "The Bishnoi community is celebrated worldwide for its five-century-old tradition of environmental protection and sacred reverence for wildlife and trees. Located 20 km south of Jodhpur, the Bishnoi villages offer a peaceful glimpse into rural Marwari life away from tourist crowds.",
      "Our half-day safari takes you to Guda Bishnoi Lake, where herds of wild blackbucks, chinkaras, and peacocks roam freely alongside winter demoiselle cranes (Kurjan). You also visit genuine artisan workshops in Kakani for traditional terracotta pottery and Salawas for world-famous dhurrie hand-weaving.",
    ],
    image: "/images/services/bishnoi-village-safari-jodhpur.jpg",
    imageAlt: "Marwad Cabs vehicle during Bishnoi Village cultural safari near Jodhpur",
    seo: {
      title: "Bishnoi Village Safari Jodhpur | Marwad Cabs",
      description:
        "Book a Bishnoi Village Safari in Jodhpur with Marwad Cabs. Spot blackbucks at Guda Lake, see Salawas rug weavers & Kakani potters. Half-day tours from Rs 1,600.",
    },
    faqs: [
      {
        q: "How long does the Bishnoi Village safari take?",
        a: "The tour takes approximately 4 to 5 hours covering 45 km round trip south of Jodhpur. It can be done comfortably in either morning (8:30 AM to 1:00 PM) or afternoon (2:00 PM to 6:30 PM).",
      },
      {
        q: "What is the cost of the Bishnoi Village taxi tour?",
        a: "The complete half-day package is ₹1,600 in an AC Sedan and ₹2,200 in an Ertiga / Innova, covering the vehicle, fuel, driver waiting time, and all village stops.",
      },
      {
        q: "Will we be pressured into buying rugs or handicrafts?",
        a: "No. Our drivers take you to authentic village weavers and potters where you can observe demonstrations freely without obligation to buy anything.",
      },
    ],
  },
  {
    slug: "wedding-car-rental-jodhpur",
    name: "Wedding & Corporate Car Rental in Jodhpur",
    summary:
      "Premium wedding car hire, guest transfer fleets, Innova Crystas, and 26-seater Tempo Travellers for royal destination weddings at Umaid Bhawan and heritage resorts.",
    features: [
      "Fleet coordination for destination weddings at Umaid Bhawan, Ajit Bhawan & Indana Palace",
      "Dedicated airport & railway station reception coordinator desks",
      "Uniformed, courteous chauffeurs fluent in Hindi and English",
      "Luxury Fortuners, Mercedes, vintage cars, and decorated bridal sedans",
      "Bulk Tempo Travellers (12, 17, 26 seater) for wedding guest logistics",
    ],
    packages: [
      { label: "Wedding Day Disposal: 12 Hours / 100 Km", hours: 12, km: 100 },
      { label: "Multi-Day Wedding Fleet Contract", hours: 24, km: 250 },
    ],
    applicableVehicles: [
      "innova-crysta-jodhpur",
      "luxury-cab-jodhpur",
      "tempo-traveller-jodhpur",
      "sedan-taxi-jodhpur",
    ],
    relatedRoutes: ["jodhpur-to-jaisalmer-taxi", "jodhpur-to-udaipur-taxi"],
    body: [
      "Jodhpur is one of India's premier destination wedding capitals, hosting grand celebrations at Umaid Bhawan Palace, Raas, Indana Palace, Ajit Bhawan, and Bijolai Palace. Managing smooth airport transfers and guest transit between hotels and sangeet venues requires punctual logistics.",
      "Marwad Cabs provides full-service wedding transport management. We assign on-site transport managers with a dedicated fleet of gleaming white Innova Crystas and luxury Tempo Travellers. We ensure every arriving guest receives a courteous greeting at Jodhpur Airport (JDH) with luggage handled attentively.",
    ],
    image: "/images/services/wedding-car-rental-jodhpur.jpg",
    imageAlt: "Marwad Cabs wedding fleet of white luxury cars lined up outside a palace in Jodhpur",
    seo: {
      title: "Wedding Car Rental in Jodhpur | Marwad Cabs",
      description:
        "Hire luxury wedding cars and guest transfer fleets in Jodhpur with Marwad Cabs. Innova Crystas, luxury Fortuner and Tempo Travellers for palace weddings.",
    },
    faqs: [
      {
        q: "How many vehicles can Marwad Cabs supply for a destination wedding?",
        a: "We regularly manage fleets of 15 to 40 vehicles, including Innova Crystas, sedans, luxury Fortuners, and 26-seater Tempo Travellers with dedicated dispatch coordinators.",
      },
      {
        q: "Can you provide decorated cars for bridal or groom entry?",
        a: "Yes. We offer fresh floral decorations and luxury sedans or vintage cars tailored to your wedding decor specifications.",
      },
      {
        q: "Do you offer airport coordinator desks for arriving guests?",
        a: "Yes. For large weddings, our team sets up an arrival reception desk at Jodhpur Airport to receive guests and guide them directly to their assigned vehicle.",
      },
    ],
  },
];

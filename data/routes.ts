export type Route = {
  slug: string;
  from: string;
  to: string;
  distanceKm: number;
  durationHours: number;
  tagline: string;
  startingFare: number;
  highlights: string[];
  intro: string;
  body: string[];
  image: string;
  imageAlt: string;
  relatedRoutes: string[];
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};

export const routes: Route[] = [
  {
    slug: "jodhpur-to-jaisalmer-taxi",
    from: "Jodhpur",
    to: "Jaisalmer",
    distanceKm: 285,
    durationHours: 4.75,
    tagline: "Golden City & Sam Sand Dunes",
    startingFare: 4200,
    highlights: [
      "Jaisalmer Golden Fort & Patwon Ki Haveli",
      "Sam / Khuri Sand Dunes (Desert Camps)",
      "Optional halt at Pokhran Fort & Ramdevra",
      "Gadisar Lake & Desert National Park",
    ],
    intro:
      "Jaisalmer is a 285-km desert drive west from Jodhpur on NH-125 and NH-11, passing Agolai, Balesar, Dechu, and Pokhran. We run AC sedans, Ertigas, and Innova Crystas on this road, and our drivers know which dhabas serve fresh rotis and where the clean washroom halts are.",
    body: [
      "The highway leaves the rocky outskirts of Jodhpur and opens into wide desert terrain. We can add an optional 30-minute halt at Pokhran Fort or the revered Baba Ramdevra Temple (Runicha Dham), about 12 km off the highway. The trip runs at an easy pace, and the driver stays on the main road rather than taking rough shortcuts.",
      "Tell us while booking whether the drop is a city hotel inside Jaisalmer or the desert camps at Sam Sand Dunes or Khuri. Sam is 42 km west of Jaisalmer city, and we work out the kilometre rate beforehand so there is nothing to argue about at drop-off.",
    ],
    image: "/images/routes/jodhpur-to-jaisalmer-taxi.jpg",
    imageAlt: "Marwad Cabs taxi on the NH-11 desert highway to Jaisalmer",
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-bikaner-taxi"],
    seo: {
      title: "Jodhpur to Jaisalmer Taxi | Marwad Cabs",
      description:
        "Book a direct Jodhpur to Jaisalmer cab with Marwad Cabs. AC Dzire, Ertiga & Crysta. One-way from Rs 4,200, round-trip Rs 10/km. Optional halt at Pokhran Fort.",
    },
    faqs: [
      {
        q: "What is the driving time from Jodhpur to Jaisalmer?",
        a: "The 285 km highway drive takes roughly 4.5 to 5 hours on NH-125 and NH-11. If you add halts at Pokhran Fort or Ramdevra Temple, add 45 to 60 minutes.",
      },
      {
        q: "Do you drop passengers directly at Sam Sand Dunes desert camps?",
        a: "Yes. Sam Dunes is 42 km west of Jaisalmer city. Tell us at booking whether the drop is the city or the dunes, and we quote the distance accordingly.",
      },
      {
        q: "What are the toll and driver charges for this route?",
        a: "Tolls on the Jodhpur–Jaisalmer stretch are billed at actual FASTag receipt value. Driver bhatta is ₹300/day on round trips, with no separate night charge.",
      },
    ],
  },
  {
    slug: "jodhpur-to-udaipur-taxi",
    from: "Jodhpur",
    to: "Udaipur",
    distanceKm: 255,
    durationHours: 5.5,
    tagline: "City of Lakes via Ranakpur & Kumbhalgarh",
    startingFare: 4000,
    highlights: [
      "Ranakpur 1444-Pillar Marble Jain Temple",
      "Kumbhalgarh Fort & UNESCO Great Wall",
      "Bullet Baba Dham (Om Banna) on NH-62",
      "Lake Pichola & City Palace drop-off",
    ],
    intro:
      "Travelling from Jodhpur to Udaipur is one of Rajasthan's most popular road journeys, and most of our passengers take the scenic route via Pali — Bullet Baba Temple (Om Banna Dham), the carved Ranakpur Jain Temple, and the Kumbhalgarh hill fort before the City of Lakes.",
    body: [
      "Ranakpur Jain Temple opens for non-Jain tourists at 12:00 PM and closes at 5:00 PM. We suggest leaving Jodhpur at 8:30 AM or 9:00 AM so you reach Ranakpur as tourist entry begins. You get about 90 minutes with the 1,444 hand-carved marble pillars while the driver waits in the shade parking.",
      "The stretch between Ranakpur, Kumbhalgarh, and Udaipur crosses winding Aravalli ghat passes. Our drivers run these roads daily and know the hairpin bends; they keep the AC going on the climbs. In Udaipur we drop you at your lakeside hotel, or arrange luggage transfer if you are staying in the old Bhatiyani Chohatta alleys.",
    ],
    image: "/images/routes/jodhpur-to-udaipur-taxi.jpg",
    imageAlt: "Marwad Cabs Innova Crysta travelling through the Aravalli hills toward Udaipur",
    relatedRoutes: ["jodhpur-to-ranakpur-taxi", "jodhpur-to-mount-abu-taxi"],
    seo: {
      title: "Jodhpur to Udaipur Taxi | Marwad Cabs",
      description:
        "Jodhpur to Udaipur taxi via Ranakpur Jain Temple & Kumbhalgarh Fort. Fares from Rs 4,000. Experienced drivers for Aravalli ghats. WhatsApp booking.",
    },
    faqs: [
      {
        q: "Can we cover both Ranakpur and Kumbhalgarh in one day before reaching Udaipur?",
        a: "Yes. Leave Jodhpur at 8:30 AM and you can be at Ranakpur by 12:15 PM, at Kumbhalgarh Fort by around 3:00 PM after the 1.5-hour drive, and at your Udaipur hotel by 7:30 PM.",
      },
      {
        q: "What is the fare difference between direct and via Ranakpur?",
        a: "The direct NH-62 / NH-58 route is 255 km (starting ₹4,000 for a sedan). The sightseeing route via Ranakpur and Kumbhalgarh adds about 70 km and is billed at ₹4,800 to ₹5,200 for a sedan.",
      },
      {
        q: "Which vehicle is best suited for the ghat curves?",
        a: "The Innova Crysta or Maruti Ertiga suits families best on the hilly hairpin bends between Desuri Ghat and Kelwara.",
      },
    ],
  },
  {
    slug: "jodhpur-to-osian-taxi",
    from: "Jodhpur",
    to: "Osian",
    distanceKm: 65,
    durationHours: 1.25,
    tagline: "Ancient Temples & Sunset Desert Safari",
    startingFare: 1800,
    highlights: [
      "Sachiya Mata Temple (8th Century)",
      "Mahavira Jain Temple Complex",
      "Thar Desert Camel & Jeep Dune Bashing",
      "Rajasthani Sunset Dinner at the camp",
    ],
    intro:
      "Osian is an ancient desert town 65 km north of Jodhpur via Mandore, Daijar, and Mathania Road on NH-62. Known as the gateway to the Thar Desert and the birthplace of the Oswal Jain community, it has 8th-century stone temples and the dune safaris just outside town.",
    body: [
      "Most people leave Jodhpur around 2:00 PM for an Osian day trip. The drive is about 75 minutes on paved road. Start with the Sachiya Mata Temple on the hillock and the Mahavira Jain Temple while there is still good daylight for photos.",
      "By 4:30 PM the driver takes you out to the Osian dunes for a camel ride or a 4x4 jeep run across the desert crests. You get sunset over the Thar, folk music, and a Marwari bajre ki roti meal at the camp, then a calm drive back to Jodhpur by 9:30 PM.",
    ],
    image: "/images/routes/jodhpur-to-osian-taxi.jpg",
    imageAlt: "Marwad Cabs Dzire parked near the ancient sandstone temples of Osian",
    relatedRoutes: ["jodhpur-to-jaisalmer-taxi", "jodhpur-to-bikaner-taxi"],
    seo: {
      title: "Jodhpur to Osian Taxi & Desert Safari | Marwad Cabs",
      description:
        "Book a same-day Jodhpur to Osian taxi for Sachiya Mata Temple darshan, camel safari and desert sunset dinner. Fixed round-trip sedan packages from Rs 1,800.",
    },
    faqs: [
      {
        q: "What is the round-trip taxi package fare for Osian?",
        a: "A same-day round-trip package from Jodhpur to Osian is ₹1,800 in an AC Sedan and ₹2,600 in an AC Innova, including waiting time during your temple visits and desert safari.",
      },
      {
        q: "Can we combine Osian with Bishnoi Village Safari on the same day?",
        a: "Bishnoi Village is south of Jodhpur and Osian is north, so the two can be done the same day: Bishnoi Village in the morning (9 AM – 1 PM), then Osian in the afternoon (2:30 PM – 9:30 PM).",
      },
      {
        q: "Do you arrange the camel and jeep safari tickets?",
        a: "We can connect you directly with the Osian desert camp operators we use for camel and jeep safaris. You book and pay them at their local rates, with no agent commission added.",
      },
    ],
  },
  {
    slug: "jodhpur-to-jaipur-taxi",
    from: "Jodhpur",
    to: "Jaipur",
    distanceKm: 335,
    durationHours: 5.75,
    tagline: "Fast 6-Lane Highway to the Pink City",
    startingFare: 4500,
    highlights: [
      "Smooth 6-lane NH-25 & NH-48 Expressway",
      "Optional 2-hour detour to Pushkar / Ajmer",
      "Family dhaba halts along the way",
      "Direct drop at Jaipur Airport or City Hotels",
    ],
    intro:
      "Jaipur is a 335-km highway drive east from Jodhpur through Bilara, Jaitaran, Beawar, Ajmer bypass, and Kishangarh. It is mostly a modern multi-lane road, so with an early start the run takes under 6 hours.",
    body: [
      "Leaving Jodhpur around 6:30 AM or 7:00 AM avoids market traffic and gets you into Jaipur before the afternoon congestion near Ajmeri Gate or MI Road. There are plenty of fuel stations and family restaurants along the way where drivers stop for tea and clean restrooms.",
      "Many passengers add a 2-hour halt at Pushkar (Brahma Temple & Sacred Lake) or Ajmer Sharif Dargah. We charge only for the extra detour kilometres at your vehicle's normal per-km rate, so the bill stays straightforward.",
    ],
    image: "/images/routes/jodhpur-to-jaipur-taxi.jpg",
    imageAlt: "Marwad Cabs sedan cruising on the 6-lane highway toward Jaipur",
    relatedRoutes: ["jodhpur-to-pushkar-taxi", "jodhpur-to-ajmer-taxi"],
    seo: {
      title: "Jodhpur to Jaipur Taxi | Marwad Cabs",
      description:
        "Book a fast Jodhpur to Jaipur cab via 6-lane NH-25 & NH-48 expressway. Clean AC cars, one-way from Rs 4,500. Optional halt at Pushkar or Ajmer Sharif Dargah.",
    },
    faqs: [
      {
        q: "What is the one-way fare from Jodhpur to Jaipur?",
        a: "One-way drops start at ₹4,500 for an AC Sedan (Dzire / Etios) and ₹6,500 for an Innova Crysta. Highway tolls are paid via actual FASTag receipts.",
      },
      {
        q: "Can the driver drop us directly at Jaipur International Airport (JAI)?",
        a: "Yes. Our drivers know the departure terminal layout at Sanganer and drop you at the entrance gate with time to spare for check-in.",
      },
      {
        q: "How much extra is a stop at Pushkar or Ajmer on the way?",
        a: "A detour to Pushkar adds roughly 35 km. We bill the extra distance at the vehicle's normal per-km rate, plus waiting time.",
      },
    ],
  },
  {
    slug: "jodhpur-to-mount-abu-taxi",
    from: "Jodhpur",
    to: "Mount Abu",
    distanceKm: 265,
    durationHours: 4.75,
    tagline: "Rajasthan's Only Hill Station & Dilwara Temples",
    startingFare: 4200,
    highlights: [
      "Dilwara White Marble Jain Temples",
      "Nakki Lake Boating & Sunset Point",
      "Guru Shikhar Peak (Highest in Aravallis)",
      "28 km Uphill Ghat Climb with AC on",
    ],
    intro:
      "Mount Abu is 265 km south of Jodhpur via Pali, Sirohi, and Abu Road on NH-62 and NH-27. As Rajasthan's only hill station it is a cool break from the desert heat, with the Dilwara marble temples, boating on Nakki Lake, and the viewpoints up at Guru Shikhar.",
    body: [
      "The highway from Jodhpur to Abu Road is flat, fast 4-lane tarmac. From Abu Road it becomes a 28-km uphill ghat climb with multiple hairpins. Our cars are checked before long trips, and the driver keeps the AC running the whole way up the climb.",
      "Dilwara Temples are open to non-Jains from 12:00 PM to 5:00 PM. Plan to reach Mount Abu by noon so the temple visit is done before an afternoon boat ride at Nakki Lake and sunset from Honeymoon Point.",
    ],
    image: "/images/routes/jodhpur-to-mount-abu-taxi.jpg",
    imageAlt: "Marwad Cabs taxi ascending the scenic mountain road to Mount Abu",
    relatedRoutes: ["jodhpur-to-udaipur-taxi", "jodhpur-to-ranakpur-taxi"],
    seo: {
      title: "Jodhpur to Mount Abu Taxi | Marwad Cabs",
      description:
        "Book an AC cab from Jodhpur to Mount Abu. 28 km uphill ghat climb with AC on. Covers Dilwara Temples, Nakki Lake & Guru Shikhar. Fares from Rs 4,200.",
    },
    faqs: [
      {
        q: "Do your drivers switch off the car AC during the Mount Abu hill climb?",
        a: "No. The AC is checked before we start the climb, and the driver keeps it running for the full 28 km. Dzire, Ertiga, and Crysta all cool well once the engine is working.",
      },
      {
        q: "What is the starting fare for Jodhpur to Mount Abu?",
        a: "One-way drops start at ₹4,200 for a sedan and ₹5,800 for an Innova. Round-trip bookings are billed at ₹10/km (Sedan) with a 250 km/day minimum floor.",
      },
      {
        q: "Are local sightseeing spots in Mount Abu covered in round trips?",
        a: "Yes. Nakki Lake, Dilwara Jain Temples, Guru Shikhar, Achalgarh Fort, and Sunset Point are all covered within the daily kilometre limit on a round trip.",
      },
    ],
  },
  {
    slug: "jodhpur-to-nakodaji-taxi",
    from: "Jodhpur",
    to: "Nakoda Ji & Balotra",
    distanceKm: 115,
    durationHours: 2.25,
    tagline: "Sacred Jain Tirth & Rani Bhatiyani Dham",
    startingFare: 2400,
    highlights: [
      "Shri Nakoda Parsvanath Jain Tirth Darshan",
      "Mata Rani Bhatiyani Mandir (Jasol)",
      "Brahma Temple at Asotra",
      "Same-day pilgrimage circuit from Jodhpur",
    ],
    intro:
      "Nakoda Ji (Mewanagar near Balotra) is 115 km southwest of Jodhpur via Kalyanpur, Pachpadra, and Jasol. Dedicated to Shri Nakoda Bhairav and Parsvanath Bhagwan, it is one of Rajasthan's most sacred Jain tirths, and most devotees go for same-day darshan.",
    body: [
      "The drive takes about 2 hours 15 minutes across the Marwar plains. Our drivers know the darshan timings, the Bhojanshala meal schedule, and puja hours, so we plan the stops to get you in for morning or afternoon aarti without rushing.",
      "Most pilgrims also stop for darshan at Mata Rani Bhatiyani Mandir in Jasol (7 km from Nakoda) and the marble Brahma Temple at Asotra (12 km away). Our same-day return package covers this circuit with waiting time built in.",
    ],
    image: "/images/routes/jodhpur-to-nakodaji-taxi.jpg",
    imageAlt: "Marwad Cabs taxi parked outside Shri Nakoda Ji Jain Temple",
    relatedRoutes: ["jodhpur-to-ranakpur-taxi", "jodhpur-to-osian-taxi"],
    seo: {
      title: "Jodhpur to Nakoda Ji Taxi | Marwad Cabs",
      description:
        "Same-day pilgrimage taxi from Jodhpur to Shri Nakoda Ji Tirth and Jasol Rani Bhatiyani Mandir. Fixed return fare from Rs 2,400. Punctual Marwari drivers.",
    },
    faqs: [
      {
        q: "What is the taxi package fare for a same-day Jodhpur to Nakoda Ji trip?",
        a: "Our fixed same-day return package is ₹2,400 in an AC Sedan and ₹3,400 in an Ertiga / Innova, covering Nakoda Ji, Jasol Rani Bhatiyani Mandir, and Asotra.",
      },
      {
        q: "Does the package include driver waiting time during darshan?",
        a: "Yes. Up to 4 hours of waiting in total for darshan, puja, and lunch at the temple Bhojanshala is part of the package price.",
      },
      {
        q: "Can the cab pick up directly from Jodhpur Railway Station early morning?",
        a: "Yes. We pick up devotees arriving on overnight trains at Jodhpur Junction (Platform 1 or 2) and go straight to Nakoda Ji from there.",
      },
    ],
  },
  {
    slug: "jodhpur-to-bikaner-taxi",
    from: "Jodhpur",
    to: "Bikaner",
    distanceKm: 250,
    durationHours: 4.5,
    tagline: "Camel Country & Junagarh Fort via Nagaur",
    startingFare: 3800,
    highlights: [
      "Karni Mata Rat Temple at Deshnok",
      "Junagarh Fort & Prachina Museum",
      "National Research Centre on Camel (NRCC)",
      "Lalgarh Palace & Rampuria Havelis",
    ],
    intro:
      "Bikaner is 250 km north of Jodhpur along NH-62 via Khimsar, Nagaur, and Nokha. It has the un-conquered Junagarh Fort, red sandstone Rampuria havelis, and the camel breeding farm — a natural stop on the northern Rajasthan heritage route.",
    body: [
      "The road runs through flat Marwar scrubland. Exactly 30 km before Bikaner city, the highway passes the Karni Mata Temple in Deshnok (the Rat Temple), and we normally halt 45 minutes there for darshan before driving on.",
      "Inside Bikaner, the driver takes you to Junagarh Fort, the Camel Breeding Farm (open 2:00 PM to 6:00 PM), and the sweet shops for Bikaneri bhujia, rasgulla, and ghewar, before dropping you at your hotel or the railway station.",
    ],
    image: "/images/routes/jodhpur-to-bikaner-taxi.jpg",
    imageAlt: "Marwad Cabs vehicle parked in front of Junagarh Fort Bikaner",
    relatedRoutes: ["jodhpur-to-jaisalmer-taxi", "jodhpur-to-jaipur-taxi"],
    seo: {
      title: "Jodhpur to Bikaner Taxi | Marwad Cabs",
      description:
        "Book an AC cab from Jodhpur to Bikaner via NH-62. Stop at Karni Mata Deshnok Rat Temple on the way. Clean cars, transparent billing, starting from Rs 3,800.",
    },
    faqs: [
      {
        q: "What is the driving time from Jodhpur to Bikaner?",
        a: "The 250 km takes about 4.5 hours on NH-62, with a tea halt near Nagaur and the stop at Deshnok Rat Temple.",
      },
      {
        q: "Is a stop at Karni Mata Temple in Deshnok included?",
        a: "Yes. Deshnok is on the highway 30 km south of Bikaner, and the driver waits for your darshan with no extra kilometre charge.",
      },
      {
        q: "What are the one-way fares for this trip?",
        a: "One-way drops start at ₹3,800 in an AC Sedan and ₹5,200 in an AC Innova. Tolls are paid as per actual FASTag receipts.",
      },
    ],
  },
  {
    slug: "jodhpur-to-pushkar-taxi",
    from: "Jodhpur",
    to: "Pushkar",
    distanceKm: 215,
    durationHours: 4.0,
    tagline: "Sacred Lake & Lord Brahma Temple",
    startingFare: 3300,
    highlights: [
      "Jagatpita Brahma Mandir (World's Rarest)",
      "52 Sacred Ghats around Pushkar Lake",
      "Optional halt at Merta City Meera Bai Temple",
      "Savitri Devi Temple Ropeway Views",
    ],
    intro:
      "Pushkar is 215 km east of Jodhpur via Bilara, Jaitaran, and Beawar (or via Merta City). Tucked in a valley between the Nag Pahar hills, it is known for the 52 bathing ghats of Pushkar Sarovar and the 14th-century temple of Lord Brahma.",
    body: [
      "The highway run from Jodhpur is smooth and well-maintained. If you are interested in devotional history, take the Merta City route and stop at the Meera Bai Smarak temple before continuing across the hills into Pushkar.",
      "Cars are not allowed near the central ghats. The driver parks in the outer lot and gets you an e-rickshaw to Brahma Temple or your lakeside hotel, so you are not walking with luggage in the midday heat.",
    ],
    image: "/images/routes/jodhpur-to-pushkar-taxi.jpg",
    imageAlt: "Marwad Cabs taxi on the highway approaching Pushkar valley",
    relatedRoutes: ["jodhpur-to-jaipur-taxi", "jodhpur-to-ajmer-taxi"],
    seo: {
      title: "Jodhpur to Pushkar Taxi | Marwad Cabs",
      description:
        "Book a Jodhpur to Pushkar cab for holy lake darshan and Brahma Temple visit. 4-hour smooth highway ride. Fares from Rs 3,300. WhatsApp quote.",
    },
    faqs: [
      {
        q: "How long does a cab take from Jodhpur to Pushkar?",
        a: "The 215 km drive takes just under 4 hours via NH-25. It is an easy half-day run with dhabas along the way.",
      },
      {
        q: "Can the taxi enter Pushkar market near the lake?",
        a: "Cars are restricted inside the market and Brahma Temple zone. The driver drops you at the nearest gate and arranges a local e-rickshaw for your luggage.",
      },
      {
        q: "What is the fare for Jodhpur to Pushkar?",
        a: "One-way fares start at ₹3,300 for an AC Dzire or Etios sedan, and ₹4,600 for an Ertiga or Innova, with toll receipts provided at drop.",
      },
    ],
  },
  {
    slug: "jodhpur-to-ranakpur-taxi",
    from: "Jodhpur",
    to: "Ranakpur",
    distanceKm: 165,
    durationHours: 3.5,
    tagline: "1444 Carved Marble Pillars in the Forest",
    startingFare: 3200,
    highlights: [
      "Chaumukha Temple with 1444 hand-carved pillars",
      "Bullet Baba Dham (Om Banna) on highway",
      "Scenic foothills of the Western Aravallis",
      "Same-day heritage round trip",
    ],
    intro:
      "Ranakpur is 165 km south of Jodhpur near Sadri in Pali district. Set in the green Aravalli hills, the 15th-century Chaumukha Jain Temple is carved white marble throughout, and no two of its 1,444 pillars share the same design.",
    body: [
      "The drive leaves Jodhpur on NH-62 and stops after 50 km at Om Banna (Bullet Baba Temple), where highway travellers stop to pray for a safe journey. From Pali the road turns into countryside stretches through Falna and Bali toward Ranakpur.",
      "Non-Jain visitors are admitted to Ranakpur Temple only between 12:00 PM and 5:00 PM, so we leave Jodhpur between 9:00 AM and 9:30 AM to reach the gates as those hours begin. Audio guides are available at the counter, and the driver waits in the shaded parking.",
    ],
    image: "/images/routes/jodhpur-to-ranakpur-taxi.jpg",
    imageAlt: "Marwad Cabs sedan waiting near Ranakpur Jain Temple complex",
    relatedRoutes: ["jodhpur-to-udaipur-taxi", "jodhpur-to-mount-abu-taxi"],
    seo: {
      title: "Jodhpur to Ranakpur Taxi | Marwad Cabs",
      description:
        "Day trip taxi from Jodhpur to Ranakpur Jain Temple (1444 carved marble pillars). Temple opens 12 PM for tourists. Om Banna halt included. Return fare Rs 3,200.",
    },
    faqs: [
      {
        q: "What is the tourist timing at Ranakpur Jain Temple?",
        a: "The temple is reserved for Jain pilgrims in the morning and opens to all tourists from 12:00 PM to 5:00 PM daily. We time the departure from Jodhpur to suit that.",
      },
      {
        q: "What does the same-day return package to Ranakpur cost?",
        a: "A same-day return trip from Jodhpur to Ranakpur is ₹3,200 in an AC Sedan and ₹4,400 in an Innova, including waiting time at both Om Banna and Ranakpur.",
      },
      {
        q: "Is there a dress code inside Ranakpur Temple?",
        a: "Yes. Shoulders and knees must be covered, and leather items (belts, wallets, shoes) go into the lockers outside the sanctum.",
      },
    ],
  },
  {
    slug: "jodhpur-to-ajmer-taxi",
    from: "Jodhpur",
    to: "Ajmer",
    distanceKm: 205,
    durationHours: 3.75,
    tagline: "Holy Dargah Sharif & Ana Sagar Lake",
    startingFare: 3200,
    highlights: [
      "Hazrat Khwaja Moinuddin Chishti Dargah",
      "Ana Sagar Lake & Marble Baradari Pavilions",
      "Adhai Din Ka Jhonpra Historical Mosque",
      "Direct 4-lane expressway connectivity",
    ],
    intro:
      "Ajmer is 205 km east of Jodhpur along NH-25, at the foot of Taragarh Fort. The Dargah Sharif of Hazrat Khwaja Moinuddin Chishti draws pilgrims of all faiths, and there are easy walks by Ana Sagar Lake as well.",
    body: [
      "The highway from Jodhpur to Ajmer is a clean 4-lane stretch via Bilara and Beawar with few bottlenecks. The drive takes around 3 hours 45 minutes, with dhabas along the way for breakfast or a tea break.",
      "The lanes around Dargah Bazaar are packed with pedestrians, so the driver drops you at the nearest point cars can reach (Delhi Gate or Railway Station parking) and helps you get an auto-rickshaw with your luggage to the Dargah entrance.",
    ],
    image: "/images/routes/jodhpur-to-ajmer-taxi.jpg",
    imageAlt: "Marwad Cabs taxi on the highway to Ajmer Sharif",
    relatedRoutes: ["jodhpur-to-jaipur-taxi", "jodhpur-to-pushkar-taxi"],
    seo: {
      title: "Jodhpur to Ajmer Sharif Taxi | Marwad Cabs",
      description:
        "Book a direct Jodhpur to Ajmer taxi for Dargah Sharif ziyarat & Ana Sagar Lake. 3.5 hour drive on NH-25. One-way fares from Rs 3,200. Clear tax receipts.",
    },
    faqs: [
      {
        q: "Can the taxi drive directly to the Dargah Sharif gate in Ajmer?",
        a: "Cars cannot enter the narrow Dargah Bazaar. The driver parks at the nearest lot and helps you get an auto-rickshaw to the gate.",
      },
      {
        q: "What is the one-way fare from Jodhpur to Ajmer?",
        a: "One-way drops start at ₹3,200 in an AC Sedan and ₹4,500 in an Innova Crysta. All toll charges are billed at actual FASTag receipt value.",
      },
      {
        q: "Can we combine Ajmer Dargah and Pushkar in one trip?",
        a: "Yes. Pushkar is only 14 km from Ajmer across the hill pass, and we can add it to your Ajmer trip for the extra distance.",
      },
    ],
  },
];

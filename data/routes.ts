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
      "Jaisalmer is a 285-km desert drive west from Jodhpur on the smooth NH-125 and NH-11 tarmac passing Agolai, Balesar, Dechu, and Pokhran. Marwad Cabs provides clean AC sedans, Ertigas, and Innova Crystas with drivers who know where to take clean washroom breaks and which dhabas serve fresh hot rotis.",
    body: [
      "The highway leaves the rocky outskirts of Jodhpur and opens into wide desert terrain. We offer an optional 30-minute sightseeing halt at Pokhran Fort or the revered Baba Ramdevra Temple (Runicha Dham), located just 12 km off the main highway corridor. You travel without rush, and the driver stays on the main asphalt without taking rough shortcuts.",
      "Tell us in advance whether your booking is for a city hotel inside Jaisalmer or directly to the desert camps at Sam Sand Dunes or Khuri. Sam is located 42 km further west of Jaisalmer city, and we calculate the exact kilometre rate upfront so there is zero confusion or argument at drop-off time.",
    ],
    image: "/images/routes/jodhpur-to-jaisalmer-taxi.jpg",
    imageAlt: "Marwad Cabs taxi on the NH-11 desert highway to Jaisalmer",
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-bikaner-taxi"],
    seo: {
      title: "Jodhpur to Jaisalmer Taxi | Marwad Cabs",
      description:
        "Book a direct Jodhpur to Jaisalmer cab with Marwad Cabs. Clean AC Dzire, Ertiga & Crysta. One-way from Rs 4,200, round-trip Rs 10/km. Free halt at Pokhran Fort.",
    },
    faqs: [
      {
        q: "What is the driving time from Jodhpur to Jaisalmer?",
        a: "The 285 km highway drive takes roughly 4.5 to 5 hours on NH-125 and NH-11. If you add halts at Pokhran Fort or Ramdevra Temple, add 45 to 60 minutes.",
      },
      {
        q: "Do you drop passengers directly at Sam Sand Dunes desert camps?",
        a: "Yes. Sam Dunes is 42 km west of Jaisalmer city. Inform us while booking whether your drop is in the city or the desert dunes so we quote the correct distance.",
      },
      {
        q: "What are the toll and driver charges for this route?",
        a: "Tolls on the Jodhpur–Jaisalmer stretch run through FASTag at actual government receipt value. Driver bhatta is ₹300/day for round trips, with no hidden night fees.",
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
      "Travelling from Jodhpur to Udaipur is one of Rajasthan's most popular road journeys. More than 90% of our travelers choose the scenic route via Pali, stopping at Bullet Baba Temple (Om Banna Dham), the intricately carved Ranakpur Jain Temple, and the UNESCO hill fortress of Kumbhalgarh before reaching the City of Lakes.",
    body: [
      "Ranakpur Jain Temple opens for non-Jain tourists at 12:00 PM and closes at 5:00 PM. We recommend a 8:30 AM or 9:00 AM departure from Jodhpur so you reach Ranakpur right as tourist entry begins. You can spend 90 unhurried minutes admiring the 1,444 uniquely hand-carved marble pillars while your driver waits in the designated shade parking lot.",
      "The drive between Ranakpur, Kumbhalgarh, and Udaipur crosses the winding Aravalli ghat passes. Our drivers are permanent local chauffeurs trained in mountain hairpins who never turn off the AC on steep uphill climbs. In Udaipur, we drop you directly at your lakeside hotel or arrange luggage transfer if staying in the old Bhatiyani Chohatta alleys.",
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
        a: "Yes. An 8:30 AM departure from Jodhpur allows visiting Ranakpur by 12:15 PM, driving 1.5 hours to Kumbhalgarh Fort by 3:00 PM, and reaching your Udaipur hotel by 7:30 PM.",
      },
      {
        q: "What is the fare difference between direct and via Ranakpur?",
        a: "The direct NH-62 / NH-58 route is 255 km (starting ₹4,000 for a sedan). The sightseeing route via Ranakpur and Kumbhalgarh adds about 70 km and is billed at ₹4,800 to ₹5,200 for a sedan.",
      },
      {
        q: "Which vehicle is best suited for the ghat curves?",
        a: "The Toyota Innova Crysta or Maruti Ertiga provides the most comfortable ride for families through the hilly hairpin bends between Desuri Ghat and Kelwara.",
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
      "Cultural Rajasthani Sunset Dinner",
    ],
    intro:
      "Osian is an ancient desert town located just 65 km north of Jodhpur via Mandore, Daijar, and Mathania Road on NH-62. Famous as the gateway to the Thar Desert and the birthplace of the Oswal Jain community, Osian offers 8th-century stone temple architecture combined with authentic dune safari experiences.",
    body: [
      "The ideal time to leave Jodhpur for an Osian day excursion is around 2:00 PM. The drive takes just 75 minutes on well-paved roads. Upon arrival, visit the Sachiya Mata Temple on the hillock and the Mahavira Jain Temple first while natural daylight is strong for photography.",
      "By 4:30 PM, your driver brings you to the Osian sand dunes for an exhilarating camel ride or 4x4 open-top jeep safari across the desert crests. Enjoy the sunset over the Thar horizon, folk music, and an authentic Marwari bajre ki roti meal at the camp before a calm drive back to Jodhpur by 9:30 PM.",
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
        a: "Yes. Bishnoi Village is south of Jodhpur and Osian is north. You can do Bishnoi Village in the morning (9 AM – 1 PM) and leave for Osian in the afternoon (2:30 PM – 9:30 PM).",
      },
      {
        q: "Do you arrange the camel and jeep safari tickets?",
        a: "We can connect you directly with reputable Osian desert camp operators for camel and jeep dune bashing at local un-inflated rates without middleman commissions.",
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
      "Clean family dhaba halts with hygienic food",
      "Direct drop at Jaipur Airport or City Hotels",
    ],
    intro:
      "Jaipur is a 335-km highway drive east from Jodhpur running through Bilara, Jaitaran, Beawar, Ajmer bypass, and Kishangarh. The highway is mostly a modern multi-lane corridor allowing a comfortable, predictable drive in under 6 hours with a prompt departure.",
    body: [
      "Leaving Jodhpur around 6:30 AM or 7:00 AM avoids market traffic and brings you to Jaipur before afternoon congestion near Ajmeri Gate or MI Road. The expressway features frequent clean fuel stations and family restaurants where drivers stop for hot tea and clean restrooms.",
      "Travelers often choose to add an optional 2-hour halt at Pushkar (Brahma Temple & Sacred Lake) or Ajmer Sharif Dargah along the way. We charge only for the extra detour distance at your car's standard per-kilometre rate, keeping your overall travel budget completely transparent.",
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
        a: "Yes. Our drivers know the airport departure terminal layout at Sanganer and drop you right at the entrance gate with plenty of time for check-in.",
      },
      {
        q: "How much extra is a stop at Pushkar or Ajmer on the way?",
        a: "A detour to Pushkar adds approximately 35 km to the route. We bill the extra distance at the standard per-km vehicle rate plus waiting time.",
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
      "28 km Uphill Ghat Climb with Active AC",
    ],
    intro:
      "Mount Abu is 265 km south of Jodhpur via Pali, Sirohi, and Abu Road on NH-62 and NH-27. As Rajasthan's only hill station, it offers a cool respite from desert heat, featuring the world-renowned Dilwara marble temples, peaceful boating on Nakki Lake, and viewpoints from Guru Shikhar.",
    body: [
      "The highway from Jodhpur to Abu Road is flat, fast 4-lane tarmac. From Abu Road, the journey transitions into a 28-km uphill mountain ghat climb with multiple hairpins. Unlike aggregator app drivers who turn off the AC to save fuel, Marwad Cabs chauffeurs keep your air conditioning running throughout the entire ascent.",
      "Dilwara Temples are open to non-Jains from 12:00 PM to 5:00 PM. We recommend reaching Mount Abu by noon so you can complete temple visits before enjoying an afternoon boat ride at Nakki Lake and watching the sunset from Honeymoon Point.",
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
        a: "Never. All our vehicles (Dzire, Ertiga, Crysta) are well-maintained with powerful cooling systems, and our drivers keep the AC running throughout the 28 km climb.",
      },
      {
        q: "What is the starting fare for Jodhpur to Mount Abu?",
        a: "One-way drops start at ₹4,200 for a sedan and ₹5,800 for an Innova. Round-trip bookings are billed at ₹10/km (Sedan) with a 250 km/day minimum floor.",
      },
      {
        q: "Are local sightseeing spots in Mount Abu covered in round trips?",
        a: "Yes. Round-trip bookings include Nakki Lake, Dilwara Jain Temples, Guru Shikhar, Achalgarh Fort, and Sunset Point within the daily kilometre limit.",
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
      "Same-day peaceful pilgrimage circuit",
    ],
    intro:
      "Nakoda Ji (Mewanagar near Balotra) is 115 km southwest of Jodhpur via Kalyanpur, Pachpadra, and Jasol. Dedicated to Shri Nakoda Bhairav and Parsvanath Bhagwan, it is one of Rajasthan's most sacred Jain pilgrimage destinations, drawing thousands of devotees for same-day darshan.",
    body: [
      "The drive from Jodhpur takes approximately 2 hours and 15 minutes across the Marwar plains. Our drivers are thoroughly familiar with temple darshan timings, Bhojanshala meal schedules, and puja timings, ensuring you arrive in time for morning or afternoon aarti without rush.",
      "Most pilgrims also combine their visit with darshan at Mata Rani Bhatiyani Mandir in Jasol (just 7 km from Nakoda) and the grand marble Brahma Temple in Asotra (12 km away). Our same-day return package covers this complete religious circuit with ample waiting time.",
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
        a: "Yes. Up to 4 hours of total waiting time for darshan, puja, and lunch at the temple Bhojanshala is included in the package price.",
      },
      {
        q: "Can the cab pick up directly from Jodhpur Railway Station early morning?",
        a: "Yes. We regularly pick up devotees arriving on overnight trains at Jodhpur Junction (Platform 1 or 2) and proceed straight to Nakoda Ji.",
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
      "Bikaner is 250 km north of Jodhpur along NH-62 via Khimsar, Nagaur, and Nokha. Known for its imposing un-conquered Junagarh Fort, red sandstone Rampuria havelis, and desert camel breeding farms, Bikaner is an essential pillar of the northern Rajasthan heritage route.",
    body: [
      "The road passes through flat Marwar scrubland. Exactly 30 km before reaching Bikaner city, the highway runs right past the renowned Karni Mata Temple in Deshnok (the Rat Temple). Our drivers automatically include a 45-minute halt at Deshnok for darshan before driving into Bikaner.",
      "Inside Bikaner, our drivers guide you directly to Junagarh Fort, the Camel Breeding Farm (open 2:00 PM to 6:00 PM), and famous sweet shops for authentic Bikaneri bhujia, rasgulla, and ghewar before dropping you at your heritage hotel or railway station.",
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
        a: "The 250 km journey takes approximately 4.5 hours on NH-62, including a brief tea halt near Nagaur and a stop at the Deshnok Rat Temple.",
      },
      {
        q: "Is a stop at Karni Mata Temple in Deshnok included?",
        a: "Yes. Deshnok is directly on the highway 30 km south of Bikaner, and our driver halts for your darshan at no extra kilometre charge.",
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
      "Pushkar is situated 215 km east of Jodhpur via Bilara, Jaitaran, and Beawar (or via Merta City). Tucked in a valley between the Nag Pahar hills, Pushkar is famous worldwide for the sacred 52 bathing ghats of Pushkar Sarovar and the revered 14th-century temple of Lord Brahma.",
    body: [
      "The highway run from Jodhpur is smooth and well-maintained. If you are interested in devotional history, you can opt for the Merta City route to visit the ancestral Meera Bai Smarak temple before continuing across the hills into Pushkar.",
      "Pushkar's central ghats are closed to all cars. Your driver parks safely in the designated outer parking lot and coordinates an e-rickshaw to take you directly to Brahma Temple or your lakeside hotel so you avoid walking in midday heat.",
    ],
    image: "/images/routes/jodhpur-to-pushkar-taxi.jpg",
    imageAlt: "Marwad Cabs taxi on the highway approaching Pushkar valley",
    relatedRoutes: ["jodhpur-to-jaipur-taxi", "jodhpur-to-ajmer-taxi"],
    seo: {
      title: "Jodhpur to Pushkar Taxi | Marwad Cabs",
      description:
        "Book a Jodhpur to Pushkar cab for holy lake darshan and Brahma Temple visit. 4-hour smooth highway ride. Fares from Rs 3,300. Instant WhatsApp quote.",
    },
    faqs: [
      {
        q: "How long does a cab take from Jodhpur to Pushkar?",
        a: "The 215 km drive takes just under 4 hours via NH-25. It is an easy half-day drive with clean highway dhabas along the way.",
      },
      {
        q: "Can the taxi enter Pushkar market near the lake?",
        a: "Cars are restricted inside the market and Brahma Temple zone. Our driver drops you at the nearest gate and arranges a quick local e-rickshaw for your luggage.",
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
      "Same-day tranquil heritage return trip",
    ],
    intro:
      "Ranakpur is located 165 km south of Jodhpur near Sadri in Pali district. Surrounded by the dense green hills of the Aravalli range, the 15th-century Chaumukha Jain Temple is a masterpiece of light and carved white marble, where no two pillars share the same design.",
    body: [
      "The drive leaves Jodhpur on NH-62, stopping after 50 km at Om Banna (Bullet Baba Temple), a cultural phenomenon where thousands of highway travelers offer prayers for safe journeys. From Pali, the road branches into countryside tracks through Falna and Bali toward Ranakpur.",
      "Non-Jain visitors are admitted to Ranakpur Temple only between 12:00 PM and 5:00 PM. We schedule your departure from Jodhpur between 9:00 AM and 9:30 AM so you reach the gates as tourist hours begin. Audio guides are available at the counter, and your driver waits in the quiet shaded parking area.",
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
        a: "The temple is reserved for Jain pilgrims in the morning and opens to all tourists strictly from 12:00 PM to 5:00 PM daily. We time your departure accordingly.",
      },
      {
        q: "What does the same-day return package to Ranakpur cost?",
        a: "A same-day return trip from Jodhpur to Ranakpur is ₹3,200 in an AC Sedan and ₹4,400 in an Innova, including waiting time at both Om Banna and Ranakpur.",
      },
      {
        q: "Is there a dress code inside Ranakpur Temple?",
        a: "Yes. Shoulders and knees must be covered. Leather items (belts, wallets, shoes) must be deposited in the secure lockers outside the sanctum.",
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
      "Ajmer is 205 km east of Jodhpur along NH-25, located at the foot of Taragarh Fort. A world-famous Sufi pilgrimage center, Ajmer draws pilgrims of all faiths to the Dargah Sharif of Hazrat Khwaja Moinuddin Chishti, alongside scenic walks by Ana Sagar Lake.",
    body: [
      "The highway from Jodhpur to Ajmer is a clean 4-lane stretch via Bilara and Beawar with minimal bottlenecks. The drive takes around 3 hours and 45 minutes, with clean roadside dhabas for breakfast or refreshments.",
      "Because roads around Dargah Bazaar are crowded pedestrian lanes, our driver drops you at the nearest vehicle access point (Delhi Gate or Railway Station parking) and arranges a trusted local auto-rickshaw to carry you and your luggage to the Dargah entrance.",
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
        a: "Cars cannot enter the narrow Dargah Bazaar. Our driver parks safely at the nearest authorized lot and assists you in getting an auto-rickshaw to the gate.",
      },
      {
        q: "What is the one-way fare from Jodhpur to Ajmer?",
        a: "One-way drops start at ₹3,200 in an AC Sedan and ₹4,500 in an Innova Crysta. All toll charges are billed at actual FASTag receipt value.",
      },
      {
        q: "Can we combine Ajmer Dargah and Pushkar in one trip?",
        a: "Yes. Pushkar is only 14 km from Ajmer across the hill pass. We can add Pushkar to your Ajmer trip for a nominal extra distance charge.",
      },
    ],
  },
];

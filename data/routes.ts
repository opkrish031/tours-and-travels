// DUMMY DATA: replace with client data before launch
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
    slug: "jodhpur-to-jaipur-taxi",
    from: "Jodhpur",
    to: "Jaipur",
    distanceKm: 340,
    durationHours: 5.5,
    tagline: "The Pink City",
    startingFare: 3740,
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Nahargarh"],
    intro:
      "Jaipur is a long but easy day's drive from Jodhpur. The highway runs northeast across open country, and our drivers know where to stop for chai and a stretch. You reach the Pink City in one comfortable stretch, whether your plan is the Amber Fort, a wedding, or a flight from Jaipur airport.",
    body: [
      "The Jodhpur to Jaipur road runs northeast through Nagaur and Kuchaman, mostly smooth highway with long straight sections. Mornings are the calmest time to leave; an early start puts you in Jaipur before the evening rush. Between the towns the land is dry and open, with dhabas for chai every few kilometres. In the monsoon the fields turn green and the air clears. We take one short break on the way so the drive never feels long, and we keep the car quiet for the whole stretch.",
      "Jaipur rewards an unhurried arrival. Share your hotel name before you start; the lanes around Hawa Mahal and Johari Bazaar are narrow and busy by afternoon, and the driver will drop you at the gate rather than drive in circles. Amber Fort opens early, so reaching the city by mid-morning suits a first visit. Nahargarh holds the best late-afternoon light over the old pink blocks. On the drive back, break once for tea from a highway kitchen, then settle in for the last stretch home.",
    ],
    image: "/images/routes/jodhpur-to-jaipur-taxi.jpg",
    imageAlt: "Taxi on the highway approaching Jaipur with the old city in view",
    relatedRoutes: ["jodhpur-to-pushkar-taxi", "jodhpur-to-ajmer-taxi"],
    seo: {
      title: "Jodhpur to Jaipur Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Jaipur taxi with Marwar Cabs. Clean cars, trained drivers, fares from Rs 3,740. Share your dates on WhatsApp for a clear estimate.",
    },
    faqs: [
      {
        q: "When should I book the Jodhpur to Jaipur taxi?",
        a: "Fix your date and share it a few days ahead. Weekends and the wedding season run busy, so an earlier message gives you more choice of car and pickup time.",
      },
      {
        q: "What does the starting fare cover?",
        a: "It covers the car and driver for the run to Jaipur. Tolls and state entry tax are charged as per actual receipts. Share your pickup area and stops and we send a full estimate.",
      },
      {
        q: "Can Jaipur work as a same-day return?",
        a: "It can, if you leave early and keep one clear plan for the day. For Amber Fort plus the old city, an overnight stay is the more comfortable choice.",
      },
    ],
  },
  {
    slug: "jodhpur-to-jaisalmer-taxi",
    from: "Jodhpur",
    to: "Jaisalmer",
    distanceKm: 285,
    durationHours: 4.5,
    tagline: "The Golden City",
    startingFare: 3140,
    highlights: ["Jaisalmer Fort", "Patwon Ki Haveli", "Sam Sand Dunes", "Gadisar Lake"],
    intro:
      "Jaisalmer rises from the Thar like a sandstone mirage, and the drive out gets quieter with every kilometre. Our cars run the desert road in one stretch, with stops where the tea is good. Arrive in time for sunset on the fort ramparts, or leave early and reach the dunes before the light softens.",
    body: [
      "The road to Jaisalmer is a straight desert two-lane with wide shoulders and very little traffic after Pokhran. Start by mid-morning and you reach the city with hours of daylight left for the fort and the bazaar. Roadside dhabas serve simple meals between Jodhpur and Pokhran. Winters are the pleasant season for this drive; in summer the road bakes by noon, so we travel early or after four. Carry water even in December, and the golden fort appears long before you arrive.",
      "Spend the first evening on the fort walls or at Gadisar Lake, when the sandstone turns amber. Patwon Ki Haveli is best early, before tour groups fill the lane. For Sam Sand Dunes, plan the drive out at dusk and carry a scarf for the wind. Tell us your hotel in the old city; the lanes inside the fort are too tight for a car, so the driver drops you at the nearest gate. Book two nights if you can, since one night leaves the museum unseen.",
    ],
    image: "/images/routes/jodhpur-to-jaisalmer-taxi.jpg",
    imageAlt: "Taxi on the desert road leading into Jaisalmer near the fort",
    relatedRoutes: ["jodhpur-to-osian-taxi", "jodhpur-to-bikaner-taxi"],
    seo: {
      title: "Jodhpur to Jaisalmer Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Jaisalmer taxi with Marwar Cabs for the desert run. Comfortable cars, fares from Rs 3,140. Send your dates on WhatsApp for an estimate.",
    },
    faqs: [
      {
        q: "How far ahead should I book the Jaisalmer taxi?",
        a: "Send your dates once they are fixed. Winter weekends fill first, and an early message lets us hold the car class you want before the fleet is committed elsewhere.",
      },
      {
        q: "Is the listed fare a fixed price for the trip?",
        a: "It is the starting point for the route. The estimate depends on your pickup point, halts, and car class. Tolls and state entry tax are charged as per actual receipts.",
      },
      {
        q: "Can we break the drive at Osian?",
        a: "Yes, Osian sits on the way and makes a natural halt for the old temples and a meal. Tell us the stop when you book and we plan the timing around it.",
      },
    ],
  },
  {
    slug: "jodhpur-to-udaipur-taxi",
    from: "Jodhpur",
    to: "Udaipur",
    distanceKm: 260,
    durationHours: 5,
    tagline: "The City of Lakes",
    startingFare: 2860,
    highlights: ["City Palace", "Lake Pichola", "Saheliyon Ki Bari", "Sajjangarh"],
    intro:
      "Udaipur sits five hours south of Jodhpur, and the road climbs into the Aravallis before dropping down to the lakes. It is one of the prettiest drives in Rajasthan. Our cars make the run with a halt at Desuri for tea, so you reach the city by evening and walk to Lake Pichola while the light lasts.",
    body: [
      "The route leaves Jodhpur on a broad highway, then narrows as it enters the hills near Desuri. The tarmac is good throughout, with long curves through scrub and stone. Leaving after breakfast puts you in Udaipur around lunch, which leaves the afternoon for the City Palace, and lunch stops are easy to find near Desuri. October to March suits this drive best; the monsoon makes the Aravallis green but adds mist on the ghat sections. We keep a slow pace on the climbs and stop wherever you ask.",
      "Udaipur is best seen on foot once you arrive. The old city lanes around the ghats are narrow, so we drop you at your hotel rather than drive through them. Keep the first evening for Lake Pichola and the Gangaur Ghat steps. Saheliyon Ki Bari is calm in the morning, and Sajjangarh holds the sunset if the sky is clear. If you plan a day trip to Kumbhalgarh or Ranakpur, tell us before you arrive and we keep the same car.",
    ],
    image: "/images/routes/jodhpur-to-udaipur-taxi.jpg",
    imageAlt: "Taxi arriving in Udaipur near Lake Pichola at dusk",
    relatedRoutes: ["jodhpur-to-ranakpur-taxi", "jodhpur-to-mount-abu-taxi"],
    seo: {
      title: "Jodhpur to Udaipur Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Udaipur taxi with Marwar Cabs across the Aravalli hills. Fares from Rs 2,860. Share your pickup point on WhatsApp for an estimate.",
    },
    faqs: [
      {
        q: "When should I reserve the Udaipur car?",
        a: "Book as soon as your dates are fixed, especially for October to March. The hill section is driven in daylight whenever possible, so tell us your preferred start time.",
      },
      {
        q: "What is included in the starting fare?",
        a: "The car and driver for the run to Udaipur. Tolls and state entry tax are charged as per actual receipts. Add your hotel drop and any stops and we send one estimate.",
      },
      {
        q: "Is this route comfortable for elders?",
        a: "The highway is good and the hill stretch is short. We stop at Desuri whenever you want a break. Tell us about walking limits so we drop close to the hotel entrance.",
      },
    ],
  },
  {
    slug: "jodhpur-to-mount-abu-taxi",
    from: "Jodhpur",
    to: "Mount Abu",
    distanceKm: 265,
    durationHours: 5,
    tagline: "Rajasthan's hill station",
    startingFare: 2920,
    highlights: ["Nakki Lake", "Dilwara Temples", "Sunset Point", "Guru Shikhar"],
    intro:
      "Mount Abu is the only hill station in Rajasthan, and the climb to it starts soon after Sirohi. The drive takes about five hours, with the last stretch winding up through pine and teak. Our drivers take the hairpins slowly and stop at the viewpoints, so you reach Nakki Lake before the afternoon haze.",
    body: [
      "The road runs south on a divided highway past Luni and Sirohi, fast and level for most of the distance. From Sirohi it begins to climb, and the temperature drops a few degrees before you reach the plateau. The views open up on the way up, with the plains behind you. A late-morning start works well in winter; in summer, leave after breakfast to avoid the heat on the plains. The ghat section has many bends, so we drive it at a steady pace with a tea stop at the turn.",
      "Mount Abu is compact, and most sights sit within a short drive of Nakki Lake. Dilwara Temples open in the morning and deserve an unhurried hour; dress modestly and remove footwear at the entrance. Guru Shikhar is the highest point and takes about an hour round trip from town. Sunset Point is busy at dusk, so reach it early. The town has bakeries and cafes along the main road for a late breakfast. For the return, an early start puts you back in Jodhpur before dinner.",
    ],
    image: "/images/routes/jodhpur-to-mount-abu-taxi.jpg",
    imageAlt: "Taxi on the winding hill road to Mount Abu above the plains",
    relatedRoutes: ["jodhpur-to-udaipur-taxi", "jodhpur-to-ranakpur-taxi"],
    seo: {
      title: "Jodhpur to Mount Abu Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Mount Abu taxi with Marwar Cabs for the hill road. Fares from Rs 2,920. Send your dates on WhatsApp for a fare estimate.",
    },
    faqs: [
      {
        q: "Do I need to book the Mount Abu taxi early?",
        a: "A few days of notice is enough outside peak weeks. Plan a morning departure, since the ghat climb is easier in daylight and the town is calmer before noon.",
      },
      {
        q: "How is the fare on this route worked out?",
        a: "The starting fare covers the car and driver for the journey. Tolls and state entry tax are charged as per actual receipts, and we send an estimate once you share the pickup point.",
      },
      {
        q: "Is Mount Abu good for a short trip?",
        a: "Two nights suit the town well: Dilwara Temples, Nakki Lake, and Guru Shikhar without rushing. A same-day return is long but possible if you leave Jodhpur early.",
      },
    ],
  },
  {
    slug: "jodhpur-to-pushkar-taxi",
    from: "Jodhpur",
    to: "Pushkar",
    distanceKm: 190,
    durationHours: 3.5,
    tagline: "The sacred lake town",
    startingFare: 2090,
    highlights: ["Pushkar Lake", "Brahma Temple", "Savitri Temple", "the old bazaar"],
    intro:
      "Pushkar is a short, easy run from Jodhpur, about three and a half hours across the desert edge to the Aravalli foothills. The town is small enough to walk in an afternoon. We drop you close to your hotel, since the lanes near the ghats are foot-only. Come for the lake at dawn and the quiet bazaar after dark.",
    body: [
      "The highway to Pushkar runs through Nagaur district and then turns south toward Ajmer, with the road improving as you go. Three and a half hours is an easy stretch, and the edges of Ajmer are close enough to pair the two towns in one trip. Leave after breakfast and you arrive for lunch. The best months are October to March, when the mornings are cool enough to walk the ghats. During the Pushkar Fair the town fills, so book rooms and the car well ahead.",
      "The Brahma Temple and the main ghats sit a few minutes apart, and the old bazaar runs between them with shops selling silver, leather, and dried fruit. Savitri Temple takes a ropeway or a climb, and the view is worth either. Mornings at Pushkar Lake are calm before the crowds. If you arrive by evening, walk the perimeter of the lake once and settle in early. Dress for the temple visit, since footwear stays outside. We can keep the car for a same-day return or hold it overnight.",
    ],
    image: "/images/routes/jodhpur-to-pushkar-taxi.jpg",
    imageAlt: "Taxi near the ghats of Pushkar Lake in the morning light",
    relatedRoutes: ["jodhpur-to-ajmer-taxi", "jodhpur-to-jaipur-taxi"],
    seo: {
      title: "Jodhpur to Pushkar Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Pushkar taxi with Marwar Cabs for an easy three and a half hour drive. Fares from Rs 2,090. Ask for an estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "When should I reserve the Pushkar taxi?",
        a: "Regular dates need only a few days of notice. Around the Pushkar Fair the town and the cars fill together, so book rooms and the taxi in the same week.",
      },
      {
        q: "Does the fare cover everything on the way?",
        a: "The starting fare covers the car and driver for the route. Tolls and state entry tax are charged as per actual receipts. Send your pickup area and we send one estimate.",
      },
      {
        q: "Can we add Ajmer the same day?",
        a: "Yes, Pushkar and Ajmer sit close together and pair well in one day. Tell us the order you want and we keep the same car from Jodhpur and back.",
      },
    ],
  },
  {
    slug: "jodhpur-to-ajmer-taxi",
    from: "Jodhpur",
    to: "Ajmer",
    distanceKm: 200,
    durationHours: 3.5,
    tagline: "Heritage and faith",
    startingFare: 2200,
    highlights: ["Ajmer Sharif Dargah", "Ana Sagar Lake", "Adhai Din Ka Jhonpra"],
    intro:
      "Ajmer sits between the Aravalli hills and draws visitors for the Ajmer Sharif Dargah and Ana Sagar Lake. The drive from Jodhpur takes about three and a half hours on good highway. Leave after breakfast, reach by lunch, and keep the afternoon for the shrine and the lakefront, with the car waiting nearby.",
    body: [
      "The Jodhpur to Ajmer road is a wide, fast highway for most of the way, with light traffic outside the town limits. It suits an early start; you reach Ana Sagar by late morning and the dargah after the lunch rush. There are dhabas along the way for a short halt and a plate of dal-bati. Winter is the comfortable season. The road runs busy near Kishangarh in the evenings, so we leave Jodhpur in the morning and carry a scarf for the shrine visit.",
      "The Ajmer Sharif Dargah is busiest in the evening and after prayers; go with your shoes off and your head covered, and keep phones tucked away. Ana Sagar Lake has a promenade and a boat ride, best in the last light. Adhai Din Ka Jhonpra sits on the edge of town and takes an hour to walk through. Photography rules vary inside the shrine. The market near the dargah sells dry fruit and attar. Tell us your return time and the car stays within reach.",
    ],
    image: "/images/routes/jodhpur-to-ajmer-taxi.jpg",
    imageAlt: "Taxi on the highway to Ajmer near Ana Sagar Lake",
    relatedRoutes: ["jodhpur-to-pushkar-taxi", "jodhpur-to-jaipur-taxi"],
    seo: {
      title: "Jodhpur to Ajmer Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Ajmer taxi with Marwar Cabs on a fast highway. Fares from Rs 2,200. Share your travel dates on WhatsApp for an estimate.",
    },
    faqs: [
      {
        q: "How soon should I confirm an Ajmer taxi?",
        a: "Share the date and pickup point as soon as plans settle. For an evening visit to the dargah, an earlier start from Jodhpur keeps the return unhurried.",
      },
      {
        q: "What does the listed fare include?",
        a: "The car and driver for the run to Ajmer. Tolls and state entry tax are charged as per actual receipts. A return trip or extra waiting is priced once you share the plan.",
      },
      {
        q: "Is the trip suitable for a family dargah visit?",
        a: "Yes. The highway is straightforward and the drop can sit close to the shrine. Tell us if elders are travelling, so we plan the stop and the walking distance for them.",
      },
    ],
  },
  {
    slug: "jodhpur-to-bikaner-taxi",
    from: "Jodhpur",
    to: "Bikaner",
    distanceKm: 250,
    durationHours: 4,
    tagline: "Fort and desert town",
    startingFare: 2750,
    highlights: ["Junagarh Fort", "Karni Mata Temple", "Lalgarh Palace"],
    intro:
      "Bikaner is a straight run north from Jodhpur, about four hours on a wide desert highway. The city is calmer than Jaipur or Udaipur, with fort time that does not need queuing. We start in the morning and reach before lunch, leaving the afternoon for Junagarh Fort, Karni Mata Temple, and Lalgarh Palace.",
    body: [
      "The highway north runs level and empty, with fields giving way to scrub as you approach Bikaner. Leaving Jodhpur at seven puts you at the hotel by eleven or so. The traffic thins after the first hour, and the driver can hold a steady pace. Sri Dungargarh has dhabas for a short halt. The road is monsoon-green for a few weeks each year and dusty the rest of the time, so windows up helps. Winter mornings are cold on this stretch; keep a jacket in the car.",
      "Junagarh Fort is the highlight and needs two unhurried hours; unlike many Rajasthan forts it sits on the plain, so there is no climb. Karni Mata Temple at Deshnok lies on the highway north of Jodhpur, so it fits as a halt without a long detour, and it is known for the rats that live inside the shrine. Lalgarh Palace has a museum. Book the morning for Junagarh, keep the afternoon for the palace, and leave the old bazaar for namkeen and leather work.",
    ],
    image: "/images/routes/jodhpur-to-bikaner-taxi.jpg",
    imageAlt: "Taxi on the desert highway north of Jodhpur toward Bikaner",
    relatedRoutes: ["jodhpur-to-jaipur-taxi", "jodhpur-to-jaisalmer-taxi"],
    seo: {
      title: "Jodhpur to Bikaner Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Bikaner taxi with Marwar Cabs for the desert drive north. Fares from Rs 2,750. Send your dates on WhatsApp for an estimate.",
    },
    faqs: [
      {
        q: "When is a good time to book the Bikaner car?",
        a: "A few days of notice covers most dates. An early departure puts you in Bikaner before lunch, which leaves the whole afternoon for Junagarh Fort and the palace museum.",
      },
      {
        q: "Is the starting fare final for this route?",
        a: "It is the starting point rather than a fixed quote. The estimate depends on your pickup area and car class, and tolls and state entry tax are charged as per actual receipts.",
      },
      {
        q: "Can we stop at Deshnok on the way?",
        a: "Yes, Deshnok sits on the highway north of Jodhpur, so Karni Mata Temple works as an outbound halt without a detour. Tell us when you book and we fit it into the day.",
      },
    ],
  },
  {
    slug: "jodhpur-to-ranakpur-taxi",
    from: "Jodhpur",
    to: "Ranakpur",
    distanceKm: 165,
    durationHours: 3,
    tagline: "Marble temples",
    startingFare: 1820,
    highlights: ["Ranakpur Jain Temple", "Kumbhalgarh Fort (nearby)", "Aravalli drive"],
    intro:
      "Ranakpur lies in the Aravalli hills about three hours from Jodhpur, on the road south toward Udaipur. The Jain temple complex is the reason to go: carved marble, many columns, and a quiet courtyard. Leave after breakfast, reach by lunch, and give the temple an hour and a half before you continue or turn back.",
    body: [
      "The road leaves the Jodhpur plains and climbs through scrub hills, with stone quarries and small villages along the way. It is a two-lane road for the last stretch, with curves that reward a slow pace. Morning travel gives the best light inside the temple and keeps you out of the midday sun on the return. The Aravalli scenery changes with the season, dry and pale in summer, green after the rains. We stop at the viewpoint before the descent if you like.",
      "The Ranakpur Jain temple is dedicated to Adinatha and holds a forest of marble columns, no two alike in the carving. Photography is restricted in parts of the complex, and footwear stays at the entrance. Dress modestly and keep voices low in the main shrine. There is a small food stall near the gate, but lunch is better planned in Desuri or back on the highway. If you are continuing to Udaipur, the temple sits almost on the way and adds an easy hour.",
    ],
    image: "/images/routes/jodhpur-to-ranakpur-taxi.jpg",
    imageAlt: "Taxi parked near the Ranakpur Jain temple in the Aravalli hills",
    relatedRoutes: ["jodhpur-to-udaipur-taxi", "jodhpur-to-mount-abu-taxi"],
    seo: {
      title: "Jodhpur to Ranakpur Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Ranakpur taxi with Marwar Cabs to see the carved Jain temple. Fares from Rs 1,820. Share your dates on WhatsApp for an estimate.",
    },
    faqs: [
      {
        q: "How do I book the Ranakpur temple trip?",
        a: "Send the date and whether you want a same-day return or a drop to Udaipur. We confirm the car class and the estimate before the pickup, so the day is settled in advance.",
      },
      {
        q: "What does the fare cover for Ranakpur?",
        a: "The car and driver for the route from Jodhpur. Tolls and state entry tax are charged as per actual receipts. Temple entry is separate, and waiting time is agreed when you book.",
      },
      {
        q: "Do travellers combine Ranakpur with Udaipur?",
        a: "Often, since the temple sits on the road to Udaipur. Many stop for an hour and continue; others prefer the car to bring them back to Jodhpur by evening.",
      },
    ],
  },
  {
    slug: "jodhpur-to-osian-taxi",
    from: "Jodhpur",
    to: "Osian",
    distanceKm: 65,
    durationHours: 1.25,
    tagline: "Desert temples",
    startingFare: 720,
    highlights: ["Sachiya Mata Temple", "Osian Jain temples", "dune safari"],
    intro:
      "Osian is an easy hour from Jodhpur, an ancient oasis town with Jain and Sachiya Mata temples rising from the sand. It works as a short half-day trip or as the first stop on the road to Jaisalmer. Leave after breakfast, walk the temples in the morning cool, and be back for lunch, or continue west.",
    body: [
      "The highway west from Jodhpur is flat and fast, with sand on either side and little traffic once you leave the city. The drive takes about an hour and a quarter, so an early start means you walk the temples before the heat sets in. October to March is the comfortable season; summer days are harsh on open ground. The road is straight enough for an easy pace, and dhabas near Osian serve a late breakfast if you leave on an empty stomach.",
      "Sachiya Mata Temple sits on a hill and needs a climb of several minutes; the view over the sand repays it. The Jain temples below are older and calmer, with carved ceilings that deserve a slow look. A guide at the gate can walk you through the history if you want company. Some visitors add a short dune safari outside town in the late afternoon. Keep the trip to half a day, or pair Osian with Jaisalmer and drive on after lunch.",
    ],
    image: "/images/routes/jodhpur-to-osian-taxi.jpg",
    imageAlt: "Taxi on the sand-lined road to the temples at Osian",
    relatedRoutes: ["jodhpur-to-jaisalmer-taxi", "jodhpur-to-ajmer-taxi"],
    seo: {
      title: "Jodhpur to Osian Taxi | Marwar Cabs",
      description:
        "Book a Jodhpur to Osian taxi with Marwar Cabs for the old desert temples. Fares from Rs 720. Ask for a half-day estimate on WhatsApp.",
    },
    faqs: [
      {
        q: "Can Osian be a half-day trip?",
        a: "Yes. An early start gives you the temples and a dune stop, and you are back in Jodhpur by afternoon. The car returns on the same booking, so nothing extra to arrange.",
      },
      {
        q: "Is the listed fare one way or round trip?",
        a: "It covers the run from Jodhpur to Osian. If you want the car to wait and bring you back, tell us the hours you need and we add them to the estimate.",
      },
      {
        q: "Does Osian suit children and elders?",
        a: "The drive is short and level. Sachiya Mata Temple needs a climb, so younger children and elders can stay below with the car while the rest of the group goes up.",
      },
    ],
  },
];

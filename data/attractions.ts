export type Attraction = {
  slug: string;
  name: string;
  blurb: string;
  imageAlt: string;
};

export const attractions: Attraction[] = [
  {
    slug: "mehrangarh-fort",
    name: "Mehrangarh Fort",
    blurb:
      "Open 9:00 AM – 5:00 PM. Towering 400 feet above Jodhpur's blue skyline, with an elevator up to the top courtyard. We park at the upper lot so you can leave without walking back down the ramp.",
    imageAlt: "Mehrangarh Fort sandstone ramparts towering over Jodhpur city",
  },
  {
    slug: "jaswant-thada",
    name: "Jaswant Thada",
    blurb:
      "Open 9:00 AM – 5:00 PM. The white marble memorial of Maharaja Jaswant Singh II, 1 km downhill from Mehrangarh. Best done straight after the fort, before the midday heat.",
    imageAlt: "Carved white marble cenotaph of Jaswant Thada by the lake in Jodhpur",
  },
  {
    slug: "umaid-bhawan-palace",
    name: "Umaid Bhawan Palace Museum",
    blurb:
      "Open 9:00 AM – 5:00 PM. Built of golden Chittar sandstone, with the royal vintage cars on display. Only the museum wing is open to visitors — the hotel and private residence wings stay closed.",
    imageAlt: "Golden sandstone dome and facade of Umaid Bhawan Palace Museum Jodhpur",
  },
  {
    slug: "mandore-gardens",
    name: "Mandore Gardens",
    blurb:
      "Open 8:00 AM – 8:00 PM, gardens free to enter. Has the red sandstone royal cenotaphs (Dewals) of the Marwar rulers, the rock-carved Hall of Heroes, and langur monkeys about.",
    imageAlt: "Historic red sandstone royal cenotaphs surrounded by green lawns at Mandore Gardens",
  },
  {
    slug: "toorji-ka-jhalra",
    name: "Toorji Ka Jhalra & Clock Tower",
    blurb:
      "Best 4:30 PM – 7:30 PM. Restored 18th-century stepwell near Sardar Market. Walk the spice and handicraft lanes, then have Makhaniya Lassi at Shri Mishrilal and hot Mirchi Bada at Janta Sweet Home.",
    imageAlt: "Carved geometric stone steps of Toorji Ka Jhalra stepwell in Jodhpur old city",
  },
  {
    slug: "kaylana-lake",
    name: "Kaylana Lake & Machia Park",
    blurb:
      "Open 8:30 AM – 6:00 PM (Machia Park closed Tuesdays). Sunset point on Jaisalmer Bypass Road, with boat rides on the water and desert hills all around.",
    imageAlt: "Sunset reflections over the rocky shores of Kaylana Lake near Jodhpur",
  },
];

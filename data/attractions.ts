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
      "Open 9:00 AM – 5:00 PM. Towering 400 feet above Jodhpur's blue skyline. Elevator available to top courtyard. Our driver parks at the upper parking lot for easy, cool exit without steep ramp walking.",
    imageAlt: "Mehrangarh Fort sandstone ramparts towering over Jodhpur city",
  },
  {
    slug: "jaswant-thada",
    name: "Jaswant Thada",
    blurb:
      "Open 9:00 AM – 5:00 PM. The white marble memorial of Maharaja Jaswant Singh II, located just 1 km downhill from Mehrangarh. Best visited immediately after the fort before the midday desert heat sets in.",
    imageAlt: "Carved white marble cenotaph of Jaswant Thada by the lake in Jodhpur",
  },
  {
    slug: "umaid-bhawan-palace",
    name: "Umaid Bhawan Palace Museum",
    blurb:
      "Open 9:00 AM – 5:00 PM. Built of golden Chittar sandstone with royal vintage car collection included. Note: Only the museum wing is open to non-hotel visitors; hotel and private royal residence wings are strictly private.",
    imageAlt: "Golden sandstone dome and facade of Umaid Bhawan Palace Museum Jodhpur",
  },
  {
    slug: "mandore-gardens",
    name: "Mandore Gardens",
    blurb:
      "Open 8:00 AM – 8:00 PM with free entry to public landscaped gardens. Features high red sandstone royal cenotaphs (Dewals) of Marwar rulers, the rock-carved Hall of Heroes, and friendly langur monkeys.",
    imageAlt: "Historic red sandstone royal cenotaphs surrounded by green lawns at Mandore Gardens",
  },
  {
    slug: "toorji-ka-jhalra",
    name: "Toorji Ka Jhalra & Clock Tower",
    blurb:
      "Best visited 4:30 PM – 7:30 PM. Restored 18th-century stepwell near Sardar Market. Walk through the bustling spice and handicraft lanes, then taste legendary Makhaniya Lassi at Shri Mishrilal and hot Mirchi Bada at Janta Sweet Home.",
    imageAlt: "Carved geometric stone steps of Toorji Ka Jhalra stepwell in Jodhpur old city",
  },
  {
    slug: "kaylana-lake",
    name: "Kaylana Lake & Machia Park",
    blurb:
      "Open 8:30 AM – 6:00 PM (Machia Park closed Tuesdays). Beautiful sunset point located on Jaisalmer Bypass Road with peaceful boat rides and views of desert hills framing the water reservoir.",
    imageAlt: "Sunset reflections over the rocky shores of Kaylana Lake near Jodhpur",
  },
];

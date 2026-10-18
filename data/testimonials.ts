export type Testimonial = {
  quote: string;
  name: string;
  trip: string;
};

/**
 * Short trip notes from customers, anonymised. Edit only with real,
 * permissioned feedback — no invented names or made-up praise.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We booked an Innova Crysta for the five of us, six days covering Jodhpur, the Sam dunes and Udaipur. The driver knew the highway dhabas with decent washrooms, the roof carrier took all five suitcases, and the final bill matched what was quoted. Nothing extra was spring on us.",
    name: "Family of five, Bengaluru",
    trip: "Jodhpur – Jaisalmer – Udaipur, 6 days",
  },
  {
    quote:
      "I travelled solo Jodhpur to Udaipur with a stop at Ranakpur. The Etios was clean, the driver reached our Ratanada hotel before the agreed time, and he managed the ghat curves carefully without cutting the AC. He arranged a local auto at Pichola where cars can't go.",
    name: "Solo traveller, Kolkata",
    trip: "Jodhpur to Udaipur via Ranakpur, sedan",
  },
  {
    quote:
      "For our sister's wedding at Indana Palace we needed continuous airport runs over three days. They put together eight Crystas and two Tempo Travellers and tracked every incoming flight, so guests weren't standing around at JDH with bags.",
    name: "Wedding host, Jodhpur",
    trip: "Guest fleet, 3 days (Crystas & Tempo Travellers)",
  },
  {
    quote:
      "Same-day round trip to Osian for temple darshan and the desert in a Dzire. The driver waited through our temple visit and the desert dinner, and the quoted ₹1,800 was exactly what we paid — no fuel or waiting charges added later.",
    name: "Visitor from Delhi",
    trip: "Jodhpur–Osian day trip, AC sedan",
  },
];

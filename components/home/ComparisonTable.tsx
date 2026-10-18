import { Check, Minus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";

/**
 * Claims are limited to what the business controls (PRD 5.9): published rates,
 * written estimates, receipts for tolls, driver details before pickup. The
 * "other taxis" column describes common industry practice without asserting
 * specifics about any competitor.
 */
const rows = [
  {
    aspect: "Fare before the trip",
    us: "Estimate sent and confirmed before the car is assigned",
    them: "Often agreed only at the end of the ride",
  },
  {
    aspect: "Per-km rates",
    us: "Published for every car class on this site",
    them: "Rarely published; quoted per trip",
  },
  {
    aspect: "Tolls and state entry tax",
    us: "Charged as per actual receipts, shown separately",
    them: "Sometimes folded into a single number",
  },
  {
    aspect: "Driver details",
    us: "Name and number shared before pickup",
    them: "Usually unknown until the car arrives",
  },
  {
    aspect: "Same car for a multi-day trip",
    us: "One car and driver for the whole itinerary",
    them: "May change between legs",
  },
  {
    aspect: "Booking channel",
    us: "WhatsApp or phone, 24×7, with written confirmation",
    them: "Phone calls, often daytime only",
  },
] as const;

function Marker({ ok }: { ok: boolean }) {
  return ok ? (
    <Check aria-hidden="true" className="text-brass-deep h-4 w-4" strokeWidth={2} />
  ) : (
    <Minus aria-hidden="true" className="text-stone-light h-4 w-4" strokeWidth={2} />
  );
}

export function ComparisonTable() {
  return (
    <Section tone="sand" size="md">
      <SectionHeader
        number="10"
        eyebrow="The difference"
        title="Booked with us vs hailed on the street"
        description="What a written booking gives you that an ad-hoc car usually does not. Every claim in the Marwad Cabs column is something you can check on this site."
      />
      <div className="mt-10 md:mt-14">
        <Table
          caption="Comparison of Marwad Cabs booking practices against typical street-hail taxis"
          minWidth="42rem"
        >
          <thead>
            <tr>
              <th scope="col" className={thClass}>
                What matters
              </th>
              <th scope="col" className={thClass}>
                With Marwad Cabs
              </th>
              <th scope="col" className={thClass}>
                With a street-hail taxi
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.aspect}>
                <td className={`${tdClass} font-medium`}>{row.aspect}</td>
                <td className={tdClass}>
                  <span className="flex items-start gap-2.5">
                    <span className="mt-0.5">
                      <Marker ok />
                    </span>
                    <span>{row.us}</span>
                  </span>
                </td>
                <td className={`${tdClass} text-stone`}>
                  <span className="flex items-start gap-2.5">
                    <span className="mt-0.5">
                      <Marker ok={false} />
                    </span>
                    <span>{row.them}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p className="text-stone-light mt-5 max-w-[75ch] text-xs leading-relaxed">
        The right column describes common practice with unlicensed or ad-hoc taxis and
        does not refer to any specific operator. Individual drivers may differ.
      </p>
    </Section>
  );
}

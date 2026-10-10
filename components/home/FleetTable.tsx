import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { vehicles } from "@/data/vehicles";
import { formatRupees } from "@/lib/fare";

export function FleetTable() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="07"
        eyebrow="Compare the cars"
        title="Which class fits your trip"
        description="Capacity, luggage and rate side by side. The daily limit applies to round trips; one-way runs are billed on distance alone."
      />
      <div className="mt-10 md:mt-14">
        <Table
          caption="Vehicle classes compared by seats, luggage, rate and daily limit"
          minWidth="44rem"
        >
          <thead>
            <tr>
              <th scope="col" className={thClass}>
                Vehicle
              </th>
              <th scope="col" className={thClass}>
                Seats
              </th>
              <th scope="col" className={thClass}>
                Luggage
              </th>
              <th scope="col" className={thClass}>
                Per km
              </th>
              <th scope="col" className={thClass}>
                Daily limit
              </th>
              <th scope="col" className={thClass}>
                Best for
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.slug}>
                <td className={tdClass}>
                  <Link
                    href={`/${vehicle.slug}`}
                    className="hover:text-brass-deep font-medium transition-colors"
                  >
                    {vehicle.name}
                  </Link>
                </td>
                <td className={tdClass}>{vehicle.seats}</td>
                <td className={tdClass}>{vehicle.luggage}</td>
                <td className={tdClass}>{formatRupees(vehicle.perKm)}</td>
                <td className={tdClass}>{vehicle.dailyKmLimit} km</td>
                <td className={tdClass}>{vehicle.idealFor[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Section>
  );
}

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { vehicles } from "@/data/vehicles";
import { formatRupees } from "@/lib/fare";
import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";

export function FleetTable() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="07"
        eyebrow="Rate card"
        title="Compare rates by vehicle"
        description="Transparent side-by-side rates. Outstation billing is based on per-km rates with a standard 250 km/day minimum floor. Driver allowance is ₹300/day."
      />
      <div className="mt-8 md:mt-12">
        <Table
          caption="Marwad Cabs fleet compared by seats, luggage, per-km rate, local 8-hour package and driver bhatta"
          minWidth="54rem"
        >
          <thead>
            <tr>
              <th scope="col" className={thClass}>
                Vehicle Model
              </th>
              <th scope="col" className={thClass}>
                Capacity
              </th>
              <th scope="col" className={thClass}>
                Luggage
              </th>
              <th scope="col" className={thClass}>
                Outstation Rate
              </th>
              <th scope="col" className={thClass}>
                Local 8Hr / 80Km
              </th>
              <th scope="col" className={thClass}>
                Driver Bhatta
              </th>
              <th scope="col" className={thClass}>
                Direct Booking
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => {
              const waUrl = buildWhatsAppUrl(
                contextMessage(`Hi Marwad Cabs, I would like to book the ${vehicle.name}.`),
              );

              return (
                <tr key={vehicle.slug} className="hover:bg-snow/60 transition-colors">
                  <td className={tdClass}>
                    <Link
                      href={`/${vehicle.slug}`}
                      className="hover:text-gold font-bold transition-colors text-text"
                    >
                      {vehicle.name}
                    </Link>
                    <div className="text-[0.6875rem] text-text-muted mt-0.5">
                      {vehicle.models.join(", ")}
                    </div>
                  </td>
                  <td className={tdClass}>{vehicle.seats}</td>
                  <td className={tdClass}>{vehicle.luggage}</td>
                  <td className={tdClass}>
                    <span className="font-bold text-text">{formatRupees(vehicle.perKm)} / km</span>
                    <span className="block text-[0.6875rem] text-text-muted">(Min {vehicle.dailyKmLimit} km/day)</span>
                  </td>
                  <td className={tdClass}>
                    <span className="font-semibold text-emerald-700">
                      {vehicle.localPackages?.eightHours ?? "₹1,800"}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <span className="text-text-muted font-medium">
                      {vehicle.driverBhatta ?? "₹300/day"}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                    >
                      <MessageSquare className="h-3 w-3 fill-current" />
                      <span>Book</span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Section>
  );
}

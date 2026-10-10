import { Clock, Receipt, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: Clock, title: "Open 24×7", note: "Message or call any hour" },
  {
    icon: Wallet,
    title: "Fare before you confirm",
    note: "Estimate sent on WhatsApp first",
  },
  {
    icon: ShieldCheck,
    title: "Licensed drivers",
    note: "Commercial licence, shared before pickup",
  },
  { icon: Receipt, title: "Tolls per receipts", note: "State entry tax as per actual" },
] as const;

export function TrustStrip() {
  return (
    <section className="bg-umber text-paper">
      <Container>
        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`border-line-dark flex items-start gap-3.5 py-5 sm:py-6 ${
                index < items.length - 1 ? "border-b lg:border-b-0" : ""
              }`}
            >
              <item.icon
                aria-hidden="true"
                className="text-brass mt-0.5 h-5 w-5 shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-stone-light mt-0.5 text-xs leading-relaxed">
                  {item.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

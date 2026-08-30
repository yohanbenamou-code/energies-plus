import * as React from "react";
import { BadgeCheck, Clock, HandCoins, MapPin, Wrench } from "lucide-react";

const ITEMS = [
  { icon: HandCoins, label: "Financé par le dispositif public des CEE" },
  { icon: Wrench, label: "Posé par des professionnels" },
  { icon: BadgeCheck, label: "Matériel prévu pour durer 15 ans" },
  { icon: Clock, label: "Étude sous 48h" },
  { icon: MapPin, label: "Toute la France" },
] as const;

export function TrustBar() {
  return (
    <section
      aria-label="Points de réassurance"
      className="border-b border-border bg-secondary/50"
    >
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm">
        {ITEMS.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 font-medium text-foreground"
          >
            <item.icon className="h-4 w-4 shrink-0 text-accent-600" />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

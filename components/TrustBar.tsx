import * as React from "react";
import { BadgeCheck, Clock, MapPin, Sun, Wrench } from "lucide-react";

const ITEMS = [
  { icon: Sun, label: "Opération standardisée CEE n° AGRI-EQ-110" },
  { icon: BadgeCheck, label: "Panneaux certifiés IEC 61215 & IEC 61730" },
  { icon: Wrench, label: "Installation par des professionnels" },
  { icon: Clock, label: "Durée de vie 15 ans" },
  { icon: MapPin, label: "France entière" },
] as const;

export function TrustBar() {
  return (
    <section
      aria-label="Points de réassurance"
      className="border-b border-border bg-primary/5"
    >
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm">
        {ITEMS.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 font-medium text-foreground"
          >
            <item.icon className="h-4 w-4 shrink-0 text-primary" />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

import * as React from "react";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export function ServiceAreaSection() {
  return (
    <section
      id="zone"
      className="border-b border-border bg-secondary/40 py-16 sm:py-20"
    >
      <div className="container grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="Zone d'intervention"
            title="Partout en France métropolitaine"
            description="Solaire Energie intervient sur l'ensemble du territoire métropolitain, dans les zones climatiques H1, H2 et H3. La zone climatique influe directement sur le barème CEE applicable à votre projet."
          />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <ul className="space-y-3 text-[15px]">
            {[
              ["H1", "Nord, Est, zones montagneuses — climat le plus froid"],
              ["H2", "Façade atlantique, centre, Sud-Ouest"],
              ["H3", "Pourtour méditerranéen — climat le plus doux"],
            ].map(([zone, desc]) => (
              <li key={zone} className="flex items-start gap-3">
                <span className="inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  {zone}
                </span>
                <span className="text-muted-foreground">{desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Un doute sur votre zone ? Nos conseillers la déterminent avec vous.
          </p>
        </div>
      </div>
    </section>
  );
}

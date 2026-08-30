import * as React from "react";

const ITEMS = [
  "Isolation des combles",
  "Pompe à chaleur air/eau",
  "Gestion technique du bâtiment",
  "Éclairage LED",
  "Séchage solaire agricole",
  "Récupération de chaleur",
  "Calorifugeage industriel",
  "Réseau de chaleur",
  "Variation de vitesse moteur",
  "Système solaire combiné",
  "Ventilation double flux",
  "Écoconduite",
];

/** Bandeau défilant : types de travaux financés par les CEE. Décoratif. */
export function SectorMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-border bg-background py-4">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        <ul
          aria-hidden
          className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
        >
          {row.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

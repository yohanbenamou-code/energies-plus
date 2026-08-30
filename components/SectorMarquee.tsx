import * as React from "react";

const ITEMS = [
  "Foin & luzerne",
  "Céréales",
  "Plantes aromatiques & médicinales",
  "Fourrage",
  "Bois de chauffage",
  "Plaquettes forestières",
  "Sciages",
  "Co-produits agricoles",
  "Semences",
  "Houblon",
];

/** Bandeau défilant : ce que l'on sèche. Décoratif, sobre. */
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

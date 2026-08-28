import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * TODO: placeholder à remplacer par Yohan/Solaire Energie — logo officiel.
 * En attendant : logo texte "Solaire Energie" + pictogramme soleil / panneau
 * hybride en SVG inline. Aucun élément officiel (Marianne, RF) n'est utilisé.
 */
export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="Solaire Energie"
      >
        <rect width="40" height="40" rx="9" fill="hsl(151 55% 23%)" />
        {/* rayons de soleil */}
        <g stroke="hsl(33 92% 55%)" strokeWidth="2" strokeLinecap="round">
          <line x1="20" y1="5" x2="20" y2="9" />
          <line x1="31" y1="9" x2="28.5" y2="11.5" />
          <line x1="35" y1="20" x2="31" y2="20" />
          <line x1="9" y1="9" x2="11.5" y2="11.5" />
        </g>
        <circle cx="20" cy="18" r="5.5" fill="hsl(33 92% 55%)" />
        {/* panneau hybride stylisé */}
        <g fill="hsl(140 40% 97%)">
          <path d="M10 27h20l3 6H7z" />
        </g>
        <g stroke="hsl(151 55% 23%)" strokeWidth="1.1">
          <line x1="13.5" y1="27" x2="11.7" y2="33" />
          <line x1="20" y1="27" x2="20" y2="33" />
          <line x1="26.5" y1="27" x2="28.3" y2="33" />
        </g>
      </svg>
      {withWordmark ? (
        <span className="text-lg font-extrabold leading-none tracking-tight text-foreground">
          Solaire<span className="text-primary"> Energie</span>
        </span>
      ) : null}
    </span>
  );
}

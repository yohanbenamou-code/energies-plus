import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Logo Énergies Plus — reconstitution vectorielle de l'emblème fourni :
 * anneau en dégradé bleu -> vert, monogramme « É » (avec les deux points),
 * feuille et toiture de maison. Aucun élément officiel (Marianne, RF).
 *
 * `variant="mark"` : pictogramme seul. `variant="full"` : pictogramme + mot.
 */
export function Logo({
  className,
  variant = "full",
  invert = false,
}: {
  className?: string;
  variant?: "full" | "mark";
  invert?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Énergies Plus"
      role="img"
    >
      <LogoMark className="h-9 w-9 shrink-0" />
      {variant === "full" ? (
        <span
          className={cn(
            "text-[1.12rem] font-extrabold uppercase leading-none tracking-tight",
            invert ? "text-white" : "text-primary-700",
          )}
        >
          Énergies<span className="text-accent"> Plus</span>
        </span>
      ) : null}
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  const id = React.useId().replace(/[:]/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`epg-${id}`} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="hsl(219 64% 30%)" />
          <stop offset="0.5" stopColor="hsl(196 48% 36%)" />
          <stop offset="1" stopColor="hsl(98 52% 45%)" />
        </linearGradient>
      </defs>

      {/* anneau ouvert */}
      <path
        d="M46 12.5 A24 24 0 1 0 55 27"
        fill="none"
        stroke={`url(#epg-${id})`}
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* deux points (diérèse stylisée / silhouettes) */}
      <circle cx="26.5" cy="9" r="3.4" fill="hsl(219 64% 30%)" />
      <circle cx="36.5" cy="9" r="3.4" fill="hsl(98 52% 45%)" />

      {/* monogramme E */}
      <g fill={`url(#epg-${id})`}>
        <rect x="19" y="17.5" width="21" height="5.4" rx="2.2" />
        <rect x="19" y="17.5" width="5.4" height="24" rx="2.2" />
        <rect x="19" y="29" width="16" height="5" rx="2.2" />
      </g>

      {/* feuille */}
      <path
        d="M40 24c7 1 12 6 12 15 0 0-6 1.5-10.5-3S40 24 40 24z"
        fill="hsl(98 55% 46%)"
      />
      <path
        d="M41 27c3.5 3 6 6.5 8.5 10.5"
        fill="none"
        stroke="hsl(140 45% 32%)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* toiture + fenêtre */}
      <path
        d="M20 46l12-9 12 9"
        fill="none"
        stroke="hsl(120 42% 36%)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="hsl(120 42% 36%)">
        <rect x="29" y="45.5" width="3.2" height="3.2" rx="0.6" />
        <rect x="33" y="45.5" width="3.2" height="3.2" rx="0.6" />
        <rect x="29" y="49.5" width="3.2" height="3.2" rx="0.6" />
        <rect x="33" y="49.5" width="3.2" height="3.2" rx="0.6" />
      </g>
    </svg>
  );
}

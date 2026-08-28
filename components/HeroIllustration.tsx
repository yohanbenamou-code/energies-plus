import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Illustration SVG sobre : hangar agricole avec panneaux hybrides en toiture
 * et flux d'air insufflé stylisé. Placeholder vectoriel en attendant une
 * photographie fournie par Solaire Energie.
 * TODO: placeholder à remplacer par Yohan/Solaire Energie — visuel définitif.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 400"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Hangar agricole équipé de panneaux solaires hybrides avec séchage par insufflation d'air"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(199 84% 92%)" />
          <stop offset="1" stopColor="hsl(150 40% 94%)" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(205 45% 30%)" />
          <stop offset="1" stopColor="hsl(205 55% 22%)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="520" height="400" rx="16" fill="url(#sky)" />

      {/* soleil */}
      <circle cx="430" cy="80" r="34" fill="hsl(33 92% 55%)" opacity="0.9" />
      <g stroke="hsl(33 92% 55%)" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <line x1="430" y1="18" x2="430" y2="34" />
        <line x1="482" y1="80" x2="498" y2="80" />
        <line x1="470" y1="40" x2="482" y2="28" />
        <line x1="470" y1="120" x2="482" y2="132" />
      </g>

      {/* sol */}
      <rect x="0" y="320" width="520" height="80" fill="hsl(95 35% 78%)" />
      <path d="M0 320 Q 130 300 260 320 T 520 320 V 400 H 0 Z" fill="hsl(95 38% 72%)" />

      {/* hangar */}
      <g>
        <rect x="70" y="210" width="300" height="120" fill="hsl(0 0% 97%)" stroke="hsl(150 14% 70%)" strokeWidth="2" />
        <polygon points="60,212 220,150 380,212" fill="hsl(151 30% 40%)" />
        {/* panneaux hybrides sur pente de toit */}
        <g transform="translate(96 168) rotate(-21)">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={i * 30}
              y={0}
              width="26"
              height="44"
              rx="2"
              fill="url(#panel)"
              stroke="hsl(205 60% 18%)"
              strokeWidth="1.5"
            />
          ))}
        </g>
        {/* porte */}
        <rect x="180" y="255" width="80" height="75" fill="hsl(151 25% 35%)" />
      </g>

      {/* flux d'air insufflé */}
      <g stroke="hsl(33 92% 50%)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M120 300 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0" />
        <path d="M120 284 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0" opacity="0.6" />
        <path d="M120 268 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0" opacity="0.4" />
      </g>

      {/* épis stylisés */}
      <g stroke="hsl(41 70% 45%)" strokeWidth="3" strokeLinecap="round">
        <line x1="410" y1="330" x2="410" y2="300" />
        <line x1="426" y1="330" x2="426" y2="292" />
        <line x1="442" y1="330" x2="442" y2="300" />
      </g>
    </svg>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Illustration SVG sobre : hangar agricole équipé de panneaux hybrides,
 * séchage par insufflation d'air stylisé, soleil. Placeholder vectoriel
 * aux couleurs de la marque.
 * TODO: placeholder à remplacer par Yohan/Énergies Plus — photo réelle.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Hangar agricole équipé de panneaux solaires hybrides, avec séchage par insufflation d'air"
    >
      <defs>
        <linearGradient id="epi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(210 55% 95%)" />
          <stop offset="1" stopColor="hsl(150 40% 95%)" />
        </linearGradient>
        <linearGradient id="epi-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(219 60% 34%)" />
          <stop offset="1" stopColor="hsl(214 55% 24%)" />
        </linearGradient>
        <linearGradient id="epi-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(150 38% 40%)" />
          <stop offset="1" stopColor="hsl(120 40% 32%)" />
        </linearGradient>
      </defs>

      <rect width="560" height="400" fill="url(#epi-sky)" />

      {/* soleil */}
      <circle cx="452" cy="78" r="30" fill="hsl(98 52% 52%)" opacity="0.9" />
      <g stroke="hsl(98 52% 52%)" strokeWidth="4" strokeLinecap="round" opacity="0.65">
        <line x1="452" y1="24" x2="452" y2="38" />
        <line x1="500" y1="78" x2="514" y2="78" />
        <line x1="489" y1="41" x2="499" y2="31" />
        <line x1="489" y1="115" x2="499" y2="125" />
      </g>

      {/* collines */}
      <path d="M0 322 Q 150 296 300 322 T 560 314 V 400 H 0 Z" fill="hsl(120 30% 82%)" />
      <path d="M0 344 Q 180 320 360 344 T 560 340 V 400 H 0 Z" fill="hsl(120 32% 74%)" />

      {/* hangar */}
      <g>
        <rect x="86" y="212" width="312" height="122" fill="hsl(0 0% 98%)" stroke="hsl(214 22% 78%)" strokeWidth="2" />
        <polygon points="74,214 242,146 410,214" fill="url(#epi-roof)" />
        {/* panneaux hybrides */}
        <g transform="translate(112 166) rotate(-21.8)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={i * 30}
              y={0}
              width="26"
              height="46"
              rx="2"
              fill="url(#epi-panel)"
              stroke="hsl(214 60% 18%)"
              strokeWidth="1.4"
            />
          ))}
        </g>
        <rect x="206" y="258" width="80" height="76" fill="hsl(150 22% 34%)" />
        <rect x="120" y="248" width="46" height="38" fill="hsl(219 40% 88%)" stroke="hsl(214 22% 74%)" strokeWidth="1.5" />
      </g>

      {/* flux d'air insufflé */}
      <g stroke="hsl(98 52% 45%)" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M120 306 q 22 -16 44 0 q 22 16 44 0 q 22 -16 44 0" opacity="0.8" />
        <path d="M120 290 q 22 -16 44 0 q 22 16 44 0 q 22 -16 44 0" opacity="0.55" />
        <path d="M120 274 q 22 -16 44 0 q 22 16 44 0 q 22 -16 44 0" opacity="0.32" />
      </g>

      {/* épis */}
      <g stroke="hsl(41 60% 48%)" strokeWidth="3.5" strokeLinecap="round">
        <line x1="430" y1="332" x2="430" y2="300" />
        <line x1="446" y1="332" x2="446" y2="292" />
        <line x1="462" y1="332" x2="462" y2="300" />
      </g>
    </svg>
  );
}

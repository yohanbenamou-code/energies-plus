import type { ClimateZone } from "@/types/operation";

/**
 * Barème officiel de la fiche CEE BAT-TH-163 « Pompe à chaleur de type
 * air/eau » (bâtiment tertiaire), applicable au 1er janvier 2026.
 *
 * Formule : M (kWh cumac) = coefficient zone/classe (kWh cumac / m²) x
 * surface chauffée (m²) x facteur sectoriel S x bonus « Coup de pouce »
 * (x3 si la PAC remplace une chaudière fioul/gaz/charbon, sous conditions).
 * Le facteur R (part de la puissance de chaufferie couverte par la PAC,
 * pertinent si < 40 %) n'est pas modélisé ici : il est vérifié par le
 * conseiller lors de l'étude et n'est pertinent que pour les installations
 * hybrides partielles.
 *
 * Source : Ministère de la Transition Écologique, fiche d'opération
 * standardisée BAT-TH-163 (v. A75-1 / A81-2).
 */

export type PacPerformanceClass =
  | "etas-111-126"
  | "etas-126-175"
  | "etas-175-plus"
  | "cop-34-45"
  | "cop-45-plus";

export type PacSectorKey =
  | "bureaux"
  | "enseignement"
  | "hotellerie-restauration"
  | "sante"
  | "commerces"
  | "autres";

interface ZoneCoefficients {
  H1: number;
  H2: number;
  H3: number;
}

export const PAC_TH_163 = {
  code: "BAT-TH-163",
  lifespanYears: 22,
  coupDePouceMultiplier: 3,
  /** kWh cumac par m² de surface chauffée, selon la zone climatique et la classe de performance. */
  coefficients: {
    "etas-111-126": { H1: 1100, H2: 900, H3: 600 },
    "etas-126-175": { H1: 1200, H2: 1000, H3: 700 },
    "etas-175-plus": { H1: 1300, H2: 1000, H3: 700 },
    "cop-34-45": { H1: 1100, H2: 900, H3: 600 },
    "cop-45-plus": { H1: 1200, H2: 1000, H3: 700 },
  } satisfies Record<PacPerformanceClass, ZoneCoefficients>,
  /** Facteur correctif selon le secteur d'activité du bâtiment (S). */
  sectorFactors: {
    bureaux: 1.2,
    enseignement: 0.8,
    "hotellerie-restauration": 0.7,
    sante: 1.1,
    commerces: 0.9,
    autres: 0.7,
  } satisfies Record<PacSectorKey, number>,
} as const;

export const PAC_SECTOR_LABELS: Record<PacSectorKey, string> = {
  bureaux: "Bureaux",
  enseignement: "Enseignement",
  "hotellerie-restauration": "Hôtellerie / Restauration",
  sante: "Santé",
  commerces: "Commerces",
  autres: "Autres secteurs tertiaires",
};

export const PAC_PERFORMANCE_LABELS: Record<
  PacPerformanceClass,
  { label: string; help: string }
> = {
  "etas-111-126": {
    label: "PAC standard",
    help: "Efficacité saisonnière (Etas) entre 111 % et 126 % — puissance ≤ 400 kW",
  },
  "etas-126-175": {
    label: "PAC performante",
    help: "Efficacité saisonnière (Etas) entre 126 % et 175 % — puissance ≤ 400 kW",
  },
  "etas-175-plus": {
    label: "PAC très performante",
    help: "Efficacité saisonnière (Etas) ≥ 175 % — puissance ≤ 400 kW",
  },
  "cop-34-45": {
    label: "PAC standard (> 400 kW)",
    help: "COP mesuré entre 3,4 et 4,5 — puissance > 400 kW",
  },
  "cop-45-plus": {
    label: "PAC performante (> 400 kW)",
    help: "COP mesuré ≥ 4,5 — puissance > 400 kW",
  },
};

export function calculatePacCumac({
  zone,
  performanceClass,
  sector,
  surfaceM2,
  coupDePouce,
}: {
  zone: ClimateZone;
  performanceClass: PacPerformanceClass;
  sector: PacSectorKey;
  surfaceM2: number;
  coupDePouce: boolean;
}): number {
  const coefficient = PAC_TH_163.coefficients[performanceClass]?.[zone] ?? 0;
  const sectorFactor = PAC_TH_163.sectorFactors[sector] ?? 0;
  const surface = Number.isFinite(surfaceM2) && surfaceM2 > 0 ? surfaceM2 : 0;
  const bonus = coupDePouce ? PAC_TH_163.coupDePouceMultiplier : 1;

  return coefficient * surface * sectorFactor * bonus;
}

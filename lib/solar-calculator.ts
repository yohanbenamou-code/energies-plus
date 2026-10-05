import type { ClimateZone } from "@/types/operation";

/**
 * Barème officiel de la fiche CEE BAR-TH-168 « Dispositif solaire thermique
 * (France métropolitaine) », version A78-3 applicable au 1er janvier 2026.
 *
 * Formule : M (kWh cumac) = montant par m² de capteur (selon la zone
 * climatique et l'usage) x surface hors-tout de capteurs (m²) x bonification.
 *
 * Bonification (arrêté du 17 août 2026, article 3-9 de l'arrêté du
 * 29 décembre 2014) : x5 pour les ménages modestes, x4 pour les autres, pour
 * les opérations engagées avant le 1er janvier 2027 et à condition qu'aucun
 * équipement utilisant des énergies fossiles ne soit installé ou conservé
 * pour le chauffage et l'eau chaude sanitaire.
 */

export type SolarUsage = "ecs" | "ecs-chauffage";
export type SolarHousehold = "modeste" | "autres";

export const SOLAR_TH_168 = {
  code: "BAR-TH-168",
  lifespanYears: 25,
  /** kWh cumac par m² de capteur, selon l'usage et la zone climatique. */
  coefficients: {
    ecs: { H1: 6000, H2: 7200, H3: 9600 },
    "ecs-chauffage": { H1: 14000, H2: 12700, H3: 10300 },
  } satisfies Record<SolarUsage, Record<ClimateZone, number>>,
  /** Surface minimale de capteurs (m²) exigée par la fiche. */
  minSurfaceM2: { ecs: 2, "ecs-chauffage": 8 } satisfies Record<SolarUsage, number>,
  bonification: { modeste: 5, autres: 4 } satisfies Record<SolarHousehold, number>,
  bonificationEndsLabel: "opérations engagées avant le 1er janvier 2027",
} as const;

export function calculateSolarCumac({
  zone,
  usage,
  surfaceM2,
  household,
}: {
  zone: ClimateZone;
  usage: SolarUsage;
  surfaceM2: number;
  /** `null` : pas de bonification (équipement fossile conservé, ou hors période). */
  household: SolarHousehold | null;
}): number {
  const coefficient = SOLAR_TH_168.coefficients[usage]?.[zone] ?? 0;
  const surface = Number.isFinite(surfaceM2) && surfaceM2 > 0 ? surfaceM2 : 0;
  const bonus = household ? SOLAR_TH_168.bonification[household] : 1;
  return coefficient * surface * bonus;
}

import type { ClimateZone } from "@/types/operation";

/**
 * Correspondance région administrative -> zone climatique CEE (H1/H2/H3),
 * pour éviter de demander la « zone climatique » au visiteur.
 *
 * Approximation volontairement simple : la zone exacte est confirmée par le
 * conseiller lors de l'étude (certaines régions sont à cheval sur deux zones).
 */
export const REGIONS: Array<{ name: string; zone: ClimateZone }> = [
  { name: "Auvergne-Rhône-Alpes", zone: "H1" },
  { name: "Bourgogne-Franche-Comté", zone: "H1" },
  { name: "Bretagne", zone: "H2" },
  { name: "Centre-Val de Loire", zone: "H2" },
  { name: "Corse", zone: "H3" },
  { name: "Grand Est", zone: "H1" },
  { name: "Hauts-de-France", zone: "H1" },
  { name: "Île-de-France", zone: "H1" },
  { name: "Normandie", zone: "H1" },
  { name: "Nouvelle-Aquitaine", zone: "H2" },
  { name: "Occitanie", zone: "H3" },
  { name: "Pays de la Loire", zone: "H2" },
  { name: "Provence-Alpes-Côte d'Azur", zone: "H3" },
];

export function zoneForRegion(name: string): ClimateZone {
  return REGIONS.find((r) => r.name === name)?.zone ?? "H2";
}

import type { CeeVariant, ClimateZone, ProductType } from "@/types/operation";

/**
 * Calcule le volume de kWh cumac généré par un projet, à partir des
 * coefficients officiels de la fiche d'opération CEE.
 *
 * Formule : coefficient (kWh cumac / kW) x puissance thermique installée (kW).
 *
 * Le coefficient dépend de la variante, de la zone climatique (H1/H2/H3)
 * et du type de produits séchés (agricole / forestier).
 *
 * Retourne 0 si la zone est inconnue pour la variante ou si la puissance
 * fournie n'est pas un nombre strictement positif.
 */
export function calculateCumac(
  variant: CeeVariant,
  zone: ClimateZone,
  product: ProductType,
  powerKw: number,
): number {
  const row = variant.coefficients.find((coefficient) => coefficient.zone === zone);
  if (!row) return 0;

  const coefficient = product === "forestier" ? row.forestier : row.agricole;
  const power = Number.isFinite(powerKw) && powerKw > 0 ? powerKw : 0;

  return coefficient * power;
}

/** Coefficient unitaire (kWh cumac par kW) pour un jeu de paramètres. */
export function getCoefficient(
  variant: CeeVariant,
  zone: ClimateZone,
  product: ProductType,
): number {
  const row = variant.coefficients.find((coefficient) => coefficient.zone === zone);
  if (!row) return 0;
  return product === "forestier" ? row.forestier : row.agricole;
}

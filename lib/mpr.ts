/**
 * Plafonds de revenu fiscal de référence MaPrimeRénov' 2026 (au 1er janvier
 * 2026), selon le nombre de personnes du ménage. Source : cahier des charges
 * de l'offre. La catégorie est ensuite confirmée par le conseiller sur
 * l'avis d'imposition.
 */

export type MprCategory = "tres-modeste" | "modeste" | "intermediaire" | "superieur";
export type MprArea = "idf" | "hors-idf";

export const MPR_CATEGORY_LABELS: Record<
  MprCategory,
  { label: string; color: string }
> = {
  "tres-modeste": { label: "Très modestes", color: "Bleu" },
  modeste: { label: "Modestes", color: "Jaune" },
  intermediaire: { label: "Intermédiaires", color: "Violet" },
  superieur: { label: "Supérieurs", color: "Rose" },
};

interface Ceilings {
  /** Plafonds pour 1 à 5 personnes : [très modestes, modestes, intermédiaires]. */
  byPersons: Array<[number, number, number]>;
  /** Majoration par personne supplémentaire : [très modestes, modestes, intermédiaires]. */
  perExtra: [number, number, number];
}

export const MPR_CEILINGS_2026: Record<MprArea, Ceilings> = {
  idf: {
    byPersons: [
      [24031, 29253, 40851],
      [35270, 42933, 60051],
      [42357, 51564, 71846],
      [49455, 60208, 84562],
      [56580, 68877, 96817],
    ],
    perExtra: [7116, 8663, 12257],
  },
  "hors-idf": {
    byPersons: [
      [17363, 22259, 31185],
      [25393, 32553, 45842],
      [30540, 39148, 55196],
      [35676, 45735, 64550],
      [40835, 52348, 73907],
    ],
    perExtra: [5151, 6598, 9357],
  },
};

export function mprCeilings(area: MprArea, persons: number): [number, number, number] {
  const c = MPR_CEILINGS_2026[area];
  const n = Math.max(1, Math.floor(persons));
  if (n <= 5) return c.byPersons[n - 1];
  const extra = n - 5;
  const base = c.byPersons[4];
  return [
    base[0] + extra * c.perExtra[0],
    base[1] + extra * c.perExtra[1],
    base[2] + extra * c.perExtra[2],
  ];
}

/** Catégorie de revenus : le plafond est inclusif (revenu <= plafond). */
export function mprCategory(
  area: MprArea,
  persons: number,
  referenceIncome: number,
): MprCategory {
  const [tm, m, i] = mprCeilings(area, persons);
  if (referenceIncome <= tm) return "tres-modeste";
  if (referenceIncome <= m) return "modeste";
  if (referenceIncome <= i) return "intermediaire";
  return "superieur";
}

/** Bonification CEE BAR-TH-168 : « modestes » = très modestes + modestes. */
export function isModestHousehold(category: MprCategory): boolean {
  return category === "tres-modeste" || category === "modeste";
}

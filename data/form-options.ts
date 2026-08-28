/** Options partagées par les formulaires et le simulateur. */

export const STRUCTURE_TYPES = [
  "Exploitation agricole",
  "Coopérative agricole",
  "CUMA",
  "Exploitation forestière",
  "Scierie",
  "Autre",
] as const;

export const PROJECT_TYPES = [
  { value: "systeme-complet-neuf", label: "Système complet neuf de séchage" },
  { value: "toiture-couplee", label: "Toiture solaire couplée à un système existant" },
  { value: "je-ne-sais-pas", label: "Je ne sais pas encore" },
] as const;

export const PRODUCT_TYPES = [
  { value: "agricole", label: "Produits agricoles (fourrage, céréales, plantes…)" },
  { value: "forestier", label: "Produits forestiers (bois, plaquettes, sciages…)" },
] as const;

export const CLIMATE_ZONES = [
  { value: "H1", label: "H1 — Nord, Est, zones montagneuses (climat le plus froid)" },
  { value: "H2", label: "H2 — Façade atlantique, centre, Sud-Ouest" },
  { value: "H3", label: "H3 — Pourtour méditerranéen (climat le plus doux)" },
] as const;

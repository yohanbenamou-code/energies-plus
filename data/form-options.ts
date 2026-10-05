/** Options partagées par les formulaires et le simulateur. */

export const STRUCTURE_TYPES = [
  "Exploitation agricole",
  "Coopérative agricole",
  "CUMA",
  "Exploitation forestière",
  "Scierie",
  "Autre",
] as const;

/** Types de structure du formulaire court de la page d'accueil (hub CEE généraliste). */
export const HOME_STRUCTURE_TYPES = [
  "Bailleur social",
  "Établissement de santé ou médico-social",
  "Collectivité",
  "Copropriété ou syndic",
  "Industrie ou tertiaire",
  "Exploitation agricole ou forestière",
  "Particulier (maison individuelle)",
  "Autre",
] as const;

export const PROJECT_TYPES = [
  { value: "systeme-complet-neuf", label: "Une installation neuve complète" },
  { value: "toiture-couplee", label: "Un ajout sur un séchoir existant" },
  { value: "je-ne-sais-pas", label: "Je ne sais pas encore" },
] as const;

export const PRODUCT_TYPES = [
  { value: "agricole", label: "Produits agricoles (foin, céréales, plantes…)" },
  { value: "forestier", label: "Bois & produits forestiers (plaquettes, sciages…)" },
] as const;

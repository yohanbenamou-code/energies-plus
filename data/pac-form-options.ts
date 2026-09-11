/** Options partagées par le formulaire et le simulateur de la page pompe à chaleur. */

export const PAC_STRUCTURE_TYPES = [
  "Bureaux / tertiaire",
  "Établissement d'enseignement",
  "Établissement de santé / médico-social",
  "Hôtellerie / restauration",
  "Commerce",
  "Collectivité",
  "Autre",
] as const;

export const PAC_REPLACED_SYSTEMS = [
  { value: "chaudiere-fioul", label: "Une chaudière fioul" },
  { value: "chaudiere-gaz", label: "Une chaudière gaz" },
  { value: "chaudiere-charbon", label: "Une chaudière charbon" },
  { value: "autre-systeme", label: "Un autre système de chauffage" },
  { value: "pas-de-chaudiere", label: "Pas de chaudière existante" },
] as const;

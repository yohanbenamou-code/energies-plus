import type { CeeOperation } from "@/types/operation";

/**
 * Catalogue des opérations CEE accompagnées par Solaire Energie.
 *
 * EXTENSIBILITÉ : ajouter une future opération = ajouter un objet dans ce tableau.
 * La homepage (catalogue, segmentation par profil) et les pages
 * /solutions/[slug] se génèrent automatiquement à partir de ce fichier,
 * sans toucher aux composants.
 *
 * Les valeurs chiffrées (kWh cumac par kW) proviennent de la fiche
 * d'opération standardisée AGRI-EQ-110 publiée par le Ministère de la
 * Transition Écologique. Ne pas arrondir ni approximer.
 */
export const operations: CeeOperation[] = [
  {
    slug: "agri-eq-110-sechage-solaire-agricole",
    code: "AGRI-EQ-110",
    status: "live",
    sector: "Agriculture — produits et co-produits agricoles et forestiers",
    title:
      "Séchage solaire par insufflation d'air (panneaux solaires hybrides)",
    shortDescription:
      "Mise en place d'un système de séchage par insufflation d'air utilisant des panneaux solaires hybrides, ou d'une toiture solaire hybride couplée à un système existant.",
    heroTitle:
      "Séchez vos récoltes à l'énergie solaire, financé par les Certificats d'Économies d'Énergie",
    heroSubtitle:
      "Solaire Energie vous accompagne de A à Z dans l'installation d'un système de séchage solaire par insufflation d'air — panneaux solaires hybrides, financement CEE, installation par des professionnels certifiés.",
    lifespanYears: 15,
    conditions: [
      "Mise en place réalisée par un professionnel",
      "Bâtiment de séchage fermé",
      "Panneaux solaires hybrides certifiés IEC 61215 et IEC 61730",
      "Puissance thermique mesurée selon la norme ISO 9806 ou la norme européenne ETV",
      "Productivité des capteurs solaires hybrides ≥ 500 W/m² de surface d'entrée (puissance électrique IEC 61215 + puissance thermique ISO 9806)",
    ],
    applicableProfiles: [
      "Exploitation agricole",
      "Coopérative agricole",
      "CUMA",
      "Exploitation forestière",
      "Scierie",
    ],
    variants: [
      {
        key: "systeme-complet-neuf",
        label: "Système complet neuf de séchage",
        temperatureRange: "25-40 °C",
        description:
          "Séchage à basse température par insufflation d'air, comprenant a minima : panneaux solaires hybrides, un ou plusieurs ventilateurs, une chambre d'aspiration, une chambre de compression (couloir de ventilation).",
        includes: [
          "Panneaux solaires hybrides",
          "Un ou plusieurs ventilateurs",
          "Chambre d'aspiration",
          "Chambre de compression",
        ],
        coefficients: [
          { zone: "H1", agricole: 42700, forestier: 102600 },
          { zone: "H2", agricole: 48500, forestier: 116600 },
          { zone: "H3", agricole: 55700, forestier: 134100 },
        ],
      },
      {
        key: "toiture-couplee",
        label: "Toiture solaire couplée à un système existant",
        temperatureRange: "60-80 °C",
        description:
          "Mise en place d'une toiture solaire en panneaux hybrides venant se coupler à un système d'insufflation d'air existant à haute température.",
        includes: ["Toiture solaire en panneaux hybrides"],
        coefficients: [
          { zone: "H1", agricole: 12200, forestier: 16900 },
          { zone: "H2", agricole: 13900, forestier: 19300 },
          { zone: "H3", agricole: 17400, forestier: 24100 },
        ],
      },
    ],
  },
  // Futures opérations CEE à ajouter ici (statut "coming-soon" possible en
  // attendant le contenu complet). Le catalogue de la homepage et la
  // segmentation par profil se mettent à jour automatiquement dès qu'un
  // objet est ajouté.
];

export function getOperationBySlug(slug: string): CeeOperation | undefined {
  return operations.find((operation) => operation.slug === slug);
}

export function getLiveOperations(): CeeOperation[] {
  return operations.filter((operation) => operation.status === "live");
}

/** Liste dédupliquée de tous les profils clients cités par au moins une opération. */
export function getAllProfiles(): string[] {
  const set = new Set<string>();
  for (const operation of operations) {
    for (const profile of operation.applicableProfiles) set.add(profile);
  }
  return Array.from(set);
}

/** Nombre d'opérations "live" applicables à un profil donné. */
export function countLiveOperationsForProfile(profile: string): number {
  return operations.filter(
    (operation) =>
      operation.status === "live" &&
      operation.applicableProfiles.includes(profile),
  ).length;
}

/** Première opération "live" applicable à un profil (pour le lien de la carte). */
export function firstLiveOperationForProfile(
  profile: string,
): CeeOperation | undefined {
  return operations.find(
    (operation) =>
      operation.status === "live" &&
      operation.applicableProfiles.includes(profile),
  );
}

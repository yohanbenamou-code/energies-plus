/**
 * Références réelles de l'équipe Énergies Plus (activité menée sous
 * l'enseigne « Bat Énergie » depuis 2015).
 *
 * Source : dossier de références chantier 2025 et plaquette de l'équipe.
 *
 * TODO: Yohan/Énergies Plus — valider l'affichage public des noms de
 * clients ci-dessous (droit à citation / logos). Retirer ceux qui ne
 * peuvent pas être cités et ajouter les logos autorisés.
 */

export const CREDENTIALS: string[] = [
  "Entreprise certifiée RGE",
  "Contrôle COFRAC systématique après travaux",
  "Activité menée depuis 2015",
  "Intervention sur toute la France",
  "Cumul possible avec MaPrimeRénov'",
];

/** Chiffres issus de la plaquette de l'équipe — à confirmer avant mise à jour. */
export const TRACK_RECORD = {
  sinceYear: 2015,
  buildings: 4000,
};

export interface AudienceSegment {
  key: string;
  label: string;
  description: string;
  image: string;
}

export const SEGMENTS: AudienceSegment[] = [
  {
    key: "bailleurs",
    label: "Bailleurs sociaux",
    description:
      "OPH et ESH : calorifugeage, points singuliers, planchers et combles à l'échelle du patrimoine.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=80&auto=format&fit=crop",
  },
  {
    key: "sante",
    label: "Santé & médico-social",
    description:
      "EHPAD, centres hospitaliers, CHU : travaux menés en site occupé, sans interruption d'activité.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1100&q=80&auto=format&fit=crop",
  },
  {
    key: "collectivites",
    label: "Collectivités",
    description:
      "Villes et départements : réseaux de chaleur, bâtiments publics, éclairage.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1100&q=80&auto=format&fit=crop",
  },
  {
    key: "copros",
    label: "Copropriétés & syndics",
    description:
      "Immeubles collectifs : calorifugeage, planchers, régulation — sans avance de trésorerie et sans vote de travaux quand l'offre est financée à 100 %.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1100&q=80&auto=format&fit=crop",
  },
  {
    key: "industrie",
    label: "Industrie & tertiaire",
    description:
      "Sites industriels et bâtiments d'activité : récupération de chaleur, GTB, HP flottante, CPE.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1100&q=80&auto=format&fit=crop",
  },
  {
    key: "agriculture",
    label: "Agriculture",
    description:
      "Exploitations, coopératives, CUMA, scieries : séchage solaire par insufflation d'air.",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1100&q=80&auto=format&fit=crop",
  },
];

export interface NamedClient {
  name: string;
  /** Sigle court affiché dans la tuile en attendant le vrai logo. */
  short: string;
  /**
   * Chemin du logo (ex "/logos/orpea.svg"). Tant qu'il est absent, la tuile
   * affiche le sigle. TODO: Yohan/Énergies Plus — déposer les fichiers SVG
   * dans public/logos/ et renseigner ce champ (droits de citation à valider).
   */
  logo?: string;
}

/** Sélection de références citées dans le dossier chantier de l'équipe. */
export const NAMED_CLIENTS: NamedClient[] = [
  { name: "CHU de Toulouse", short: "CHU Toulouse" },
  { name: "Groupe Hospitalier de Seclin", short: "GH Seclin" },
  { name: "GHT Littoral Atlantique", short: "GHT Littoral" },
  { name: "UGECAM", short: "Ugecam" },
  { name: "GROUPE SOS", short: "Groupe SOS" },
  { name: "Fondation Partage & Vie", short: "Partage & Vie" },
  { name: "ORPEA", short: "Orpea" },
  { name: "Ville de Metz", short: "Metz" },
  { name: "Ville de Douai", short: "Douai" },
  { name: "Ville de Montrouge", short: "Montrouge" },
  { name: "Ville de Trappes", short: "Trappes" },
  { name: "CCI de Bordeaux", short: "CCI Bordeaux" },
  { name: "FONCIA", short: "Foncia" },
  { name: "CITYA Immobilier", short: "Citya" },
  { name: "ORPI", short: "Orpi" },
  { name: "IMMO DE FRANCE (PROCIVIS)", short: "Immo de France" },
];

export interface ChantierHighlight {
  metric: string;
  label: string;
}

export const CHANTIER_HIGHLIGHTS: ChantierHighlight[] = [
  { metric: "67 km", label: "de réseaux calorifugés — Ville de Metz (57)" },
  {
    metric: "30 000 m²",
    label: "de planchers isolés + 25 km de réseaux — CHU de Toulouse",
  },
  {
    metric: "66 km",
    label: "de réseaux et 2 800 points singuliers — bailleur social, Paris (75)",
  },
  {
    metric: "50+",
    label: "établissements de santé et médico-sociaux accompagnés",
  },
];

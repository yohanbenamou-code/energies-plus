export type ClimateZone = "H1" | "H2" | "H3";
export type ProductType = "agricole" | "forestier";

/** Secteurs officiels du dispositif CEE. */
export type CeeSectorKey = "BAR" | "BAT" | "IND" | "RES" | "TRA" | "AGRI";

export interface CeeCoefficientRow {
  zone: ClimateZone;
  /** kWh cumac par kW thermique installé (produits agricoles) */
  agricole: number;
  /** kWh cumac par kW thermique installé (produits forestiers) */
  forestier: number;
}

export interface CeeVariant {
  key: string;
  label: string;
  temperatureRange: string;
  description: string;
  /** Composants inclus a minima */
  includes: string[];
  coefficients: CeeCoefficientRow[];
}

export interface CeeOperation {
  slug: string;
  code: string;
  /** "live" = page /solutions dédiée ; "coming-soon" = entrée catalogue seule. */
  status: "live" | "coming-soon";
  /** Secteur CEE (pour le filtre du catalogue). */
  sectorKey: CeeSectorKey;
  sector: string;
  title: string;
  /** Accroche courte pour les cartes du catalogue. */
  pitch: string;
  /** Utilisé pour les cartes du catalogue (description un peu plus longue). */
  shortDescription: string;
  /** Photo d'illustration (placeholder). */
  image?: string;

  // --- Champs de la page dédiée (uniquement pour status: "live") ---
  heroTitle?: string;
  heroSubtitle?: string;
  lifespanYears?: number;
  conditions?: string[];
  variants?: CeeVariant[];
  applicableProfiles?: string[];
}

/** Opération avec le contenu complet d'une page /solutions/[slug]. */
export interface LiveCeeOperation extends CeeOperation {
  status: "live";
  heroTitle: string;
  heroSubtitle: string;
  lifespanYears: number;
  conditions: string[];
  variants: CeeVariant[];
  applicableProfiles: string[];
}

export function isLiveOperation(
  operation: CeeOperation,
): operation is LiveCeeOperation {
  return (
    operation.status === "live" &&
    Array.isArray(operation.variants) &&
    operation.variants.length > 0 &&
    typeof operation.heroTitle === "string" &&
    Array.isArray(operation.conditions) &&
    Array.isArray(operation.applicableProfiles)
  );
}

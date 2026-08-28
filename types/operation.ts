export type ClimateZone = "H1" | "H2" | "H3";
export type ProductType = "agricole" | "forestier";

export interface CeeCoefficientRow {
  zone: ClimateZone;
  /** kWh cumac par kW thermique installe (produits agricoles) */
  agricole: number;
  /** kWh cumac par kW thermique installe (produits forestiers) */
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
  status: "live" | "coming-soon";
  sector: string;
  title: string;
  /** Utilise pour les cartes du catalogue */
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  lifespanYears: number;
  conditions: string[];
  variants: CeeVariant[];
  applicableProfiles: string[];
}

import type { CeeSectorKey } from "@/types/operation";

export interface CeeSector {
  key: CeeSectorKey;
  label: string;
  short: string;
  description: string;
  image: string;
}

/**
 * Secteurs du dispositif CEE sur lesquels Énergies Plus accompagne
 * effectivement des projets. Utilisé pour filtrer le catalogue des fiches.
 */
export const SECTORS: CeeSector[] = [
  {
    key: "BAT",
    label: "Bâtiment tertiaire",
    short: "Tertiaire",
    description:
      "Hôpitaux, EHPAD, collectivités, bureaux : calorifugeage, GTB, éclairage LED, isolation de l'enveloppe.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "BAR",
    label: "Bâtiment résidentiel",
    short: "Résidentiel",
    description:
      "Bailleurs sociaux et copropriétés : isolation des réseaux de chauffage, points singuliers, planchers, combles, régulation.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "IND",
    label: "Industrie",
    short: "Industrie",
    description:
      "Récupération de chaleur fatale, haute pression flottante, optimisation des utilités et des groupes froids.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "AGRI",
    label: "Agriculture",
    short: "Agriculture",
    description:
      "Exploitations, coopératives, CUMA, scieries : séchage solaire par insufflation d'air (fiche AGRI-EQ-110).",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80&auto=format&fit=crop",
  },
];

export function getSector(key: CeeSectorKey): CeeSector {
  return SECTORS.find((s) => s.key === key) ?? SECTORS[0];
}

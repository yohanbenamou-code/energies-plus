import type { CeeSectorKey } from "@/types/operation";

export interface CeeSector {
  key: CeeSectorKey;
  label: string;
  short: string;
  description: string;
  /** Photo d'illustration — TODO: remplacer par un visuel fourni par Énergies Plus. */
  image: string;
}

/**
 * Les six secteurs du dispositif des Certificats d'Économies d'Énergie,
 * tels que définis par le Ministère de la Transition Écologique.
 */
export const SECTORS: CeeSector[] = [
  {
    key: "BAR",
    label: "Bâtiment résidentiel",
    short: "Résidentiel",
    description:
      "Isolation, chauffage performant, ventilation, régulation : les opérations qui réduisent les consommations des logements.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "BAT",
    label: "Bâtiment tertiaire",
    short: "Tertiaire",
    description:
      "Bureaux, commerces, collectivités : GTB, éclairage LED, pompes à chaleur, isolation de l'enveloppe.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "IND",
    label: "Industrie",
    short: "Industrie",
    description:
      "Utilités, moteurs, air comprimé, récupération de chaleur fatale, calorifugeage des réseaux.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "AGRI",
    label: "Agriculture",
    short: "Agriculture",
    description:
      "Exploitations, coopératives, CUMA, scieries : séchage solaire, récupération de chaleur, motorisation performante.",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "RES",
    label: "Réseaux",
    short: "Réseaux",
    description:
      "Raccordement à un réseau de chaleur, rénovation de l'éclairage public, optimisation des réseaux d'énergie.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "TRA",
    label: "Transport",
    short: "Transport",
    description:
      "Écoconduite, équipements des véhicules et des flottes, logistique moins énergivore.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=80&auto=format&fit=crop",
  },
];

export function getSector(key: CeeSectorKey): CeeSector {
  return SECTORS.find((s) => s.key === key) ?? SECTORS[0];
}

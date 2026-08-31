import type { CeeOperation, CeeSectorKey } from "@/types/operation";

/**
 * Catalogue des opérations CEE accompagnées par Énergies Plus.
 *
 * Les codes et intitulés proviennent des opérations standardisées publiées
 * par le Ministère de la Transition Écologique et du dossier de références
 * chantier de l'équipe (activité menée sous l'enseigne « Bat Énergie »
 * depuis 2015). Les descriptions sont celles de l'équipe.
 *
 * - `status: "live"`  → page /solutions/[slug] complète + barème vérifié
 *   (aujourd'hui : AGRI-EQ-110).
 * - `status: "coming-soon"` → entrée de catalogue : aucun barème ni montant.
 *
 * TODO: Yohan/Énergies Plus — arbitrer la mise en avant, ajouter/retirer des
 * fiches selon l'actualité réglementaire (certaines évoluent ou sont abrogées).
 */
export const operations: CeeOperation[] = [
  /* ------------------------------------------------------------------ */
  /* AGRICULTURE — fiche pilote avec page dédiée                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "agri-eq-110-sechage-solaire-agricole",
    code: "AGRI-EQ-110",
    status: "live",
    sectorKey: "AGRI",
    sector: "Agriculture — produits et co-produits agricoles et forestiers",
    title: "Séchage solaire par insufflation d'air (panneaux solaires hybrides)",
    pitch:
      "Séchez foin, céréales, plantes aromatiques ou bois à l'air chaud solaire, avec une aide qui couvre une part importante de l'installation.",
    shortDescription:
      "Mise en place d'un système de séchage par insufflation d'air utilisant des panneaux solaires hybrides, ou d'une toiture solaire hybride couplée à un système existant.",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1400&q=80&auto=format&fit=crop",
    heroTitle: "Séchez vos récoltes au soleil, avec une aide de l'État",
    heroSubtitle:
      "Un séchoir solaire par insufflation d'air, financé en partie par le dispositif public des Certificats d'Économies d'Énergie. Énergies Plus s'occupe de tout : éligibilité, dossier, installation par des professionnels.",
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

  /* ------------------------------------------------------------------ */
  /* ISOLATION DES RÉSEAUX — le cœur de métier de l'équipe              */
  /* ------------------------------------------------------------------ */
  {
    slug: "bat-th-146-calorifugeage-reseaux-tertiaire",
    code: "BAT-TH-146",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — réseaux",
    title: "Isolation des réseaux de chauffage et d'eau chaude sanitaire",
    pitch:
      "Le calorifugeage des tuyauteries en sous-sol, chaufferie et parkings : jusqu'à 15 % d'économies, souvent 100 % financé.",
    shortDescription:
      "Pose de coquilles isolantes sur les canalisations d'eau chaude et de chauffage situées hors volume chauffé d'un bâtiment tertiaire (hôpitaux, EHPAD, collectivités).",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-th-160-calorifugeage-reseaux-residentiel",
    code: "BAR-TH-160",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — réseaux",
    title: "Isolation d'un réseau hydraulique de chauffage",
    pitch:
      "Le calorifugeage des immeubles collectifs et copropriétés : des dizaines de kilomètres de réseaux traités chaque année.",
    shortDescription:
      "Isolation des canalisations de chauffage et d'eau chaude sanitaire circulant dans les parties communes non chauffées d'un immeuble d'habitation collectif.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bat-th-155-points-singuliers-tertiaire",
    code: "BAT-TH-155",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — réseaux",
    title: "Isolation des points singuliers d'un réseau",
    pitch:
      "Vannes, brides, piquages : des housses isolantes démontables sur les points souvent oubliés du calorifugeage.",
    shortDescription:
      "Mise en place de matelas ou housses isolantes sur les points singuliers (vannes, clapets, brides) d'un réseau de chauffage ou d'ECS en bâtiment tertiaire.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-th-161-points-singuliers-residentiel",
    code: "BAR-TH-161",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — réseaux",
    title: "Isolation des points singuliers (résidentiel)",
    pitch:
      "Le complément indispensable du calorifugeage en copropriété, chiffré au point traité.",
    shortDescription:
      "Pose de housses isolantes sur les vannes, clapets et brides d'un réseau hydraulique de chauffage collectif d'habitation.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* ISOLATION DE L'ENVELOPPE                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "bat-en-103-plancher-bas-tertiaire",
    code: "BAT-EN-103",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — enveloppe",
    title: "Isolation d'un plancher bas",
    pitch:
      "Sous-sols, parkings, vides sanitaires : 7 à 10 % de déperditions en moins par le sol.",
    shortDescription:
      "Isolation en sous-face des planchers bas d'un bâtiment tertiaire situés au-dessus de locaux non chauffés.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bat-en-101-combles-toiture-tertiaire",
    code: "BAT-EN-101",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — enveloppe",
    title: "Isolation de combles ou de toitures",
    pitch:
      "Jusqu'à 30 % des pertes de chaleur passent par le toit d'un bâtiment mal isolé.",
    shortDescription:
      "Mise en place d'un procédé d'isolation thermique en combles perdus ou en toiture d'un bâtiment tertiaire existant.",
    image:
      "https://images.unsplash.com/photo-1489514354504-1653aa90e34e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-en-101-combles-toiture-residentiel",
    code: "BAR-EN-101",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — enveloppe",
    title: "Isolation de combles ou de toitures (résidentiel)",
    pitch:
      "Projection ou laine déroulée, rapide et non intrusive, avec des économies dès les premiers mois.",
    shortDescription:
      "Isolation thermique des combles perdus ou des rampants de toiture d'un logement ou d'un immeuble d'habitation.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-en-102-isolation-murs-residentiel",
    code: "BAR-EN-102",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — enveloppe",
    title: "Isolation des murs",
    pitch:
      "Par l'extérieur ou l'intérieur, l'un des postes les plus rentables en habitation collective.",
    shortDescription:
      "Mise en place d'un procédé d'isolation thermique sur des murs donnant sur l'extérieur d'un bâtiment résidentiel existant.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* CHAUFFAGE, RÉGULATION & PILOTAGE                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "bat-th-116-gestion-technique-du-batiment",
    code: "BAT-TH-116",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — pilotage",
    title: "Système de gestion technique du bâtiment (GTB)",
    pitch:
      "Piloter chauffage, ventilation et éclairage depuis une supervision unique. Attendu par le décret tertiaire.",
    shortDescription:
      "Mise en place ou amélioration d'un système de gestion technique du bâtiment de classe A ou B sur un bâtiment tertiaire.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-th-117-robinet-thermostatique",
    code: "BAR-TH-117",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — régulation",
    title: "Robinet thermostatique",
    pitch:
      "Réguler la chaleur pièce par pièce, sans gros travaux, sur les radiateurs à eau chaude existants.",
    shortDescription:
      "Pose de robinets thermostatiques sur les émetteurs d'un réseau de chauffage à eau chaude d'un logement ou d'un immeuble collectif.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "desembouage-equilibrage-reseaux",
    code: "Chaufferie",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Chaufferie collective — performance",
    title: "Désembouage & équilibrage des organes",
    pitch:
      "Nettoyer les circuits, régler vannes et pompes : jusqu'à 15 à 25 % d'économies sans changer d'équipement.",
    shortDescription:
      "Nettoyage hydraulique des réseaux de chauffage et réglage des organes de régulation (vannes, pompes, thermostats) d'une chaufferie collective. Éligible aux CEE.",
    image:
      "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=1200&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* FROID, RÉCUPÉRATION DE CHALEUR & ÉCLAIRAGE                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "recuperation-chaleur-groupes-froids",
    code: "Groupe froid",
    status: "coming-soon",
    sectorKey: "IND",
    sector: "Industrie & tertiaire — froid",
    title: "Récupération de chaleur sur les groupes froids",
    pitch:
      "Valoriser l'énergie rejetée par le refroidissement pour chauffer ou produire de l'eau chaude. Aussi : haute pression flottante.",
    shortDescription:
      "Installation d'un échangeur de récupération de chaleur (et/ou d'une régulation haute pression flottante) sur un groupe de production de froid existant.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bat-eq-127-eclairage-led",
    code: "BAT-EQ-127",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire & extérieur — éclairage",
    title: "Éclairage à modules LED (intérieur & extérieur)",
    pitch:
      "Jusqu'à 80 % de consommation en moins, et jusqu'à 50 % de plus avec détection de présence.",
    shortDescription:
      "Remplacement des luminaires existants par des luminaires à modules LED performants, avec détection ou gradation, en bâtiment tertiaire ou éclairage extérieur.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* CADRE CONTRACTUEL                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "contrat-performance-energetique-cpe",
    code: "CPE",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Tous bâtiments — engagement de résultat",
    title: "Contrat de Performance Énergétique (Pack CPE)",
    pitch:
      "Un bouquet de travaux avec économies garanties sur 5 ans : si l'objectif n'est pas atteint, le surplus est remboursé.",
    shortDescription:
      "Montage d'un bouquet de travaux (récupération de chaleur, HP flottante, équilibrage, isolation, LED) assorti d'un Contrat de Performance Énergétique bonifiant la prime CEE. Objectif ≥ 20 % d'économies garanti ≥ 5 ans.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
  },
];

/* -------------------------------------------------------------------------- */
/* Sélecteurs                                                                 */
/* -------------------------------------------------------------------------- */

export function getOperationBySlug(slug: string): CeeOperation | undefined {
  return operations.find((operation) => operation.slug === slug);
}

export function getLiveOperations(): CeeOperation[] {
  return operations.filter((operation) => operation.status === "live");
}

export function getOperationsBySector(key: CeeSectorKey): CeeOperation[] {
  return operations.filter((operation) => operation.sectorKey === key);
}

export function countOperationsBySector(key: CeeSectorKey): number {
  return getOperationsBySector(key).length;
}

/** Liste dédupliquée des profils clients cités par au moins une opération "live". */
export function getAllProfiles(): string[] {
  const set = new Set<string>();
  for (const operation of operations) {
    for (const profile of operation.applicableProfiles ?? []) set.add(profile);
  }
  return Array.from(set);
}

export function firstLiveOperationForProfile(
  profile: string,
): CeeOperation | undefined {
  return operations.find(
    (operation) =>
      operation.status === "live" &&
      (operation.applicableProfiles ?? []).includes(profile),
  );
}

import type { CeeOperation, CeeSectorKey } from "@/types/operation";

/**
 * Catalogue des opérations standardisées CEE.
 *
 * - `status: "live"`  → dispose d'une page /solutions/[slug] complète et
 *   d'un barème vérifié (aujourd'hui : AGRI-EQ-110 uniquement).
 * - `status: "coming-soon"` → entrée de catalogue : code + intitulé officiels
 *   publiés par le Ministère de la Transition Écologique, description
 *   générique, AUCUN barème ni montant. Accompagnement à activer.
 *
 * EXTENSIBILITÉ : pour publier une nouvelle fiche, passer son entrée en
 * "live" et renseigner heroTitle/heroSubtitle/variants/coefficients/…
 *
 * TODO: Yohan/Énergies Plus — confirmer et compléter la liste des fiches
 * réellement accompagnées ; certaines opérations évoluent ou sont abrogées.
 */
export const operations: CeeOperation[] = [
  /* ------------------------------------------------------------------ */
  /* AGRICULTURE                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "agri-eq-110-sechage-solaire-agricole",
    code: "AGRI-EQ-110",
    status: "live",
    sectorKey: "AGRI",
    sector: "Agriculture — produits et co-produits agricoles et forestiers",
    title:
      "Séchage solaire par insufflation d'air (panneaux solaires hybrides)",
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

  {
    slug: "agri-th-102-recuperateur-chaleur-tank-a-lait",
    code: "AGRI-TH-102",
    status: "coming-soon",
    sectorKey: "AGRI",
    sector: "Agriculture — élevage laitier",
    title: "Récupérateur de chaleur sur groupe froid de tank à lait",
    pitch:
      "Récupérer la chaleur rejetée par le refroidissement du lait pour produire de l'eau chaude sanitaire à la ferme.",
    shortDescription:
      "Installation d'un récupérateur de chaleur sur le groupe de production de froid d'un tank à lait, pour valoriser l'énergie fatale.",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "agri-eq-101-pre-refroidisseur-laitier",
    code: "AGRI-EQ-101",
    status: "coming-soon",
    sectorKey: "AGRI",
    sector: "Agriculture — élevage laitier",
    title: "Pré-refroidisseur pour le lait",
    pitch:
      "Abaisser la température du lait avant le tank pour réduire la consommation du groupe froid.",
    shortDescription:
      "Mise en place d'un échangeur pré-refroidisseur sur l'installation de traite, en amont du tank à lait.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* BÂTIMENT RÉSIDENTIEL                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "bar-en-101-isolation-combles-toiture",
    code: "BAR-EN-101",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — enveloppe",
    title: "Isolation de combles ou de toitures",
    pitch:
      "Le poste de déperdition n°1 d'un logement. Une des opérations CEE les plus demandées.",
    shortDescription:
      "Mise en place d'un procédé d'isolation thermique en combles perdus ou en rampants de toiture d'un bâtiment résidentiel existant.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-th-171-pompe-a-chaleur-air-eau",
    code: "BAR-TH-171",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — chauffage",
    title: "Pompe à chaleur de type air/eau",
    pitch:
      "Remplacer une chaudière par une PAC air/eau performante pour le chauffage et l'eau chaude.",
    shortDescription:
      "Installation d'une pompe à chaleur air/eau assurant le chauffage central d'une maison individuelle ou d'un appartement.",
    image:
      "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "bar-th-143-systeme-solaire-combine",
    code: "BAR-TH-143",
    status: "coming-soon",
    sectorKey: "BAR",
    sector: "Bâtiment résidentiel — énergies renouvelables",
    title: "Système solaire combiné",
    pitch:
      "Capteurs solaires thermiques pour couvrir une partie du chauffage et de l'eau chaude.",
    shortDescription:
      "Mise en place d'un système solaire combiné (chauffage + eau chaude sanitaire) dans un logement existant.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* BÂTIMENT TERTIAIRE                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "bat-th-116-gestion-technique-du-batiment",
    code: "BAT-TH-116",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — pilotage",
    title: "Système de gestion technique du bâtiment (GTB)",
    pitch:
      "Piloter chauffage, ventilation et éclairage depuis une supervision : un des plus gros gisements du tertiaire.",
    shortDescription:
      "Mise en place ou amélioration d'un système de gestion technique du bâtiment (GTB) de classe A ou B sur un bâtiment tertiaire.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "bat-eq-127-luminaire-led-tertiaire",
    code: "BAT-EQ-127",
    status: "coming-soon",
    sectorKey: "BAT",
    sector: "Bâtiment tertiaire — éclairage",
    title: "Luminaire à modules LED",
    pitch:
      "Rénover l'éclairage d'un local d'activité par des luminaires LED performants avec détection.",
    shortDescription:
      "Remplacement de luminaires existants par des luminaires à modules LED dans un bâtiment tertiaire.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* INDUSTRIE                                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "ind-ut-121-moto-variateur-electrique",
    code: "IND-UT-121",
    status: "coming-soon",
    sectorKey: "IND",
    sector: "Industrie — utilités",
    title: "Moto-variateur / variation électronique de vitesse",
    pitch:
      "Adapter la vitesse d'un moteur à son besoin réel (pompes, ventilateurs) au lieu de le brider.",
    shortDescription:
      "Mise en place d'un variateur électronique de vitesse sur un moteur asynchrone d'une installation industrielle.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "ind-ba-112-calorifugeage-points-singuliers",
    code: "IND-BA-112",
    status: "coming-soon",
    sectorKey: "IND",
    sector: "Industrie — réseaux",
    title: "Calorifugeage des points singuliers (matelas isolants)",
    pitch:
      "Isoler vannes, brides et piquages d'un réseau chaud ou froid avec des matelas démontables.",
    shortDescription:
      "Mise en place de housses ou matelas isolants sur les points singuliers d'un réseau d'une installation industrielle.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "ind-ut-134-recuperation-chaleur-sur-froid",
    code: "IND-UT-134",
    status: "coming-soon",
    sectorKey: "IND",
    sector: "Industrie — récupération de chaleur",
    title: "Récupération de chaleur sur un groupe de production de froid",
    pitch:
      "Valoriser la chaleur rejetée par la production de froid pour de l'eau chaude ou du préchauffage.",
    shortDescription:
      "Installation d'un système de récupération de chaleur sur le condenseur d'un groupe de production de froid industriel.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* RÉSEAUX                                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "res-ch-108-raccordement-reseau-de-chaleur",
    code: "RES-CH-108",
    status: "coming-soon",
    sectorKey: "RES",
    sector: "Réseaux — chaleur",
    title: "Raccordement d'un bâtiment à un réseau de chaleur",
    pitch:
      "Se raccorder à un réseau de chaleur alimenté majoritairement par des énergies renouvelables et de récupération.",
    shortDescription:
      "Raccordement d'un bâtiment résidentiel ou tertiaire à un réseau de chaleur classé, incluant la sous-station.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&q=80&auto=format&fit=crop",
  },
  {
    slug: "res-ec-104-renovation-eclairage-public",
    code: "RES-EC-104",
    status: "coming-soon",
    sectorKey: "RES",
    sector: "Réseaux — éclairage public",
    title: "Rénovation de l'éclairage extérieur",
    pitch:
      "Remplacer les points lumineux vétustes d'une commune par des luminaires LED pilotés.",
    shortDescription:
      "Rénovation d'installations d'éclairage extérieur (voirie, parkings) par des luminaires performants avec régulation.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&q=80&auto=format&fit=crop",
  },

  /* ------------------------------------------------------------------ */
  /* TRANSPORT                                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "tra-se-114-formation-ecoconduite",
    code: "TRA-SE-114",
    status: "coming-soon",
    sectorKey: "TRA",
    sector: "Transport — exploitation",
    title: "Formation à l'écoconduite des conducteurs",
    pitch:
      "Former les conducteurs d'une flotte à la conduite économe : des litres en moins, tout de suite.",
    shortDescription:
      "Programme de formation à l'écoconduite pour les conducteurs de véhicules d'une flotte professionnelle.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&q=80&auto=format&fit=crop",
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

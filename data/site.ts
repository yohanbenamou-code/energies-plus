/**
 * Configuration éditoriale du site (coordonnées, chiffres, preuves, FAQ).
 *
 * Tout ce qui est marqué `TODO: ... Yohan/Energie+` est une donnée
 * manquante à renseigner avant mise en production.
 * Aucune statistique, aucun avis client, aucun logo n'est inventé : les
 * emplacements existent mais restent explicitement vides.
 */

export const site = {
  name: "Energie+",
  baseline:
    "Le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés, du cadrage du dossier à la réception du chantier.",

  // Mention de conformité à afficher partout (footer + sections dédiées).
  legalMention:
    "Energie+ est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des Certificats d'Économies d'Énergie, encadré par le Ministère de la Transition Écologique.",
  privateActorShort:
    "Energie+ est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des CEE.",

  contact: {
    phoneDisplay: "07 68 96 15 73",
    phoneHref: "tel:+33768961573",
    /** WhatsApp (même numéro) : lien wa.me, message pré-rempli ajouté côté composant. */
    whatsappUrl: "https://wa.me/33768961573",
    email: "contact@energies-plus.fr",
    // Valeur par défaut plausible — à confirmer par Energie+.
    hours: "Du lundi au vendredi, de 9h à 18h",
  },

  legal: {
    companyName: "Energie+",
    siret: "901 997 403 00026",
    siren: "901 997 403",
    address: "187 rue de Courcelles, 75017 Paris",
    rcs: "RCS Créteil 901 997 403",
    // N° TVA intracommunautaire calculé depuis le SIREN (clé = (12 + 3×(SIREN mod 97)) mod 97).
    // À confirmer par Energie+ (valable sous réserve d'assujettissement à la TVA).
    vat: "FR 02 901 997 403",
    // Renseignés par Energie+ (extrait Kbis) : forme juridique + capital.
    legalForm: "SAS" as string,
    capital: "" as string, // ex. "10 000 €"
    // Personne physique responsable de la publication (souvent le dirigeant).
    publicationDirector: "" as string,
    // Assurance responsabilité civile professionnelle / décennale.
    insurer: "" as string, // nom de l'assureur
    insurancePolicy: "" as string, // n° de police
    insuranceArea: "France métropolitaine",
  },

  /**
   * Hébergeur du site (obligatoire dans les mentions légales). Le site est
   * déployé sur Vercel : entité et adresse ci-dessous vérifiables publiquement.
   */
  host: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    url: "https://vercel.com",
    contact: "privacy@vercel.com",
  },

  /**
   * Réseaux sociaux. Vides tant qu'Energie+ n'a pas communiqué les URL.
   * Dès qu'une valeur est renseignée, elle s'affiche dans le footer et est
   * ajoutée au `sameAs` du JSON-LD Organization.
   */
  socials: {
    linkedin: "",
    facebook: "",
    youtube: "",
  },

  /**
   * Planning de rendez-vous Google Agenda. `url` = lien public (nouvel onglet),
   * `embedUrl` = même planning en version intégrable (gv=true).
   */
  booking: {
    url: "https://calendar.app.google/SkgYCusBa99DQZMT8",
    embedUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3fdzfmtfND4OIsMs7og2kp6dtO7jtRSFiGOYLVSUV_omI_o55emmYMrcnooH57KSG_QvR384R4?gv=true&hl=fr",
  },

  serviceArea: "Toute la France métropolitaine.",

  /**
   * Chiffres clés de la homepage. `value: null` = donnée non communiquée :
   * le composant affiche un tiret et un libellé "donnée à compléter".
   * NE PAS inventer de valeurs.
   */
  stats: [
    {
      key: "exploitations",
      // TODO: placeholder à remplacer par Yohan/Energie+
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "exploitations accompagnées",
    },
    {
      key: "cumac",
      // TODO: placeholder à remplacer par Yohan/Energie+
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "kWh cumac générés pour nos clients",
    },
    {
      key: "experience",
      // TODO: placeholder à remplacer par Yohan/Energie+
      value: null as number | null,
      prefix: "",
      suffix: " ans",
      label: "d'expertise du dispositif CEE",
    },
  ],

  /**
   * Logos clients / partenaires. Vide tant que Energie+ n'a pas
   * fourni les visuels et les autorisations d'utilisation.
   * TODO: placeholder à remplacer par Yohan/Energie+
   */
  clientLogos: [] as Array<{ name: string; src: string }>,

  /**
   * Note d'avis agrégée. `null` tant qu'aucune source vérifiable
   * (Google, Trustpilot, Pages Jaunes…) n'est fournie.
   * TODO: placeholder à remplacer par Yohan/Energie+
   */
  rating: null as { score: number; count: number; source: string } | null,

  /**
   * Témoignages. EXEMPLES DE STRUCTURE UNIQUEMENT — ne pas publier en
   * l'état. À remplacer par de vrais témoignages clients recueillis et
   * autorisés par Energie+.
   * TODO: placeholder à remplacer par Yohan/Energie+
   */
  testimonials: [] as Array<{
    quote: string;
    author: string;
    role: string;
    location: string;
  }>,

  certifications: [
    "Panneaux hybrides certifiés IEC 61215 & IEC 61730",
    "Puissance thermique mesurée selon ISO 9806 (ou norme européenne ETV)",
    "Mise en place réalisée exclusivement par des professionnels",
  ],
} as const;

export type SiteConfig = typeof site;

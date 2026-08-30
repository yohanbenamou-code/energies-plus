/**
 * Configuration éditoriale du site (coordonnées, chiffres, preuves, FAQ).
 *
 * Tout ce qui est marqué `TODO: ... Yohan/Énergies Plus` est une donnée
 * manquante à renseigner avant mise en production.
 * Aucune statistique, aucun avis client, aucun logo n'est inventé : les
 * emplacements existent mais restent explicitement vides.
 */

export const site = {
  name: "Énergies Plus",
  baseline:
    "Le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés — du cadrage du dossier à la réception du chantier.",

  // Mention de conformité à afficher partout (footer + sections dédiées).
  legalMention:
    "Énergies Plus est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des Certificats d'Économies d'Énergie, encadré par le Ministère de la Transition Écologique.",
  privateActorShort:
    "Énergies Plus est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des CEE.",

  contact: {
    phoneDisplay: "07 68 96 15 73",
    phoneHref: "tel:+33768961573",
    email: "contact@energies-plus.fr",
    hours: "Du lundi au vendredi, 9h — 18h", // TODO: horaires réels à confirmer
  },

  legal: {
    companyName: "Énergies Plus",
    siret: "901 997 403 00026",
    siren: "901 997 403",
    address: "27 avenue de Paris, 94300 Vincennes",
    rcs: "RCS Créteil 901 997 403",
    insurance: "TODO — assurance responsabilité civile / décennale", // TODO
  },

  socials: {
    // TODO: placeholder à remplacer par Yohan/Énergies Plus
    linkedin: "", // TODO: URL LinkedIn
    facebook: "", // TODO: URL Facebook
    youtube: "", // TODO: URL YouTube
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
      // TODO: placeholder à remplacer par Yohan/Énergies Plus
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "exploitations accompagnées",
    },
    {
      key: "cumac",
      // TODO: placeholder à remplacer par Yohan/Énergies Plus
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "kWh cumac générés pour nos clients",
    },
    {
      key: "experience",
      // TODO: placeholder à remplacer par Yohan/Énergies Plus
      value: null as number | null,
      prefix: "",
      suffix: " ans",
      label: "d'expertise du dispositif CEE",
    },
  ],

  /**
   * Logos clients / partenaires. Vide tant que Énergies Plus n'a pas
   * fourni les visuels et les autorisations d'utilisation.
   * TODO: placeholder à remplacer par Yohan/Énergies Plus
   */
  clientLogos: [] as Array<{ name: string; src: string }>,

  /**
   * Note d'avis agrégée. `null` tant qu'aucune source vérifiable
   * (Google, Trustpilot, Pages Jaunes…) n'est fournie.
   * TODO: placeholder à remplacer par Yohan/Énergies Plus
   */
  rating: null as { score: number; count: number; source: string } | null,

  /**
   * Témoignages. EXEMPLES DE STRUCTURE UNIQUEMENT — ne pas publier en
   * l'état. À remplacer par de vrais témoignages clients recueillis et
   * autorisés par Énergies Plus.
   * TODO: placeholder à remplacer par Yohan/Énergies Plus
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

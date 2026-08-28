/**
 * Configuration éditoriale du site (coordonnées, chiffres, preuves, FAQ).
 *
 * Tout ce qui est marqué `TODO: placeholder à remplacer par Yohan/Solaire
 * Energie` est une donnée manquante à renseigner avant mise en production.
 * Aucune statistique, aucun avis client, aucun logo n'est inventé : les
 * emplacements existent mais restent explicitement vides.
 */

export const site = {
  name: "Solaire Energie",
  baseline:
    "Accompagnement CEE des exploitations agricoles et forestières — du cadrage à l'installation.",

  // Mention de conformité à afficher partout (footer + sections dédiées).
  legalMention:
    "Solaire Energie est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des Certificats d'Économies d'Énergie, encadré par le Ministère de la Transition Écologique. Opération standardisée CEE n° AGRI-EQ-110.",
  privateActorShort:
    "Solaire Energie est un professionnel privé accompagnant ses clients dans le cadre du dispositif public des CEE.",

  // TODO: placeholder à remplacer par Yohan/Solaire Energie
  contact: {
    phoneDisplay: "0X XX XX XX XX", // TODO: numéro de téléphone
    phoneHref: "tel:+330000000000", // TODO: numéro de téléphone (format E.164)
    email: "contact@solaire-energie.fr", // TODO: email de contact
    hours: "Du lundi au vendredi, 9h — 18h", // TODO: horaires réels
  },

  // TODO: placeholder à remplacer par Yohan/Solaire Energie
  legal: {
    companyName: "Solaire Energie", // TODO: raison sociale exacte
    siret: "TODO — SIRET", // TODO: SIRET
    address: "TODO — adresse complète du siège", // TODO: adresse
    rcs: "TODO — RCS / immatriculation", // TODO
    insurance: "TODO — assurance responsabilité civile / décennale", // TODO
  },

  socials: {
    // TODO: placeholder à remplacer par Yohan/Solaire Energie
    linkedin: "", // TODO: URL LinkedIn
    facebook: "", // TODO: URL Facebook
    youtube: "", // TODO: URL YouTube
  },

  serviceArea:
    "France métropolitaine — zones climatiques H1, H2 et H3.",

  /**
   * Chiffres clés de la homepage. `value: null` = donnée non communiquée :
   * le composant affiche un tiret et un libellé "donnée à compléter".
   * NE PAS inventer de valeurs.
   */
  stats: [
    {
      key: "exploitations",
      // TODO: placeholder à remplacer par Yohan/Solaire Energie
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "exploitations accompagnées",
    },
    {
      key: "cumac",
      // TODO: placeholder à remplacer par Yohan/Solaire Energie
      value: null as number | null,
      prefix: "+",
      suffix: "",
      label: "kWh cumac générés pour nos clients",
    },
    {
      key: "experience",
      // TODO: placeholder à remplacer par Yohan/Solaire Energie
      value: null as number | null,
      prefix: "",
      suffix: " ans",
      label: "d'expertise du dispositif CEE",
    },
  ],

  /**
   * Logos clients / partenaires. Vide tant que Solaire Energie n'a pas
   * fourni les visuels et les autorisations d'utilisation.
   * TODO: placeholder à remplacer par Yohan/Solaire Energie
   */
  clientLogos: [] as Array<{ name: string; src: string }>,

  /**
   * Note d'avis agrégée. `null` tant qu'aucune source vérifiable
   * (Google, Trustpilot, Pages Jaunes…) n'est fournie.
   * TODO: placeholder à remplacer par Yohan/Solaire Energie
   */
  rating: null as { score: number; count: number; source: string } | null,

  /**
   * Témoignages. EXEMPLES DE STRUCTURE UNIQUEMENT — ne pas publier en
   * l'état. À remplacer par de vrais témoignages clients recueillis et
   * autorisés par Solaire Energie.
   * TODO: placeholder à remplacer par Yohan/Solaire Energie
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

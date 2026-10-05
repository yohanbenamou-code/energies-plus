"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { PrincipleSection } from "@/components/PrincipleSection";
import { SolarDocuments, SolarEligibility } from "@/components/SolarEligibility";
import { HowItWorks } from "@/components/HowItWorks";
import { MprProfileChecker } from "@/components/MprProfileChecker";
import { SolarSimulator } from "@/components/SolarSimulator";
import { BenefitList } from "@/components/BenefitList";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { SolarLeadForm } from "@/components/SolarLeadForm";
import { BookingSection } from "@/components/BookingSection";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SolarFormProvider } from "@/components/solar-form-context";

const NAV = [
  { label: "Le principe", href: "#dispositif" },
  { label: "Éligibilité", href: "#solutions" },
  { label: "Étapes", href: "#methode" },
  { label: "Estimation", href: "#simulateur" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const TRUST_ITEMS = [
  "MaPrimeRénov' et CEE",
  "Installation par des professionnels",
  "Dossier géré de A à Z",
  "Étude sous 48h",
  "Toute la France métropolitaine",
];

const POINTS = [
  {
    title: "Un reste à charge réduit",
    body: "MaPrimeRénov' et les Certificats d'Économies d'Énergie peuvent financer une part importante du projet, selon votre éligibilité et votre catégorie de revenus.",
  },
  {
    title: "Fini le gaz, le fioul et le charbon",
    body: "La chaudière est remplacée par la pompe à chaleur et déposée. Les capteurs solaires prennent en charge une partie du chauffage et de l'eau chaude.",
  },
  {
    title: "Un dossier géré de A à Z",
    body: "Dépôt, demande de subvention, devis, installation : nous accompagnons chaque étape, avant toute signature de devis.",
  },
];

const CONDITIONS = [
  "Maison individuelle existante en France métropolitaine",
  "Dispositif solaire thermique à capteurs vitrés (eau ou eau glycolée), hors capteurs hybrides, livré sans appoint avec un ballon de stockage et un régulateur",
  "Surface totale de capteurs d'au moins 8 m² pour le chauffage et l'eau chaude sanitaire",
  "Ballon de stockage de capacité strictement supérieure à 400 litres",
  "Chauffage central de type basse température",
  "Capteurs d'une puissance de sortie d'au moins 450 W/m² (norme ISO 9806, écart de température de 50 K), certifiés QB ou Solar Keymark, ou équivalent",
  "Pose réalisée par un professionnel titulaire d'un signe de qualité (de type RGE)",
];

const STEPS = [
  {
    title: "Dépôt du dossier",
    body: "Confirmation du rendez-vous, contrôle des documents, demande de subvention et édition du devis.",
  },
  {
    title: "Validation du dossier",
    body: "La subvention est accordée. L'installation est ensuite programmée sous 7 jours maximum.",
  },
  {
    title: "Installation",
    body: "Pose du matériel par des professionnels, procès-verbal de fin de travaux et règlement du reste à charge.",
  },
  {
    title: "Mise en service",
    body: "Votre chaudière est déposée : le chauffage et l'eau chaude sont désormais produits par la pompe à chaleur et le solaire.",
  },
];

const BENEFITS = [
  {
    title: "Un reste à charge réduit",
    body: "MaPrimeRénov' et les CEE peuvent financer une part importante du projet, selon votre catégorie de revenus. Montant précisé lors de l'étude, non contractuel.",
  },
  {
    title: "Fini le gaz, le fioul et le charbon",
    body: "La chaudière est déposée. Vous n'êtes plus exposé aux variations de prix de ces énergies.",
  },
  {
    title: "Le soleil pour l'eau chaude et le chauffage",
    body: "Les capteurs solaires thermiques produisent une chaleur directement stockée dans le ballon de la maison.",
  },
  {
    title: "Un dossier sans paperasse",
    body: "Nous gérons la demande de subvention, le devis, l'installation et le suivi jusqu'à la fin des travaux.",
  },
  {
    title: "Du matériel conçu pour durer",
    body: "La fiche officielle retient une durée de vie de 25 ans pour le dispositif solaire.",
  },
  {
    title: "Un interlocuteur unique",
    body: "Le même conseiller, de la première étude à la réception des travaux.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qui peut en bénéficier ?",
    plainAnswer:
      "Les propriétaires d'une maison individuelle en France métropolitaine : propriétaires occupants ou bailleurs pour MaPrimeRénov' (maison de plus de 15 ans, résidence principale pour un occupant), et également locataires ou propriétaires d'une résidence secondaire pour le dossier CEE (maison de plus de 2 ans).",
    answer: (
      <p>
        Les propriétaires d&apos;une <strong>maison individuelle</strong> en
        France métropolitaine. Pour MaPrimeRénov&apos; : maison de plus de 15 ans,
        propriétaire occupant (résidence principale) ou bailleur. Pour le dossier
        CEE : maison de plus de 2 ans, y compris pour un locataire ou une
        résidence secondaire.
      </p>
    ),
  },
  {
    question: "Quelle maison est adaptée à cette offre ?",
    plainAnswer:
      "Une maison chauffée uniquement au gaz, au fioul ou au charbon, avec un chauffage central à eau compatible basse température (radiateurs ou plancher chauffant), sans pompe à chaleur déjà installée. Le toit doit pouvoir recevoir au moins 8 m² de capteurs, et il faut de la place pour le ballon de stockage.",
    answer: (
      <p>
        Une maison chauffée <strong>uniquement au gaz, au fioul ou au charbon</strong>
        , avec un chauffage central à eau compatible basse température, sans
        pompe à chaleur déjà installée. Le toit doit pouvoir recevoir au moins
        8 m² de capteurs et il faut de la place pour le ballon de stockage.
      </p>
    ),
  },
  {
    question: "Quelle différence entre MaPrimeRénov' et les CEE ?",
    plainAnswer:
      "Ce sont deux dossiers distincts, avec des critères différents. MaPrimeRénov' dépend de votre catégorie de revenus et de l'ancienneté de la maison. Les Certificats d'Économies d'Énergie sont financés par les fournisseurs d'énergie et s'expriment en kWh cumac. Nos conseillers choisissent avec vous le montage adapté.",
    answer: (
      <p>
        Deux dossiers distincts. <strong>MaPrimeRénov&apos;</strong> dépend de
        votre catégorie de revenus et de l&apos;ancienneté de la maison. Les{" "}
        <strong>CEE</strong> sont financés par les fournisseurs d&apos;énergie et
        s&apos;expriment en kWh cumac. Nos conseillers choisissent avec vous le
        montage adapté.
      </p>
    ),
  },
  {
    question: "Quelle est la bonification CEE en 2026 ?",
    plainAnswer:
      "Pour la fiche BAR-TH-168 (dispositif solaire thermique), le volume de certificats est multiplié par 5 pour les ménages modestes et par 4 pour les autres, pour les opérations engagées avant le 1er janvier 2027, à condition qu'aucun équipement utilisant des énergies fossiles ne soit installé ou conservé pour le chauffage et l'eau chaude (arrêté du 17 août 2026).",
    answer: (
      <p>
        Pour la fiche BAR-TH-168, le volume de certificats est multiplié par{" "}
        <strong>5 pour les ménages modestes</strong> et par{" "}
        <strong>4 pour les autres</strong>, pour les opérations engagées avant le
        1er janvier 2027, à condition qu&apos;aucun équipement fonctionnant aux
        énergies fossiles ne soit installé ou conservé pour le chauffage et
        l&apos;eau chaude (arrêté du 17 août 2026).
      </p>
    ),
  },
  {
    question: "Le montant de l'aide est-il garanti ?",
    plainAnswer:
      "Non. Seul le volume en kWh cumac est défini par le barème officiel. Sa valeur en euros dépend du moment et de votre situation ; tout montant en euros est une estimation non contractuelle, sous réserve d'éligibilité. Les aides MaPrimeRénov' dépendent de votre dossier et des dispositifs en vigueur.",
    answer: (
      <p>
        <strong>Non.</strong> Seul le volume en kWh cumac est fixé par le
        barème. Sa valeur en euros varie&nbsp;: tout montant est une estimation
        non contractuelle, sous réserve d&apos;éligibilité. Les aides
        MaPrimeRénov&apos; dépendent de votre dossier et des dispositifs en
        vigueur.
      </p>
    ),
  },
  {
    question: "Peut-on cumuler les aides ?",
    plainAnswer:
      "La fiche CEE BAR-TH-168 n'est pas cumulable avec les fiches CEE BAR-TH-171 et BAR-TH-172 (pompes à chaleur). Le montage financier (CEE et/ou MaPrimeRénov') est défini par nos conseillers selon votre situation, avant la signature du devis.",
    answer: (
      <p>
        La fiche BAR-TH-168 n&apos;est pas cumulable avec les fiches CEE
        BAR-TH-171 et BAR-TH-172 (pompes à chaleur). Le montage financier (CEE
        et/ou MaPrimeRénov&apos;) est défini par nos conseillers selon votre
        situation, avant la signature du devis.
      </p>
    ),
  },
  {
    question: "Peut-on installer le solaire sans pompe à chaleur ?",
    plainAnswer:
      "Dans notre offre, la pompe à chaleur et le système solaire sont proposés ensemble dans toutes les zones climatiques. Le système solaire seul n'est possible qu'en zone climatique H3.",
    answer: (
      <p>
        Dans notre offre, pompe à chaleur et système solaire sont proposés
        ensemble dans toutes les zones climatiques. Le solaire seul n&apos;est
        possible qu&apos;en <strong>zone H3</strong>.
      </p>
    ),
  },
  {
    question: "Combien de panneaux peut-on installer ?",
    plainAnswer:
      "Le nombre maximal de panneaux dépend de la surface disponible en toiture et des déperditions thermiques de la maison, issues de la note de dimensionnement de la pompe à chaleur. Chaque panneau mesure environ 2 m² et un calepinage de votre toiture est réalisé par nos soins. Deux pompes à chaleur peuvent être installées en cascade si les besoins de la maison le nécessitent.",
    answer: (
      <p>
        Cela dépend de la <strong>surface disponible en toiture</strong> et des
        déperditions thermiques de la maison (note de dimensionnement de la
        pompe à chaleur). Chaque panneau mesure environ 2 m² et nous réalisons le
        calepinage de votre toiture. Deux pompes à chaleur peuvent être
        installées en cascade si les besoins le nécessitent.
      </p>
    ),
  },
  {
    question: "Energie+, c'est l'État ?",
    plainAnswer:
      "Non. Energie+ est une entreprise privée qui accompagne ses clients dans le cadre des dispositifs publics MaPrimeRénov' et CEE. Ce n'est ni un service de l'État ni un organisme public.",
    answer: (
      <p>
        <strong>Non.</strong> Energie+ est une entreprise privée qui vous
        accompagne dans le cadre des dispositifs publics MaPrimeRénov&apos; et
        CEE. Ni service de l&apos;État, ni organisme public.
      </p>
    ),
  },
];

export function SolarLanding() {
  return (
    <SolarFormProvider>
      <Header
        nav={NAV}
        ctaLabel="Recevoir mon étude gratuite"
        ctaHref="#contact"
        showBackToHome
      />

      <main id="contenu" className="pb-24 lg:pb-0">
        <Hero
          eyebrow="Maison individuelle, fiche CEE BAR-TH-168"
          title="Remplacez votre chaudière par une pompe à chaleur"
          titleAccent="couplée au solaire."
          subtitle="Un projet clé en main pour les maisons chauffées au gaz, au fioul ou au charbon, financé grâce à MaPrimeRénov' et aux Certificats d'Économies d'Énergie. Energie+ monte le dossier et coordonne l'installation par des professionnels."
          note="Financement selon votre éligibilité et votre catégorie de revenus. Montants en euros indicatifs et non contractuels."
          primaryCta={{ label: "Recevoir mon étude gratuite", href: "#contact" }}
          secondaryCta={{ label: "Vérifier mon éligibilité", href: "#solutions" }}
          image="https://images.unsplash.com/photo-1655300256335-beef51a914fe?w=1900&q=80&auto=format&fit=crop"
          imageAlt="Maison individuelle avec des capteurs solaires installés sur le toit"
          chips={[
            { value: "Gratuite", label: "Étude d'éligibilité" },
            { value: "x4 à x5", label: "Bonification CEE possible en 2026" },
            { value: "25 ans", label: "Durée de vie du dispositif solaire" },
          ]}
        />
        <TrustBar items={TRUST_ITEMS} />
        <PrincipleSection
          index="01"
          title="Une pompe à chaleur et du solaire, financés par les aides de l'État"
          description="MaPrimeRénov' et les Certificats d'Économies d'Énergie financent le remplacement d'une chaudière fossile par une pompe à chaleur couplée à un système solaire thermique (fiche CEE BAR-TH-168)."
          points={POINTS}
          notice="Le financement dépend de votre catégorie de revenus MaPrimeRénov' et des dispositifs en vigueur. Les montants en euros sont indicatifs, non contractuels et communiqués sous réserve d'éligibilité. Seul le volume officiel de l'aide CEE (en kWh cumac) est défini par le barème."
          tech={{
            title: "Le cadre technique de la fiche BAR-TH-168",
            intro:
              "L'aide CEE s'appuie sur une fiche officielle qui fixe des conditions précises. Nos conseillers les vérifient pour vous ; vous n'avez pas à les maîtriser.",
            conditions: CONDITIONS,
            footnotes: [
              "Durée de vie conventionnelle retenue par la fiche : 25 ans.",
              "La fiche BAR-TH-168 n'est pas cumulable avec les fiches CEE BAR-TH-171 et BAR-TH-172 (pompes à chaleur) : nos conseillers définissent le montage financier adapté (CEE et/ou MaPrimeRénov').",
            ],
          }}
        />
        <SolarEligibility index="02" />
        <HowItWorks
          id="methode"
          index="03"
          label="Comment ça marche"
          title="Votre projet en 4 étapes"
          description="Un projet encadré, sans contrainte et en toute sérénité."
          steps={STEPS}
        />
        <SolarDocuments index="04" />
        <MprProfileChecker index="05" />
        <SolarSimulator index="06" />
        <BenefitList
          index="07"
          title="Concrètement, pour votre maison"
          items={BENEFITS}
        />
        <TrustSection
          id="references"
          index="08"
          eyebrow="Pourquoi Energie+"
          title="On s'occupe de tout, dans le bon ordre"
          description="Un interlocuteur unique, du premier appel à la fin des travaux."
          points={[
            "Éligibilité, demande de subvention, devis, installation : tout est géré.",
            "Installation confiée exclusivement à des professionnels.",
            "Le dossier d'aide est monté avant la signature du devis.",
            "Le montage financier (CEE et/ou MaPrimeRénov') est défini avec vous dès l'étude.",
          ]}
          showCredentials
        />
        <Testimonials />
        <ServiceAreaSection
          index="09"
          subject="maison"
          note="L'offre pompe à chaleur et solaire est proposée dans toutes les zones climatiques (H1, H2, H3). Le volume d'aide varie selon la zone : nous en tenons compte dans votre estimation."
        />
        <Faq index="10" title="Vos questions" items={FAQ_ITEMS} />
        <SolarLeadForm index="11" />
        <BookingSection index="12" />
      </main>

      <Footer />
      <StickyMobileCta source="bar-th-168" operationCode="BAR-TH-168" />
    </SolarFormProvider>
  );
}

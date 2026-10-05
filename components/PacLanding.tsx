"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { PrincipleSection } from "@/components/PrincipleSection";
import { PacEligibilitySection } from "@/components/PacEligibilitySection";
import { HowItWorks } from "@/components/HowItWorks";
import { PacSimulator } from "@/components/PacSimulator";
import { BenefitList } from "@/components/BenefitList";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { BookingSection } from "@/components/BookingSection";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { Faq, type FaqItem } from "@/components/Faq";
import { PacLeadForm } from "@/components/PacLeadForm";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { PacFormProvider } from "@/components/pac-form-context";

const NAV = [
  { label: "Le principe", href: "#dispositif" },
  { label: "Secteurs", href: "#solutions" },
  { label: "Étapes", href: "#methode" },
  { label: "Estimation", href: "#simulateur" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const TRUST_ITEMS = [
  "Financé par le dispositif public des CEE",
  "Posé par des professionnels",
  "Matériel prévu pour durer 22 ans",
  "Étude sous 48h",
  "Toute la France",
];

const POINTS = [
  {
    title: "Une aide qui réduit votre facture",
    body: "Le dispositif public des CEE finance une partie de votre pompe à chaleur. Vous investissez, mais votre reste à charge baisse nettement.",
  },
  {
    title: "Un bonus si vous quittez une chaudière fossile",
    body: "Lorsque la PAC remplace une chaudière fioul, gaz ou charbon, le bonus « Coup de pouce Chauffage » peut tripler le volume d'aide.",
  },
  {
    title: "Un ordre à respecter",
    body: "Le dossier d'aide se monte avant la signature du devis. C'est notre métier : on s'en charge pour que rien ne bloque le versement.",
  },
];

const CONDITIONS = [
  "Bâtiment tertiaire existant depuis plus de 2 ans à la date d'engagement de l'opération",
  "PAC dimensionnée pour couvrir, en totalité ou en partie, les besoins de chauffage (seul, ou chauffage et eau chaude sanitaire) : une PAC destinée uniquement à l'eau chaude sanitaire n'est pas éligible",
  "Efficacité énergétique saisonnière (Etas) ≥ 111 % (basse température) ou ≥ 126 % (moyenne/haute température), pour une puissance ≤ 400 kW",
  "Coefficient de performance (COP) ≥ 3,4 mesuré selon la norme EN 14511-2, pour une puissance > 400 kW",
  "Remise obligatoire d'une note de dimensionnement au bénéficiaire",
];

const BENEFITS = [
  {
    title: "Moins à sortir de votre poche",
    body: "L'aide CEE, bonifiée en cas de remplacement d'une chaudière fossile, couvre une part importante de l'investissement. Montant estimé lors de l'étude, non contractuel.",
  },
  {
    title: "Une facture énergétique allégée",
    body: "Une pompe à chaleur performante produit plusieurs kWh de chaleur pour 1 kWh d'électricité consommée.",
  },
  {
    title: "Moins dépendant du fioul, du gaz et du charbon",
    body: "Vous sécurisez votre chaufferie face aux hausses de prix et aux contraintes réglementaires sur les énergies fossiles.",
  },
  {
    title: "Un confort thermique stable",
    body: "Chauffage, et éventuellement eau chaude sanitaire, assurés toute l'année, avec une régulation fine par zone.",
  },
  {
    title: "Une démarche de décarbonation valorisable",
    body: "Utile pour votre bilan carbone, vos obligations issues du décret tertiaire (dispositif Éco Énergie Tertiaire) et votre image.",
  },
  {
    title: "Fait pour durer",
    body: "Le matériel est prévu, selon la fiche officielle, pour fonctionner 22 ans.",
  },
];

const STEPS = [
  {
    title: "Étude gratuite",
    body: "On regarde votre bâtiment, votre chaufferie actuelle et votre région, puis on estime votre aide.",
  },
  {
    title: "Montage du dossier",
    body: "On formalise l'aide CEE, avant la signature du devis de l'installateur.",
  },
  {
    title: "Installation",
    body: "Des professionnels posent la pompe à chaleur, avec une note de dimensionnement conforme aux exigences de la fiche.",
  },
  {
    title: "Versement de la prime",
    body: "On constitue le dossier de preuve et la prime est valorisée selon les modalités convenues.",
  },
  {
    title: "Vous chauffez sans énergie fossile",
    body: "Pendant 22 ans, avec une chaufferie qui ne dépend plus du fioul, du gaz ou du charbon.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qui peut en bénéficier ?",
    plainAnswer:
      "Tout bâtiment tertiaire existant depuis plus de 2 ans : bureaux, établissements d'enseignement, hôtellerie-restauration, santé, commerces, ou tout autre secteur tertiaire. L'éligibilité précise dépend de votre projet.",
    answer: (
      <p>
        Tout <strong>bâtiment tertiaire existant depuis plus de 2 ans</strong>&nbsp;:
        bureaux, enseignement, hôtellerie-restauration, santé, commerces, ou
        tout autre secteur tertiaire. Nous vérifions votre cas lors de
        l&apos;étude.
      </p>
    ),
  },
  {
    question: "Combien ça coûte, et combien je touche ?",
    plainAnswer:
      "L'étude d'éligibilité est gratuite et sans engagement. Vous investissez dans l'installation, mais l'aide CEE en couvre une part importante, davantage encore si le bonus Coup de pouce s'applique. Le montant en euros est estimé lors de l'étude : il est indicatif et non contractuel, car seul le volume officiel (en kWh cumac) est fixé par le barème.",
    answer: (
      <p>
        L&apos;étude est gratuite. Vous investissez dans l&apos;installation,
        mais l&apos;aide en couvre une part importante, davantage encore
        avec le bonus « Coup de pouce ». Le montant en euros vous est estimé
        lors de l&apos;étude, indicatif et non contractuel, car seul le
        volume officiel (kWh cumac) est fixé par le barème.
      </p>
    ),
  },
  {
    question: "Qu'est-ce que le bonus « Coup de pouce Chauffage » ?",
    plainAnswer:
      "Un bonus qui peut tripler (x3) le volume d'aide lorsque la pompe à chaleur remplace une chaudière fonctionnant au fioul, au gaz ou au charbon, et que le raccordement à un réseau de chaleur est techniquement ou économiquement impossible. Les conditions précises et la durée du bonus sont fixées par arrêté et vérifiées par nos conseillers au moment du dossier.",
    answer: (
      <p>
        Un bonus qui peut <strong>tripler (x3)</strong> le volume d&apos;aide
        lorsque la PAC remplace une chaudière fioul, gaz ou charbon, et que le
        raccordement à un réseau de chaleur est techniquement ou
        économiquement impossible. Conditions et durée fixées par arrêté,
        vérifiées par nos conseillers.
      </p>
    ),
  },
  {
    question: "Le montant de l'aide est-il garanti ?",
    plainAnswer:
      "Non. Seul le volume en kWh cumac est défini par le barème officiel. Sa valeur en euros dépend du moment et de votre situation ; tout montant en euros est une estimation non contractuelle, sous réserve d'éligibilité.",
    answer: (
      <p>
        <strong>Non.</strong> Seul le volume en kWh cumac est fixé par le
        barème. Sa valeur en euros varie&nbsp;: tout montant est une
        estimation non contractuelle, sous réserve d&apos;éligibilité.
      </p>
    ),
  },
  {
    question: "Une PAC pour l'eau chaude sanitaire seule est-elle éligible ?",
    plainAnswer:
      "Non. La pompe à chaleur doit être dimensionnée pour couvrir, en totalité ou en partie, les besoins de chauffage du bâtiment, seul, ou chauffage et eau chaude sanitaire. Une PAC destinée uniquement à la production d'eau chaude sanitaire n'est pas éligible à cette fiche.",
    answer: (
      <p>
        <strong>Non.</strong> La PAC doit couvrir, en totalité ou en partie,
        les besoins de <strong>chauffage</strong> du bâtiment. Une PAC
        destinée uniquement à l&apos;eau chaude sanitaire n&apos;est pas
        éligible à cette fiche.
      </p>
    ),
  },
  {
    question: "Vous vous occupez des démarches administratives ?",
    plainAnswer:
      "Oui. Energie+ s'occupe de tout : vérification d'éligibilité, montage et dépôt du dossier CEE, note de dimensionnement, puis dossier de preuve. Pour les questions hors périmètre (cumul avec d'autres aides, fiscalité…), nos conseillers vous répondent selon votre situation.",
    answer: (
      <p>
        Oui, de A à Z&nbsp;: éligibilité, montage et dépôt du dossier, note
        de dimensionnement, dossier de preuve. Pour le reste (cumul avec
        d&apos;autres aides, fiscalité…), cela dépend de votre situation&nbsp;:
        nos conseillers vous répondent.
      </p>
    ),
  },
  {
    question: "Energie+, c'est l'État ?",
    plainAnswer:
      "Non. Energie+ est une entreprise privée qui accompagne ses clients dans le cadre du dispositif public des CEE. Ce n'est ni un service de l'État ni un organisme public.",
    answer: (
      <p>
        <strong>Non.</strong> Energie+ est une entreprise privée qui
        vous accompagne dans le cadre du dispositif public des CEE. Ni
        service de l&apos;État, ni organisme public.
      </p>
    ),
  },
];

export function PacLanding() {
  return (
    <PacFormProvider>
      <Header
        nav={NAV}
        ctaLabel="Recevoir mon étude gratuite"
        ctaHref="#contact"
        showBackToHome
      />

      <main id="contenu" className="pb-24 lg:pb-0">
        <Hero
          eyebrow="Aide de l'État, fiche CEE BAT-TH-163"
          title="Remplacez votre chaudière,"
          titleAccent="avec une aide de l'État qui peut tripler."
          subtitle="Une pompe à chaleur air/eau pour chauffer votre bâtiment tertiaire, financée en partie par le dispositif public des Certificats d'Économies d'Énergie, avec un bonus « Coup de pouce Chauffage » qui peut tripler l'aide lorsqu'elle remplace une chaudière fioul, gaz ou charbon."
          note="Montants en euros indicatifs et non contractuels, sous réserve d'éligibilité."
          primaryCta={{ label: "Recevoir mon étude gratuite", href: "#contact" }}
          secondaryCta={{ label: "Comment ça marche", href: "#dispositif" }}
          image="https://images.unsplash.com/photo-1776860150305-108ed577d7d4?w=1900&q=80&auto=format&fit=crop"
          imageAlt="Pompe à chaleur air/eau installée en extérieur, contre un bâtiment"
          chips={[
            { value: "Gratuite", label: "Étude et simulation" },
            { value: "x3", label: "Bonus Coup de pouce possible" },
            { value: "22 ans", label: "Durée de vie du matériel" },
          ]}
        />
        <TrustBar items={TRUST_ITEMS} />
        <PrincipleSection
          index="01"
          title="Une aide de l'État, une chaufferie qui change d'énergie"
          description="Les Certificats d'Économies d'Énergie sont un dispositif public : l'État oblige les fournisseurs d'énergie à financer des travaux d'économies d'énergie. Le remplacement d'une chaudière par une pompe à chaleur air/eau en fait partie (fiche BAT-TH-163)."
          points={POINTS}
          tech={{
            title: "Le cadre technique de l'aide (opération BAT-TH-163)",
            intro:
              "Pour information, l'aide s'appuie sur une fiche officielle qui fixe des conditions précises. Nos conseillers les vérifient pour vous ; vous n'avez pas à les maîtriser.",
            conditions: CONDITIONS,
            footnotes: [
              "Durée de vie conventionnelle retenue par la fiche : 22 ans.",
              "Bonus « Coup de pouce Chauffage » (x3) lorsque la PAC remplace une chaudière fioul, gaz ou charbon et que le raccordement à un réseau de chaleur est techniquement ou économiquement impossible. Conditions et durée fixées par arrêté, vérifiées par nos conseillers au moment du dossier.",
            ],
          }}
        />
        <PacEligibilitySection index="02" />
        <HowItWorks
          id="methode"
          index="03"
          label="Comment ça marche"
          title="De l'étude à la mise en chauffe, en 5 étapes"
          steps={STEPS}
        />
        <PacSimulator index="04" />
        <BenefitList
          index="05"
          title="Concrètement, pour votre bâtiment"
          items={BENEFITS}
        />
        <TrustSection
          id="references"
          index="06"
          eyebrow="Pourquoi Energie+"
          title="On s'occupe de tout, dans le bon ordre"
          description="Un interlocuteur unique, du premier appel au versement de la prime."
          points={[
            "Éligibilité, dossier CEE, note de dimensionnement, dossier de preuve : tout est géré.",
            "Installation confiée exclusivement à des professionnels.",
            "Le dossier d'aide est monté avant la signature du devis.",
            "Bonus « Coup de pouce Chauffage » identifié et sécurisé dès l'étude, quand il s'applique.",
          ]}
          showCredentials
        />
        <Testimonials />
        <ServiceAreaSection
          index="07"
          subject="bâtiment"
          note="Le montant de l'aide varie selon la région (climat plus ou moins froid) et selon que le bonus « Coup de pouce » s'applique. Nous en tenons compte dans votre estimation."
        />
        <Faq index="08" title="Vos questions" items={FAQ_ITEMS} />
        <PacLeadForm index="09" />
        <BookingSection index="10" />
      </main>

      <Footer />
      <StickyMobileCta source="bat-th-163" operationCode="BAT-TH-163" />
    </PacFormProvider>
  );
}

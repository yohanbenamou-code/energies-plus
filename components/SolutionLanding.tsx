"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { PrincipleSection } from "@/components/PrincipleSection";
import { SolutionVariantCards } from "@/components/SolutionVariantCards";
import { HowItWorks } from "@/components/HowItWorks";
import { CeeSimulator } from "@/components/CeeSimulator";
import { BenefitList } from "@/components/BenefitList";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { MultiStepLeadForm } from "@/components/MultiStepLeadForm";
import { BookingSection } from "@/components/BookingSection";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SolutionFormProvider } from "@/components/solution-form-context";
import type { LiveCeeOperation } from "@/types/operation";

const NAV = [
  { label: "Le principe", href: "#dispositif" },
  { label: "Étapes", href: "#methode" },
  { label: "Votre cas", href: "#solutions" },
  { label: "Estimation", href: "#simulateur" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const TRUST_ITEMS = [
  "Financé par le dispositif public des CEE",
  "Posé par des professionnels",
  "Matériel prévu pour durer 15 ans",
  "Étude sous 48h",
  "Toute la France",
];

const POINTS = [
  {
    title: "Une aide qui réduit votre facture",
    body: "Le dispositif public des CEE finance une partie de votre séchoir solaire. Vous investissez, mais votre reste à charge baisse nettement.",
  },
  {
    title: "Un séchage plus régulier",
    body: "L'air chaud produit par les panneaux hybrides sèche votre récolte en douceur : meilleure conservation, moins de pertes, moins de dépendance au gaz ou au fioul.",
  },
  {
    title: "Un ordre à respecter",
    body: "Le dossier d'aide se monte avant la signature du devis. C'est notre métier : on s'en charge pour que rien ne bloque le versement.",
  },
];

const BENEFITS = [
  {
    title: "Moins à sortir de votre poche",
    body: "L'aide CEE couvre une part importante de l'investissement. Montant estimé lors de l'étude, non contractuel.",
  },
  {
    title: "Le soleil fait le travail",
    body: "Les panneaux hybrides produisent électricité et chaleur. La chaleur part directement dans votre séchoir.",
  },
  {
    title: "Une meilleure récolte, mieux conservée",
    body: "Un séchage régulier et maîtrisé, c'est moins de pertes et une qualité qui se vend mieux.",
  },
  {
    title: "Moins dépendant du fioul et du gaz",
    body: "Vous sécurisez votre poste séchage face aux hausses de prix de l'énergie.",
  },
  {
    title: "Une démarche qui se valorise",
    body: "Une énergie renouvelable, produite sur votre exploitation, utile à votre image auprès de vos clients.",
  },
  {
    title: "Fait pour durer",
    body: "Le matériel est prévu pour fonctionner une quinzaine d'années.",
  },
];

const STEPS = [
  {
    title: "Étude gratuite",
    body: "On regarde votre bâtiment, ce que vous séchez et votre région, puis on estime votre aide.",
  },
  {
    title: "Montage du dossier",
    body: "On formalise l'aide CEE avant la signature du devis de l'installateur.",
  },
  {
    title: "Installation",
    body: "Des professionnels posent les panneaux et le système d'insufflation d'air, selon un cahier des charges précis.",
  },
  {
    title: "Versement de la prime",
    body: "On constitue le dossier de preuve et la prime est valorisée selon les modalités convenues.",
  },
  {
    title: "Vous séchez au soleil",
    body: "Pendant une quinzaine d'années, avec une énergie renouvelable produite chez vous.",
  },
];

function buildFaq(operation: LiveCeeOperation): FaqItem[] {
  const profiles = operation.applicableProfiles.join(", ");
  return [
    {
      question: "Qui peut en bénéficier ?",
      plainAnswer: `Les professionnels qui sèchent des produits ou co-produits agricoles ou forestiers dans un bâtiment fermé : ${profiles}. Un hangar ouvert n'est pas éligible. L'éligibilité précise dépend de votre projet.`,
      answer: (
        <p>
          Les professionnels qui sèchent des produits agricoles ou forestiers
          dans un <strong>bâtiment fermé</strong>&nbsp;: {profiles}. Un hangar
          ouvert n&apos;est pas éligible. Nous vérifions votre cas lors de
          l&apos;étude.
        </p>
      ),
    },
    {
      question: "Combien ça coûte, et combien je touche ?",
      plainAnswer:
        "L'étude d'éligibilité est gratuite et sans engagement. Vous investissez dans l'installation, mais l'aide CEE en couvre une part importante. Le montant en euros est estimé lors de l'étude : il est indicatif et non contractuel, car seul le volume officiel (en kWh cumac) est fixé par le barème.",
      answer: (
        <p>
          L&apos;étude est gratuite. Vous investissez dans l&apos;installation,
          mais l&apos;aide en couvre une part importante. Le montant en euros
          vous est estimé lors de l&apos;étude : indicatif et non contractuel,
          car seul le volume officiel (kWh cumac) est fixé par le barème.
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
      question: "Quel délai entre l'étude et l'installation ?",
      plainAnswer:
        "Le délai varie selon la saison, la disponibilité des installateurs partenaires et votre bâtiment. Une estimation vous est donnée lors de l'étude. En revanche, l'ordre des étapes (dossier CEE avant devis) est impératif.",
      answer: (
        <p>
          Cela dépend de la saison, des installateurs disponibles et de votre
          bâtiment. On vous donne une fourchette lors de l&apos;étude.
          L&apos;ordre des étapes (dossier avant devis) est, lui, impératif.
        </p>
      ),
    },
    {
      question: "Vous vous occupez des démarches administratives ?",
      plainAnswer:
        "Oui. Energie+ s'occupe de tout : vérification d'éligibilité, montage et dépôt du dossier CEE, cahier des charges pour l'installateur, puis dossier de preuve. Pour les questions hors périmètre (cumul avec d'autres aides, fiscalité…), nos conseillers vous répondent selon votre situation.",
      answer: (
        <p>
          Oui, de A à Z&nbsp;: éligibilité, montage et dépôt du dossier, cahier
          des charges pour l&apos;installateur, dossier de preuve. Pour le reste
          (cumul avec d&apos;autres aides, fiscalité…), cela dépend de votre
          situation&nbsp;: nos conseillers vous répondent.
        </p>
      ),
    },
    {
      question: "Energie+, c'est l'État ?",
      plainAnswer:
        "Non. Energie+ est une entreprise privée qui accompagne ses clients dans le cadre du dispositif public des CEE. Ce n'est ni un service de l'État ni un organisme public.",
      answer: (
        <p>
          <strong>Non.</strong> Energie+ est une entreprise privée qui vous
          accompagne dans le cadre du dispositif public des CEE. Ni service de
          l&apos;État, ni organisme public.
        </p>
      ),
    },
  ];
}

export function SolutionLanding({ operation }: { operation: LiveCeeOperation }) {
  const faqItems = React.useMemo(() => buildFaq(operation), [operation]);

  return (
    <SolutionFormProvider>
      <Header
        nav={NAV}
        ctaLabel="Recevoir mon étude gratuite"
        ctaHref="#contact"
        showBackToHome
      />

      <main id="contenu" className="pb-24 lg:pb-0">
        <Hero
          eyebrow={`Aide de l'État, fiche CEE ${operation.code}`}
          title="Séchez vos récoltes au soleil,"
          titleAccent="avec une aide de l'État."
          subtitle={operation.heroSubtitle}
          note="Montants en euros indicatifs et non contractuels, sous réserve d'éligibilité."
          primaryCta={{ label: "Recevoir mon étude gratuite", href: "#contact" }}
          secondaryCta={{ label: "Comment ça marche", href: "#dispositif" }}
          image={
            operation.image ??
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1900&q=80&auto=format&fit=crop"
          }
          imageAlt="Bottes de foin dans un champ au soleil couchant"
          chips={[
            { value: "Gratuite", label: "Étude et simulation" },
            { value: "15 ans", label: "Durée de vie du matériel" },
            { value: "France", label: "Toutes régions" },
          ]}
        />
        <TrustBar items={TRUST_ITEMS} />
        <PrincipleSection
          index="01"
          title="Une aide de l'État, un séchoir qui travaille pour vous"
          description="Les Certificats d'Économies d'Énergie sont un dispositif public : l'État oblige les fournisseurs d'énergie à financer des travaux d'économies d'énergie. Le séchage solaire agricole en fait partie."
          points={POINTS}
          tech={{
            title: `Le cadre technique de l'aide (opération ${operation.code})`,
            intro:
              "Pour information, l'aide s'appuie sur une fiche officielle qui fixe des conditions précises. Nos conseillers les vérifient pour vous ; vous n'avez pas à les maîtriser.",
            conditions: operation.conditions,
            footnotes: [
              `Durée de vie conventionnelle retenue par la fiche : ${operation.lifespanYears} ans.`,
            ],
          }}
        />
        <SolutionVariantCards operation={operation} index="02" />
        <HowItWorks
          id="methode"
          index="03"
          label="Comment ça marche"
          title="De l'étude au séchage, en 5 étapes"
          steps={STEPS}
        />
        <CeeSimulator operation={operation} index="04" />
        <BenefitList
          index="05"
          title="Concrètement, pour votre exploitation"
          items={BENEFITS}
        />
        <TrustSection
          id="references"
          index="06"
          eyebrow="Pourquoi Energie+"
          title="On s'occupe de tout, dans le bon ordre"
          description="Un interlocuteur unique, du premier appel au versement de la prime."
          points={[
            "Éligibilité, dossier CEE, cahier des charges, dossier de preuve : tout est géré.",
            "Installation confiée exclusivement à des professionnels.",
            "Le dossier d'aide est monté avant la signature du devis.",
            "Vous choisissez votre installateur ; on lui transmet un cahier des charges précis.",
          ]}
          showCredentials
        />
        <Testimonials />
        <ServiceAreaSection
          index="07"
          subject="exploitation"
          note="Le montant de l'aide varie légèrement selon la région (climat plus ou moins froid). Nous en tenons compte dans votre estimation."
        />
        <Faq index="08" title="Vos questions" items={faqItems} />
        <MultiStepLeadForm operation={operation} index="09" />
        <BookingSection index="10" />
      </main>

      <Footer />
      <StickyMobileCta source="agri-eq-110" operationCode={operation.code} />
    </SolutionFormProvider>
  );
}

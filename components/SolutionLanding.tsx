"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { DispositifSection } from "@/components/DispositifSection";
import { SolutionVariantCards } from "@/components/SolutionVariantCards";
import { HowItWorks } from "@/components/HowItWorks";
import { CeeSimulator } from "@/components/CeeSimulator";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { MultiStepLeadForm } from "@/components/MultiStepLeadForm";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SolutionFormProvider } from "@/components/solution-form-context";
import type { CeeOperation } from "@/types/operation";

const NAV = [
  { label: "Le principe", href: "#dispositif" },
  { label: "Étapes", href: "#methode" },
  { label: "Votre cas", href: "#solutions" },
  { label: "Estimation", href: "#simulateur" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    title: "Étude gratuite",
    body: "On regarde votre bâtiment, ce que vous séchez et votre région, puis on estime votre aide.",
  },
  {
    title: "Montage du dossier",
    body: "On formalise l'aide CEE — avant la signature du devis de l'installateur.",
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

function buildFaq(operation: CeeOperation): FaqItem[] {
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
          vous est estimé lors de l&apos;étude — indicatif et non contractuel,
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
          barème. Sa valeur en euros varie&nbsp;: tout montant est une estimation
          non contractuelle, sous réserve d&apos;éligibilité.
        </p>
      ),
    },
    {
      question: "Quel délai entre l'étude et l'installation ?",
      plainAnswer:
        "Le délai varie selon la saison, la disponibilité des installateurs partenaires et votre bâtiment. Une estimation vous est donnée lors de l'étude. En revanche, l'ordre des étapes — dossier CEE avant devis — est impératif.",
      answer: (
        <p>
          Cela dépend de la saison, des installateurs disponibles et de votre
          bâtiment. On vous donne une fourchette lors de l&apos;étude.
          L&apos;ordre des étapes — dossier avant devis — est, lui, impératif.
        </p>
      ),
    },
    {
      question: "Vous vous occupez des démarches administratives ?",
      plainAnswer:
        "Oui. Énergies Plus s'occupe de tout : vérification d'éligibilité, montage et dépôt du dossier CEE, cahier des charges pour l'installateur, puis dossier de preuve. Pour les questions hors périmètre (cumul avec d'autres aides, fiscalité…), nos conseillers vous répondent selon votre situation.",
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
      question: "Énergies Plus, c'est l'État ?",
      plainAnswer:
        "Non. Énergies Plus est une entreprise privée qui accompagne ses clients dans le cadre du dispositif public des CEE. Ce n'est ni un service de l'État ni un organisme public.",
      answer: (
        <p>
          <strong>Non.</strong> Énergies Plus est une entreprise privée qui vous
          accompagne dans le cadre du dispositif public des CEE. Ni service de
          l&apos;État, ni organisme public.
        </p>
      ),
    },
  ];
}

export function SolutionLanding({ operation }: { operation: CeeOperation }) {
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
          eyebrow="Aide de l'État · Certificats d'Économies d'Énergie"
          title={operation.heroTitle}
          titleHighlight={["soleil,"]}
          subtitle={operation.heroSubtitle}
          note="Montants en euros indicatifs et non contractuels, sous réserve d'éligibilité."
          primaryCta={{ label: "Recevoir mon étude gratuite", href: "#contact" }}
          secondaryCta={{ label: "Comment ça marche", href: "#dispositif" }}
          floatingBadge={{ value: "0 €", label: "Étude & simulation" }}
        />
        <TrustBar />
        <DispositifSection operation={operation} />
        <SolutionVariantCards operation={operation} />
        <HowItWorks
          id="methode"
          title="De l'étude au séchage, en 5 étapes"
          steps={STEPS}
        />
        <CeeSimulator operation={operation} />
        <BenefitsGrid />
        <TrustSection
          id="references"
          eyebrow="Pourquoi Énergies Plus"
          title="On s'occupe de tout, dans le bon ordre"
          description="Un interlocuteur unique, du premier appel au versement de la prime."
          points={[
            "Éligibilité, dossier CEE, cahier des charges, dossier de preuve : tout est géré.",
            "Installation confiée exclusivement à des professionnels.",
            "Le dossier d'aide est monté avant la signature du devis.",
            "Vous choisissez votre installateur ; on lui transmet un cahier des charges précis.",
          ]}
          showCertifications
        />
        <Testimonials />
        <ServiceAreaSection />
        <Faq title="Vos questions" items={faqItems} />
        <MultiStepLeadForm operation={operation} />
      </main>

      <Footer />
      <StickyMobileCta source="agri-eq-110" operationCode={operation.code} />
    </SolutionFormProvider>
  );
}

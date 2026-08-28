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
  { label: "Le dispositif", href: "#dispositif" },
  { label: "Comment ça marche", href: "#methode" },
  { label: "Nos solutions", href: "#solutions" },
  { label: "Simulateur", href: "#simulateur" },
  { label: "Avis clients", href: "#avis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    title: "Étude gratuite & simulation CEE",
    body: "Analyse de votre bâtiment, de vos produits séchés et de votre zone climatique ; estimation du volume de kWh cumac.",
  },
  {
    title: "Montage du dossier CEE",
    body: "Formalisation de l'engagement CEE et du rôle actif et incitatif, avant la signature du devis de l'installateur.",
  },
  {
    title: "Installation par des professionnels certifiés",
    body: "Pose des panneaux hybrides et du système d'insufflation d'air par des installateurs professionnels, selon un cahier des charges précis.",
  },
  {
    title: "Valorisation de la prime CEE",
    body: "Constitution du dossier de preuve et valorisation de la prime, versée selon les modalités convenues.",
  },
  {
    title: "Séchage à l'énergie solaire pendant 15 ans",
    body: "Vous séchez vos récoltes avec une énergie renouvelable, sur la durée de vie conventionnelle de 15 ans retenue par la fiche.",
  },
];

function buildFaq(operation: CeeOperation): FaqItem[] {
  const profiles = operation.applicableProfiles.join(", ");
  return [
    {
      question: "Qu'est-ce que les Certificats d'Économies d'Énergie (CEE) ?",
      plainAnswer:
        "Un dispositif public encadré par le Ministère de la Transition Écologique qui impose aux fournisseurs d'énergie de financer des actions d'économies d'énergie. Ce financement alimente la prime CEE versée pour des opérations standardisées comme AGRI-EQ-110.",
      answer: (
        <p>
          Un dispositif public encadré par le Ministère de la Transition
          Écologique&nbsp;: les fournisseurs d&apos;énergie doivent financer des
          actions d&apos;économies d&apos;énergie. Ce financement alimente la
          prime versée pour des opérations standardisées comme AGRI-EQ-110.
        </p>
      ),
    },
    {
      question: `Qui peut bénéficier de l'opération ${operation.code} ?`,
      plainAnswer: `Les professionnels qui sèchent des produits ou co-produits agricoles ou forestiers dans un bâtiment fermé : ${profiles}. L'éligibilité précise dépend du projet et des conditions techniques de la fiche.`,
      answer: (
        <p>
          Les professionnels qui sèchent des produits ou co-produits agricoles ou
          forestiers dans un bâtiment fermé&nbsp;: {profiles}. L&apos;éligibilité
          précise dépend de votre projet et des conditions techniques de la
          fiche.
        </p>
      ),
    },
    {
      question: "Quelles conditions techniques faut-il respecter ?",
      plainAnswer: `Principales conditions de la fiche ${operation.code} : ${operation.conditions.join("; ")}.`,
      answer: (
        <ul className="list-disc space-y-1 pl-5">
          {operation.conditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      question: "Quel délai entre l'étude et l'installation ?",
      plainAnswer:
        "Le délai varie selon la saison, la disponibilité des installateurs partenaires et la complexité du bâtiment. Une estimation vous est communiquée lors de l'étude ; l'ordre des étapes (dossier CEE avant devis) est en revanche impératif.",
      answer: (
        <p>
          Il varie selon la saison, la disponibilité des installateurs
          partenaires et la complexité de votre bâtiment. Une estimation vous est
          donnée lors de l&apos;étude. En revanche, l&apos;ordre des étapes —
          dossier CEE avant signature du devis — est impératif.
        </p>
      ),
    },
    {
      question: "Le montant de l'aide est-il garanti ?",
      plainAnswer:
        "Non. Seul le volume en kWh cumac est défini par le barème officiel de l'opération. Sa traduction en euros dépend de la valorisation du moment et de votre situation ; tout montant en euros est une estimation non contractuelle, sous réserve d'éligibilité.",
      answer: (
        <p>
          <strong>Non.</strong> Seul le volume en kWh cumac est fixé par le
          barème officiel. Sa traduction en euros dépend de la valorisation du
          moment et de votre situation&nbsp;: tout montant en euros est une
          estimation non contractuelle, sous réserve d&apos;éligibilité.
        </p>
      ),
    },
    {
      question:
        "Solaire Energie s'occupe-t-il des démarches administratives ?",
      plainAnswer:
        "Oui. Solaire Energie vous accompagne de A à Z : qualification, montage et dépôt du dossier CEE, cahier des charges pour l'installateur, puis dossier de preuve. Pour toute question hors de ce périmètre (cumul avec d'autres aides, fiscalité…), nos conseillers vous répondent selon votre situation.",
      answer: (
        <p>
          Oui&nbsp;: qualification, montage et dépôt du dossier CEE, cahier des
          charges pour l&apos;installateur, puis dossier de preuve. Pour toute
          question hors de ce périmètre (cumul avec d&apos;autres aides,
          fiscalité…), cela dépend de votre situation&nbsp;: contactez nos
          conseillers.
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
          eyebrow={`Opération CEE n° ${operation.code}`}
          title={operation.heroTitle}
          subtitle={operation.heroSubtitle}
          note="Montants en euros indicatifs et non contractuels, sous réserve d'éligibilité. Seuls les kWh cumac correspondent aux barèmes officiels."
          primaryCta={{
            label: "Recevoir mon étude gratuite",
            href: "#contact",
          }}
          secondaryCta={{
            label: "Découvrir le dispositif ↓",
            href: "#dispositif",
          }}
        />
        <TrustBar />
        <DispositifSection operation={operation} />
        <SolutionVariantCards operation={operation} />
        <HowItWorks
          id="methode"
          title="De l'étude au séchage solaire, en 5 étapes"
          steps={STEPS}
        />
        <CeeSimulator operation={operation} />
        <BenefitsGrid />
        <TrustSection
          id="references"
          eyebrow="Pourquoi Solaire Energie"
          title="Pourquoi faire confiance à Solaire Energie"
          description="Un accompagnement de A à Z, des exigences techniques strictes et une installation confiée exclusivement à des professionnels."
          points={[
            "Accompagnement de A à Z : qualification, dossier CEE, cahier des charges, dossier de preuve.",
            "Respect des certifications IEC 61215 / IEC 61730 et de la mesure ISO 9806.",
            "Installation réalisée exclusivement par des professionnels.",
            "Séquencement du dossier CEE avant la signature du devis.",
          ]}
          showCertifications
        />
        <Testimonials />
        <ServiceAreaSection />
        <Faq
          title={`Questions fréquentes — ${operation.code}`}
          items={faqItems}
        />
        <MultiStepLeadForm operation={operation} />
      </main>

      <Footer />
      <StickyMobileCta source="agri-eq-110" operationCode={operation.code} />
    </SolutionFormProvider>
  );
}

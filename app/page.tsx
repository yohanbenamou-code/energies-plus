import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { KeyStats } from "@/components/KeyStats";
import { ProfileSegmentGrid } from "@/components/ProfileSegmentGrid";
import { OperationsCatalog } from "@/components/OperationsCatalog";
import { RulesBeforeQuoteSection } from "@/components/RulesBeforeQuoteSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { site } from "@/data/site";

const NAV = [
  { label: "Nos opérations CEE", href: "#operations" },
  { label: "Notre méthode", href: "#methode" },
  { label: "Profils accompagnés", href: "#profils" },
  { label: "Références", href: "#references" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    title: "Qualification du projet",
    body: "Nous vérifions l'éligibilité de votre projet au regard d'une opération standardisée CEE en vigueur et de ses conditions techniques.",
  },
  {
    title: "Cadrage avant devis",
    body: "Nous formalisons l'engagement CEE et le rôle actif et incitatif, avant toute signature de devis avec l'installateur.",
  },
  {
    title: "Accompagnement technique",
    body: "Nous transmettons un cahier des charges précis à l'installateur de votre choix et suivons la réalisation.",
  },
  {
    title: "Dossier de preuve",
    body: "Nous constituons et conservons l'ensemble des pièces justificatives attendues en cas de contrôle.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qu'est-ce que les Certificats d'Économies d'Énergie (CEE) ?",
    plainAnswer:
      "Les CEE sont un dispositif public encadré par le Ministère de la Transition Écologique. Il impose aux fournisseurs d'énergie de financer des actions d'économies d'énergie chez les particuliers et les professionnels. Certaines de ces actions, dites opérations standardisées, ouvrent droit à une prime dont le montant dépend d'un volume officiel exprimé en kWh cumac.",
    answer: (
      <>
        <p>
          Les CEE sont un dispositif public encadré par le Ministère de la
          Transition Écologique. Il impose aux fournisseurs d&apos;énergie
          («&nbsp;les obligés&nbsp;») de financer des actions d&apos;économies
          d&apos;énergie.
        </p>
        <p>
          Les opérations «&nbsp;standardisées&nbsp;» ouvrent droit à une prime
          dont le volume officiel est exprimé en kWh cumac. Sa traduction en
          euros dépend de la valorisation du moment et de votre situation :
          c&apos;est pourquoi nous ne communiquons pas de montant garanti.
        </p>
      </>
    ),
  },
  {
    question: "Pourquoi qualifier son projet avant de signer un devis ?",
    plainAnswer:
      "Parce que le bénéfice de l'aide CEE suppose que l'engagement de l'acteur CEE et son rôle actif et incitatif soient établis avant tout engagement contractuel avec l'installateur. Un devis signé trop tôt peut faire perdre définitivement l'aide.",
    answer: (
      <p>
        Le bénéfice de l&apos;aide CEE suppose que l&apos;engagement de
        l&apos;acteur CEE soit établi <strong>avant</strong> tout engagement
        contractuel avec l&apos;installateur. Un devis signé trop tôt peut faire
        perdre le bénéfice de l&apos;aide, sans rattrapage. Nous cadrons ce
        séquencement pour vous.
      </p>
    ),
  },
  {
    question: "Solaire Energie est-il un organisme d'État ?",
    plainAnswer:
      "Non. Solaire Energie est une entreprise privée. Elle accompagne ses clients dans le cadre du dispositif public des CEE, encadré par le Ministère de la Transition Écologique, mais n'est ni un service de l'État ni un organisme public.",
    answer: (
      <p>
        <strong>Non.</strong> Solaire Energie est une entreprise privée. Elle
        accompagne ses clients dans le cadre du dispositif public des CEE, mais
        n&apos;est ni un service de l&apos;État ni un organisme public, et
        n&apos;utilise aucun symbole officiel de la République française.
      </p>
    ),
  },
  {
    question: "Quelles opérations sont actuellement accompagnées ?",
    plainAnswer:
      "Aujourd'hui, Solaire Energie accompagne l'opération AGRI-EQ-110 : séchage solaire par insufflation d'air à l'aide de panneaux solaires hybrides, pour les exploitations agricoles et forestières. Le catalogue est conçu pour accueillir d'autres opérations.",
    answer: (
      <p>
        Aujourd&apos;hui, l&apos;opération <strong>AGRI-EQ-110</strong> —
        séchage solaire par insufflation d&apos;air avec panneaux hybrides. Le
        catalogue de ce site est conçu pour accueillir d&apos;autres opérations
        CEE au fur et à mesure.
      </p>
    ),
  },
  {
    question: "Comment se déroule un accompagnement avec Solaire Energie ?",
    plainAnswer:
      "En quatre temps : qualification du projet, cadrage de l'engagement CEE avant devis, accompagnement technique avec transmission d'un cahier des charges à l'installateur, puis constitution du dossier de preuve.",
    answer: (
      <p>
        En quatre temps : qualification du projet, cadrage de l&apos;engagement
        CEE avant devis, accompagnement technique (cahier des charges transmis à
        l&apos;installateur), puis constitution du dossier de preuve.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title:
    "Certificats d'Économies d'Énergie pour les professionnels agricoles et forestiers",
  description:
    "Solaire Energie qualifie votre projet sur le catalogue officiel des opérations CEE, monte votre dossier avant la signature du devis et vous accompagne jusqu'à l'installation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header
        nav={NAV}
        ctaLabel="Faire qualifier mon projet"
        ctaHref="#contact"
      />

      <main id="contenu">
        <Hero
          eyebrow="Conseil CEE — agriculture & forêt"
          title="Certificats d'Économies d'Énergie pour les professionnels agricoles et forestiers"
          subtitle="Solaire Energie qualifie votre projet sur le catalogue officiel des opérations CEE, monte votre dossier avant la signature du devis, et vous accompagne jusqu'à l'installation."
          note="Le catalogue des opérations CEE évolue régulièrement — vérifiez l'éligibilité de votre projet avant de vous engager."
          primaryCta={{ label: "Faire qualifier mon projet", href: "#contact" }}
          secondaryCta={{
            label: "Appeler un conseiller",
            href: site.contact.phoneHref,
          }}
        />

        <ValueProps />
        <KeyStats />
        <ProfileSegmentGrid />
        <OperationsCatalog />
        <RulesBeforeQuoteSection />

        <HowItWorks
          id="methode"
          title="Notre méthode, en 4 étapes"
          description="Un accompagnement structuré, du premier échange au dossier de preuve."
          steps={STEPS}
        />

        <TrustSection
          id="references"
          eyebrow="Références"
          title="Ils nous font confiance"
          description="Les preuves ci-dessous seront complétées par Solaire Energie avec ses références réelles."
          showCertifications
        />

        <Faq
          title="Questions fréquentes sur les CEE"
          description="Les réponses aux questions les plus courantes des exploitants."
          items={FAQ_ITEMS}
        />

        {/* CTA final */}
        <section id="contact" className="bg-primary/5 py-16 sm:py-20">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Contact
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Parlons de votre projet avant que le devis ne soit signé
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Décrivez-nous votre projet en quelques lignes. Un conseiller vous
                rappelle sous 24–48h ouvrées pour vérifier son éligibilité — sans
                engagement.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                Vous préférez le téléphone ?{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  {site.contact.phoneDisplay}
                </a>{" "}
                — {site.contact.hours}.
              </p>
              <p className="mt-6 max-w-md text-xs text-muted-foreground">
                {site.privateActorShort}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <QuickLeadForm source="homepage" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType:
              "Accompagnement Certificats d'Économies d'Énergie (CEE) pour l'agriculture et la forêt",
            provider: {
              "@type": "Organization",
              name: site.legal.companyName,
              description: site.privateActorShort,
            },
            areaServed: {
              "@type": "Country",
              name: "France",
            },
            audience: {
              "@type": "BusinessAudience",
              name: "Exploitations agricoles et forestières, coopératives, CUMA, scieries",
            },
          }),
        }}
      />
    </>
  );
}

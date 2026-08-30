import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SectorMarquee } from "@/components/SectorMarquee";
import { ValueProps } from "@/components/ValueProps";
import { KeyStats } from "@/components/KeyStats";
import { ProfileSegmentGrid } from "@/components/ProfileSegmentGrid";
import { OperationsCatalog } from "@/components/OperationsCatalog";
import { RulesBeforeQuoteSection } from "@/components/RulesBeforeQuoteSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const NAV = [
  { label: "Aides CEE", href: "#operations" },
  { label: "Notre méthode", href: "#methode" },
  { label: "Profils", href: "#profils" },
  { label: "Références", href: "#references" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    title: "Qualification du projet",
    body: "On vérifie l'éligibilité de votre projet au regard d'une aide CEE en vigueur et de ses conditions.",
  },
  {
    title: "Cadrage avant devis",
    body: "On formalise l'engagement CEE avant toute signature de devis avec l'installateur.",
  },
  {
    title: "Accompagnement technique",
    body: "On transmet un cahier des charges précis à l'installateur de votre choix et on suit la réalisation.",
  },
  {
    title: "Dossier de preuve",
    body: "On constitue et on conserve toutes les pièces justificatives attendues en cas de contrôle.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qu'est-ce que les aides CEE ?",
    plainAnswer:
      "Les Certificats d'Économies d'Énergie sont un dispositif public : l'État impose aux fournisseurs d'énergie de financer des travaux d'économies d'énergie chez les particuliers et les professionnels. Ce financement se traduit, pour certains équipements, par une prime.",
    answer: (
      <>
        <p>
          C&apos;est un dispositif public&nbsp;: l&apos;État impose aux
          fournisseurs d&apos;énergie de financer des travaux d&apos;économies
          d&apos;énergie. Ce financement se traduit, pour certains équipements,
          par une prime.
        </p>
        <p>
          Le montant officiel est exprimé en kWh cumac ; sa valeur en euros
          dépend du moment et de votre situation. C&apos;est pourquoi nous ne
          communiquons jamais de montant garanti avant l&apos;étude.
        </p>
      </>
    ),
  },
  {
    question: "Pourquoi appeler avant de signer un devis ?",
    plainAnswer:
      "Parce que l'aide CEE suppose que l'engagement de l'acteur CEE soit établi avant tout engagement contractuel avec l'installateur. Un devis signé trop tôt peut faire perdre l'aide définitivement.",
    answer: (
      <p>
        L&apos;aide suppose que l&apos;engagement CEE soit posé{" "}
        <strong>avant</strong> tout engagement avec l&apos;installateur. Un devis
        signé trop tôt peut faire perdre l&apos;aide, sans rattrapage. Nous
        cadrons ce timing pour vous.
      </p>
    ),
  },
  {
    question: "Énergies Plus est-il un organisme d'État ?",
    plainAnswer:
      "Non. Énergies Plus est une entreprise privée. Elle accompagne ses clients dans le cadre du dispositif public des CEE, encadré par le Ministère de la Transition Écologique, mais n'est ni un service de l'État ni un organisme public.",
    answer: (
      <p>
        <strong>Non.</strong> Énergies Plus est une entreprise privée. Elle
        accompagne ses clients dans le cadre du dispositif public des CEE, mais
        n&apos;est ni un service de l&apos;État ni un organisme public, et
        n&apos;utilise aucun symbole officiel de la République française.
      </p>
    ),
  },
  {
    question: "Combien coûte votre accompagnement ?",
    plainAnswer:
      "Le premier échange et l'étude d'éligibilité sont gratuits et sans engagement. Les modalités de rémunération vous sont présentées en toute transparence avant tout engagement.",
    answer: (
      <p>
        Le premier échange et l&apos;étude d&apos;éligibilité sont gratuits et
        sans engagement. Les modalités sont présentées en toute transparence
        avant tout engagement de votre part.
      </p>
    ),
  },
  {
    question: "Quelles aides accompagnez-vous aujourd'hui ?",
    plainAnswer:
      "Aujourd'hui, Énergies Plus accompagne le séchage solaire par insufflation d'air des produits et co-produits agricoles et forestiers, à l'aide de panneaux solaires hybrides. Le catalogue est conçu pour accueillir d'autres aides.",
    answer: (
      <p>
        Aujourd&apos;hui&nbsp;: le séchage solaire par insufflation d&apos;air
        des produits agricoles et forestiers, avec panneaux hybrides. Le
        catalogue s&apos;enrichira d&apos;autres aides au fil des évolutions du
        dispositif.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title:
    "Aides CEE pour le séchage solaire agricole et forestier",
  description:
    "Énergies Plus vérifie l'éligibilité de votre projet, monte votre dossier d'aide CEE avant la signature du devis et vous accompagne jusqu'à l'installation d'un séchage solaire par insufflation d'air.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header nav={NAV} ctaLabel="Faire qualifier mon projet" ctaHref="#contact" />

      <main id="contenu">
        <Hero
          eyebrow="Conseil CEE — agriculture & forêt"
          title="Une aide de l'État pour sécher vos récoltes au soleil"
          titleHighlight={["au", "soleil"]}
          subtitle="Énergies Plus vérifie l'éligibilité de votre projet, monte votre dossier d'aide CEE avant la signature du devis, et vous accompagne jusqu'à l'installation."
          note="Le catalogue des aides CEE évolue régulièrement — faites vérifier votre projet avant de vous engager."
          primaryCta={{ label: "Faire qualifier mon projet", href: "#contact" }}
          secondaryCta={{
            label: "Parler à un conseiller",
            href: site.contact.phoneHref,
          }}
          floatingBadge={{ value: "0 €", label: "Étude d'éligibilité" }}
        />

        <SectorMarquee />
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
          title="Une expertise du dispositif, pas un intermédiaire de plus"
          description="Les preuves ci-dessous seront complétées par Énergies Plus avec ses références réelles."
          showCertifications
        />

        <Faq
          title="Les CEE, en clair"
          description="Les réponses aux questions les plus courantes des exploitants."
          items={FAQ_ITEMS}
        />

        {/* CTA final */}
        <section id="contact" className="relative overflow-hidden bg-secondary/40 py-20 sm:py-24">
          <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="container grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
                Contact
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Parlons de votre projet avant que le devis ne soit signé
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
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
            </Reveal>

            <Reveal variant="left" className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
              <QuickLeadForm source="homepage" />
            </Reveal>
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
              "Accompagnement aux aides CEE pour le séchage solaire agricole et forestier",
            provider: {
              "@type": "Organization",
              name: site.legal.companyName,
              description: site.privateActorShort,
            },
            areaServed: { "@type": "Country", name: "France" },
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

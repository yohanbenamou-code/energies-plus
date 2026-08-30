import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SectorMarquee } from "@/components/SectorMarquee";
import { CeeMechanism } from "@/components/CeeMechanism";
import { OperationsCatalog } from "@/components/OperationsCatalog";
import { SectorGrid } from "@/components/SectorGrid";
import { RulesBeforeQuoteSection } from "@/components/RulesBeforeQuoteSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Faq, type FaqItem } from "@/components/Faq";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const NAV = [
  { label: "Le dispositif", href: "#dispositif" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Secteurs", href: "#secteurs" },
  { label: "Notre méthode", href: "#methode" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    title: "Qualification",
    body: "On identifie la ou les fiches CEE qui correspondent à votre projet, et on vérifie que les conditions sont réunies.",
  },
  {
    title: "Cadrage avant devis",
    body: "On formalise l'engagement du financeur CEE — impérativement avant que vous ne signiez le devis de l'installateur.",
  },
  {
    title: "Accompagnement des travaux",
    body: "On transmet un cahier des charges précis à l'entreprise de votre choix et on suit la bonne exécution.",
  },
  {
    title: "Dossier de preuve & prime",
    body: "On rassemble les pièces attendues, on dépose le dossier et la prime est valorisée selon les modalités convenues.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qu'est-ce que les Certificats d'Économies d'Énergie ?",
    plainAnswer:
      "Un dispositif public créé en 2005 et encadré par le Ministère de la Transition Écologique. Il oblige les fournisseurs d'énergie à financer des travaux d'économies d'énergie chez les particuliers et les professionnels. Ce financement se traduit par une prime sur des opérations précises, listées dans des « fiches » officielles.",
    answer: (
      <>
        <p>
          Un dispositif public créé en 2005, encadré par le Ministère de la
          Transition Écologique. Il oblige les fournisseurs d&apos;énergie à
          financer des travaux d&apos;économies d&apos;énergie.
        </p>
        <p>
          Ce financement se traduit par une prime sur des opérations précises
          (les « fiches » standardisées). Le volume officiel s&apos;exprime en
          kWh cumac ; sa valeur en euros dépend du marché et de votre situation.
        </p>
      </>
    ),
  },
  {
    question: "Qui peut en bénéficier ?",
    plainAnswer:
      "Les particuliers propriétaires ou locataires, les copropriétés, les entreprises, les exploitations agricoles, les collectivités : dès lors qu'un projet correspond à une fiche CEE et en respecte les conditions.",
    answer: (
      <p>
        Particuliers, copropriétés, entreprises, exploitations agricoles,
        collectivités… Dès lors qu&apos;un projet correspond à une fiche CEE et
        en respecte les conditions. Nous vérifions votre cas gratuitement.
      </p>
    ),
  },
  {
    question: "Pourquoi monter le dossier avant de signer le devis ?",
    plainAnswer:
      "Parce que l'aide CEE suppose que l'engagement du financeur soit établi avant tout engagement contractuel avec l'installateur. Un devis signé trop tôt peut faire perdre l'aide, sans rattrapage possible.",
    answer: (
      <p>
        L&apos;aide suppose que l&apos;engagement du financeur soit établi{" "}
        <strong>avant</strong> tout engagement avec l&apos;installateur. Un devis
        signé trop tôt peut faire perdre l&apos;aide, sans rattrapage. Nous
        cadrons ce calendrier pour vous.
      </p>
    ),
  },
  {
    question: "Énergies Plus est-il un organisme d'État ?",
    plainAnswer:
      "Non. Énergies Plus est une entreprise privée. Elle accompagne ses clients dans le cadre du dispositif public des CEE, mais n'est ni un service de l'État ni un organisme public, et n'utilise aucun symbole officiel de la République française.",
    answer: (
      <p>
        <strong>Non.</strong> Énergies Plus est une entreprise privée. Elle
        accompagne ses clients dans le cadre du dispositif public des CEE, mais
        n&apos;est ni un service de l&apos;État ni un organisme public.
      </p>
    ),
  },
  {
    question: "Quelles opérations accompagnez-vous aujourd'hui ?",
    plainAnswer:
      "Le séchage solaire agricole et forestier (fiche AGRI-EQ-110) dispose d'un accompagnement complet. Les autres fiches du catalogue sont en cours d'ouverture : contactez-nous pour vérifier votre éligibilité.",
    answer: (
      <p>
        Le séchage solaire agricole et forestier (fiche{" "}
        <strong>AGRI-EQ-110</strong>) est pleinement accompagné. Les autres
        fiches du catalogue s&apos;ouvrent progressivement — appelez-nous pour
        votre projet.
      </p>
    ),
  },
  {
    question: "Combien coûte votre accompagnement ?",
    plainAnswer:
      "Le premier échange et l'étude d'éligibilité sont gratuits et sans engagement. Les modalités de rémunération sont présentées en toute transparence avant tout engagement de votre part.",
    answer: (
      <p>
        Le premier échange et l&apos;étude d&apos;éligibilité sont gratuits et
        sans engagement. Les modalités sont présentées en toute transparence
        avant tout engagement.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "Les aides CEE, transformées en travaux financés",
  description:
    "Énergies Plus accompagne particuliers et professionnels sur les opérations CEE : vérification d'éligibilité, montage du dossier avant devis, suivi jusqu'aux travaux. Catalogue des fiches CEE les plus courantes.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header nav={NAV} ctaLabel="Vérifier mon éligibilité" ctaHref="#contact" />

      <main id="contenu">
        <Hero
          eyebrow="Conseil CEE — tous secteurs"
          title="Les Certificats d'Économies d'Énergie,"
          titleAccent="transformés en travaux financés."
          subtitle="Énergies Plus identifie la bonne fiche, sécurise votre dossier avant la signature du devis, et vous suit jusqu'à la réception du chantier. Résidentiel, tertiaire, industrie, agriculture, réseaux, transport."
          note="Le catalogue des fiches CEE évolue régulièrement — faites vérifier votre projet avant de vous engager."
          primaryCta={{ label: "Vérifier mon éligibilité", href: "#contact" }}
          secondaryCta={{ label: "Voir le catalogue", href: "#catalogue" }}
          image="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1900&q=80&auto=format&fit=crop"
          imageAlt="Éoliennes et panneaux solaires dans un paysage de campagne"
          chips={[
            { value: "Gratuite", label: "Étude d'éligibilité" },
            { value: "Avant devis", label: "Montage du dossier" },
            { value: "6 secteurs", label: "Couverts par le dispositif" },
            { value: "France", label: "Intervention nationale" },
          ]}
        />

        <SectorMarquee />
        <CeeMechanism />
        <OperationsCatalog />
        <SectorGrid />
        <RulesBeforeQuoteSection />

        <HowItWorks
          id="methode"
          title="Notre méthode, en 4 temps"
          description="Le même fil conducteur, quelle que soit la fiche : du premier échange au versement de la prime."
          steps={STEPS}
        />

        <TrustSection
          id="references"
          eyebrow="Références"
          title="Une expertise du dispositif, pas un intermédiaire de plus"
          description="Les preuves ci-dessous seront complétées par Énergies Plus avec ses références réelles."
          showCertifications={false}
        />

        <Faq
          title="Les CEE, en clair"
          description="Les questions qui reviennent le plus souvent."
          items={FAQ_ITEMS}
        />

        {/* CTA final */}
        <section
          id="contact"
          className="relative overflow-hidden bg-secondary/40 py-20 sm:py-28"
        >
          <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="container grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
                Contact
              </p>
              <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
                Parlons de votre projet <em>avant</em> que le devis ne soit signé
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

            <Reveal
              variant="left"
              className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8"
            >
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
              "Accompagnement aux Certificats d'Économies d'Énergie (CEE)",
            provider: {
              "@type": "Organization",
              name: site.legal.companyName,
              description: site.privateActorShort,
            },
            areaServed: { "@type": "Country", name: "France" },
          }),
        }}
      />
    </>
  );
}

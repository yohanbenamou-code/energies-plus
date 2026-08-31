import type { Metadata } from "next";
import { BellRing, PackageX, Sparkles } from "lucide-react";
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
import { Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";

const NAV = [
  { label: "Le dispositif", href: "#dispositif" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Qui nous accompagnons", href: "#secteurs" },
  { label: "Notre méthode", href: "#methode" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/** Méthode réelle de l'équipe (plaquette). */
const STEPS = [
  {
    title: "Étude des besoins",
    body: "Prise de contact, audit approfondi de vos bâtiments et identification des solutions les plus adaptées. Accord de principe pour lancer la demande de subvention.",
  },
  {
    title: "Proposition personnalisée",
    body: "Montage du dossier pour obtenir un numéro de subvention, et plan d'action sur mesure avec des solutions concrètes et optimisées.",
  },
  {
    title: "Mise en œuvre des travaux",
    body: "Coordination des équipes techniques pour la réalisation des interventions, avec un suivi rigoureux du respect des délais.",
  },
  {
    title: "Contrôle COFRAC après travaux",
    body: "À l'issue du chantier, un organisme COFRAC contrôle les ouvrages : conformité et qualité vérifiées de façon indépendante.",
  },
];

const ENGAGEMENTS = [
  {
    icon: BellRing,
    title: "Avis de passage",
    body: "Les occupants sont informés avant le démarrage. Communication régulière avec le responsable du site.",
  },
  {
    icon: PackageX,
    title: "Pas de stockage",
    body: "Aucun stockage de matériel pendant les travaux. Véhicules garés à l'écart, en accord avec le site.",
  },
  {
    icon: Sparkles,
    title: "Nettoyage journalier",
    body: "Chaque soir, les chantiers sont nettoyés et les déchets évacués en déchetterie.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qu'est-ce que les Certificats d'Économies d'Énergie ?",
    plainAnswer:
      "Un dispositif public créé en 2005 et encadré par le Ministère de la Transition Écologique. Il oblige les fournisseurs d'énergie (EDF, TotalEnergies, enseignes de carburant…) à financer des travaux d'économies d'énergie. Ce financement se traduit par une prime sur des opérations précises, listées dans des fiches officielles.",
    answer: (
      <>
        <p>
          Un dispositif public créé en 2005, encadré par le Ministère de la
          Transition Écologique. Il oblige les fournisseurs d&apos;énergie (EDF,
          TotalEnergies, enseignes de carburant…) à financer des travaux
          d&apos;économies d&apos;énergie.
        </p>
        <p>
          Ce financement se traduit par une prime sur des opérations précises
          (les fiches standardisées). Le volume officiel s&apos;exprime en kWh
          cumac ; sa valeur en euros dépend du marché et de votre situation.
        </p>
      </>
    ),
  },
  {
    question: "Les travaux sont-ils vraiment financés à 100 % ?",
    plainAnswer:
      "Souvent, oui. Selon l'opération et votre éligibilité, la prime CEE peut couvrir tout ou une large part du coût des travaux, sans avance de trésorerie. Cumulable avec MaPrimeRénov'. Le reste à charge éventuel vous est indiqué en toute transparence avant tout engagement.",
    answer: (
      <p>
        Souvent, oui. Selon l&apos;opération et votre éligibilité, la prime CEE
        couvre tout ou une large part du coût, sans avance de trésorerie, et se
        cumule avec MaPrimeRénov&apos;. Le reste à charge éventuel vous est
        indiqué avant tout engagement.
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
    question: "Qui peut en bénéficier ?",
    plainAnswer:
      "Bailleurs sociaux, établissements de santé et médico-sociaux, collectivités, copropriétés, sites industriels et tertiaires, exploitations agricoles : dès qu'un projet correspond à une fiche CEE et en respecte les conditions.",
    answer: (
      <p>
        Bailleurs sociaux, établissements de santé, collectivités, copropriétés,
        sites industriels et tertiaires, exploitations agricoles… Dès qu&apos;un
        projet correspond à une fiche CEE. Nous vérifions votre cas gratuitement.
      </p>
    ),
  },
  {
    question: "Quelles opérations accompagnez-vous ?",
    plainAnswer:
      "Isolation des réseaux de chauffage (calorifugeage) et des points singuliers, isolation des planchers, combles et murs, robinets thermostatiques, GTB, éclairage LED, désembouage et équilibrage, récupération de chaleur sur groupes froids, Contrat de Performance Énergétique, et séchage solaire agricole (fiche AGRI-EQ-110, avec page dédiée).",
    answer: (
      <p>
        Calorifugeage et points singuliers, isolation des planchers / combles /
        murs, robinets thermostatiques, GTB, éclairage LED, désembouage et
        équilibrage, récupération de chaleur sur groupes froids, Contrat de
        Performance Énergétique, et séchage solaire agricole (fiche{" "}
        <strong>AGRI-EQ-110</strong>). Voir le catalogue ci-dessus.
      </p>
    ),
  },
  {
    question: "Énergies Plus est-il un organisme d'État ?",
    plainAnswer:
      "Non. Énergies Plus est une entreprise privée, certifiée RGE. Elle accompagne ses clients dans le cadre du dispositif public des CEE, mais n'est ni un service de l'État ni un organisme public, et n'utilise aucun symbole officiel de la République française.",
    answer: (
      <p>
        <strong>Non.</strong> Énergies Plus est une entreprise privée, certifiée
        RGE. Elle accompagne ses clients dans le cadre du dispositif public des
        CEE, mais n&apos;est ni un service de l&apos;État ni un organisme public.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "Les aides CEE, transformées en travaux financés",
  description:
    "Énergies Plus accompagne bailleurs sociaux, établissements de santé, collectivités, copropriétés et industriels sur les opérations CEE : calorifugeage, GTB, isolation, éclairage LED, récupération de chaleur. Étude d'éligibilité gratuite.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header nav={NAV} ctaLabel="Vérifier mon éligibilité" ctaHref="#contact" />

      <main id="contenu">
        <Hero
          eyebrow="Conseil & travaux CEE — depuis 2015"
          title="Vos travaux d'économies d'énergie,"
          titleAccent="souvent financés à 100 %."
          subtitle="Énergies Plus identifie la bonne fiche CEE, sécurise votre dossier avant la signature du devis et coordonne le chantier jusqu'au contrôle COFRAC. Bailleurs sociaux, santé, collectivités, copropriétés, industrie, agriculture."
          note="Le dossier CEE doit être engagé avant la signature du devis — faites vérifier votre projet avant de vous engager."
          primaryCta={{ label: "Vérifier mon éligibilité", href: "#contact" }}
          secondaryCta={{ label: "Voir le catalogue des fiches", href: "#catalogue" }}
          image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1900&q=80&auto=format&fit=crop"
          imageAlt="Façade d'un immeuble collectif"
          chips={[
            { value: "Depuis 2015", label: "Activité de l'équipe" },
            { value: "+4 000", label: "Bâtiments accompagnés" },
            { value: "RGE", label: "Entreprise certifiée" },
            { value: "COFRAC", label: "Contrôle après travaux" },
          ]}
        />

        <SectorMarquee />
        <CeeMechanism />
        <OperationsCatalog />
        <SectorGrid />
        <RulesBeforeQuoteSection />

        <HowItWorks
          id="methode"
          title="Notre méthode, en 4 étapes"
          description="Le même fil conducteur pour chaque fiche : de l'audit au contrôle indépendant."
          steps={STEPS}
        />

        {/* Engagements chantier */}
        <section className="border-b border-border bg-background py-16 sm:py-20">
          <div className="container">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
                Sur site
              </p>
              <h2 className="display mt-3 text-2xl text-foreground sm:text-3xl">
                Des travaux menés <em>sans perturber</em> l&apos;activité
              </h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-6 sm:grid-cols-3">
              {ENGAGEMENTS.map((e) => (
                <StaggerItem key={e.title} as="div">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <e.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-foreground">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {e.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <TrustSection
          id="references"
          eyebrow="Références"
          title="Une expertise du dispositif, pas un intermédiaire de plus"
          description="L'équipe accompagne des patrimoines complets depuis 2015, avec un contrôle COFRAC systématique."
          showCredentials
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

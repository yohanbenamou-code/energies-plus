import * as React from "react";
import { ArrowRight, Building2, HandCoins, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";

const STEPS = [
  {
    icon: Building2,
    tag: "Les obligés",
    title: "L'État fixe un objectif aux fournisseurs d'énergie",
    body: "EDF, TotalEnergies, Engie, les enseignes de carburant… ont l'obligation légale de faire réaliser un volume d'économies d'énergie, mesuré en kWh cumac. C'est le principe pollueur-payeur.",
  },
  {
    icon: HandCoins,
    title: "Ils financent une partie de vos travaux",
    tag: "La prime CEE",
    body: "Pour atteindre cet objectif, ils versent une prime sur des opérations précises : isolation, pompe à chaleur, GTB, éclairage LED, séchage solaire… Chaque opération a sa « fiche » officielle.",
  },
  {
    icon: Wrench,
    tag: "Vos travaux",
    title: "Vous réalisez le projet, dans le bon ordre",
    body: "Le dossier CEE et l'engagement du financeur doivent être établis avant la signature du devis. Ensuite, l'installateur de votre choix réalise les travaux et la prime est versée.",
  },
];

export function CeeMechanism() {
  return (
    <section
      id="dispositif"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
            Comment ça marche
          </p>
          <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
            Le dispositif CEE en <em>trois acteurs</em>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Les Certificats d&apos;Économies d&apos;Énergie sont un mécanisme
            public créé en 2005 et encadré par le Ministère de la Transition
            Écologique. Comprendre qui paie, et pourquoi, aide à ne pas se
            tromper de calendrier.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title} as="div" className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-600">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
              {i < STEPS.length - 1 ? (
                <ArrowRight className="absolute -right-5 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-border lg:block" />
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 max-w-3xl space-y-3">
          <p className="rounded-xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm text-foreground">
            La prime CEE est <strong>cumulable avec MaPrimeRénov&apos;</strong> :
            selon l&apos;opération et votre éligibilité, l&apos;ensemble peut
            couvrir tout ou une large part du coût des travaux, sans avance de
            trésorerie.
          </p>
          <p className="rounded-xl border-l-4 border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            Le volume officiel de chaque aide s&apos;exprime en{" "}
            <strong className="text-foreground">kWh cumac</strong>. Sa valeur en
            euros varie selon le marché et votre situation : nous ne communiquons
            jamais de montant garanti avant l&apos;étude.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

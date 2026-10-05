import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

const STEPS = [
  {
    tag: "Les obligés",
    title: "L'État fixe un objectif aux fournisseurs d'énergie",
    body: "EDF, TotalEnergies, Engie, les enseignes de carburant… ont l'obligation légale de faire réaliser un volume d'économies d'énergie, mesuré en kWh cumac. C'est le principe pollueur-payeur.",
  },
  {
    tag: "La prime CEE",
    title: "Ils financent une partie de vos travaux",
    body: "Pour atteindre cet objectif, ils versent une prime sur des opérations précises : isolation, pompe à chaleur, solaire, GTB, éclairage LED, séchage solaire… Chaque opération a sa « fiche » officielle.",
  },
  {
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
        <SectionHead
          index="01"
          label="Le dispositif"
          title="Les CEE, en trois acteurs"
          description="Les Certificats d'Économies d'Énergie sont un mécanisme public créé en 2005 et encadré par le Ministère de la Transition Écologique. Comprendre qui paie, et pourquoi, aide à ne pas se tromper de calendrier."
        />

        <div className="mt-14 grid border-y border-foreground/20 lg:grid-cols-3 lg:divide-x lg:divide-foreground/20">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.07}
              className="border-b border-foreground/20 py-9 last:border-b-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="display text-6xl text-accent">{i + 1}</p>
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                {step.tag}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Cumul avec MaPrimeRénov&apos;
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Selon l&apos;opération et votre éligibilité, la prime CEE peut se
              cumuler avec MaPrimeRénov&apos; : l&apos;ensemble peut couvrir
              tout ou une large part du coût des travaux, sans avance de
              trésorerie.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Le kWh cumac, seule valeur officielle
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Le volume officiel de chaque aide s&apos;exprime en kWh cumac. Sa
              valeur en euros varie selon le marché et votre situation : nous
              ne communiquons jamais de montant garanti avant l&apos;étude.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

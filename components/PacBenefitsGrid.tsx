import * as React from "react";
import {
  Clock,
  Leaf,
  PiggyBank,
  ShieldCheck,
  Thermometer,
  TrendingDown,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";

const BENEFITS = [
  {
    icon: PiggyBank,
    title: "Moins à sortir de votre poche",
    body: "L'aide CEE, bonifiée en cas de remplacement d'une chaudière fossile, couvre une part importante de l'investissement. Montant estimé lors de l'étude, non contractuel.",
  },
  {
    icon: TrendingDown,
    title: "Une facture énergétique allégée",
    body: "Une pompe à chaleur performante produit plusieurs kWh de chaleur pour 1 kWh d'électricité consommée.",
  },
  {
    icon: ShieldCheck,
    title: "Moins dépendant du fioul, du gaz et du charbon",
    body: "Vous sécurisez votre chaufferie face aux hausses de prix et aux contraintes réglementaires sur les énergies fossiles.",
  },
  {
    icon: Thermometer,
    title: "Un confort thermique stable",
    body: "Chauffage — et éventuellement eau chaude sanitaire — assurés toute l'année, avec une régulation fine par zone.",
  },
  {
    icon: Leaf,
    title: "Une démarche de décarbonation valorisable",
    body: "Utile pour votre bilan carbone, vos obligations issues du décret tertiaire (dispositif Éco Énergie Tertiaire) et votre image.",
  },
  {
    icon: Clock,
    title: "Fait pour durer",
    body: "Le matériel est prévu, selon la fiche officielle, pour fonctionner 22 ans.",
  },
];

export function PacBenefitsGrid() {
  return (
    <section
      id="benefices"
      className="border-b border-border bg-secondary/40 py-20 sm:py-24"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Ce que ça change
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Concrètement, pour votre bâtiment
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <StaggerItem key={benefit.title} as="article">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-600">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

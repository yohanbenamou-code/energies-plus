import * as React from "react";
import {
  Clock,
  Leaf,
  PiggyBank,
  Sun,
  TrendingDown,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const BENEFITS = [
  {
    icon: PiggyBank,
    title: "Réduction du reste à charge",
    body: "La prime CEE vient diminuer l'investissement initial dans votre système de séchage. Montant estimé, non contractuel, sous réserve d'éligibilité.",
  },
  {
    icon: Sun,
    title: "Double valorisation solaire",
    body: "Les panneaux hybrides produisent à la fois de l'électricité et de la chaleur récupérée pour le séchage.",
  },
  {
    icon: TrendingDown,
    title: "Moins de pertes post-récolte",
    body: "Un séchage maîtrisé et homogène améliore la qualité de conservation et limite les pertes.",
  },
  {
    icon: Zap,
    title: "Autonomie énergétique",
    body: "Vous réduisez votre dépendance aux énergies fossiles et aux variations de prix pour le poste séchage.",
  },
  {
    icon: Leaf,
    title: "Démarche écoresponsable",
    body: "Une énergie renouvelable mobilisée au plus près du besoin, valorisable dans votre communication d'exploitation.",
  },
  {
    icon: Clock,
    title: "Durée de vie 15 ans",
    body: "La durée de vie conventionnelle retenue par la fiche d'opération AGRI-EQ-110 est de 15 ans.",
  },
] as const;

export function BenefitsGrid() {
  return (
    <section
      id="benefices"
      className="border-b border-border bg-secondary/40 py-16 sm:py-20"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Bénéfices"
          title="Ce que le séchage solaire change pour votre exploitation"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.05} as="article">
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

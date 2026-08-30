import * as React from "react";
import {
  Clock,
  Leaf,
  PiggyBank,
  ShieldCheck,
  Sun,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";

const BENEFITS = [
  {
    icon: PiggyBank,
    title: "Moins à sortir de votre poche",
    body: "L'aide CEE couvre une part importante de l'investissement. Montant estimé lors de l'étude, non contractuel.",
  },
  {
    icon: Sun,
    title: "Le soleil fait le travail",
    body: "Les panneaux hybrides produisent électricité et chaleur. La chaleur part directement dans votre séchoir.",
  },
  {
    icon: TrendingUp,
    title: "Une meilleure récolte, mieux conservée",
    body: "Un séchage régulier et maîtrisé, c'est moins de pertes et une qualité qui se vend mieux.",
  },
  {
    icon: ShieldCheck,
    title: "Moins dépendant du fioul et du gaz",
    body: "Vous sécurisez votre poste séchage face aux hausses de prix de l'énergie.",
  },
  {
    icon: Leaf,
    title: "Une démarche qui se valorise",
    body: "Une énergie renouvelable, produite sur votre exploitation, utile à votre image auprès de vos clients.",
  },
  {
    icon: Clock,
    title: "Fait pour durer",
    body: "Le matériel est prévu pour fonctionner une quinzaine d'années.",
  },
];

export function BenefitsGrid() {
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
            Concrètement, pour votre exploitation
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

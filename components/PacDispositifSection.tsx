"use client";

import * as React from "react";
import { Banknote, ClipboardCheck, Flame } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";

const POINTS = [
  {
    icon: Banknote,
    title: "Une aide qui réduit votre facture",
    body: "Le dispositif public des CEE finance une partie de votre pompe à chaleur. Vous investissez, mais votre reste à charge baisse nettement.",
  },
  {
    icon: Flame,
    title: "Un bonus si vous quittez une chaudière fossile",
    body: "Lorsque la PAC remplace une chaudière fioul, gaz ou charbon, le bonus « Coup de pouce Chauffage » peut tripler le volume d'aide.",
  },
  {
    icon: ClipboardCheck,
    title: "Un ordre à respecter",
    body: "Le dossier d'aide se monte avant la signature du devis. C'est notre métier : on s'en charge pour que rien ne bloque le versement.",
  },
];

const CONDITIONS = [
  "Bâtiment tertiaire existant depuis plus de 2 ans à la date d'engagement de l'opération",
  "PAC dimensionnée pour couvrir, en totalité ou en partie, les besoins de chauffage (seul, ou chauffage et eau chaude sanitaire) — une PAC destinée uniquement à l'eau chaude sanitaire n'est pas éligible",
  "Efficacité énergétique saisonnière (Etas) ≥ 111 % (basse température) ou ≥ 126 % (moyenne/haute température), pour une puissance ≤ 400 kW",
  "Coefficient de performance (COP) ≥ 3,4 mesuré selon la norme EN 14511-2, pour une puissance > 400 kW",
  "Remise obligatoire d'une note de dimensionnement au bénéficiaire",
];

export function PacDispositifSection() {
  return (
    <section
      id="dispositif"
      className="border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Le principe
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une aide de l&apos;État, une chaufferie qui change d&apos;énergie
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Les Certificats d&apos;Économies d&apos;Énergie sont un dispositif
            public : l&apos;État oblige les fournisseurs d&apos;énergie à
            financer des travaux d&apos;économies d&apos;énergie. Le
            remplacement d&apos;une chaudière par une pompe à chaleur air/eau
            en fait partie (fiche BAT-TH-163).
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {POINTS.map((point) => (
            <StaggerItem key={point.title} as="div">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <point.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 max-w-3xl rounded-xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm text-foreground">
          Les montants en euros évoqués lors de l&apos;étude sont indicatifs,
          non contractuels et communiqués sous réserve d&apos;éligibilité.
          Seul le volume officiel de l&apos;aide (en kWh cumac) est défini par
          le barème.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-8 max-w-3xl rounded-xl border border-border bg-muted/20 px-5"
        >
          <AccordionItem value="tech" className="border-b-0">
            <AccordionTrigger className="text-sm">
              Le cadre technique de l&apos;aide (opération BAT-TH-163)
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">
                Pour information, l&apos;aide s&apos;appuie sur une fiche
                officielle qui fixe des conditions précises. Nos conseillers
                les vérifient pour vous ; vous n&apos;avez pas à les
                maîtriser.
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                {CONDITIONS.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
              <p className="mt-3">
                Durée de vie conventionnelle retenue par la fiche : 22 ans.
              </p>
              <p className="mt-3">
                Bonus « Coup de pouce Chauffage » (x3) lorsque la PAC
                remplace une chaudière fioul, gaz ou charbon et que le
                raccordement à un réseau de chaleur est techniquement ou
                économiquement impossible — conditions et durée fixées par
                arrêté, vérifiées par nos conseillers au moment du dossier.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

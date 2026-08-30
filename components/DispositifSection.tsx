"use client";

import * as React from "react";
import { Banknote, ClipboardCheck, Sun } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import type { CeeOperation } from "@/types/operation";

const POINTS = [
  {
    icon: Banknote,
    title: "Une aide qui réduit votre facture",
    body: "Le dispositif public des CEE finance une partie de votre séchoir solaire. Vous investissez, mais votre reste à charge baisse nettement.",
  },
  {
    icon: Sun,
    title: "Un séchage plus régulier",
    body: "L'air chaud produit par les panneaux hybrides sèche votre récolte en douceur : meilleure conservation, moins de pertes, moins de dépendance au gaz ou au fioul.",
  },
  {
    icon: ClipboardCheck,
    title: "Un ordre à respecter",
    body: "Le dossier d'aide se monte avant la signature du devis. C'est notre métier : on s'en charge pour que rien ne bloque le versement.",
  },
];

export function DispositifSection({ operation }: { operation: CeeOperation }) {
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
            Une aide de l&apos;État, un séchoir qui travaille pour vous
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Les Certificats d&apos;Économies d&apos;Énergie sont un dispositif
            public : l&apos;État oblige les fournisseurs d&apos;énergie à financer
            des travaux d&apos;économies d&apos;énergie. Le séchage solaire
            agricole en fait partie.
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
          Les montants en euros évoqués lors de l&apos;étude sont indicatifs, non
          contractuels et communiqués sous réserve d&apos;éligibilité. Seul le
          volume officiel de l&apos;aide (en kWh cumac) est défini par le barème.
        </p>

        {/* Détail technique : disponible mais volontairement en retrait. */}
        <Accordion
          type="single"
          collapsible
          className="mt-8 max-w-3xl rounded-xl border border-border bg-muted/20 px-5"
        >
          <AccordionItem value="tech" className="border-b-0">
            <AccordionTrigger className="text-sm">
              Le cadre technique de l&apos;aide (opération {operation.code})
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">
                Pour information, l&apos;aide s&apos;appuie sur une fiche
                officielle qui fixe des conditions précises. Nos conseillers les
                vérifient pour vous ; vous n&apos;avez pas à les maîtriser.
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                {operation.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
              <p className="mt-3">
                Durée de vie conventionnelle retenue par la fiche :{" "}
                {operation.lifespanYears} ans.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

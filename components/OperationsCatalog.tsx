import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FicheOperationCard } from "@/components/FicheOperationCard";
import { operations } from "@/data/operations";

export function OperationsCatalog() {
  return (
    <section id="operations" className="border-b border-border bg-background py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Nos opérations CEE"
          title="Le catalogue des opérations que nous accompagnons"
          description="Chaque opération correspond à une fiche standardisée publiée par le Ministère de la Transition Écologique. Nous accompagnons aujourd'hui l'opération AGRI-EQ-110 et enrichissons progressivement ce catalogue."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {operations.map((operation, i) => (
            <Reveal key={operation.slug} delay={i * 0.06}>
              <FicheOperationCard operation={operation} />
            </Reveal>
          ))}

          {/* Emplacement visuel indiquant que le catalogue s'étoffera. */}
          <Reveal delay={operations.length * 0.06}>
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
              <p className="text-sm font-medium text-foreground">
                D&apos;autres opérations à venir
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Le dispositif CEE évolue régulièrement. Contactez-nous pour
                vérifier si votre projet entre dans une opération en vigueur.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

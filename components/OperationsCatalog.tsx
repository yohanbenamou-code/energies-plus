import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { FicheOperationCard } from "@/components/FicheOperationCard";
import { operations } from "@/data/operations";

export function OperationsCatalog() {
  return (
    <section id="operations" className="border-b border-border bg-secondary/40 py-20 sm:py-24">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Nos opérations CEE
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Les aides que nous savons monter
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Chaque aide correspond à une opération standardisée du dispositif
            public des CEE. Nous accompagnons aujourd'hui le séchage solaire
            agricole et forestier, et enrichissons ce catalogue au fil des
            évolutions réglementaires.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {operations.map((operation) => (
            <StaggerItem key={operation.slug} as="div">
              <FicheOperationCard operation={operation} />
            </StaggerItem>
          ))}

          <StaggerItem as="div">
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
              <p className="text-sm font-semibold text-foreground">
                D&apos;autres aides à venir
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Le dispositif CEE évolue régulièrement. Appelez-nous pour vérifier
                si votre projet entre dans une opération en vigueur.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

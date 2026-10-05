"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Stagger, StaggerItem } from "@/components/motion";
import { useSolutionForm } from "@/components/solution-form-context";
import type { LiveCeeOperation } from "@/types/operation";

const FRIENDLY: Record<string, { title: string; subtitle: string }> = {
  "systeme-complet-neuf": {
    title: "Vous partez de zéro",
    subtitle: "Une installation de séchage solaire complète, neuve, clé en main.",
  },
  "toiture-couplee": {
    title: "Vous avez déjà un séchoir",
    subtitle:
      "On ajoute une toiture solaire à votre système existant pour le faire monter en température.",
  },
};

export function SolutionVariantCards({
  operation,
  index = "02",
}: {
  operation: LiveCeeOperation;
  index?: string;
}) {
  const { applyPrefill, scrollToContact } = useSolutionForm();

  const choose = (variantKey: string) => {
    applyPrefill({ projectType: variantKey });
    scrollToContact();
  };

  return (
    <section
      id="solutions"
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Deux cas de figure"
          title="Quel que soit votre point de départ"
          description="Nos conseillers déterminent avec vous la configuration adaptée à votre bâtiment."
        />

        <Stagger className="mt-8 sm:mt-12 grid gap-5 md:grid-cols-2">
          {operation.variants.map((variant) => {
            const f = FRIENDLY[variant.key] ?? {
              title: variant.label,
              subtitle: variant.description,
            };
            return (
              <StaggerItem key={variant.key} as="article">
                <div className="flex h-full flex-col rounded-md border border-foreground/20 bg-card p-7">
                  <h3 className="display text-2xl text-foreground">{f.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {f.subtitle}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-foreground">
                    Ce qui est installé
                  </p>
                  <ul className="list-plus mt-3 flex-1 space-y-2 text-sm text-foreground">
                    {variant.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => choose(variant.key)}
                    className="mt-7 inline-flex items-center gap-2 self-start border-b-2 border-accent pb-1 text-sm font-semibold text-foreground transition-colors hover:text-accent-600"
                  >
                    C&apos;est mon cas
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

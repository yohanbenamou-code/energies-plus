"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { useSolutionForm } from "@/components/solution-form-context";
import type { CeeOperation } from "@/types/operation";

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

export function SolutionVariantCards({ operation }: { operation: CeeOperation }) {
  const { applyPrefill, scrollToContact } = useSolutionForm();

  const choose = (variantKey: string) => {
    applyPrefill({ projectType: variantKey });
    scrollToContact();
  };

  return (
    <section
      id="solutions"
      className="border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Deux cas de figure
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quel que soit votre point de départ
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nos conseillers déterminent avec vous la configuration adaptée à
            votre bâtiment.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {operation.variants.map((variant) => {
            const f = FRIENDLY[variant.key] ?? {
              title: variant.label,
              subtitle: variant.description,
            };
            return (
              <StaggerItem key={variant.key} as="article">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="text-xl font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.subtitle}
                  </p>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Ce qui est installé
                  </p>
                  <ul className="mt-2 flex-1 space-y-2">
                    {variant.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 w-full"
                    onClick={() => choose(variant.key)}
                  >
                    C&apos;est mon cas
                    <ArrowRight />
                  </Button>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

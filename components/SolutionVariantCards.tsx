"use client";

import * as React from "react";
import { Check, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSolutionForm } from "@/components/solution-form-context";
import type { CeeOperation } from "@/types/operation";

export function SolutionVariantCards({
  operation,
}: {
  operation: CeeOperation;
}) {
  const { applyPrefill, scrollToContact } = useSolutionForm();

  const choose = (variantKey: string) => {
    applyPrefill({ projectType: variantKey });
    scrollToContact();
  };

  return (
    <section
      id="solutions"
      className="border-b border-border bg-background py-16 sm:py-20"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Nos solutions"
          title="Deux configurations possibles"
          description="L'opération AGRI-EQ-110 couvre deux cas d'usage. Nos conseillers déterminent avec vous celui qui correspond à votre bâtiment."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {operation.variants.map((variant, i) => (
            <Reveal key={variant.key} delay={i * 0.08} as="article">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Thermometer className="h-4 w-4" />
                  {variant.temperatureRange}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {variant.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {variant.description}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {variant.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
                  En savoir plus sur cette configuration
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Les montants en euros éventuellement évoqués lors de l&apos;étude sont
          des estimations non contractuelles, sous réserve d&apos;éligibilité.
          Seuls les volumes en kWh cumac correspondent aux barèmes officiels.
        </p>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { usePacForm } from "@/components/pac-form-context";
import { PAC_SECTOR_LABELS, type PacSectorKey } from "@/lib/pac-calculator";

const DESCRIPTIONS: Record<PacSectorKey, string> = {
  bureaux: "Sièges sociaux, immeubles de bureaux, espaces de coworking.",
  enseignement: "Écoles, collèges, lycées, établissements d'enseignement supérieur.",
  "hotellerie-restauration": "Hôtels, restaurants, résidences de tourisme.",
  sante: "EHPAD, cliniques, centres de santé, établissements médico-sociaux.",
  commerces: "Magasins, surfaces de vente, centres commerciaux.",
  autres: "Tout autre bâtiment tertiaire existant depuis plus de 2 ans.",
};

const SECTOR_KEYS = Object.keys(PAC_SECTOR_LABELS) as PacSectorKey[];

export function PacEligibilitySection() {
  const { applyPrefill, scrollToContact } = usePacForm();

  const choose = (sector: PacSectorKey) => {
    applyPrefill({ sector });
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
            Secteurs concernés
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quel que soit votre bâtiment
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            La fiche BAT-TH-163 couvre tous les bâtiments tertiaires
            existants. Nos conseillers déterminent avec vous la configuration
            adaptée.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_KEYS.map((key) => (
            <StaggerItem key={key} as="article">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground">
                  {PAC_SECTOR_LABELS[key]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[key]}
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent-600" />
                  Bâtiment existant depuis plus de 2 ans
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-5 w-full"
                  onClick={() => choose(key)}
                >
                  C&apos;est mon cas
                  <ArrowRight />
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
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

export function PacEligibilitySection({ index = "02" }: { index?: string }) {
  const { applyPrefill, scrollToContact } = usePacForm();

  const choose = (sector: PacSectorKey) => {
    applyPrefill({ sector });
    scrollToContact();
  };

  return (
    <section
      id="solutions"
      className="border-b border-border bg-secondary/50 py-20 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Secteurs concernés"
          title="Quel que soit votre bâtiment"
          description="La fiche BAT-TH-163 couvre tous les bâtiments tertiaires existants depuis plus de 2 ans. Nos conseillers déterminent avec vous la configuration adaptée."
        />

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-md border border-foreground/20 bg-foreground/20 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_KEYS.map((key) => (
            <StaggerItem key={key} as="article">
              <div className="flex h-full flex-col bg-card p-7">
                <h3 className="display text-2xl text-foreground">
                  {PAC_SECTOR_LABELS[key]}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[key]}
                </p>
                <button
                  type="button"
                  onClick={() => choose(key)}
                  className="mt-6 inline-flex items-center gap-2 self-start border-b-2 border-accent pb-1 text-sm font-semibold text-foreground transition-colors hover:text-accent-600"
                >
                  C&apos;est mon cas
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

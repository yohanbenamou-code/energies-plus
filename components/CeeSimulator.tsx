"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { useSolutionForm } from "@/components/solution-form-context";
import { calculateCumac } from "@/lib/cee-calculator";
import { formatNumberFr, cn } from "@/lib/utils";
import { REGIONS, zoneForRegion } from "@/data/regions";
import type { LiveCeeOperation, ProductType } from "@/types/operation";

const MIN_KW = 10;
const MAX_KW = 300;

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

export function CeeSimulator({ operation }: { operation: LiveCeeOperation }) {
  const { applyPrefill, scrollToContact } = useSolutionForm();

  const [product, setProduct] = React.useState<ProductType>("agricole");
  const [variantIndex, setVariantIndex] = React.useState(0);
  const [region, setRegion] = React.useState("");
  const [sizeKw, setSizeKw] = React.useState(60);

  const variant = operation.variants[variantIndex];
  const zone = zoneForRegion(region);
  const cumac = calculateCumac(variant, zone, product, sizeKw);

  const sizeLabel =
    sizeKw < 40 ? "Petit séchoir" : sizeKw < 130 ? "Séchoir moyen" : "Grand séchoir";

  const handleGetEstimate = () => {
    applyPrefill({
      productType: product,
      projectType: variant.key,
      zone,
      powerKw: sizeKw,
      estimatedCumac: Math.round(cumac),
    });
    scrollToContact();
  };

  return (
    <section
      id="simulateur"
      className="border-b border-border bg-secondary/40 py-20 sm:py-24"
    >
      <div className="container max-w-3xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Estimation
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            En 30 secondes, une idée de votre aide
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Trois questions simples. Le calcul s&apos;appuie sur le barème
            officiel de l&apos;aide.
          </p>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
          <div className="grid gap-8 [&>*]:min-w-0">
            {/* Produits */}
            <div>
              <Label className="mb-2 block">Vous séchez plutôt…</Label>
              <div className="flex flex-wrap gap-2">
                <Choice active={product === "agricole"} onClick={() => setProduct("agricole")}>
                  Des produits agricoles
                </Choice>
                <Choice active={product === "forestier"} onClick={() => setProduct("forestier")}>
                  Du bois / produits forestiers
                </Choice>
              </div>
            </div>

            {/* Type de projet */}
            <div>
              <Label className="mb-2 block">Votre projet</Label>
              <div className="flex flex-wrap gap-2">
                <Choice active={variantIndex === 0} onClick={() => setVariantIndex(0)}>
                  Installation neuve complète
                </Choice>
                <Choice active={variantIndex === 1} onClick={() => setVariantIndex(1)}>
                  Ajout sur un séchoir existant
                </Choice>
              </div>
            </div>

            {/* Région */}
            <div>
              <Label htmlFor="sim-region" className="mb-2 block">
                Votre région
              </Label>
              <select
                id="sim-region"
                value={region}
                onChange={(e) => setRegion(e.currentTarget.value)}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Sélectionnez votre région…</option>
                {REGIONS.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted-foreground">
                La région influe légèrement sur le montant (climat plus ou moins
                froid). Votre conseiller l&apos;affine ensuite.
              </p>
            </div>

            {/* Taille */}
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <Label htmlFor="sim-size">Taille de votre projet de séchage</Label>
                <span className="text-sm font-semibold text-primary-700">
                  {sizeLabel}
                </span>
              </div>
              <Slider
                value={[sizeKw]}
                min={MIN_KW}
                max={MAX_KW}
                step={10}
                onValueChange={(v) => setSizeKw(v[0] ?? MIN_KW)}
                aria-label="Taille du projet de séchage"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Petit</span>
                <span>Grand</span>
              </div>
            </div>

            {/* Résultat */}
            <div className="rounded-xl bg-primary-50 p-5">
              <p className="text-sm text-primary-700">
                {region
                  ? "Votre projet pourrait ouvrir droit à une aide d'environ"
                  : "Sélectionnez votre région pour affiner. Estimation actuelle :"}
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-primary-700">
                {formatNumberFr(cumac)}{" "}
                <span className="text-lg font-bold">kWh cumac</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-primary-700/80">
                C&apos;est le volume officiel de l&apos;aide. Sa valeur en euros
                dépend du moment et de votre situation — indicative, non
                contractuelle, sous réserve d&apos;éligibilité.
              </p>

              <Button
                type="button"
                variant="accent"
                size="lg"
                className="mt-4 h-auto w-full whitespace-normal py-3 text-center sm:w-auto"
                onClick={handleGetEstimate}
              >
                Recevoir mon estimation chiffrée en euros
                <ArrowRight className="hidden sm:inline-block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

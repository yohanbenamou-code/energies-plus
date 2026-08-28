"use client";

import * as React from "react";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/SectionHeading";
import { useSolutionForm } from "@/components/solution-form-context";
import { calculateCumac } from "@/lib/cee-calculator";
import { formatNumberFr, cn } from "@/lib/utils";
import type {
  CeeOperation,
  ClimateZone,
  ProductType,
} from "@/types/operation";

const ZONES: ClimateZone[] = ["H1", "H2", "H3"];
const MIN_KW = 5;
const MAX_KW = 500;

function Toggle({
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

export function CeeSimulator({ operation }: { operation: CeeOperation }) {
  const { applyPrefill, scrollToContact } = useSolutionForm();

  const [product, setProduct] = React.useState<ProductType>("agricole");
  const [variantIndex, setVariantIndex] = React.useState(0);
  const [zone, setZone] = React.useState<ClimateZone>("H2");
  const [powerKw, setPowerKw] = React.useState(50);

  const variant = operation.variants[variantIndex];
  const cumac = calculateCumac(variant, zone, product, powerKw);

  const handleGetEstimate = () => {
    applyPrefill({
      productType: product,
      projectType: variant.key,
      zone,
      powerKw,
      estimatedCumac: Math.round(cumac),
    });
    scrollToContact();
  };

  const clampPower = (value: number) => {
    if (!Number.isFinite(value)) return MIN_KW;
    return Math.min(MAX_KW, Math.max(MIN_KW, Math.round(value)));
  };

  return (
    <section
      id="simulateur"
      className="border-b border-border bg-background py-16 sm:py-20"
    >
      <div className="container max-w-4xl">
        <SectionHeading
          eyebrow="Simulateur CEE"
          title="Estimez le volume de kWh cumac de votre projet"
          description="Renseignez les paramètres de votre installation : le simulateur applique les barèmes officiels de l'opération AGRI-EQ-110."
        />

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-7 [&>*]:min-w-0">
            {/* Type de produits */}
            <div>
              <Label className="mb-2 block">Type de produits séchés</Label>
              <div className="flex flex-wrap gap-2">
                <Toggle
                  active={product === "agricole"}
                  onClick={() => setProduct("agricole")}
                >
                  Agricole
                </Toggle>
                <Toggle
                  active={product === "forestier"}
                  onClick={() => setProduct("forestier")}
                >
                  Forestier
                </Toggle>
              </div>
            </div>

            {/* Variante */}
            <div>
              <Label className="mb-2 block">Type de projet</Label>
              <div className="flex flex-wrap gap-2">
                {operation.variants.map((v, i) => (
                  <Toggle
                    key={v.key}
                    active={variantIndex === i}
                    onClick={() => setVariantIndex(i)}
                  >
                    {v.label}
                  </Toggle>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {variant.description} (plage {variant.temperatureRange})
              </p>
            </div>

            {/* Zone climatique */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label>Zone climatique</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Je ne connais pas ma zone
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Déterminer sa zone climatique</DialogTitle>
                      <DialogDescription>
                        Les zones climatiques H1, H2 et H3 sont définies par la
                        réglementation thermique française.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        <strong className="text-foreground">H1</strong> — moitié
                        nord et est, zones montagneuses (climat le plus froid).
                      </li>
                      <li>
                        <strong className="text-foreground">H2</strong> — façade
                        atlantique, centre et Sud-Ouest.
                      </li>
                      <li>
                        <strong className="text-foreground">H3</strong> —
                        pourtour méditerranéen (climat le plus doux).
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      En cas de doute, choisissez l&apos;estimation la plus
                      prudente : nos conseillers confirment votre zone lors de
                      l&apos;étude.
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((z) => (
                  <Toggle
                    key={z}
                    active={zone === z}
                    onClick={() => setZone(z)}
                  >
                    {z}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Puissance thermique */}
            <div>
              <div className="mb-2 flex items-end justify-between gap-3">
                <Label htmlFor="sim-power">
                  Puissance thermique installée envisagée
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="sim-power"
                    type="number"
                    inputMode="numeric"
                    min={MIN_KW}
                    max={MAX_KW}
                    value={powerKw}
                    onChange={(e) =>
                      setPowerKw(clampPower(e.currentTarget.valueAsNumber))
                    }
                    className="h-9 w-24 text-right"
                  />
                  <span className="text-sm text-muted-foreground">kW</span>
                </div>
              </div>
              <Slider
                value={[powerKw]}
                min={MIN_KW}
                max={MAX_KW}
                step={5}
                onValueChange={(v) => setPowerKw(v[0] ?? MIN_KW)}
                aria-label="Puissance thermique installée en kW"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{MIN_KW} kW</span>
                <span>{MAX_KW} kW</span>
              </div>
            </div>

            {/* Résultat */}
            <div className="rounded-xl bg-primary-50 p-5">
              <p className="text-sm text-primary-700">
                Avec ces paramètres, votre projet pourrait générer environ
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-primary-700">
                {formatNumberFr(cumac)}{" "}
                <span className="text-lg font-bold">kWh cumac</span>
              </p>
              <p className="mt-2 text-xs text-primary-700/80">
                Estimation indicative basée sur les barèmes officiels de
                l&apos;opération CEE AGRI-EQ-110. Non contractuel — le volume
                définitif dépend de l&apos;étude technique et de la validation de
                l&apos;éligibilité.
              </p>

              <Button
                type="button"
                variant="accent"
                size="lg"
                className="mt-4 h-auto w-full whitespace-normal py-3 text-center sm:w-auto"
                onClick={handleGetEstimate}
              >
                Recevoir mon estimation chiffrée en € et personnalisée
                <ArrowRight className="hidden sm:inline-block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

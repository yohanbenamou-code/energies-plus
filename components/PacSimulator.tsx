"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { usePacForm } from "@/components/pac-form-context";
import {
  calculatePacCumac,
  PAC_PERFORMANCE_LABELS,
  PAC_SECTOR_LABELS,
  type PacPerformanceClass,
  type PacSectorKey,
} from "@/lib/pac-calculator";
import { formatNumberFr, cn } from "@/lib/utils";
import { REGIONS, zoneForRegion } from "@/data/regions";

const MIN_SURFACE = 100;
const MAX_SURFACE = 3000;

const SECTOR_OPTIONS = Object.entries(PAC_SECTOR_LABELS) as [
  PacSectorKey,
  string,
][];

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

export function PacSimulator() {
  const { applyPrefill, scrollToContact } = usePacForm();

  const [sector, setSector] = React.useState<PacSectorKey>("bureaux");
  const [highPower, setHighPower] = React.useState(false);
  const [performanceClass, setPerformanceClass] =
    React.useState<PacPerformanceClass>("etas-126-175");
  const [region, setRegion] = React.useState("");
  const [surfaceM2, setSurfaceM2] = React.useState(500);
  const [coupDePouce, setCoupDePouce] = React.useState(true);

  const zone = zoneForRegion(region);
  const effectiveClass: PacPerformanceClass = highPower
    ? performanceClass === "etas-175-plus" || performanceClass === "cop-45-plus"
      ? "cop-45-plus"
      : "cop-34-45"
    : performanceClass === "cop-34-45" || performanceClass === "cop-45-plus"
      ? "etas-126-175"
      : performanceClass;

  const cumac = calculatePacCumac({
    zone,
    performanceClass: effectiveClass,
    sector,
    surfaceM2,
    coupDePouce,
  });

  const handleGetEstimate = () => {
    applyPrefill({
      sector,
      performanceClass: effectiveClass,
      zone,
      surfaceM2,
      coupDePouce,
      estimatedCumac: Math.round(cumac),
    });
    scrollToContact();
  };

  const performanceOptions: PacPerformanceClass[] = highPower
    ? ["cop-34-45", "cop-45-plus"]
    : ["etas-111-126", "etas-126-175", "etas-175-plus"];

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
            Quelques questions simples. Le calcul s&apos;appuie sur le barème
            officiel de la fiche BAT-TH-163.
          </p>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
          <div className="grid gap-8 [&>*]:min-w-0">
            {/* Secteur */}
            <div>
              <Label htmlFor="pac-sector" className="mb-2 block">
                Secteur d&apos;activité de votre bâtiment
              </Label>
              <select
                id="pac-sector"
                value={sector}
                onChange={(e) => setSector(e.currentTarget.value as PacSectorKey)}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {SECTOR_OPTIONS.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Puissance / performance */}
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <Label>Performance de la pompe à chaleur envisagée</Label>
                <button
                  type="button"
                  onClick={() => setHighPower((v) => !v)}
                  className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  {highPower ? "Puissance ≤ 400 kW" : "Puissance > 400 kW ?"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {performanceOptions.map((key) => (
                  <Choice
                    key={key}
                    active={effectiveClass === key}
                    onClick={() => setPerformanceClass(key)}
                  >
                    {PAC_PERFORMANCE_LABELS[key].label}
                  </Choice>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {PAC_PERFORMANCE_LABELS[effectiveClass].help}. Ne connaissez
                pas cette donnée ? Notre conseiller la vérifie sur la fiche
                technique de l&apos;équipement.
              </p>
            </div>

            {/* Région */}
            <div>
              <Label htmlFor="pac-region" className="mb-2 block">
                Votre région
              </Label>
              <select
                id="pac-region"
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
                La région influe sur le montant (climat plus ou moins froid).
                Votre conseiller l&apos;affine ensuite.
              </p>
            </div>

            {/* Surface */}
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <Label htmlFor="pac-surface">Surface chauffée par la PAC</Label>
                <span className="text-sm font-semibold text-primary-700">
                  {formatNumberFr(surfaceM2)} m²
                </span>
              </div>
              <Slider
                value={[surfaceM2]}
                min={MIN_SURFACE}
                max={MAX_SURFACE}
                step={50}
                onValueChange={(v) => setSurfaceM2(v[0] ?? MIN_SURFACE)}
                aria-label="Surface chauffée par la PAC"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Petit bâtiment</span>
                <span>Grand bâtiment</span>
              </div>
            </div>

            {/* Coup de pouce */}
            <div>
              <Label className="mb-2 block">
                Remplacez-vous une chaudière fioul, gaz ou charbon ?
              </Label>
              <div className="flex flex-wrap gap-2">
                <Choice active={coupDePouce} onClick={() => setCoupDePouce(true)}>
                  Oui
                </Choice>
                <Choice active={!coupDePouce} onClick={() => setCoupDePouce(false)}>
                  Non / je ne sais pas
                </Choice>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Si oui, le bonus « Coup de pouce Chauffage » peut tripler le
                volume d&apos;aide, sous conditions vérifiées par nos
                conseillers.
              </p>
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
                C&apos;est le volume officiel de l&apos;aide (fiche
                BAT-TH-163). Sa valeur en euros dépend du moment et de votre
                situation — indicative, non contractuelle, sous réserve
                d&apos;éligibilité.
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

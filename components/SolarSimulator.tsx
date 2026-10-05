"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { SectionHead } from "@/components/SectionHead";
import { useSolarForm } from "@/components/solar-form-context";
import { calculateSolarCumac, SOLAR_TH_168 } from "@/lib/solar-calculator";
import {
  isModestHousehold,
  MPR_CATEGORY_LABELS,
  type MprCategory,
} from "@/lib/mpr";
import { formatNumberFr, cn } from "@/lib/utils";
import { REGIONS, zoneForRegion } from "@/data/regions";

const PANEL_M2 = 2;
const MIN_PANELS = 4;
const MAX_PANELS = 15;
const CATEGORIES = Object.keys(MPR_CATEGORY_LABELS) as MprCategory[];

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
        "rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

export function SolarSimulator({ index = "06" }: { index?: string }) {
  const { applyPrefill, category, setCategory, scrollTo } = useSolarForm();

  const [region, setRegion] = React.useState("");
  const [panels, setPanels] = React.useState(10);
  const [fossilFree, setFossilFree] = React.useState(true);

  const zone = zoneForRegion(region);
  const surfaceM2 = panels * PANEL_M2;
  const household =
    fossilFree && category
      ? isModestHousehold(category)
        ? "modeste"
        : "autres"
      : null;

  const cumac = calculateSolarCumac({
    zone,
    usage: "ecs-chauffage",
    surfaceM2,
    household,
  });
  const baseCumac = calculateSolarCumac({
    zone,
    usage: "ecs-chauffage",
    surfaceM2,
    household: null,
  });

  const handleGetEstimate = () => {
    applyPrefill({
      zone,
      panels,
      surfaceM2,
      fossilFree,
      estimatedCumac: Math.round(cumac),
    });
    scrollTo("contact");
  };

  return (
    <section
      id="simulateur"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Estimation"
          title="En 30 secondes, une idée du volume d'aide CEE"
          description="Le calcul s'appuie sur le barème officiel de la fiche BAR-TH-168 (dispositif solaire thermique) et sur la bonification en vigueur."
        />

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="overflow-hidden rounded-md border border-foreground/20 bg-card p-6 sm:p-8 lg:col-span-8 lg:col-start-4">
            <div className="grid gap-8 [&>*]:min-w-0">
              {/* Région */}
              <div>
                <Label htmlFor="sol-region" className="mb-2 block">
                  Votre région
                </Label>
                <select
                  id="sol-region"
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
                  Le climat influe sur le volume d&apos;aide : plus c&apos;est
                  froid, plus le solaire est valorisé pour le chauffage.
                </p>
              </div>

              {/* Panneaux */}
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <Label htmlFor="sol-panels">Capteurs solaires sur votre toit</Label>
                  <span className="text-sm font-semibold text-foreground">
                    {panels} panneaux, {surfaceM2} m²
                  </span>
                </div>
                <Slider
                  value={[panels]}
                  min={MIN_PANELS}
                  max={MAX_PANELS}
                  step={1}
                  onValueChange={(v) => setPanels(v[0] ?? MIN_PANELS)}
                  aria-label="Nombre de panneaux solaires"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Minimum {SOLAR_TH_168.minSurfaceM2["ecs-chauffage"]} m²</span>
                  <span>Grande toiture</span>
                </div>
              </div>

              {/* Catégorie */}
              <div>
                <Label className="mb-2 block">
                  Votre catégorie de revenus MaPrimeRénov&apos;
                </Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((key) => (
                    <Choice
                      key={key}
                      active={category === key}
                      onClick={() => setCategory(key)}
                    >
                      {MPR_CATEGORY_LABELS[key].label}
                    </Choice>
                  ))}
                  <Choice active={category === null} onClick={() => setCategory(null)}>
                    Je ne sais pas
                  </Choice>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Pas sûr ? Utilisez le{" "}
                  <a
                    href="#profil"
                    className="font-semibold text-foreground underline underline-offset-2"
                  >
                    vérificateur de catégorie
                  </a>{" "}
                  juste au-dessus.
                </p>
              </div>

              {/* Fossile */}
              <div>
                <Label className="mb-2 block">
                  Votre chaudière gaz, fioul ou charbon est-elle déposée après les
                  travaux ?
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Choice active={fossilFree} onClick={() => setFossilFree(true)}>
                    Oui, aucun équipement fossile conservé
                  </Choice>
                  <Choice active={!fossilFree} onClick={() => setFossilFree(false)}>
                    Non
                  </Choice>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  La bonification exige qu&apos;aucun équipement utilisant des
                  énergies fossiles ne soit installé ou conservé pour le chauffage
                  et l&apos;eau chaude.
                </p>
              </div>

              {/* Résultat */}
              <div className="rounded-sm bg-primary-900 p-6 text-white">
                <p className="text-sm text-white/70">
                  {region
                    ? "Votre projet pourrait générer un volume d'environ"
                    : "Sélectionnez votre région pour affiner. Estimation actuelle :"}
                </p>
                <p className="display mt-2 text-5xl text-accent">
                  {formatNumberFr(cumac)}{" "}
                  <span className="text-lg font-medium text-white">kWh cumac</span>
                </p>
                {household ? (
                  <p className="mt-2 text-sm text-white/80">
                    Dont bonification x{SOLAR_TH_168.bonification[household]}{" "}
                    ({SOLAR_TH_168.bonificationEndsLabel}). Volume de base :{" "}
                    {formatNumberFr(baseCumac)} kWh cumac.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-white/80">
                    {fossilFree
                      ? "Volume de base, sans bonification. Indiquez votre catégorie de revenus : la bonification est de x5 pour les ménages modestes et de x4 pour les autres."
                      : "Volume de base, sans bonification (équipement fossile conservé)."}
                  </p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-white/55">
                  C&apos;est le volume officiel de l&apos;aide CEE pour le
                  dispositif solaire (fiche BAR-TH-168). Sa valeur en euros dépend
                  du moment et de votre situation : indicative, non contractuelle,
                  sous réserve d&apos;éligibilité. MaPrimeRénov&apos; est étudiée
                  séparément.
                </p>

                <Button
                  type="button"
                  variant="accent"
                  size="lg"
                  className="mt-5 h-auto w-full whitespace-normal py-3 text-center sm:w-auto"
                  onClick={handleGetEstimate}
                >
                  Recevoir mon estimation chiffrée en euros
                  <ArrowRight className="hidden sm:inline-block" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

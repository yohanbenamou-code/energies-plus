"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHead } from "@/components/SectionHead";
import { useSolarForm } from "@/components/solar-form-context";
import {
  isModestHousehold,
  MPR_CATEGORY_LABELS,
  MPR_CEILINGS_2026,
  mprCategory,
  mprCeilings,
  type MprArea,
} from "@/lib/mpr";
import { formatNumberFr } from "@/lib/utils";

const eur = (n: number) => `${formatNumberFr(n)} €`;

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function CeilingTable({ area, title }: { area: MprArea; title: string }) {
  const c = MPR_CEILINGS_2026[area];
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
      <table className="w-full min-w-[30rem] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-foreground text-left">
            <th className="py-2 pr-3 font-semibold">Personnes</th>
            <th className="px-3 py-2 text-right font-semibold">Très modestes</th>
            <th className="px-3 py-2 text-right font-semibold">Modestes</th>
            <th className="py-2 pl-3 text-right font-semibold">Intermédiaires</th>
          </tr>
        </thead>
        <tbody>
          {c.byPersons.map((row, i) => (
            <tr key={i} className="border-b border-border">
              <td className="py-2 pr-3 font-semibold text-foreground">{i + 1}</td>
              {row.map((v, j) => (
                <td
                  key={j}
                  className={`py-2 text-right tabular-nums ${j === 2 ? "pl-3" : "px-3"}`}
                >
                  {eur(v)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b border-border">
            <td className="py-2 pr-3 font-semibold text-foreground">+1 pers.</td>
            {c.perExtra.map((v, j) => (
              <td
                key={j}
                className={`py-2 text-right tabular-nums ${j === 2 ? "pl-3" : "px-3"}`}
              >
                + {eur(v)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function MprProfileChecker({ index = "05" }: { index?: string }) {
  const { category, setCategory, scrollTo } = useSolarForm();

  const [area, setArea] = React.useState<MprArea>("hors-idf");
  const [persons, setPersons] = React.useState(2);
  const [income, setIncome] = React.useState("");

  const incomeNumber = Number(income.replace(/\s/g, "").replace(",", "."));
  const hasIncome = income.trim() !== "" && Number.isFinite(incomeNumber) && incomeNumber >= 0;
  const result = hasIncome ? mprCategory(area, persons, incomeNumber) : null;
  const ceilings = mprCeilings(area, persons);

  const useInSimulation = () => {
    if (!result) return;
    setCategory(result);
    scrollTo("simulateur");
  };

  return (
    <section
      id="profil"
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Votre profil"
          title="Quelle est votre catégorie MaPrimeRénov' ?"
          description="Votre revenu fiscal de référence détermine le type de financement mobilisable. Renseignez-le pour connaître votre catégorie. Votre conseiller la confirme ensuite sur votre avis d'imposition."
        />

        <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="overflow-hidden rounded-md border border-foreground/20 bg-card p-6 sm:p-8 lg:col-span-8 lg:col-start-4">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="mpr-area">Localisation</Label>
                <select
                  id="mpr-area"
                  value={area}
                  onChange={(e) => setArea(e.currentTarget.value as MprArea)}
                  className={`${selectClass} mt-1.5`}
                >
                  <option value="hors-idf">Hors Île-de-France</option>
                  <option value="idf">Île-de-France</option>
                </select>
              </div>
              <div>
                <Label htmlFor="mpr-persons">Personnes du foyer</Label>
                <select
                  id="mpr-persons"
                  value={persons}
                  onChange={(e) => setPersons(Number(e.currentTarget.value))}
                  className={`${selectClass} mt-1.5`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="mpr-income">Revenu fiscal de référence</Label>
                <Input
                  id="mpr-income"
                  inputMode="numeric"
                  placeholder="ex. 28 000"
                  value={income}
                  onChange={(e) => setIncome(e.currentTarget.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Plafonds pour {persons} personne{persons > 1 ? "s" : ""} :
              très modestes {eur(ceilings[0])}, modestes {eur(ceilings[1])},
              intermédiaires {eur(ceilings[2])}.
            </p>

            <div className="mt-6 rounded-sm bg-primary-900 p-6 text-white">
              {result ? (
                <>
                  <p className="text-sm text-white/70">Votre catégorie</p>
                  <p className="display mt-1 text-4xl text-accent">
                    {MPR_CATEGORY_LABELS[result].label}
                    <span className="ml-3 text-lg font-medium text-white">
                      {MPR_CATEGORY_LABELS[result].color}
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {isModestHousehold(result)
                      ? "Votre foyer relève des ménages modestes : la bonification CEE en vigueur est la plus élevée (x5) et votre dossier peut mobiliser un financement renforcé."
                      : "Votre foyer ne relève pas des ménages modestes : la bonification CEE en vigueur est de x4, et le financement mobilisable est adapté à votre catégorie."}{" "}
                    Le détail est précisé par votre conseiller.
                  </p>
                  <Button
                    type="button"
                    variant="accent"
                    className="mt-5"
                    onClick={useInSimulation}
                  >
                    Utiliser ce profil dans l&apos;estimation
                  </Button>
                  {category === result ? (
                    <p className="mt-3 text-xs text-white/60">
                      Profil appliqué à l&apos;estimation ci-dessous.
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-sm leading-relaxed text-white/75">
                  Saisissez votre revenu fiscal de référence (ligne « revenu
                  fiscal de référence » de votre avis d&apos;imposition) pour
                  afficher votre catégorie.
                </p>
              )}
            </div>

            <Accordion type="single" collapsible className="mt-6 border-t border-foreground/20">
              <AccordionItem value="tables" className="border-foreground/20">
                <AccordionTrigger className="text-sm">
                  Voir tous les plafonds de ressources 2026
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Revenu fiscal de référence au 1er janvier 2026, selon le
                    nombre de personnes composant le ménage.
                  </p>
                  <div className="space-y-6">
                    <CeilingTable area="idf" title="Île-de-France" />
                    <CeilingTable
                      area="hors-idf"
                      title="Hors Île-de-France et outre-mer"
                    />
                  </div>
                  <p className="mt-4">
                    Au-delà de ces plafonds, le foyer relève de la catégorie
                    « supérieurs ».
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

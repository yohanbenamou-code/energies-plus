"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { operations } from "@/data/operations";
import { SECTORS } from "@/data/sectors";
import { cn } from "@/lib/utils";
import type { CeeOperation, CeeSectorKey } from "@/types/operation";

type Filter = "ALL" | CeeSectorKey;

const FICHE_CODE = /^[A-Z]{3,4}-[A-Z]{2}-\d+/;

function OperationCard({ operation }: { operation: CeeOperation }) {
  const isLive = operation.status === "live";
  const isFiche = FICHE_CODE.test(operation.code);

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-gradient">
        {operation.image ? (
          <Image
            src={operation.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-500",
              isLive && "group-hover:scale-105",
            )}
          />
        ) : null}
        <div
          className={cn(
            "absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-primary-700 shadow-sm",
            isFiche ? "font-mono" : "uppercase tracking-wide",
          )}
        >
          {isFiche ? operation.code : "Opération CEE"}
        </div>
        {!isLive ? (
          <div className="absolute inset-0 bg-primary-900/45" />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {operation.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {operation.pitch}
        </p>
        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
            isLive ? "text-accent-600" : "text-muted-foreground",
          )}
        >
          {isLive ? (
            <>
              Voir la solution
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          ) : (
            "Accompagnement à activer — nous consulter"
          )}
        </span>
      </div>
    </>
  );

  if (!isLive) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/60">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/solutions/${operation.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {inner}
    </Link>
  );
}

export function OperationsCatalog() {
  const [filter, setFilter] = React.useState<Filter>("ALL");

  const list = React.useMemo(
    () =>
      filter === "ALL"
        ? operations
        : operations.filter((o) => o.sectorKey === filter),
    [filter],
  );

  const tabs: { key: Filter; label: string }[] = [
    { key: "ALL", label: "Toutes" },
    ...SECTORS.map((s) => ({ key: s.key as Filter, label: s.short })),
  ];

  return (
    <section
      id="catalogue"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
            Catalogue des fiches
          </p>
          <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
            Les opérations CEE les plus <em>demandées</em>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Chaque fiche est une opération standardisée publiée par le Ministère
            de la Transition Écologique. Celles marquées d&apos;une flèche
            disposent déjà d&apos;un accompagnement complet chez Énergies Plus.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              aria-pressed={filter === tab.key}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((operation) => (
            <OperationCard key={operation.slug} operation={operation} />
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {/* TODO: Yohan/Énergies Plus — confirmer la liste des fiches accompagnées */}
          Catalogue non exhaustif et donné à titre indicatif. Le dispositif CEE
          évolue régulièrement : certaines fiches sont modifiées ou abrogées.
          Avant tout engagement, faites vérifier l&apos;éligibilité de votre
          projet par nos conseillers.
        </p>
      </div>
    </section>
  );
}

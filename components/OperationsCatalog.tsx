"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
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
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-900">
        {operation.image ? (
          <Image
            src={operation.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-500",
              isLive && "group-hover:scale-[1.03]",
            )}
          />
        ) : null}
        {!isLive ? <div className="absolute inset-0 bg-primary-900/50" /> : null}
        <span
          className={cn(
            "absolute left-0 top-0 bg-background px-3 py-1.5 text-xs font-semibold text-foreground",
            isFiche ? "font-mono" : "",
          )}
        >
          {isFiche ? operation.code : "Opération CEE"}
        </span>
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
            "mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold",
            isLive ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {isLive ? (
            <>
              Voir la solution
              <ArrowUpRight className="h-4 w-4 text-accent-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          ) : (
            "Accompagnement à activer, nous consulter"
          )}
        </span>
      </div>
    </>
  );

  if (!isLive) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-md border border-dashed border-foreground/25 bg-card/50">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/solutions/${operation.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-foreground/20 bg-card transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
      className="border-b border-border bg-secondary/50 py-20 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index="02"
          label="Catalogue des fiches"
          title="Les opérations CEE les plus demandées"
          description="Chaque fiche est une opération standardisée publiée par le Ministère de la Transition Écologique. Celles qui portent une flèche disposent déjà d'un accompagnement complet chez Énergies Plus."
        />

        <div
          role="tablist"
          aria-label="Filtrer par secteur"
          className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-b border-foreground/15"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              onClick={() => setFilter(tab.key)}
              aria-selected={filter === tab.key}
              className={cn(
                "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors",
                filter === tab.key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((operation) => (
            <OperationCard key={operation.slug} operation={operation} />
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {/* TODO: Yohan/Énergies Plus : confirmer la liste des fiches accompagnées */}
          Catalogue non exhaustif et donné à titre indicatif. Le dispositif CEE
          évolue régulièrement : certaines fiches sont modifiées ou abrogées.
          Avant tout engagement, faites vérifier l&apos;éligibilité de votre
          projet par nos conseillers.
        </p>
      </div>
    </section>
  );
}

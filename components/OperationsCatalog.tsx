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

/** Mobile : liste compacte (les fiches « live » d'abord, les autres repliées). */
function MobileOperations({ list }: { list: CeeOperation[] }) {
  const [open, setOpen] = React.useState(false);
  const live = list.filter((o) => o.status === "live");
  const others = list.filter((o) => o.status !== "live");

  return (
    <div className="mt-6 sm:hidden">
      {live.length > 0 ? (
        <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
          {live.map((operation) => (
            <li key={operation.slug}>
              <Link
                href={`/solutions/${operation.slug}`}
                className="flex gap-3.5 py-3.5 active:bg-card"
              >
                <span className="relative h-[5.25rem] w-24 shrink-0 overflow-hidden rounded-sm bg-primary-900">
                  {operation.image ? (
                    <Image
                      src={operation.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : null}
                </span>
                <span className="flex min-w-0 flex-1 flex-col justify-center">
                  <span className="font-mono text-[11px] font-semibold text-accent-600">
                    {operation.code}
                  </span>
                  <span className="mt-0.5 line-clamp-3 text-[15px] font-semibold leading-snug text-foreground">
                    {operation.shortTitle ?? operation.title}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    Voir la solution
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent-600" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {others.length > 0 ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-4 flex w-full items-center justify-between border-b border-foreground/15 pb-3 text-sm font-semibold text-foreground"
          >
            {open ? "Masquer les autres fiches" : `Voir les ${others.length} autres fiches`}
            <span aria-hidden className="text-lg leading-none text-accent-600">
              {open ? "−" : "+"}
            </span>
          </button>
          {open ? (
            <ul className="divide-y divide-foreground/10">
              {others.map((operation) => (
                <li key={operation.slug} className="py-3">
                  <p className="font-mono text-[11px] font-semibold text-muted-foreground">
                    {FICHE_CODE.test(operation.code) ? operation.code : "Opération CEE"}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-snug text-foreground">
                    {operation.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Accompagnement à activer, nous consulter
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </div>
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
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index="02"
          label="Catalogue des fiches"
          title="Les opérations CEE les plus demandées"
          description="Chaque fiche est une opération standardisée publiée par le Ministère de la Transition Écologique. Celles qui portent une flèche disposent déjà d'un accompagnement complet chez Energie+."
        />

        <div
          role="tablist"
          aria-label="Filtrer par secteur"
          className="-mx-5 mt-6 flex gap-x-6 overflow-x-auto whitespace-nowrap border-b border-foreground/15 px-5 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:flex-wrap sm:gap-x-7 sm:gap-y-2 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
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

        <MobileOperations list={list} />

        <div className="mt-8 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {list.map((operation) => (
            <OperationCard key={operation.slug} operation={operation} />
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground sm:mt-8">
          {/* TODO: Yohan/Energie+ : confirmer la liste des fiches accompagnées */}
          Catalogue non exhaustif et donné à titre indicatif. Le dispositif CEE
          évolue régulièrement : certaines fiches sont modifiées ou abrogées.
          Avant tout engagement, faites vérifier l&apos;éligibilité de votre
          projet par nos conseillers.
        </p>
      </div>
    </section>
  );
}

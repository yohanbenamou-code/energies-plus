import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CeeOperation } from "@/types/operation";

export function FicheOperationCard({ operation }: { operation: CeeOperation }) {
  const isLive = operation.status === "live";

  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "rounded-md px-2 py-1 font-mono text-[11px] font-semibold",
            isLive
              ? "bg-primary-50 text-primary-700"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isLive ? operation.code : "À venir"}
        </span>
        {isLive ? (
          <span className="text-xs font-medium text-muted-foreground">
            Durée de vie {operation.lifespanYears} ans
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">
        {operation.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {operation.shortDescription}
      </p>

      <p className="mt-4 text-xs text-muted-foreground">{operation.sector}</p>

      {isLive ? (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
          Voir la solution
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      ) : (
        <span className="mt-5 inline-block text-sm font-medium text-muted-foreground">
          Contenu en préparation
        </span>
      )}
    </>
  );

  if (!isLive) {
    return (
      <div className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-muted/30 p-6 opacity-80">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/solutions/${operation.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
      {body}
    </Link>
  );
}

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CeeOperation } from "@/types/operation";

interface FicheOperationCardProps {
  operation: CeeOperation;
}

export function FicheOperationCard({ operation }: FicheOperationCardProps) {
  const isLive = operation.status === "live";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-lg",
            isLive ? "bg-accent/15 text-accent-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Sun className="h-6 w-6" />
        </span>
        {isLive ? (
          <Badge variant="outline" className="font-mono">
            n° {operation.code}
          </Badge>
        ) : (
          <Badge variant="muted">Bientôt disponible</Badge>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {operation.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {operation.shortDescription}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
        <div>
          <dt className="inline font-medium text-foreground">Secteur : </dt>
          <dd className="inline">{operation.sector}</dd>
        </div>
        {isLive ? (
          <div>
            <dt className="inline font-medium text-foreground">Durée de vie : </dt>
            <dd className="inline">{operation.lifespanYears} ans</dd>
          </div>
        ) : null}
      </dl>

      {isLive ? (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
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
      <div className="flex h-full flex-col rounded-xl border border-dashed border-border bg-muted/30 p-6 opacity-80">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/solutions/${operation.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {inner}
    </Link>
  );
}

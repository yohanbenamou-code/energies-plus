import * as React from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";

/**
 * Chiffres clés. Valeurs volontairement nulles (voir data/site.ts) : aucune
 * statistique inventée. Dès que `site.stats[].value` est renseigné, les
 * compteurs s'animent. TODO: placeholder à remplacer par Yohan/Énergies Plus.
 */
export function KeyStats() {
  const allPlaceholder = site.stats.every((s) => s.value === null);

  return (
    <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />

      <div className="container relative">
        <Stagger className="grid gap-10 sm:grid-cols-3">
          {site.stats.map((stat) => (
            <StaggerItem key={stat.key}>
              <div className="border-l border-white/15 pl-5">
                <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {allPlaceholder ? (
          <p className="mt-10 text-xs text-white/55">
            Chiffres à compléter par Énergies Plus avant mise en ligne.
          </p>
        ) : null}
      </div>
    </section>
  );
}

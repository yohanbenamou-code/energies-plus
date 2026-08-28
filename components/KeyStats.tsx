import * as React from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * Chiffres clés. Les valeurs sont volontairement nulles (voir data/site.ts) :
 * aucune statistique n'est inventée. Dès que Solaire Energie renseigne
 * `site.stats[].value`, les compteurs s'animent automatiquement.
 * TODO: placeholder à remplacer par Yohan/Solaire Energie.
 */
export function KeyStats() {
  const allPlaceholder = site.stats.every((s) => s.value === null);

  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-3">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        {allPlaceholder ? (
          <p className="mt-8 text-center text-xs text-primary-foreground/70">
            Chiffres à compléter par Solaire Energie avant mise en ligne.
          </p>
        ) : null}
      </div>
    </section>
  );
}

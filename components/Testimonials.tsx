import * as React from "react";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";

/**
 * Témoignages. Tant qu'`site.testimonials` est vide, la section n'est pas
 * rendue : aucun faux témoignage, aucun encart « à remplir » visible en
 * production. Dès qu'Énergies Plus ajoute des verbatims réels (recueillis et
 * autorisés) dans `data/site.ts`, la section apparaît automatiquement.
 */
export function Testimonials() {
  const hasTestimonials = site.testimonials.length > 0;

  if (!hasTestimonials) return null;

  return (
    <section id="avis" className="border-b border-border bg-secondary/40 py-20 sm:py-24">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Avis clients
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ce que disent les exploitants accompagnés
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {(hasTestimonials
            ? site.testimonials.map((t, i) => ({ key: t.author + i, t }))
            : Array.from({ length: 3 }).map((_, i) => ({ key: `ph-${i}`, t: null }))
          ).map(({ key, t }, i) =>
            t ? (
              <StaggerItem key={key} as="article">
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <Quote className="h-7 w-7 text-accent" />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                    « {t.quote} »
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-foreground">
                      {t.author}
                    </span>
                    <span className="block text-muted-foreground">
                      {t.role} — {t.location}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ) : (
              <StaggerItem key={key} as="article">
                <div className="flex h-full min-h-[200px] flex-col rounded-2xl border border-dashed border-border bg-muted/20 p-6">
                  <Quote className="h-7 w-7 text-muted-foreground" />
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    Emplacement témoignage client #{i + 1} — à remplacer par un
                    verbatim réel, recueilli et autorisé (nom, structure,
                    localisation).
                  </p>
                  <p className="mt-4 text-xs font-medium text-muted-foreground">
                    TODO : témoignage à fournir par Énergies Plus
                  </p>
                </div>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </div>
    </section>
  );
}

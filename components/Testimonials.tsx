import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/data/site";

/**
 * Témoignages. Tant qu'`site.testimonials` est vide, la section n'est pas
 * rendue : aucun faux témoignage, aucun encart « à remplir » visible en
 * production. Dès qu'Énergies Plus ajoute des verbatims réels (recueillis et
 * autorisés) dans `data/site.ts`, la section apparaît automatiquement.
 */
export function Testimonials({ index = "" }: { index?: string }) {
  if (site.testimonials.length === 0) return null;

  return (
    <section id="avis" className="border-b border-border bg-secondary/50 py-20 sm:py-28">
      <div className="container">
        <SectionHead
          index={index || "+"}
          label="Avis clients"
          title="Ce que disent les clients accompagnés"
        />

        <div className="mt-12 grid gap-8 border-t border-foreground/20 pt-8 md:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 0.06}>
              <figure>
                <blockquote className="display text-xl leading-snug text-foreground">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-foreground">{t.author}</span>
                  <span className="block text-muted-foreground">
                    {t.role}, {t.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

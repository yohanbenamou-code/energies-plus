import * as React from "react";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

/**
 * Témoignages clients.
 *
 * IMPORTANT : `site.testimonials` est volontairement vide. Aucun faux
 * témoignage n'est publié. Tant que Solaire Energie n'a pas fourni de
 * verbatims réels (recueillis et autorisés), la section affiche des
 * emplacements neutres.
 * TODO: placeholder à remplacer par Yohan/Solaire Energie.
 */
export function Testimonials() {
  const hasTestimonials = site.testimonials.length > 0;

  return (
    <section id="avis" className="border-b border-border bg-background py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ce que disent les exploitants accompagnés"
        />

        {hasTestimonials ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {site.testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.author} delay={i * 0.07} as="article">
                <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <Quote className="h-7 w-7 text-accent" />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                    « {testimonial.quote} »
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-foreground">
                      {testimonial.author}
                    </span>
                    <span className="block text-muted-foreground">
                      {testimonial.role} — {testimonial.location}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex h-full min-h-[200px] flex-col rounded-xl border border-dashed border-border bg-muted/20 p-6"
              >
                <Quote className="h-7 w-7 text-muted-foreground" />
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  Emplacement témoignage client #{i + 1} — à remplacer par un
                  verbatim réel, recueilli et autorisé par le client (nom,
                  structure, localisation).
                </p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  TODO : témoignage à fournir par Solaire Energie
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

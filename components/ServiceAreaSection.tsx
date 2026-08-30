import * as React from "react";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function ServiceAreaSection() {
  return (
    <section
      id="zone"
      className="border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Zone d&apos;intervention
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Partout en France métropolitaine
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nous intervenons sur tout le territoire métropolitain. Où que se
            trouve votre exploitation, nos conseillers évaluent votre projet et
            le montant d&apos;aide auquel il peut prétendre.
          </p>
        </Reveal>

        <Reveal variant="left">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  Étude à distance, puis visite si besoin
                </p>
                <p className="text-sm text-muted-foreground">
                  Un premier échange suffit pour savoir si votre projet est
                  éligible.
                </p>
              </div>
            </div>
            <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
              Le montant de l&apos;aide varie légèrement selon la région (climat
              plus ou moins froid). Nous en tenons compte dans votre estimation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

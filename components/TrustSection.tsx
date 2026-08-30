import * as React from "react";
import { Check, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";

interface TrustSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  points?: string[];
  showCertifications?: boolean;
  className?: string;
}

export function TrustSection({
  id = "references",
  eyebrow = "Références",
  title,
  description,
  points,
  showCertifications = true,
  className,
}: TrustSectionProps) {
  return (
    <section
      id={id}
      className={className ?? "border-b border-border bg-background py-20 sm:py-24"}
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>

        {points && points.length > 0 ? (
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <StaggerItem key={point} as="div">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-foreground">
                    {point}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}

        {showCertifications ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {site.certifications.map((cert) => (
              <span
                key={cert}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-accent-600" />
                {cert}
              </span>
            ))}
          </div>
        ) : null}

        {/* Logos clients / partenaires + note d'avis — emplacements neutres */}
        <div className="mt-10 grid gap-6 rounded-2xl border border-dashed border-border bg-muted/20 p-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Clients &amp; partenaires
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 items-center justify-center rounded-lg border border-border bg-background text-[10px] text-muted-foreground"
                >
                  Logo
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {/* TODO: placeholder à remplacer par Yohan/Énergies Plus */}
              Logos et autorisations d&apos;utilisation à fournir par Énergies
              Plus.
            </p>
          </div>
          <div className="flex flex-col justify-center border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {/* TODO: placeholder à remplacer par Yohan/Énergies Plus */}
              Note et nombre d&apos;avis à renseigner depuis une source vérifiable
              (Google, Trustpilot, Pages Jaunes…). Attestation d&apos;assurance
              décennale des installateurs partenaires à ajouter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

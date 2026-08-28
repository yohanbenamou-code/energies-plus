import * as React from "react";
import { BadgeCheck, Handshake, ShieldCheck, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

interface TrustSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Points de réassurance (utilisé sur la page solution). */
  points?: string[];
  /** Afficher le bloc certifications techniques. */
  showCertifications?: boolean;
  className?: string;
}

export function TrustSection({
  id = "references",
  eyebrow = "Ils nous font confiance",
  title,
  description,
  points,
  showCertifications = true,
  className,
}: TrustSectionProps) {
  const hasLogos = site.clientLogos.length > 0;

  return (
    <section
      id={id}
      className={
        className ?? "border-b border-border bg-secondary/40 py-16 sm:py-20"
      }
    >
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        {points && points.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal key={point} delay={i * 0.05} as="li">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-[15px] leading-relaxed text-foreground">
                    {point}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : null}

        {/* Logos clients / partenaires */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Clients &amp; partenaires
          </p>
          {hasLogos ? (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {site.clientLogos.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-full object-contain opacity-70 grayscale"
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-14 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-[11px] text-muted-foreground"
                >
                  Logo client
                </div>
              ))}
              <p className="col-span-full mt-1 text-xs text-muted-foreground">
                {/* TODO: placeholder à remplacer par Yohan/Solaire Energie */}
                Logos et autorisations d&apos;utilisation à fournir par Solaire
                Energie.
              </p>
            </div>
          )}
        </div>

        {/* Note d'avis */}
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          {site.rating ? (
            <p className="text-sm text-foreground">
              <strong>{site.rating.score.toFixed(1)}/5</strong> — {site.rating.count}{" "}
              avis ({site.rating.source})
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {/* TODO: placeholder à remplacer par Yohan/Solaire Energie */}
              Note et nombre d&apos;avis à renseigner à partir d&apos;une source
              vérifiable (Google, Trustpilot, Pages Jaunes…).
            </p>
          )}
        </div>

        {showCertifications ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {site.certifications.map((cert, i) => (
              <Reveal key={cert} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  {i === 0 ? (
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  ) : i === 1 ? (
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  )}
                  <span className="text-sm leading-relaxed text-foreground">
                    {cert}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted-foreground">
          {/* TODO: placeholder à remplacer par Yohan/Solaire Energie */}
          Attestation d&apos;assurance (responsabilité civile / décennale des
          installateurs partenaires) et logos partenaires à ajouter ici.
        </p>
      </div>
    </section>
  );
}

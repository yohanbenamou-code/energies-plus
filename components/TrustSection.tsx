import * as React from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import {
  CHANTIER_HIGHLIGHTS,
  CREDENTIALS,
  NAMED_CLIENTS,
  TRACK_RECORD,
} from "@/data/references";

interface TrustSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Points de réassurance additionnels (page solution). */
  points?: string[];
  showCredentials?: boolean;
  className?: string;
}

const currentYear = new Date().getFullYear();

export function TrustSection({
  id = "references",
  eyebrow = "Références",
  title,
  description,
  points,
  showCredentials = true,
  className,
}: TrustSectionProps) {
  return (
    <section
      id={id}
      className={className ?? "border-b border-border bg-background py-20 sm:py-28"}
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
            {eyebrow}
          </p>
          <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>

        {/* Repères chiffrés issus du dossier de l'équipe */}
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem as="div">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="display text-4xl text-primary-700">
                {currentYear - TRACK_RECORD.sinceYear} ans
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                d&apos;expérience du dispositif CEE (depuis {TRACK_RECORD.sinceYear})
              </p>
            </div>
          </StaggerItem>
          <StaggerItem as="div">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="display text-4xl text-primary-700">
                +{TRACK_RECORD.buildings.toLocaleString("fr-FR")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                bâtiments accompagnés
              </p>
            </div>
          </StaggerItem>
          {CHANTIER_HIGHLIGHTS.slice(0, 2).map((h) => (
            <StaggerItem key={h.label} as="div">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="display text-4xl text-primary-700">{h.metric}</p>
                <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {points && points.length > 0 ? (
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
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

        {showCredentials ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {CREDENTIALS.map((cert) => (
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

        {/* Clients cités dans le dossier de références de l'équipe */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ils ont fait appel à l&apos;équipe
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {NAMED_CLIENTS.map((client) => (
              <li
                key={client.name}
                title={client.name}
                className="flex h-16 items-center justify-center bg-background px-3"
              >
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-8 w-auto max-w-full opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {client.short}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {/* TODO: Yohan/Énergies Plus — déposer les logos autorisés dans
                public/logos/ et renseigner NAMED_CLIENTS[].logo. */}
            Sélection de références issues du dossier chantier de l&apos;équipe.
            Logos affichés dès réception des visuels et des autorisations. Liste
            complète sur demande.
          </p>
        </div>
      </div>
    </section>
  );
}

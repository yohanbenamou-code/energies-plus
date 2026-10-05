import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Stagger, StaggerItem } from "@/components/motion";
import {
  CHANTIER_HIGHLIGHTS,
  CREDENTIALS,
  NAMED_CLIENTS,
  TRACK_RECORD,
} from "@/data/references";

interface TrustSectionProps {
  id?: string;
  index?: string;
  /** Rubrique affichée à gauche du titre. */
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
  index = "06",
  eyebrow = "Références",
  title,
  description,
  points,
  showCredentials = true,
  className,
}: TrustSectionProps) {
  const stats = [
    {
      value: `${currentYear - TRACK_RECORD.sinceYear} ans`,
      label: `d'expérience du dispositif CEE (depuis ${TRACK_RECORD.sinceYear})`,
    },
    {
      value: `+${TRACK_RECORD.buildings.toLocaleString("fr-FR")}`,
      label: "bâtiments accompagnés",
    },
    ...CHANTIER_HIGHLIGHTS.slice(0, 2).map((h) => ({
      value: h.metric,
      label: h.label,
    })),
  ];

  return (
    <section
      id={id}
      className={className ?? "border-b border-border bg-background py-12 sm:py-28"}
    >
      <div className="container">
        <SectionHead
          index={index}
          label={eyebrow}
          title={title}
          description={description}
        />

        {/* Repères chiffrés issus du dossier de l'équipe */}
        <Stagger className="mt-8 sm:mt-14 grid grid-cols-2 border-y border-foreground/20 lg:grid-cols-4 lg:divide-x lg:divide-foreground/20">
          {stats.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              as="div"
              className={
                "py-4 sm:py-7 lg:px-7 lg:first:pl-0 lg:last:pr-0" +
                (i % 2 === 0 ? " pr-4" : " pl-4 lg:pl-7") +
                (i >= 2 ? " border-t border-foreground/20 lg:border-t-0" : "")
              }
            >
              <p className="display text-3xl text-foreground sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {points && points.length > 0 ? (
          <Stagger className="mt-8 sm:mt-12 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {points.map((point) => (
              <StaggerItem key={point} as="div">
                <p className="relative pl-6 text-[15px] leading-relaxed text-foreground before:absolute before:left-0 before:top-[-0.06em] before:text-[1.2em] before:font-bold before:leading-none before:text-accent-600 before:content-['+']">
                  {point}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}

        {showCredentials ? (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground sm:mt-10 sm:gap-x-8 sm:gap-y-3">
            {CREDENTIALS.map((cert) => (
              <li
                key={cert}
                className="relative pl-5 before:absolute before:left-0 before:font-bold before:text-accent-600 before:content-['+']"
              >
                {cert}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Clients cités dans le dossier de références de l'équipe */}
        <Reveal className="mt-8 sm:mt-14">
          <p className="text-sm font-semibold text-foreground">
            Ils ont fait appel à l&apos;équipe
          </p>
          <ul className="mt-3 grid grid-cols-4 gap-px overflow-hidden rounded-sm border border-foreground/15 bg-foreground/15 sm:mt-4 lg:grid-cols-4">
            {NAMED_CLIENTS.map((client) => (
              <li
                key={client.name}
                title={client.name}
                className="flex h-11 items-center justify-center bg-card px-1.5 sm:h-16 sm:px-3"
              >
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-8 w-auto max-w-full opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center text-[10px] font-semibold leading-tight tracking-wide text-muted-foreground sm:text-[13px]">
                    {client.short}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 hidden text-xs leading-relaxed text-muted-foreground sm:block">
            {/* TODO: Yohan/Energie+ : déposer les logos autorisés dans
                public/logos/ et renseigner NAMED_CLIENTS[].logo. */}
            Sélection de références issues du dossier chantier de l&apos;équipe.
            Logos affichés dès réception des visuels et des autorisations. Liste
            complète sur demande.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

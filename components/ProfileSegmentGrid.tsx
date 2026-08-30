import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Factory,
  Sprout,
  TreePine,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import {
  countLiveOperationsForProfile,
  firstLiveOperationForProfile,
  getAllProfiles,
} from "@/data/operations";

type IconComponent = React.ComponentType<{ className?: string }>;

const ICONS: Record<string, IconComponent> = {
  "Exploitation agricole": Sprout,
  "Coopérative agricole": Users,
  CUMA: Building2,
  "Exploitation forestière": TreePine,
  Scierie: Factory,
};

export function ProfileSegmentGrid() {
  const profiles = getAllProfiles();

  return (
    <section id="profils" className="border-b border-border bg-background py-20 sm:py-24">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Profils accompagnés
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vous séchez des produits dans un bâtiment fermé ?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Foin, luzerne, céréales, plantes aromatiques, bois, plaquettes,
            sciages… si vous exploitez un séchoir, une aide CEE peut financer une
            part importante de votre installation solaire.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => {
            const count = countLiveOperationsForProfile(profile);
            const operation = firstLiveOperationForProfile(profile);
            const Icon = ICONS[profile] ?? Building2;
            const href = operation
              ? `/solutions/${operation.slug}`
              : "#operations";

            return (
              <StaggerItem key={profile} as="div">
                <Link
                  href={href}
                  className="group flex h-full flex-col justify-between gap-6 bg-card p-6 transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-primary-700" />
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {profile}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {count > 0
                        ? `${count} opération${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`
                        : "Bientôt"}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

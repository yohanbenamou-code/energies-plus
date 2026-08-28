import * as React from "react";
import Link from "next/link";
import {
  Building2,
  Factory,
  Tractor,
  Trees,
  Users,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import {
  countLiveOperationsForProfile,
  firstLiveOperationForProfile,
  getAllProfiles,
} from "@/data/operations";

type IconComponent = React.ComponentType<{ className?: string }>;

const ICONS: Record<string, IconComponent> = {
  "Exploitation agricole": Tractor,
  "Coopérative agricole": Users,
  CUMA: Building2,
  "Exploitation forestière": Trees,
  Scierie: Factory,
};

export function ProfileSegmentGrid() {
  const profiles = getAllProfiles();

  return (
    <section id="profils" className="border-b border-border bg-secondary/40 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Profils accompagnés"
          title="Votre structure est-elle concernée ?"
          description="Nous accompagnons les professionnels agricoles et forestiers qui sèchent des produits ou co-produits dans un bâtiment fermé."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, i) => {
            const count = countLiveOperationsForProfile(profile);
            const operation = firstLiveOperationForProfile(profile);
            const Icon = ICONS[profile] ?? Building2;
            const href = operation
              ? `/solutions/${operation.slug}`
              : "#operations";

            return (
              <Reveal key={profile} delay={i * 0.06} as="article">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {profile}
                  </h3>
                  <div className="mt-3">
                    <Badge variant={count > 0 ? "success" : "muted"}>
                      {count > 0
                        ? `${count} opération${count > 1 ? "s" : ""} disponible${
                            count > 1 ? "s" : ""
                          }`
                        : "Bientôt"}
                    </Badge>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Voir les solutions
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

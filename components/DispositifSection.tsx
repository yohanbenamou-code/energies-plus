import * as React from "react";
import { CircleCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import type { CeeOperation } from "@/types/operation";

export function DispositifSection({ operation }: { operation: CeeOperation }) {
  return (
    <section
      id="dispositif"
      className="border-b border-border bg-secondary/40 py-16 sm:py-20"
    >
      <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Le dispositif"
            title="Le dispositif CEE, expliqué simplement"
          />
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Les <strong className="text-foreground">Certificats d&apos;Économies
              d&apos;Énergie</strong> constituent un dispositif public, encadré
              par le Ministère de la Transition Écologique. Il impose aux
              fournisseurs d&apos;énergie de financer des actions d&apos;économies
              d&apos;énergie&nbsp;: c&apos;est ce financement qui alimente la
              prime CEE.
            </p>
            <p>
              L&apos;opération standardisée{" "}
              <strong className="text-foreground">n° {operation.code}</strong>{" "}
              couvre le séchage de produits et co-produits agricoles et
              forestiers par insufflation d&apos;air, à l&apos;aide de panneaux
              solaires hybrides. Elle définit des conditions techniques précises
              et un barème officiel exprimé en kWh cumac.
            </p>
            <p>
              Pour l&apos;exploitant, cela se traduit par une aide qui réduit le
              reste à charge de l&apos;investissement, à condition que le dossier
              soit monté dans le bon ordre — avant la signature du devis.
            </p>
            <p className="rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
              Les montants exprimés en euros sont indicatifs, non contractuels et
              communiqués sous réserve d&apos;éligibilité. Seuls les volumes en
              kWh cumac correspondent aux barèmes officiels de l&apos;opération.
            </p>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Conditions techniques de l&apos;opération {operation.code}
            </h3>
            <ul className="mt-4 space-y-3">
              {operation.conditions.map((condition, i) => (
                <Reveal key={condition} delay={i * 0.04} as="li">
                  <div className="flex items-start gap-2.5 text-sm">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{condition}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Durée de vie conventionnelle retenue par la fiche&nbsp;:{" "}
              {operation.lifespanYears} ans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

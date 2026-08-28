import * as React from "react";
import { ClipboardCheck, FileCheck, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const ITEMS = [
  {
    icon: ClipboardCheck,
    title: "Qualification sur le catalogue officiel",
    body: "Nous vérifions que votre projet correspond à une opération standardisée CEE en vigueur, et à ses conditions techniques exactes, avant toute démarche.",
  },
  {
    icon: FileCheck,
    title: "Dossier CEE sécurisé avant la signature du devis",
    body: "Le cadrage et l'engagement CEE interviennent avant que vous ne signiez le devis de l'installateur — condition indispensable pour bénéficier de l'aide.",
  },
  {
    icon: ShieldCheck,
    title: "Dossier de preuve complet en cas de contrôle",
    body: "Nous constituons et conservons l'ensemble des pièces justificatives attendues, pour que votre dossier reste solide même en cas de contrôle a posteriori.",
  },
] as const;

export function ValueProps() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="container grid gap-8 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} as="article">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

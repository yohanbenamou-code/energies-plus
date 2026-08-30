import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";

const ITEMS = [
  {
    k: "01",
    title: "On vérifie que votre projet est bien finançable",
    body: "Avant tout, nous confrontons votre projet au catalogue officiel des opérations CEE et à leurs conditions exactes. S'il n'est pas éligible, nous vous le disons — sans détour.",
  },
  {
    k: "02",
    title: "On sécurise l'aide avant que vous ne signiez",
    body: "L'engagement CEE doit être posé avant le devis de l'installateur. Nous cadrons ce timing pour vous : c'est la condition n°1 pour toucher la prime.",
  },
  {
    k: "03",
    title: "On garde un dossier solide, même en cas de contrôle",
    body: "Nous constituons et conservons toutes les pièces justificatives attendues. Votre dossier reste défendable des années après les travaux.",
  },
];

export function ValueProps() {
  return (
    <section className="relative border-b border-border bg-background py-20 sm:py-24">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            Notre rôle
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un tiers de confiance entre vous et le dispositif CEE
          </h2>
        </Reveal>

        <Stagger className="mt-12 divide-y divide-border border-y border-border">
          {ITEMS.map((item) => (
            <StaggerItem key={item.k}>
              <div className="grid gap-4 py-8 md:grid-cols-[auto_1fr] md:gap-10">
                <span className="bg-brand-gradient bg-clip-text font-mono text-3xl font-extrabold text-transparent md:text-5xl">
                  {item.k}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

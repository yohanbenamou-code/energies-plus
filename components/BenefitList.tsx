import * as React from "react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

export interface Benefit {
  title: string;
  body: string;
}

/** Liste éditoriale des bénéfices : titre à gauche, explication à droite. */
export function BenefitList({
  index,
  title,
  items,
}: {
  index: string;
  title: string;
  items: Benefit[];
}) {
  return (
    <section
      id="benefices"
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead index={index} label="Ce que ça change" title={title} />

        <div className="mt-8 sm:mt-12 border-t border-foreground/20">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i, 3) * 0.05}
              className="grid gap-2 border-b border-foreground/20 py-6 md:grid-cols-12 md:gap-8 md:py-7"
            >
              <h3 className="display text-xl text-foreground md:col-span-5 md:text-2xl">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

export interface PrinciplePoint {
  title: string;
  body: string;
}

interface PrincipleSectionProps {
  index?: string;
  title: string;
  description: string;
  points: PrinciplePoint[];
  /** Mention sur le caractère indicatif des montants. */
  notice?: string;
  /** Détail technique, replié par défaut. */
  tech?: {
    title: string;
    intro: string;
    conditions: string[];
    footnotes?: string[];
  };
}

export function PrincipleSection({
  index = "01",
  title,
  description,
  points,
  notice = "Les montants en euros évoqués lors de l'étude sont indicatifs, non contractuels et communiqués sous réserve d'éligibilité. Seul le volume officiel de l'aide (en kWh cumac) est défini par le barème.",
  tech,
}: PrincipleSectionProps) {
  return (
    <section
      id="dispositif"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Le principe"
          title={title}
          description={description}
        />

        <div className="mt-14 grid border-y border-foreground/20 md:grid-cols-3 md:divide-x md:divide-foreground/20">
          {points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.07}
              className="border-b border-foreground/20 py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
            >
              <p className="display text-5xl text-accent">{i + 1}</p>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <p>{notice}</p>
        </Reveal>

        {tech ? (
          <Accordion
            type="single"
            collapsible
            className="mt-8 max-w-3xl border-t border-foreground/20"
          >
            <AccordionItem value="tech" className="border-foreground/20">
              <AccordionTrigger className="text-sm">{tech.title}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">{tech.intro}</p>
                <ul className="list-plus space-y-2">
                  {tech.conditions.map((condition) => (
                    <li key={condition}>{condition}</li>
                  ))}
                </ul>
                {tech.footnotes?.map((note) => (
                  <p key={note} className="mt-3">
                    {note}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null}
      </div>
    </section>
  );
}

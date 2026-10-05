import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHead } from "@/components/SectionHead";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  /** Version texte brut pour le JSON-LD (obligatoire pour le rich result). */
  plainAnswer: string;
}

interface FaqProps {
  id?: string;
  index?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  /** Émettre le JSON-LD FAQPage. Une seule fois par page. */
  withJsonLd?: boolean;
}

export function Faq({
  id = "faq",
  index = "07",
  title = "Questions fréquentes",
  description,
  items,
  withJsonLd = true,
}: FaqProps) {
  return (
    <section id={id} className="border-b border-border bg-background py-12 sm:py-28">
      <div className="container">
        <SectionHead
          index={index}
          label="FAQ"
          title={title}
          description={description}
        />

        <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <Accordion
            type="single"
            collapsible
            className="border-t border-foreground/20 lg:col-span-8 lg:col-start-4"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className="border-foreground/20"
              >
                <AccordionTrigger className="text-[1.05rem]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="max-w-2xl space-y-3">{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {withJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.plainAnswer,
                },
              })),
            }),
          }}
        />
      ) : null}
    </section>
  );
}

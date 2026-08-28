import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  /** Version texte brut pour le JSON-LD (obligatoire pour le rich result). */
  plainAnswer: string;
}

interface FaqProps {
  id?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  /** Émettre le JSON-LD FAQPage. Une seule fois par page. */
  withJsonLd?: boolean;
}

export function Faq({
  id = "faq",
  title = "Questions fréquentes",
  description,
  items,
  withJsonLd = true,
}: FaqProps) {
  return (
    <section id={id} className="border-b border-border bg-background py-16 sm:py-20">
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} description={description} />

        <Accordion type="single" collapsible className="mt-8">
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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

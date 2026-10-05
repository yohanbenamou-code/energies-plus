import * as React from "react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

/** Zone d'intervention : `subject` = « exploitation », « bâtiment », « maison »… */
export function ServiceAreaSection({
  index,
  subject,
  note,
}: {
  index: string;
  subject: string;
  note: string;
}) {
  return (
    <section
      id="zone"
      className="border-b border-border bg-background py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Zone d'intervention"
          title="Partout en France métropolitaine"
          description={`Nous intervenons sur tout le territoire métropolitain. Où que se trouve votre ${subject}, nos conseillers évaluent votre projet et le montant d'aide auquel il peut prétendre.`}
        />
        <Reveal className="mt-8 sm:mt-12 grid gap-8 border-t border-foreground/20 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-lg font-semibold text-foreground">
              Étude à distance, puis visite si besoin
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Un premier échange suffit pour savoir si votre projet est
              éligible.
            </p>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

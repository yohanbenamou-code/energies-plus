import * as React from "react";
import Link from "next/link";
import { AlertTriangle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/**
 * Section pédagogique factuelle. Ne cite volontairement AUCUN article de loi
 * précis : la formulation reste générale, conformément aux consignes.
 */
export function RulesBeforeQuoteSection() {
  return (
    <section id="avant-devis" className="border-b border-border bg-secondary/40 py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl border border-accent/40 bg-accent/5 p-7 sm:p-10">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Appelez-nous avant de signer votre devis
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Dans le cadre du dispositif des Certificats d&apos;Économies
              d&apos;Énergie, la qualification du projet et la sécurisation du
              dossier CEE doivent intervenir <strong className="text-foreground">avant</strong>{" "}
              tout engagement contractuel avec l&apos;installateur — c&apos;est-à-dire
              avant la signature du devis.
            </p>
            <p>
              Concrètement : si le devis est signé avant que le rôle actif et
              incitatif de l&apos;acteur CEE ne soit établi, le bénéfice de
              l&apos;aide peut être perdu, sans rattrapage possible. C&apos;est
              une erreur fréquente et coûteuse.
            </p>
            <p>
              Notre intervention consiste précisément à cadrer ce séquencement :
              vérifier l&apos;éligibilité, formaliser l&apos;engagement CEE, puis
              seulement transmettre le cahier des charges à l&apos;installateur
              de votre choix.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="accent">
              <Link href="#contact">
                <PhoneCall /> Faire cadrer mon projet
              </Link>
            </Button>
            <a
              href={site.contact.phoneHref}
              className="text-sm font-semibold text-foreground hover:text-primary"
            >
              ou appelez le {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

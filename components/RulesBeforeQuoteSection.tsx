import * as React from "react";
import Link from "next/link";
import { Check, PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * Section pédagogique factuelle. Ne cite volontairement AUCUN article de loi
 * précis : la formulation reste générale, conformément aux consignes.
 */
export function RulesBeforeQuoteSection() {
  return (
    <section
      id="avant-devis"
      className="relative overflow-hidden border-b border-border bg-primary-900 py-20 text-white sm:py-24"
    >
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            L&apos;erreur à ne pas commettre
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Appelez-nous <span className="text-brand-gradient">avant</span> de
            signer votre devis
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/80">
            <p>
              Dans le dispositif des Certificats d&apos;Économies d&apos;Énergie,
              la qualification et la sécurisation du dossier doivent intervenir{" "}
              <strong className="text-white">avant</strong> tout engagement
              contractuel avec l&apos;installateur.
            </p>
            <p>
              Un devis signé trop tôt, et le bénéfice de l&apos;aide peut être
              perdu — sans rattrapage possible. C&apos;est l&apos;erreur la plus
              fréquente, et la plus coûteuse.
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="accent">
              <Link href="#contact">
                <PhoneCall /> Faire cadrer mon projet
              </Link>
            </Button>
            <a
              href={site.contact.phoneHref}
              className="text-sm font-semibold text-white hover:text-accent"
            >
              ou appelez le {site.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal variant="left" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Le bon ordre
          </p>
          <ol className="mt-4 space-y-3">
            {[
              "Qualification & vérification de l'éligibilité",
              "Engagement CEE formalisé",
              "Signature du devis avec l'installateur",
              "Travaux, puis dossier de preuve",
            ].map((label, i) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-white/85">
                  {i + 1}. {label}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-white/80">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive-foreground">
              <X className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            Devis signé avant l&apos;engagement CEE = aide généralement perdue.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import * as React from "react";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const ORDER = [
  "Qualification et vérification de l'éligibilité",
  "Engagement CEE formalisé",
  "Signature du devis avec l'installateur",
  "Travaux, puis dossier de preuve",
];

/**
 * Section pédagogique factuelle. Ne cite volontairement AUCUN article de loi
 * précis : la formulation reste générale, conformément aux consignes.
 */
export function RulesBeforeQuoteSection() {
  return (
    <section
      id="avant-devis"
      className="relative overflow-hidden bg-primary-900 py-12 text-white sm:py-28"
    >
      <span
        aria-hidden
        className="plus-mark -bottom-48 -left-40 hidden h-[40rem] text-white/[0.06] [--t:2px] lg:block"
      />
      <div className="container relative grid gap-8 sm:gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="text-sm font-medium text-accent">
            L&apos;erreur à ne pas commettre
          </p>
          <h2 className="display mt-3 text-balance text-[1.9rem] sm:mt-4 sm:text-5xl">
            Appelez-nous avant de signer votre devis
          </h2>
          <div className="mt-4 max-w-lg space-y-3 text-sm leading-relaxed text-white/75 sm:mt-6 sm:space-y-4 sm:text-[15px]">
            <p>
              Dans le dispositif des Certificats d&apos;Économies d&apos;Énergie,
              la qualification et la sécurisation du dossier doivent intervenir{" "}
              <strong className="text-white">avant</strong> tout engagement
              contractuel avec l&apos;installateur.
            </p>
            <p>
              Un devis signé trop tôt, et le bénéfice de l&apos;aide peut être
              perdu, sans rattrapage possible. C&apos;est l&apos;erreur la plus
              fréquente, et la plus coûteuse.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Button asChild variant="accent" size="lg">
              <Link href="#contact">
                <PhoneCall /> Faire cadrer mon projet
              </Link>
            </Button>
            <a
              href={site.contact.phoneHref}
              className="px-1 text-sm font-semibold text-white hover:text-accent"
            >
              ou appelez le {site.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal variant="left" className="lg:col-span-5 lg:col-start-8">
          <p className="text-sm font-medium text-white/60">Le bon ordre</p>
          <ol className="mt-4 border-t border-white/20">
            {ORDER.map((label, i) => (
              <li
                key={label}
                className="flex items-baseline gap-4 border-b border-white/20 py-3 sm:gap-5 sm:py-4"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-white/90">{label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            <span className="font-semibold text-white">À éviter :</span> un
            devis signé avant l&apos;engagement CEE. L&apos;aide est alors
            généralement perdue.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

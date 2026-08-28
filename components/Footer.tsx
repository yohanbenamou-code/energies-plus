import * as React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.baseline}
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {/* TODO: placeholder à remplacer par Yohan/Solaire Energie */}
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                {site.contact.email}
              </a>
              <p>{site.legal.address}</p>
              <p>SIRET : {site.legal.siret}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Informations</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/mentions-legales" className="hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="hover:text-foreground"
                >
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/agri-eq-110-sechage-solaire-agricole"
                  className="hover:text-foreground"
                >
                  Séchage solaire AGRI-EQ-110
                </Link>
              </li>
            </ul>
            {/* TODO: placeholder à remplacer par Yohan/Solaire Energie — réseaux sociaux */}
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Zone d&apos;intervention</p>
            <p className="mt-4 text-sm text-muted-foreground">{site.serviceArea}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {site.legalMention}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Les montants exprimés en euros sur ce site sont des estimations non
            contractuelles, communiquées sous réserve d&apos;éligibilité. Seuls
            les volumes en kWh cumac correspondent aux barèmes officiels de
            l&apos;opération.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {year} {site.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

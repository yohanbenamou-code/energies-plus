import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary-900 text-white">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo invert />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {site.baseline}
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/80">
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Mail className="h-4 w-4 text-accent" />
                {site.contact.email}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {site.legal.address}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Informations</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/mentions-legales" className="hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="hover:text-white"
                >
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/agri-eq-110-sechage-solaire-agricole"
                  className="hover:text-white"
                >
                  Séchage solaire agricole & forestier
                </Link>
              </li>
            </ul>
            {/* TODO: placeholder à remplacer par Yohan/Énergies Plus — réseaux sociaux */}
          </div>

          <div>
            <p className="text-sm font-semibold">Identité</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>{site.legal.companyName}</li>
              <li>SIRET {site.legal.siret}</li>
              <li>{site.legal.rcs}</li>
              <li>{site.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/55">
            {site.legalMention}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/55">
            Les montants exprimés en euros sur ce site sont des estimations non
            contractuelles, communiquées sous réserve d&apos;éligibilité. Seuls
            les volumes en kWh cumac correspondent aux barèmes officiels de
            l&apos;opération.
          </p>
          <p className="mt-4 text-xs text-white/45">
            © {year} {site.legal.companyName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

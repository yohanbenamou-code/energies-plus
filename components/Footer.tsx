import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getLiveOperations } from "@/data/operations";
import { site } from "@/data/site";

const SOCIAL_LINKS = [
  { key: "linkedin", href: site.socials.linkedin, label: "LinkedIn" },
  { key: "facebook", href: site.socials.facebook, label: "Facebook" },
  { key: "youtube", href: site.socials.youtube, label: "YouTube" },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();
  const solutions = getLiveOperations();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo invert className="h-10" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              {site.baseline}
            </p>
            <div className="mt-7 space-y-2.5 text-sm text-white/85">
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-3 hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent"
              >
                <WhatsAppIcon className="h-4 w-4 text-accent" />
                WhatsApp : {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {site.contact.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {site.legal.address}
              </p>
            </div>
            {SOCIAL_LINKS.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map(({ key, href, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-white/20 px-3 py-1 text-xs text-white/75 transition-colors hover:border-accent hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-sm font-semibold text-white">Nos solutions</p>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {solutions.map((operation) => (
                <li key={operation.slug}>
                  <Link
                    href={`/solutions/${operation.slug}`}
                    className="hover:text-white"
                  >
                    {operation.shortTitle ?? operation.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#catalogue" className="hover:text-white">
                  Toutes les fiches CEE
                </Link>
              </li>
              <li>
                <Link href="/#rendez-vous" className="hover:text-white">
                  Prendre rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-white">Informations</p>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
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
                  Politique de confidentialité
                </Link>
              </li>
              <li className="pt-2 text-white/45">{site.legal.companyName}</li>
              <li className="text-white/45">SIRET {site.legal.siret}</li>
              <li className="text-white/45">{site.legal.rcs}</li>
              <li className="text-white/45">{site.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-white/50">
            {site.legalMention}
          </p>
          <p className="mt-3 max-w-4xl text-xs leading-relaxed text-white/50">
            Les montants exprimés en euros sur ce site sont des estimations non
            contractuelles, communiquées sous réserve d&apos;éligibilité. Seuls
            les volumes en kWh cumac correspondent aux barèmes officiels de
            l&apos;opération.
          </p>
          <p className="mt-5 text-xs text-white/40">
            © {year} {site.legal.companyName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

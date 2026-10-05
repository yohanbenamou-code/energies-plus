import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlusMark } from "@/components/PlusMark";
import { ConversionEvents } from "@/components/ConversionEvents";
import { getLiveOperations } from "@/data/operations";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Merci, votre demande est bien enregistrée",
  description:
    "Votre demande a bien été transmise à Énergies Plus. Un conseiller vous recontacte sous 24 à 48h ouvrées.",
  robots: { index: false, follow: false },
};

const NAV = [
  { label: "Nos opérations CEE", href: "/#catalogue" },
  { label: "Notre méthode", href: "/#methode" },
  { label: "FAQ", href: "/#faq" },
];

export default function MerciPage() {
  const solutions = getLiveOperations();

  return (
    <>
      <ConversionEvents />
      <Header
        nav={NAV}
        ctaLabel="Retour à l'accueil"
        ctaHref="/"
        bookingHref="/#rendez-vous"
      />

      <main id="contenu" className="bg-primary-900 text-white">
        <div className="container grid min-h-[70vh] gap-12 py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <PlusMark className="h-12 w-12 text-accent" />
            <h1 className="display mt-8 text-balance text-4xl sm:text-6xl">
              Merci, votre demande est bien enregistrée
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Un conseiller Énergies Plus vous recontacte sous{" "}
              <strong className="text-white">24 à 48h ouvrées</strong> pour faire
              le point sur votre projet et vérifier son éligibilité aux
              dispositifs d&apos;aide.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Une question d&apos;ici là ? Appelez-nous au{" "}
              <a
                href={site.contact.phoneHref}
                className="font-semibold text-white underline underline-offset-4 hover:text-accent"
              >
                {site.contact.phoneDisplay}
              </a>{" "}
              ({site.contact.hours}).
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="accent" size="lg">
                <a href={site.booking.url} target="_blank" rel="noopener noreferrer">
                  <CalendarDays />
                  Réserver un créneau
                  <ArrowUpRight />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-primary-900"
              >
                <Link href="/">Retour à l&apos;accueil</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm font-medium text-white/60">
              Revoir une solution
            </p>
            <ul className="mt-4 border-t border-white/20">
              {solutions.map((operation) => (
                <li key={operation.slug} className="border-b border-white/20">
                  <Link
                    href={`/solutions/${operation.slug}`}
                    className="flex items-center justify-between gap-4 py-4 text-[15px] font-medium text-white hover:text-accent"
                  >
                    {operation.shortTitle ?? operation.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="container max-w-3xl pb-10 text-xs text-white/45">
          {site.privateActorShort}
        </p>
      </main>

      <Footer />
    </>
  );
}

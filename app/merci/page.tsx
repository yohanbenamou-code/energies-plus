import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ConversionEvents } from "@/components/ConversionEvents";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Merci — votre demande est bien enregistrée",
  description:
    "Votre demande a bien été transmise à Énergies Plus. Un conseiller vous recontacte sous 24 à 48h ouvrées.",
  robots: { index: false, follow: false },
};

const NAV = [
  { label: "Nos opérations CEE", href: "/#operations" },
  { label: "Notre méthode", href: "/#methode" },
  { label: "FAQ", href: "/#faq" },
];

export default function MerciPage() {
  return (
    <>
      <ConversionEvents />
      <Header nav={NAV} ctaLabel="Retour à l'accueil" ctaHref="/" />

      <main id="contenu" className="bg-primary/5">
        <div className="container flex min-h-[60vh] max-w-2xl flex-col items-center justify-center py-20 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CircleCheck className="h-9 w-9" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Merci, votre demande est bien enregistrée
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Un conseiller Énergies Plus vous recontacte sous{" "}
            <strong className="text-foreground">24 à 48h ouvrées</strong> pour
            faire le point sur votre projet et vérifier son éligibilité au
            dispositif CEE.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Une question d&apos;ici là ? Appelez-nous au{" "}
            <a
              href={site.contact.phoneHref}
              className="font-semibold text-foreground hover:text-primary"
            >
              {site.contact.phoneDisplay}
            </a>{" "}
            ({site.contact.hours}).
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="default">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/solutions/agri-eq-110-sechage-solaire-agricole">
                Revoir la solution séchage solaire
              </Link>
            </Button>
          </div>

          <p className="mt-10 max-w-md text-xs text-muted-foreground">
            {site.privateActorShort}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

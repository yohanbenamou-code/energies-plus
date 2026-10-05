"use client";

import * as React from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/data/site";

/**
 * Prise de rendez-vous : agenda Google (planning de rendez-vous) intégré.
 * L'iframe n'est chargée qu'au premier affichage de la section (ou au clic),
 * pour ne pas alourdir le chargement de la page.
 */
export function BookingSection({ index = "09" }: { index?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || load) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <section
      id="rendez-vous"
      className="bg-primary-900 py-20 text-white sm:py-28"
    >
      <div className="container">
        <SectionHead
          tone="dark"
          index={index}
          label="Rendez-vous"
          title="Réservez directement un créneau avec un conseiller"
          description="Choisissez le jour et l'heure qui vous conviennent dans l'agenda de l'équipe. Vous recevez une confirmation par email."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-4">
            <ul className="list-plus list-plus--light space-y-4 text-[15px] leading-relaxed text-white/80">
              <li>Étude d&apos;éligibilité gratuite et sans engagement.</li>
              <li>
                Un conseiller fait le point sur votre projet avant toute
                signature de devis.
              </li>
              <li>
                Vous préférez échanger tout de suite ? Appelez le{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-semibold text-white underline underline-offset-4 hover:text-accent"
                >
                  {site.contact.phoneDisplay}
                </a>
                .
              </li>
            </ul>
            <Button asChild variant="accent" size="lg" className="mt-8">
              <a href={site.booking.url} target="_blank" rel="noopener noreferrer">
                <CalendarDays />
                Ouvrir l&apos;agenda
                <ArrowUpRight />
              </a>
            </Button>
          </div>

          <div
            ref={ref}
            className="reveal reveal--left overflow-hidden rounded-sm bg-white lg:col-span-8"
          >
            {load ? (
              <iframe
                src={site.booking.embedUrl}
                title="Agenda de prise de rendez-vous Energie+"
                loading="lazy"
                className="block h-[720px] w-full border-0"
              />
            ) : (
              <div className="flex h-[720px] items-center justify-center bg-primary-50 text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setLoad(true)}
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  Afficher l&apos;agenda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

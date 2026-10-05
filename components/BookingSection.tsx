"use client";

import * as React from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/data/site";

const IFRAME_TITLE = "Agenda de prise de rendez-vous Energie+";

/**
 * Prise de rendez-vous : planning Google Agenda.
 *  - Ordinateur : l'agenda est intégré dans la page (chargé à l'approche de la
 *    section, pour ne pas alourdir le chargement).
 *  - Mobile : bloc compact avec un bouton qui ouvre l'agenda en plein écran,
 *    où il se manipule confortablement (une iframe de 700 px en bas de page
 *    est inutilisable au doigt).
 */
export function BookingSection({ index = "09" }: { index?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = React.useState(false);
  const [near, setNear] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <section
      id="rendez-vous"
      className="bg-primary-900 py-14 text-white sm:py-28"
    >
      <div className="container">
        <SectionHead
          tone="dark"
          index={index}
          label="Rendez-vous"
          title="Réservez un créneau avec un conseiller"
          description="Un rendez-vous téléphonique de 15 minutes : choisissez le jour et l'heure dans l'agenda de l'équipe. Vous recevez une confirmation par email."
        />

        <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-4">
            <ul className="list-plus list-plus--light space-y-3 text-[15px] leading-relaxed text-white/80 sm:space-y-4">
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
                , ou écrivez-nous sur{" "}
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline underline-offset-4 hover:text-accent"
                >
                  WhatsApp
                </a>
                .
              </li>
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              {/* Mobile : agenda en plein écran */}
              <div className="lg:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="accent" size="lg" className="w-full sm:w-auto">
                      <CalendarDays />
                      Choisir un créneau
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="left-0 top-0 grid h-[100dvh] max-w-none translate-x-0 translate-y-0 grid-rows-[3.5rem_1fr] gap-0 rounded-none border-0 p-0 sm:rounded-none">
                    <div className="flex items-center border-b border-border bg-background px-4">
                      <DialogTitle className="display text-lg">
                        Choisir un créneau
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Agenda de prise de rendez-vous avec un conseiller
                        Energie+.
                      </DialogDescription>
                    </div>
                    <iframe
                      src={site.booking.embedUrl}
                      title={IFRAME_TITLE}
                      className="block h-full w-full border-0 bg-white"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:border-white hover:bg-white hover:text-primary-900 lg:border-0 lg:bg-accent lg:text-accent-foreground lg:hover:brightness-95"
              >
                <a href={site.booking.url} target="_blank" rel="noopener noreferrer">
                  <span className="lg:hidden">Ouvrir dans Google Agenda</span>
                  <span className="hidden lg:inline">Ouvrir l&apos;agenda</span>
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Ordinateur : agenda intégré */}
          <div
            ref={ref}
            className="reveal reveal--left hidden overflow-hidden rounded-sm bg-white lg:col-span-8 lg:block"
          >
            {desktop && near ? (
              <iframe
                src={site.booking.embedUrl}
                title={IFRAME_TITLE}
                loading="lazy"
                className="block h-[720px] w-full border-0"
              />
            ) : (
              <div className="flex h-[720px] items-center justify-center bg-primary-50 text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setNear(true)}
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

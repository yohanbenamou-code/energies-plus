"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  nav: NavItem[];
  /** Libellé du CTA principal du header. */
  ctaLabel: string;
  /** Cible du CTA principal (ancre #contact ou route). */
  ctaHref: string;
  /** Cible du lien « Prendre rendez-vous » (agenda). */
  bookingHref?: string;
  /** Sur les pages solution : lien de retour à l'accueil (menu mobile). */
  showBackToHome?: boolean;
}

export function Header({
  nav,
  ctaLabel,
  ctaHref,
  bookingHref = "#rendez-vous",
  showBackToHome = false,
}: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background transition-colors",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Energie+ : accueil" className="shrink-0">
          <Logo className="h-7" />
        </Link>

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label="Navigation principale"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={site.contact.phoneHref}
            className="mr-1 hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground hover:text-accent-600 2xl:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {site.contact.phoneDisplay}
          </a>
          <Button asChild variant="outline" size="sm">
            <Link href={bookingHref}>Prendre rendez-vous</Link>
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground xl:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background xl:hidden">
          <nav
            className="container flex flex-col py-3"
            aria-label="Navigation mobile"
          >
            {showBackToHome ? (
              <Link
                href="/"
                className="border-b border-border py-3 text-sm font-medium text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                Retour à l&apos;accueil
              </Link>
            ) : null}
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-3.5 text-base font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center gap-2 py-3.5 text-base font-semibold text-foreground"
            >
              <Phone className="h-4 w-4" />
              {site.contact.phoneDisplay}
            </a>
            <div className="grid gap-2 pb-2">
              <Button asChild variant="accent">
                <Link href={ctaHref} onClick={() => setOpen(false)}>
                  {ctaLabel}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={bookingHref} onClick={() => setOpen(false)}>
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

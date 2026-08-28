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
  /** Sur la page solution : lien discret de retour à l'accueil. */
  showBackToHome?: boolean;
}

export function Header({
  nav,
  ctaLabel,
  ctaHref,
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
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "border-transparent bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Solaire Energie — accueil" className="shrink-0">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.contact.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {site.contact.phoneDisplay}
          </a>
          <Button asChild variant="accent" size="sm">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav
            className="container flex flex-col gap-1 py-4"
            aria-label="Navigation mobile"
          >
            {showBackToHome ? (
              <Link
                href="/"
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                ← Retour à l&apos;accueil
              </Link>
            ) : null}
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.contact.phoneHref}
              className="mt-2 inline-flex items-center gap-2 rounded-md px-2 py-3 text-base font-semibold text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" />
              {site.contact.phoneDisplay}
            </a>
            <Button asChild variant="accent" className="mt-1">
              <Link href={ctaHref} onClick={() => setOpen(false)}>
                {ctaLabel}
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

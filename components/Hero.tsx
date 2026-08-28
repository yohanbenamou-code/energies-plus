import * as React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "@/components/HeroIllustration";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Ligne d'accroche prudente sous le sous-titre. */
  note?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Affiche le CTA téléphone à côté des boutons. */
  showPhone?: boolean;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  showPhone = true,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50/60 to-background",
        className,
      )}
    >
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          {eyebrow ? (
            <p className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
          {note ? (
            <p className="mt-4 max-w-xl rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
              {note}
            </p>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild variant="accent" size="lg">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight />
              </Link>
            </Button>
            {secondaryCta ? (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
            {showPhone ? (
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                {site.contact.phoneDisplay}
              </a>
            ) : null}
          </div>

          <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">
            {site.privateActorShort}
          </p>
        </div>

        <div className="relative">
          <HeroIllustration className="mx-auto max-w-md lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}

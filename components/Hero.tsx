import * as React from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Aurora, Parallax, TextReveal } from "@/components/motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string[];
  subtitle: string;
  note?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  showPhone?: boolean;
  floatingBadge?: { value: string; label: string };
  className?: string;
}

const d = (delay: number) =>
  ({ "--reveal-delay": `${delay}s` }) as React.CSSProperties;

export function Hero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  showPhone = true,
  floatingBadge,
  className,
}: HeroProps) {
  return (
    <section
      className={cn("relative isolate overflow-hidden bg-background", className)}
    >
      <Aurora />
      <div className="surface-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          {eyebrow ? (
            <p
              className="reveal mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </p>
          ) : null}

          <TextReveal
            as="h1"
            text={title}
            highlight={titleHighlight}
            delay={0.05}
            className="text-balance text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
          />

          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={d(0.15)}
          >
            {subtitle}
          </p>

          {note ? (
            <p
              className="reveal mt-5 flex max-w-xl gap-3 rounded-xl border border-border bg-card/70 p-4 text-sm text-foreground shadow-soft backdrop-blur"
              style={d(0.25)}
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>{note}</span>
            </p>
          ) : null}

          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={d(0.35)}
          >
            <Button asChild variant="accent" size="lg" className="group">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
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
                <Phone className="h-4 w-4 text-accent" />
                {site.contact.phoneDisplay}
              </a>
            ) : null}
          </div>

          <p
            className="reveal mt-7 max-w-xl text-xs leading-relaxed text-muted-foreground"
            style={d(0.45)}
          >
            {site.privateActorShort}
          </p>
        </div>

        <div className="relative">
          <Parallax distance={28}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-gradient opacity-[0.09] blur-2xl" />
              <div className="reveal overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift">
                <HeroIllustration />
              </div>

              {floatingBadge ? (
                <div
                  className="reveal absolute -bottom-5 -left-4 rounded-xl border border-border bg-card/95 p-3.5 shadow-lift backdrop-blur sm:-left-8"
                  style={d(0.55)}
                >
                  <p className="text-xl font-extrabold tracking-tight text-primary-700">
                    {floatingBadge.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {floatingBadge.label}
                  </p>
                </div>
              ) : null}

              <div
                className="reveal absolute -right-3 top-6 hidden items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur sm:flex"
                style={d(0.7)}
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                Dispositif public CEE
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

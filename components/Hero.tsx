import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  /** Titre. Le fragment `titleAccent` est rendu en italique serif à la fin. */
  title: string;
  titleAccent?: string;
  subtitle: string;
  note?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  showPhone?: boolean;
  /** Photo de fond (placeholder Unsplash — à remplacer). */
  image?: string;
  imageAlt?: string;
  /** Petites vignettes flottantes (chiffres, labels). */
  chips?: { value: string; label: string }[];
  className?: string;
}

const d = (delay: number) =>
  ({ "--reveal-delay": `${delay}s` }) as React.CSSProperties;

export function Hero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  showPhone = true,
  image,
  imageAlt = "",
  chips,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate grain overflow-hidden bg-primary-900 text-white",
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/92 via-primary-900/78 to-primary-900/55" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,transparent,hsl(219_64%_10%/0.6))]" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-brand-gradient opacity-90" />
      )}

      <div className="container grid gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p
              className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </p>
          ) : null}

          <h1
            className="reveal display text-balance text-[2.4rem] text-white sm:text-5xl lg:text-[3.5rem]"
            style={d(0.05)}
          >
            {title}
            {titleAccent ? (
              <>
                {" "}
                <em className="text-accent">{titleAccent}</em>
              </>
            ) : null}
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-white/80"
            style={d(0.15)}
          >
            {subtitle}
          </p>

          {note ? (
            <p
              className="reveal mt-5 max-w-xl rounded-xl border-l-2 border-accent bg-white/[0.06] px-4 py-3 text-sm text-white/85 backdrop-blur"
              style={d(0.22)}
            >
              {note}
            </p>
          ) : null}

          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={d(0.3)}
          >
            <Button asChild variant="accent" size="lg" className="group">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            {secondaryCta ? (
              <Button
                asChild
                size="lg"
                className="border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
            {showPhone ? (
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-white hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.contact.phoneDisplay}
              </a>
            ) : null}
          </div>

          <p
            className="reveal mt-8 max-w-xl text-xs leading-relaxed text-white/55"
            style={d(0.4)}
          >
            {site.privateActorShort}
          </p>
        </div>

        {chips && chips.length > 0 ? (
          <div className="reveal grid gap-4 sm:grid-cols-2 lg:justify-self-end" style={d(0.5)}>
            {chips.map((chip) => (
              <div
                key={chip.label}
                className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur"
              >
                <p className="display text-3xl text-white">{chip.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60">
                  {chip.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

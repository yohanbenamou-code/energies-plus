import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlusMark } from "@/components/PlusMark";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  /** Fin de titre, rendue en orange. */
  titleAccent?: string;
  subtitle: string;
  note?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  showPhone?: boolean;
  /** Photo (placeholder Unsplash, à remplacer par une photo chantier). */
  image?: string;
  imageAlt?: string;
  /** Repères chiffrés, affichés en bandeau sous le hero. */
  chips?: { value: string; label: string }[];
  className?: string;
}

const d = (delay: number) =>
  ({ "--reveal-delay": `${delay}s` }) as React.CSSProperties;

const STAT_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

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
        "relative isolate overflow-hidden bg-primary-900 text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className="plus-mark -right-40 -top-40 hidden h-[44rem] text-white/[0.07] [--t:2px] lg:block"
      />

      <div className="container grid gap-8 pb-8 pt-8 sm:gap-12 sm:pb-14 sm:pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-20">
        <div className="lg:col-span-7">
          {eyebrow ? (
            <p className="reveal mb-5 flex items-center gap-2.5 text-sm font-medium text-white/75 sm:mb-8">
              <PlusMark className="h-3.5 w-3.5 text-accent" />
              {eyebrow}
            </p>
          ) : null}

          <h1
            className="reveal display text-balance text-[2.1rem] text-white sm:text-6xl lg:text-[4.25rem]"
            style={d(0.05)}
          >
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-accent">{titleAccent}</span>
              </>
            ) : null}
          </h1>

          <p
            className="reveal mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg"
            style={d(0.12)}
          >
            {subtitle}
          </p>

          <div
            className="reveal mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
            style={d(0.2)}
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
                className="hidden border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-primary-900 sm:inline-flex"
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

          {note ? (
            <p
              className="reveal mt-6 hidden max-w-xl border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60 sm:mt-9 sm:block sm:pt-5 sm:text-sm"
              style={d(0.28)}
            >
              {note}
            </p>
          ) : null}
        </div>

        {image ? (
          <div className="reveal reveal--left relative lg:col-span-5" style={d(0.15)}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-primary-700 sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <PlusMark className="absolute -left-5 -top-5 h-14 w-14 text-accent lg:-left-7 lg:-top-7 lg:h-[4.5rem] lg:w-[4.5rem]" />
          </div>
        ) : null}
      </div>

      {chips && chips.length > 0 ? (
        <div className="relative border-t border-white/15">
          <dl
            className={cn(
              "container grid grid-cols-2 divide-white/15 sm:divide-x",
              STAT_COLS[chips.length] ?? "sm:grid-cols-4",
            )}
          >
            {chips.map((chip, i) => (
              <div
                key={chip.label}
                className={cn(
                  "py-4 sm:px-6 sm:py-6 sm:first:pl-0",
                  i >= 2 && "border-t border-white/15 sm:border-t-0",
                )}
              >
                <dt className="display text-2xl text-white sm:text-3xl lg:text-4xl">
                  {chip.value}
                </dt>
                <dd className="mt-0.5 text-xs text-white/60 sm:mt-1 sm:text-sm">{chip.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <p className="container pb-5 text-[11px] leading-relaxed text-white/45 sm:pb-6 sm:text-xs">
        {site.privateActorShort}
      </p>
    </section>
  );
}

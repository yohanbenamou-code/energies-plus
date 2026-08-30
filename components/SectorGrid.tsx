import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion";
import { SECTORS } from "@/data/sectors";
import { countOperationsBySector } from "@/data/operations";
import { cn } from "@/lib/utils";

export function SectorGrid() {
  return (
    <section
      id="secteurs"
      className="border-b border-border bg-secondary/40 py-20 sm:py-28"
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-600">
            Six secteurs
          </p>
          <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
            Une aide CEE existe <em>pour presque tout</em> chantier
            d&apos;économie d&apos;énergie
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Le dispositif couvre six grands secteurs. Nous ouvrons
            l&apos;accompagnement fiche par fiche, en commençant par celles que
            nous maîtrisons le mieux.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector, i) => {
            const count = countOperationsBySector(sector.key);
            return (
              <StaggerItem
                key={sector.key}
                as="div"
                className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}
              >
                <Link
                  href={`/#catalogue`}
                  className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl border border-border p-6 text-white shadow-soft"
                >
                  <Image
                    src={sector.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-900 via-primary-900/60 to-primary-900/10" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">
                      {count} fiche{count > 1 ? "s" : ""}
                    </span>
                    <ArrowUpRight className="h-5 w-5 opacity-80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{sector.label}</h3>
                  <p className="mt-1.5 text-sm text-white/80">
                    {sector.description}
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

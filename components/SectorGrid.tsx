import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Stagger, StaggerItem } from "@/components/motion";
import { SEGMENTS } from "@/data/references";
import { cn } from "@/lib/utils";

export function SectorGrid() {
  return (
    <section
      id="secteurs"
      className="border-b border-border bg-background py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index="03"
          label="Qui nous accompagnons"
          title="Des parcs entiers, pas des chantiers isolés"
          description="Depuis 2015, l'équipe intervient à l'échelle de patrimoines complets : bailleurs sociaux, établissements de santé, collectivités, copropriétés, sites industriels, exploitations agricoles. Et aussi les propriétaires de maison individuelle."
        />

        <Stagger className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {SEGMENTS.map((segment, i) => (
            <StaggerItem
              key={segment.key}
              as="div"
              className={cn("w-[68%] shrink-0 snap-start sm:w-auto", i === 0 && "lg:col-span-2")}
            >
              <Link href={segment.href} className="group block">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-sm bg-primary-900",
                    i === 0 ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={segment.image}
                    alt=""
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 620px, 100vw"
                        : "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
                  <h3 className="display text-xl text-foreground sm:text-2xl">
                    {segment.label}
                  </h3>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:line-clamp-none">
                  {segment.description}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

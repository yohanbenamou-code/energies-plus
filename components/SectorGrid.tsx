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
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index="03"
          label="Qui nous accompagnons"
          title="Des parcs entiers, pas des chantiers isolés"
          description="Depuis 2015, l'équipe intervient à l'échelle de patrimoines complets : bailleurs sociaux, établissements de santé, collectivités, copropriétés, sites industriels, exploitations agricoles. Et aussi les propriétaires de maison individuelle."
        />

        <Stagger className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((segment, i) => (
            <StaggerItem
              key={segment.key}
              as="div"
              className={cn(i === 0 && "lg:col-span-2")}
            >
              <Link href={segment.href} className="group block">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-sm bg-primary-900",
                    i === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
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
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="display text-2xl text-foreground">
                    {segment.label}
                  </h3>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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

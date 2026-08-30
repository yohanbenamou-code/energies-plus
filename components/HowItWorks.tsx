"use client";

import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { ScrollProgressLine, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
  title: string;
  body: string;
}

interface HowItWorksProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  steps: HowItWorksStep[];
  className?: string;
}

export function HowItWorks({
  id = "methode",
  eyebrow = "Comment ça marche",
  title,
  description,
  steps,
  className,
}: HowItWorksProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      className={cn(
        className ?? "border-b border-border bg-secondary/40 py-20 sm:py-24",
      )}
    >
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* rail + progression */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-0 md:top-6 md:h-px md:w-full">
            <ScrollProgressLine
              targetRef={ref}
              orientation="vertical"
              className="h-full w-px md:hidden"
            />
            <ScrollProgressLine
              targetRef={ref}
              orientation="horizontal"
              className="hidden h-px w-full md:block"
            />
          </div>

          <Stagger
            className={cn(
              "grid gap-x-6 gap-y-8",
              steps.length === 5
                ? "md:grid-cols-5"
                : steps.length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-4",
            )}
          >
            {steps.map((step, i) => (
              <StaggerItem key={step.title} as="div" className="relative pl-12 md:pl-0 md:pt-14">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-primary-700 shadow-soft md:left-0">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

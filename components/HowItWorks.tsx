import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
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
  return (
    <section
      id={id}
      className={
        className ?? "border-b border-border bg-background py-16 sm:py-20"
      }
    >
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <ol
          className={cn(
            "mt-10 grid gap-6 sm:grid-cols-2",
            steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
            steps.length === 3 && "lg:grid-cols-3",
          )}
        >
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07} as="li">
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

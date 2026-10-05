import * as React from "react";
import { SectionHead } from "@/components/SectionHead";
import { Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
  title: string;
  body: string;
}

interface HowItWorksProps {
  id?: string;
  index?: string;
  label?: string;
  title: string;
  description?: string;
  steps: HowItWorksStep[];
  className?: string;
}

const COLS: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function HowItWorks({
  id = "methode",
  index = "04",
  label = "Notre méthode",
  title,
  description,
  steps,
  className,
}: HowItWorksProps) {
  return (
    <section
      id={id}
      className={cn(
        className ?? "border-b border-border bg-secondary/50 py-20 sm:py-28",
      )}
    >
      <div className="container">
        <SectionHead
          index={index}
          label={label}
          title={title}
          description={description}
        />

        <Stagger
          className={cn(
            "mt-14 grid gap-x-8 gap-y-10",
            COLS[steps.length] ?? "md:grid-cols-4",
          )}
        >
          {steps.map((step, i) => (
            <StaggerItem key={step.title} as="div">
              <div className="border-t-2 border-foreground pt-5">
                <p className="font-mono text-sm text-accent-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

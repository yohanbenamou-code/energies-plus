import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

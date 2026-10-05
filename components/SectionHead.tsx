import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  /** Numéro de section affiché en orange (« 01 »). */
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "light" | "dark";
  /** Masque la description sous 640 px (pages longues sur mobile). */
  descriptionDesktopOnly?: boolean;
  className?: string;
}

/**
 * En-tête de section éditorial : filet, numéro + rubrique à gauche,
 * titre à droite. Remplace le schéma « petit label en capitales + titre ».
 */
export function SectionHead({
  index,
  label,
  title,
  description,
  tone = "light",
  descriptionDesktopOnly = false,
  className,
}: SectionHeadProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "reveal grid gap-2 border-t pt-4 sm:gap-4 sm:pt-5 lg:grid-cols-12 lg:gap-8",
        dark ? "border-white/20" : "border-foreground/20",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-baseline gap-3 text-sm font-medium lg:col-span-3",
          dark ? "text-white/65" : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            dark ? "text-accent" : "text-accent-600",
          )}
        >
          {index}
        </span>
        {label}
      </p>
      <div className="lg:col-span-8">
        <h2
          className={cn(
            "display text-balance text-[1.75rem] sm:text-5xl",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-2xl text-[15px] leading-relaxed sm:mt-6 sm:text-lg",
              descriptionDesktopOnly && "hidden sm:block",
              dark ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

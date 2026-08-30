import * as React from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** délai en secondes */
  delay?: number;
  variant?: RevealVariant;
}

const VARIANT_CLASS: Partial<Record<RevealVariant, string>> = {
  left: "reveal--left",
  right: "reveal--right",
  scale: "reveal--scale",
};

/**
 * Apparition au scroll, pilotée en CSS (voir globals.css + RevealInit).
 * Baseline sans JS : contenu visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  return (
    <div
      className={cn("reveal", VARIANT_CLASS[variant], className)}
      style={delay ? { "--reveal-delay": `${delay}s` } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  );
}

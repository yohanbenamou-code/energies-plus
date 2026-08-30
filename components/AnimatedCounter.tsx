"use client";

import * as React from "react";
import { animate, useReducedMotion } from "framer-motion";
import { formatNumberFr } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Valeur cible. `null` = donnée non communiquée (affiche un tiret). */
  value: number | null;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || value === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    const safety = window.setTimeout(() => setStarted(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [value]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || value === null || !started) return;

    if (reduce) {
      node.textContent = `${prefix}${formatNumberFr(value)}${suffix}`;
      return;
    }

    const final = `${prefix}${formatNumberFr(value)}${suffix}`;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = `${prefix}${formatNumberFr(latest)}${suffix}`;
      },
    });
    // filet de sécurité : impose la valeur finale même si le rAF ne tourne pas
    const safety = window.setTimeout(() => {
      node.textContent = final;
    }, 2200);
    return () => {
      controls.stop();
      window.clearTimeout(safety);
    };
  }, [started, value, prefix, suffix, reduce]);

  if (value === null) {
    return (
      <span className={className} aria-label="Donnée à compléter">
        —
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

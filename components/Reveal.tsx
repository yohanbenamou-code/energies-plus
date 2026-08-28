"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Décalage d'apparition en secondes (pour les grilles). */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Apparition sobre au scroll : léger fade + slide-up, une seule fois.
 * Neutralisé si l'utilisateur a demandé la réduction des animations.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}

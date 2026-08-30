"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const PUNCT = /[.,;:!?"'()’]/g;
const norm = (w: string) => w.toLowerCase().replace(PUNCT, "");

/* -------------------------------------------------------------------------- */
/* Parallax — translation verticale liée au scroll (dégrade en statique)      */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TextReveal — titre révélé mot à mot, en CSS (voir globals.css)             */
/* -------------------------------------------------------------------------- */

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  highlight?: string[];
}) {
  const words = text.split(" ");
  const lower = (highlight ?? []).map(norm);
  const cls = (w: string) =>
    lower.includes(norm(w)) ? "text-brand-gradient" : undefined;

  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className={cn("reveal inline-block", cls(w))}
            style={
              { "--reveal-delay": `${delay + i * 0.045}s` } as React.CSSProperties
            }
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Stagger — révèle ses enfants en cascade (CSS)                              */
/* -------------------------------------------------------------------------- */

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger", className)}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const cls = cn("reveal", className);
  if (as === "li") return <li className={cls}>{children}</li>;
  if (as === "article") return <article className={cls}>{children}</article>;
  return <div className={cls}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/* Aurora — halos de dégradé animés (décoratif, CSS)                          */
/* -------------------------------------------------------------------------- */

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="animate-aurora absolute -left-[10%] -top-[30%] h-[55vh] w-[55vh] rounded-full bg-primary/20 blur-[90px]" />
      <div className="animate-aurora-slow absolute -right-[8%] top-[6%] h-[45vh] w-[45vh] rounded-full bg-accent/20 blur-[90px]" />
      <div className="animate-aurora absolute bottom-[-25%] left-[35%] h-[40vh] w-[40vh] rounded-full bg-primary-200/40 blur-[100px]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ScrollProgressLine — barre fine qui se remplit au scroll (décoratif)      */
/* -------------------------------------------------------------------------- */

export function ScrollProgressLine({
  targetRef,
  className,
  orientation = "horizontal",
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });
  const scaled = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.span
      aria-hidden
      className={cn("block bg-brand-gradient", className)}
      style={
        orientation === "vertical"
          ? { scaleY: scaled, transformOrigin: "top" }
          : { scaleX: scaled, transformOrigin: "left" }
      }
    />
  );
}

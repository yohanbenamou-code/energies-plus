"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* Révélation en cascade des enfants (CSS, voir globals.css + RevealInit). */

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

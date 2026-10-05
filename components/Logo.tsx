import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo Energie+ (fichiers fournis, détourés sur fond transparent).
 * `invert` : version à utiliser sur fond sombre (texte blanc, plus orange).
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Image
      src={invert ? "/logo-white.png" : "/logo.png"}
      alt="Energie+"
      width={900}
      height={274}
      priority
      className={cn("h-8 w-auto", className)}
    />
  );
}

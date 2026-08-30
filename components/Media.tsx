import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaProps {
  /** URL de la photo. TODO: remplacer les placeholders Unsplash par des visuels fournis. */
  src: string;
  alt: string;
  /** ratio CSS, ex "16 / 10", "4 / 5", "1 / 1". Défaut "16 / 10". */
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Applique le voile dégradé de marque par-dessus la photo. */
  treat?: boolean;
  rounded?: string;
}

/**
 * Photo d'illustration : next/image en mode `fill` dans un conteneur au ratio
 * donné, avec un fond dégradé de marque qui reste visible pendant le
 * chargement et un voile optionnel pour homogénéiser les visuels.
 */
export function Media({
  src,
  alt,
  aspect = "16 / 10",
  className,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
  treat = true,
  rounded = "rounded-2xl",
}: MediaProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-brand-gradient",
        treat && "photo-treat",
        rounded,
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

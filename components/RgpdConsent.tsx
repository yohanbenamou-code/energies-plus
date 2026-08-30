import * as React from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface RgpdConsentProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

/** Case de consentement RGPD réutilisée par tous les formulaires. */
export function RgpdConsent({
  id = "rgpd",
  checked,
  onCheckedChange,
  error,
}: RgpdConsentProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className="mt-0.5"
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-muted-foreground">
          J&apos;accepte que mes données soient utilisées par Énergies Plus pour
          être recontacté(e) au sujet de mon projet. Elles ne sont ni revendues
          ni cédées à des tiers.{" "}
          <Link
            href="/politique-de-confidentialite"
            className="underline underline-offset-2 hover:text-foreground"
          >
            En savoir plus
          </Link>
          .
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

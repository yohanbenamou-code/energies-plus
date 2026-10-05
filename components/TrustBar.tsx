import * as React from "react";
import { PlusMark } from "@/components/PlusMark";

/** Bandeau de réassurance sous le hero des pages solution. */
export function TrustBar({ items }: { items: string[] }) {
  return (
    <section
      aria-label="Points de réassurance"
      className="border-b border-border bg-secondary"
    >
      <ul className="container flex flex-wrap items-center gap-x-9 gap-y-2.5 py-4 text-sm font-medium text-foreground">
        {items.map((label) => (
          <li key={label} className="inline-flex items-center gap-2.5">
            <PlusMark className="h-3 w-3 shrink-0 text-accent" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}

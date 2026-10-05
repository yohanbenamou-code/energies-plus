import * as React from "react";

/** Le « + » du logo, réutilisé comme signature graphique. */
export function PlusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <rect x="38" y="0" width="24" height="100" rx="12" />
      <rect x="0" y="38" width="100" height="24" rx="12" />
    </svg>
  );
}

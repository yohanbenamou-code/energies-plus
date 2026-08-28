"use client";

import * as React from "react";

export interface SolutionPrefill {
  structureType?: string;
  /** Clé de variante ("systeme-complet-neuf" | "toiture-couplee") ou "je-ne-sais-pas". */
  projectType?: string;
  productType?: "agricole" | "forestier";
  zone?: "H1" | "H2" | "H3";
  powerKw?: number;
  estimatedCumac?: number;
}

interface SolutionFormContextValue {
  prefill: SolutionPrefill;
  /** Incrémenté à chaque application : sert de dépendance d'effet côté formulaire. */
  nonce: number;
  applyPrefill: (patch: SolutionPrefill) => void;
  scrollToContact: () => void;
}

const SolutionFormContext = React.createContext<SolutionFormContextValue | null>(
  null,
);

export function SolutionFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefill, setPrefill] = React.useState<SolutionPrefill>({});
  const [nonce, setNonce] = React.useState(0);

  const applyPrefill = React.useCallback((patch: SolutionPrefill) => {
    setPrefill((prev) => ({ ...prev, ...patch }));
    setNonce((n) => n + 1);
  }, []);

  const scrollToContact = React.useCallback(() => {
    if (typeof document === "undefined") return;
    const el = document.getElementById("contact");
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      el.scrollIntoView();
    }
  }, []);

  const value = React.useMemo(
    () => ({ prefill, nonce, applyPrefill, scrollToContact }),
    [prefill, nonce, applyPrefill, scrollToContact],
  );

  return (
    <SolutionFormContext.Provider value={value}>
      {children}
    </SolutionFormContext.Provider>
  );
}

export function useSolutionForm(): SolutionFormContextValue {
  const ctx = React.useContext(SolutionFormContext);
  if (!ctx) {
    throw new Error(
      "useSolutionForm doit être utilisé dans <SolutionFormProvider>.",
    );
  }
  return ctx;
}

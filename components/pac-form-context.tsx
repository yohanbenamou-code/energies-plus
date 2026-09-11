"use client";

import * as React from "react";
import type { PacPerformanceClass, PacSectorKey } from "@/lib/pac-calculator";

export interface PacPrefill {
  structureType?: string;
  sector?: PacSectorKey;
  performanceClass?: PacPerformanceClass;
  replacedSystem?: string;
  zone?: "H1" | "H2" | "H3";
  surfaceM2?: number;
  coupDePouce?: boolean;
  estimatedCumac?: number;
}

interface PacFormContextValue {
  prefill: PacPrefill;
  /** Incrémenté à chaque application : sert de dépendance d'effet côté formulaire. */
  nonce: number;
  applyPrefill: (patch: PacPrefill) => void;
  scrollToContact: () => void;
}

const PacFormContext = React.createContext<PacFormContextValue | null>(null);

export function PacFormProvider({ children }: { children: React.ReactNode }) {
  const [prefill, setPrefill] = React.useState<PacPrefill>({});
  const [nonce, setNonce] = React.useState(0);

  const applyPrefill = React.useCallback((patch: PacPrefill) => {
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
    <PacFormContext.Provider value={value}>{children}</PacFormContext.Provider>
  );
}

export function usePacForm(): PacFormContextValue {
  const ctx = React.useContext(PacFormContext);
  if (!ctx) {
    throw new Error("usePacForm doit être utilisé dans <PacFormProvider>.");
  }
  return ctx;
}

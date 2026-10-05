"use client";

import * as React from "react";
import type { MprCategory } from "@/lib/mpr";

export interface SolarPrefill {
  zone?: "H1" | "H2" | "H3";
  panels?: number;
  surfaceM2?: number;
  fossilFree?: boolean;
  estimatedCumac?: number;
}

interface SolarFormContextValue {
  prefill: SolarPrefill;
  /** Incrémenté à chaque application : sert de dépendance d'effet côté formulaire. */
  nonce: number;
  applyPrefill: (patch: SolarPrefill) => void;
  /** Catégorie MaPrimeRénov' du foyer, partagée entre le vérificateur et le simulateur. */
  category: MprCategory | null;
  setCategory: (category: MprCategory | null) => void;
  scrollTo: (id: string) => void;
}

const SolarFormContext = React.createContext<SolarFormContextValue | null>(null);

export function SolarFormProvider({ children }: { children: React.ReactNode }) {
  const [prefill, setPrefill] = React.useState<SolarPrefill>({});
  const [nonce, setNonce] = React.useState(0);
  const [category, setCategory] = React.useState<MprCategory | null>(null);

  const applyPrefill = React.useCallback((patch: SolarPrefill) => {
    setPrefill((prev) => ({ ...prev, ...patch }));
    setNonce((n) => n + 1);
  }, []);

  const scrollTo = React.useCallback((id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      el.scrollIntoView();
    }
  }, []);

  const value = React.useMemo(
    () => ({ prefill, nonce, applyPrefill, category, setCategory, scrollTo }),
    [prefill, nonce, applyPrefill, category, scrollTo],
  );

  return (
    <SolarFormContext.Provider value={value}>
      {children}
    </SolarFormContext.Provider>
  );
}

export function useSolarForm(): SolarFormContextValue {
  const ctx = React.useContext(SolarFormContext);
  if (!ctx) {
    throw new Error("useSolarForm doit être utilisé dans <SolarFormProvider>.");
  }
  return ctx;
}

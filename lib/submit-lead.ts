import { getStoredAttribution } from "@/lib/utm";
import type { LeadFormVariant, LeadSource } from "@/types/lead";

export interface SubmitLeadFields {
  source: LeadSource;
  formVariant: LeadFormVariant;
  telephone: string;
  rgpdConsent: boolean;
  nom?: string;
  prenom?: string;
  email?: string;
  codePostal?: string;
  ville?: string;
  structureType?: string;
  projectType?: string;
  productType?: "agricole" | "forestier";
  powerKw?: number;
  buildingArea?: string;
  message?: string;
  operationCode?: string;
  variantKey?: string;
  zone?: "H1" | "H2" | "H3";
  estimatedCumac?: number;
  /** Honeypot anti-spam : doit rester vide. */
  company_website?: string;
}

export interface SubmitLeadResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/** Poste le lead vers /api/leads en y ajoutant l'attribution stockée. */
export async function submitLead(
  fields: SubmitLeadFields,
): Promise<SubmitLeadResult> {
  const attribution = getStoredAttribution();

  const payload = {
    ...fields,
    company_website: fields.company_website ?? "",
    pageUrl:
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "",
    landingPage: attribution.landingPage,
    referrer: attribution.referrer,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
  };

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        ok: false,
        error:
          res.status === 422
            ? "Certains champs sont invalides. Merci de vérifier votre saisie."
            : "Une erreur est survenue. Merci de réessayer ou de nous appeler.",
      };
    }

    const data = (await res.json()) as { ok: boolean; id?: string };
    return { ok: data.ok, id: data.id };
  } catch {
    return {
      ok: false,
      error:
        "Impossible d'envoyer votre demande (connexion). Merci de réessayer ou de nous appeler.",
    };
  }
}

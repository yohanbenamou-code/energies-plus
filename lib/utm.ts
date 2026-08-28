/**
 * Capture et persistance des paramètres UTM + première page vue.
 *
 * Au chargement d'une page, `captureUtmParams()` lit la query string ; si au
 * moins un paramètre utm_* est présent, l'ensemble est stocké en
 * sessionStorage. Les formulaires relisent ensuite `getStoredAttribution()`
 * pour renvoyer ces valeurs en champs cachés vers /api/leads.
 */

const STORAGE_KEY = "se_attribution";

export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  landingPage: string;
  referrer: string;
}

const EMPTY: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  landingPage: "",
  referrer: "",
};

const UTM_KEYS: Array<[keyof Attribution, string]> = [
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["utmContent", "utm_content"],
  ["utmTerm", "utm_term"],
];

function safeSession(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** À appeler une fois au montage de chaque page (composant client). */
export function captureUtmParams(): Attribution {
  const store = safeSession();
  if (!store) return EMPTY;

  const existingRaw = store.getItem(STORAGE_KEY);
  const existing: Attribution | null = existingRaw
    ? (JSON.parse(existingRaw) as Attribution)
    : null;

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some(([, param]) => params.has(param));

  // Ne pas écraser une attribution déjà capturée (first-touch) sauf si de
  // nouveaux paramètres UTM arrivent.
  if (existing && !hasUtm) return existing;

  const next: Attribution = {
    ...EMPTY,
    ...(existing ?? {}),
    landingPage:
      existing?.landingPage || window.location.pathname + window.location.search,
    referrer: existing?.referrer || document.referrer || "",
  };

  if (hasUtm) {
    for (const [key, param] of UTM_KEYS) {
      next[key] = params.get(param) ?? "";
    }
  }

  try {
    store.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / mode privé : on renvoie quand même la valeur calculée */
  }
  return next;
}

/** Relit l'attribution stockée (retourne des chaînes vides si rien). */
export function getStoredAttribution(): Attribution {
  const store = safeSession();
  if (!store) return EMPTY;
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) };
  } catch {
    return EMPTY;
  }
}

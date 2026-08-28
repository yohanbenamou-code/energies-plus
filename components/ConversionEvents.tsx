"use client";

import * as React from "react";

/**
 * Déclenche les événements de conversion côté client, une seule fois, au
 * chargement de la page /merci.
 *
 * TODO: placeholder à remplacer par Yohan/Solaire Energie —
 * renseigner NEXT_PUBLIC_GADS_CONVERSION_ID + NEXT_PUBLIC_GADS_CONVERSION_LABEL
 * pour activer la conversion Google Ads.
 */
type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

interface TrackingWindow extends Window {
  dataLayer?: unknown[];
  gtag?: Gtag;
  fbq?: Fbq;
}

export function ConversionEvents() {
  React.useEffect(() => {
    const w = window as TrackingWindow;

    // Google Tag Manager : événement personnalisé
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "lead_submitted", form: "solaire-energie" });

    // Meta Pixel : événement standard "Lead"
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead");
    }

    // Google Ads : conversion (si ID + label fournis)
    const gadsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
    const gadsLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
    if (typeof w.gtag === "function" && gadsId && gadsLabel) {
      w.gtag("event", "conversion", {
        send_to: `${gadsId}/${gadsLabel}`,
      });
    }
  }, []);

  return null;
}

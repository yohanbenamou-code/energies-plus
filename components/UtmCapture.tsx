"use client";

import * as React from "react";
import { captureUtmParams } from "@/lib/utm";

/** Capture les paramètres UTM au chargement (voir lib/utm.ts). */
export function UtmCapture() {
  React.useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}

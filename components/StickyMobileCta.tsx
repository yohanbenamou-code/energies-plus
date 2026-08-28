"use client";

import * as React from "react";
import { PhoneCall } from "lucide-react";
import { CallbackDialog } from "@/components/CallbackDialog";
import { site } from "@/data/site";
import type { LeadSource } from "@/types/lead";

interface StickyMobileCtaProps {
  source: LeadSource;
  operationCode?: string;
}

/** Barre d'action flottante, visible uniquement sur mobile. */
export function StickyMobileCta({ source, operationCode }: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <a
          href={site.contact.phoneHref}
          className="flex h-11 flex-1 items-center justify-center rounded-md border border-input text-sm font-semibold text-foreground"
        >
          Appeler
        </a>
        <CallbackDialog
          source={source}
          operationCode={operationCode}
          trigger={
            <button
              type="button"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-accent text-sm font-bold text-accent-foreground"
            >
              <PhoneCall className="h-4 w-4" /> Être rappelé
            </button>
          }
        />
      </div>
    </div>
  );
}

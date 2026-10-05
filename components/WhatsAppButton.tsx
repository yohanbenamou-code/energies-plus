"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/data/site";

function messageFor(pathname: string): string {
  if (pathname.includes("agri-eq-110"))
    return "Bonjour, je souhaite en savoir plus sur le séchage solaire et les aides CEE (fiche AGRI-EQ-110).";
  if (pathname.includes("bat-th-163"))
    return "Bonjour, je souhaite en savoir plus sur la pompe à chaleur pour mon bâtiment et les aides CEE (fiche BAT-TH-163).";
  if (pathname.includes("bar-th-168"))
    return "Bonjour, je souhaite vérifier mon éligibilité à la pompe à chaleur et au solaire pour ma maison (fiche BAR-TH-168).";
  return "Bonjour, je souhaite en savoir plus sur les aides CEE pour mon projet.";
}

/**
 * Bouton WhatsApp flottant, présent sur toutes les pages. Ouvre une
 * conversation avec le numéro de l'entreprise et un message pré-rempli adapté
 * à la page. Sur mobile il se place au-dessus de la barre d'action fixe.
 */
export function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const href = `${site.contact.whatsappUrl}?text=${encodeURIComponent(messageFor(pathname))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Nous écrire sur WhatsApp au ${site.contact.phoneDisplay}`}
      className="group fixed bottom-24 right-4 z-30 inline-flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-[0.9rem] text-white shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-5 lg:bottom-6 lg:right-6"
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0" />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  );
}

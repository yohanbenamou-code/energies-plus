import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { UtmCapture } from "@/components/UtmCapture";
import { ScrollProgress } from "@/components/ScrollProgress";
import { RevealInit } from "@/components/RevealInit";
import { site } from "@/data/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.energies-plus.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Énergies Plus — Le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés",
    template: "%s | Énergies Plus",
  },
  description:
    "Énergies Plus accompagne les particuliers et les professionnels sur les opérations CEE : vérification d'éligibilité, montage du dossier avant devis, suivi jusqu'aux travaux. Catalogue des fiches CEE les plus courantes.",
  applicationName: "Énergies Plus",
  keywords: [
    "Certificats d'Économies d'Énergie",
    "prime CEE",
    "dispositif CEE",
    "fiche CEE",
    "opération standardisée CEE",
    "prime énergie",
    "CEE agriculture",
    "CEE industrie",
    "CEE tertiaire",
  ],
  authors: [{ name: "Énergies Plus" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Énergies Plus",
    title:
      "Énergies Plus — Les Certificats d'Économies d'Énergie, transformés en travaux financés",
    description:
      "Vérification d'éligibilité, montage du dossier d'aide CEE avant devis, suivi jusqu'aux travaux. Résidentiel, tertiaire, industrie, agriculture, réseaux, transport.",
    // Image Open Graph générée par app/opengraph-image.tsx (bloc-marque Énergies Plus).
  },
  twitter: {
    card: "summary_large_image",
    title: "Énergies Plus — Les aides CEE, en clair",
    description:
      "Le dispositif public des Certificats d'Économies d'Énergie, transformé en travaux financés.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        <RevealInit />
        {children}
        <UtmCapture />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.legal.companyName,
              legalName: site.legal.companyName,
              url: siteUrl,
              description: site.privateActorShort,
              telephone: site.contact.phoneHref.replace("tel:", ""),
              email: site.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "27 avenue de Paris",
                postalCode: "94300",
                addressLocality: "Vincennes",
                addressCountry: "FR",
              },
              areaServed: "FR",
              sameAs: [
                site.socials.linkedin,
                site.socials.facebook,
                site.socials.youtube,
              ].filter(Boolean),
            }),
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { UtmCapture } from "@/components/UtmCapture";
import { RevealInit } from "@/components/RevealInit";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/data/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.energies-plus.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Energie+ : le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés",
    template: "%s | Energie+",
  },
  description:
    "Energie+ accompagne les particuliers et les professionnels sur les opérations CEE : vérification d'éligibilité, montage du dossier avant devis, suivi jusqu'aux travaux. Catalogue des fiches CEE les plus courantes.",
  applicationName: "Energie+",
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
  authors: [{ name: "Energie+" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Energie+",
    title:
      "Energie+ : les Certificats d'Économies d'Énergie, transformés en travaux financés",
    description:
      "Vérification d'éligibilité, montage du dossier d'aide CEE avant devis, suivi jusqu'aux travaux. Résidentiel, tertiaire, industrie, agriculture, réseaux, transport.",
    // Image Open Graph générée par app/opengraph-image.tsx (bloc-marque Energie+).
  },
  twitter: {
    card: "summary_large_image",
    title: "Energie+ : les aides CEE, en clair",
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
      className={`${manrope.variable} ${bricolage.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Aller au contenu
        </a>
        <RevealInit />
        {children}
        <WhatsAppButton />
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
                streetAddress: "187 rue de Courcelles",
                postalCode: "75017",
                addressLocality: "Paris",
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

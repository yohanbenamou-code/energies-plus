import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.energies-plus.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Énergies Plus — Aides CEE pour le séchage solaire agricole et forestier",
    template: "%s | Énergies Plus",
  },
  description:
    "Énergies Plus vérifie l'éligibilité de votre projet de séchage solaire, monte votre dossier d'aide CEE avant la signature du devis et vous accompagne jusqu'à l'installation.",
  applicationName: "Énergies Plus",
  keywords: [
    "séchage solaire agricole",
    "aide CEE agriculture",
    "prime séchage solaire",
    "panneaux solaires hybrides séchage",
    "séchage foin fourrage solaire",
    "séchage bois scierie",
    "Certificats d'Économies d'Énergie agriculture",
  ],
  authors: [{ name: "Énergies Plus" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Énergies Plus",
    title:
      "Énergies Plus — Aides CEE pour le séchage solaire agricole et forestier",
    description:
      "Vérification d'éligibilité, montage du dossier d'aide CEE avant devis, accompagnement jusqu'à l'installation.",
    // TODO: placeholder à remplacer par Yohan/Énergies Plus — image Open Graph (1200x630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Énergies Plus — Aides CEE séchage solaire",
    description:
      "Séchez vos récoltes au soleil, financé par le dispositif public des Certificats d'Économies d'Énergie.",
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
    <html lang="fr" className={manrope.variable}>
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
              // TODO: placeholder à remplacer par Yohan/Énergies Plus (logo, sameAs réseaux sociaux)
            }),
          }}
        />
      </body>
    </html>
  );
}

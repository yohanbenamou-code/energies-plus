import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { UtmCapture } from "@/components/UtmCapture";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.solaire-energie.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Solaire Energie — Certificats d'Économies d'Énergie pour l'agriculture et la forêt",
    template: "%s | Solaire Energie",
  },
  description:
    "Solaire Energie qualifie votre projet sur le catalogue officiel des opérations CEE, monte votre dossier avant la signature du devis et vous accompagne jusqu'à l'installation d'un système de séchage solaire par insufflation d'air.",
  applicationName: "Solaire Energie",
  keywords: [
    "séchage solaire agricole",
    "CEE agriculture",
    "panneaux solaires hybrides séchage",
    "AGRI-EQ-110",
    "Certificats d'Économies d'Énergie",
    "séchage fourrage solaire",
    "séchage bois scierie",
  ],
  authors: [{ name: "Solaire Energie" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Solaire Energie",
    title:
      "Solaire Energie — Certificats d'Économies d'Énergie pour l'agriculture et la forêt",
    description:
      "Qualification de votre projet sur le catalogue officiel des opérations CEE, montage du dossier avant devis, accompagnement jusqu'à l'installation.",
    // TODO: placeholder à remplacer par Yohan/Solaire Energie — image Open Graph (1200x630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Solaire Energie — CEE agriculture & forêt",
    description:
      "Séchage solaire par insufflation d'air financé par les Certificats d'Économies d'Énergie.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Aller au contenu
        </a>
        {children}
        <UtmCapture />
        <Analytics />
        {/* JSON-LD Organization : présent sur toutes les pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.legal.companyName,
              url: siteUrl,
              description: site.privateActorShort,
              areaServed: "FR",
              // TODO: placeholder à remplacer par Yohan/Solaire Energie
              // (logo, sameAs réseaux sociaux, telephone, address)
            }),
          }}
        />
      </body>
    </html>
  );
}

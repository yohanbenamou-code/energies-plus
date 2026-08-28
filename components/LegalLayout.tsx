import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

const NAV = [
  { label: "Nos opérations CEE", href: "/#operations" },
  { label: "Notre méthode", href: "/#methode" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header nav={NAV} ctaLabel="Faire qualifier mon projet" ctaHref="/#contact" />
      <main id="contenu" className="bg-background py-16">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <div className="prose-legal mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
            {children}
          </div>
          <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            {site.legalMention}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

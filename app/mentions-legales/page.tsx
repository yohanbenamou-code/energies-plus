import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <p className="rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
        TODO : placeholder à remplacer par Yohan/Énergies Plus — cette page doit
        être complétée avec les informations légales réelles avant mise en ligne.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        {site.legal.companyName} — {site.legal.address}
        <br />
        SIRET : {site.legal.siret}
        <br />
        {site.legal.rcs}
        <br />
        Téléphone : {site.contact.phoneDisplay} — Email : {site.contact.email}
      </p>
      <p>TODO : forme juridique, capital social, numéro de TVA intracommunautaire, directeur de la publication.</p>

      <h2>Hébergement</h2>
      <p>TODO : nom, raison sociale, adresse et téléphone de l&apos;hébergeur.</p>

      <h2>Assurance</h2>
      <p>{site.legal.insurance}</p>

      <h2>Nature de l&apos;activité</h2>
      <p>{site.legalMention}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site est protégé. Aucun symbole
        officiel de la République française n&apos;est utilisé : Énergies Plus
        est une entreprise privée.
      </p>
    </LegalLayout>
  );
}

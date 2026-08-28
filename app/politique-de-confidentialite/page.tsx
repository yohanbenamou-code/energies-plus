import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD)",
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité (RGPD)">
      <p className="rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
        TODO : placeholder à remplacer par Yohan/Solaire Energie — à faire valider
        juridiquement avant mise en ligne.
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        {site.legal.companyName} — {site.legal.address}. Contact :{" "}
        {site.contact.email}.
      </p>

      <h2>Données collectées</h2>
      <p>
        Via les formulaires du site : identité (nom, prénom), coordonnées
        (téléphone, email, code postal, ville), informations relatives à votre
        structure et à votre projet de séchage, ainsi que des données techniques
        (paramètres UTM, page d&apos;origine) à des fins de suivi commercial.
      </p>

      <h2>Finalité</h2>
      <p>
        Traiter votre demande, vous recontacter au sujet de votre projet et
        assurer le suivi de l&apos;accompagnement. Les données ne sont ni
        revendues ni cédées à des tiers à des fins commerciales.
      </p>

      <h2>Base légale</h2>
      <p>Votre consentement, recueilli lors de la soumission du formulaire.</p>

      <h2>Durée de conservation</h2>
      <p>TODO : préciser la durée (par ex. 3 ans à compter du dernier contact).</p>

      <h2>Destinataires</h2>
      <p>
        Les équipes de {site.legal.companyName} et, le cas échéant, les
        installateurs partenaires strictement nécessaires à la réalisation de
        votre projet. TODO : lister les sous-traitants (hébergeur, outil
        d&apos;emailing, CRM…).
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, d&apos;opposition et de portabilité. Pour les exercer,
        écrivez à {site.contact.email}. Vous pouvez également introduire une
        réclamation auprès de la CNIL.
      </p>

      <h2>Cookies et mesure d&apos;audience</h2>
      <p>
        TODO : décrire les traceurs réellement déposés (Google Tag Manager, Meta
        Pixel, Google Ads) et le mécanisme de recueil du consentement.
      </p>
    </LegalLayout>
  );
}

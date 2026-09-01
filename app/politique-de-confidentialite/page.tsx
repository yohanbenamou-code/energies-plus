import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD)",
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  const { legal, host, contact } = site;

  return (
    <LegalLayout title="Politique de confidentialité (RGPD)">
      <p className="rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
        Document rédigé sur la base du fonctionnement réel du site. À faire
        valider par un conseil juridique et à ajuster si les outils utilisés
        (CRM, emailing, mesure d&apos;audience) évoluent.
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        {legal.companyName} — {legal.address}. Contact : {contact.email},{" "}
        {contact.phoneDisplay}.
      </p>

      <h2>Données collectées</h2>
      <p>
        Via les formulaires du site : identité (nom, prénom), coordonnées
        (téléphone, email, code postal, ville), informations relatives à votre
        structure et à votre projet, ainsi que des données techniques
        (paramètres UTM, page d&apos;origine, date de la demande) à des fins de
        suivi commercial. Aucune donnée sensible n&apos;est demandée.
      </p>

      <h2>Finalité</h2>
      <p>
        Traiter votre demande, vérifier l&apos;éligibilité de votre projet au
        dispositif CEE, vous recontacter et assurer le suivi de
        l&apos;accompagnement. Les données ne sont ni revendues ni cédées à des
        tiers à des fins commerciales.
      </p>

      <h2>Base légale</h2>
      <p>
        Votre consentement, recueilli lors de la soumission du formulaire (case à
        cocher), et l&apos;intérêt légitime d&apos;{legal.companyName} à répondre
        à une demande de contact.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données des prospects sont conservées 3 ans à compter du dernier
        contact resté sans suite, conformément aux recommandations de la CNIL.
        Les données des clients sont conservées pendant la durée de la relation
        contractuelle puis archivées selon les obligations légales applicables.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Les données sont traitées par les équipes d&apos;{legal.companyName} et,
        le cas échéant, par les installateurs partenaires strictement nécessaires
        à la réalisation de votre projet.
      </p>
      <p>Sous-traitants techniques mobilisés pour le fonctionnement du site :</p>
      <ul>
        <li>
          <strong>{host.name}</strong> ({host.address}) — hébergement du site et
          journaux techniques. Transfert hors UE encadré par les clauses
          contractuelles types de la Commission européenne.
        </li>
        <li>
          Le cas échéant, un service d&apos;envoi d&apos;emails transactionnels
          et/ou une base de données managée pour l&apos;acheminement des
          demandes (à préciser selon la configuration retenue).
        </li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, de limitation, d&apos;opposition et de portabilité.
        Pour les exercer, écrivez à {contact.email}. Vous pouvez également
        introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr">www.cnil.fr</a>).
      </p>

      <h2>Cookies et mesure d&apos;audience</h2>
      <p>
        En l&apos;état, le site ne dépose aucun cookie de mesure d&apos;audience
        ni de publicité : seules des données strictement nécessaires à son
        fonctionnement sont utilisées. Si des outils de suivi (Google Tag
        Manager, Meta Pixel, Google Ads) sont activés ultérieurement, un bandeau
        de recueil du consentement conforme aux lignes directrices de la CNIL
        sera mis en place et cette section sera mise à jour en conséquence.
      </p>
    </LegalLayout>
  );
}

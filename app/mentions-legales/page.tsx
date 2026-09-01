import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  const { legal, host, contact } = site;
  const missing: string[] = [];
  if (!legal.legalForm || !legal.capital)
    missing.push("forme juridique et capital social");
  if (!legal.publicationDirector) missing.push("directeur de la publication");
  if (!legal.insurer) missing.push("coordonnées de l'assureur");

  return (
    <LegalLayout title="Mentions légales">
      {missing.length > 0 ? (
        <p className="rounded-lg border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground">
          À compléter par Énergies Plus avant communication large :{" "}
          {missing.join(", ")}. Le reste des informations ci-dessous est à jour.
        </p>
      ) : null}

      <h2>Éditeur du site</h2>
      <p>
        <strong>{legal.companyName}</strong>
        {legal.legalForm ? ` — ${legal.legalForm}` : null}
        {legal.capital ? ` au capital de ${legal.capital}` : null}
        <br />
        Siège social : {legal.address}
        <br />
        SIREN : {legal.siren} — SIRET (siège) : {legal.siret}
        <br />
        {legal.rcs}
        <br />
        N° TVA intracommunautaire : {legal.vat}
        <br />
        Téléphone : {contact.phoneDisplay} — Email : {contact.email}
      </p>
      <p>
        Directeur de la publication :{" "}
        {legal.publicationDirector || (
          <em>représentant légal d&apos;{legal.companyName} (à préciser)</em>
        )}
        .
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par <strong>{host.name}</strong>, {host.address}.
        <br />
        Site : <a href={host.url}>{host.url}</a> — Contact : {host.contact}
      </p>

      <h2>Assurance</h2>
      <p>
        {legal.companyName} est titulaire d&apos;une assurance de responsabilité
        civile professionnelle couvrant son activité.
        {legal.insurer ? (
          <>
            {" "}
            Assureur : {legal.insurer}
            {legal.insurancePolicy
              ? ` (police n° ${legal.insurancePolicy})`
              : null}
            . Couverture géographique : {legal.insuranceArea}.
          </>
        ) : (
          <>
            {" "}
            <em>
              Coordonnées de l&apos;assureur et numéro de police à compléter.
            </em>
          </>
        )}
      </p>

      <h2>Nature de l&apos;activité</h2>
      <p>{site.legalMention}</p>
      <p>
        Les montants exprimés en euros sur ce site sont des estimations non
        contractuelles, communiquées sous réserve d&apos;éligibilité. Seuls les
        volumes en kWh cumac correspondent aux barèmes officiels des opérations
        standardisées du dispositif CEE.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, éléments graphiques,
        logo) est protégé. Aucun symbole officiel de la République française
        (Marianne, bloc-marque « République française ») n&apos;est utilisé :{" "}
        {legal.companyName} est une entreprise privée, indépendante de
        l&apos;État et des pouvoirs publics.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données collectées via les formulaires est décrit dans
        la <a href="/politique-de-confidentialite">politique de confidentialité</a>
        . Pour toute demande relative à vos données : {contact.email}.
      </p>
    </LegalLayout>
  );
}

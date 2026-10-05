import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

const MPR = [
  "Maison de plus de 15 ans",
  "Maison individuelle",
  "Propriétaire occupant (résidence principale) ou propriétaire bailleur",
  "Aucune demande MaPrimeRénov' en cours",
  "Accès au compte MaPrimeRénov' (e-mail et mot de passe, ou identité numérique)",
];

const CEE = [
  "Maison de plus de 2 ans",
  "Maison individuelle",
  "Propriétaire occupant, résidence secondaire, bailleur ou locataire",
];

const HOUSING = [
  "Chauffée uniquement au gaz, au fioul ou au charbon : la chaudière est remplacée par la pompe à chaleur et déposée",
  "Aucune pompe à chaleur déjà installée",
  "Chauffage central à eau (radiateurs ou plancher chauffant), compatible basse température",
  "Toit pouvant accueillir au moins 8 m² de capteurs, sans orientation spécifique exigée",
  "Place pour le ballon de stockage (environ 420 L, 94 × 81 cm, 1,75 m de haut) et la pompe à chaleur",
];

const NOT_ELIGIBLE = [
  "Appartement, ou maison de moins de 2 ans",
  "Maison tout électrique (convecteurs, radiateurs électriques)",
  "Maison déjà équipée d'une pompe à chaleur",
  "Souhait de conserver la chaudière en secours",
  "Résidence secondaire, pour un dossier MaPrimeRénov'",
  "Dossier MaPrimeRénov' déjà déposé pour le logement",
  "Toit trop petit ou trop encombré, secteur protégé (ABF)",
];

const DOCS_MPR = [
  "Avis d'imposition",
  "Taxe foncière, acte notarié ou attestation notariale (si la taxe foncière indique deux adresses différentes : acte notarié complet, avec sceau et signature du notaire)",
  "Si le logement est détenu par une SCI : un commodat",
  "Si l'avis d'imposition n'est pas à l'adresse des travaux : récépissé de changement d'adresse délivré par les impôts",
];

const DOCS_CEE = [
  "Avis d'imposition",
  "Si l'avis d'imposition n'est pas à l'adresse des travaux : récépissé de changement d'adresse délivré par les impôts",
];

const INFOS = [
  ["Date de naissance", ""],
  ["Surfaces", "Habitable et chauffée, en m²"],
  ["Émetteurs", "Fonte, acier, aluminium… ou plancher chauffant"],
  ["Hauteur sous plafond", ""],
  ["Année de construction", ""],
  ["Isolation", "Combles, murs, sous-sol : oui ou non, et depuis quand"],
  ["Électricité", "Monophasé ou triphasé"],
  ["Configuration", "Maison à étage ou de plain-pied"],
  ["Chauffage actuel", ""],
  ["Surface de toiture disponible", "Indispensable pour le calepinage"],
];

function Column({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note?: string;
}) {
  return (
    <div>
      <h3 className="display text-2xl text-foreground">{title}</h3>
      <ul className="list-plus mt-5 space-y-3 text-[15px] leading-relaxed text-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note ? (
        <p className="mt-5 text-sm font-semibold text-accent-700">{note}</p>
      ) : null}
    </div>
  );
}

export function SolarEligibility({ index = "02" }: { index?: string }) {
  return (
    <section
      id="solutions"
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Éligibilité"
          title="Votre maison est-elle concernée ?"
          description="Deux dossiers peuvent être montés, MaPrimeRénov' et CEE, avec des critères différents. Nos conseillers choisissent avec vous le financement adapté."
        />

        <Reveal className="mt-8 sm:mt-14 grid gap-12 border-t border-foreground/20 pt-10 lg:grid-cols-3 lg:gap-10">
          <Column
            title="Dossier MaPrimeRénov'"
            items={MPR}
            note="Pas de résidence secondaire."
          />
          <Column title="Dossier CEE" items={CEE} />
          <Column title="Votre logement" items={HOUSING} />
        </Reveal>

        <Reveal className="mt-8 sm:mt-12 border-t border-foreground/20 pt-10 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="display text-2xl text-foreground">
              Cas où le projet n&apos;est pas réalisable
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Mieux vaut le savoir dès le premier échange. Votre conseiller le
              vérifie avec vous en quelques questions.
            </p>
          </div>
          <ul className="mt-6 grid gap-x-10 gap-y-3 text-[15px] leading-relaxed text-foreground sm:grid-cols-2 lg:col-span-8 lg:mt-0">
            {NOT_ELIGIBLE.map((item) => (
              <li
                key={item}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:font-bold before:text-destructive before:content-['×']"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function SolarDocuments({ index = "04" }: { index?: string }) {
  return (
    <section
      id="dossier"
      className="border-b border-border bg-background py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Votre dossier"
          title="Ce qu'il faut préparer"
          description="Transmettez l'ensemble des pièces dès la création du dossier : un dossier complet est traité rapidement et sans relance. Documents lisibles, non flous, idéalement au format PDF."
        />

        <div className="mt-8 sm:mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="space-y-10 lg:col-span-5">
            <div>
              <h3 className="display text-2xl text-foreground">
                Dossier MaPrimeRénov&apos;
              </h3>
              <ul className="list-plus mt-4 space-y-3 text-[15px] leading-relaxed text-foreground">
                {DOCS_MPR.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="display text-2xl text-foreground">Dossier CEE</h3>
              <ul className="list-plus mt-4 space-y-3 text-[15px] leading-relaxed text-foreground">
                {DOCS_CEE.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="left" className="lg:col-span-6 lg:col-start-7">
            <h3 className="display text-2xl text-foreground">
              Les informations à nous communiquer
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Recueillies lors du premier échange, avant la demande de
              subvention et l&apos;édition du devis.
            </p>
            <ol className="mt-5 border-t border-foreground/20">
              {INFOS.map(([label, hint], i) => (
                <li
                  key={label}
                  className="flex items-baseline gap-5 border-b border-foreground/20 py-3"
                >
                  <span className="font-mono text-sm text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">{label}</span>
                    {hint ? (
                      <span className="block text-sm text-muted-foreground">
                        {hint}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

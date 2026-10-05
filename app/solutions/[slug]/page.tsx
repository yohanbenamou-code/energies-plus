import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/components/SolutionLanding";
import { PacLanding } from "@/components/PacLanding";
import { SolarLanding } from "@/components/SolarLanding";
import { getLiveOperations, getOperationBySlug } from "@/data/operations";
import { isLiveOperation } from "@/types/operation";

interface PageProps {
  params: { slug: string };
}

const AGRI_SLUG = "agri-eq-110-sechage-solaire-agricole";
const PAC_SLUG = "bat-th-163-pompe-a-chaleur-air-eau-tertiaire";
const SOLAR_SLUG = "bar-th-168-pompe-a-chaleur-solaire-maison-individuelle";

export function generateStaticParams() {
  return getLiveOperations().map((operation) => ({ slug: operation.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const operation = getOperationBySlug(params.slug);
  if (!operation) {
    return { title: "Solution introuvable" };
  }

  if (params.slug === SOLAR_SLUG) {
    const title =
      "Pompe à chaleur et solaire pour maison individuelle (BAR-TH-168) : MaPrimeRénov' et CEE";
    const description = `${operation.heroSubtitle ?? operation.shortDescription} Étude d'éligibilité gratuite et accompagnement de A à Z.`;
    return {
      title,
      description,
      keywords: [
        "pompe à chaleur et solaire",
        "BAR-TH-168",
        "système solaire combiné",
        "MaPrimeRénov' pompe à chaleur",
        "remplacement chaudière fioul gaz",
        "CEE maison individuelle",
      ],
      alternates: { canonical: `/solutions/${operation.slug}` },
      openGraph: {
        type: "article",
        title,
        description,
        url: `/solutions/${operation.slug}`,
      },
    };
  }

  if (params.slug === PAC_SLUG) {
    const title =
      "Pompe à chaleur tertiaire (BAT-TH-163) : l'aide CEE, expliquée simplement";
    const description = `${operation.heroSubtitle ?? operation.shortDescription} Estimation gratuite et accompagnement de A à Z.`;
    return {
      title,
      description,
      keywords: [
        "pompe à chaleur tertiaire",
        "BAT-TH-163",
        "CEE pompe à chaleur",
        "coup de pouce chauffage",
        "PAC air eau tertiaire",
        "remplacement chaudière fioul gaz",
      ],
      alternates: { canonical: `/solutions/${operation.slug}` },
      openGraph: {
        type: "article",
        title,
        description,
        url: `/solutions/${operation.slug}`,
      },
    };
  }

  const title =
    "Séchage solaire agricole et forestier : l'aide CEE, expliquée simplement";
  const description = `${operation.heroSubtitle ?? operation.shortDescription} Estimation gratuite et accompagnement de A à Z.`;

  return {
    title,
    description,
    keywords: [
      "séchage solaire agricole",
      "AGRI-EQ-110",
      "CEE agriculture",
      "panneaux solaires hybrides séchage",
      "séchage fourrage",
      "séchage bois scierie",
    ],
    alternates: { canonical: `/solutions/${operation.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/solutions/${operation.slug}`,
    },
  };
}

export default function SolutionPage({ params }: PageProps) {
  const operation = getOperationBySlug(params.slug);

  if (!operation || operation.status !== "live") {
    notFound();
  }

  if (params.slug === SOLAR_SLUG) {
    return <SolarLanding />;
  }

  if (params.slug === PAC_SLUG) {
    return <PacLanding />;
  }

  if (params.slug === AGRI_SLUG && isLiveOperation(operation)) {
    return <SolutionLanding operation={operation} />;
  }

  notFound();
}

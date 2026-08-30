import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/components/SolutionLanding";
import { getLiveOperations, getOperationBySlug } from "@/data/operations";
import { isLiveOperation } from "@/types/operation";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getLiveOperations().map((operation) => ({ slug: operation.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const operation = getOperationBySlug(params.slug);
  if (!operation) {
    return { title: "Solution introuvable" };
  }

  const title =
    "Séchage solaire agricole & forestier — l'aide CEE, expliquée simplement";
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

  if (!operation || !isLiveOperation(operation)) {
    notFound();
  }

  return <SolutionLanding operation={operation} />;
}

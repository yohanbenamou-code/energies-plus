import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/components/SolutionLanding";
import { getLiveOperations, getOperationBySlug } from "@/data/operations";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  // Seules les opérations "live" disposent d'une page dédiée complète.
  return getLiveOperations().map((operation) => ({ slug: operation.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const operation = getOperationBySlug(params.slug);
  if (!operation) {
    return { title: "Solution introuvable" };
  }

  const title = `${operation.code} — Séchage solaire agricole & forestier | Financement CEE`;
  const description = `${operation.heroSubtitle} Simulateur CEE, étude gratuite et accompagnement Solaire Energie.`;

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

  return <SolutionLanding operation={operation} />;
}

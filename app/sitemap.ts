import type { MetadataRoute } from "next";
import { getLiveOperations } from "@/data/operations";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.energies-plus.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getLiveOperations().map((operation) => ({
      url: `${siteUrl}/solutions/${operation.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${siteUrl}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${siteUrl}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}

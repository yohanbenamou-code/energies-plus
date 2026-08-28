import { z } from "zod";

/** Origine du lead (quelle page a généré la conversion). */
export const leadSourceSchema = z.enum(["homepage", "agri-eq-110"]);
export type LeadSource = z.infer<typeof leadSourceSchema>;

/** Quel formulaire a été soumis. */
export const leadFormVariantSchema = z.enum([
  "quick", // formulaire court homepage / CTA final
  "multi-step", // formulaire 4 étapes page solution
  "callback", // encart basse friction "être rappelé"
]);
export type LeadFormVariant = z.infer<typeof leadFormVariantSchema>;

const optionalString = (max: number) =>
  z.string().trim().max(max).optional().default("");

/**
 * Schéma unique partagé client / serveur pour le payload envoyé à
 * /api/leads. Volontairement permissif : seuls le téléphone et le
 * consentement RGPD sont réellement obligatoires côté API, car l'encart
 * "être rappelé" ne collecte que le téléphone. La validation stricte
 * par formulaire est faite côté composant (react-hook-form + zod).
 */
export const leadSchema = z.object({
  // Identité / contact
  nom: optionalString(120),
  prenom: optionalString(120),
  email: z
    .string()
    .trim()
    .max(180)
    .email("Adresse email invalide")
    .optional()
    .or(z.literal(""))
    .transform((v) => v ?? ""),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide")
    .max(30, "Numéro de téléphone invalide"),
  codePostal: optionalString(10),
  ville: optionalString(120),

  // Qualification projet
  structureType: optionalString(120),
  projectType: optionalString(120),
  productType: z.enum(["agricole", "forestier"]).optional(),
  powerKw: z.coerce.number().nonnegative().max(100000).optional(),
  buildingArea: optionalString(60),
  message: optionalString(4000),

  // Consentement
  rgpdConsent: z.boolean().refine((v) => v === true, {
    message: "Le consentement RGPD est obligatoire.",
  }),

  // Contexte / attribution
  source: leadSourceSchema.default("homepage"),
  formVariant: leadFormVariantSchema.default("quick"),
  operationCode: optionalString(40),
  variantKey: optionalString(60),
  zone: z.enum(["H1", "H2", "H3"]).optional(),
  estimatedCumac: z.coerce.number().nonnegative().max(1_000_000_000).optional(),

  pageUrl: optionalString(400),
  landingPage: optionalString(400),
  referrer: optionalString(400),
  utmSource: optionalString(160),
  utmMedium: optionalString(160),
  utmCampaign: optionalString(200),
  utmContent: optionalString(200),
  utmTerm: optionalString(200),

  // Anti-spam : champ piège, doit rester vide.
  company_website: optionalString(200),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Lead enrichi côté serveur, tel qu'il est transmis au LeadSink. */
export interface Lead extends LeadInput {
  id: string;
  createdAt: string; // ISO 8601
  userAgent: string;
  ip: string;
}

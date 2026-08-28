"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RgpdConsent } from "@/components/RgpdConsent";
import { STRUCTURE_TYPES } from "@/data/form-options";
import { submitLead } from "@/lib/submit-lead";
import type { LeadSource } from "@/types/lead";

const schema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom."),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^[0-9 +().-]{8,}$/, "Numéro de téléphone invalide."),
  email: z.string().trim().email("Adresse email invalide."),
  structureType: z.string().min(1, "Merci de sélectionner votre type de structure."),
  message: z.string().trim().max(2000).optional().default(""),
  rgpdConsent: z
    .boolean()
    .refine((v) => v === true, "Le consentement RGPD est obligatoire."),
  company_website: z.string().max(0).optional().default(""),
});

type FormValues = z.input<typeof schema>;

interface QuickLeadFormProps {
  source: LeadSource;
  /** operationCode transmis avec le lead (contexte). */
  operationCode?: string;
  className?: string;
}

export function QuickLeadForm({
  source,
  operationCode,
  className,
}: QuickLeadFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: "",
      telephone: "",
      email: "",
      structureType: "",
      message: "",
      company_website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitLead({
      source,
      formVariant: "quick",
      operationCode,
      nom: values.nom,
      telephone: values.telephone,
      email: values.email,
      structureType: values.structureType,
      message: values.message,
      rgpdConsent: true,
      company_website: values.company_website,
    });

    if (result.ok) {
      router.push("/merci");
    } else {
      setServerError(result.error ?? "Une erreur est survenue.");
    }
  });

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="q-nom">Nom / raison sociale</Label>
          <Input id="q-nom" autoComplete="organization" {...register("nom")} className="mt-1.5" />
          {errors.nom ? (
            <p className="mt-1 text-sm text-destructive">{errors.nom.message}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="q-tel">Téléphone</Label>
          <Input
            id="q-tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register("telephone")}
            className="mt-1.5"
          />
          {errors.telephone ? (
            <p className="mt-1 text-sm text-destructive">
              {errors.telephone.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="q-email">Email</Label>
          <Input
            id="q-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="mt-1.5"
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="q-structure">Type de structure</Label>
          <select
            id="q-structure"
            {...register("structureType")}
            className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Sélectionnez…</option>
            {STRUCTURE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.structureType ? (
            <p className="mt-1 text-sm text-destructive">
              {errors.structureType.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="q-message">Votre projet en quelques mots (optionnel)</Label>
          <Textarea id="q-message" {...register("message")} className="mt-1.5" />
        </div>

        {/* Honeypot anti-spam : caché aux humains */}
        <div aria-hidden className="hidden">
          <label htmlFor="q-company-website">Ne pas remplir</label>
          <input
            id="q-company-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="rgpdConsent"
            render={({ field }) => (
              <RgpdConsent
                id="q-rgpd"
                checked={field.value === true}
                onCheckedChange={field.onChange}
                error={errors.rgpdConsent?.message}
              />
            )}
          />
        </div>
      </div>

      {serverError ? (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="mt-5 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Envoi…
          </>
        ) : (
          "Faire qualifier mon projet"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Réponse d&apos;un conseiller sous 24–48h ouvrées. Aucun engagement.
      </p>
    </form>
  );
}

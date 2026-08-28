"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RgpdConsent } from "@/components/RgpdConsent";
import { submitLead } from "@/lib/submit-lead";
import { site } from "@/data/site";
import type { LeadSource } from "@/types/lead";

const schema = z.object({
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^[0-9 +().-]{8,}$/, "Numéro de téléphone invalide."),
  rgpdConsent: z
    .boolean()
    .refine((v) => v === true, "Le consentement RGPD est obligatoire."),
  company_website: z.string().max(0).optional().default(""),
});

type FormValues = z.input<typeof schema>;

interface CallbackDialogProps {
  source: LeadSource;
  operationCode?: string;
  trigger: React.ReactNode;
}

export function CallbackDialog({
  source,
  operationCode,
  trigger,
}: CallbackDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { telephone: "", company_website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitLead({
      source,
      formVariant: "callback",
      operationCode,
      telephone: values.telephone,
      rgpdConsent: true,
      message: "Demande de rappel (encart basse friction).",
      company_website: values.company_website,
    });

    if (result.ok) {
      reset();
      setOpen(false);
      router.push("/merci");
    } else {
      setServerError(result.error ?? "Une erreur est survenue.");
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Être rappelé(e) par un conseiller</DialogTitle>
          <DialogDescription>
            Laissez votre numéro : un conseiller Solaire Energie vous rappelle
            sous 24–48h ouvrées. Vous pouvez aussi nous joindre au{" "}
            <a href={site.contact.phoneHref} className="font-medium text-foreground">
              {site.contact.phoneDisplay}
            </a>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="cb-tel">Votre téléphone</Label>
            <Input
              id="cb-tel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              autoFocus
              {...register("telephone")}
              className="mt-1.5"
            />
            {errors.telephone ? (
              <p className="mt-1 text-sm text-destructive">
                {errors.telephone.message}
              </p>
            ) : null}
          </div>

          <div aria-hidden className="hidden">
            <input tabIndex={-1} autoComplete="off" {...register("company_website")} />
          </div>

          <Controller
            control={control}
            name="rgpdConsent"
            render={({ field }) => (
              <RgpdConsent
                id="cb-rgpd"
                checked={field.value === true}
                onCheckedChange={field.onChange}
                error={errors.rgpdConsent?.message}
              />
            )}
          />

          {serverError ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Envoi…
              </>
            ) : (
              <>
                <PhoneCall /> Être rappelé(e)
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

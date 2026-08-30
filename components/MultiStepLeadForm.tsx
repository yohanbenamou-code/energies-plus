"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RgpdConsent } from "@/components/RgpdConsent";
import { CallbackDialog } from "@/components/CallbackDialog";
import { useSolutionForm } from "@/components/solution-form-context";
import {
  PRODUCT_TYPES,
  PROJECT_TYPES,
  STRUCTURE_TYPES,
} from "@/data/form-options";
import { submitLead } from "@/lib/submit-lead";
import { formatNumberFr } from "@/lib/utils";
import type { LiveCeeOperation } from "@/types/operation";

const phoneRegex = /^[0-9 +().-]{8,}$/;

const schema = z.object({
  structureType: z.string().min(1, "Sélectionnez votre type de structure."),
  projectType: z.string().min(1, "Sélectionnez le type de projet."),
  productType: z.enum(["agricole", "forestier"], {
    errorMap: () => ({ message: "Sélectionnez le type de produits séchés." }),
  }),
  powerKw: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine(
      (v) =>
        !v ||
        (/^\d+([.,]\d+)?$/.test(v) && Number(v.replace(",", ".")) > 0),
      "Puissance invalide (nombre positif).",
    ),
  buildingArea: z.string().trim().max(60).optional().default(""),
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom."),
  prenom: z.string().trim().min(1, "Merci d'indiquer votre prénom."),
  telephone: z
    .string()
    .trim()
    .regex(phoneRegex, "Numéro de téléphone invalide."),
  email: z.string().trim().email("Adresse email invalide."),
  codePostal: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Code postal invalide (5 chiffres)."),
  ville: z.string().trim().min(1, "Merci d'indiquer votre ville."),
  rgpdConsent: z
    .boolean()
    .refine((v) => v === true, "Le consentement RGPD est obligatoire."),
  company_website: z.string().max(0).optional().default(""),
});

type FormValues = z.input<typeof schema>;

const STEP_FIELDS: Array<Array<keyof FormValues>> = [
  ["structureType"],
  ["projectType"],
  ["productType", "powerKw", "buildingArea"],
  ["nom", "prenom", "telephone", "email", "codePostal", "ville", "rgpdConsent"],
];

const STEP_LABELS = ["Structure", "Projet", "Produits", "Coordonnées"];

export function MultiStepLeadForm({ operation }: { operation: LiveCeeOperation }) {
  const router = useRouter();
  const { prefill, nonce, scrollToContact } = useSolutionForm();
  const [step, setStep] = React.useState(0);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      structureType: "",
      projectType: "",
      powerKw: "",
      buildingArea: "",
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      codePostal: "",
      ville: "",
      company_website: "",
    },
  });

  // Applique les données du simulateur / des cartes "Nos solutions".
  React.useEffect(() => {
    if (nonce === 0) return;
    reset({
      ...getValues(),
      projectType: prefill.projectType ?? getValues("projectType"),
      productType: prefill.productType ?? getValues("productType"),
      powerKw:
        prefill.powerKw != null ? String(prefill.powerKw) : getValues("powerKw"),
    });
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const projectLabel =
    PROJECT_TYPES.find((p) => p.value === prefill.projectType)?.label ??
    operation.variants.find((v) => v.key === prefill.projectType)?.label;

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
    scrollToContact();
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const variantKey = operation.variants.some(
      (v) => v.key === values.projectType,
    )
      ? values.projectType
      : "";

    const parsedPower = values.powerKw
      ? Number(values.powerKw.replace(",", "."))
      : undefined;

    const result = await submitLead({
      source: "agri-eq-110",
      formVariant: "multi-step",
      operationCode: operation.code,
      variantKey,
      zone: prefill.zone,
      estimatedCumac: prefill.estimatedCumac,
      structureType: values.structureType,
      projectType: values.projectType,
      productType: values.productType,
      powerKw:
        parsedPower && Number.isFinite(parsedPower) ? parsedPower : undefined,
      buildingArea: values.buildingArea,
      nom: values.nom,
      prenom: values.prenom,
      telephone: values.telephone,
      email: values.email,
      codePostal: values.codePostal,
      ville: values.ville,
      rgpdConsent: true,
      company_website: values.company_website,
    });

    if (result.ok) {
      router.push("/merci");
    } else {
      setServerError(result.error ?? "Une erreur est survenue.");
    }
  });

  const progress = ((step + 1) / STEP_FIELDS.length) * 100;

  return (
    <section id="contact" className="bg-primary/5 py-16 sm:py-20">
      <div className="container max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Recevoir mon étude gratuite
          </h2>
          <p className="mt-3 text-muted-foreground">
            4 étapes rapides. Un conseiller vous recontacte sous 24–48h ouvrées.
            Sans engagement.
          </p>
        </div>

        {(projectLabel || prefill.estimatedCumac) && step === 0 ? (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary-50 px-4 py-3 text-sm text-primary-700">
            D&apos;après le simulateur&nbsp;:
            {projectLabel ? ` ${projectLabel}` : ""}
            {prefill.zone ? ` · zone ${prefill.zone}` : ""}
            {prefill.powerKw ? ` · ${prefill.powerKw} kW` : ""}
            {prefill.estimatedCumac
              ? ` · ≈ ${formatNumberFr(prefill.estimatedCumac)} kWh cumac`
              : ""}
            . Il ne reste plus qu&apos;à préciser votre structure et vos
            coordonnées.
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>
                Étape {step + 1} / {STEP_FIELDS.length} — {STEP_LABELS[step]}
              </span>
              <span>{Math.round(progress)} %</span>
            </div>
            <Progress value={progress} />
          </div>

          <form onSubmit={onSubmit} noValidate>
            {/* Étape 1 : structure */}
            {step === 0 ? (
              <fieldset>
                <legend className="text-base font-semibold text-foreground">
                  Quel est votre type de structure ?
                </legend>
                <Controller
                  control={control}
                  name="structureType"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-4"
                    >
                      {STRUCTURE_TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary-50"
                        >
                          <RadioGroupItem value={type} />
                          {type}
                        </label>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.structureType ? (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.structureType.message}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {/* Étape 2 : projet */}
            {step === 1 ? (
              <fieldset>
                <legend className="text-base font-semibold text-foreground">
                  Quel type de projet envisagez-vous ?
                </legend>
                <Controller
                  control={control}
                  name="projectType"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-4"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <label
                          key={type.value}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary-50"
                        >
                          <RadioGroupItem value={type.value} />
                          {type.label}
                        </label>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.projectType ? (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.projectType.message}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {/* Étape 3 : produits + dimensionnement */}
            {step === 2 ? (
              <fieldset className="space-y-5">
                <div>
                  <legend className="text-base font-semibold text-foreground">
                    Quels produits séchez-vous ?
                  </legend>
                  <Controller
                    control={control}
                    name="productType"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        className="mt-4"
                      >
                        {PRODUCT_TYPES.map((type) => (
                          <label
                            key={type.value}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary-50"
                          >
                            <RadioGroupItem value={type.value} />
                            {type.label}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.productType ? (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.productType.message}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="ms-power">
                      Puissance envisagée (kW, optionnel)
                    </Label>
                    <Input
                      id="ms-power"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      {...register("powerKw")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ms-area">
                      ou surface du bâtiment (m², optionnel)
                    </Label>
                    <Input
                      id="ms-area"
                      {...register("buildingArea")}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </fieldset>
            ) : null}

            {/* Étape 4 : coordonnées */}
            {step === 3 ? (
              <fieldset className="space-y-4">
                <legend className="text-base font-semibold text-foreground">
                  Vos coordonnées
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="ms-nom">Nom</Label>
                    <Input id="ms-nom" autoComplete="family-name" {...register("nom")} className="mt-1.5" />
                    {errors.nom ? (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.nom.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="ms-prenom">Prénom</Label>
                    <Input
                      id="ms-prenom"
                      autoComplete="given-name"
                      {...register("prenom")}
                      className="mt-1.5"
                    />
                    {errors.prenom ? (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.prenom.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="ms-tel">Téléphone</Label>
                    <Input
                      id="ms-tel"
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
                    <Label htmlFor="ms-email">Email</Label>
                    <Input
                      id="ms-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="mt-1.5"
                    />
                    {errors.email ? (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="ms-cp">Code postal</Label>
                    <Input
                      id="ms-cp"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      {...register("codePostal")}
                      className="mt-1.5"
                    />
                    {errors.codePostal ? (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.codePostal.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="ms-ville">Ville</Label>
                    <Input
                      id="ms-ville"
                      autoComplete="address-level2"
                      {...register("ville")}
                      className="mt-1.5"
                    />
                    {errors.ville ? (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.ville.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Controller
                  control={control}
                  name="rgpdConsent"
                  render={({ field }) => (
                    <RgpdConsent
                      id="ms-rgpd"
                      checked={field.value === true}
                      onCheckedChange={field.onChange}
                      error={errors.rgpdConsent?.message}
                    />
                  )}
                />
              </fieldset>
            ) : null}

            {/* Honeypot */}
            <div aria-hidden className="hidden">
              <input tabIndex={-1} autoComplete="off" {...register("company_website")} />
            </div>

            {serverError ? (
              <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {serverError}
              </p>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={goBack}>
                  <ArrowLeft /> Retour
                </Button>
              ) : (
                <span />
              )}

              {step < STEP_FIELDS.length - 1 ? (
                <Button type="button" variant="default" onClick={goNext}>
                  Continuer <ArrowRight />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Envoi…
                    </>
                  ) : (
                    "Recevoir mon étude gratuite"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Encart alternatif basse friction */}
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            Vous préférez qu&apos;on vous appelle ? Laissez-nous simplement votre
            numéro.
          </p>
          <CallbackDialog
            source="agri-eq-110"
            operationCode={operation.code}
            trigger={
              <Button type="button" variant="outline">
                Être rappelé
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}

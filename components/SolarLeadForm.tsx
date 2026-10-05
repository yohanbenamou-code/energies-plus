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
import { SectionHead } from "@/components/SectionHead";
import { useSolarForm } from "@/components/solar-form-context";
import { MPR_CATEGORY_LABELS } from "@/lib/mpr";
import { submitLead } from "@/lib/submit-lead";
import { formatNumberFr } from "@/lib/utils";

const SITUATIONS = [
  "Propriétaire occupant (résidence principale)",
  "Propriétaire bailleur",
  "Locataire",
  "Propriétaire d'une résidence secondaire",
  "Autre situation",
] as const;

const HEATING = [
  { value: "gaz", label: "Chaudière gaz" },
  { value: "fioul", label: "Chaudière fioul" },
  { value: "charbon", label: "Chaudière charbon" },
  { value: "electrique", label: "Chauffage électrique (convecteurs, radiateurs)" },
  { value: "pac", label: "Pompe à chaleur déjà installée" },
  { value: "autre", label: "Autre ou je ne sais pas" },
] as const;

const phoneRegex = /^[0-9 +().-]{8,}$/;

const schema = z.object({
  situation: z.string().min(1, "Sélectionnez votre situation."),
  heating: z.string().min(1, "Sélectionnez votre chauffage actuel."),
  builtYear: z.string().trim().max(10).optional().default(""),
  surface: z.string().trim().max(10).optional().default(""),
  persons: z.string().trim().max(2).optional().default(""),
  income: z.string().trim().max(12).optional().default(""),
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom."),
  prenom: z.string().trim().min(1, "Merci d'indiquer votre prénom."),
  telephone: z.string().trim().regex(phoneRegex, "Numéro de téléphone invalide."),
  email: z.string().trim().email("Adresse email invalide."),
  codePostal: z.string().trim().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)."),
  ville: z.string().trim().min(1, "Merci d'indiquer votre ville."),
  rgpdConsent: z
    .boolean()
    .refine((v) => v === true, "Le consentement RGPD est obligatoire."),
  company_website: z.string().max(0).optional().default(""),
});

type FormValues = z.input<typeof schema>;

const STEP_FIELDS: Array<Array<keyof FormValues>> = [
  ["situation", "heating"],
  ["builtYear", "surface", "persons", "income"],
  ["nom", "prenom", "telephone", "email", "codePostal", "ville", "rgpdConsent"],
];

const STEP_LABELS = ["Votre situation", "Votre logement", "Coordonnées"];

export function SolarLeadForm({ index = "11" }: { index?: string }) {
  const router = useRouter();
  const { prefill, nonce, category, scrollTo } = useSolarForm();
  const [step, setStep] = React.useState(0);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      situation: "",
      heating: "",
      builtYear: "",
      surface: "",
      persons: "",
      income: "",
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      codePostal: "",
      ville: "",
      company_website: "",
    },
  });

  // Reprend les données du simulateur.
  React.useEffect(() => {
    if (nonce === 0) return;
    reset({ ...getValues() });
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const heating = watch("heating");
  const notLikelyEligible = heating === "electrique" || heating === "pac";

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
    scrollTo("contact");
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const heatingLabel =
      HEATING.find((h) => h.value === values.heating)?.label ?? values.heating;

    const messageParts = [
      `Chauffage actuel : ${heatingLabel}`,
      values.builtYear ? `Année de construction : ${values.builtYear}` : null,
      values.persons ? `Personnes au foyer : ${values.persons}` : null,
      values.income
        ? `Revenu fiscal de référence : ${values.income} €`
        : null,
      category
        ? `Catégorie MaPrimeRénov' (vérificateur) : ${MPR_CATEGORY_LABELS[category].label}`
        : null,
      prefill.panels ? `Panneaux (simulateur) : ${prefill.panels}` : null,
      prefill.fossilFree != null
        ? `Équipement fossile déposé : ${prefill.fossilFree ? "oui" : "non"}`
        : null,
    ].filter(Boolean);

    const result = await submitLead({
      source: "bar-th-168",
      formVariant: "multi-step",
      operationCode: "BAR-TH-168",
      projectType: values.heating,
      zone: prefill.zone,
      estimatedCumac: prefill.estimatedCumac,
      structureType: values.situation,
      buildingArea: values.surface,
      message: messageParts.join(" ; "),
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

  const radioItem =
    "flex cursor-pointer items-center gap-3 rounded-md border border-input bg-background p-3 text-sm has-[:checked]:border-foreground has-[:checked]:bg-secondary";

  return (
    <section
      id="contact"
      className="border-b border-border bg-secondary/50 py-12 sm:py-28"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="Contact"
          title="Recevoir mon étude gratuite"
          description="3 étapes rapides. Un conseiller vous recontacte sous 24 à 48h ouvrées pour confirmer votre éligibilité. Sans engagement."
        />

        <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 lg:col-start-4">
            {prefill.estimatedCumac && step === 0 ? (
              <div className="rounded-sm border border-foreground/20 bg-card px-4 py-3 text-sm text-foreground">
                D&apos;après le simulateur&nbsp;: zone {prefill.zone}
                {prefill.surfaceM2 ? `, ${prefill.surfaceM2} m² de capteurs` : ""}
                {`, ≈ ${formatNumberFr(prefill.estimatedCumac)} kWh cumac`}.
                Il ne reste plus qu&apos;à préciser votre situation et vos
                coordonnées.
              </div>
            ) : null}

            <div className="mt-8 rounded-md border border-foreground/20 bg-card p-6 sm:p-8">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span>
                    Étape {step + 1} / {STEP_FIELDS.length} : {STEP_LABELS[step]}
                  </span>
                  <span>{Math.round(progress)} %</span>
                </div>
                <Progress value={progress} />
              </div>

              <form onSubmit={onSubmit} noValidate>
                {/* Étape 1 : situation + chauffage */}
                {step === 0 ? (
                  <fieldset className="space-y-7">
                    <div>
                      <legend className="text-base font-semibold text-foreground">
                        Quelle est votre situation ?
                      </legend>
                      <Controller
                        control={control}
                        name="situation"
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="mt-4"
                          >
                            {SITUATIONS.map((type) => (
                              <label key={type} className={radioItem}>
                                <RadioGroupItem value={type} />
                                {type}
                              </label>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.situation ? (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.situation.message}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <legend className="text-base font-semibold text-foreground">
                        Comment chauffez-vous votre maison aujourd&apos;hui ?
                      </legend>
                      <Controller
                        control={control}
                        name="heating"
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="mt-4"
                          >
                            {HEATING.map((type) => (
                              <label key={type.value} className={radioItem}>
                                <RadioGroupItem value={type.value} />
                                {type.label}
                              </label>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.heating ? (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.heating.message}
                        </p>
                      ) : null}
                      {notLikelyEligible ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          Cette offre concerne les maisons chauffées uniquement
                          au gaz, au fioul ou au charbon. Vous pouvez tout de
                          même continuer : un conseiller étudie votre cas.
                        </p>
                      ) : null}
                    </div>
                  </fieldset>
                ) : null}

                {/* Étape 2 : logement et foyer (optionnel) */}
                {step === 1 ? (
                  <fieldset>
                    <legend className="text-base font-semibold text-foreground">
                      Quelques précisions (facultatif)
                    </legend>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Elles permettent de préparer votre étude. Vous pouvez aussi
                      les donner lors de l&apos;appel.
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="sol-year">Année de construction</Label>
                        <Input
                          id="sol-year"
                          inputMode="numeric"
                          placeholder="ex. 1985"
                          {...register("builtYear")}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sol-surface">Surface chauffée (m²)</Label>
                        <Input
                          id="sol-surface"
                          inputMode="numeric"
                          {...register("surface")}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sol-persons">Personnes du foyer</Label>
                        <Input
                          id="sol-persons"
                          inputMode="numeric"
                          {...register("persons")}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sol-income">
                          Revenu fiscal de référence (€)
                        </Label>
                        <Input
                          id="sol-income"
                          inputMode="numeric"
                          {...register("income")}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </fieldset>
                ) : null}

                {/* Étape 3 : coordonnées */}
                {step === 2 ? (
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground">
                      Vos coordonnées
                    </legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="sol-nom">Nom</Label>
                        <Input
                          id="sol-nom"
                          autoComplete="family-name"
                          {...register("nom")}
                          className="mt-1.5"
                        />
                        {errors.nom ? (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.nom.message}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <Label htmlFor="sol-prenom">Prénom</Label>
                        <Input
                          id="sol-prenom"
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
                        <Label htmlFor="sol-tel">Téléphone</Label>
                        <Input
                          id="sol-tel"
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
                        <Label htmlFor="sol-email">Email</Label>
                        <Input
                          id="sol-email"
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
                        <Label htmlFor="sol-cp">Code postal</Label>
                        <Input
                          id="sol-cp"
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
                        <Label htmlFor="sol-ville">Ville</Label>
                        <Input
                          id="sol-ville"
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
                          id="sol-rgpd"
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
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("company_website")}
                  />
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

            <div className="mt-6 flex flex-col gap-4 border-t border-foreground/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Vous préférez qu&apos;on vous appelle ? Laissez-nous simplement
                votre numéro, ou réservez directement un créneau.
              </p>
              <div className="flex flex-wrap gap-2">
                <CallbackDialog
                  source="bar-th-168"
                  operationCode="BAR-TH-168"
                  trigger={
                    <Button type="button" variant="outline">
                      Être rappelé
                    </Button>
                  }
                />
                <Button asChild variant="outline">
                  <a href="#rendez-vous">Réserver un créneau</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

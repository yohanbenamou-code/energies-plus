# Solaire Energie — site de génération de leads

Site B2B de génération de leads pour **Solaire Energie**, société privée
accompagnant les exploitations agricoles et forestières dans l'installation de
systèmes de **séchage solaire par insufflation d'air**, financés via le
dispositif public des **Certificats d'Économies d'Énergie (CEE)** — opération
standardisée **AGRI-EQ-110**.

> Solaire Energie est un professionnel privé accompagnant ses clients dans le
> cadre du dispositif public des CEE. Ce site n'est pas un site
> gouvernemental et n'utilise aucun symbole officiel de la République française.
> Les montants en euros affichés sont des estimations non contractuelles, sous
> réserve d'éligibilité ; seuls les kWh cumac sont des données officielles.

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + composants type shadcn/ui (Radix) |
| Formulaires | react-hook-form + zod |
| Animations | framer-motion (sobres, respectent `prefers-reduced-motion`) |
| Icônes | lucide-react |
| Police | Inter via `next/font/google` |
| Tests | Vitest |
| Déploiement cible | Vercel (aucune dépendance spécifique à Vercel) |

## Installation

```bash
npm install
cp .env.example .env.local   # optionnel — voir « Variables d'environnement »
npm run dev                  # http://localhost:3000
```

## Scripts

```bash
npm run dev        # serveur de développement
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint (next lint)
npm run typecheck  # tsc --noEmit
npm run test       # tests unitaires (Vitest)
```

## Structure

```
app/
  layout.tsx                      Layout racine (police, metadata, tracking, JSON-LD)
  page.tsx                        Homepage généraliste "/"
  solutions/[slug]/page.tsx       Page solution (generateStaticParams depuis data/operations.ts)
  merci/page.tsx                  Page de remerciement + events de conversion
  mentions-legales/page.tsx       Placeholder RGPD/légal (à compléter)
  politique-de-confidentialite/page.tsx
  api/leads/route.ts              Réception des leads (POST)
  sitemap.ts / robots.ts
components/                       Sections & composants UI (components/ui/*)
data/
  operations.ts                   Modèle de données des opérations CEE (extensible)
  site.ts                         Config éditoriale + placeholders TODO
  form-options.ts                 Options partagées des formulaires
lib/
  cee-calculator.ts               calculateCumac() — kWh cumac = coefficient x kW
  cee-calculator.test.ts          Test unitaire (barème officiel AGRI-EQ-110)
  lead-sink.ts                    Interface LeadSink + Supabase / Resend / fichier local
  utm.ts                          Capture/persistance des paramètres UTM
  submit-lead.ts                  Helper client d'envoi vers /api/leads
types/
  operation.ts / lead.ts          Types + schéma zod partagé
```

## Ajouter une opération CEE

Tout se pilote depuis **`data/operations.ts`**. Ajoutez un objet au tableau
`operations` : la homepage (catalogue + segmentation par profil) et la route
`/solutions/[slug]` se mettent à jour automatiquement. Utilisez
`status: "coming-soon"` pour afficher une carte grisée « Bientôt disponible »
sans page dédiée.

Les barèmes (kWh cumac par kW) doivent être repris **exactement** de la fiche
officielle, sans arrondi.

## Gestion des leads (`LeadSink`)

`lib/lead-sink.ts` expose une interface `LeadSink { save(lead): Promise<void> }`.
Le sink actif est choisi automatiquement selon les variables d'environnement
présentes :

| Priorité | Sink | Condition d'activation |
|---|---|---|
| 1 | `SupabaseLeadSink` | `SUPABASE_URL` **et** `SUPABASE_ANON_KEY` définis |
| 2 | `ResendLeadSink` | `RESEND_API_KEY` défini |
| 3 | `LocalFileLeadSink` | aucun des précédents — écrit dans `.data/leads.json` (gitignored) |

Quel que soit le sink, chaque lead est aussi journalisé (`console.info`), et en
cas d'échec du sink principal une écriture de secours dans `.data/leads.json`
garantit qu'aucun lead n'est perdu.

### Table Supabase attendue

```sql
create table leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source text, form_variant text,
  nom text, prenom text, email text, telephone text,
  code_postal text, ville text,
  structure_type text, project_type text, product_type text,
  power_kw numeric, building_area text, message text,
  operation_code text, variant_key text, zone text, estimated_cumac numeric,
  page_url text, landing_page text, referrer text,
  utm_source text, utm_medium text, utm_campaign text,
  utm_content text, utm_term text,
  user_agent text, ip text
);
```

> Adaptez les politiques RLS à votre besoin (insertion via clé anon, ou
> passez à une clé `service_role` côté serveur).

## Variables d'environnement

Voir **`.env.example`**. Toutes optionnelles. Résumé :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (metadata, sitemap, robots) |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_LEADS_TABLE` | Sink Supabase |
| `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_NOTIFICATION_FROM` | Sink Resend |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (`Lead` sur `/merci`) |
| `NEXT_PUBLIC_GADS_CONVERSION_ID`, `NEXT_PUBLIC_GADS_CONVERSION_LABEL` | Conversion Google Ads sur `/merci` |

## Tracking & SEO

- Emplacements GTM / Meta Pixel / Google Ads dans `components/Analytics.tsx`
  (chargés seulement si l'ID correspondant est défini) et
  `components/ConversionEvents.tsx` (déclenché sur `/merci`).
- `generateMetadata()` par page, JSON-LD `Organization` (layout), `Service`
  (homepage) et `FAQPage` (sections FAQ).
- `app/sitemap.ts` et `app/robots.ts` générés dynamiquement.
- **TODO** : ajouter une image Open Graph 1200×630 (`app/opengraph-image.*`).

## Déploiement Vercel

1. Importer le dépôt dans Vercel (framework détecté : Next.js).
2. Renseigner les variables d'environnement souhaitées (au minimum
   `NEXT_PUBLIC_SITE_URL` ; pour la production, configurer Supabase **ou**
   Resend — le fichier local n'est pas persistant sur Vercel).
3. `Build command` : `next build` (par défaut). `Output` : automatique.
4. Déployer. Aucune configuration spécifique à Vercel n'est requise : le projet
   peut aussi être déployé sur toute plateforme supportant Next.js 14.

## Points à compléter avant mise en ligne (`TODO`)

Recherchez `TODO: placeholder à remplacer par Yohan/Solaire Energie` dans le
code. Principaux éléments :

- Coordonnées : téléphone, email, adresse, SIRET, RCS, assurance
  (`data/site.ts`, footer, mentions légales).
- Chiffres clés de la homepage (`data/site.ts` → `stats`) — laissés `null`,
  aucun chiffre inventé.
- Logos clients / partenaires, note d'avis vérifiable, témoignages réels
  (`data/site.ts`).
- Logo officiel (placeholder SVG dans `components/Logo.tsx`).
- Visuel du hero (illustration SVG dans `components/HeroIllustration.tsx`).
- Contenu réel des pages Mentions légales et Politique de confidentialité.
- Image Open Graph.
- IDs de tracking (`.env`).

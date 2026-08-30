# Mise en production — Vercel + domaine OVH

## 1. Déployer sur Vercel

Le projet est prêt (`npm run build` passe, dépendances figées). Deux voies.

### Voie A — CLI Vercel (la plus rapide, sans GitHub)

```bash
cd C:\Users\yohan\solaire-energie
vercel login          # ouvre le navigateur, une seule fois
vercel link           # crée le projet "energies-plus" et l'associe au dossier
vercel deploy --prod  # build + déploiement production -> URL *.vercel.app
```

### Voie B — via GitHub (recommandé : redeploy auto à chaque push)

```bash
# créer un repo vide "energies-plus" sur github.com, puis :
git remote add origin https://github.com/<votre-compte>/energies-plus.git
git push -u origin master
```

Puis sur **vercel.com → Add New… → Project → Import** le repo → **Deploy**.
Framework détecté : Next.js. Aucune config supplémentaire.

## 2. Variables d'environnement (Vercel → Project → Settings → Environment Variables → Production)

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.energies-plus.fr` |

**Capture des leads** — indispensable en prod, choisir **UNE** option :

- **Resend** (email) : `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL=contact@energies-plus.fr`,
  `LEAD_NOTIFICATION_FROM=Énergies Plus <leads@energies-plus.fr>`
  (le domaine d'envoi doit être vérifié dans Resend).
- **Supabase** (base) : `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  (+ créer la table `leads` — SQL dans `README.md`).

> ⚠️ Sans Resend ni Supabase, le système de fichiers de Vercel n'étant pas
> persistant, les leads ne sont **que** dans les logs Vercel. Configurez l'un
> des deux avant d'envoyer du trafic.

**Tracking** (optionnel) : `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
`NEXT_PUBLIC_GADS_CONVERSION_ID`, `NEXT_PUBLIC_GADS_CONVERSION_LABEL`.

Après avoir ajouté des variables : **redéployer** (Deployments → … → Redeploy)
pour qu'elles soient prises en compte.

## 3. Brancher le domaine `energies-plus.fr` (géré chez OVH)

### Cas standard : tout le domaine pointe vers Vercel

1. **Vercel → Project → Settings → Domains** → ajouter `energies-plus.fr` **et**
   `www.energies-plus.fr`. Vercel affiche les enregistrements cibles exacts.
2. **OVH Manager → Noms de domaine → energies-plus.fr → Zone DNS** :
   - Apex `energies-plus.fr` (`@`) : enregistrement **A** →
     `76.76.21.21` *(valeur exacte donnée par Vercel dans le panneau Domains)*.
   - `www` : enregistrement **CNAME** → `cname.vercel-dns.com.`
   - **Supprimer** les anciens `A` / `AAAA` / `CNAME` sur `@` et `www` qui
     pointaient vers l'hébergement/serveur OVH (sinon conflit).
   - **NE PAS TOUCHER** aux enregistrements **MX**, **SPF (TXT)**, **DKIM**,
     `autodiscover`, `_dmarc` : la messagerie `@energies-plus.fr` reste chez OVH.
3. Propagation : quelques minutes (jusqu'à quelques heures). Vercel émet
   automatiquement le certificat SSL.
4. Dans Vercel, définir le domaine **principal** (`www` ou l'apex) ; l'autre
   redirige automatiquement.

### Variante : déléguer toute la zone à Vercel

Chez OVH, remplacer les **serveurs DNS** du domaine par ceux de Vercel
(`ns1.vercel-dns.com`, `ns2.vercel-dns.com`). Vercel gère alors toute la zone.
À ne faire **que** si aucun autre service (email OVH, sous-domaines) ne dépend
de cette zone — ou après avoir recréé ces enregistrements dans Vercel.

### Vous gardez un site/app sur le serveur OVH

Attribuez-lui un sous-domaine (ex. `app.energies-plus.fr` en A vers l'IP du
serveur OVH) et laissez `www` + apex sur Vercel comme ci-dessus. Chaque
sous-domaine est indépendant.

### Vous voulez que ce soit le serveur OVH qui serve l'app (sans Vercel)

Déconseillé (perte du CDN et des fonctions serverless). Sinon, sur le VPS OVH :
Node ≥ 18, `git clone`, `npm ci`, `npm run build`, `npm run start` (port 3000)
derrière nginx en reverse-proxy, avec pm2/systemd. Définir les mêmes variables
d'environnement dans l'environnement du serveur. La route `/api/leads`
fonctionne dans `next start`.

## 4. Après mise en ligne

- Vérifier `https://www.energies-plus.fr` et `/solutions/agri-eq-110-sechage-solaire-agricole`.
- Tester un envoi de formulaire → `/merci` → vérifier réception (email Resend ou ligne Supabase).
- `https://www.energies-plus.fr/sitemap.xml` et `/robots.txt` doivent refléter le bon domaine.
- Soumettre le sitemap dans la Google Search Console.

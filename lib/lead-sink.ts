import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lead } from "@/types/lead";

/**
 * Interface pluggable de stockage des leads.
 *
 * Le sink actif est choisi automatiquement selon les variables
 * d'environnement présentes (voir `getLeadSink()`), dans cet ordre de
 * priorité :
 *   1. Supabase   (SUPABASE_URL + SUPABASE_ANON_KEY)
 *   2. Resend     (RESEND_API_KEY)
 *   3. Fichier local .data/leads.json  (fallback, jamais de perte en dev)
 */
export interface LeadSink {
  readonly name: string;
  save(lead: Lead): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Supabase                                                                   */
/* -------------------------------------------------------------------------- */

export class SupabaseLeadSink implements LeadSink {
  readonly name = "supabase";

  constructor(
    private readonly url: string,
    private readonly anonKey: string,
    private readonly table = process.env.SUPABASE_LEADS_TABLE || "leads",
  ) {}

  async save(lead: Lead): Promise<void> {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(this.url, this.anonKey, {
      auth: { persistSession: false },
    });

    const { error } = await client.from(this.table).insert({
      created_at: lead.createdAt,
      source: lead.source,
      form_variant: lead.formVariant,
      nom: lead.nom,
      prenom: lead.prenom,
      email: lead.email,
      telephone: lead.telephone,
      code_postal: lead.codePostal,
      ville: lead.ville,
      structure_type: lead.structureType,
      project_type: lead.projectType,
      product_type: lead.productType ?? null,
      power_kw: lead.powerKw ?? null,
      building_area: lead.buildingArea,
      message: lead.message,
      operation_code: lead.operationCode,
      variant_key: lead.variantKey,
      zone: lead.zone ?? null,
      estimated_cumac: lead.estimatedCumac ?? null,
      page_url: lead.pageUrl,
      landing_page: lead.landingPage,
      referrer: lead.referrer,
      utm_source: lead.utmSource,
      utm_medium: lead.utmMedium,
      utm_campaign: lead.utmCampaign,
      utm_content: lead.utmContent,
      utm_term: lead.utmTerm,
      user_agent: lead.userAgent,
      ip: lead.ip,
    });

    if (error) {
      throw new Error(`SupabaseLeadSink: ${error.message}`);
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Resend (email de notification)                                             */
/* -------------------------------------------------------------------------- */

export class ResendLeadSink implements LeadSink {
  readonly name = "resend";

  constructor(
    private readonly apiKey: string,
    // TODO: placeholder à remplacer par Yohan/Solaire Energie
    private readonly to = process.env.LEAD_NOTIFICATION_EMAIL ||
      "contact@solaire-energie.fr",
    private readonly from = process.env.LEAD_NOTIFICATION_FROM ||
      "Solaire Energie <leads@solaire-energie.fr>",
  ) {}

  async save(lead: Lead): Promise<void> {
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);

    const rows: Array<[string, string]> = [
      ["Origine", `${lead.source} — ${lead.formVariant}`],
      ["Nom", `${lead.prenom} ${lead.nom}`.trim() || "—"],
      ["Téléphone", lead.telephone],
      ["Email", lead.email || "—"],
      ["Code postal / Ville", `${lead.codePostal} ${lead.ville}`.trim() || "—"],
      ["Type de structure", lead.structureType || "—"],
      ["Type de projet", lead.projectType || "—"],
      ["Produits séchés", lead.productType ?? "—"],
      [
        "Puissance envisagée",
        lead.powerKw ? `${lead.powerKw} kW` : lead.buildingArea || "—",
      ],
      ["Opération", lead.operationCode || "—"],
      ["Variante", lead.variantKey || "—"],
      ["Zone climatique", lead.zone ?? "—"],
      [
        "Estimation simulateur",
        lead.estimatedCumac ? `${lead.estimatedCumac} kWh cumac` : "—",
      ],
      ["Message", lead.message || "—"],
      [
        "Campagne",
        [lead.utmSource, lead.utmMedium, lead.utmCampaign]
          .filter(Boolean)
          .join(" / ") || "direct",
      ],
      ["Page", lead.pageUrl || lead.landingPage || "—"],
      ["Reçu le", lead.createdAt],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html = `
      <h2>Nouveau lead — ${escapeHtml(lead.source)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#555;border-bottom:1px solid #eee"><strong>${escapeHtml(
                k,
              )}</strong></td><td style="border-bottom:1px solid #eee">${escapeHtml(
                v,
              )}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#888;font-size:12px">ID ${escapeHtml(lead.id)}</p>
    `;

    const { error } = await resend.emails.send({
      from: this.from,
      to: this.to.split(",").map((s) => s.trim()),
      replyTo: lead.email || undefined,
      subject: `Lead ${lead.source} — ${lead.prenom} ${lead.nom} (${lead.telephone})`.trim(),
      text,
      html,
    });

    if (error) {
      throw new Error(`ResendLeadSink: ${error.message}`);
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* -------------------------------------------------------------------------- */
/* Fichier local (fallback dev)                                               */
/* -------------------------------------------------------------------------- */

export class LocalFileLeadSink implements LeadSink {
  readonly name = "local-file";

  constructor(
    private readonly filePath = path.join(process.cwd(), ".data", "leads.json"),
  ) {}

  async save(lead: Lead): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });

    let existing: Lead[] = [];
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed as Lead[];
    } catch {
      /* fichier absent ou illisible : on repart d'un tableau vide */
    }

    existing.push(lead);
    await fs.writeFile(this.filePath, JSON.stringify(existing, null, 2), "utf8");
  }
}

/* -------------------------------------------------------------------------- */
/* Sélection automatique                                                      */
/* -------------------------------------------------------------------------- */

let cached: LeadSink | null = null;

export function getLeadSink(): LeadSink {
  if (cached) return cached;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (supabaseUrl && supabaseKey) {
    cached = new SupabaseLeadSink(supabaseUrl, supabaseKey);
  } else if (resendKey) {
    cached = new ResendLeadSink(resendKey);
  } else {
    cached = new LocalFileLeadSink();
  }

  return cached;
}

/** Nom du sink qui sera utilisé (diagnostic / logs). */
export function getActiveLeadSinkName(): string {
  return getLeadSink().name;
}

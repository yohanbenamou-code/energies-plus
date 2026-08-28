import { NextResponse } from "next/server";
import { leadSchema, type Lead } from "@/types/lead";
import { getLeadSink, LocalFileLeadSink } from "@/lib/lead-sink";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "";
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Anti-spam : le honeypot doit rester vide. On répond 200 pour ne pas
  // renseigner les bots, mais on n'enregistre rien.
  if (parsed.data.company_website.trim() !== "") {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const lead: Lead = {
    ...parsed.data,
    id: globalThis.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
    ip: clientIp(req),
  };

  // Log structuré : garantit qu'aucun lead n'est perdu même si le sink échoue.
  console.info(
    "[lead]",
    JSON.stringify({
      id: lead.id,
      source: lead.source,
      formVariant: lead.formVariant,
      structureType: lead.structureType,
      telephone: lead.telephone,
      email: lead.email,
      utmCampaign: lead.utmCampaign,
      createdAt: lead.createdAt,
    }),
  );

  const sink = getLeadSink();
  try {
    await sink.save(lead);
  } catch (error) {
    console.error(
      `[lead] échec du sink "${sink.name}", bascule sur le fichier local`,
      error,
    );
    try {
      await new LocalFileLeadSink().save(lead);
    } catch (fallbackError) {
      console.error("[lead] échec du fallback fichier local", fallbackError);
      return NextResponse.json(
        { ok: false, error: "Impossible d'enregistrer la demande." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true, id: lead.id });
}

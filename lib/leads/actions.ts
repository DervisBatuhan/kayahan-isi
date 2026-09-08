"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import {
  leadSchema,
  toFieldErrors,
  MIN_FILL_MS,
  type LeadInput,
  type SubmitLeadResult,
} from "./schema";

/**
 * Verify a Cloudflare Turnstile token. Returns true when Turnstile is not
 * configured (e.g. local dev) so the form keeps working without keys.
 */
async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  let ip = "";
  try {
    const h = await headers();
    ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";
  } catch {
    /* headers() unavailable — skip remoteip */
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(5000) },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verify failed:", err);
    return false;
  }
}

/**
 * Public endpoint for the contact + quote forms. Validates with Zod, verifies
 * the Turnstile token, drops honeypot / too-fast hits quietly, writes a `Lead`.
 */
export async function createLead(input: LeadInput): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Lütfen işaretli alanları kontrol edin.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  // Bot signals: honeypot filled, or the form was submitted implausibly fast.
  // Report success but store nothing so a bot gets no useful feedback.
  const tooFast =
    typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_MS;
  if ((data.company_url && data.company_url.trim() !== "") || tooFast) {
    return { ok: true, id: "skipped" };
  }

  if (!(await verifyTurnstile(data.turnstileToken))) {
    return {
      ok: false,
      error:
        data.locale === "en"
          ? "Security check failed. Refresh the page and try again."
          : "Güvenlik doğrulaması başarısız. Sayfayı yenileyip tekrar deneyin.",
    };
  }

  try {
    const row = await prisma.lead.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        company: data.type === "quote" ? data.company || null : null,
        subject: data.type === "contact" ? data.subject ?? "" : "",
        projectType: data.type === "quote" ? data.projectType : "",
        location: data.type === "quote" ? data.location ?? "" : "",
        fields: data.type === "quote" ? JSON.stringify(data.fields ?? []) : "[]",
        message: data.message,
        source: data.source ?? "",
        locale: data.locale ?? "tr",
        status: "new",
      },
    });
    return { ok: true, id: row.id };
  } catch (err) {
    console.error("[createLead] failed to persist lead:", err);
    return {
      ok: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Talebiniz kaydedilemedi. Lütfen daha sonra tekrar deneyin."
          : `Talebiniz kaydedilemedi (dev): ${
              err instanceof Error ? err.message : String(err)
            }`,
    };
  }
}

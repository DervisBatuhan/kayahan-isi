"use server";

import { prisma } from "@/lib/db";
import {
  leadSchema,
  toFieldErrors,
  MIN_FILL_MS,
  type LeadInput,
  type SubmitLeadResult,
} from "./schema";

/**
 * Public endpoint for the contact + quote forms. Validates with Zod, drops
 * honeypot hits quietly (reports success), and writes a `Lead` row.
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

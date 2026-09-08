import { z } from "zod";

/**
 * Validation for the public contact / quote forms. Shared by the client
 * (inline field errors) and the `createLead` server action (authoritative).
 */

const name = z
  .string()
  .trim()
  .min(2, "Adınızı ve soyadınızı girin.")
  .max(120, "En fazla 120 karakter.");

const email = z
  .string()
  .trim()
  .min(1, "E-posta gerekli.")
  .email("Geçerli bir e-posta adresi girin.")
  .max(160, "En fazla 160 karakter.");

const phoneRequired = z
  .string()
  .trim()
  .min(7, "Geçerli bir telefon numarası girin.")
  .max(30, "En fazla 30 karakter.")
  .regex(/^[0-9+()\s.-]+$/, "Telefon yalnızca rakam ve + ( ) - . boşluk içerebilir.");

const phoneOptional = z
  .union([phoneRequired, z.literal("")])
  .optional()
  .transform((v) => v ?? "");

const message = z
  .string()
  .trim()
  .min(10, "Lütfen en az 10 karakterlik bir açıklama yazın.")
  .max(4000, "En fazla 4000 karakter.");

/**
 * Anti-spam honeypot. Accepts any value so it never blocks a real user (a
 * password manager might autofill the hidden field); `createLead` inspects it
 * and, if non-empty, silently drops the submission without writing a row.
 */
const honeypot = z.string().max(200).optional();

/** Client render timestamp — a submit under `MIN_FILL_MS` is almost certainly a bot. */
const startedAt = z.number().int().nonnegative().optional();

/** Cloudflare Turnstile token (verified server-side when the secret is configured). */
const turnstileToken = z.string().max(4096).optional();

export const contactLeadSchema = z.object({
  type: z.literal("contact"),
  name,
  email,
  phone: phoneOptional,
  subject: z.string().trim().max(120).optional().default(""),
  message,
  source: z.string().max(160).optional().default(""),
  locale: z.string().max(8).optional().default("tr"),
  company_url: honeypot,
  startedAt,
  turnstileToken,
});

export const quoteLeadSchema = z.object({
  type: z.literal("quote"),
  name,
  company: z.string().trim().max(160).optional().default(""),
  email,
  phone: phoneRequired,
  projectType: z
    .string()
    .trim()
    .min(1, "Proje türünü seçin.")
    .max(80),
  location: z.string().trim().max(120).optional().default(""),
  fields: z.array(z.string().trim().max(80)).max(20).optional().default([]),
  message,
  source: z.string().max(160).optional().default(""),
  locale: z.string().max(8).optional().default("tr"),
  company_url: honeypot,
  startedAt,
  turnstileToken,
});

/** A genuine person needs at least this long to read and fill the form. */
export const MIN_FILL_MS = 1200;

export const leadSchema = z.discriminatedUnion("type", [
  contactLeadSchema,
  quoteLeadSchema,
]);

export type ContactLeadInput = z.input<typeof contactLeadSchema>;
export type QuoteLeadInput = z.input<typeof quoteLeadSchema>;
export type LeadInput = z.input<typeof leadSchema>;

export type LeadFieldErrors = Partial<Record<string, string>>;
export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: LeadFieldErrors };

/** Flatten a ZodError into `{ field: firstMessage }`. */
export function toFieldErrors(error: z.ZodError): LeadFieldErrors {
  const out: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

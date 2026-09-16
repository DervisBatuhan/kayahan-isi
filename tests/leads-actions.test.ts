import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * `createLead` is a "use server" action that writes through `@/lib/db`
 * (a real PrismaClient at import time) and, when `TURNSTILE_SECRET_KEY` is
 * set, calls `next/headers`. We mock both so the pure branching logic
 * (honeypot / too-fast / validation / persistence) can run under plain
 * Vitest without a DB or request context.
 */
const create = vi.fn();
vi.mock("@/lib/db", () => ({
  prisma: { lead: { create } },
}));

const validContact = {
  type: "contact" as const,
  kvkk: true as const,
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  message: "Merhaba, klima bakım hizmeti hakkında bilgi almak istiyorum.",
};

const validQuote = {
  type: "quote" as const,
  kvkk: true as const,
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "0212 555 44 33",
  projectType: "Isıtma Sistemi",
  message: "Yeni ofis binamız için ısıtma sistemi teklifi rica ediyorum.",
};

describe("lib/leads/actions — createLead", () => {
  beforeEach(() => {
    create.mockReset();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("returns field errors and never touches the DB for an invalid payload", async () => {
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead({ ...validContact, email: "not-an-email" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.fieldErrors?.email).toBe("Geçerli bir e-posta adresi girin.");
    }
    expect(create).not.toHaveBeenCalled();
  });

  it("silently reports success without persisting when the honeypot is filled", async () => {
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead({ ...validContact, company_url: "http://spam.example" });
    expect(res).toEqual({ ok: true, id: "skipped" });
    expect(create).not.toHaveBeenCalled();
  });

  it("silently reports success without persisting on an implausibly fast submit", async () => {
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead({ ...validContact, startedAt: Date.now() });
    expect(res).toEqual({ ok: true, id: "skipped" });
    expect(create).not.toHaveBeenCalled();
  });

  it("persists a valid contact lead and returns its id", async () => {
    create.mockResolvedValueOnce({ id: "lead_123" });
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead(validContact);
    expect(res).toEqual({ ok: true, id: "lead_123" });
    expect(create).toHaveBeenCalledTimes(1);
    const args = create.mock.calls[0][0];
    expect(args.data).toMatchObject({
      type: "contact",
      name: "Ayşe Yılmaz",
      email: "ayse@example.com",
      status: "new",
      locale: "tr",
    });
    // contact-only fields are nulled/blanked out, not left undefined
    expect(args.data.company).toBeNull();
    expect(args.data.projectType).toBe("");
  });

  it("persists a valid quote lead with company/projectType/fields populated", async () => {
    create.mockResolvedValueOnce({ id: "lead_456" });
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead({
      ...validQuote,
      company: "Acme A.Ş.",
      fields: ["Klima", "Yerden Isıtma"],
    });
    expect(res).toEqual({ ok: true, id: "lead_456" });
    const args = create.mock.calls[0][0];
    expect(args.data.type).toBe("quote");
    expect(args.data.company).toBe("Acme A.Ş.");
    expect(args.data.projectType).toBe("Isıtma Sistemi");
    expect(args.data.fields).toBe(JSON.stringify(["Klima", "Yerden Isıtma"]));
    // contact-only field stays blank on a quote row
    expect(args.data.subject).toBe("");
  });

  it("returns a generic dev-mode error (without leaking to the client message list) when the DB write throws", async () => {
    create.mockRejectedValueOnce(new Error("SQLITE_BUSY"));
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead(validContact);
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toContain("Talebiniz kaydedilemedi");
    }
  });

  it("rejects a quote with an empty phone before ever reaching the DB", async () => {
    const { createLead } = await import("@/lib/leads/actions");
    const res = await createLead({ ...validQuote, phone: "" });
    expect(res.ok).toBe(false);
    expect(create).not.toHaveBeenCalled();
  });
});

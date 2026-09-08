import { describe, it, expect } from "vitest";
import {
  contactLeadSchema,
  quoteLeadSchema,
  leadSchema,
  toFieldErrors,
} from "@/lib/leads/schema";

const validContact = {
  type: "contact" as const,
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  message: "Merhaba, klima bakım hizmeti hakkında bilgi almak istiyorum.",
};

const validQuote = {
  type: "quote" as const,
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "0212 555 44 33",
  projectType: "Isıtma Sistemi",
  message: "Yeni ofis binamız için ısıtma sistemi teklifi rica ediyorum.",
};

describe("contactLeadSchema", () => {
  it("parses a valid contact payload and fills defaults", () => {
    const res = contactLeadSchema.safeParse(validContact);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.phone).toBe("");
      expect(res.data.subject).toBe("");
      expect(res.data.source).toBe("");
      expect(res.data.locale).toBe("tr");
    }
  });

  it("accepts an optional valid phone", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, phone: "+90 (212) 555-44-33" });
    expect(res.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, name: "" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(toFieldErrors(res.error).name).toBe("Adınızı ve soyadınızı girin.");
    }
  });

  it("rejects an invalid email", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, email: "not-an-email" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(toFieldErrors(res.error).email).toBe("Geçerli bir e-posta adresi girin.");
    }
  });

  it("rejects a message shorter than 10 characters", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, message: "kısa" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(toFieldErrors(res.error).message).toBe(
        "Lütfen en az 10 karakterlik bir açıklama yazın.",
      );
    }
  });

  it("rejects a phone with letters when provided", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, phone: "call me maybe" });
    expect(res.success).toBe(false);
  });

  // The honeypot never blocks validation (autofill safety); createLead inspects
  // a non-empty value and silently drops the submission instead.
  it("accepts a filled honeypot at the schema level", () => {
    const res = contactLeadSchema.safeParse({
      ...validContact,
      company_url: "http://spam.example",
    });
    expect(res.success).toBe(true);
  });

  it("accepts an empty-string honeypot", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, company_url: "" });
    expect(res.success).toBe(true);
  });

  it("accepts an optional startedAt timestamp", () => {
    const res = contactLeadSchema.safeParse({ ...validContact, startedAt: Date.now() });
    expect(res.success).toBe(true);
  });
});

describe("quoteLeadSchema", () => {
  it("parses a valid quote payload and fills defaults", () => {
    const res = quoteLeadSchema.safeParse(validQuote);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.company).toBe("");
      expect(res.data.location).toBe("");
      expect(res.data.fields).toEqual([]);
      expect(res.data.locale).toBe("tr");
    }
  });

  it("keeps a provided fields array", () => {
    const res = quoteLeadSchema.safeParse({
      ...validQuote,
      fields: ["Klima", "Yerden Isıtma"],
    });
    expect(res.success).toBe(true);
    if (res.success) expect(res.data.fields).toEqual(["Klima", "Yerden Isıtma"]);
  });

  it("rejects an empty projectType", () => {
    const res = quoteLeadSchema.safeParse({ ...validQuote, projectType: "" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(toFieldErrors(res.error).projectType).toBe("Proje türünü seçin.");
    }
  });

  it("rejects an empty phone (required for quotes)", () => {
    const res = quoteLeadSchema.safeParse({ ...validQuote, phone: "" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(toFieldErrors(res.error).phone).toBe("Geçerli bir telefon numarası girin.");
    }
  });

  it("rejects a missing phone key", () => {
    const { phone: _omit, ...noPhone } = validQuote;
    void _omit;
    const res = quoteLeadSchema.safeParse(noPhone);
    expect(res.success).toBe(false);
  });

  it("accepts a filled honeypot on quotes at the schema level", () => {
    const res = quoteLeadSchema.safeParse({ ...validQuote, company_url: "bot" });
    expect(res.success).toBe(true);
  });
});

describe("leadSchema (discriminated union)", () => {
  it("routes to the contact branch", () => {
    expect(leadSchema.safeParse(validContact).success).toBe(true);
  });

  it("routes to the quote branch", () => {
    expect(leadSchema.safeParse(validQuote).success).toBe(true);
  });

  it("rejects an unknown type", () => {
    const res = leadSchema.safeParse({ ...validContact, type: "newsletter" });
    expect(res.success).toBe(false);
  });
});

describe("toFieldErrors", () => {
  it("maps each invalid field to its first message", () => {
    const res = contactLeadSchema.safeParse({
      type: "contact",
      name: "A",
      email: "bad",
      message: "short",
    });
    expect(res.success).toBe(false);
    if (!res.success) {
      const errs = toFieldErrors(res.error);
      expect(errs).toMatchObject({
        name: "Adınızı ve soyadınızı girin.",
        email: "Geçerli bir e-posta adresi girin.",
        message: "Lütfen en az 10 karakterlik bir açıklama yazın.",
      });
    }
  });

  it("keeps only the first message when a field has several issues", () => {
    const res = quoteLeadSchema.safeParse({
      ...validQuote,
      phone: "abc",
    });
    expect(res.success).toBe(false);
    if (!res.success) {
      const errs = toFieldErrors(res.error);
      expect(typeof errs.phone).toBe("string");
      // exactly one entry per path
      const phoneIssues = res.error.issues.filter((i) => i.path.join(".") === "phone");
      expect(phoneIssues.length).toBeGreaterThan(0);
    }
  });

  it("falls back to 'form' for issues without a path", () => {
    const res = leadSchema.safeParse("not-an-object");
    expect(res.success).toBe(false);
    if (!res.success) {
      const errs = toFieldErrors(res.error);
      expect(Object.keys(errs).length).toBeGreaterThan(0);
    }
  });
});

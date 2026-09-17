import { describe, expect, it } from "vitest";
import { siteContentSchema } from "@/lib/content/schema";
import { getDefaultSiteContent } from "@/lib/content/site";
import { leadSchema } from "@/lib/leads/schema";

describe("service-first layer", () => {
  it("defaults validate in both locales and carry the service block", () => {
    for (const l of ["tr", "en"] as const) {
      const c = siteContentSchema.parse(getDefaultSiteContent(l));
      expect(c.serviceFocus.strip.items).toHaveLength(3);
      expect(c.serviceFocus.form.devices.length).toBeGreaterThan(0);
      expect(c.serviceFocus.heroPrimary.href).toBe(`/${l}/servis-talebi`);
    }
  });
  it("service lead needs appliance + district + phone; e-mail and note optional", () => {
    const ok = leadSchema.safeParse({ type: "service", kvkk: true, name: "Ali Veli", phone: "0532 111 22 33", device: "Kombi", district: "Bakırköy" });
    expect(ok.success).toBe(true);
    if (ok.success && ok.data.type === "service") {
      expect(ok.data.email).toBe("");
      expect(ok.data.message).toBe("");
    }
    const bad = leadSchema.safeParse({ type: "service", kvkk: true, name: "Ali Veli", phone: "0532 111 22 33", device: "", district: "Bakırköy" });
    expect(bad.success).toBe(false);
  });
});

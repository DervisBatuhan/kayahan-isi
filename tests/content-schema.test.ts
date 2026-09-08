import { describe, it, expect } from "vitest";
import { siteContentSchema } from "@/lib/content/schema";
import { getDefaultSiteContent } from "@/lib/content/site";

describe("lib/content/schema — siteContentSchema", () => {
  it("accepts the default 'tr' site content", () => {
    const res = siteContentSchema.safeParse(getDefaultSiteContent("tr"));
    if (!res.success) {
      throw new Error(
        res.error.issues.map((i) => `${i.path.join(".")} — ${i.message}`).join("\n"),
      );
    }
    expect(res.success).toBe(true);
  });

  it("includes the new homeBands block in the default content", () => {
    const content = getDefaultSiteContent("tr");
    expect(content.homeBands).toBeDefined();
    expect(content.homeBands.about).toBeDefined();
    expect(content.homeBands.projects).toBeDefined();
    expect(content.homeBands.certificates).toBeDefined();
    expect(content.homeBands.media).toBeDefined();
  });

  it("rejects content missing homeBands", () => {
    const content = getDefaultSiteContent("tr") as Record<string, unknown>;
    const { homeBands: _drop, ...withoutBands } = content;
    void _drop;
    expect(siteContentSchema.safeParse(withoutBands).success).toBe(false);
  });
});

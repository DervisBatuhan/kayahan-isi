import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import { SITE_URL } from "@/lib/seo";

describe("app/robots", () => {
  it("allows the whole site except /admin, and points at the sitemap + host", () => {
    const out = robots();
    expect(out.rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    });
    expect(out.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(out.host).toBe(SITE_URL);
  });
});

import { describe, it, expect } from "vitest";
import nextConfig from "../next.config";

type Redirect = { source: string; destination: string; permanent: boolean; has?: { type: string; value: string }[] };

describe("next.config — old-domain redirects", () => {
  it("every rule is host-matched to the old domain and permanent", async () => {
    const rules = (await nextConfig.redirects!()) as Redirect[];
    expect(rules.length).toBeGreaterThan(10);
    for (const r of rules) {
      expect(r.permanent, r.source).toBe(true);
      expect(r.has?.[0]?.type, r.source).toBe("host");
      expect(new RegExp(`^${r.has![0].value}$`).test("www.kombiservisdemirdokum.com"), r.source).toBe(true);
      expect(new RegExp(`^${r.has![0].value}$`).test("www.kayahanisi.com"), r.source).toBe(false);
      expect(r.destination.startsWith("https://www.kayahanisi.com/")).toBe(true);
    }
  });
  it("maps the old service pages to the new ones and keeps a catch-all last", async () => {
    const rules = (await nextConfig.redirects!()) as Redirect[];
    const to = (src: string) => rules.find((r) => r.source === src)?.destination;
    expect(to("/hizmet/kombi-hizmetlerimiz")).toBe("https://www.kayahanisi.com/tr/kombi-servisi");
    expect(to("/hizmet/klima-hizmetlerimiz")).toBe("https://www.kayahanisi.com/tr/klima-servisi");
    expect(to("/galeri/sertifikalarimiz")).toBe("https://www.kayahanisi.com/tr/kurumsal/sertifikalarimiz");
    expect(rules.at(-1)?.source).toBe("/:path*");
  });
});

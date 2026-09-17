import { describe, it, expect } from "vitest";
import { jsonLdScript, siteGraph, breadcrumbGraph } from "@/lib/structured-data";
import { getDefaultSiteContent } from "@/lib/content/site";

describe("lib/structured-data — jsonLdScript", () => {
  it("escapes '<' so the payload cannot break out of a <script> tag", () => {
    const out = jsonLdScript({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c/script>");
  });

  it("produces valid JSON once the escape is reversed", () => {
    const data = { a: 1, b: "<x>" };
    const out = jsonLdScript(data);
    expect(JSON.parse(out.replace(/\\u003c/g, "<"))).toEqual(data);
  });
});

describe("lib/structured-data — siteGraph", () => {
  const site = getDefaultSiteContent("tr");

  it("builds an Organization/HVACBusiness + WebSite graph", () => {
    const graph = siteGraph("tr", site);
    expect(graph["@context"]).toBe("https://schema.org");
    const org = graph["@graph"].find((n) => Array.isArray(n["@type"]) && (n["@type"] as string[]).includes("Organization"));
    const website = graph["@graph"].find((n) => n["@type"] === "WebSite");
    expect(org).toBeTruthy();
    expect(website).toBeTruthy();
    expect((website as { publisher: { "@id": string } }).publisher["@id"]).toBe(
      (org as { "@id": string })["@id"],
    );
  });

  it("tags the WebSite node with inLanguage matching the given locale", () => {
    const graph = siteGraph("en", site);
    const website = graph["@graph"].find((n) => n["@type"] === "WebSite") as { inLanguage: string };
    expect(website.inLanguage).toBe("en");
  });

  it("only includes sameAs when there is at least one http(s) social link", () => {
    const noSocial = {
      ...site,
      footer: { ...site.footer, social: [] },
    };
    const graph = siteGraph("tr", noSocial);
    const org = graph["@graph"][0] as Record<string, unknown>;
    expect(org.sameAs).toBeUndefined();
  });

  it("parses street/postal/locality/region out of a free-text address", () => {
    const withAddress = {
      ...site,
      footer: {
        ...site.footer,
        contact: {
          ...site.footer.contact,
          address: "Fevzi Çakmak Cd. No: 13/1\n34180 Bahçelievler / İstanbul / Türkiye",
        },
      },
    };
    const graph = siteGraph("tr", withAddress);
    const org = graph["@graph"][0] as { address: Record<string, unknown> };
    expect(org.address).toMatchObject({
      "@type": "PostalAddress",
      streetAddress: "Fevzi Çakmak Cd. No: 13/1",
      postalCode: "34180",
      addressLocality: "Bahçelievler",
      addressRegion: "İstanbul",
      addressCountry: "Türkiye",
    });
  });

  it("falls back to Türkiye as country when the address has no country segment", () => {
    const withAddress = {
      ...site,
      footer: {
        ...site.footer,
        contact: { ...site.footer.contact, address: "Sadece bir sokak adresi" },
      },
    };
    const graph = siteGraph("tr", withAddress);
    const org = graph["@graph"][0] as { address: Record<string, unknown> };
    expect(org.address.addressCountry).toBe("Türkiye");
  });
});

describe("lib/structured-data — breadcrumbGraph", () => {
  it("builds a positioned BreadcrumbList from a crumb trail", () => {
    const crumbs = [
      { label: "Ana Sayfa", href: "/tr" },
      { label: "Kurumsal", href: "/tr/kurumsal" },
      { label: "Hakkımızda", href: "/tr/kurumsal/hakkimizda" },
    ];
    const graph = breadcrumbGraph(crumbs);
    expect(graph["@type"]).toBe("BreadcrumbList");
    expect(graph.itemListElement).toHaveLength(3);
    expect(graph.itemListElement[0]).toMatchObject({ position: 1, name: "Ana Sayfa" });
    expect(graph.itemListElement[2].position).toBe(3);
  });

  it("returns an empty itemListElement for an empty trail", () => {
    expect(breadcrumbGraph([]).itemListElement).toEqual([]);
  });
});

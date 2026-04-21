import type { MetadataRoute } from "next";
import { programmaticExamples, SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = [
    {
      url: SITE_URL,
      changeFrequency: "weekly" as const,
      priority: 1
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly" as const,
      priority: 0.3
    },
    {
      url: `${SITE_URL}/cookie-policy`,
      changeFrequency: "yearly" as const,
      priority: 0.3
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      changeFrequency: "yearly" as const,
      priority: 0.3
    }
  ];

  const programmaticPages = programmaticExamples.map((gross) => ({
    url: `${SITE_URL}/salariu-net-pentru/${gross}`,
    changeFrequency: "weekly" as const,
    priority: 0.84
  }));

  return [...basePages, ...programmaticPages];
}

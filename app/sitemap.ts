import type { MetadataRoute } from "next";
import { programmaticExamples, SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = [
    {
      url: SITE_URL,
      changeFrequency: "weekly" as const,
      priority: 1
    }
  ];

  const programmaticPages = programmaticExamples.map((gross) => ({
    url: `${SITE_URL}/salariu-net-pentru/${gross}`,
    changeFrequency: "weekly" as const,
    priority: 0.84
  }));

  return [...basePages, ...programmaticPages];
}

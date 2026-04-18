import { faqItems, SITE_URL } from "@/lib/content";

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculator salariu net din brut 2026 România",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Calculator salariu net ↔ brut România 2026 cu CAS, CASS, impozit, deduceri personale, cost angajator și facilități sectoriale.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RON"
    },
    featureList: [
      "Brut la net",
      "Net la brut",
      "Cost total angajator",
      "Proiecție anuală",
      "URL shareable"
    ]
  };
}

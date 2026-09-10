import { blogPosts } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getPdfKnowledge } from "@/lib/pdf-knowledge";

type KnowledgeEntry = {
  title: string;
  body: string;
  tags: string[];
};

const knowledgeEntries: KnowledgeEntry[] = [
  {
    title: "About Hotzonex",
    body: siteConfig.description,
    tags: ["about", "who", "company", "hotzonex"],
  },
  ...siteConfig.services.map((service) => ({
    title: service.title,
    body: `${service.summary} ${service.audience} Included: ${service.included.join(", ")}.`,
    tags: [service.slug, service.title.toLowerCase(), "service", "services"],
  })),
  ...siteConfig.locations.map((location) => ({
    title: location.name,
    body: `${location.name} is a Hotzonex location in ${location.area}. Services: ${location.services.join(", ")}. Hours: ${location.hours}.`,
    tags: [location.slug, location.name.toLowerCase(), "location", "locations", "hours"],
  })),
  ...siteConfig.faqs.map((faq) => ({
    title: faq.question,
    body: faq.answer,
    tags: [faq.category.toLowerCase(), faq.question.toLowerCase(), "faq", "question"],
  })),
  ...blogPosts.map((post) => ({
    title: post.title,
    body: `${post.excerpt} ${post.content.join(" ")}`,
    tags: [post.slug, post.category.toLowerCase(), "blog", "article", "post"],
  })),
];

const fallbackSuggestions = [
  "What services does Hotzonex offer?",
  "How can I buy a hotspot voucher?",
  "Do you provide home or office internet support?",
  "Can Hotzonex build a website or software for my business?",
  "Is WhatsApp available for quick help?",
];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getWhatsAppHint() {
  const whatsapp = siteConfig.contact.whatsapp;

  if (whatsapp.includes("TODO(") || whatsapp.includes("TODO")) {
    return "WhatsApp is available as a contact route, but the real number is still pending final setup.";
  }

  return `You can also contact Hotzonex on WhatsApp here: ${whatsapp}.`;
}

export async function getAssistantAnswer(question: string) {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return {
      answer:
        "I can help with Hotzonex services, locations, FAQ answers, and the customer guide topics. Try asking about vouchers, internet setup, IT support, website development, or WhatsApp contact.",
      suggestions: fallbackSuggestions,
    };
  }

  const pdfKnowledge = await getPdfKnowledge();
  const pdfKnowledgeEntries = pdfKnowledge
    ? [
        {
          title: "PDF guide",
          body: pdfKnowledge,
          tags: ["pdf", "guide", "customer", "hotzonex", "wifi"],
        },
      ]
    : [];

  const allKnowledgeEntries = [...pdfKnowledgeEntries, ...knowledgeEntries];

  if (normalizedQuestion.includes("whatsapp") || normalizedQuestion.includes("chat")) {
    return {
      answer:
        `${getWhatsAppHint()} I can also answer questions about hotspot vouchers, home internet, IT support, website development, and location information.`,
      suggestions: fallbackSuggestions,
    };
  }

  const matches = allKnowledgeEntries
    .map((entry) => {
      const haystack = `${entry.title} ${entry.body} ${entry.tags.join(" ")}`.toLowerCase();
      let score = 0;

      if (haystack.includes(normalizedQuestion)) {
        score += 5;
      }

      entry.tags.forEach((tag) => {
        if (normalizedQuestion.includes(tag)) {
          score += 2;
        }
      });

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const best = matches[0].entry;
    const answer = best.body.length > 500 ? `${best.body.slice(0, 500)}...` : best.body;

    return {
      answer: `${best.title}: ${answer}`,
      suggestions: fallbackSuggestions,
    };
  }

  return {
    answer:
      "I can help with Hotzonex hotspot vouchers, home and office internet, IT support, website and software development, and the locations listed on this site. Try asking about one of those topics or ask for WhatsApp help.",
    suggestions: fallbackSuggestions,
  };
}

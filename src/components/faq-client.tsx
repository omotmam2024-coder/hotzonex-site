"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { Faq } from "@/lib/guide";

export function FaqClient({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  // Tracked by question rather than list position, so filtering never opens a different answer.
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.question ?? null);

  const categories = useMemo(() => ["All", ...new Set(faqs.map((item) => item.category))], [faqs]);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return faqs.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, faqs, query]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <label htmlFor="faq-search" className="mb-2 block text-sm font-medium text-foreground">
          Search FAQs
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            id="faq-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions or answers"
            className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={category === activeCategory}
            onClick={() => setActiveCategory(category)}
            className={category === activeCategory ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground" : "rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isOpen = openQuestion === item.question;

            return (
              <div key={`${item.category}-${item.question}`} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{item.category}</p>
                    <h3 className="mt-1 text-base font-semibold text-foreground">{item.question}</h3>
                  </div>
                  <ChevronDown className={isOpen ? "h-5 w-5 shrink-0 rotate-180 transition-transform" : "h-5 w-5 shrink-0 transition-transform"} />
                </button>

                {isOpen && (
                  <div className="border-t border-border bg-background px-5 py-4">
                    <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-base font-medium text-foreground">No results found.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another search term or switch categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}

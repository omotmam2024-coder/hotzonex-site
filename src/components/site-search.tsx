"use client";

import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

export type SearchItem = {
  type: string;
  title: string;
  description: string;
  href: string;
  category?: string;
};

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items.slice(0, 8);
    }

    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.category ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, query]);

  return (
    <>
      <section className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <label htmlFor="site-search" className="mb-2 block text-sm font-medium text-foreground">
          Search content
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a service, location, FAQ, or blog topic"
            className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      <section className="mt-10 space-y-4" aria-live="polite">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link
              key={`${item.type}-${item.title}`}
              href={item.href}
              className="block rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/50"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span>{item.type}</span>
                {item.category ? <span className="text-muted-foreground">• {item.category}</span> : null}
              </div>
              <h2 className="mt-3 text-xl font-black text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-base font-medium text-foreground">No matches found.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another keyword, or ask the assistant in the corner of the page.</p>
          </div>
        )}
      </section>
    </>
  );
}

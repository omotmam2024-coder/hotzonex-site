"use client";

import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { blogPosts } from "@/config/content";
import { siteConfig } from "@/config/site";

const allSearchItems = [
  ...blogPosts.map((post) => ({
    type: "Blog post",
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    category: post.category,
  })),
  ...siteConfig.services.map((service) => ({
    type: "Service",
    title: service.title,
    description: service.summary,
    href: `/services/${service.slug}`,
    category: service.highlight,
  })),
  ...siteConfig.locations.map((location) => ({
    type: "Location",
    title: location.name,
    description: `${location.area} • ${location.hours}`,
    href: `/locations/${location.slug}`,
    category: location.status,
  })),
  ...siteConfig.faqs.map((faq) => ({
    type: "FAQ",
    title: faq.question,
    description: faq.answer,
    href: "/faq",
    category: faq.category,
  })),
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return allSearchItems.slice(0, 8);
    }

    return allSearchItems.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.category ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Search</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Find Hotzonex content across services, locations, FAQs, and blog posts.</h1>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="African search and support resources"
            className="h-[260px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Site content</p>
              <p className="mt-2 text-xl font-black text-white">Search everything in one place</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <label htmlFor="site-search" className="mb-2 block text-sm font-medium text-foreground">
          Search content
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a service, location, FAQ, or blog topic"
            className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      <section className="mt-10 space-y-4">
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
            <p className="mt-2 text-sm text-muted-foreground">Try another keyword to search the site content.</p>
          </div>
        )}
      </section>
    </div>
  );
}

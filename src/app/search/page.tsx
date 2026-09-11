import type { Metadata } from "next";
import Image from "next/image";

import { SiteSearch, type SearchItem } from "@/components/site-search";
import { blogPosts } from "@/config/content";
import { siteConfig } from "@/config/site";
import { guideFaqs } from "@/lib/guide";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Hotzonex services, office locations, FAQs and blog posts.",
};

// Built on the server so only the search index — not the config modules — reaches the browser.
const searchItems: SearchItem[] = [
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
    description: `${location.hours} • Vouchers from ${location.vouchersFrom} • ${location.services.join(", ")}`,
    href: `/locations/${location.slug}`,
    category: location.status,
  })),
  ...[...guideFaqs, ...siteConfig.faqs].map((faq) => ({
    type: "FAQ",
    title: faq.question,
    description: faq.answer,
    href: "/faq",
    category: faq.category,
  })),
  ...blogPosts.map((post) => ({
    type: "Blog post",
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    category: post.category,
  })),
];

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Search</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Find Hotzonex content across services, locations, FAQs, and blog posts.</h1>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="Two people pointing at a laptop screen"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
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

      <SiteSearch items={searchItems} />
    </div>
  );
}

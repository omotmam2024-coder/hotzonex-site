import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { blogCategories, blogPosts } from "@/config/content";
import { officeAlt, officeImages } from "@/lib/office-images";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read helpful Hotzonex articles about hotspots, connectivity, and digital support.",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "All" } = await searchParams;
  const activeCategory = category && category !== "All" ? category : "All";
  const filteredPosts = activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Blog</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Helpful insights for connectivity, support, and digital growth.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Browse practical articles about hotspot access, internet planning, troubleshooting, and the role of digital tools for local businesses.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <Image
            src={officeImages.equipment}
            alt={officeAlt.equipment}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[300px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Fresh insights</p>
              <p className="mt-2 text-xl font-black text-white">Clear guidance for real-world connectivity needs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-2">
        {blogCategories.map((item) => {
          const isActive = item === activeCategory;

          return (
            <Link
              key={item}
              href={item === "All" ? "/blog" : `/blog?category=${encodeURIComponent(item)}`}
              className={isActive ? "rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground" : "rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"}
            >
              {item}
            </Link>
          );
        })}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{post.category}</p>
              <h2 className="mt-3 text-2xl font-black text-foreground">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary">
                  Read article
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center lg:col-span-3">
            <p className="text-base font-medium text-foreground">No posts found for this category yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another category or return to the full blog archive.</p>
          </div>
        )}
      </section>
    </div>
  );
}

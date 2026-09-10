import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts } from "@/config/content";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: "Blog article",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm font-semibold text-primary">
        ← Back to blog
      </Link>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
        <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">{post.title}</h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mt-8 space-y-5 text-base leading-8 text-foreground/90">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-black text-foreground">Related posts</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {relatedPosts.map((relatedPost) => (
            <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{relatedPost.category}</p>
              <h3 className="mt-3 text-xl font-black text-foreground">{relatedPost.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{relatedPost.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

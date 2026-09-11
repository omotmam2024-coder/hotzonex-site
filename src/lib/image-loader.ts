"use client";

type LoaderProps = { src: string; width: number; quality?: number };

/**
 * next/image loader for Unsplash, which resizes and re-encodes (WebP/AVIF) on its
 * own CDN. Every <Image> gets a responsive srcset, so phones download a ~640px
 * image instead of the full 1200px original — without using Vercel's image
 * optimisation quota.
 */
export default function imageLoader({ src, width, quality }: LoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}

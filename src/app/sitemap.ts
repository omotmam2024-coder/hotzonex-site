import type { MetadataRoute } from "next";

import { blogPosts } from "@/config/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/pricing", "/locations", "/faq", "/blog", "/contact", "/search", "/privacy", "/terms"];

  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/pricing" || path === "/locations" ? 0.9 : 0.6,
    })),
    ...siteConfig.services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...siteConfig.locations.map((location) => ({
      url: `${siteConfig.url}/locations/${location.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}

import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Restricts framing, plugins, form targets and <base> rewriting. Scripts are not
  // restricted here: that needs per-request nonces, which would end static rendering.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // www.hotzonex.dev is the one canonical address. Vercel's domain settings
      // redirect the apex hotzonex.dev to it; the old Vercel alias redirects here so
      // search engines and shared links never split between copies. Do not add an
      // www -> apex rule: with Vercel's apex -> www redirect that loops forever.
      // Per-deployment preview URLs do not match and keep working.
      {
        source: "/:path*",
        has: [{ type: "host", value: "hotzonex-site(-omot-mam-s-projects)?\\.vercel\\.app" }],
        destination: "https://www.hotzonex.dev/:path*",
        permanent: true,
      },
      // "Jebel Iraq" was listed separately from the Head Office it duplicated.
      { source: "/locations/jebel-iraq", destination: "/locations/head-office", permanent: true },
      // The blog and site search were retired; send old links somewhere useful.
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/search", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

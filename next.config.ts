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
      // hotzonex.dev is the one canonical address: www and the old Vercel aliases
      // redirect to it so search engines and shared links never split between copies.
      // Per-deployment preview URLs do not match and keep working.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.hotzonex\\.dev" }],
        destination: "https://hotzonex.dev/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "hotzonex-site(-omot-mam-s-projects)?\\.vercel\\.app" }],
        destination: "https://hotzonex.dev/:path*",
        permanent: true,
      },
      // "Jebel Iraq" was listed separately from the Head Office it duplicated.
      { source: "/locations/jebel-iraq", destination: "/locations/head-office", permanent: true },
    ];
  },
};

export default nextConfig;

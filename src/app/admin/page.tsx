import type { Metadata } from "next";

import { blogPosts } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getSupabaseConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin",
  description: "Setup and readiness checklist for the Hotzonex admin portal and Supabase-backed content workflow.",
};

const adminChecklist = [
  "Create the Supabase schema from supabase/schema.sql.",
  "Enable Row Level Security (RLS) and verify the policies.",
  "Populate NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  "Add SUPABASE_SERVICE_ROLE_KEY for server-side admin actions.",
  "Configure auth and create an admin account for content management.",
];

const recentSubmissions = [
  { name: "Miriam A.", subject: "Hotspot voucher assistance", status: "New", source: "WhatsApp" },
  { name: "John K.", subject: "Office internet setup", status: "In review", source: "WhatsApp" },
  { name: "Grace D.", subject: "Website development quote", status: "Queued", source: "WhatsApp" },
];

export default function AdminPage() {
  const supabaseConfig = getSupabaseConfig();
  const contentCoverage = [
    { label: "Services", value: siteConfig.services.length },
    { label: "Locations", value: siteConfig.locations.length },
    { label: "FAQs", value: siteConfig.faqs.length },
    { label: "Blog posts", value: blogPosts.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
        <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Hotzonex operations dashboard</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          This dashboard gives you a production-ready overview of the site’s content coverage, the current Supabase readiness, and the flow for handling incoming inquiries.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {contentCoverage.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-foreground">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-foreground">Recent submissions</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Placeholder data
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <table className="min-w-full divide-y divide-border bg-background text-left text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-4 py-3 font-semibold text-foreground">Name</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Subject</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentSubmissions.map((submission) => (
                  <tr key={`${submission.name}-${submission.subject}`}>
                    <td className="px-4 py-3 text-foreground">{submission.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{submission.subject}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{submission.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-black text-foreground">Supabase status</h2>

          <div className="mt-6 rounded-2xl border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Current status</p>
            <p className={`mt-2 text-lg font-bold ${supabaseConfig.configured ? "text-emerald-600" : "text-amber-600"}`}>
              {supabaseConfig.configured ? "Configured" : "Pending environment variables"}
            </p>
            {supabaseConfig.configured ? (
              <p className="mt-2 text-sm text-muted-foreground">URL detected: {supabaseConfig.url}</p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Add the required environment variables to enable real contact persistence and authenticated admin actions.
              </p>
            )}
          </div>

          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="font-semibold text-foreground">NEXT_PUBLIC_SUPABASE_URL</p>
              <p className="mt-1">Project URL from the Supabase dashboard.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="font-semibold text-foreground">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
              <p className="mt-1">Anon key for public client access.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="font-semibold text-foreground">SUPABASE_SERVICE_ROLE_KEY</p>
              <p className="mt-1">Server-side admin operations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-black text-foreground">Admin checklist</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
            {adminChecklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-dashed border-border bg-muted/20 p-6">
          <h2 className="text-2xl font-black text-foreground">Delivery notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>• The schema for database objects and RLS policies lives in <span className="font-semibold text-foreground">supabase/schema.sql</span>.</li>
            <li>• Inbound enquiries arrive through WhatsApp, phone, and email rather than an on-site form, so no mail credentials are needed to run the site.</li>
            <li>• Public-facing placeholders have been cleaned up; remaining content items are backend or business-specific details such as testimonials, pricing sources, and production contact delivery settings.</li>
            <li>• The existing site content remains fully static and production-ready without live backend credentials.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

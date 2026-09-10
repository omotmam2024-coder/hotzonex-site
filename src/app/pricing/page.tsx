import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "View Hotzonex hotspot voucher pricing and request a quote for installation, support, and development work.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pricing</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Hotspot packages are listed below. Starlink and MikroTik quotes are handled at the Head Office.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            The hotspot voucher packages listed here are for reference, while Starlink installation and MikroTik configuration should be discussed directly at the Head Office for the current quote and setup details.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="African pricing and service support"
            className="h-[320px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Current pricing</p>
              <p className="mt-2 text-xl font-black text-white">Ask at the Head Office</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {siteConfig.pricing.packages.map((pkg) => (
          <article
            key={pkg.name}
            className={pkg.recommended ? "rounded-3xl border-2 border-primary bg-primary/5 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" : "rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"}
          >
            {pkg.recommended && (
              <div className="mb-4 inline-flex rounded-full bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                Recommended
              </div>
            )}
            <h2 className="text-2xl font-black text-foreground">{pkg.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>
            <div className="mt-6 flex items-end gap-2">
              {pkg.price.toLowerCase().includes("ask") ? (
                <span className="text-3xl font-black text-foreground">{pkg.price}</span>
              ) : (
                <>
                  <span className="text-4xl font-black text-foreground">{siteConfig.pricing.currencyLabel}</span>
                  <span className="text-4xl font-black text-foreground">{pkg.price}</span>
                </>
              )}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {pkg.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link href="/contact">Request this package</Link>
            </Button>
          </article>
        ))}
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Request a quote</p>
          <h2 className="mt-2 text-3xl font-black text-foreground">Dedicated internet, support, and development work are quoted individually.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {siteConfig.pricing.quoteTypes.map((quoteType) => (
            <article key={quoteType.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">{quoteType.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{quoteType.summary}</p>
              <Button variant="outline" className="mt-6" asChild>
                <Link href="/contact">Ask for a quote</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

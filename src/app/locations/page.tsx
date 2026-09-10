import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Hotzonex hotspot and support locations in Juba, South Sudan.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Locations</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Visit a Hotzonex location or contact us for support.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Hotzonex operates multiple service points in Juba, each with its own hotspot network, business hours, and support focus.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="African office and service locations"
            className="h-[320px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Service coverage</p>
              <p className="mt-2 text-xl font-black text-white">Three key locations in Juba</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {siteConfig.locations.map((location) => (
          <article key={location.slug} className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-foreground">{location.name}</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700">
                {location.status}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <p><span className="font-semibold text-foreground">Area:</span> {location.area}</p>
              <p><span className="font-semibold text-foreground">Hours:</span> {location.hours}</p>
              <p><span className="font-semibold text-foreground">Address:</span> {location.address}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Services available</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {location.services.map((service) => (
                  <li key={service}>• {service}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={`/locations/${location.slug}`} className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                View details
              </Link>
              <Link href={location.mapUrl} className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground">
                {location.directionsLabel}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

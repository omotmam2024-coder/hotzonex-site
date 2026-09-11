import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Hotzonex Wi-Fi offices in Juba: Gorom Home Office, Jebel-Iraq Head Office and Jebel-Iraq Sub Office — opening hours, networks and voucher prices.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Locations</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Visit a Hotzonex office or contact us for support.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Each office runs its own Wi-Fi networks, opening hours and price list. A voucher works only at the office
            where it was bought.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Three people laughing around laptops at a café table"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[320px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Service coverage</p>
              <p className="mt-2 text-xl font-black text-white">{siteConfig.locations.length} offices in Juba</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {siteConfig.locations.map((location) => (
          <article key={location.slug} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-black text-foreground">{location.name}</h2>
              <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700">
                {location.status}
              </span>
            </div>

            <dl className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div><dt className="inline font-semibold text-foreground">Hours: </dt><dd className="inline">{location.hours}</dd></div>
              <div><dt className="inline font-semibold text-foreground">Vouchers from: </dt><dd className="inline">{location.vouchersFrom}</dd></div>
              <div><dt className="inline font-semibold text-foreground">Area: </dt><dd className="inline">{location.area}</dd></div>
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Services available</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {location.services.map((service) => (
                  <li key={service}>• {service}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row lg:flex-col xl:flex-row">
              <Link href={`/locations/${location.slug}`} className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                View details
              </Link>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground"
              >
                Get directions
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

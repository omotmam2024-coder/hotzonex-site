import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { officeAlt, officeImages } from "@/lib/office-images";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Hotzonex Wi-Fi offices in Juba: Gorom Home Office, Jebel-Iraq Head Office and Jebel-Iraq Sub Office — opening hours, networks and voucher prices.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Visit a Hotzonex office or contact us for support.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Each office runs its own Wi-Fi networks, opening hours and price list. A voucher works only at the office
            where it was bought.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={officeImages.wide}
            alt={officeAlt.wide}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[320px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {siteConfig.locations.map((location) => (
          <article key={location.slug} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-extrabold text-foreground">{location.name}</h2>
              <span className="shrink-0 rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
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
              <Link href={`/locations/${location.slug}`} prefetch={false} className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                View details
              </Link>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-foreground/25 px-5 py-3 text-sm font-semibold text-foreground"
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

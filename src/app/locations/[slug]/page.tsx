import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { officeAlt, officeImages } from "@/lib/office-images";

export async function generateStaticParams() {
  return siteConfig.locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = siteConfig.locations.find((item) => item.slug === slug);

  if (!location) {
    return {
      title: "Location details",
      description: "Location details for Hotzonex Wi-Fi offices in Juba.",
    };
  }

  return {
    title: location.name,
    description: `${location.name}, ${location.area}. Open ${location.hours}. Wi-Fi vouchers from ${location.vouchersFrom}. Services: ${location.services.join(", ")}.`,
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = siteConfig.locations.find((item) => item.slug === slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
        <Link href="/locations" className="font-medium text-primary">Locations</Link>
        <span>/</span>
        <span>{location.name}</span>
      </div>

      <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
        <div className="relative">
          <Image
            src={officeImages.wide}
            alt={officeAlt.wide}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 1024px"
            loading="eager"
            className="h-72 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Location</p>
                <h1 className="mt-2 text-3xl font-black text-white">{location.name}</h1>
              </div>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                {location.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <dl className="space-y-4 text-sm text-muted-foreground">
                <div><dt className="inline font-semibold text-foreground">Hours: </dt><dd className="inline">{location.hours}</dd></div>
                <div><dt className="inline font-semibold text-foreground">Vouchers from: </dt><dd className="inline">{location.vouchersFrom}</dd></div>
                <div><dt className="inline font-semibold text-foreground">Address: </dt><dd className="inline">{location.address}</dd></div>
              </dl>

              <div>
                <h2 className="text-lg font-black text-foreground">Wi-Fi networks</h2>
                <ul className="mt-3 space-y-2 font-mono text-sm text-foreground">
                  {location.networks.map((network) => (
                    <li key={network}>{network}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Vouchers bought here work only on this office&apos;s networks, even where a network name also appears at
                  another office.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-black text-foreground">Services available</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {location.services.map((service) => (
                  <li key={service}>• {service}</li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-6 inline-block text-sm font-semibold text-primary">
                See voucher prices →
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/locations">Back to locations</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

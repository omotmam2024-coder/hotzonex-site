import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

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

      <article>
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-4xl font-extrabold sm:text-5xl">{location.name}</h1>
            <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
              {location.status}
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <dl className="space-y-4 text-sm text-muted-foreground">
                <div><dt className="inline font-semibold text-foreground">Hours: </dt><dd className="inline">{location.hours}</dd></div>
                <div><dt className="inline font-semibold text-foreground">Vouchers from: </dt><dd className="inline">{location.vouchersFrom}</dd></div>
                <div><dt className="inline font-semibold text-foreground">Address: </dt><dd className="inline">{location.address}</dd></div>
              </dl>

              <div>
                <h2 className="text-lg font-extrabold text-foreground">Wi-Fi networks</h2>
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
              <h2 className="text-2xl font-extrabold text-foreground">Services available</h2>
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

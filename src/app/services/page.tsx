import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { officeAlt, officeImages } from "@/lib/office-images";
import { photoAlt, photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Hotzonex services including hotspot vouchers, home and office internet, IT support, and website/software development.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Hotzonex services designed around real customer needs.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            From public WiFi vouchers to Starlink, MikroTik, and custom development, Hotzonex delivers practical solutions that help homes, offices, and businesses stay connected.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={officeImages.servicesWall}
            alt={officeAlt.servicesWall}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[360px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {siteConfig.services.map((service) => (
          <article key={service.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
            {service.image ? (
              <Image
                src={photos[service.image]}
                alt={photoAlt[service.image]}
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-52 w-full object-cover"
              />
            ) : null}

            <div className="p-6">
              <p className="text-sm font-semibold text-primary">{service.highlight}</p>
              <h2 className="mt-3 text-2xl font-extrabold text-foreground">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.summary}</p>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-foreground">Who it is for</p>
                <p className="text-sm text-muted-foreground">{service.audience}</p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground">What is included</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {service.included.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                View service details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

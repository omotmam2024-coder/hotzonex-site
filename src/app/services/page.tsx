import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Hotzonex services including hotspot vouchers, home and office internet, IT support, and website/software development.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Services</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Hotzonex services designed around real customer needs.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            From public WiFi vouchers to Starlink, MikroTik, and custom development, Hotzonex delivers practical solutions that help homes, offices, and businesses stay connected.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
            alt="African support and technical services"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[360px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Trusted solutions</p>
              <p className="mt-2 text-xl font-black text-white">Connectivity, support, and digital growth</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {siteConfig.services.map((service) => (
          <article key={service.slug} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.imageAlt ?? service.title}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-52 w-full object-cover"
              />
            ) : null}

            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{service.highlight}</p>
              <h2 className="mt-3 text-2xl font-black text-foreground">{service.title}</h2>
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

              <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                View service details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

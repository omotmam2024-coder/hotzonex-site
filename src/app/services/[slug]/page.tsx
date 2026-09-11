import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { officeAlt, officeImages } from "@/lib/office-images";

export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Service detail", description: "Hotzonex service detail page." };
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
        <Link href="/services" className="font-medium text-primary">Services</Link>
        <span>/</span>
        <span>{service.title}</span>
      </div>

      <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {service.image ? (
          <Image
            src={officeImages[service.image]}
            alt={officeAlt[service.image]}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 1024px"
            loading="eager"
            className="h-72 w-full object-cover"
          />
        ) : null}

        <div className="p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{service.highlight}</p>
          <h1 className="mt-3 text-4xl font-black text-foreground">{service.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{service.summary}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-foreground">Who it is for</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.audience}</p>

            <h2 className="mt-8 text-2xl font-black text-foreground">What is included</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {service.included.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-black text-foreground">How to get it</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              {service.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">{service.cta}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">Back to services</Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </article>
    </div>
  );
}

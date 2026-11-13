import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { VoucherTicket, type VoucherOffice } from "@/components/voucher-ticket";
import { siteConfig } from "@/config/site";
import { lowestVoucherPrice, priceTables } from "@/lib/guide";
import { photoAlt, photos } from "@/lib/photos";

/** One voucher per office: the guide's price list joined to that office's hours and map pin. */
const voucherOffices: VoucherOffice[] = siteConfig.locations.flatMap((location) => {
  const table = priceTables.find((candidate) => candidate.office === location.name);
  if (!table) return [];

  // The descriptive column ("Good for", "Where it sits in the range"), not the per-hour cost.
  const noteColumn = table.columns.findIndex(
    (column, index) => index > 0 && index !== table.priceColumn && !/^cost per /i.test(column),
  );

  return [
    {
      slug: location.slug,
      tab: location.name.replace(/^Jebel-Iraq /, "").replace(/ Home Office$/, ""),
      name: location.name,
      hours: location.hours,
      mapUrl: location.mapUrl,
      packages: table.rows.map((row) => {
        const note = noteColumn > 0 ? row[noteColumn] : undefined;
        return {
          name: row[0],
          price: row[table.priceColumn],
          note: note?.replace(/^best value\s*[—-]\s*/i, ""),
          bestValue: /best value/i.test(note ?? ""),
        };
      }),
    },
  ];
});

const voucherService = siteConfig.services.find((service) => service.slug === "wifi-hotspot-vouchers");

const phoneHref = `tel:+${siteConfig.contact.phone.replace(/\D/g, "")}`;
const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;

function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-deep">
        <Image
          src={photos.people}
          alt={photoAlt.people}
          placeholder="blur"
          fill
          sizes="100vw"
          quality={50}
          preload
          className="-z-20 object-cover"
        />
        {/* Darkens the photo so the headline and copy stay readable over it. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep/90 via-deep/70 to-deep/40" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:pt-10">
            <h1 className="max-w-xl text-5xl font-extrabold leading-[1.02] text-deep-foreground sm:text-6xl lg:text-7xl">
              Prepaid Wi-Fi in Juba{lowestVoucherPrice ? `, from ${lowestVoucherPrice}.` : "."}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-deep-foreground">
              Buy a voucher at a Hotzonex office, join the office network and enter your code. We also connect homes
              and offices, install Starlink, set up MikroTik hotspots and build websites.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" asChild size="lg">
                <Link href="/pricing">See all prices</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/locations">Find an office</Link>
              </Button>
            </div>
          </div>

          <VoucherTicket offices={voucherOffices} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="offices-heading">
        <h2 id="offices-heading" className="text-3xl font-bold sm:text-4xl">
          {siteConfig.locations.length} offices in Juba
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          {siteConfig.locations.map((location) => (
            <article key={location.slug} className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-xl font-bold">{location.name}</h3>
              <p className="mt-1 text-sm">{location.area}</p>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Hours</dt>
                  <dd className="mt-0.5 text-muted-foreground">{location.hours}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Networks</dt>
                  <dd className="mt-0.5 text-muted-foreground">{location.networks.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Vouchers from</dt>
                  <dd className="font-display mt-0.5 text-xl font-extrabold text-foreground">{location.vouchersFrom}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary md:mt-auto md:pt-6">
                <a href={location.mapUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline">
                  Get directions
                </a>
                <Link href={`/locations/${location.slug}`} prefetch={false} className="underline underline-offset-4 hover:no-underline">
                  Office details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border" aria-labelledby="services-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <h2 id="services-heading" className="text-3xl font-bold sm:text-4xl">
              What Hotzonex does
            </h2>
            <p className="mt-4 max-w-md text-base leading-7">
              Vouchers are sold at fixed prices. Everything else is quoted for your site: tell us what you need and
              where, and the Head Office replies with a price.
            </p>
          </div>

          <ul className="divide-y divide-border border-y border-border lg:self-start">
            {siteConfig.services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} prefetch={false} className="group block py-5">
                  <h3 className="text-lg font-bold group-hover:text-primary">{service.title}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-6">{firstSentence(service.summary)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {voucherService && (
        <section className="bg-deep text-deep-foreground" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {/* Explicit colour: the global heading style would otherwise paint it dark on this dark section. */}
            <h2 id="steps-heading" className="text-3xl font-bold text-deep-foreground sm:text-4xl">
              Get online in {voucherService.steps.length} steps
            </h2>

            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {voucherService.steps.map((step, index) => (
                <li key={step} className="border-t-2 border-accent pt-5">
                  <span className="font-display text-5xl font-extrabold text-accent">{index + 1}</span>
                  <p className="mt-3 text-lg leading-7 text-deep-foreground">{step}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-base text-deep-muted">
              Code not working?{" "}
              <Link href="/faq" prefetch={false} className="font-semibold text-deep-foreground underline underline-offset-4 hover:no-underline">
                Check the FAQ
              </Link>{" "}
              or ask at the counter.
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="contact-heading">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <h2 id="contact-heading" className="text-3xl font-bold sm:text-4xl">
              Talk to us
            </h2>
            <p className="mt-4 max-w-md text-base leading-7">
              For a home or office connection, Starlink, MikroTik or a website, message us with your location and
              what you need. We answer {siteConfig.contact.hours.toLowerCase()}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" size="lg" asChild>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={phoneHref}>Call {siteConfig.contact.phone}</a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/contact" prefetch={false}>All contact details</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

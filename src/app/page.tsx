import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Globe, House, MessageCircle, Router, Satellite, Wifi, Wrench, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VoucherTicket, type VoucherOffice } from "@/components/voucher-ticket";
import { siteConfig } from "@/config/site";
import { lowestVoucherPrice, priceTables } from "@/lib/guide";
import { photoAlt, photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

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

const serviceIcons: Record<string, LucideIcon> = {
  "wifi-hotspot-vouchers": Wifi,
  "home-office-internet": House,
  "network-setup-it-support": Wrench,
  "starlink-installation-activation": Satellite,
  "mikrotik-configuration-hotspot": Router,
  "website-software-development": Code,
};

/** Distinct Wi-Fi network names across the offices, ignoring notes like "(and 5G)". */
const networkCount = new Set(
  siteConfig.locations.flatMap((location) => location.networks.map((network) => network.replace(/\s*\(.*\)$/, ""))),
).size;

const stats = [
  { value: "24/7", label: "Wi-Fi at the Gorom office", highlight: true },
  { value: String(networkCount), label: "Hotzonex Wi-Fi networks" },
  { value: lowestVoucherPrice ?? "SSP", label: "Cheapest voucher", small: true },
  { value: String(siteConfig.services.length), label: "Services we offer" },
];

// The access point photo, sized small, shows through the big office count.
const figureFill = getImageProps({ src: photos.accessPoint, alt: "", width: 640, quality: 50 }).props.src;

function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        {/* Faint line icons scattered behind the copy, as in the mockup. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 text-primary-foreground/15">
          <MessageCircle className="absolute left-[4%] top-[46%] h-16 w-16" strokeWidth={1.25} />
          <Globe className="absolute left-[46%] bottom-[8%] h-20 w-20" strokeWidth={1} />
          <Wifi className="absolute right-[6%] top-[10%] h-24 w-24" strokeWidth={1} />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          <h1 className="font-poster text-[clamp(2.6rem,10.5vw,7rem)] text-primary-foreground">
            Prepaid Wi-Fi
            <span className="block">
              in Juba
              {lowestVoucherPrice && (
                <span className="font-display mt-4 block w-fit rounded-lg bg-accent px-3 py-1.5 align-middle text-base font-extrabold normal-case tracking-normal text-accent-foreground sm:ml-4 sm:mt-0 sm:inline-block sm:-translate-y-[0.35em] sm:text-xl lg:ml-6">
                  from {lowestVoucherPrice}
                </span>
              )}
            </span>
          </h1>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_minmax(0,25rem)] lg:gap-14">
            <div className="flex flex-col gap-10">
              <div>
                <p className="max-w-lg text-lg leading-8 text-primary-foreground">
                  Buy a voucher at a Hotzonex office, join the office network and enter your code. We also connect
                  homes and offices, install Starlink, set up MikroTik hotspots and build websites.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button variant="secondary" asChild size="lg">
                    <Link href="/pricing">See all prices</Link>
                  </Button>
                  <Button variant="inverse" size="lg" asChild>
                    <Link href="/locations">Find an office</Link>
                  </Button>
                </div>
              </div>

              {/* Desktop only: on a phone the voucher prices matter more than the picture. */}
              <div className="relative hidden flex-1 lg:block">
                <Image
                  src={photos.people}
                  alt={photoAlt.people}
                  placeholder="blur"
                  fill
                  sizes="640px"
                  quality={50}
                  className="rounded-3xl object-cover ring-4 ring-primary-foreground/15"
                />
                <p className="absolute -left-3 top-6 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg">
                  <Wifi className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Join HOTZONEX-WIFI
                </p>
              </div>
            </div>

            <VoucherTicket offices={voucherOffices} />
          </div>
        </div>
      </section>

      <section className="bg-muted/60" aria-labelledby="offices-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <dl className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={
                    stat.highlight
                      ? "flex flex-col rounded-2xl bg-primary p-6 text-primary-foreground shadow-[6px_6px_0_var(--deep)]"
                      : "flex flex-col rounded-2xl border border-border bg-card p-6"
                  }
                >
                  <dt className={stat.highlight ? "mt-1 text-sm text-primary-muted" : "mt-1 text-sm text-muted-foreground"}>
                    {stat.label}
                  </dt>
                  <dd
                    className={cn(
                      "font-display -order-1 whitespace-nowrap font-black",
                      stat.small ? "text-2xl leading-[2.5rem] sm:text-3xl" : "text-3xl sm:text-4xl",
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="text-center lg:text-left">
              <p className="relative inline-block select-none" aria-hidden>
                <span className="font-poster text-hollow absolute left-[0.08em] top-[0.06em] text-[11rem] sm:text-[14rem]">
                  {siteConfig.locations.length}
                </span>
                <span
                  className="font-poster relative bg-primary bg-cover bg-center bg-clip-text text-[11rem] text-transparent sm:text-[14rem]"
                  style={{ backgroundImage: `url(${figureFill})` }}
                >
                  {siteConfig.locations.length}
                </span>
              </p>
              <h2 id="offices-heading" className="font-poster text-2xl text-primary sm:text-3xl">
                {siteConfig.locations.length} offices in Juba
              </h2>
              <p className="mt-3 max-w-sm text-base leading-7 max-lg:mx-auto">
                Each office sells its own vouchers for its own Wi-Fi. Walk in, pay at the counter and you are online.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {siteConfig.locations.map((location) => (
              <article key={location.slug} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-extrabold">{location.name}</h3>
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
                    <dd className="font-display mt-0.5 text-2xl font-black text-primary">{location.vouchersFrom}</dd>
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
        </div>
      </section>

      <section aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we do</p>
            <h2 id="services-heading" className="mt-2 text-3xl font-black sm:text-5xl">
              More than <span className="whitespace-nowrap">Wi-Fi</span> vouchers
            </h2>
            <p className="mt-4 text-base leading-7">
              Vouchers are sold at fixed prices. Everything else is quoted for your site: tell us what you need and
              where, and the Head Office replies with a price.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service) => {
              const Icon = serviceIcons[service.slug] ?? Wifi;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    prefetch={false}
                    className="group flex h-full flex-col rounded-2xl bg-muted p-6 transition-colors hover:bg-primary"
                  >
                    <span className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-primary transition-colors group-hover:text-accent" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-lg font-extrabold group-hover:text-primary-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 group-hover:text-primary-muted">{firstSentence(service.summary)}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {voucherService && (
        <section className="bg-primary text-primary-foreground" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {/* Explicit colour: the global heading style would otherwise paint it dark on this blue section. */}
            <h2 id="steps-heading" className="font-poster text-4xl text-primary-foreground sm:text-6xl">
              Get online in {voucherService.steps.length} steps
            </h2>

            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {voucherService.steps.map((step, index) => (
                <li key={step} className="rounded-2xl bg-primary-foreground/10 p-6 ring-1 ring-primary-foreground/15">
                  <span className="font-display flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl font-black text-accent-foreground">
                    {index + 1}
                  </span>
                  <p className="mt-5 text-lg leading-7 text-primary-foreground">{step}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-base text-primary-muted">
              Code not working?{" "}
              <Link href="/faq" prefetch={false} className="font-semibold text-accent underline underline-offset-4 hover:no-underline">
                Check the FAQ
              </Link>{" "}
              or ask at the counter.
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Talk to us</p>
          <h2 id="contact-heading" className="mt-2 text-3xl font-black sm:text-5xl">
            Get your home or office connected
          </h2>
          <p className="mt-4 text-base leading-7">
            For a home or office connection, Starlink, MikroTik or a website, message us with your location and what
            you need. We answer {siteConfig.contact.hours.toLowerCase()}.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" size="lg" asChild>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            </Button>
            <Button size="lg" asChild>
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

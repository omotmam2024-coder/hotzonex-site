import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Wifi, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { lowestVoucherPrice } from "@/lib/guide";

const services = [
  {
    title: "WiFi hotspot & vouchers",
    description:
      "Prepaid internet access for walk-up customers at public hotspot locations, with easy voucher purchases and fast connection support.",
    icon: Wifi,
  },
  {
    title: "Home & office internet",
    description:
      "Dedicated connections for homes, shops, and businesses that need a stable, reliable service for day-to-day operations.",
    icon: ShieldCheck,
  },
  {
    title: "Network setup & IT support",
    description:
      "Router configuration, cabling, troubleshooting, and ongoing technical assistance for customers who need practical support.",
    icon: Wrench,
  },
  {
    title: "Professional Starlink installation & activation",
    description:
      "Professional Starlink setup and activation for homes, offices, and remote locations that need dependable satellite internet.",
    icon: CheckCircle2,
  },
  {
    title: "MikroTik configuration & hotspot",
    description:
      "Router and hotspot configuration for secure, well-managed public or private network access.",
    icon: Wrench,
  },
  {
    title: "Website & software development",
    description:
      "Custom websites, business applications, and digital tools built to support growth for local and regional organisations.",
    icon: CheckCircle2,
  },
];

const reasons = [
  "Trusted local service in Juba, South Sudan",
  "Support for homes, offices, and public hotspot users",
  "Clear pricing and practical service guidance",
  "Fast contact through WhatsApp, phone, and visit-a-location flows",
];

const galleryImages = [
  {
    title: "Reliable hotspot access",
    description: "Fast, affordable WiFi for meetings, study, and day-to-day browsing.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    alt: "Friends sitting arm in arm, looking out towards a cable car",
  },
  {
    title: "Business connectivity",
    description: "Home and office internet support for stable everyday operations.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    alt: "A customer being served at a café counter",
  },
  {
    title: "Professional network support",
    description: "Practical guidance for Starlink, MikroTik, and hotspot setups.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
    alt: "An acacia tree on the savanna at sunset",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.14),_transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Juba, South Sudan
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Internet access and digital support built for everyday life in Juba.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Hotzonex helps customers stay connected through WiFi vouchers, dedicated home and office internet, IT support, and custom website/software services.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/pricing">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/locations">Find a Location</Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-muted-foreground">
                {siteConfig.locations.map((location) => (
                  <span key={location.slug} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> {location.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-slate-200/60">
                <Image
                  src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"
                  alt="An acacia tree on the savanna at sunset"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  preload
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Hotspot packages</p>
                        <p className="mt-2 text-2xl font-black text-white">From {lowestVoucherPrice}</p>
                      </div>
                      <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-200">
                        Recommended
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-200">
                      <span>{siteConfig.locations.length} offices in Juba</span>
                      <span>24/7 Gorom Wi-Fi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <figure key={item.title} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <Image
                src={item.image}
                alt={item.alt}
                width={900}
                height={600}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="h-64 w-full object-cover"
              />
              <figcaption className="space-y-2 p-5">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-3xl font-black text-foreground">{siteConfig.locations.length}</p>
            <p className="text-sm text-muted-foreground">Wi-Fi offices in Juba</p>
          </div>
          <div>
            <p className="text-3xl font-black text-foreground">Daily</p>
            <p className="text-sm text-muted-foreground">Support hours</p>
          </div>
          <div>
            <p className="text-3xl font-black text-foreground">{lowestVoucherPrice}</p>
            <p className="text-sm text-muted-foreground">Wi-Fi vouchers from</p>
          </div>
          <div>
            <p className="text-3xl font-black text-foreground">24/7</p>
            <p className="text-sm text-muted-foreground">Gorom Wi-Fi signal</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Our services</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">Practical solutions for connectivity and growth.</h2>
          </div>
          <Link href="/services" className="hidden items-center gap-2 text-sm font-semibold text-primary md:inline-flex">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Why choose us</p>
            <h2 className="mt-2 text-3xl font-black">Reliable support from a company that understands local internet realities.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-400" />
                <p className="text-base font-medium text-slate-100">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">How it works</p>
          <h2 className="mt-2 text-3xl font-black text-foreground">Simple steps from enquiry to service.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "01", title: "Choose a service", text: "Identify whether you need a hotspot voucher, dedicated internet, support, or a website/app." },
            { step: "02", title: "Contact Hotzonex", text: "Reach out by phone, WhatsApp, or email and confirm your service requirements." },
            { step: "03", title: "Receive support", text: "Our team handles setup, installation, troubleshooting, or custom development as needed." },
            { step: "04", title: "Stay connected", text: "Enjoy the service with practical follow-up and ongoing support if required." },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.step}</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{item.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

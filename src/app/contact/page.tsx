import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hotzonex for hotspot vouchers, internet installation, IT support, or website and software development services.",
};

export default function ContactPage() {
  const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const phoneNumber = siteConfig.contact.phone.replace(/\D/g, "");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Tell Hotzonex what you need.</h1>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
            <Image
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"
              alt="African professional Hotzonex support"
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="eager"
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <div className="rounded-2xl border border-border bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Quick contact</p>
                <p className="mt-2 text-lg font-bold text-foreground">We’re ready to help with vouchers, internet, Starlink, and technical support.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-foreground">Phone</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.contact.phone}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-foreground">Email</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.contact.email}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-foreground">WhatsApp</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.contact.whatsapp}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-foreground">Address</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.contact.address}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:col-span-2">
              <p className="font-semibold text-foreground">Hours</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.contact.hours}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
            <MessageCircle className="h-6 w-6" />
          </span>

          <h2 className="mt-5 text-3xl font-black text-foreground">Message us on WhatsApp</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            WhatsApp is the fastest way to reach the Hotzonex team. Send us your question and we will reply during
            working hours — {siteConfig.contact.hours.toLowerCase()}.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-[#25D366] text-white hover:bg-[#1fb65d] focus-visible:ring-emerald-400">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href={`tel:+${phoneNumber}`}>
                <Phone className="h-5 w-5" />
                Call {siteConfig.contact.phone}
              </a>
            </Button>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm font-semibold text-foreground">Prefer email?</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Write to{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-primary underline underline-offset-4">
                {siteConfig.contact.email}
              </a>{" "}
              and include your location and the service you need, so we can respond with the right details.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-sm font-semibold text-foreground">Helpful details to include</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>• The service you need — vouchers, internet, Starlink, IT support, or web development.</li>
              <li>• Your area in Juba, so we can match you to the nearest office.</li>
              <li>• Whether the request is for a home, shop, or business.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

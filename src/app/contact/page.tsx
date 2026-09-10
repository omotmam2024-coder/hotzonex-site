import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hotzonex for hotspot vouchers, internet installation, IT support, or website and software development services.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Tell Hotzonex what you need.</h1>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"
              alt="African professional Hotzonex support"
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

        <ContactForm />
      </section>
    </div>
  );
}

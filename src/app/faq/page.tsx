import type { Metadata } from "next";
import Link from "next/link";

import { FaqClient } from "@/components/faq-client";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Find answers to common Hotzonex questions about hotspot vouchers, locations, IT support, and development services.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">FAQ</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Questions about Hotzonex services and support.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Find quick answers about vouchers, hotspot locations, home and office internet, Starlink, MikroTik, and the most common service questions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="African FAQ and support resources"
            className="h-[280px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Need a faster answer?</p>
              <div className="mt-3">
                <Button asChild size="lg">
                  <Link href="/contact">Need help?</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <FaqClient />
      </section>
    </div>
  );
}

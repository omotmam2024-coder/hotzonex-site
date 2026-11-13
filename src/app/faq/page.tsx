import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FaqClient } from "@/components/faq-client";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { guideFaqs } from "@/lib/guide";
import { officeAlt, officeImages } from "@/lib/office-images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common Hotzonex questions about Wi-Fi voucher prices, networks, opening hours, refunds, home and office internet, and development services.",
};

// The guide's Wi-Fi answers first, then the services it does not cover.
const faqs = [...guideFaqs, ...siteConfig.faqs];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Questions about Hotzonex services and support.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Quick answers about voucher prices, which network to join, opening hours, refunds and our other services.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={officeImages.workstations}
            alt={officeAlt.workstations}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[280px] w-full object-cover"
          />
          <div className="absolute bottom-5 left-5">
            <Button asChild size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <FaqClient faqs={faqs} />
      </section>
    </div>
  );
}

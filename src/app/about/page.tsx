import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { officeAlt, officeImages } from "@/lib/office-images";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Hotzonex, its mission, values, and what makes the company different in Juba, South Sudan.",
};

const values = [
  {
    title: "Practical service",
    text: "We focus on what customers need right now: reliable internet, dependable support, and useful digital solutions.",
  },
  {
    title: "Local understanding",
    text: "Hotzonex operates with a clear understanding of how people and businesses in Juba use internet services day to day.",
  },
  {
    title: "Honest communication",
    text: "We keep pricing, support needs, and next steps straightforward so customers know exactly what to expect.",
  },
  {
    title: "Build for the long term",
    text: "Whether it is a hotspot voucher, a dedicated connection, or business software, we aim to support sustainable growth.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">About Hotzonex</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">A local technology company helping people stay connected.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Hotzonex is based in Juba, South Sudan, and provides internet access, technical support, and digital services for households, businesses, and public hotspot users.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
            <Image
              src={officeImages.sign}
              alt={officeAlt.sign}
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="eager"
              className="h-[360px] w-full object-cover"
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-black text-foreground">What makes Hotzonex different</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
              <li>• We serve both walk-up internet customers and business clients.</li>
              <li>• We combine connectivity support with software and website development expertise.</li>
              <li>• We focus on practical service, clear communication, and local responsiveness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mission</p>
          <h2 className="mt-2 text-3xl font-black text-foreground">Our mission is simple: make internet and digital support accessible and useful.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Team</p>
          <h2 className="mt-2 text-3xl font-black text-foreground">Hotzonex is a growing local team with room for new partnerships and support needs.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { name: "Hotzonex Support Team", role: "Customer support" },
            { name: "Network Services Team", role: "Connectivity and technical support" },
            { name: "Digital Solutions Team", role: "Website and software services" },
          ].map((person) => (
            <div key={person.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-black text-primary">
                {person.name.charAt(0) || "H"}
              </div>
              <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

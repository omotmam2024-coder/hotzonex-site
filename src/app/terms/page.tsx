import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { guideChunk, guideName, policyNotes, policySections } from "@/lib/guide";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The Hotzonex Wi-Fi terms of use: network access, vouchers, payment and refunds, fair usage, conduct and support.",
};

// The intro paragraph ("By purchasing and activating a Hotzonex voucher...") is
// titled with the section name; the rest are callouts such as enforcement.
const intro = policyNotes.find((note) => note.title === note.section);
const callouts = policyNotes.filter((note) => note !== intro);
const pricing = guideChunk("Prices differ between our locations");

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-foreground">Terms of Use</h1>
      {intro && <p className="mt-5 text-base leading-7 text-muted-foreground">{intro.text}</p>}

      <div className="mt-10 space-y-8">
        {policySections.map((section) => (
          <section key={section.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-black text-foreground">{section.title}</h2>
            <ol className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={`${item.number}-${item.text}`} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {item.number}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {callouts.map((callout) => (
        <p key={callout.id} className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm leading-6 text-foreground">
          {callout.text}
        </p>
      ))}

      <section className="mt-10 space-y-4 text-sm leading-6 text-muted-foreground">
        <h2 className="text-xl font-black text-foreground">Prices and this website</h2>
        {pricing && <p>{pricing.text}</p>}
        <p>
          Prices, networks and opening hours shown on this website are provided for guidance. All prices are in South
          Sudanese Pounds (SSP) and may change; the information displayed at the Hotzonex office where you buy your
          voucher always applies.
        </p>
        <p>
          Questions about these terms? Call or message {siteConfig.contact.phone}, email {siteConfig.contact.email}, or
          visit your nearest Hotzonex office.
        </p>
        <p className="text-xs">Source: {guideName}.</p>
      </section>
    </div>
  );
}

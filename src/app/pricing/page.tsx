import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { guideChunks, guideName, lowestVoucherPrice, priceTables } from "@/lib/guide";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Hotzonex Wi-Fi voucher prices for Gorom Home Office, Jebel-Iraq Head Office and Jebel-Iraq Sub Office, plus quotes for installation, support and development work.",
};

/** "Understanding the prices" boxes and callouts from the guide, shown under the price lists. */
const priceNotes = guideChunks.filter((chunk) => chunk.kind === "prices" && chunk.heading === "Understanding the prices");

function officeHours(office: string) {
  return siteConfig.locations.find((location) => location.name === office)?.hours;
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pricing</p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">Wi-Fi voucher prices at each Hotzonex office.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            All vouchers are prepaid, unlimited for their period and work on one device at a time. Each office has its
            own networks and its own price list, and a voucher works only at the office where it was bought.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-slate-200/60">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Customers using Wi-Fi at a Hotzonex office"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 45vw"
            loading="eager"
            className="h-[320px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Vouchers from</p>
              <p className="mt-2 text-xl font-black text-white">{lowestVoucherPrice ?? "See price lists below"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3" aria-label="Voucher prices by office">
        {priceTables.map((table) => (
          <article key={table.office} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-black text-foreground">{table.office}</h2>
            {officeHours(table.office) && <p className="mt-1 text-sm text-muted-foreground">Open {officeHours(table.office)}</p>}

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="py-2 pr-3 font-semibold">{table.columns[0]}</th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">{table.columns[table.priceColumn]}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => {
                    // Remaining columns ("Cost per hour", "Good for") as one line: "563 SSP per hour · A full working day".
                    const detail = row
                      .map((cell, index) => {
                        if (index === 0 || index === table.priceColumn || !cell) return null;
                        const column = table.columns[index] ?? "";
                        return /^cost per /i.test(column) ? `${cell} ${column.replace(/^cost /i, "").toLowerCase()}` : cell;
                      })
                      .filter(Boolean)
                      .join(" · ");
                    const bestValue = /best value/i.test(row.join(" "));
                    return (
                      <tr key={row.join("|")} className={bestValue ? "border-b border-border bg-primary/5" : "border-b border-border"}>
                        <td className="py-3 pr-3 align-top">
                          <span className="font-semibold text-foreground">{row[0]}</span>
                          {detail && <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>}
                        </td>
                        <td className="whitespace-nowrap py-3 text-right align-top font-bold text-foreground">
                          {row[table.priceColumn]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {table.notes.map((note) => (
              <p key={note.id} className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm leading-6 text-foreground">
                {note.text}
              </p>
            ))}
          </article>
        ))}
      </section>

      {priceNotes.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-black text-foreground">Understanding the prices</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {priceNotes.map((note) => (
              <article key={note.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold text-foreground">{note.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {note.text.startsWith(note.title) ? note.text.slice(note.title.length).replace(/^[.:]\s*/, "") : note.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-foreground">Vouchers are sold only at our offices.</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Buy at the office you are visiting — the price list displayed there always applies. Source: {guideName}.
          </p>
        </div>
        <Button asChild>
          <Link href="/locations">Find an office</Link>
        </Button>
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Request a quote</p>
          <h2 className="mt-2 text-3xl font-black text-foreground">Dedicated internet, support, and development work are quoted individually.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {siteConfig.pricing.quoteTypes.map((quoteType) => (
            <article key={quoteType.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">{quoteType.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{quoteType.summary}</p>
              <Button variant="outline" className="mt-6" asChild>
                <Link href="/contact">Ask for a quote</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

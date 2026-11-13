"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type VoucherOffice = {
  slug: string;
  /** Short name for the tab, e.g. "Head Office". */
  tab: string;
  name: string;
  hours: string;
  mapUrl: string;
  packages: Array<{ name: string; price: string; note?: string; bestValue: boolean }>;
};

/**
 * The home page's price list, drawn as the voucher customers buy at the counter.
 * Tabs switch between offices because each office has its own prices.
 */
export function VoucherTicket({ offices }: { offices: VoucherOffice[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const office = offices[selected];

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (selected + step + offices.length) % offices.length;
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Choose an office" className="flex gap-1 rounded-xl bg-card p-1" onKeyDown={onKeyDown}>
        {offices.map((item, index) => (
          <button
            key={item.slug}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`voucher-tab-${item.slug}`}
            aria-selected={index === selected}
            aria-controls="voucher-panel"
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            className={cn(
              "flex-1 rounded-lg px-2 py-2.5 text-sm font-semibold transition-colors",
              index === selected ? "bg-deep text-deep-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.tab}
          </button>
        ))}
      </div>

      {/* The shadow sits on a wrapper because the ticket's mask would clip its own. */}
      <div className="mt-3 drop-shadow-[0_18px_28px_rgba(10,37,88,0.22)]">
        <div
          role="tabpanel"
          id="voucher-panel"
          aria-labelledby={`voucher-tab-${office.slug}`}
          className="ticket rounded-2xl bg-accent text-accent-foreground [--notch-y:7.5rem]"
        >
          <div className="flex h-[7.5rem] flex-col justify-center border-b-2 border-dashed border-deep/35 px-7">
            <p className="text-sm font-semibold text-deep">Wi-Fi voucher</p>
            <p className="font-display text-2xl font-extrabold tracking-tight text-deep">{office.name}</p>
            <p className="text-sm text-deep">Open {office.hours}</p>
          </div>

          <ul className="px-7 py-3">
            {office.packages.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-deep/15 py-2.5 last:border-b-0">
                <span className="min-w-0">
                  <span className="font-semibold">{item.name}</span>
                  {item.bestValue && (
                    <span className="ml-2 rounded bg-deep px-1.5 py-0.5 text-xs font-semibold text-deep-foreground">Best value</span>
                  )}
                  {item.note && <span className="block text-sm text-deep/80">{item.note}</span>}
                </span>
                <span className="font-display whitespace-nowrap text-lg font-extrabold">{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-deep/15 px-7 py-4 text-sm font-semibold">
            <a href={office.mapUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline">
              Get directions
            </a>
            <Link href={`/locations/${office.slug}`} className="underline underline-offset-4 hover:no-underline">
              Office details
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-deep-foreground">Sold at the counter. A voucher works on one device, at the office where you bought it.</p>
    </div>
  );
}

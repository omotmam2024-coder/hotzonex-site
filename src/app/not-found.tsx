import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Page not found</p>
      <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">We couldn&apos;t find that page.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        The link may be out of date. You can find voucher prices, our offices and support options below, or ask the
        assistant in the corner of the page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Go to the homepage</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/pricing">Voucher prices</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}

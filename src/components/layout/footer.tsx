import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="text-lg font-bold text-foreground">
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

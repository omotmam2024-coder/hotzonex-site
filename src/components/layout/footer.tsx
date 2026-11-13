import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

const linkGroups = [
  {
    title: "Wi-Fi",
    links: [
      { href: "/pricing", label: "Voucher prices" },
      { href: "/locations", label: "Offices and hours" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" prefetch={false} className="flex items-center gap-3">
            <Image src="/brand/hotzonex-logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <span className="font-display text-2xl font-bold tracking-tight">{siteConfig.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-deep-muted">
            Prepaid Wi-Fi, home and office internet, and IT services in Juba, South Sudan.
          </p>
        </div>

        {linkGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            {/* Explicit colour: the global heading style would otherwise paint it dark on this dark footer. */}
            <h2 className="text-base font-semibold text-deep-foreground">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="text-deep-muted hover:text-deep-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-base font-semibold text-deep-foreground">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-deep-muted">
            <li>
              <a href={`tel:+${siteConfig.contact.phone.replace(/\D/g, "")}`} className="hover:text-deep-foreground">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-deep-foreground">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

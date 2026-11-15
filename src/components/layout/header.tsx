"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/locations", label: "Locations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Desktop splits the links either side of the centred logo.
const leftItems = navItems.slice(0, 3);
const rightItems = navItems.slice(3);

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const desktopLink = (item: (typeof navItems)[number]) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={isCurrent(item.href) ? "page" : undefined}
      className={cn(
        "border-b-2 py-1 text-sm font-medium",
        isCurrent(item.href)
          ? "border-accent text-accent"
          : "border-transparent text-primary-muted hover:text-primary-foreground",
      )}
    >
      {item.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-primary-foreground/15 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {leftItems.map(desktopLink)}
        </nav>

        <Link href="/" className="flex items-center gap-2.5 md:order-none">
          {/* The name beside it labels the link, so the badge itself stays decorative (alt=""). */}
          <Image src="/brand/hotzonex-logo.png" alt="" width={44} height={44} preload className="h-11 w-11" />
          <span className="font-display text-xl font-black uppercase tracking-tight">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center justify-end gap-7 md:flex">
          <nav className="flex items-center gap-7" aria-label="More pages">
            {rightItems.map(desktopLink)}
          </nav>
          <Button variant="secondary" size="sm" asChild className="hidden lg:inline-flex">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {menuOpen && (
        <div className="border-t border-primary-foreground/15 bg-primary md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-primary-foreground/15 py-3 text-base font-medium",
                  isCurrent(item.href) ? "text-accent" : "text-primary-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}

            <Button variant="secondary" asChild className="mt-4 w-full">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                WhatsApp us
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

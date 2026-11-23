import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Headings and prices. Body text uses the device's own font (see globals.css), so only
// this one font file is downloaded.
const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // The home page's title: the words people type into Google, not just the brand.
    default: `${siteConfig.name} — WiFi Hotspot, Internet & Starlink in Juba, South Sudan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // Google Search Console ownership of https://www.hotzonex.dev/ (the code is public by design).
  verification: { google: "5zldfElnyTTP5dP7u2kvVuKQXwPRSrf-siaptB9RM1o" },
  // Inherited whole by every page that does not set its own openGraph, so nothing
  // page-specific (such as url) belongs here.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // Google ignores this list (it reads titles, descriptions and page text); Bing and others may use it.
  keywords: [
    "Hotzonex",
    "WiFi Juba",
    "WiFi hotspot Juba",
    "WiFi vouchers South Sudan",
    "internet vouchers Juba",
    "internet provider South Sudan",
    "internet service provider Juba",
    "home internet Juba",
    "office internet Juba",
    "Starlink installation South Sudan",
    "Starlink activation Juba",
    "MikroTik hotspot setup",
    "MikroTik configuration Juba",
    "hotspot billing software",
    "network installation Juba",
    "IT support Juba",
    "website development South Sudan",
  ],
};

/**
 * Tells search engines who runs the site and which image is the company logo. The @id is the
 * company's one name on the web: Hotzonex Cloud (hotzonex.net) names this same @id as its
 * publisher, so Google sees one business behind both sites.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/hotzonex-logo-512.png`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: "Juba", addressCountry: "SS" },
  areaServed: [
    { "@type": "City", name: "Juba" },
    { "@type": "Country", name: "South Sudan" },
  ],
  // What the company does, in the words people search with.
  knowsAbout: [
    "WiFi hotspots",
    "WiFi vouchers",
    "Internet service",
    "Home and office internet",
    "Starlink installation and activation",
    "MikroTik routers and hotspot setup",
    "Hotspot billing software",
    "Computer networking",
    "IT support",
    "Website and software development",
  ],
  // The company's own software product, described in full on its own site.
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.cloudUrl}/#software`,
      name: "Hotzonex Cloud",
      url: `${siteConfig.cloudUrl}/`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          // "<" is escaped so the payload can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}

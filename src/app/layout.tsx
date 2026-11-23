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
    default: siteConfig.name,
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
  keywords: [
    "Hotzonex",
    "Juba South Sudan",
    "WiFi hotspot",
    "home internet",
    "IT support",
    "web development",
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

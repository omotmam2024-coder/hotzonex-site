import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AssistantWidget } from "@/components/assistant-widget";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
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

/** Tells search engines who runs the site and which image is the company logo. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/hotzonex-logo-512.png`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: "Juba", addressCountry: "SS" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
          <AssistantWidget />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { guideChunk, guideFaqs, guideName } from "@/lib/guide";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Hotzonex handles information on its Wi-Fi network and on this website.",
};

const networkPrivacy = guideChunk("Your privacy");
const privacyFaqs = guideFaqs.filter((faq) => /browsing history|online payments/i.test(faq.question));

// Keep this list in step with what the site actually does: no cookies, no analytics,
// no forms, and the assistant route does not log the questions it receives.
const websitePractices = [
  "This website has no accounts or forms and does not use cookies, analytics or advertising trackers.",
  "Questions you type into the website assistant are sent to our server only to find an answer in our Customer Service Guide. Hotzonex does not store them or link them to you.",
  "WhatsApp, phone, email and map links open those services directly. Their own privacy policies apply to anything you send through them.",
  "The site is hosted on Vercel, which keeps standard technical logs (such as IP address and the pages requested) to operate and secure the service. Images are loaded from Unsplash's image service.",
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-foreground">Privacy Policy</h1>

      <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-black text-foreground">On the Hotzonex Wi-Fi network</h2>
        {networkPrivacy && <p className="mt-4 text-sm leading-6 text-muted-foreground">{networkPrivacy.text}</p>}
        {privacyFaqs.length > 0 && (
          <dl className="mt-6 space-y-4">
            {privacyFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-sm font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-black text-foreground">On this website</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
          {websitePractices.map((practice) => (
            <li key={practice} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3 text-sm leading-6 text-muted-foreground">
        <h2 className="text-xl font-black text-foreground">Contact</h2>
        <p>
          For privacy questions, call or message {siteConfig.contact.phone}, email {siteConfig.contact.email}, or visit
          your nearest Hotzonex office.
        </p>
        <p className="text-xs">Network privacy statement source: {guideName}.</p>
      </section>
    </div>
  );
}

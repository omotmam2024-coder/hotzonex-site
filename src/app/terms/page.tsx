import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Draft terms page for Hotzonex pending legal review.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-foreground">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Draft pending legal review. This page is intentionally a placeholder until the final terms are approved.
      </p>
    </div>
  );
}

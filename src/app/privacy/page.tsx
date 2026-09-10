import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Draft privacy notice for Hotzonex pending legal review.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Draft pending legal review. This page is intentionally a placeholder until the final policy is approved.
      </p>
    </div>
  );
}

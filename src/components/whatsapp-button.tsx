import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-transform duration-200 hover:scale-105 hover:bg-[#1fb65d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

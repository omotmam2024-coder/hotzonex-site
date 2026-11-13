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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-deep shadow-lg shadow-deep/20 hover:bg-[#1fb65d]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

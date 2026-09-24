import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * WhatsApp Cloud API (Meta) client for the Hotzonex assistant webhook.
 * See README.md "WhatsApp assistant" for how to obtain these credentials
 * and where the webhook is registered.
 */

const GRAPH_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

export type IncomingWhatsAppMessage = {
  from: string;
  id: string;
  type: string;
  text?: string;
};

type WhatsAppWebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        messages?: Array<{
          from: string;
          id: string;
          type: string;
          text?: { body: string };
        }>;
      };
    }>;
  }>;
};

/** Pulls the customer's messages out of a webhook delivery; ignores status updates. */
export function extractIncomingMessages(payload: unknown): IncomingWhatsAppMessage[] {
  const entries = (payload as WhatsAppWebhookPayload)?.entry ?? [];
  const messages: IncomingWhatsAppMessage[] = [];

  for (const entry of entries) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages") continue;
      for (const message of change.value?.messages ?? []) {
        messages.push({ from: message.from, id: message.id, type: message.type, text: message.text?.body });
      }
    }
  }

  return messages;
}

/**
 * Verifies Meta's `X-Hub-Signature-256` header against the raw request body.
 * Skips verification (with a warning) when WHATSAPP_APP_SECRET is not set, so the
 * webhook is still usable while it is being set up.
 */
export function isValidSignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) {
    console.warn("[whatsapp] WHATSAPP_APP_SECRET is not set; skipping webhook signature verification.");
    return true;
  }
  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const provided = signatureHeader.slice("sha256=".length);
  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(provided, "hex");

  return expectedBuffer.length === providedBuffer.length && timingSafeEqual(expectedBuffer, providedBuffer);
}

/** Sends a plain-text WhatsApp reply through the Cloud API. */
export async function sendWhatsAppMessage(to: string, body: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error("[whatsapp] Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN; cannot send reply.");
    return;
  }

  const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body, preview_url: false },
    }),
  });

  if (!response.ok) {
    console.error("[whatsapp] Failed to send message:", response.status, await response.text());
  }
}

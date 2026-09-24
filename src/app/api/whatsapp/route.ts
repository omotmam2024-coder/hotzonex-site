import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { getAssistantAnswer, MAX_QUESTION_LENGTH } from "@/lib/assistant";
import { extractIncomingMessages, isValidSignature, sendWhatsAppMessage } from "@/lib/whatsapp";

/**
 * WhatsApp webhook for the Hotzonex Wi-Fi assistant (see README.md "WhatsApp assistant").
 * Meta calls GET once, to verify the webhook, and POST for every incoming message or
 * status update. Both must respond quickly, so replies are generated from the same
 * Customer Service Guide index as the web assistant (src/lib/assistant.ts) — no
 * external model call is involved.
 */

const NON_TEXT_REPLY =
  `I can only read text messages here. Please type your question, or call/WhatsApp our team directly at ` +
  `${siteConfig.contact.phone}.`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && challenge && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!isValidSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const messages = extractIncomingMessages(payload);

  await Promise.all(
    messages.map(async (message) => {
      const question = message.text?.slice(0, MAX_QUESTION_LENGTH);
      const reply = question ? getAssistantAnswer(question).answer : NON_TEXT_REPLY;

      try {
        await sendWhatsAppMessage(message.from, reply);
      } catch (error) {
        console.error("[whatsapp] Failed to send reply:", error);
      }
    }),
  );

  // Meta expects a 200 within a few seconds regardless of outcome, or it will retry delivery.
  return NextResponse.json({ ok: true });
}

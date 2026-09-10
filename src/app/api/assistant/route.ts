import { NextResponse } from "next/server";

import { getAssistantAnswer } from "@/lib/assistant";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question : "";

    const response = await getAssistantAnswer(question);

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        answer:
          "I’m not able to answer that right now. Please try again or use the contact form for direct support.",
        suggestions: [
          "What services does Hotzonex offer?",
          "How can I buy a hotspot voucher?",
          "Can I get WhatsApp support?",
        ],
      },
      { status: 500 },
    );
  }
}

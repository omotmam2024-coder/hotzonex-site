import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { getAssistantAnswer } from "@/lib/assistant";

/** Longer input is not a customer question, and bounds the work per request. */
const MAX_QUESTION_LENGTH = 500;

export async function POST(request: Request) {
  let question = "";

  try {
    const body = await request.json();
    question = typeof body?.question === "string" ? body.question.slice(0, MAX_QUESTION_LENGTH) : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    return NextResponse.json(getAssistantAnswer(question));
  } catch (error) {
    console.error("[assistant] Failed to answer:", error);

    return NextResponse.json(
      {
        answer: `I am not able to answer that right now. Please try again, or contact our team on ${siteConfig.contact.phone}.`,
        source: null,
        suggestions: [],
      },
      { status: 500 },
    );
  }
}

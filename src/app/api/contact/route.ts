import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mail";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Invalid form submission.",
        },
        { status: 400 },
      );
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 },
      );
    }

    await sendContactEmail(parsed.data);

    const supabase = getSupabaseServerClient();

    if (supabase) {
      await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
        source: "website",
      });
    }

    return NextResponse.json({
      message: "Thanks. Your message has been sent directly to Hotzonex by email.",
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unable to process the form right now.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

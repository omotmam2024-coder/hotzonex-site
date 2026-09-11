import { NextResponse } from "next/server";

import { contactSchema, isHoneypotFilled } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mail";
import { getSupabaseServerClient } from "@/lib/supabase";

const GENERIC_ERROR = "Unable to send your message right now. Please try again or contact us on WhatsApp.";

export async function POST(request: Request) {
  let parsedBody: unknown;

  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(parsedBody);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message || "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  if (isHoneypotFilled(parsed.data)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Persist before sending so a mail outage does not lose the enquiry.
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
      source: "website",
    });

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
    }
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    // Never surface SMTP/config details to the browser.
    console.error("[contact] Email delivery failed:", error);

    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  return NextResponse.json({
    message: "Thanks. Your message has been sent directly to Hotzonex by email.",
  });
}

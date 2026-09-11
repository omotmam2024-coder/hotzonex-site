import nodemailer from "nodemailer";

import type { ContactFormValues } from "@/lib/contact";

export function getMailConfig() {
  const host = process.env.MAIL_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT?.trim() || 587);
  const secure = (process.env.MAIL_SECURE?.trim() || "false").toLowerCase() === "true" || port === 465;
  const user = process.env.MAIL_USER?.trim() || "";
  // Google shows App Passwords as four space-separated groups; the spaces are
  // presentational and must not reach the SMTP auth.
  const pass = process.env.MAIL_PASS?.replace(/\s+/g, "") || "";
  const to = process.env.MAIL_TO?.trim() || user || "";

  return {
    host,
    port,
    secure,
    user,
    pass,
    to,
    configured: Boolean(user && pass && to),
  };
}

/** Submitted values go into an HTML email, so they must not carry markup through. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(values: ContactFormValues) {
  const { configured, host, port, secure, user, pass, to } = getMailConfig();

  if (!configured) {
    throw new Error("Gmail SMTP is not configured. Add MAIL_USER, MAIL_PASS, and MAIL_TO to the environment.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  // Keep header-injected newlines out of the subject line.
  const subject = `[Hotzonex Contact] ${values.subject.replace(/[\r\n]+/g, " ")}`;
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Subject: ${values.subject}`,
    "",
    "Message:",
    values.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New service request</h2>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(values.subject)}</p>
      <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
        <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br />${escapeHtml(values.message)}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `Hotzonex Contact <${user}>`,
    to,
    replyTo: values.email,
    subject,
    text,
    html,
  });
}

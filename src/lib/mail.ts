import nodemailer from "nodemailer";

import type { ContactFormValues } from "@/lib/contact";

export function getMailConfig() {
  const host = process.env.MAIL_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT?.trim() || 587);
  const secure = (process.env.MAIL_SECURE?.trim() || "false").toLowerCase() === "true" || port === 465;
  const user = process.env.MAIL_USER?.trim() || "";
  const pass = process.env.MAIL_PASS?.trim() || "";
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

  const subject = `[Hotzonex Contact] ${values.subject}`;
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
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Phone:</strong> ${values.phone}</p>
      <p><strong>Subject:</strong> ${values.subject}</p>
      <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
        <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br />${values.message}</p>
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

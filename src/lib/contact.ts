import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  // Trim before validating, so a pasted address with stray spaces still passes.
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  phone: z.string().trim().min(5, "Phone number is required."),
  subject: z.string().trim().min(2, "Subject is required."),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
  // Honeypot: hidden from real users, so it must stay valid (and silent) for
  // them. The server rejects submissions that fill it in.
  company: z.string().trim().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function isHoneypotFilled(values: ContactFormValues) {
  return Boolean(values.company && values.company.length > 0);
}

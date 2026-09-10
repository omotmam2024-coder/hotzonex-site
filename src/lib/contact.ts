import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5, "Phone number is required."),
  subject: z.string().trim().min(2, "Subject is required."),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
  company: z.string().trim().max(0, "Invalid submission.").optional().catch(""),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormValues } from "@/lib/contact";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [submitState, setSubmitState] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your message right now.");
      }

      reset(defaultValues);
      setSubmitState({
        type: "success",
        message:
          data.message ||
          "Thanks. Your message has been sent directly to Hotzonex by email.",
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was a problem submitting the form. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
          <input
            id="name"
            {...register("name")}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none ring-0 transition focus:border-primary"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none ring-0 transition focus:border-primary"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-sm text-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none ring-0 transition focus:border-primary"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <p className="text-sm text-error">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
          <input
            id="subject"
            {...register("subject")}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none ring-0 transition focus:border-primary"
            aria-invalid={Boolean(errors.subject)}
          />
          {errors.subject && <p className="text-sm text-error">{errors.subject.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition focus:border-primary"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-sm text-error">{errors.message.message}</p>}
      </div>

      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {submitState && (
        <div
          className={submitState.type === "success" ? "flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-success" : "flex items-start gap-3 rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error"}
          role="status"
          aria-live="polite"
        >
          {submitState.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertCircle className="mt-0.5 h-4 w-4" />}
          <span>{submitState.message}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

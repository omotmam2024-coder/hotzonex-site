"use client";

import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const initialSuggestions = [
  "What services does Hotzonex offer?",
  "How can I buy a hotspot voucher?",
  "Do you provide home or office internet support?",
  "Can Hotzonex build a website or software for my business?",
  "Is WhatsApp available for quick help?",
];

export function AssistantChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "I can help with Hotzonex services, contact options, locations, and FAQs. Ask me anything about vouchers, internet support, website development, or WhatsApp help.",
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = question.trim();

    if (!trimmed) {
      return;
    }

    setLoading(true);
    setAnswer("Thinking...");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await response.json();
      setAnswer(data.answer || "I’m not able to answer that right now.");
    } catch {
      setAnswer("I’m not able to answer that right now. Please try again or use the contact form for direct support.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Assistant</p>
          <h2 className="text-2xl font-black text-foreground">Hotzonex support assistant</h2>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-background p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Assistant reply</span>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {initialSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setQuestion(suggestion)}
            className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label htmlFor="assistant-question" className="block text-sm font-medium text-foreground">
          Ask a question
        </label>
        <div className="flex gap-3">
          <input
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about services, pricing, locations, or WhatsApp..."
            className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

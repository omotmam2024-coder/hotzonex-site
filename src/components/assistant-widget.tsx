"use client";

import { Bot, Loader2, RefreshCw, Send, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const GREETING =
  "Hi! I am the Hotzonex assistant. Ask me about hotspot vouchers, home or office internet, Starlink, IT support, or website development.";

const INITIAL_SUGGESTIONS = [
  "What services does Hotzonex offer?",
  "How can I buy a hotspot voucher?",
  "Where are your locations?",
  "Can you build a website for my business?",
];

const initialMessages: Message[] = [{ id: 0, role: "assistant", text: GREETING }];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  // Lets a superseded request drop its response instead of racing the newest one.
  const requestId = useRef(0);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || loading) return;

      const ticket = ++requestId.current;

      setMessages((current) => [...current, { id: nextId.current++, role: "user", text: trimmed }]);
      setInput("");
      setSuggestions([]);
      setLoading(true);

      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed }),
        });

        const data = (await response.json()) as { answer?: string; suggestions?: string[] };
        if (ticket !== requestId.current) return;

        setMessages((current) => [
          ...current,
          {
            id: nextId.current++,
            role: "assistant",
            text: data.answer || "I am not able to answer that right now.",
          },
        ]);
        setSuggestions(data.suggestions?.slice(0, 4) ?? []);
      } catch {
        if (ticket !== requestId.current) return;

        setMessages((current) => [
          ...current,
          {
            id: nextId.current++,
            role: "assistant",
            text: "I could not reach the assistant just now. Please try again, or contact us on WhatsApp for direct help.",
          },
        ]);
      } finally {
        if (ticket === requestId.current) setLoading(false);
      }
    },
    [loading],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  function resetThread() {
    requestId.current++;
    nextId.current = 1;
    setMessages(initialMessages);
    setSuggestions(INITIAL_SUGGESTIONS);
    setInput("");
    setLoading(false);
    inputRef.current?.focus();
  }

  return (
    <>
      {/* Pinned bottom-left so the WhatsApp button keeps the bottom-right corner. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close the Hotzonex assistant" : "Open the Hotzonex assistant"}
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask us"}</span>
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-label="Hotzonex assistant"
        hidden={!open}
        className="fixed bottom-24 left-4 right-4 z-50 flex max-h-[min(32rem,calc(100vh-8rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:left-5 sm:right-auto sm:w-[24rem]"
      >
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">Hotzonex assistant</p>
            <p className="truncate text-xs text-muted-foreground">Answers from our services and guide</p>
          </div>
          <button
            type="button"
            onClick={resetThread}
            aria-label="Start a new conversation"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close the assistant"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          aria-live="polite"
          aria-busy={loading}
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <p
                className={
                  message.role === "user"
                    ? "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm leading-6 text-primary-foreground"
                    : "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-2.5 text-sm leading-6 text-foreground"
                }
              >
                {message.text}
              </p>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <p className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </p>
            </div>
          )}
        </div>

        {suggestions.length > 0 && !loading && (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void ask(suggestion)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
          <label htmlFor={`${panelId}-input`} className="sr-only">
            Ask the Hotzonex assistant a question
          </label>
          <input
            id={`${panelId}-input`}
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={loading}
            autoComplete="off"
            placeholder="Ask about vouchers, internet, support..."
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}

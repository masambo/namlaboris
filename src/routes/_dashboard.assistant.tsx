import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, LogOut, Send, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { chatWithAssistant } from "@/server/ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_dashboard/assistant")({
  head: () => ({
    meta: [
      { title: "AI Legal Assistant | NamLaboris" },
      { name: "description", content: "Ask the NamLaboris AI Legal Assistant for guidance on disciplinary hearings, grievances, retrenchments, and labour-law compliance." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Draft a disciplinary hearing notice for misconduct",
  "What are valid grounds for retrenchment under the Labour Act?",
  "Explain the procedure for an arbitration at the OLC",
  "Outline a fair dismissal process for poor performance",
];

function AssistantPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await chatWithAssistant({ data: { messages: next } });
      if (res.error) {
        toast.error(res.error);
      } else if (res.reply) {
        setMessages((m) => [...m, { role: "assistant", content: res.reply! }]);
      }
    } catch (e) {
      toast.error("Failed to reach the assistant");
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground/50" />
      </div>
    );
  }

  return (
    <main className="flex h-full w-full flex-col overflow-hidden px-8 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="icon-chip size-10"><Bot className="size-5" /></span>
          <div>
            <h1 className="font-display text-2xl text-foreground">AI Legal Assistant</h1>
            <p className="text-xs text-foreground/55">Namibian Labour Act &amp; SADC labour standards · informational use only</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="icon-chip size-14"><Sparkles className="size-6" /></span>
              <h2 className="mt-4 font-display text-xl text-foreground">How can I help today?</h2>
              <p className="mt-1 max-w-md text-sm text-foreground/60">Ask about hearings, grievances, retrenchments, contracts or compliance.</p>
              <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-border bg-[var(--muted)]/40 px-4 py-3 text-left text-sm text-foreground/85 transition hover:border-[var(--brand-gold)]/60 hover:bg-[var(--muted)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "assistant" && (
                    <span className="icon-chip mt-0.5 size-9 shrink-0"><Bot className="size-4" /></span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--brand-gold)] text-white border border-[var(--brand-gold)]"
                        : "bg-[var(--muted)]/50 border border-border text-foreground/90"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-[var(--brand-navy-deep)] prose-strong:text-[var(--brand-navy-deep)] prose-a:text-[var(--brand-gold)]">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex gap-3">
                  <span className="icon-chip mt-0.5 size-9 shrink-0"><Bot className="size-4" /></span>
                  <div className="rounded-2xl border border-border bg-[var(--muted)]/50 px-4 py-3 text-sm text-foreground/70">
                    <span className="inline-flex items-center gap-2"><Loader2 className="size-3.5 animate-spin" /> Thinking…</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about a labour-law matter…"
            rows={2}
            className="flex-1 resize-none border-white/10 bg-white/[0.04]"
            disabled={sending}
          />
          <Button type="submit" size="lg" className="bg-[var(--brand-gold)] text-white hover:brightness-110" disabled={sending || !input.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
    </main>
  );
}

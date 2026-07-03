import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Floating RAG chat widget. Talks to the same-origin proxy at /api/chat
 * (which forwards to the FastAPI backend) and renders its SSE stream:
 *
 *   data: {"type":"sources","sources":[{title,url,score}]}
 *   data: {"type":"token","text":"..."}
 *   data: {"type":"done"} | {"type":"error","message":"..."}
 *
 * Mounted once in BaseLayout with client:idle + transition:persist, so an
 * open conversation survives view-transition navigation.
 */

type Role = "user" | "assistant";

interface Source {
  title: string;
  url: string | null;
  score: number;
}

interface Message {
  role: Role;
  content: string;
  sources?: Source[];
}

// Mirror the backend's validation limits so users never hit a 422.
const MAX_INPUT_CHARS = 500;
const MAX_HISTORY_TURNS = 6;

const STARTERS = [
  "What has Mishhub built?",
  "What's his experience with AI?",
  "Which technologies does he use?",
  "How can I contact him?",
];

/* ------------------------------------------------------------------ */
/* Lightweight markdown-inline rendering: [label](url) and **bold**.   */
/* React elements only — no dangerouslySetInnerHTML.                   */
/* ------------------------------------------------------------------ */

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

function renderBold(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(BOLD_RE)) {
    if (m.index! > last) nodes.push(text.slice(last, m.index));
    nodes.push(<strong key={`${keyPrefix}-b${i++}`}>{m[1]}</strong>);
    last = m.index! + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LINK_RE)) {
    if (m.index! > last) nodes.push(...renderBold(text.slice(last, m.index), `t${i}`));
    nodes.push(
      <a
        key={`l${i++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand font-medium underline underline-offset-2 hover:opacity-80"
      >
        {m[1]}
      </a>,
    );
    last = m.index! + m[0].length;
  }
  if (last < text.length) nodes.push(...renderBold(text.slice(last), `t${i}`));
  return nodes;
}

/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [waking, setWaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const warmedUp = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Warm the free-tier container the moment the chat first opens, so it's
  // already waking while the visitor types their question.
  useEffect(() => {
    if (open && !warmedUp.current) {
      warmedUp.current = true;
      fetch("/api/chat").catch(() => {});
    }
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest message in view while tokens stream in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streaming]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (raw: string) => {
      const message = raw.trim().slice(0, MAX_INPUT_CHARS);
      if (!message || streaming) return;

      setError(null);
      setInput("");
      setStreaming(true);

      const history = messages
        .filter((m) => m.content)
        .slice(-MAX_HISTORY_TURNS)
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: "" },
      ]);

      // Free-tier cold starts take ~30-60s; past a few seconds of silence,
      // tell the visitor what's happening instead of looking frozen.
      const wakeTimer = setTimeout(() => setWaking(true), 4_000);
      const appendToAnswer = (patch: (m: Message) => Message) =>
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return last ? [...prev.slice(0, -1), patch(last)] : prev;
        });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          throw new Error(
            res.status === 429
              ? "You're sending messages a bit fast — give it a minute."
              : "The assistant is unavailable right now. Please try again shortly.",
          );
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n\n");
          buffer = frames.pop() ?? "";
          for (const frame of frames) {
            const line = frame.trim();
            if (!line.startsWith("data: ")) continue;
            const event = JSON.parse(line.slice(6));
            clearTimeout(wakeTimer);
            setWaking(false);
            if (event.type === "sources") {
              appendToAnswer((m) => ({ ...m, sources: event.sources }));
            } else if (event.type === "token") {
              appendToAnswer((m) => ({ ...m, content: m.content + event.text }));
            } else if (event.type === "error") {
              throw new Error(event.message);
            }
          }
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
          // Drop the empty assistant bubble if nothing arrived.
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            return last?.role === "assistant" && !last.content ? prev.slice(0, -1) : prev;
          });
        }
      } finally {
        clearTimeout(wakeTimer);
        setWaking(false);
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Mishhub's portfolio assistant"
          className={cn(
            "fixed right-3 bottom-20 left-3 sm:absolute sm:right-0 sm:left-auto",
            "flex h-[min(32rem,70dvh)] w-auto flex-col sm:w-96",
            "border-border bg-card overflow-hidden rounded-2xl border shadow-2xl",
          )}
        >
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-foreground text-sm font-semibold">Ask about Mishhub</p>
              <p className="text-muted-foreground text-xs">AI assistant — answers from this site</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 6 6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Hi! Ask me anything about Mishhub's experience, projects, case studies, or
                  writing.
                </p>
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="border-border bg-background text-foreground hover:border-brand hover:text-brand rounded-full border px-3 py-1.5 text-xs"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" && "justify-end")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-brand text-brand-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm",
                  )}
                >
                  <p className="whitespace-pre-wrap">
                    {m.role === "assistant" ? renderInline(m.content) : m.content}
                    {m.role === "assistant" &&
                      !m.content &&
                      streaming &&
                      i === messages.length - 1 && (
                        <span className="text-muted-foreground inline-flex animate-pulse">
                          {waking ? "Waking up the assistant (free tier) — ~30s…" : "Thinking…"}
                        </span>
                      )}
                  </p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="border-border/50 mt-2 flex flex-wrap gap-1.5 border-t pt-2">
                      {m.sources
                        .filter(
                          (s, idx, all) => s.url && all.findIndex((o) => o.url === s.url) === idx,
                        )
                        .map((s) => (
                          <a
                            key={s.url}
                            href={s.url!}
                            className="bg-background/60 text-muted-foreground hover:text-brand rounded-full px-2 py-0.5 text-[11px] underline-offset-2 hover:underline"
                          >
                            {s.title}
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <p className="bg-muted text-warning rounded-lg px-3 py-2 text-xs" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Input */}
          <form
            className="border-border flex items-center gap-2 border-t p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_INPUT_CHARS}
              placeholder="Ask a question…"
              disabled={streaming}
              className={cn(
                "border-input bg-background min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm",
                "text-foreground placeholder:text-muted-foreground",
                "focus:ring-ring focus:ring-2 focus:outline-none disabled:opacity-60",
              )}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className={cn(
                "bg-brand text-brand-foreground rounded-xl p-2.5",
                "hover:opacity-90 disabled:opacity-40",
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m5 12 14-7-4 7 4 7-14-7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with the portfolio assistant"}
        className={cn(
          "flex size-13 items-center justify-center rounded-full",
          "bg-brand text-brand-foreground shadow-lg",
          "focus:ring-ring transition-transform hover:scale-105 focus:ring-2 focus:outline-none",
        )}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-9.5 8.3 8.5 8.5 0 0 1-3.4-.9L3 20l1.1-4.1a8.4 8.4 0 0 1-1.1-4.4 8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 9.5 8.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useConfigurables } from "~/modules/configurables";
import { invokeLLM } from "@qb/agentic";
import { BottomNav } from "./bottom-nav";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What should be my #1 priority this week?",
  "How do I optimize my LinkedIn profile?",
  "Help me craft my professional narrative",
  "I'm struggling with networking — where do I start?",
];

export function AIStrategistPage() {
  const { user } = useAuth();
  const { config, loading } = useConfigurables();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const systemPrompt = loading
    ? "You are the ASCEND AI Career Strategist — a focused, direct, execution-oriented career coach. Provide actionable, specific guidance. Be concise and results-driven."
    : (config.aiSystemPrompt ?? "You are the ASCEND AI Career Strategist — a focused, direct, execution-oriented career coach. Provide actionable, specific guidance. Be concise and results-driven.");

  const firstName = user?.username?.split(" ")[0] ?? "there";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await invokeLLM({
        message: content.trim(),
        systemPrompt,
        schema: {
          type: "object",
          properties: {
            response: {
              type: "string",
              description: "Your coaching response. Be direct, actionable, and concise.",
            },
          },
          required: ["response"],
        },
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: (result as any)?.response ?? "I'm here to help. Could you share more context about your situation?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col" style={{ height: "100dvh", backgroundColor: "#111111" }}>
      {/* Header */}
      <header
        className="flex-shrink-0 px-4 py-4"
        style={{
          backgroundColor: "#111111",
          borderBottom: "1px solid rgba(201,168,106,0.1)",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(199,91,18,0.15)", border: "1px solid rgba(199,91,18,0.3)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold" style={{ color: "#F5E9DC" }}>AI Career Strategist</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              <p className="text-xs" style={{ color: "#9E9E9E" }}>Online — ready to strategize</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-messages"
        style={{ paddingBottom: "8px" }}
      >
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(199,91,18,0.15)", border: "1px solid rgba(199,91,18,0.3)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: "#F5E9DC" }}>
                Hey {firstName}, let's strategize.
              </h2>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#9E9E9E" }}>
                I'm your ASCEND Career Strategist. Ask me anything about your career transition, next actions, or roadmap priorities.
              </p>
            </div>

            {/* Suggested prompts */}
            <div className="w-full space-y-2 pt-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ backgroundColor: "#1A1A1A", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.15)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                style={{ backgroundColor: "rgba(199,91,18,0.15)", border: "1px solid rgba(199,91,18,0.3)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3"
              style={{
                backgroundColor: message.role === "user" ? "#C75B12" : "#1A1A1A",
                color: message.role === "user" ? "#ffffff" : "#F5E9DC",
                borderBottomRightRadius: message.role === "user" ? "4px" : "16px",
                borderBottomLeftRadius: message.role === "assistant" ? "4px" : "16px",
                border: message.role === "assistant" ? "1px solid rgba(201,168,106,0.15)" : "none",
              }}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2"
              style={{ backgroundColor: "rgba(199,91,18,0.15)", border: "1px solid rgba(199,91,18,0.3)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div
              className="rounded-2xl px-4 py-3"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)", borderBottomLeftRadius: "4px" }}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#C9A86A", animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#C9A86A", animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#C9A86A", animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0 px-4 pt-3"
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid rgba(201,168,106,0.1)",
          paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 12px)",
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI Strategist..."
            rows={1}
            disabled={isLoading}
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none resize-none disabled:opacity-50"
            style={{
              backgroundColor: "#1A1A1A",
              color: "#F5E9DC",
              border: "1px solid rgba(201,168,106,0.2)",
              maxHeight: "120px",
              minHeight: "44px",
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#C75B12", minHeight: "44px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}

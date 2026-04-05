"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AppShell from "@/components/AppShell";
import { getCoachTips, getMockCoachFeedback } from "@/lib/mock-data/coach-responses";
import { ChevronDown, ChevronUp, Send, MessageSquare, Lightbulb, User } from "lucide-react";

interface ChatMessage {
  id: string;
  from: "coach" | "user";
  text: string;
  isStreaming?: boolean;
}

function StreamedMessage({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isStreaming) {
      setTimeout(() => setDisplayed(text), 0);
      return;
    }
    
    let i = 0;
    const end = text.length;
    // stream char by char
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i += 2;
      if (i > end) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [text, isStreaming]);

  return <>{displayed}</>;
}

export default function CoachPage() {
  const router = useRouter();
  const { profile, isOnboarded, incrementCoachInteraction } = useAppContext();
  const [openTip, setOpenTip] = useState<string | null>("opening");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOnboarded) router.push("/onboarding");
  }, [isOnboarded, router]);

  useEffect(() => {
    if (!profile) return;
    const company = profile.companyName ? ` (${profile.companyName})` : "";
    const urgencyNote =
      profile.urgency === "this-week"
        ? " Mülakatın bu hafta olduğu için tavsiyelerimi hedefe yönelik ve doğrudan aktaracağım."
        : profile.urgency === "this-month"
        ? " Önünde birkaç haftan var — stratejik ilerlersek cevaplarına profesyonel bir derinlik katmak için harika bir süre."
        : "";

    setTimeout(() => {
      setMessages([
        {
          id: "intro",
          from: "coach",
          text: `Merhaba, ben senin yapay zeka mülakat koçunum. ${profile.sector}${company} sektöründe bir ${profile.targetRole || "aday"} olarak ${profile.interviewType} formatındaki mülakatına sürveyanlık edeceğim.${urgencyNote}\n\nBuraya herhangi bir mülakat sorusuna hazırladığın cevabı yapıştırarak benden profesyonel bir analiz ve geri bildirim alabilirsin. Ya da doğrudan mülakatla ilgili aklına takılanları sorabilirsin. Bugün ne üzerine çalışmak istersin?`,
        },
      ]);
    }, 0);
  }, [profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const tips = useMemo(() => (profile ? getCoachTips(profile) : []), [profile]);

  function handleSend() {
    if (!input.trim() || !profile || isThinking) return;

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const coachResponse = getMockCoachFeedback("your question", input.trim(), profile);
      const coachMsg: ChatMessage = { id: `coach-${Date.now()}`, from: "coach", text: coachResponse, isStreaming: true };
      
      // Stop previous streams
      setMessages((prev) => 
        prev.map(m => m.from === "coach" ? { ...m, isStreaming: false } : m)
      );

      setMessages((prev) => [...prev, coachMsg]);
      setIsThinking(false);
      incrementCoachInteraction();
    }, 1200);
  }

  if (!profile) return null;

  return (
    <AppShell>
      <div className="p-8 pb-16 max-w-6xl animate-fade-up">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">AI Koç</p>
          <h1 className="text-[2rem] font-bold tracking-tight leading-tight">Mülakat Koçun</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            <span className="text-foreground font-medium">{profile.sector}</span> sektöründeki bir{" "}
            <span className="text-foreground font-medium">{profile.interviewType}</span>{" "}
            mülakatı için yapılandırıldı
            {profile.companyName && (
              <> (<span className="text-foreground font-medium">{profile.companyName}</span>)</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

          {/* ── Chat panel ─────────────────────────── */}
          <div className="flex flex-col bg-card border border-border rounded-3xl overflow-hidden min-h-[520px]">

            {/* Chat header */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center">
                <MessageSquare size={14} className="text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">Mülakat Koçu</p>
                <p className="text-[10px] text-muted-foreground">Cevaplarını analiz eder ve stratejini güçlendirir</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.from === "coach"
                      ? "bg-violet-500/15"
                      : "bg-indigo-600/20"
                  }`}>
                    {msg.from === "coach"
                      ? <MessageSquare size={11} className="text-violet-400" />
                      : <User size={11} className="text-indigo-400" />
                    }
                  </div>
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "coach"
                        ? "bg-background border border-border/60 text-foreground/85"
                        : "bg-indigo-600/15 border border-indigo-500/20 text-foreground/85"
                    }`}
                  >
                    {msg.from === "coach" ? (
                      <StreamedMessage text={msg.text} isStreaming={msg.isStreaming} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={11} className="text-violet-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-background border border-border/60">
                    <div className="flex gap-1 items-center h-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border bg-background/30">
              <div className="flex gap-2.5">
                <textarea
                  id="coach-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Cevap taslağını buraya yapıştır veya bir soru sor — örn: 'Bu durumu STAR tekniğiyle nasıl anlatabilirim?'"
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-colors min-h-[52px] max-h-[140px] leading-relaxed"
                  rows={2}
                />
                <button
                  id="coach-send"
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="w-11 h-11 self-end bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-2 pl-1">
                Yeni satır için Shift+Enter · Göndermek için Enter
              </p>
            </div>
          </div>

          {/* ── Coaching tips panel ─────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={13} className="text-violet-400" />
              <p className="text-sm font-semibold">Koçluk İpuçları</p>
              <span className="text-[10px] text-muted-foreground ml-auto">profiline özel tasarlandı</span>
            </div>

            <div className="space-y-2.5">
              {tips.map((tip) => (
                <div key={tip.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    id={`tip-${tip.id}`}
                    className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
                    onClick={() => setOpenTip(openTip === tip.id ? null : tip.id)}
                  >
                    <p className="text-sm font-medium text-foreground/90 leading-snug">{tip.title}</p>
                    <div className="flex-shrink-0 mt-0.5">
                      {openTip === tip.id
                        ? <ChevronUp size={13} className="text-muted-foreground" />
                        : <ChevronDown size={13} className="text-muted-foreground" />
                      }
                    </div>
                  </button>

                  {openTip === tip.id && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-border/60 mb-4" />
                      <p className="text-sm text-foreground/70 leading-relaxed">{tip.body}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tip about the chat */}
            <p className="text-[11px] text-muted-foreground/50 mt-5 px-1 leading-relaxed">
              Mülakat sorularına hazırladığın cevap taslaklarını sohbet paneline yapıştırarak uzunluk, netlik ve bırakacağı etki (impact) açısından detaylı bir geri bildirim alabilirsin.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

"use client";

import { useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import type { Question } from "@/lib/types";
import { getMockCoachFeedback } from "@/lib/mock-data/coach-responses";
import {
  ChevronDown,
  ChevronUp,
  FileEdit,
  CheckCircle2,
  Sparkles,
  Save,
  X,
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
  isHighlighted?: boolean;
}

const categoryColors: Record<string, string> = {
  behavioral:      "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  technical:       "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "role-specific": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  situational:     "text-amber-400 bg-amber-400/10 border-amber-400/20",
  motivation:      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

const difficultyColors: Record<string, string> = {
  beginner:     "text-emerald-400/70 bg-emerald-400/6",
  intermediate: "text-amber-400/70 bg-amber-400/6",
  advanced:     "text-rose-400/70 bg-rose-400/6",
};

export default function QuestionCard({ question, isHighlighted }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(isHighlighted ?? false);
  const [showEditor, setShowEditor] = useState(false);
  const { progress, markPractised } = useAppContext();

  const catColor = categoryColors[question.category] ?? "text-muted-foreground bg-white/5 border-white/10";
  const diffColor = difficultyColors[question.difficulty] ?? "";
  const isPractised = progress.practisedQuestionIds.includes(question.id);

  return (
    <div
      id={`question-${question.id}`}
      className={`bg-card border rounded-2xl overflow-hidden transition-all duration-200 ${
        isHighlighted
          ? "border-indigo-500/40 shadow-lg shadow-indigo-500/8"
          : expanded
          ? "border-border/80"
          : "border-border"
      }`}
    >
      {/* Header */}
      <button
        className="w-full text-left px-5 py-5 group"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${catColor}`}>
                {question.category}
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${diffColor}`}>
                {question.difficulty}
              </span>
              {isPractised && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-emerald-400/80 bg-emerald-400/8 uppercase tracking-wide">
                  ✓ Practiced
                </span>
              )}
            </div>
            <p className="text-[0.925rem] font-medium text-foreground/90 leading-snug">
              {question.text}
            </p>
          </div>
          <div className="text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors flex-shrink-0 mt-1">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border/50">
          {/* Coaching detail */}
          <div className="px-5 py-5 space-y-5">

            {/* Why asked */}
            <div>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Why interviewers ask this
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {question.whyAsked}
              </p>
            </div>

            {/* Structure tip */}
            <div>
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
                How to structure your answer
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {question.structureTip}
              </p>
            </div>

            {/* Example answer */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Example answer
              </p>
              <blockquote className="bg-background/50 border-l-2 border-indigo-500/30 pl-4 pr-4 py-3 rounded-r-xl">
                <p className="text-sm text-foreground/65 leading-relaxed italic">
                  {question.exampleAnswer}
                </p>
              </blockquote>
            </div>

            {/* Coach note — highlighted */}
            <div className="bg-violet-500/6 border border-violet-500/12 rounded-xl px-4 py-3.5">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
                Coach note
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {question.coachNote}
              </p>
            </div>
          </div>

          {/* Answer editor */}
          {!showEditor ? (
            <div className="px-5 pb-5 pt-1">
              <button
                id={`practice-${question.id}`}
                onClick={() => {
                  markPractised(question.id);
                  setShowEditor(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all duration-150 shadow-sm shadow-indigo-600/20"
              >
                <FileEdit size={13} />
                Draft your answer
              </button>
              {isPractised && !showEditor && (
                <span className="ml-3 inline-flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 size={12} /> Practiced
                </span>
              )}
            </div>
          ) : (
            <AnswerEditor question={question} onClose={() => setShowEditor(false)} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Answer Editor ─────────────────────────────────────────────────────────────

function AnswerEditor({
  question,
  onClose,
}: {
  question: Question;
  onClose: () => void;
}) {
  const { profile, saveAnswer, progress, incrementCoachInteraction } = useAppContext();
  const [draft, setDraft] = useState(progress.savedAnswers[question.id] ?? "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;

  function handleSave() {
    saveAnswer(question.id, draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function handleImprove() {
    if (!profile || draft.trim().length < 10) return;
    setLoadingFeedback(true);
    // Simulate brief async delay for realism
    setTimeout(() => {
      const fb = getMockCoachFeedback(question.text, draft, profile);
      setFeedback(fb);
      incrementCoachInteraction();
      setLoadingFeedback(false);
    }, 600);
  }

  return (
    <div className="border-t border-border/50 px-5 pb-6 pt-5">
      {/* Editor header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold">Draft your answer</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Write freely — this is yours to edit and improve
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground/50 hover:text-muted-foreground transition-colors p-1 rounded-lg hover:bg-white/5"
        >
          <X size={14} />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        id={`answer-draft-${question.id}`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Start with what you specifically did — not the context. You can add context later."
        className="w-full min-h-[160px] px-4 py-3.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 resize-y transition-colors leading-relaxed"
        autoFocus
      />

      {/* Word count + actions */}
      <div className="flex items-center gap-2.5 mt-3">
        <button
          id={`save-${question.id}`}
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/6 hover:bg-white/10 border border-border text-sm font-medium rounded-xl transition-colors"
        >
          <Save size={12} />
          {saved ? "Saved ✓" : "Save draft"}
        </button>

        <button
          id={`improve-${question.id}`}
          onClick={handleImprove}
          disabled={draft.trim().length < 10 || loadingFeedback}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600/15 hover:bg-violet-600/25 text-violet-300 border border-violet-500/20 text-sm font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles size={12} />
          {loadingFeedback ? "Reviewing..." : "Get feedback"}
        </button>

        <span className={`ml-auto text-[11px] font-medium ${
          wordCount > 130 ? "text-rose-400" :
          wordCount >= 60 ? "text-emerald-400" :
          "text-muted-foreground"
        }`}>
          {wordCount} words
          {wordCount > 0 && wordCount < 60 && " — add more detail"}
          {wordCount > 130 && " — consider trimming"}
          {wordCount >= 60 && wordCount <= 130 && " — good length"}
        </span>
      </div>

      {/* Feedback panel */}
      {feedback && (
        <div className="mt-4 bg-violet-500/6 border border-violet-500/15 rounded-xl px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={12} className="text-violet-400" />
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">AI coach feedback</p>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{feedback}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Question } from "@/lib/types";

interface RecommendedQuestionsProps {
  questions: Question[];
}

const categoryColors: Record<string, string> = {
  behavioral: "text-indigo-400 bg-indigo-400/10",
  technical: "text-cyan-400 bg-cyan-400/10",
  "role-specific": "text-violet-400 bg-violet-400/10",
  situational: "text-amber-400 bg-amber-400/10",
  motivation: "text-emerald-400 bg-emerald-400/10",
};

export default function RecommendedQuestions({ questions }: RecommendedQuestionsProps) {
  return (
    <div className="p-7 bg-card border border-border rounded-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
            Recommended questions
          </p>
          <h3 className="font-semibold">Your priority questions</h3>
        </div>
        <Link
          href="/questions"
          id="dashboard-questions-link"
          className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          See all
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {questions.slice(0, 3).map((q) => {
          const catColor = categoryColors[q.category] ?? "text-muted-foreground bg-white/5";
          return (
            <Link
              key={q.id}
              href={`/questions?q=${q.id}`}
              className="group block p-4 bg-background/40 hover:bg-background/70 border border-border hover:border-indigo-500/30 rounded-2xl transition-all duration-150"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={13} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/90 leading-snug mb-1.5">
                    {q.text}
                  </p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColor}`}>
                    {q.category}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-muted-foreground/40 group-hover:text-indigo-400 flex-shrink-0 mt-1 transition-colors"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

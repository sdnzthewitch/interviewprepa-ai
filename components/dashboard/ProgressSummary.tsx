"use client";

import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import type { ProgressInsight } from "@/lib/types";

interface ProgressSummaryProps {
  insights: ProgressInsight[];
  savedAnswers: number;
  practisedQuestions: number;
  coachInteractions: number;
  completedTasks: number;
}

const insightIcon = {
  positive: TrendingUp,
  warning: AlertTriangle,
  suggestion: Lightbulb,
};

const insightStyle = {
  positive: {
    icon: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/15",
  },
  warning: {
    icon: "text-amber-400",
    bg: "bg-amber-400/8",
    border: "border-amber-400/15",
  },
  suggestion: {
    icon: "text-indigo-400",
    bg: "bg-indigo-400/8",
    border: "border-indigo-400/15",
  },
};

export default function ProgressSummary({
  insights,
  savedAnswers,
  practisedQuestions,
  coachInteractions,
  completedTasks,
}: ProgressSummaryProps) {
  const stats = [
    { label: "Tasks completed", value: completedTasks },
    { label: "Answers saved", value: savedAnswers },
    { label: "Questions practiced", value: practisedQuestions },
    { label: "Coach interactions", value: coachInteractions },
  ];

  return (
    <div className="p-7 bg-card border border-border rounded-3xl">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-5">
        Progress summary
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="space-y-3">
          {insights.map((insight) => {
            const Icon = insightIcon[insight.type];
            const style = insightStyle[insight.type];
            return (
              <div
                key={insight.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border ${style.bg} ${style.border}`}
              >
                <Icon size={16} className={`${style.icon} flex-shrink-0 mt-0.5`} />
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {insight.message}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {insights.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4">
          Complete tasks and practice questions to unlock your progress insights.
        </p>
      )}
    </div>
  );
}

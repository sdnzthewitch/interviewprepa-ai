"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AppShell from "@/components/AppShell";
import QuestionCard from "@/components/questions/QuestionCard";
import { getFilteredQuestions } from "@/lib/mock-data/questions";

const categoryLabels: Record<string, string> = {
  all:            "All",
  behavioral:     "Behavioral",
  technical:      "Technical",
  "role-specific":"Role-specific",
  situational:    "Situational",
  motivation:     "Motivation",
};

export default function QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, isOnboarded, progress } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const highlightId = searchParams.get("q");

  useEffect(() => {
    if (!isOnboarded) router.push("/onboarding");
  }, [isOnboarded, router]);

  const allQuestions = useMemo(
    () =>
      profile
        ? getFilteredQuestions(profile.targetRole, profile.sector, profile.interviewType, 12)
        : [],
    [profile]
  );

  const filteredQuestions = useMemo(() => {
    if (activeFilter === "all") return allQuestions;
    return allQuestions.filter((q) => q.category === activeFilter);
  }, [allQuestions, activeFilter]);

  const availableCategories = useMemo(() => {
    const cats = new Set(allQuestions.map((q) => q.category));
    return ["all", ...Array.from(cats)];
  }, [allQuestions]);

  const practicedCount = useMemo(
    () => allQuestions.filter((q) => progress.practisedQuestionIds.includes(q.id)).length,
    [allQuestions, progress.practisedQuestionIds]
  );

  if (!profile) return null;

  return (
    <AppShell>
      <div className="p-8 pb-16 max-w-4xl animate-fade-up">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">Question bank</p>
          <h1 className="text-[2rem] font-bold tracking-tight leading-tight">
            Your recommended questions
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            {profile.interviewType} interview · {profile.targetRole || "your target role"} · {profile.sector}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-5 mb-7 py-4 border-y border-border/50">
          <div>
            <p className="text-lg font-bold">{allQuestions.length}</p>
            <p className="text-xs text-muted-foreground">questions</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-lg font-bold text-emerald-400">{practicedCount}</p>
            <p className="text-xs text-muted-foreground">practiced</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-lg font-bold text-indigo-400">
              {allQuestions.length > 0 ? Math.round((practicedCount / allQuestions.length) * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">completion</p>
          </div>
          {/* Progress bar */}
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden ml-2">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${allQuestions.length > 0 ? (practicedCount / allQuestions.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat}`}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeFilter === cat
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-indigo-500/30 bg-card"
              }`}
            >
              {categoryLabels[cat] ?? cat}
              <span className={`ml-1.5 ${activeFilter === cat ? "text-white/60" : "text-muted-foreground/50"}`}>
                {cat === "all"
                  ? allQuestions.length
                  : allQuestions.filter((q) => q.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isHighlighted={highlightId === q.id}
            />
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-base font-medium mb-1">No questions in this category</p>
              <p className="text-sm">Switch to &apos;All&apos; to see everything.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

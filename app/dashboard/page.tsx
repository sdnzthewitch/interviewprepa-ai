"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AppShell from "@/components/AppShell";
import { generateDailyPlan, calculateReadinessScore, generateProgressInsights } from "@/lib/helpers/generate-plan";
import { getFilteredQuestions } from "@/lib/mock-data/questions";
import { getDashboardInsight } from "@/lib/mock-data/coach-responses";
import { CheckCircle2, Circle, Clock, ArrowRight, Lightbulb, BookOpen, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import type { PrepTask, ProgressInsight } from "@/lib/types";
import type { Question } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { profile, progress, isOnboarded, completeTask } = useAppContext();

  useEffect(() => {
    if (!isOnboarded) router.push("/onboarding");
  }, [isOnboarded, router]);

  const tasks = useMemo(
    () => (profile ? generateDailyPlan(profile, progress) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, progress.completedTaskIds.length]
  );

  const questions = useMemo(
    () => profile ? getFilteredQuestions(profile.targetRole, profile.sector, profile.interviewType, 4) : [],
    [profile]
  );

  const readinessScore = useMemo(
    () => calculateReadinessScore(progress, tasks.length),
    [progress, tasks.length]
  );

  const insights = useMemo(
    () => profile ? generateProgressInsights(profile, progress, tasks.length) : [],
    [profile, progress]
  );

  const coachInsight = useMemo(
    () => (profile ? getDashboardInsight(profile) : ""),
    [profile]
  );

  const tasksWithState = useMemo(() =>
    tasks.map((t) => ({ ...t, completed: progress.completedTaskIds.includes(t.id) })),
    [tasks, progress.completedTaskIds]
  );

  if (!profile) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const completedCount = tasksWithState.filter((t) => t.completed).length;

  // Determine score display
  const scoreColor = readinessScore >= 70 ? "#22c55e" : readinessScore >= 40 ? "#6366f1" : "#f59e0b";
  const scoreLabel = readinessScore >= 70 ? "Çok İyi" : readinessScore >= 40 ? "Gelişiyor" : "Başlangıç";

  return (
    <AppShell>
      <div className="p-8 pb-16 max-w-5xl animate-fade-up">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-1">{greeting}</p>
          <h1 className="text-[2rem] font-bold tracking-tight leading-tight">
            {profile.companyName
              ? `${profile.companyName} Mülakatı Hazırlığı`
              : `Mülakat Hazırlık Paneli`}
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            {profile.targetRole || "Hedef rol"} · {profile.interviewType} formatı · {profile.sector}
          </p>
        </div>

        {/* ── Score + Coach — compact single row ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 mb-6">

          {/* Readiness score — compact */}
          <div className="p-6 bg-card border border-border rounded-3xl flex items-center gap-5">
            {/* Arc */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke={scoreColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={2 * Math.PI * 32 * (1 - readinessScore / 100)}
                transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <text x="40" y="43" textAnchor="middle" dominantBaseline="middle"
                fill={scoreColor} fontSize="14" fontWeight="800" fontFamily="Inter, sans-serif">
                {readinessScore}
              </text>
            </svg>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Hazırlık Skoru</p>
              <p className="text-lg font-bold" style={{ color: scoreColor }}>{scoreLabel}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {readinessScore === 0 ? "Puan toplamak için görevlere başla" : `${readinessScore}/100 Puan`}
              </p>
            </div>
          </div>

          {/* Coach insight — key message only */}
          <div className="p-6 bg-card border border-border rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/8 blur-3xl rounded-full pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={13} className="text-violet-400" />
                </div>
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Koçun Tavsiyesi</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
                {coachInsight}
              </p>
              <Link
                href="/coach"
                id="dashboard-coach-link"
                className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium mt-3 transition-colors"
              >
                Tuzakları ve ipuçlarını öğren <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Today's plan ──────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold">Günün Planı</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {tasksWithState.length} görevden {completedCount} tanesi tamamlandı
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${tasksWithState.length ? (completedCount / tasksWithState.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tasksWithState.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={completeTask} />
            ))}
          </div>
        </div>

        {/* ── Questions preview ─────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Öncelikli Sorular</h2>
            <Link
              href="/questions"
              id="dashboard-questions-link"
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Tümünü Gör <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questions.slice(0, 4).map((q) => (
              <QuestionPreview key={q.id} question={q} />
            ))}
          </div>
        </div>

        {/* ── Progress insights ─────────────────────────── */}
        {insights.length > 0 && (
          <div>
            <h2 className="text-base font-semibold mb-3">Gelişim Sinyalleri</h2>
            <div className="space-y-2">
              {insights.map((insight) => (
                <InsightRow key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

// ── Sub-components (co-located for simplicity) ────────────────────────────────

const priorityConfig = {
  high:   { label: "Öncelikli", color: "text-rose-400 bg-rose-400/10" },
  medium: { label: "Odaklan",    color: "text-amber-400 bg-amber-400/10" },
  low:    { label: "İsteğe Bağlı", color: "text-muted-foreground bg-white/5" },
};

function TaskRow({ task, onToggle }: { task: PrepTask; onToggle: (id: string) => void }) {
  const p = priorityConfig[task.priority];
  return (
    <button
      id={`task-${task.id}`}
      onClick={() => onToggle(task.id)}
      className={`group w-full text-left p-4 rounded-2xl border transition-all duration-150 ${
        task.completed
          ? "border-indigo-500/20 bg-indigo-500/5"
          : "border-border hover:border-indigo-500/30 bg-card"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {task.completed
            ? <CheckCircle2 size={16} className="text-indigo-400" />
            : <Circle size={16} className="text-muted-foreground/40 group-hover:text-indigo-400/60 transition-colors" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${p.color}`}>
              {p.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground/50">
            <Clock size={9} /> {task.estimatedMinutes} dk.
          </span>
        </div>
      </div>
    </button>
  );
}

const catColors: Record<string, string> = {
  behavioral:    "text-indigo-400 bg-indigo-400/8",
  technical:     "text-cyan-400 bg-cyan-400/8",
  "role-specific": "text-violet-400 bg-violet-400/8",
  situational:   "text-amber-400 bg-amber-400/8",
  motivation:    "text-emerald-400 bg-emerald-400/8",
};

function QuestionPreview({ question }: { question: Question }) {
  const catColor = catColors[question.category] ?? "text-muted-foreground bg-white/5";
  return (
    <Link
      href={`/questions?q=${question.id}`}
      className="group flex items-start gap-3 p-4 bg-card border border-border hover:border-indigo-500/30 rounded-2xl transition-all duration-150"
    >
      <div className="mt-0.5 w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        <BookOpen size={11} className="text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground/85 leading-snug mb-1.5 line-clamp-2">{question.text}</p>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${catColor}`}>
          {question.category}
        </span>
      </div>
      <ArrowRight size={13} className="text-muted-foreground/30 group-hover:text-indigo-400 flex-shrink-0 mt-1 transition-colors" />
    </Link>
  );
}

const insightIconMap = {
  positive:   { Icon: TrendingUp,    color: "text-emerald-400", bg: "bg-emerald-400/8 border-emerald-400/15" },
  warning:    { Icon: AlertTriangle, color: "text-amber-400",   bg: "bg-amber-400/8 border-amber-400/15" },
  suggestion: { Icon: Lightbulb,     color: "text-indigo-400",  bg: "bg-indigo-400/8 border-indigo-400/15" },
};

function InsightRow({ insight }: { insight: ProgressInsight }) {
  const { Icon, color, bg } = insightIconMap[insight.type];
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl border ${bg}`}>
      <Icon size={14} className={`${color} flex-shrink-0 mt-0.5`} />
      <p className="text-xs text-foreground/80 leading-relaxed">{insight.message}</p>
    </div>
  );
}

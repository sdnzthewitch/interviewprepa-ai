import type { UserProfile, PrepTask, ProgressInsight, ProgressState } from "../types";

// ───────────────────────────────────────────────────────────────
//  Plan Generator — Mock Logic
//  Generates a personalized prep plan based on user profile and
//  progress state. Designed to be replaced with LLM call.
// ───────────────────────────────────────────────────────────────

const urgencyTaskCount: Record<string, number> = {
  "this-week": 3,
  "this-month": 4,
  "next-month": 4,
  exploring: 3,
};

export function generateDailyPlan(
  profile: UserProfile,
  progress: ProgressState
): PrepTask[] {
  const taskCount = urgencyTaskCount[profile.urgency] ?? 4;
  const isUrgent = profile.urgency === "this-week";

  const allTasks: PrepTask[] = [
    {
      id: "task-research",
      title: profile.companyName
        ? `Research ${profile.companyName}`
        : "Research your target company",
      description: profile.companyName
        ? `Spend 20 min on ${profile.companyName}'s product, recent news, and values.`
        : "Review the company's mission, recent press, and culture page. Write 3 things you find interesting.",
      estimatedMinutes: 20,
      category: "research",
      priority: "high",
      completed: progress.completedTaskIds.includes("task-research"),
    },
    {
      id: "task-behavioral",
      title: "Practice 2 behavioral questions",
      description:
        "Pick 2 behavioral questions from your recommended list. Draft answers using STAR format.",
      estimatedMinutes: isUrgent ? 25 : 30,
      category: "behavioral",
      priority: "high",
      completed: progress.completedTaskIds.includes("task-behavioral"),
    },
    {
      id: "task-coach",
      title: "Review AI coach feedback",
      description:
        "Open the AI coach, share one of your answers, and apply the feedback to improve it.",
      estimatedMinutes: 15,
      category: "planning",
      priority: "medium",
      completed: progress.completedTaskIds.includes("task-coach"),
    },
    {
      id: "task-motivation",
      title: "Draft your 'Why this company' answer",
      description:
        "Write a 60-second answer to 'Why do you want to work here?' that references something specific.",
      estimatedMinutes: 20,
      category: "motivation",
      priority: isUrgent ? "high" : "medium",
      completed: progress.completedTaskIds.includes("task-motivation"),
    },
    {
      id: "task-situational",
      title: "Prepare 1 situational scenario",
      description:
        "Think of a real situation from your experience that demonstrates problem-solving. Write it down concisely.",
      estimatedMinutes: 20,
      category: "situational",
      priority: "medium",
      completed: progress.completedTaskIds.includes("task-situational"),
    },
  ];

  return allTasks.slice(0, taskCount);
}

// ───────────────────────────────────────────────────────────────
//  Readiness Score Calculator
// ───────────────────────────────────────────────────────────────

export function calculateReadinessScore(
  progress: ProgressState,
  totalTasks: number
): number {
  const taskScore = Math.min(
    (progress.completedTaskIds.length / Math.max(totalTasks, 1)) * 40,
    40
  );
  const answerScore = Math.min(
    Object.keys(progress.savedAnswers).length * 8,
    32
  );
  const coachScore = Math.min(progress.coachInteractions * 5, 15);
  const practiceScore = Math.min(progress.practisedQuestionIds.length * 3, 13);

  return Math.round(taskScore + answerScore + coachScore + practiceScore);
}

// ───────────────────────────────────────────────────────────────
//  Progress Insights Generator
// ───────────────────────────────────────────────────────────────

export function generateProgressInsights(
  profile: UserProfile,
  progress: ProgressState,
  totalTasks: number
): ProgressInsight[] {
  const insights: ProgressInsight[] = [];

  const savedCount = Object.keys(progress.savedAnswers).length;
  const practiceCount = progress.practisedQuestionIds.length;

  if (progress.sessionCount >= 3) {
    insights.push({
      id: "consistency",
      type: "positive",
      message:
        "Your preparation consistency is improving. Three sessions in a row is a strong habit.",
    });
  }

  if (savedCount === 0 && practiceCount === 0) {
    insights.push({
      id: "no-answers",
      type: "suggestion",
      message:
        "You haven't drafted any answers yet. Start with one behavioral question — even a rough draft helps solidify your thinking.",
    });
  } else if (savedCount > 0 && profile.interviewType === "behavioral") {
    insights.push({
      id: "behavioral-good",
      type: "positive",
      message: `You've saved ${savedCount} answer${savedCount > 1 ? "s" : ""}. For a behavioral interview, every written draft you practice builds muscle memory.`,
    });
  }

  if (
    profile.interviewType === "behavioral" &&
    practiceCount < 2
  ) {
    insights.push({
      id: "focus-behavioral",
      type: "warning",
      message:
        "You're focusing on reading over practicing. For behavioral interviews, practicing out loud matters more than reading more questions.",
    });
  }

  if (
    profile.englishLevel === "intermediate" ||
    profile.englishLevel === "beginner"
  ) {
    insights.push({
      id: "english-length",
      type: "suggestion",
      message:
        "Your English preparation is growing, but keep your answers shorter — aim for 90 seconds max per answer to stay clear and confident.",
    });
  }

  if (profile.urgency === "this-week" && progress.completedTaskIds.length < 2) {
    insights.push({
      id: "urgency-warning",
      type: "warning",
      message:
        "You have limited time before your interview. Prioritise the top two tasks in your daily plan and skip anything marked optional.",
    });
  }

  return insights.slice(0, 3);
}

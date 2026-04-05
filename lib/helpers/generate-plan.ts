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
        ? `${profile.companyName} hakkında araştırma yap`
        : "Hedef şirketin hakkında araştırma yap",
      description: profile.companyName
        ? `${profile.companyName} şirketinin ürünleri, son haberleri ve vizyonu için 20 dakika ayır.`
        : "Şirketin misyonunu, haberlerini ve kültür sayfasını incele. İlgi çekici bulduğun 3 maddeyi not et.",
      estimatedMinutes: 20,
      category: "research",
      priority: "high",
      completed: progress.completedTaskIds.includes("task-research"),
    },
    {
      id: "task-behavioral",
      title: "2 davranışsal (behavioral) soruyu pratik et",
      description:
        "Önerilenler listesinden 2 davranışsal soru seç. STAR formatını kullanarak cevap taslağı oluştur.",
      estimatedMinutes: isUrgent ? 25 : 30,
      category: "behavioral",
      priority: "high",
      completed: progress.completedTaskIds.includes("task-behavioral"),
    },
    {
      id: "task-coach",
      title: "AI Koçun geri bildirimini incele",
      description:
        "AI Koç'u aç, taslak cevaplarından birini gönder ve aldığı geri bildirime göre cevabını geliştir.",
      estimatedMinutes: 15,
      category: "planning",
      priority: "medium",
      completed: progress.completedTaskIds.includes("task-coach"),
    },
    {
      id: "task-motivation",
      title: "'Neden bu şirket?' sorusuna taslak hazırla",
      description:
        "Spesifik bir detaya değinerek 'Neden burada çalışmak istiyorsun?' sorusuna 60 saniyelik bir yanıt yaz.",
      estimatedMinutes: 20,
      category: "motivation",
      priority: isUrgent ? "high" : "medium",
      completed: progress.completedTaskIds.includes("task-motivation"),
    },
    {
      id: "task-situational",
      title: "1 spesifik kriz veya durumsal senaryo hazırla",
      description:
        "Geçmiş deneyimlerinden problem çözme yeteneğini açıkça kanıtlayan gerçek bir anıyı düşün ve özetle.",
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
  progress: ProgressState
): ProgressInsight[] {
  const insights: ProgressInsight[] = [];

  const savedCount = Object.keys(progress.savedAnswers).length;
  const practiceCount = progress.practisedQuestionIds.length;

  if (progress.sessionCount >= 3) {
    insights.push({
      id: "consistency",
      type: "positive",
      message:
        "Hazırlık istikrarın harika gidiyor. Üst üste üç oturum yapmak güçlü bir alışkanlıktır.",
    });
  }

  if (savedCount === 0 && practiceCount === 0) {
    insights.push({
      id: "no-answers",
      type: "suggestion",
      message:
        "Henüz bir cevap taslağı oluşturmadın. Bir davranışsal soruyla başla — kaba bir taslak bile zihnini toparlamaya yardımcı olur.",
    });
  } else if (savedCount > 0 && profile.interviewType === "behavioral") {
    insights.push({
      id: "behavioral-good",
      type: "positive",
      message: `Şu ana kadar ${savedCount} cevap kaydettin. Davranışsal mülakatlarda kas hafızası geliştirmek için her yazılı taslak çok değerlidir.`,
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
        "Pratik yapmaktan ziyade sadece okumaya odaklanmış görünüyorsun. Davranışsal mülakatlarda sesli pratik yapmak, daha fazla soru okumaktan çok daha etkilidir.",
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
        "İngilizce seviyeni göz önünde bulundurursak; net ve kendinden emin iletişim kurabilmek için cevaplarını nispeten kısa tutmalısın — her bir cevap için maks 90 saniye hedefle.",
    });
  }

  if (profile.urgency === "this-week" && progress.completedTaskIds.length < 2) {
    insights.push({
      id: "urgency-warning",
      type: "warning",
      message:
        "Mülakatın için zamanın çok kısıtlı. Günlük planındaki ilk iki göreve öncelik ver ve isteğe bağlı olanları es geç.",
    });
  }

  return insights.slice(0, 3);
}

// ───────────────────────────────────────────────────────────────
//  Core Types — Interview Prep AI
// ───────────────────────────────────────────────────────────────

export type UserType = "student" | "new-graduate" | "young-professional" | "career-switcher";
export type InterviewType = "behavioral" | "technical" | "case-study" | "mixed" | "phone" | "panel";
export type PrepLanguage = "english" | "turkish" | "french" | "spanish" | "german" | "arabic" | "other";
export type EnglishLevel = "native" | "advanced" | "intermediate" | "beginner";
export type Urgency = "this-week" | "this-month" | "next-month" | "exploring";
export type CompanyType = "startup" | "scale-up" | "corporate" | "public-sector" | "consulting";
export type QuestionCategory = "behavioral" | "technical" | "role-specific" | "situational" | "motivation";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  userType: UserType;
  targetRole: string;
  sector: string;
  interviewType: InterviewType;
  prepLanguage: PrepLanguage;
  englishLevel: EnglishLevel;
  biggestChallenge: string;
  urgency: Urgency;
  companyType: CompanyType;
  jobDescription?: string;
  companyName?: string;
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  role?: string;
  sector?: string;
  whyAsked: string;
  structureTip: string;
  exampleAnswer: string;
  coachNote: string;
  tags: string[];
}

export interface PrepTask {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  category: QuestionCategory | "planning" | "research";
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export interface CoachMessage {
  id: string;
  type: "coach" | "user";
  content: string;
  timestamp: Date;
}

export interface ProgressState {
  completedTaskIds: string[];
  savedAnswers: Record<string, string>;
  coachInteractions: number;
  practisedQuestionIds: string[];
  sessionCount: number;
}

export interface ProgressInsight {
  id: string;
  type: "positive" | "warning" | "suggestion";
  message: string;
}

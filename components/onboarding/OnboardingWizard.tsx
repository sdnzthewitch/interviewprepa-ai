"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import type {
  UserProfile,
  UserType,
  InterviewType,
  PrepLanguage,
  EnglishLevel,
  Urgency,
  CompanyType,
} from "@/lib/types";
import { CheckCircle2, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

// ── Step config ─────────────────────────────────────────────────
type Step = {
  id: string;
  question: string;
  subtext?: string;
  field: keyof UserProfile;
  options?: { value: string; label: string; description?: string }[];
  type: "choice" | "text";
  optional?: boolean;
};

const steps: Step[] = [
  {
    id: "userType",
    question: "Which best describes you right now?",
    subtext: "We use this to personalize your coaching advice.",
    field: "userType",
    type: "choice",
    options: [
      { value: "student", label: "Student", description: "Still studying, preparing for my first professional role" },
      { value: "new-graduate", label: "New graduate", description: "Recently graduated, entering the job market" },
      { value: "young-professional", label: "Young professional", description: "Working, targeting a new role or promotion" },
      { value: "career-switcher", label: "Career switcher", description: "Moving into a different sector or function" },
    ],
  },
  {
    id: "targetRole",
    question: "What role are you interviewing for?",
    subtext: "Be specific — e.g. 'Product Manager', 'Software Engineer', 'Marketing Analyst'",
    field: "targetRole",
    type: "text",
  },
  {
    id: "sector",
    question: "Which sector is your target company in?",
    subtext: "This shapes which questions and coaching style we use.",
    field: "sector",
    type: "choice",
    options: [
      { value: "technology", label: "Technology" },
      { value: "finance", label: "Finance & Banking" },
      { value: "consulting", label: "Consulting" },
      { value: "healthcare", label: "Healthcare" },
      { value: "marketing", label: "Marketing & Media" },
      { value: "operations", label: "Operations & Supply Chain" },
      { value: "public-sector", label: "Public sector / NGO" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "interviewType",
    question: "What type of interview are you preparing for?",
    subtext: "Different formats require different preparation strategies.",
    field: "interviewType",
    type: "choice",
    options: [
      { value: "behavioral", label: "Behavioral", description: "Competency questions, STAR format" },
      { value: "technical", label: "Technical", description: "Coding, case work, or domain knowledge" },
      { value: "case-study", label: "Case study", description: "Business problem-solving" },
      { value: "phone", label: "Phone interview", description: "First-stage screening call" },
      { value: "panel", label: "Panel interview", description: "Multiple interviewers at once" },
      { value: "mixed", label: "Mixed — I'm not sure", description: "Contains several types" },
    ],
  },
  {
    id: "prepLanguage",
    question: "Which language will your interview be in?",
    field: "prepLanguage",
    type: "choice",
    options: [
      { value: "english", label: "English" },
      { value: "turkish", label: "Turkish" },
      { value: "french", label: "French" },
      { value: "spanish", label: "Spanish" },
      { value: "german", label: "German" },
      { value: "arabic", label: "Arabic" },
      { value: "other", label: "Another language" },
    ],
  },
  {
    id: "englishLevel",
    question: "What is your English proficiency level?",
    subtext: "This helps us adjust coaching advice for communication clarity.",
    field: "englishLevel",
    type: "choice",
    options: [
      { value: "native", label: "Native or bilingual" },
      { value: "advanced", label: "Advanced (C1/C2)" },
      { value: "intermediate", label: "Intermediate (B1/B2)" },
      { value: "beginner", label: "Basic (A1/A2)" },
    ],
  },
  {
    id: "biggestChallenge",
    question: "What is your biggest challenge when interviewing?",
    subtext: "Be honest — this shapes your coaching.",
    field: "biggestChallenge",
    type: "choice",
    options: [
      { value: "structuring-answers", label: "Structuring my answers" },
      { value: "nerves", label: "Managing nerves and confidence" },
      { value: "english-communication", label: "Communicating clearly in English" },
      { value: "no-experience", label: "Not having enough experience to draw from" },
      { value: "specific-examples", label: "Finding specific, strong examples" },
      { value: "technical-knowledge", label: "Technical knowledge gaps" },
    ],
  },
  {
    id: "urgency",
    question: "When is your interview?",
    subtext: "This affects how your daily preparation plan is structured.",
    field: "urgency",
    type: "choice",
    options: [
      { value: "this-week", label: "This week", description: "Urgent — I need to focus now" },
      { value: "this-month", label: "This month", description: "I have a few weeks to prepare" },
      { value: "next-month", label: "Next month or later", description: "Building over time" },
      { value: "exploring", label: "Just exploring", description: "No specific interview yet" },
    ],
  },
  {
    id: "companyType",
    question: "What type of company are you targeting?",
    field: "companyType",
    type: "choice",
    options: [
      { value: "startup", label: "Startup" },
      { value: "scale-up", label: "Scale-up / growth stage" },
      { value: "corporate", label: "Large corporate" },
      { value: "public-sector", label: "Public sector" },
      { value: "consulting", label: "Consulting firm" },
    ],
  },
  {
    id: "companyName",
    question: "Which company are you interviewing at? (optional)",
    subtext: "We'll reference this in your prep plan if you share it.",
    field: "companyName",
    type: "text",
    optional: true,
  },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const { setProfile } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserProfile>>({});
  const [textInput, setTextInput] = useState("");

  const step = steps[currentStep];
  const total = steps.length;
  const progress = ((currentStep) / total) * 100;
  const isLast = currentStep === total - 1;
  const currentValue = answers[step.field] as string | undefined;

  function handleChoice(value: string) {
    setAnswers((prev) => ({ ...prev, [step.field]: value }));
  }

  function handleNext() {
    // For text fields, save the input before advancing
    if (step.type === "text") {
      if (!textInput.trim() && !step.optional) return;
      setAnswers((prev) => ({
        ...prev,
        [step.field]: textInput.trim() || undefined,
      }));
      setTextInput("");
    }

    if (isLast) {
      const finalAnswers = step.type === "text"
        ? { ...answers, [step.field]: textInput.trim() || undefined }
        : answers;

      setProfile(finalAnswers as UserProfile);
      router.push("/dashboard");
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      // Restore text input if stepping back to a text field
      const prevStep = steps[currentStep - 1];
      if (prevStep.type === "text") {
        setTextInput((answers[prevStep.field] as string) ?? "");
      }
    }
  }

  const canProceed =
    step.type === "text"
      ? step.optional || textInput.trim().length > 0
      : !!currentValue;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            Interview Prep AI
          </Link>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <div
            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-2xl animate-fade-up" key={step.id}>
          {/* Question */}
          <div className="mb-8">
            <p className="text-sm text-indigo-400 font-medium mb-3 uppercase tracking-wider">
              {currentStep + 1} / {total}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {step.question}
            </h1>
            {step.subtext && (
              <p className="text-muted-foreground">{step.subtext}</p>
            )}
          </div>

          {/* Choices */}
          {step.type === "choice" && step.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {step.options.map((opt) => {
                const selected = currentValue === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`option-${opt.value}`}
                    onClick={() => handleChoice(opt.value)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-150 ${
                      selected
                        ? "border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/10"
                        : "border-border bg-card hover:border-indigo-500/40 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          selected
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {selected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${selected ? "text-foreground" : "text-foreground/80"}`}>
                          {opt.label}
                        </p>
                        {opt.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {opt.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Text input */}
          {step.type === "text" && (
            <div className="mb-8">
              <input
                id={`input-${step.id}`}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceed) handleNext();
                }}
                placeholder={
                  step.optional
                    ? "Optional — skip if you prefer"
                    : "Type your answer..."
                }
                className="w-full px-5 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-lg transition-colors"
                autoFocus
              />
              {step.optional && (
                <p className="mt-2 text-xs text-muted-foreground">
                  This field is optional. Press Continue to skip.
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xl hover:bg-white/5"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              id="onboarding-next"
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 hover:scale-[1.02]"
            >
              {isLast ? (
                <>
                  <CheckCircle2 size={16} />
                  Build my dashboard
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

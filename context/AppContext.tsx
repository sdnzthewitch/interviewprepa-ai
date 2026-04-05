"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { UserProfile, ProgressState } from "@/lib/types";

// ───────────────────────────────────────────────────────────────
//  UserProfile Context
//  Holds global state: onboarding profile + progress tracking.
//  In production, this would be backed by a database and auth.
// ───────────────────────────────────────────────────────────────

interface AppContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  progress: ProgressState;
  completeTask: (taskId: string) => void;
  saveAnswer: (questionId: string, answer: string) => void;
  markPractised: (questionId: string) => void;
  incrementCoachInteraction: () => void;
  resetProgress: () => void;
  isOnboarded: boolean;
}

const defaultProgress: ProgressState = {
  completedTaskIds: [],
  savedAnswers: {},
  coachInteractions: 0,
  practisedQuestionIds: [],
  sessionCount: 1,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
    // Simulate returning user with some existing progress
    setProgress({
      ...defaultProgress,
      sessionCount: 1,
    });
  }, []);

  const completeTask = useCallback((taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTaskIds: prev.completedTaskIds.includes(taskId)
        ? prev.completedTaskIds.filter((id) => id !== taskId)
        : [...prev.completedTaskIds, taskId],
    }));
  }, []);

  const saveAnswer = useCallback((questionId: string, answer: string) => {
    setProgress((prev) => ({
      ...prev,
      savedAnswers: { ...prev.savedAnswers, [questionId]: answer },
    }));
  }, []);

  const markPractised = useCallback((questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      practisedQuestionIds: prev.practisedQuestionIds.includes(questionId)
        ? prev.practisedQuestionIds
        : [...prev.practisedQuestionIds, questionId],
    }));
  }, []);

  const incrementCoachInteraction = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      coachInteractions: prev.coachInteractions + 1,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    setProfileState(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        progress,
        completeTask,
        saveAnswer,
        markPractised,
        incrementCoachInteraction,
        resetProgress,
        isOnboarded: profile !== null,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within <AppProvider>");
  }
  return ctx;
}

import { Suspense } from "react";
import QuestionsContent from "./QuestionsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions — Interview Prep AI",
  description: "Practice your recommended interview questions with AI coaching feedback.",
};

export default function QuestionsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-muted-foreground text-sm">Loading questions...</div>}>
      <QuestionsContent />
    </Suspense>
  );
}

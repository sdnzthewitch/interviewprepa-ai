import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get started — Interview Prep AI",
  description: "Tell us about yourself and your target interview. Your personalized prep dashboard is ready in under 3 minutes.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}

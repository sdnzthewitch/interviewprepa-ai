"use client";

import { UserCircle, Map, MessageSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCircle,
    title: "Tell us about yourself",
    description:
      "Complete a short onboarding in under 3 minutes. We learn your target role, sector, interview type, and experience level.",
  },
  {
    number: "02",
    icon: Map,
    title: "We build your prep path",
    description:
      "Your personalized dashboard appears instantly — with a readiness score, today's tasks, and questions tailored to your profile.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Practice with AI coaching",
    description:
      "Draft answers to recommended questions. Your AI coach gives structured, role-specific feedback — not generic advice.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track your progress",
    description:
      "See exactly how you're improving. Identify gaps, stay consistent, and know when you're ready.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-6 max-w-6xl mx-auto scroll-mt-16"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
          How it works
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          From zero to interview-ready
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Four clear steps — designed around how people actually prepare, not
          how they should prepare in theory.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="group relative p-8 bg-card border border-border rounded-3xl card-hover"
            >
              {/* Step number */}
              <span className="absolute top-6 right-7 text-5xl font-black text-white/5 select-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 transition-colors">
                <Icon size={22} className="text-indigo-400" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

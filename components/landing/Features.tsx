"use client";

import {
  Brain,
  Target,
  BarChart3,
  FileEdit,
  ListChecks,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personalized question bank",
    description:
      "Questions are filtered by your role, sector, and interview type — not a generic list of 100.",
  },
  {
    icon: Brain,
    title: "AI coaching that sounds like a coach",
    description:
      "Specific, structured advice based on your profile. Not motivational — actionable.",
  },
  {
    icon: FileEdit,
    title: "Answer drafting workspace",
    description:
      "Draft your answers in the app, get instant feedback, and save your best versions.",
  },
  {
    icon: BarChart3,
    title: "Progress tracking",
    description:
      "A readiness score that updates with your activity, and insights that tell you exactly where you're weak.",
  },
  {
    icon: ListChecks,
    title: "Daily preparation plan",
    description:
      "A focused plan each day based on your urgency and how much you've already done.",
  },
  {
    icon: Globe,
    title: "Multi-language support",
    description:
      "Prepare in English, French, Spanish, or other languages — with tailored coaching for non-native speakers.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything in one system
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Most candidates prepare in fragments — scattered notes, random
            practice, and vague advice. This platform gives you structure.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-7 bg-card border border-border rounded-3xl card-hover group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center mb-5 transition-colors">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

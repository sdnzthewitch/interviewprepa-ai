"use client";

import { GraduationCap, Briefcase, RefreshCw, Star } from "lucide-react";

const personas = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Preparing for your first professional interview with limited work experience to draw from.",
  },
  {
    icon: Star,
    title: "New graduates",
    description:
      "Entering the job market and needing to articulate your degree, projects, and potential.",
  },
  {
    icon: Briefcase,
    title: "Young professionals",
    description:
      "Moving into a more senior role or a new company and getting back into interview mode.",
  },
  {
    icon: RefreshCw,
    title: "Career switchers",
    description:
      "Transitioning sectors or functions and learning to reframe your existing experience.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for where you are
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Your preparation path adapts to your profile — different advice for
            different experience levels and goals.
          </p>
        </div>

        {/* Personas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-7 bg-card border border-border rounded-3xl flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Icon size={20} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

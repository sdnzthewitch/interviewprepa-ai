"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CoachInsightsProps {
  insight: string;
}

export default function CoachInsights({ insight }: CoachInsightsProps) {
  return (
    <div className="p-7 bg-card border border-border rounded-3xl relative overflow-hidden">
      {/* Subtle glow behind the bulb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-2xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center">
            <Lightbulb size={16} className="text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              AI coach insight
            </p>
            <p className="text-xs text-violet-400 font-medium">Today&apos;s focus</p>
          </div>
        </div>

        <p className="text-[0.9rem] text-foreground/85 leading-relaxed mb-5">
          {insight}
        </p>

        <Link
          href="/coach"
          id="dashboard-coach-link"
          className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
        >
          Open full coach panel
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

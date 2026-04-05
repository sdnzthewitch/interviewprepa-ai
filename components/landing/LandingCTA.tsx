"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingCTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-14 text-center glow-indigo" style={{ background: "linear-gradient(135deg, oklch(0.14 0.02 265) 0%, oklch(0.12 0.03 280) 100%)" }}>
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-600/20 blur-3xl rounded-full" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
              Ready to start?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Build your preparation system today
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
              Answer 10 quick questions, get your personalized dashboard, and
              start preparing with a system built around you.
            </p>

            <Link
              href="/onboarding"
              id="landing-bottom-cta"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-600/30 hover:scale-[1.02]"
            >
              Get started — it's free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>

            <p className="mt-6 text-sm text-muted-foreground">
              No account required to start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

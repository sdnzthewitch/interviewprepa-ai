"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-up">
          <Sparkles size={14} />
          <span>Built for serious candidates</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 animate-fade-up">
          Personalized interview{" "}
          <span className="gradient-text">preparation</span>
          <br />
          that actually guides you.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
          Interview Prep AI understands your role, sector, and experience level.
          It builds your preparation path, recommends the right questions, coaches
          your answers, and tracks your progress — so you walk in ready.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
          <Link
            href="/onboarding"
            id="hero-cta-primary"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/35 hover:scale-[1.02]"
          >
            Start your preparation
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
          <Link
            href="#how-it-works"
            id="hero-cta-secondary"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/8 text-foreground font-medium rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            See how it works
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-sm text-muted-foreground animate-fade-up">
          Zero setup required — personalized to you in under 3 minutes.
        </p>
      </div>
    </section>
  );
}

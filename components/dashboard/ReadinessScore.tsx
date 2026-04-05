"use client";

interface ReadinessScoreProps {
  score: number;
  role: string;
  urgency: string;
}

const urgencyLabel: Record<string, string> = {
  "this-week": "Interview this week",
  "this-month": "Interview this month",
  "next-month": "Interview next month",
  exploring: "Exploring options",
};

export default function ReadinessScore({ score, role, urgency }: ReadinessScoreProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  // Determine color based on score
  const color =
    clampedScore >= 70
      ? "#22c55e"
      : clampedScore >= 40
      ? "#6366f1"
      : "#f59e0b";
  const label =
    clampedScore >= 70 ? "Strong" : clampedScore >= 40 ? "In progress" : "Getting started";

  // SVG circle math
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="p-7 bg-card border border-border rounded-3xl">
      <div className="flex items-start justify-between gap-6">
        {/* Text */}
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
            Readiness score
          </p>
          <p className="text-sm text-foreground/70 mb-5">
            for <span className="font-medium text-foreground">{role || "your target role"}</span>
          </p>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black" style={{ color }}>
                {clampedScore}
              </span>
              <span className="text-muted-foreground text-sm">/ 100</span>
            </div>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
              style={{ color, background: `${color}18` }}
            >
              {label}
            </span>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            {urgencyLabel[urgency] ?? "Preparation in progress"}
          </p>
        </div>

        {/* Circular progress */}
        <div className="flex-shrink-0">
          <svg width="130" height="130" viewBox="0 0 130 130">
            {/* Track */}
            <circle
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            {/* Progress arc */}
            <circle
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 65 65)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
            {/* Center text */}
            <text
              x="65"
              y="68"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={color}
              fontSize="22"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              {clampedScore}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

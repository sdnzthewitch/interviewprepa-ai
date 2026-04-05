"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import type { PrepTask } from "@/lib/types";

interface TodayPlanProps {
  tasks: PrepTask[];
}

const priorityConfig = {
  high: { label: "Priority", color: "text-rose-400 bg-rose-400/10" },
  medium: { label: "Focus", color: "text-amber-400 bg-amber-400/10" },
  low: { label: "Optional", color: "text-muted-foreground bg-white/5" },
};

export default function TodayPlan({ tasks }: TodayPlanProps) {
  const { completeTask } = useAppContext();
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="p-7 bg-card border border-border rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
            Today's plan
          </p>
          <h3 className="font-semibold text-lg">
            {completedCount} / {tasks.length} tasks completed
          </h3>
        </div>
        {/* Mini progress bar */}
        <div className="w-20 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => {
          const pConf = priorityConfig[task.priority];
          return (
            <li key={task.id}>
              <button
                id={`task-${task.id}`}
                onClick={() => completeTask(task.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 group ${
                  task.completed
                    ? "border-indigo-500/20 bg-indigo-500/5"
                    : "border-border hover:border-indigo-500/30 bg-background/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className="mt-0.5 flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-indigo-400" />
                    ) : (
                      <Circle
                        size={18}
                        className="text-muted-foreground/40 group-hover:text-indigo-400/60 transition-colors"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`font-medium text-sm ${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pConf.color}`}>
                        {pConf.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/60">
                      <Clock size={11} />
                      <span>{task.estimatedMinutes} min</span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

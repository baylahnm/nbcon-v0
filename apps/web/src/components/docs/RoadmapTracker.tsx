"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { useI18n } from "../../hooks/useI18n";
import { CheckCircle2, Circle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface PhaseStatus {
  phase: number;
  name: string;
  completed: number;
  total: number;
  percentage: number;
  isComplete: boolean;
}

const phases: PhaseStatus[] = [
  { phase: 1, name: "Core Architecture", completed: 14, total: 14, percentage: 100, isComplete: true },
  { phase: 2, name: "Routing & Navigation", completed: 7, total: 8, percentage: 88, isComplete: false },
  { phase: 3, name: "Subscription & Billing", completed: 12, total: 12, percentage: 100, isComplete: true },
  { phase: 4, name: "UI & Component Layer", completed: 29, total: 32, percentage: 91, isComplete: false },
  { phase: 5, name: "AI Integration", completed: 4, total: 4, percentage: 100, isComplete: true },
  { phase: 6, name: "Testing & Compliance", completed: 4, total: 4, percentage: 100, isComplete: true },
  { phase: 7, name: "Enterprise & Lifecycle", completed: 4, total: 4, percentage: 100, isComplete: true },
  { phase: 8, name: "Docs & Knowledge Hub", completed: 3, total: 4, percentage: 75, isComplete: false },
  { phase: 9, name: "Deployment & Production", completed: 0, total: 4, percentage: 0, isComplete: false },
];

export function RoadmapTracker() {
  const { t } = useI18n();
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());

  const togglePhase = (phase: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  const overallProgress = phases.reduce((acc, p) => acc + p.completed, 0);
  const overallTotal = phases.reduce((acc, p) => acc + p.total, 0);
  const overallPercentage = Math.round((overallProgress / overallTotal) * 100);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("roadmap.title")}</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("roadmap.overallProgress")}</span>
              <span className="text-sm font-bold">{overallPercentage}%</span>
            </div>
            <Progress value={overallPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {overallProgress} {t("roadmap.tasksCompleted")} {overallTotal}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {phases.map((phase) => (
          <div key={phase.phase} className="border rounded-lg p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => togglePhase(phase.phase)}
            >
              <div className="flex items-center gap-3 flex-1">
                {phase.isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      Phase {phase.phase}: {phase.name}
                    </span>
                    {phase.isComplete && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Complete
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={phase.percentage} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {phase.completed}/{phase.total}
                    </span>
                  </div>
                </div>
              </div>
              {expandedPhases.has(phase.phase) ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {expandedPhases.has(phase.phase) && (
              <div className="mt-4 pl-8 space-y-2 text-sm text-muted-foreground">
                <p>
                  {phase.isComplete
                    ? t("roadmap.allTasksCompleted")
                    : `${phase.total - phase.completed} ${t("roadmap.tasksRemaining")}`}
                </p>
                {phase.phase === 4 && (
                  <p className="text-xs">{t("roadmap.completeI18n")}</p>
                )}
                {phase.phase === 9 && (
                  <p className="text-xs">{t("roadmap.completeProduction")}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">{t("roadmap.nextSteps")}</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>{t("roadmap.completeI18n")}</li>
              <li>{t("roadmap.completeProduction")}</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}


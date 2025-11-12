"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessTimelineProps {
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Apply",
    description: "Submit your application online",
    duration: "5 minutes",
  },
  {
    step: 2,
    title: "Initial Screening",
    description: "We review your application and resume",
    duration: "1-2 days",
  },
  {
    step: 3,
    title: "Technical Interview",
    description: "Technical assessment and coding challenge",
    duration: "1 hour",
  },
  {
    step: 4,
    title: "Team Interview",
    description: "Meet the team and discuss culture fit",
    duration: "1 hour",
  },
  {
    step: 5,
    title: "Final Decision",
    description: "We make our decision and extend an offer",
    duration: "1-2 days",
  },
];

export function ProcessTimeline({ steps = defaultSteps }: ProcessTimelineProps) {
  return (
    <div className="grid md:grid-cols-5 gap-4">
      {steps.map((process, index) => (
        <Card key={process.step} className="relative">
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border z-0" />
          )}
          <CardContent className="p-6 text-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="stat-medium text-primary">{process.step}</span>
            </div>
            <h3 className="card-title mb-2">{process.title}</h3>
            <p className="body-small mb-2">{process.description}</p>
            {process.duration && (
              <p className="body-small text-muted-foreground">{process.duration}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


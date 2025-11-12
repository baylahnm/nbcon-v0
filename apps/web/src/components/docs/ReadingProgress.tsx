"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const progress = useReadingProgress();

  // Don't show if progress is 0 or 100 (at top or bottom)
  if (progress === 0 || progress >= 100) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-muted z-50",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}


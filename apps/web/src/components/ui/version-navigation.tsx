"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VersionNavigationProps {
  messageId: string;
  currentVersion: number;
  totalVersions: number;
  onPrevious: () => void;
  onNext: () => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
}

export function VersionNavigation({
  messageId,
  currentVersion,
  totalVersions,
  onPrevious,
  onNext,
  onRegenerate,
  isLoading = false,
}: VersionNavigationProps) {
  const isFirstVersion = currentVersion === 1;
  const isLastVersion = currentVersion === totalVersions;

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        disabled={isFirstVersion || isLoading}
        className="h-8 px-2"
        aria-label="Previous version"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 px-2 text-sm text-muted-foreground">
        <span>{currentVersion}</span>
        <span>/</span>
        <span>{totalVersions}</span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={isLastVersion || isLoading}
        className="h-8 px-2"
        aria-label="Next version"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {onRegenerate && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isLoading}
          className="h-8 px-2 ml-2"
          aria-label="Regenerate response"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}


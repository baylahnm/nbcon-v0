"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function LoadingSpinner({ 
  className, 
  size = "md", 
  label = "Loading...",
  ...props 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div 
      className={cn("inline-flex items-center gap-2", className)} 
      role="status"
      aria-label={label}
      {...props}
    >
      <div
        className={cn(
          "border-primary border-t-transparent rounded-full animate-spin",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="text-sm text-muted-foreground sr-only">
          {label}
        </span>
      )}
    </div>
  );
}


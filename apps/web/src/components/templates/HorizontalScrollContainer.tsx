"use client";

import React from "react";
import { ScrollNavigationButtons } from "./ScrollNavigationButtons";
import { cn } from "@/lib/utils";

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScrollContainer({
  children,
  className,
}: HorizontalScrollContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={cn(
          "overflow-x-auto scrollbar-hide scroll-smooth",
          className
        )}
      >
        <div className="flex gap-4 pb-2" style={{ minWidth: "min-content" }}>
          {children}
        </div>
      </div>
      <ScrollNavigationButtons containerRef={containerRef} />
    </div>
  );
}


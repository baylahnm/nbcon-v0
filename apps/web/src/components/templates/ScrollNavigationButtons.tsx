"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollNavigationButtonsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export function ScrollNavigationButtons({
  containerRef,
  className,
}: ScrollNavigationButtonsProps) {
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScrollability = React.useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, [containerRef]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [containerRef, checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = containerRef.current.clientWidth * 0.8;
    const newScrollLeft =
      containerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    containerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Left Button */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background",
            "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-offset-2",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:opacity-50",
            className
          )}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right Button */}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background",
            "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-offset-2",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:opacity-50",
            className
          )}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}


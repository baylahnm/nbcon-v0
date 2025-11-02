"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NbLogoProps {
  className?: string;
}

export const NbLogo = ({ className }: NbLogoProps) => {
  const isSmall = className?.includes("w-6") || className?.includes("w-8");
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-lg",
        className || "w-9 h-9"
      )}
    >
      <span
        className={cn(
          "text-primary-foreground font-bold relative inline-block",
          isSmall ? "text-sm" : "text-2xl"
        )}
      >
        n.
        <span
          className={cn(
            "absolute italic font-bold transform -rotate-12",
            isSmall ? "-top-1 left-0 text-[6px]" : "-top-2 left-2 text-[8px]"
          )}
          style={{ fontFamily: "Quintessential, cursive" }}
        >
          pro
        </span>
      </span>
    </div>
  );
};


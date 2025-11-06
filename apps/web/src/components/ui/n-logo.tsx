"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NbLogoProps {
  className?: string;
}

export const NbLogo = ({ className }: NbLogoProps) => {
  const isSmall = className?.includes("w-6") || className?.includes("w-8");
  return (
    <span
      className={cn(
        "text-foreground font-bold inline-block",
        isSmall ? "text-sm" : "text-2xl"
      )}
      style={{ fontFamily: "Carter One, cursive" }}
    >
      n.
    </span>
  );
};


"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

interface VoteButtonProps {
  votes: number;
  userVote?: "up" | "down" | null;
  onVote: (voteType: "up" | "down") => void;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

export function VoteButton({
  votes,
  userVote,
  onVote,
  size = "default",
  variant = "ghost",
  disabled = false,
}: VoteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: "up" | "down") => {
    if (disabled || isLoading) return;
    setIsLoading(true);
    try {
      await onVote(voteType);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={userVote === "up" ? "default" : variant}
        size={size}
        onClick={() => handleVote("up")}
        disabled={disabled || isLoading}
        className="h-8"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <span className="body-small min-w-[2ch] text-center">{votes}</span>
      <Button
        variant={userVote === "down" ? "default" : variant}
        size={size}
        onClick={() => handleVote("down")}
        disabled={disabled || isLoading}
        className="h-8"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}


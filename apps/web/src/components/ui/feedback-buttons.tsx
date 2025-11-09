"use client";

import * as React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { FeedbackForm } from "@/components/ui/feedback-form";
import { cn } from "@/lib/utils";

interface FeedbackButtonsProps {
  messageId: string;
  currentFeedback?: "like" | "dislike" | null;
  onFeedbackChange?: (feedback: "like" | "dislike" | null) => void;
}

export function FeedbackButtons({
  messageId,
  currentFeedback,
  onFeedbackChange,
}: FeedbackButtonsProps) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localFeedback, setLocalFeedback] = React.useState<"like" | "dislike" | null>(
    currentFeedback || null
  );
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);

  React.useEffect(() => {
    setLocalFeedback(currentFeedback || null);
  }, [currentFeedback]);

  const handleLike = async () => {
    // Toggle if already liked
    if (localFeedback === "like") {
      await removeFeedback();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_id: messageId,
          feedback_type: "like",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setLocalFeedback("like");
      onFeedbackChange?.("like");

      addToast({
        title: "Thank you!",
        description: "Your feedback helps make our AI better for everyone.",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      addToast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDislike = () => {
    // If already disliked, remove feedback
    if (localFeedback === "dislike") {
      removeFeedback();
      return;
    }

    // Open feedback form
    setShowFeedbackForm(true);
  };

  const handleFeedbackFormSubmit = async (reason: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_id: messageId,
          feedback_type: "dislike",
          feedback_reason: reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setLocalFeedback("dislike");
      onFeedbackChange?.("dislike");
      setShowFeedbackForm(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      addToast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFeedback = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/feedback/${messageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove feedback");
      }

      setLocalFeedback(null);
      onFeedbackChange?.(null);
    } catch (error) {
      console.error("Error removing feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isSubmitting}
          className={cn(
            "h-8 w-8 p-0",
            localFeedback === "like" &&
              "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          aria-pressed={localFeedback === "like"}
          aria-label="Good response"
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleDislike}
          disabled={isSubmitting}
          className={cn(
            "h-8 w-8 p-0",
            localFeedback === "dislike" &&
              "bg-destructive/10 text-destructive hover:bg-destructive/20"
          )}
          aria-pressed={localFeedback === "dislike"}
          aria-label="Bad response"
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>

      <FeedbackForm
        messageId={messageId}
        open={showFeedbackForm}
        onOpenChange={setShowFeedbackForm}
        onSubmit={handleFeedbackFormSubmit}
      />
    </>
  );
}


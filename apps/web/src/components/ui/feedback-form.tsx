"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FeedbackFormProps {
  messageId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (reason: string) => void;
}

const FEEDBACK_REASONS = [
  "Not factually correct",
  "Didn't follow instructions",
  "Offensive / Unsafe",
  "Wrong language",
  "Other",
];

export function FeedbackForm({
  messageId,
  open,
  onOpenChange,
  onSubmit,
}: FeedbackFormProps) {
  const [selectedReason, setSelectedReason] = React.useState<string>("");
  const [customReason, setCustomReason] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    try {
      const reason = selectedReason === "Other" ? customReason : selectedReason;

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

      onSubmit?.(reason);
      onOpenChange(false);
      setSelectedReason("");
      setCustomReason("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>What went wrong?</DialogTitle>
          <DialogDescription>
            Your feedback helps make our AI better for everyone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {FEEDBACK_REASONS.map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() => setSelectedReason(reason)}
                className={cn(
                  "w-full text-left rounded-md border p-3 transition-colors hover:bg-accent",
                  selectedReason === reason &&
                    "border-primary bg-primary/5"
                )}
              >
                {reason}
              </button>
            ))}
          </div>

          {selectedReason === "Other" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Please specify</label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Tell us what went wrong..."
                className="w-full min-h-[100px] rounded-md border p-3 text-sm"
              />
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Even when Activity is off, feedback submitted will also include up to
            the last 24 hours of your conversation to help improve our AI.
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting || (selectedReason === "Other" && !customReason.trim())}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


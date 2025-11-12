"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FAQFeedbackProps {
  faqId: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

export function FAQFeedback({ faqId, helpfulCount, notHelpfulCount }: FAQFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleFeedback = async (isHelpful: boolean) => {
    if (submitted) return;

    setHelpful(isHelpful);
    setLoading(true);

    try {
      const res = await fetch("/api/faq/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faqId,
          helpful: isHelpful,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve our FAQs.",
      });
    } catch (error) {
      toast({
        title: "Feedback failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !helpful) return;

    setLoading(true);

    try {
      const res = await fetch("/api/faq/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faqId,
          helpful,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }

      setShowDialog(false);
      setComment("");
      toast({
        title: "Comment submitted",
        description: "Thank you for your detailed feedback!",
      });
    } catch (error) {
      toast({
        title: "Comment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 pt-4 border-t-[0.5px] border-border/50">
      <div className="flex items-center gap-2">
        <span className="body-small text-muted-foreground">Was this helpful?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(true)}
          disabled={submitted || loading}
          className={submitted && helpful === true ? "bg-green-100 dark:bg-green-900" : ""}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          {helpfulCount > 0 && <span className="text-xs">{helpfulCount}</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(false)}
          disabled={submitted || loading}
          className={submitted && helpful === false ? "bg-red-100 dark:bg-red-900" : ""}
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          {notHelpfulCount > 0 && <span className="text-xs">{notHelpfulCount}</span>}
        </Button>
      </div>

      {submitted && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Add Comment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tell us more</DialogTitle>
              <DialogDescription>
                Your feedback helps us improve. What could we do better?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <Button onClick={handleCommentSubmit} disabled={loading || !comment.trim()}>
                Submit Comment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


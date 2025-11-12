"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { DocsFeedbackStats } from "@/types/docs";

interface FeedbackWidgetProps {
  pageSlug: string;
}

export function FeedbackWidget({ pageSlug }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [stats, setStats] = useState<DocsFeedbackStats>({
    pageSlug,
    helpfulCount: 0,
    notHelpfulCount: 0,
    totalCount: 0,
  });

  // Fetch initial stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/docs/feedback?slug=${encodeURIComponent(pageSlug)}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        // Silently fail - stats are optional
        console.error("Failed to fetch feedback stats:", error);
      }
    };

    fetchStats();
  }, [pageSlug]);

  const handleFeedback = async (isHelpful: boolean) => {
    if (submitted) return;

    setHelpful(isHelpful);
    setLoading(true);

    try {
      const res = await fetch("/api/docs/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageSlug,
          helpful: isHelpful,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitted(true);
      
      // Update local stats
      setStats((prev) => ({
        ...prev,
        helpfulCount: isHelpful ? prev.helpfulCount + 1 : prev.helpfulCount,
        notHelpfulCount: !isHelpful ? prev.notHelpfulCount + 1 : prev.notHelpfulCount,
        totalCount: prev.totalCount + 1,
      }));

      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve our documentation.",
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
    if (!comment.trim() || helpful === null) return;

    setLoading(true);

    try {
      const res = await fetch("/api/docs/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageSlug,
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
    <div className="flex items-center gap-4 pt-6 mt-8 border-t-[0.5px] border-border/50">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Was this page helpful?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(true)}
          disabled={submitted || loading}
          className={
            submitted && helpful === true
              ? "bg-green-100 dark:bg-green-900"
              : ""
          }
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          {stats.helpfulCount > 0 && (
            <span className="text-xs">{stats.helpfulCount}</span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(false)}
          disabled={submitted || loading}
          className={
            submitted && helpful === false
              ? "bg-red-100 dark:bg-red-900"
              : ""
          }
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          {stats.notHelpfulCount > 0 && (
            <span className="text-xs">{stats.notHelpfulCount}</span>
          )}
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
              <Button
                onClick={handleCommentSubmit}
                disabled={loading || !comment.trim()}
              >
                Submit Comment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


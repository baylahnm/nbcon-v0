"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  MoreVertical,
  Reply,
} from "lucide-react";
import type { ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface PostCardProps {
  post: ForumPost;
  onVote?: (postId: string, voteType: "up" | "down") => void;
  onReply?: (postId: string) => void;
  onMarkBestAnswer?: (postId: string) => void;
  currentUserId?: string;
  showActions?: boolean;
}

export function PostCard({
  post,
  onVote,
  onReply,
  onMarkBestAnswer,
  currentUserId,
  showActions = true,
}: PostCardProps) {
  const authorInitials = post.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const isAuthor = currentUserId === post.authorId;

  return (
    <Card
      className={`${
        post.isBestAnswer
          ? "border-green-500/50 bg-green-500/5"
          : "hover:shadow-sm"
      } transition-shadow`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author?.avatar} />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="body-regular font-medium">
                  {post.author?.name || "Anonymous"}
                </span>
                {post.isBestAnswer && (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Best Answer
                  </Badge>
                )}
                {post.author?.reputation && (
                  <Badge variant="secondary" className="text-xs">
                    {post.author.reputation} rep
                  </Badge>
                )}
              </div>
              <span className="body-small text-muted-foreground">{timeAgo}</span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              {onMarkBestAnswer && !post.isBestAnswer && isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkBestAnswer(post.id)}
                  title="Mark as best answer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-4 pt-4 border-t-[0.5px] border-border/50">
            {/* Vote Buttons */}
            {onVote && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVote(post.id, "up")}
                  className="h-8"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.votes > 0 && <span>{post.votes}</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVote(post.id, "down")}
                  className="h-8"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Reply Button */}
            {onReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(post.id)}
              >
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Eye,
  ThumbsUp,
  Pin,
  Lock,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { ForumThread } from "@/types/forum";
import { formatDistanceToNow } from "date-fns";

interface ThreadCardProps {
  thread: ForumThread;
  showCategory?: boolean;
}

export function ThreadCard({ thread, showCategory = true }: ThreadCardProps) {
  const authorInitials = thread.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const timeAgo = formatDistanceToNow(new Date(thread.lastActivityAt), {
    addSuffix: true,
  });

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        thread.isPinned ? "border-primary/50 bg-primary/5" : ""
      } ${thread.isLocked ? "opacity-75" : ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {thread.isPinned && (
                <Pin className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              {thread.isLocked && (
                <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              {thread.isSolved && (
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              )}
              <CardTitle className="card-title">
                <Link
                  href={`/forum/thread/${thread.id}`}
                  className="hover:underline line-clamp-2"
                >
                  {thread.title}
                </Link>
              </CardTitle>
            </div>

            <div className="flex items-center gap-4 flex-wrap mt-3">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={thread.author?.avatar} />
                  <AvatarFallback className="text-xs">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="body-small text-muted-foreground">
                  {thread.author?.name || "Anonymous"}
                </span>
              </div>

              {/* Replies */}
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{thread.replyCount}</span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{thread.views}</span>
              </div>

              {/* Votes */}
              {thread.votes !== 0 && (
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="body-small">{thread.votes}</span>
                </div>
              )}

              {/* Last Activity */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="body-small text-muted-foreground">{timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          {showCategory && thread.category && (
            <Badge
              variant="outline"
              className="flex-shrink-0"
              style={{
                borderColor: thread.category.color || "#6366f1",
                color: thread.category.color || "#6366f1",
              }}
            >
              {thread.category.name}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Tags */}
      {thread.tags && thread.tags.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {thread.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}20`
                    : undefined,
                  color: tag.color || undefined,
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}


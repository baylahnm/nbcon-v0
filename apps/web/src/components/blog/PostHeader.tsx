"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { format } from "date-fns";

interface PostHeaderProps {
  post: BlogPost;
}

export function PostHeader({ post }: PostHeaderProps) {
  const authorInitials = post.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : format(new Date(post.createdAt), "MMMM d, yyyy");

  return (
    <header className="space-y-6">
      {/* Category Badge */}
      {post.category && (
        <Badge
          variant="outline"
          className="w-fit"
          style={{
            borderColor: post.category.color,
            color: post.category.color,
          }}
        >
          {post.category.name}
        </Badge>
      )}

      {/* Title */}
      <h1 className="section-heading">{post.title}</h1>

      {/* Description */}
      <p className="body-large text-muted-foreground">{post.description}</p>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-muted">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author?.avatarUrl} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="body-medium font-medium text-foreground">
              {post.author?.name || "Author"}
            </div>
            {post.author?.bio && (
              <div className="body-small">{post.author.bio}</div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="body-small">{publishedDate}</span>
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="body-small">{post.readingTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </header>
  );
}


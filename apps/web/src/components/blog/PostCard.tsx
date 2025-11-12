"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { format } from "date-fns";

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const authorInitials = post.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : format(new Date(post.createdAt), "MMMM d, yyyy");

  if (featured) {
    return (
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto bg-muted">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>
          <CardHeader className="space-y-4">
            {post.featured && (
              <Badge variant="outline" className="w-fit">
                Featured
              </Badge>
            )}
            <CardTitle className="subsection-heading">{post.title}</CardTitle>
            <p className="body-large text-muted-foreground line-clamp-3">
              {post.excerpt || post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author?.avatarUrl} />
                  <AvatarFallback className="text-xs">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="body-small">{post.author?.name || "Author"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="body-small">{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="body-small">{post.readingTime} min read</span>
              </div>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-primary hover:underline body-medium"
            >
              Read More
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </CardHeader>
        </div>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative h-48 bg-muted">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {post.category && (
            <Badge
              variant="outline"
              style={{
                borderColor: post.category.color,
                color: post.category.color,
              }}
            >
              {post.category.name}
            </Badge>
          )}
        </div>
        <CardTitle className="card-title line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <p className="body-small text-muted-foreground line-clamp-2 mt-2">
          {post.excerpt || post.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author?.avatarUrl} />
              <AvatarFallback className="text-xs">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <span className="body-small">{post.author?.name || "Author"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="body-small">{post.readingTime} min</span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:underline body-small"
        >
          Read Article
          <ArrowRight className="h-3 w-3 ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
}


"use client";

import { PostCard } from "./PostCard";
import type { BlogPost } from "@/types/blog";

interface FeaturedPostProps {
  post: BlogPost | null;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) {
    return null;
  }

  return (
    <section className="mb-12">
      <PostCard post={post} featured />
    </section>
  );
}


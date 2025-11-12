"use client";

import { ShareButtons } from "./ShareButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

interface PostFooterProps {
  post: BlogPost;
}

export function PostFooter({ post }: PostFooterProps) {
  const postUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/blog/${post.slug}`
    : "";

  return (
    <footer className="space-y-6 pt-8 border-t-[0.5px] border-border/50">
      {/* Share Buttons */}
      <div>
        <h3 className="body-medium font-medium mb-4">Share this article</h3>
        <ShareButtons
          url={postUrl}
          title={post.title}
          description={post.description}
        />
      </div>

      {/* Back to Blog */}
      <div>
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    </footer>
  );
}


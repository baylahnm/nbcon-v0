"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, Globe } from "lucide-react";
import Link from "next/link";
import type { BlogAuthor } from "@/types/blog";

interface AuthorCardProps {
  author: BlogAuthor;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const authorInitials = author.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={author.avatarUrl} />
            <AvatarFallback className="text-lg">{authorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="subsection-heading">{author.name}</CardTitle>
            {author.bio && (
              <p className="body-small text-muted-foreground mt-2">
                {author.bio}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {author.socialLinks?.twitter && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={author.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
          {author.socialLinks?.linkedin && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={author.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {author.socialLinks?.github && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={author.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {author.website && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <Button variant="link" className="mt-4 p-0" asChild>
          <Link href={`/blog/author/${author.id}`}>
            View all posts by {author.name}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


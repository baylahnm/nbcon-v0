"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Github, Code, BookOpen, Users, Calendar } from "lucide-react";
import type { CommunityContributor } from "@/types/community";

interface ContributorCardProps {
  contributor: CommunityContributor;
  rank?: number;
}

const contributionIcons = {
  code: Code,
  docs: BookOpen,
  community: Users,
  events: Calendar,
};

export function ContributorCard({ contributor, rank }: ContributorCardProps) {
  const contributorInitials = contributor.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "C";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contributor.avatar} />
            <AvatarFallback className="text-lg">{contributorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="card-title">{contributor.name}</CardTitle>
              {rank !== undefined && (
                <Badge variant="outline" className="gap-1">
                  <Award className="h-3 w-3" />
                  #{rank}
                </Badge>
              )}
            </div>
            {contributor.bio && (
              <p className="body-small text-muted-foreground line-clamp-2">
                {contributor.bio}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="body-medium font-medium mb-2">Contributions</div>
          <div className="flex flex-wrap gap-2">
            {contributor.contributions.map((contribution) => {
              const Icon = contributionIcons[contribution.type];
              return (
                <Badge key={contribution.type} variant="secondary" className="gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  {contribution.type}: {contribution.count}
                </Badge>
              );
            })}
          </div>
          <div className="mt-2 body-medium">
            Total: {contributor.totalContributions} contributions
          </div>
        </div>
        {contributor.badges && contributor.badges.length > 0 && (
          <div>
            <div className="body-medium font-medium mb-2">Badges</div>
            <div className="flex flex-wrap gap-2">
              {contributor.badges.map((badge) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {contributor.github && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a
              href={`https://github.com/${contributor.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              View GitHub
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}


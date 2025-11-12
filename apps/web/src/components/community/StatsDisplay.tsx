"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { CommunityStats } from "@/types/community";

interface StatsDisplayProps {
  stats: CommunityStats;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="stat-large text-primary mb-2">{stats.totalMembers.toLocaleString()}+</div>
          <div className="stat-label">Community Members</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="stat-large text-primary mb-2">{stats.activeProjects.toLocaleString()}+</div>
          <div className="stat-label">Projects Built</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="stat-large text-primary mb-2">{stats.contributors.toLocaleString()}+</div>
          <div className="stat-label">Contributors</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="stat-large text-primary mb-2">{stats.eventsHosted.toLocaleString()}</div>
          <div className="stat-label">Events Hosted</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="stat-large text-primary mb-2">{stats.resourcesShared.toLocaleString()}+</div>
          <div className="stat-label">Resources Shared</div>
        </CardContent>
      </Card>
      {stats.githubStars && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="stat-large text-primary mb-2">{stats.githubStars.toLocaleString()}</div>
            <div className="stat-label">GitHub Stars</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


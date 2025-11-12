"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Star, FileText, BookOpen, Wrench, Package, FileCode } from "lucide-react";
import type { CommunityResource } from "@/types/community";

interface ResourceCardProps {
  resource: CommunityResource;
}

const resourceIcons = {
  template: FileText,
  guide: BookOpen,
  tool: Wrench,
  "starter-kit": Package,
  docs: FileCode,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = resourceIcons[resource.type] || FileText;

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader className="flex-1">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{resource.type}</Badge>
              {resource.version && (
                <Badge variant="secondary" className="text-xs">
                  v{resource.version}
                </Badge>
              )}
            </div>
            <CardTitle className="card-title line-clamp-2">{resource.name}</CardTitle>
            <p className="body-small text-muted-foreground line-clamp-2 mt-2">
              {resource.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3 text-muted-foreground" />
              <span className="body-small">{resource.downloadCount} downloads</span>
            </div>
            {resource.ratingCount > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="body-small">
                  {resource.rating.toFixed(1)} ({resource.ratingCount})
                </span>
              </div>
            )}
          </div>
          {resource.fileSize && (
            <span className="body-small text-muted-foreground">
              {formatFileSize(resource.fileSize)}
            </span>
          )}
        </div>
        {resource.authorName && (
          <div className="body-small text-muted-foreground">
            By {resource.authorName}
          </div>
        )}
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-2" />
            Download
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Heart, FolderOpen } from "lucide-react";
import type { CommunityProject } from "@/types/community";

interface ProjectCardProps {
  project: CommunityProject;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const authorInitials = project.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  return (
    <Card className={`hover:shadow-lg transition-shadow flex flex-col h-full ${featured ? "border-primary/50 bg-primary/5" : ""}`}>
      <div className="relative h-48 bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        {project.featured && (
          <Badge className="absolute top-2 right-2" variant="default">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="card-title line-clamp-2">{project.name}</CardTitle>
        <p className="body-small text-muted-foreground line-clamp-2 mt-2">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.author && (
              <>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.author.avatar} />
                  <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
                </Avatar>
                <span className="body-small">{project.author.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span className="body-small">{project.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span className="body-small">{project.votes}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            View Project
            <ExternalLink className="h-3 w-3 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}


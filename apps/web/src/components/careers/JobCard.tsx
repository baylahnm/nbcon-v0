"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, CheckCircle, ArrowRight, Eye } from "lucide-react";
import type { JobPosting } from "@/types/careers";
import { format } from "date-fns";

interface JobCardProps {
  job: JobPosting;
  showDescription?: boolean;
}

export function JobCard({ job, showDescription = true }: JobCardProps) {
  const locationText =
    job.location.type === "remote"
      ? "Remote"
      : job.location.type === "hybrid"
      ? `Hybrid${job.location.city ? ` - ${job.location.city}` : ""}`
      : job.location.city || "On-site";

  const postedDate = format(new Date(job.postedDate), "MMM d, yyyy");

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <CardTitle className="subsection-heading">{job.title}</CardTitle>
              <Badge variant="outline">{job.level}</Badge>
              {job.featured && (
                <Badge variant="default" className="bg-primary">Featured</Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{locationText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{job.type.replace("-", " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="body-small">{job.views} views</span>
              </div>
            </div>
            {showDescription && (
              <p className="body-regular text-muted-foreground line-clamp-2">{job.description}</p>
            )}
            <div className="mt-2 body-small text-muted-foreground">Posted {postedDate}</div>
          </div>
          <Button asChild>
            <Link href={`/careers/positions/${job.id}`}>
              Apply Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      {showDescription && job.requirements.mustHave.length > 0 && (
        <CardContent>
          <div>
            <h4 className="card-title mb-2">Key Requirements</h4>
            <ul className="space-y-1">
              {job.requirements.mustHave.slice(0, 3).map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 body-small">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
              {job.requirements.mustHave.length > 3 && (
                <li className="body-small text-muted-foreground">
                  +{job.requirements.mustHave.length - 3} more requirements
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}


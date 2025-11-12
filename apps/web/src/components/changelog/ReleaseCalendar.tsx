"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import type { ChangelogEntry } from "@/types/changelog";

interface ReleaseCalendarProps {
  changelog: ChangelogEntry[];
  className?: string;
}

const typeColors = {
  major: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  minor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  patch: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  hotfix: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

export function ReleaseCalendar({ changelog, className }: ReleaseCalendarProps) {
  // Group releases by year and month
  const groupedReleases = useMemo(() => {
    const groups: Record<string, Record<string, ChangelogEntry[]>> = {};

    changelog.forEach((entry) => {
      const date = new Date(entry.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][month]) {
        groups[year][month] = [];
      }

      groups[year][month].push(entry);
    });

    return groups;
  }, [changelog]);

  const years = Object.keys(groupedReleases).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="subsection-heading flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Release Calendar
        </CardTitle>
        <CardDescription>
          View releases organized by date
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {years.map((year) => {
            const months = Object.keys(groupedReleases[year]).sort((a, b) => {
              const dateA = new Date(a);
              const dateB = new Date(b);
              return dateB.getTime() - dateA.getTime();
            });

            return (
              <div key={year} className="space-y-4">
                <h3 className="subsection-heading text-2xl">{year}</h3>
                {months.map((month) => {
                  const releases = groupedReleases[year][month];

                  return (
                    <div key={month} className="space-y-3">
                      <h4 className="card-title text-lg">{month}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {releases.map((entry) => {
                          const date = new Date(entry.date);
                          const day = date.getDate();

                          return (
                            <Link
                              key={entry.version}
                              href={`/changelog/${entry.version}`}
                              className="block p-3 rounded-lg border-[0.5px] border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-muted-foreground">
                                    {day}
                                  </span>
                                  <div>
                                    <p className="font-medium">v{entry.version}</p>
                                    <Badge
                                      className={`${typeColors[entry.type]} text-xs`}
                                      variant="outline"
                                    >
                                      {entry.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              {entry.highlights.length > 0 && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {entry.highlights[0]}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {years.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No releases found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}


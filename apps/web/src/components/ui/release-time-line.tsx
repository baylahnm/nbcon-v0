"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UsageDashboardPreview } from "@/components/ui/usage-dashboard-preview";
import { ProjectManagementPreview } from "@/components/ui/project-management-preview";
import { DataVisualizationPreview } from "@/components/ui/data-visualization-preview";
import { MonitoringPreview } from "@/components/ui/monitoring-preview";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  component?: React.ReactNode;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

export const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Real-Time Analytics Dashboard",
    subtitle: "Dashboard Component • Featured",
    description:
      "Comprehensive analytics dashboard with real-time data visualization, interactive charts, and customizable widgets for monitoring key metrics.",
    items: [
      "Live data updates with WebSocket integration",
      "Interactive charts powered by Recharts",
      "Customizable widget layouts and drag-and-drop",
      "Export reports in PDF, CSV, and Excel formats",
      "Multi-tenant data isolation and security",
    ],
    component: <UsageDashboardPreview />,
    button: {
      url: "/templates",
      text: "View Dashboard",
    },
  },
  {
    icon: Sparkles,
    title: "Project Management Interface",
    subtitle: "Dashboard Component • Featured",
    description:
      "Streamlined project management dashboard with Kanban boards, task tracking, team collaboration, and progress monitoring.",
    items: [
      "Kanban board with drag-and-drop task management",
      "Real-time team collaboration and notifications",
      "Advanced filtering and search capabilities",
      "Integration with Git, Slack, and Jira",
    ],
    component: <ProjectManagementPreview />,
  },
  {
    icon: Zap,
    title: "Data Visualization Hub",
    subtitle: "Dashboard Component • Featured",
    description:
      "Powerful data visualization dashboard with advanced charting, filtering, and export capabilities for complex data analysis.",
    items: [
      "Multiple chart types: line, bar, pie, area, and scatter",
      "Advanced filtering and date range selection",
      "Export data to multiple formats",
      "Customizable color themes and branding",
    ],
    component: <DataVisualizationPreview />,
  },
  {
    icon: Calendar,
    title: "Monitoring & Operations Center",
    subtitle: "Dashboard Component • Featured",
    description:
      "Enterprise-grade monitoring dashboard for system health, performance metrics, alert management, and operational insights.",
    items: [
      "Real-time system health monitoring",
      "Performance metrics and alerting",
      "Incident management and resolution tracking",
      "Customizable dashboard layouts",
    ],
    component: <MonitoringPreview />,
    button: {
      url: "/pricing",
      text: "Explore Dashboards",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "Dashboard Showcase",
  description = "Explore our collection of powerful dashboard components designed for modern engineering workflows. From analytics to project management, see how nbcon.ai can transform your operations.",
  entries = defaultEntries,
  className,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create stable setters for refs inside map
  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    // We observe small sentinels placed near the title of each card. Whichever
    // sentinel is closest to the vertical center of the viewport becomes active.
    // Using IntersectionObserver to track visibility + a rAF loop to pick the closest.

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      // Compute distance of each sentinel to viewport center
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  // Optional: ensure the first card is active on mount
  useEffect(() => {
    // Use setTimeout to avoid setState in effect warning
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Calculate container height for scroll effect (similar to testimonials)
  const scrollContainerHeight = entries.length > 0 
    ? `${300 + entries.length * 400}px` 
    : "auto";

  return (
    <section className={cn("pt-20 md:pt-28 pb-40 md:pb-48 bg-background", className)}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-4 sm:px-6 lg:px-8">
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-chat-input dark:bg-chat-input px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Dashboard Components</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Right Column: Scrollable Timeline Cards */}
        <div className="relative flex flex-col gap-4" style={{ height: scrollContainerHeight }}>
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative"
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >
                {/* Invisible sentinel near the card title to measure proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Timeline Card */}
                <article
                  className={cn(
                    "sticky w-full flex flex-col rounded-2xl border p-6 transition-all duration-300 shadow-lg",
                    isActive
                      ? "border-border bg-card shadow-lg"
                      : "border-border bg-card"
                  )}
                  style={{ top: `${20 + index * 24}px` }}
                >
                  {entry.component ? (
                    <div className="mb-4 w-full h-72 rounded-lg overflow-hidden bg-background">
                      {entry.component}
                    </div>
                  ) : entry.image ? (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-4 w-full h-72 rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="space-y-4">
                    {/* Header with icon and title */}
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", {
                        "bg-primary text-primary-foreground": isActive,
                        "bg-muted text-muted-foreground": !isActive,
                      })}>
                        <entry.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <h2
                          className={cn(
                            "text-lg font-medium leading-tight tracking-tight md:text-xl transition-colors duration-200",
                            isActive ? "text-foreground" : "text-foreground/70"
                          )}
                        >
                          {entry.title}
                        </h2>
                        <span className="text-xs text-muted-foreground">
                          {entry.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-sm leading-relaxed md:text-base transition-all duration-300",
                        isActive
                          ? "text-muted-foreground line-clamp-none"
                          : "text-muted-foreground/80 line-clamp-2"
                      )}
                    >
                      {entry.description}
                    </p>

                    {/* Enhanced expandable content */}
                    <div
                      aria-hidden={!isActive}
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-lg border border-border bg-muted/50 p-4">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                className="group hover:bg-primary hover:text-primary-foreground font-normal transition-all duration-200"
                                asChild
                              >
                                <Link href={entry.button.url}>
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


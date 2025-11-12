"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Code, Activity, MessageCircle, Users } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const resources: Resource[] = [
  {
    title: "Knowledge Base",
    description: "Comprehensive documentation and guides",
    href: "/docs",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Community Forum",
    description: "Connect with other users and get help",
    href: "/forum",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: "Community",
    description: "Join our community and contribute",
    href: "/community",
    icon: <Users className="h-5 w-5" />,
  },
  // TODO: Add these when available
  // {
  //   title: "Video Tutorials",
  //   description: "Step-by-step video guides",
  //   href: "/tutorials",
  //   icon: <Video className="h-5 w-5" />,
  // },
  // {
  //   title: "API Documentation",
  //   description: "Complete API reference",
  //   href: "/api-docs",
  //   icon: <Code className="h-5 w-5" />,
  // },
  // {
  //   title: "Status Page",
  //   description: "Check system status and uptime",
  //   href: "/status",
  //   icon: <Activity className="h-5 w-5" />,
  // },
];

export function SelfServiceResources() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Self-Service Resources</h2>
      <p className="text-muted-foreground">
        Find answers and solutions without waiting for support
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Link key={index} href={resource.href}>
            <Card className="border-[0.5px] border-border/50 bg-surface hover:bg-accent/50 transition-colors h-full">
              <CardContent className="p-6 flex flex-col space-y-3">
                <div className="text-primary">{resource.icon}</div>
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}


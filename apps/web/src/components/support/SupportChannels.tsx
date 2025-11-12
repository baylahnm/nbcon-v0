"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Building2, Phone } from "lucide-react";
import { usePortalAccess } from "@/hooks/usePortalAccess";

interface SupportChannel {
  id: string;
  name: string;
  description: string;
  contact: string;
  responseTime: string;
  hours: string;
  icon: React.ReactNode;
  available: boolean;
  requiresAuth?: boolean;
  href?: string;
}

export function SupportChannels() {
  const { tier } = usePortalAccess();

  const channels: SupportChannel[] = [
    {
      id: "email",
      name: "Email Support",
      description: "General inquiries, account questions",
      contact: "support@nbcon.ai",
      responseTime: "Within 24 hours",
      hours: "Mon-Fri, 9 AM - 6 PM GMT",
      icon: <Mail className="h-5 w-5" />,
      available: true,
    },
    {
      id: "live-chat",
      name: "Live Chat",
      description: "Quick questions and instant help",
      contact: "Available",
      responseTime: "Immediate",
      hours: "Mon-Fri, 9 AM - 6 PM GMT",
      icon: <MessageSquare className="h-5 w-5" />,
      available: false, // TODO: Implement live chat
    },
    {
      id: "enterprise",
      name: "Enterprise Support",
      description: "Dedicated support for enterprise customers",
      contact: "Contact us",
      responseTime: "1-4 hours (SLA)",
      hours: "24/7",
      icon: <Building2 className="h-5 w-5" />,
      available: true,
      href: "/enterprise",
    },
    {
      id: "emergency",
      name: "Emergency Support",
      description: "Critical issues requiring immediate attention",
      contact: tier === "enterprise" ? "+1 (555) 123-4567" : "Enterprise only",
      responseTime: "1 hour SLA",
      hours: "24/7",
      icon: <Phone className="h-5 w-5" />,
      available: tier === "enterprise",
      requiresAuth: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Support Channels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((channel) => {
          if (channel.requiresAuth && !channel.available) {
            return null;
          }

          const content = (
            <Card className="border-[0.5px] border-border/50 bg-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{channel.icon}</div>
                    <CardTitle className="text-lg">{channel.name}</CardTitle>
                  </div>
                  {channel.available ? (
                    <Badge variant="default" className="bg-green-500">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                </div>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Contact: </span>
                  <span className="text-muted-foreground">{channel.contact}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Response Time: </span>
                  <span className="text-muted-foreground">{channel.responseTime}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Hours: </span>
                  <span className="text-muted-foreground">{channel.hours}</span>
                </div>
              </CardContent>
            </Card>
          );

          if (channel.href) {
            return (
              <Link key={channel.id} href={channel.href}>
                {content}
              </Link>
            );
          }

          return <div key={channel.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}


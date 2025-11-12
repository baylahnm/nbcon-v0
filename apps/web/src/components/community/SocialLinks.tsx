"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Users, Twitter, Linkedin, Youtube, MessageSquare } from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  count?: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
}

const defaultLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/nbcon-ai",
    count: "2.5k stars",
  },
  {
    name: "Discord",
    icon: MessageSquare,
    url: "#",
    count: "500+ members",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "#",
    count: "1.2k followers",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#",
    count: "800+ followers",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "#",
    count: "300+ subscribers",
  },
];

export function SocialLinks({ links = defaultLinks }: SocialLinksProps) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
      {links.map((social) => {
        const Icon = social.icon;
        return (
          <Card key={social.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="card-title">{social.name}</CardTitle>
                  {social.count && (
                    <CardDescription className="body-small">{social.count}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm" asChild>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  Join {social.name}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


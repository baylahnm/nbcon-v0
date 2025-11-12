"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, MessageCircle, Search } from "lucide-react";

interface QuickHelpCard {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
}

const cards: QuickHelpCard[] = [
  {
    title: "Browse Documentation",
    description: "Comprehensive guides and tutorials",
    href: "/docs",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions",
    href: "/faq",
    icon: <HelpCircle className="h-6 w-6" />,
  },
  {
    title: "Community Forum",
    description: "Ask questions and get help from the community",
    href: "/forum",
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    title: "Search Knowledge Base",
    description: "Search across docs, FAQ, and forum",
    onClick: () => {
      // TODO: Implement search modal
      console.log("Open search modal");
    },
    icon: <Search className="h-6 w-6" />,
  },
];

export function QuickHelpCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const content = (
          <Card className="border-[0.5px] border-border/50 bg-surface hover:bg-accent/50 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="text-primary">{card.icon}</div>
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );

        if (card.href) {
          return (
            <Link key={index} href={card.href}>
              {content}
            </Link>
          );
        }

        return (
          <button key={index} onClick={card.onClick} className="text-left">
            {content}
          </button>
        );
      })}
    </div>
  );
}


"use client";

import * as React from "react";
import { PromptBox } from "@/components/ui/chatgpt-prompt-input";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import {
  FileText,
  BarChart3,
  Search,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

export function GeminiMainArea() {
  const { profile, isLoading } = useUserProfile();
  const [inputValue, setInputValue] = React.useState("");

  const displayName = profile?.full_name || profile?.username || profile?.email?.split("@")[0] || "there";

  const quickActions: QuickAction[] = [
    {
      id: "create-job",
      label: "Create Job",
      icon: FileText,
      onClick: () => {
        // Handle create job
        console.log("Create job clicked");
      },
    },
    {
      id: "write",
      label: "Write",
      icon: FileText,
      onClick: () => {
        setInputValue("Help me write ");
      },
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: BarChart3,
      onClick: () => {
        setInputValue("Analyze ");
      },
    },
    {
      id: "survey",
      label: "Survey",
      icon: Search,
      onClick: () => {
        setInputValue("Research ");
      },
    },
    {
      id: "learn",
      label: "Learn",
      icon: BookOpen,
      onClick: () => {
        setInputValue("Explain ");
      },
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Handle message submission
      console.log("Submitting:", inputValue);
      // In the future, this will send to AI and create a job/conversation
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Greeting */}
        <div className="text-center space-y-2">
          {isLoading ? (
            <div className="h-8 w-64 bg-muted rounded animate-pulse mx-auto" />
          ) : (
            <h1 className="text-4xl md:text-5xl font-light text-foreground">
              Hello, {displayName}
            </h1>
          )}
          <p className="text-lg text-muted-foreground">
            How can I help you today?
          </p>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <PromptBox
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="h-9 rounded-full border-border hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


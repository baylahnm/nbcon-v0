"use client";

import { FeatureShowcase, type TabMedia } from "@/components/ui/feature-showcase";
import { UsageDashboardPreview } from "@/components/ui/usage-dashboard-preview";
import { AICoPilotPreview } from "@/components/ui/ai-copilot-preview";
import { FieldToReportPreview } from "@/components/ui/field-to-report-preview";
import { MultiAgentTeamPreview } from "@/components/ui/multi-agent-team-preview";

export function FeaturesShowcase() {
  const tabs: TabMedia[] = [
    {
      value: "project-chat",
      label: "Dashboard",
      alt: "Usage Dashboard",
      component: <UsageDashboardPreview />,
    },
    {
      value: "ai-copilot",
      label: "AI Co-Pilot",
      alt: "AI Co-Pilot dashboard",
      component: <AICoPilotPreview />,
    },
    {
      value: "field-report",
      label: "Field-to-Report",
      alt: "Field-to-Report workflow",
      component: <FieldToReportPreview />,
    },
    {
      value: "multi-agent",
      label: "Multi-Agent Team",
      alt: "Multi-Agent Team orchestration",
      component: <MultiAgentTeamPreview />,
    },
  ];

  return (
    <FeatureShowcase
      eyebrow="Features"
      title="Powerful Features for Modern Engineering"
      description="Everything you need to streamline your workflow and boost productivity. Transform how you work with AI-driven tools designed for engineering excellence."
      stats={["4 Core Features", "Instant Setup", "Production-Ready"]}
      steps={[
        {
          id: "step-1",
          title: "Dashboard & Analytics",
          text:
            "Track your usage, monitor AI credits, and view productivity metrics in real-time. Get insights into your projects, conversations, and team performance.",
        },
        {
          id: "step-2",
          title: "AI Co-Pilot",
          text:
            "Your intelligent assistant that understands engineering workflows. Get real-time suggestions and automate repetitive tasks with context-aware AI.",
        },
        {
          id: "step-3",
          title: "Field-to-Report",
          text:
            "Seamless workflow from field data collection to final report generation. Connect your entire project lifecycle in one unified platform.",
        },
        {
          id: "step-4",
          title: "Multi-Agent Team",
          text:
            "Orchestrate multiple AI agents working together on complex projects. Each agent specializes in different aspects of your engineering work.",
        },
      ]}
      tabs={tabs}
      defaultTab="project-chat"
      panelMinHeight={800}
    />
  );
}


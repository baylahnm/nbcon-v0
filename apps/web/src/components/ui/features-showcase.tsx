"use client";

import { FeatureShowcase, type TabMedia } from "@/components/ui/feature-showcase";

export function FeaturesShowcase() {
  const tabs: TabMedia[] = [
    {
      value: "project-chat",
      label: "Project as Chat",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      alt: "Project as Chat interface",
    },
    {
      value: "ai-copilot",
      label: "AI Co-Pilot",
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      alt: "AI Co-Pilot dashboard",
    },
    {
      value: "field-report",
      label: "Field-to-Report",
      src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop",
      alt: "Field-to-Report workflow",
    },
    {
      value: "multi-agent",
      label: "Multi-Agent Team",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      alt: "Multi-Agent Team orchestration",
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
          title: "Project as Chat",
          text:
            "Transform your project workflow into natural conversations. Build, iterate, and collaborate through intuitive chat interfaces that understand engineering context.",
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
      panelMinHeight={600}
    />
  );
}


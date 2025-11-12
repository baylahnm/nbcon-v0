"use client";

import * as React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type TabMedia = {
  value: string; // unique value for Tabs
  label: string; // button label
  src?: string;   // image url (optional if component is provided)
  alt?: string;
  component?: React.ReactNode; // React component (optional if src is provided)
};

export type ShowcaseStep = {
  id: string;
  title: string;
  text: string;
};

export type FeatureShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** small chips under the description */
  stats?: string[];
  /** accordion steps on the left */
  steps?: ShowcaseStep[];
  /** right-side tabs (image per tab) */
  tabs: TabMedia[];
  /** which tab is active initially */
  defaultTab?: string;
  /** fixed panel height in px (also applied as min-height) */
  panelMinHeight?: number;
  className?: string;
};

export function FeatureShowcase({
  eyebrow = "Discover",
  title,
  description,
  stats = ["1 reference", "30s setup", "Share‑ready"],
  steps = [
    {
      id: "step-1",
      title: "Drop a reference",
      text:
        "Upload a single image. We read it like a brief and extract palette, texture and cues.",
    },
    {
      id: "step-2",
      title: "Pick the vibe",
      text:
        "Switch between mockup, screen, or abstract views and tune the mood instantly.",
    },
    {
      id: "step-3",
      title: "Export & share",
      text:
        "Get a moodboard ready for your team with consistent visuals and notes.",
    },
  ],
  tabs,
  defaultTab,
  panelMinHeight = 720,
  className,
}: FeatureShowcaseProps) {
  const initial = defaultTab ?? (tabs[0]?.value ?? "tab-0");
  const [activeTab, setActiveTab] = React.useState(initial);
  const [hoveredStep, setHoveredStep] = React.useState<string | null>(null);
  const [openStep, setOpenStep] = React.useState<string | null>(null);

  // Map step IDs to tab values
  const stepToTabMap: Record<string, string> = {
    "step-1": tabs[0]?.value ?? "tab-0",
    "step-2": tabs[1]?.value ?? "tab-1",
    "step-3": tabs[2]?.value ?? "tab-2",
    "step-4": tabs[3]?.value ?? "tab-3",
  };

  return (
    <section className={cn("w-full bg-background text-foreground", className)}>
      <div className="container mx-auto grid grid-cols-1 gap-10 px-8 py-16 md:grid-cols-12 md:py-20 lg:gap-14">
        {/* Left column */}
        <div className="md:col-span-6">
          <Badge variant="outline" className="mb-6">
            {eyebrow}
          </Badge>

          <h2 className="text-balance text-[40px] font-bold leading-[0.95]">
            {title}
          </h2>

          {description ? (
            <p className="mt-6 max-w-xl text-muted-foreground">{description}</p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-muted text-foreground"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-10 max-w-xl">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              value={hoveredStep || openStep || undefined}
              onValueChange={(value) => {
                setOpenStep(value || null);
                const tabValue = stepToTabMap[value || ""];
                if (tabValue) setActiveTab(tabValue);
              }}
            >
              {steps.map((step, index) => {
                const tabValue = stepToTabMap[step.id];
                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => {
                      setHoveredStep(step.id);
                      if (tabValue) setActiveTab(tabValue);
                    }}
                    onMouseLeave={() => {
                      setHoveredStep(null);
                    }}
                  >
                    <AccordionItem value={step.id}>
                      <AccordionTrigger 
                        className="text-left text-base font-medium"
                        onClick={() => {
                          setOpenStep(openStep === step.id ? null : step.id);
                          const tabValue = stepToTabMap[step.id];
                          if (tabValue) setActiveTab(tabValue);
                        }}
                      >
                        {step.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {step.text}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#start">Get started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border border-border bg-chat-input dark:bg-chat-input hover:bg-chat-input/80"
              >
                <Link href="#examples">Browse examples</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="relative w-full">
            {/* Tab controls outside the card */}
            <div className="flex w-full justify-center mb-4">
              <TabsList className="flex gap-2 rounded-xl border border-border bg-muted/80 p-1 backdrop-blur supports-[backdrop-filter]:bg-muted/70">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="rounded-lg px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <Card
              className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-0 shadow-sm"
              style={{ 
                height: tabs.some(t => t.component) ? '700px' : panelMinHeight, 
                minHeight: tabs.some(t => t.component) ? '700px' : panelMinHeight 
              }}
            >
              {/* Absolute-fill media container */}
              <div className="relative h-full w-full">
                {tabs.map((t, idx) => (
                  <TabsContent
                    key={t.value}
                    value={t.value}
                    className={cn(
                      t.component ? "relative m-0 w-full h-full overflow-auto" : "absolute inset-0 m-0 h-full w-full",
                      "data-[state=inactive]:hidden"
                    )}
                    style={t.component ? {} : { height: '100%', minHeight: '100%' }}
                  >
                    {t.component ? (
                      <div className="w-full h-full bg-background flex items-start justify-start p-4">
                        <div className="w-full">
                          {t.component}
                        </div>
                      </div>
                    ) : t.src ? (
                      <img
                        src={t.src}
                        alt={t.alt ?? t.label}
                        className="h-full w-full object-cover"
                        style={{ height: '100%', minHeight: '100%' }}
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    ) : null}
                  </TabsContent>
                ))}
              </div>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  );
}


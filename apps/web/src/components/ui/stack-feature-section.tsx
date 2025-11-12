"use client";

import React, { forwardRef, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { NbLogo } from "@/components/ui/n-logo";

// Dynamic imports to avoid SSR issues with ESM-only @lobehub/icons
const Claude = dynamic(() => import("@lobehub/icons/es/Claude"), { ssr: false });
const OpenAI = dynamic(() => import("@lobehub/icons/es/OpenAI"), { ssr: false });
const Gemini = dynamic(() => import("@lobehub/icons/es/Gemini"), { ssr: false });
const DeepSeek = dynamic(() => import("@lobehub/icons/es/DeepSeek"), { ssr: false });
const Perplexity = dynamic(() => import("@lobehub/icons/es/Perplexity"), { ssr: false });
const Grok = dynamic(() => import("@lobehub/icons/es/Grok"), { ssr: false });

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-card border-border shadow-lg p-3",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// 6 Top AI/LLM Icons for Engineering Workforce Management
// Selected based on relevance: Code assistance, Research, Productivity, Communication
// Using @lobehub/icons for official AI brand logos
const Icons = {
  // Row 1: Top AI assistants - Claude & OpenAI
  claude: () => <Claude size={24} />,
  openai: () => <OpenAI size={24} />,
  
  // Row 2: Gemini, nbcon.ai (center), DeepSeek
  gemini: () => <Gemini size={24} />,
  nbcon: () => <NbLogo className="w-10 h-10" />,
  deepseek: () => <DeepSeek size={24} />,
  
  // Row 3: Perplexity & Grok
  perplexity: () => <Perplexity size={24} />,
  grok: () => <Grok size={24} />,
};

interface StackFeatureSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  className?: string;
}

export default function StackFeatureSection({
  subtitle = "",
  title = "Supercharge your workflow",
  description = "Build sleek, responsive interfaces in record time with our carefully crafted React and Tailwind CSS components.",
  buttonText = "Get Started",
  buttonLink = "/signup",
  secondaryButtonText,
  className,
}: StackFeatureSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className={cn("relative max-w-7xl mx-auto my-32 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[30rem] border-0 bg-background overflow-hidden rounded-3xl", className)}>
      {/* Left side: Heading and Text */}
      <div className="w-full md:w-1/2 z-10 py-16 md:py-0">
        {subtitle && (
          <span className="mb-2 text-sm font-medium uppercase tracking-widest text-primary block">
            {subtitle}
          </span>
        )}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg">
          {description}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <Button size="lg" asChild>
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
          {secondaryButtonText && (
            <Button variant="outline" size="lg" asChild className="border border-border bg-chat-input dark:bg-chat-input hover:bg-chat-input/80">
              <Link href="/docs">{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Right side: Animated Beam */}
      <div
        className="relative flex h-[500px] w-full md:w-1/2 items-center justify-center overflow-hidden rounded-lg p-10"
        ref={containerRef}
      >
        <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
          {/* Row 1: Claude & OpenAI */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <Icons.claude />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.openai />
            </Circle>
          </div>
          {/* Row 2: Gemini, nbcon.ai (center), DeepSeek */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <Icons.gemini />
            </Circle>
            <Circle ref={div4Ref} className="size-16">
              <Icons.nbcon />
            </Circle>
            <Circle ref={div6Ref}>
              <Icons.deepseek />
            </Circle>
          </div>
          {/* Row 3: Perplexity & Grok */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <Icons.perplexity />
            </Circle>
            <Circle ref={div7Ref}>
              <Icons.grok />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
        />
      </div>
    </section>
  );
}

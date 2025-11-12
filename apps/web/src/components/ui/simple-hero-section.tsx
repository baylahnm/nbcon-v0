"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimpleHeroSectionProps {
  headline: string;
  description: string;
  cta?: {
    primary: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
  };
  backgroundVariant?: "minimal" | "gradient" | "none";
  className?: string;
}

export function SimpleHeroSection({
  headline,
  description,
  cta,
  backgroundVariant = "minimal",
  className,
}: SimpleHeroSectionProps) {
  const backgroundClasses = {
    minimal: "bg-gradient-to-b from-background via-muted/30 to-background",
    gradient: "bg-gradient-to-b from-primary/5 via-background to-background",
    none: "",
  };

  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex items-center justify-center",
        className
      )}
    >
      {/* Background */}
      {backgroundVariant !== "none" && (
        <div className={cn("absolute inset-0", backgroundClasses[backgroundVariant])} />
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="hero-headline">
            {headline}
          </h1>
          <p className="hero-description">
            {description}
          </p>
          {cta && (
            <div className="flex justify-center gap-4 flex-wrap pt-2">
              {cta.primary.onClick ? (
                <Button size="lg" onClick={cta.primary.onClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {cta.primary.text}
                </Button>
              ) : cta.primary.href ? (
                <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={cta.primary.href}>{cta.primary.text}</Link>
                </Button>
              ) : null}
              {cta.secondary && (
                cta.secondary.onClick ? (
                  <Button size="lg" variant="outline" onClick={cta.secondary.onClick}>
                    {cta.secondary.text}
                  </Button>
                ) : cta.secondary.href ? (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
                  </Button>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


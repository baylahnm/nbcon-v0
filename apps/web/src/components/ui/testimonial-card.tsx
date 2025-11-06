"use client";

import * as React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { NbconLogo } from "@/components/ui/nbcon-logo";

// --- Type Definitions for props ---
export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote?: string;
  avatarSrc: string;
  rating: number;
  companyLogo?: string;
  certification?: string;
  caseStudyLink?: string;
}

export interface ClientsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  testimonials: Testimonial[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
  enableNavigation?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

// --- Internal Sub-Components ---
// StatCard using shadcn variables
const StatCard = ({ value, label }: Stat) => (
  <Card className="bg-muted/50 border-border text-center rounded-xl">
    <CardContent className="p-4">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

// A testimonial card component (reusable for both sticky and carousel views)
const TestimonialCard = ({ testimonial, className }: { testimonial: Testimonial; className?: string }) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl shadow-lg flex flex-col h-auto w-full",
      "bg-card border border-border",
      className
    )}>
      {/* Top section: Image and Author */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
          aria-label={`Photo of ${testimonial.name}`}
        />
        <div className="flex-grow">
          <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          {/* Company Logo */}
          {testimonial.companyLogo && (
            <div className="mt-2">
              <img
                src={testimonial.companyLogo}
                alt={`${testimonial.title} logo`}
                className="h-6 max-w-[120px] object-contain opacity-70"
              />
            </div>
          )}
        </div>
      </div>

      {/* Middle section: Rating */}
      <div className="flex items-center gap-2 my-4">
        <span className="font-bold text-base text-foreground">{testimonial.rating.toFixed(1)}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(testimonial.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        {/* Certification Badge */}
        {testimonial.certification && (
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {testimonial.certification}
            </span>
          </div>
        )}
      </div>

      {/* Bottom section: Quote */}
      {testimonial.quote && (
        <p className="text-base text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
      )}

      {/* Case Study Link */}
      {testimonial.caseStudyLink && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={testimonial.caseStudyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline font-medium"
          >
            View Case Study →
          </a>
        </div>
      )}
    </div>
  );
};

// A sticky testimonial card for the stacking effect.
const StickyTestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      className="sticky w-full"
      style={{ top: `${20 + index * 24}px` }} // Staggered top position for stacking
    >
      <TestimonialCard testimonial={testimonial} />
    </motion.div>
  );
};

// --- Main Exported Component ---
export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  className,
  enableNavigation = true,
  autoScroll = false,
  autoScrollInterval = 5000,
}: ClientsSectionProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const autoScrollRef = React.useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Calculate a height for the scroll container to ensure all cards can stack
  const scrollContainerHeight = `calc(100vh + ${testimonials.length * 100}px)`;

  // Navigation functions
  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToIndex = React.useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    if (!enableNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableNavigation, goToNext, goToPrevious]);

  // Auto-scroll
  React.useEffect(() => {
    if (!autoScroll || !enableNavigation) return;

    autoScrollRef.current = setInterval(() => {
      goToNext();
    }, autoScrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScroll, enableNavigation, autoScrollInterval, goToNext]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section className={cn("w-full bg-background text-foreground py-20 md:py-28", className)}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-4 sm:px-6 lg:px-8">
        
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{tagLabel}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {title.includes("NBCON PRO") ? (
              <span className="flex items-center gap-3">
                <span className="text-[40px]">Clients Love</span>
                <NbconLogo className="h-10 md:h-12" asLink={false} />
              </span>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Button variant="outline" size="lg" className="flex-[0.3]">{secondaryActionLabel}</Button>
            <Button size="lg" className="flex-[0.7]">{primaryActionLabel}</Button>
          </div>
        </div>

        {/* Right Column: Testimonials with Navigation */}
        <div className="relative">
          {/* Desktop: Sticky scroll stack (always visible on desktop) */}
          <div 
            className="relative flex flex-col gap-4 hidden lg:flex"
            style={{ height: scrollContainerHeight }}
          >
            {testimonials.map((testimonial, index) => (
              <StickyTestimonialCard
                key={testimonial.name}
                index={index}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Mobile/Carousel: Navigation-enabled view (shown when enableNavigation is true) */}
          {enableNavigation ? (
            <div 
              className="relative w-full lg:hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TestimonialCard testimonial={testimonials[currentIndex]} />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                    "p-2 rounded-full bg-background/80 backdrop-blur-sm",
                    "border border-border shadow-lg",
                    "hover:bg-background transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  )}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={goToNext}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                    "p-2 rounded-full bg-background/80 backdrop-blur-sm",
                    "border border-border shadow-lg",
                    "hover:bg-background transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  )}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Mobile: Sticky scroll stack (when navigation is disabled)
            <div 
              className="relative flex flex-col gap-4 lg:hidden"
              style={{ height: scrollContainerHeight }}
            >
              {testimonials.map((testimonial, index) => (
                <StickyTestimonialCard
                  key={testimonial.name}
                  index={index}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


"use client";

import { PromptBox } from "@/components/ui/chatgpt-prompt-input";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
          Hire SCE-verified engineers in minutes.
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          nbcon.ai connects certified professionals and AI tools to accelerate engineering projects across Saudi Arabia.
        </p>
        <div className="max-w-2xl mx-auto">
          <PromptBox />
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          By using nbcon.ai AI Assistant, you agree to our Terms & AI Policy.
        </p>
      </div>
    </section>
  );
}


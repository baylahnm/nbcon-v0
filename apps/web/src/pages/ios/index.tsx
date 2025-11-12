import React from "react";
import Head from "next/head";
import Link from "next/link";
import { LayoutDashboard, Bot, FileText, Users, Mic, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";

export default function IOSPage() {
  return (
    <>
      <Head>
        <title>iOS App | nbcon.ai</title>
      </Head>
      <SimpleHeroSection
        headline="Anything. Anyone. Anywhere."
        description="Access your Survey and GIS projects anywhere. Sync, collect, and analyze data on the go."
        cta={{
          primary: {
            text: "Download on App Store",
            href: "#",
          },
          secondary: {
            text: "Learn More",
            href: "#",
          },
        }}
        backgroundVariant="minimal"
        className="mb-12"
      />
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">

        {/* iPhone Mockup */}
        <div className="relative mb-12">
          <div className="w-[320px] h-[640px] mx-auto bg-surface rounded-[3rem] p-2 shadow-2xl border-4 border-border dark:border-border-elevated">
            {/* iPhone Screen */}
            <div className="w-full h-full bg-surface rounded-[2.5rem] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-3 pb-2">
                <span className="text-xs font-semibold text-foreground">0.0.0</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-foreground rounded-sm"></div>
                  <div className="w-4 h-2 border border-foreground rounded-sm"></div>
                  <div className="w-6 h-3 border border-foreground rounded-sm"></div>
                </div>
              </div>

              {/* App Header */}
              <div className="flex justify-between items-center px-6 py-2">
                <div className="w-6 h-6 flex flex-col gap-1 justify-center">
                  <div className="w-5 h-0.5 bg-foreground"></div>
                  <div className="w-5 h-0.5 bg-foreground"></div>
                  <div className="w-5 h-0.5 bg-foreground"></div>
                </div>
                <div className="w-6 h-6 border border-foreground rounded"></div>
              </div>

              {/* App Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
                {/* Logo */}
                <div className="mb-8">
                  <h2 className="hero-headline text-foreground" style={{ fontFamily: "Carter One, cursive" }}>
                    n.
                  </h2>
                </div>

                {/* Feature Icons */}
                <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-[240px]">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border dark:border-border-elevated">
                    <LayoutDashboard className="w-8 h-8 text-foreground" />
                    <span className="text-xs text-foreground text-center">Dashboard</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border dark:border-border-elevated">
                    <Bot className="w-8 h-8 text-foreground" />
                    <span className="text-xs text-foreground text-center">AI Co-Pilot</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border dark:border-border-elevated">
                    <FileText className="w-8 h-8 text-foreground" />
                    <span className="text-xs text-foreground text-center">Field-to-Report</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border dark:border-border-elevated">
                    <Users className="w-8 h-8 text-foreground" />
                    <span className="text-xs text-foreground text-center">Multi-Agent Team</span>
                  </div>
                </div>

                {/* Input Field */}
                <div className="w-full max-w-[240px] mb-6">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border dark:border-border-elevated bg-surface-elevated">
                    <span className="text-sm text-muted-foreground flex-1">Ask nbcon to build</span>
                    <Mic className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* App Store Button */}
                <div className="w-full max-w-[240px]">
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 py-3">
                    <Apple className="w-5 h-5" />
                    <span className="text-sm font-medium">Download on the App Store</span>
                  </Button>
                </div>

                {/* Keyboard Placeholder */}
                <div className="mt-auto pt-4 w-full">
                  <div className="h-32 bg-surface-elevated rounded-lg border border-border dark:border-border-elevated flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">QWERTYUIOP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

"use client";

import * as React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { DashboardSidebar } from "./DashboardSidebar";
import { GeminiMainArea } from "./GeminiMainArea";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col h-screen bg-background dark:bg-surface-elevated">
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="ml-auto">
            <ToggleTheme />
          </div>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden bg-background dark:bg-surface-elevated">
          {children || <GeminiMainArea />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


"use client";

import * as React from "react";
import { useRouter } from "next/router";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { Tabs } from "@/components/ui/tabs";
import { SettingsSidebar } from "./SettingsSidebar";
import { SettingsContent } from "./SettingsContent";

export function SettingsLayout() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("General");

  // Sync with URL query parameter
  React.useEffect(() => {
    const tab = router.query.tab as string;
    if (tab) {
      setActiveTab(tab);
    }
  }, [router.query.tab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/settings?tab=${value}`, undefined, { shallow: true });
  };

  return (
    <SidebarProvider>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        orientation="vertical"
        className="flex h-screen w-full"
      >
        <SettingsSidebar />
        <SidebarInset className="flex flex-col h-screen bg-background dark:bg-surface-elevated">
          <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="ml-auto">
              <ToggleTheme />
            </div>
          </header>
          <main className="flex flex-1 flex-col overflow-hidden bg-background dark:bg-surface-elevated">
            <SettingsContent activeTab={activeTab} />
          </main>
        </SidebarInset>
      </Tabs>
    </SidebarProvider>
  );
}


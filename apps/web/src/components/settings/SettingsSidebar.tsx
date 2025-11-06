"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { Settings, Bell, Palette, Network, Clock, ClipboardList, Database, Shield, Users, User, ArrowLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SETTINGS_CATEGORIES = [
  { id: "General", label: "General", icon: Settings },
  { id: "Notifications", label: "Notifications", icon: Bell },
  { id: "Personalization", label: "Personalization", icon: Palette },
  { id: "Connectors", label: "Apps & Connectors", icon: Network },
  { id: "Schedules", label: "Schedules", icon: Clock },
  { id: "Orders", label: "Orders", icon: ClipboardList },
  { id: "DataControls", label: "Data controls", icon: Database },
  { id: "Security", label: "Security", icon: Shield },
  { id: "ParentalControls", label: "Parental controls", icon: Users },
  { id: "Account", label: "Account", icon: User },
];

export function SettingsSidebar() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-2">
        <div className="flex items-center gap-2 h-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">Settings</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Categories
          </SidebarGroupLabel>
          <TabsList className="flex flex-col gap-1 w-full p-2 h-auto bg-transparent">
            {SETTINGS_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                  <TabsTrigger
                  key={category.id}
                    value={category.id}
                    asChild
                    className={cn(
                      "w-full justify-start data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-accent-foreground"
                    )}
                  >
                    <SidebarMenuButton className="w-full">
                      <Icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {category.label}
                      </span>
                    </SidebarMenuButton>
                  </TabsTrigger>
              );
            })}
          </TabsList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}


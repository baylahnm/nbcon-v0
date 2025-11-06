"use client";

import * as React from "react";
import {
  Plus,
  Search,
  MessageSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useJobs } from "@/hooks/useJobs";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { profile, isLoading: profileLoading } = useUserProfile();
  const { jobs, isLoading: jobsLoading } = useJobs();
  const [isCreatingJob, setIsCreatingJob] = React.useState(false);

  const handleNewJob = async () => {
    setIsCreatingJob(true);
    try {
      // Create a new job/conversation
      // For now, redirect to dashboard - in the future, create a job and navigate to it
      // Create new job - for now just refresh
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsCreatingJob(false);
    }
  };


  const displayName = profile?.full_name || profile?.username || profile?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-2">
        <div className="flex items-center gap-2">
          <NbconLogo className="h-8 w-8" asLink={false} />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleNewJob}
                disabled={isCreatingJob}
                className="w-full"
              >
                <Plus className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  New Chat
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/jobs">
                  <Search className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Explore Jobs
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarMenu>
            {jobsLoading ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  Loading...
                </div>
              </SidebarMenuItem>
            ) : jobs.length === 0 ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No recent chats
                </div>
              </SidebarMenuItem>
            ) : (
              jobs.map((job) => (
                <SidebarMenuItem key={job.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/jobs/${job.id}`}>
                      <MessageSquare className="h-4 w-4" />
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {job.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <UserMenu
          trigger={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
            >
              {profileLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                    <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile?.email}
                    </span>
                  </div>
                </>
              )}
            </SidebarMenuButton>
          }
          side="right"
          align="end"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}


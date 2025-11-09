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
import { useConversations } from "@/hooks/useConversations";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import { UserMenu } from "./UserMenu";
import { useRouter } from "next/router";

export function DashboardSidebar() {
  const { profile, isLoading: profileLoading } = useUserProfile();
  const { conversations, isLoading: conversationsLoading, createConversation } = useConversations();
  const router = useRouter();
  const [isCreatingConversation, setIsCreatingConversation] = React.useState(false);

  const handleNewChat = async () => {
    setIsCreatingConversation(true);
    try {
      // Create a new conversation with default title
      const newConversation = await createConversation("New Chat");
      if (newConversation) {
        // Navigate to the new conversation using dynamic route
        router.push(`/chat/${newConversation.id}`);
      } else {
        // Fallback: just navigate to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      router.push("/dashboard");
    } finally {
      setIsCreatingConversation(false);
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
                onClick={handleNewChat}
                disabled={isCreatingConversation}
                className="w-full"
              >
                <Plus className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {isCreatingConversation ? "Creating..." : "New Chat"}
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
            {conversationsLoading ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  Loading...
                </div>
              </SidebarMenuItem>
            ) : conversations.length === 0 ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No recent chats
                </div>
              </SidebarMenuItem>
            ) : (
              conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      router.push(`/chat/${conversation.id}`);
                    }}
                    className="w-full"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {conversation.title}
                    </span>
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
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
                  <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
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


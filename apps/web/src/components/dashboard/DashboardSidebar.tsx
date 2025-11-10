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
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useConversations } from "@/hooks/useConversations";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import { UserMenu } from "./UserMenu";
import { ConversationActionsMenu } from "./ConversationActionsMenu";
import { RenameConversationDialog } from "./RenameConversationDialog";
import { useRouter } from "next/router";

export function DashboardSidebar() {
  const { profile, isLoading: profileLoading } = useUserProfile();
  const { conversations, isLoading: conversationsLoading, createConversation, deleteConversation, renameConversation, pinConversation } = useConversations();
  const router = useRouter();
  const [isCreatingConversation, setIsCreatingConversation] = React.useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [conversationToRename, setConversationToRename] = React.useState<{ id: string; title: string } | null>(null);

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


  const handleRename = (conversationId: string, currentTitle: string) => {
    setConversationToRename({ id: conversationId, title: currentTitle });
    setRenameDialogOpen(true);
  };

  const handleRenameSave = async (newTitle: string) => {
    if (conversationToRename) {
      await renameConversation(conversationToRename.id, newTitle);
      setRenameDialogOpen(false);
      setConversationToRename(null);
    }
  };

  const handleDelete = async (conversationId: string) => {
    await deleteConversation(conversationId);
    // If deleted conversation was active, navigate to dashboard
    if (router.query.conversationId === conversationId || router.query.conversation === conversationId) {
      router.push("/dashboard");
    }
  };

  const handlePin = async (conversationId: string, pinned: boolean) => {
    await pinConversation(conversationId, pinned);
  };

  const handleShare = (conversationId: string, conversationTitle: string) => {
    // Trigger share functionality
    const shareUrl = `${window.location.origin}/chat/${conversationId}`;
    if (navigator.share) {
      navigator.share({
        title: conversationTitle,
        text: `Check out this AI conversation: ${conversationTitle}`,
        url: shareUrl,
      }).catch(() => {
        // User cancelled or error - fallback to clipboard
        navigator.clipboard.writeText(shareUrl);
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
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
              <>
                {[1, 2, 3].map((i) => (
                  <SidebarMenuItem key={i}>
                    <div className="px-2 py-1.5 flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 flex-1 rounded group-data-[collapsible=icon]:hidden" />
                    </div>
                  </SidebarMenuItem>
                ))}
              </>
            ) : conversations.length === 0 ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No recent chats
                </div>
              </SidebarMenuItem>
            ) : (
              conversations.map((conversation) => {
                const isActive = router.query.conversationId === conversation.id || router.query.conversation === conversation.id;
                return (
                  <SidebarMenuItem key={conversation.id}>
                    <div className="flex items-center w-full" onClick={(e) => {
                      // Prevent navigation when clicking on the actions menu
                      if ((e.target as HTMLElement).closest('[role="menu"]')) {
                        e.stopPropagation();
                      }
                    }}>
                      <SidebarMenuButton
                        onClick={() => {
                          router.push(`/chat/${conversation.id}`);
                        }}
                        className={`flex-1 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                        isActive={isActive}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="truncate group-data-[collapsible=icon]:hidden">
                          {conversation.title}
                        </span>
                      </SidebarMenuButton>
                      <div onClick={(e) => e.stopPropagation()}>
                        <ConversationActionsMenu
                          conversationId={conversation.id}
                          conversationTitle={conversation.title}
                          isPinned={conversation.pinned}
                          onRename={() => handleRename(conversation.id, conversation.title)}
                          onDelete={() => handleDelete(conversation.id)}
                          onPin={(pinned) => handlePin(conversation.id, pinned)}
                          onShare={() => handleShare(conversation.id, conversation.title)}
                        />
                      </div>
                    </div>
                  </SidebarMenuItem>
                );
              })
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
      {conversationToRename && (
        <RenameConversationDialog
          open={renameDialogOpen}
          currentTitle={conversationToRename.title}
          onClose={() => {
            setRenameDialogOpen(false);
            setConversationToRename(null);
          }}
          onSave={handleRenameSave}
        />
      )}
    </Sidebar>
  );
}


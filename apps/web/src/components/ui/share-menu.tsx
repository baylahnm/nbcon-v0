"use client";

import * as React from "react";
import { Share2, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";

interface ShareMenuProps {
  conversationId: string;
  conversationTitle?: string;
}

export function ShareMenu({ conversationId, conversationTitle }: ShareMenuProps) {
  const { addToast } = useToast();
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShareConversation = async () => {
    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/dashboard?conversation=${conversationId}`;
      
      // Try Web Share API first (mobile/desktop with share support)
      if (navigator.share) {
        await navigator.share({
          title: conversationTitle || "AI Conversation",
          text: `Check out this AI conversation: ${conversationTitle || "Conversation"}`,
          url: shareUrl,
        });
        addToast({
          title: "Shared!",
          description: "Conversation shared successfully.",
          variant: "success",
          duration: 2000,
        });
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(shareUrl);
        addToast({
          title: "Link copied!",
          description: "Conversation link copied to clipboard.",
          variant: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing conversation:", error);
        addToast({
          title: "Error",
          description: "Failed to share conversation. Please try again.",
          variant: "error",
          duration: 3000,
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleExportToDocs = async () => {
    setIsSharing(true);
    try {
      const response = await fetch(`/api/conversations/${conversationId}/export/docs`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to export to Docs");
      }

      const data = await response.json();
      
      if (data.doc_url) {
        window.open(data.doc_url, "_blank");
        addToast({
          title: "Exported!",
          description: "Conversation exported to Google Docs.",
          variant: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error exporting to Docs:", error);
      addToast({
        title: "Error",
        description: "Failed to export to Docs. Please try again.",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleDraftInGmail = async () => {
    setIsSharing(true);
    try {
      const response = await fetch(`/api/conversations/${conversationId}/export/gmail`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create Gmail draft");
      }

      const data = await response.json();
      
      if (data.draft_url) {
        window.open(data.draft_url, "_blank");
        addToast({
          title: "Draft created!",
          description: "Gmail draft created successfully.",
          variant: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating Gmail draft:", error);
      addToast({
        title: "Error",
        description: "Failed to create Gmail draft. Please try again.",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isSharing}
          className="h-8 w-8 p-0"
          aria-label="Share & export"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleShareConversation} disabled={isSharing}>
          <Share2 className="mr-2 h-4 w-4" />
          Share conversation
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportToDocs} disabled={isSharing}>
          <FileText className="mr-2 h-4 w-4" />
          Export to Docs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDraftInGmail} disabled={isSharing}>
          <Mail className="mr-2 h-4 w-4" />
          Draft in Gmail
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


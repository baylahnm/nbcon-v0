"use client";

import * as React from "react";
import { MoreVertical, Share2, Pin, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ConversationActionsMenuProps {
  conversationId: string;
  conversationTitle: string;
  isPinned?: boolean;
  onRename: () => void;
  onDelete: () => void;
  onPin: (pinned: boolean) => void;
  onShare: () => void;
}

export function ConversationActionsMenu({
  conversationId,
  conversationTitle,
  isPinned = false,
  onRename,
  onDelete,
  onPin,
  onShare,
}: ConversationActionsMenuProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this conversation? This action cannot be undone.")) {
      setIsDeleting(true);
      onDelete();
      // Reset deleting state after a short delay
      setTimeout(() => setIsDeleting(false), 1000);
    }
  };

  const handlePin = () => {
    onPin(!isPinned);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover/menu-item:opacity-100 transition-opacity data-[state=open]:opacity-100"
          aria-label="Open menu for conversation actions"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 rounded-xl border border-sidebar-border bg-surface dark:bg-surface p-1 text-popover-foreground shadow-md"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handlePin();
          }}
        >
          <Pin className={`mr-2 h-4 w-4 ${isPinned ? "fill-current" : ""}`} />
          {isPinned ? "Unpin" : "Pin"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onRename();
          }}
        >
          <Edit className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          disabled={isDeleting}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


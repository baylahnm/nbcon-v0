"use client";

import * as React from "react";
import { useRouter } from "next/router";
import {
  Settings,
  LogOut,
  UserPlus,
  HelpCircle,
  Moon,
  Sun,
  Monitor,
  Gift,
  ChevronRight,
  Check,
  Crown,
} from "lucide-react";
import { supabase } from "@nbcon/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSubscriptionTier } from "@/hooks/useSubscriptionTier";
import { useCredits } from "@/hooks/useCredits";

interface UserMenuProps {
  trigger: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function UserMenu({ trigger, side = "right", align = "end" }: UserMenuProps) {
  const router = useRouter();
  const { profile, isLoading: profileLoading } = useUserProfile();
  const { tier, isLoading: tierLoading } = useSubscriptionTier();
  const { theme, setTheme } = useTheme();
  const { used: creditsUsed, limit: creditsLimit, isLoading: creditsLoading } = useCredits();

  const displayName = profile?.full_name || profile?.username || profile?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const isPro = tier === "pro" || tier === "enterprise";
  const creditsRemaining = Math.max(0, creditsLimit - creditsUsed);
  const creditsPercentage = creditsLimit > 0 ? (creditsUsed / creditsLimit) * 100 : 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[10000] min-w-32 overflow-hidden rounded-xl border border-sidebar-border bg-surface dark:bg-surface p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)] max-h-[calc(100vh-64px)] w-[280px] overflow-y-auto"
        side={side}
        align={align}
        sideOffset={4}
      >
        {/* User Profile Header */}
        <div className="my-2 flex items-center gap-2 px-1.5">
          <div className="group flex flex-row -space-x-1">
            <span className="relative flex overflow-hidden shrink-0 items-center border border-transparent text-xs group-[.avatars]:border-background rounded-[8px] hover:border-transparent h-8 w-8">
              {profileLoading ? (
                <div className="h-8 w-8 rounded-[8px] bg-muted animate-pulse" />
              ) : (
                <Avatar className="h-8 w-8 rounded-[8px]">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                  <AvatarFallback className="flex justify-center font-medium text-white bg-brand-tiger-primary rounded-[8px] h-8 w-8 items-center border-none">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-[2px] leading-none">
            <p className="text-sm font-medium">
              {profileLoading ? (
                <span className="inline-block h-4 w-24 bg-muted rounded animate-pulse" />
              ) : (
                displayName
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {profileLoading ? (
                <span className="inline-block h-3 w-32 bg-muted rounded animate-pulse mt-1" />
              ) : (
                profile?.email
              )}
            </p>
          </div>
        </div>

        {/* Turn Pro Section */}
        {!isPro && (
          <div className="px-1.5 pb-1.5">
            <div className="flex w-full items-center justify-between rounded-md bg-surface-elevated dark:bg-surface-elevated px-3 py-2 text-foreground">
              <span className="flex items-center gap-1 text-sm">
                <Crown className="shrink-0 h-4 w-4" />
                Turn Pro
              </span>
              <Button
                asChild
                className="h-7 rounded-md px-3 py-2 gap-1.5 bg-brand-twilight text-brand-twilight-foreground hover:bg-brand-twilight/80"
                size="sm"
              >
                <a href="/?settings=billing">Upgrade</a>
              </Button>
            </div>
          </div>
        )}

        {/* Credits Section */}
        <div className="flex flex-col gap-1 px-1.5 pb-1.5 pt-1">
          <div 
            className="flex flex-col gap-2.5 rounded-xl bg-muted p-4 md:rounded-md md:p-3 cursor-pointer transition-all duration-150 ease-in-out hover:opacity-80"
            onClick={() => router.push("/?settings=billing")}
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-foreground md:text-sm">Credits</p>
              <div className="flex items-center gap-px">
                {creditsLoading ? (
                  <span className="text-base font-normal md:text-sm text-muted-foreground">...</span>
                ) : (
                  <>
                    <p className="text-base font-normal md:text-sm text-muted-foreground">{creditsRemaining} left</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="100%" height="100%" className="shrink-0 h-4 w-4 text-muted-foreground">
                      <path fill="currentColor" d="M9.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L13.94 12 9.47 7.53a.75.75 0 0 1 0-1.06"></path>
                    </svg>
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-2">
              <div className="relative flex-1 overflow-hidden rounded-lg bg-muted-active" style={{ height: "11px" }}>
                <div 
                  className="absolute h-full cursor-pointer bg-blue-800 transition-all rounded-bl-lg rounded-tl-lg rounded-br-lg rounded-tr-lg" 
                  style={{ 
                    left: "0%", 
                    width: creditsLimit > 0 && creditsRemaining > 0 ? `${Math.min(100, creditsPercentage)}%` : "0%" 
                  }} 
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <p className="text-xs text-muted-foreground">Daily credits reset at midnight UTC</p>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-row gap-1.5 px-1.5 pb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 rounded-md px-[11px] py-2 border border-input bg-surface-elevated dark:bg-surface-elevated hover:bg-accent hover:border-accent"
            asChild
          >
            <a href="/settings" className="flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 rounded-md px-[11px] py-2 border border-input bg-surface-elevated dark:bg-surface-elevated hover:bg-accent hover:border-accent"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite</span>
          </Button>
        </div>

        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-border" />

        {/* Workspaces Section */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Workspaces</span>
            <div className="rounded-full bg-muted-active px-2 py-px text-center text-[10px] font-medium uppercase text-muted-foreground">
              1
            </div>
          </div>
        </div>
        <div className="flex max-h-[300px] w-full flex-col overflow-y-auto">
          {/* Current Workspace */}
          <DropdownMenuItem className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground outline-none transition-colors focus:bg-accent [&>svg]:size-4 [&>svg]:shrink-0 group">
            <Avatar className="h-[26px] w-[26px] rounded-[8px]">
              <AvatarFallback className="flex h-full w-full justify-center font-medium text-white bg-brand-tiger-primary rounded-[8px] items-center border-none">
                {initials}
              </AvatarFallback>
            </Avatar>
            <p className="min-w-0 truncate text-sm">{displayName}</p>
            <span className="rounded-full px-2 py-px text-center text-[10px] font-medium uppercase transition-colors duration-150 ease-in-out bg-muted-active text-muted-foreground">
              {tierLoading ? "..." : tier === "free" ? "Free" : tier}
            </span>
            <Check className="shrink-0 h-4 w-4 ml-auto" />
          </DropdownMenuItem>

          {/* Create New Workspace */}
          <DropdownMenuItem className="relative flex cursor-default select-none items-center rounded-lg text-sm text-foreground outline-none transition-colors focus:bg-accent gap-3.5 px-3 py-2.5">
            <UserPlus className="h-4 w-4" />
            <p>Create new workspace</p>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-border" />

        {/* Bottom Actions */}
        <DropdownMenuItem className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent text-accent-foreground">
          <Gift className="h-5 w-5" />
          <span>Get free credits</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground outline-none transition-colors focus:bg-accent">
          <a href="/support">
            <HelpCircle className="h-5 w-5" />
            <p>Help Center</p>
          </a>
        </DropdownMenuItem>

        {/* Appearance Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent">
            <Moon className="h-5 w-5" />
            <p>Appearance</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="rounded-xl border border-sidebar-border bg-surface dark:bg-surface">
            <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
              <DropdownMenuRadioItem value="system">
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-border" />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground outline-none transition-colors focus:bg-accent"
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" />
          <p>Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


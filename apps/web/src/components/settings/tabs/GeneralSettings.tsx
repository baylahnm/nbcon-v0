"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Monitor, Sun, Moon, ChevronDown, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function GeneralSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [showAdditionalModels, setShowAdditionalModels] = React.useState(true);
  const [voice, setVoice] = React.useState("Cove");
  const [accentColor, setAccentColor] = React.useState("default");
  const [language, setLanguage] = React.useState("en-US");
  const [spokenLanguage, setSpokenLanguage] = React.useState("en");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeLabel = () => {
    if (!mounted) return "System"; // Default for SSR
    if (theme === "system") return "System";
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "System";
  };

  const SettingRow = ({
    label,
    children,
    description,
  }: {
    label: string;
    children: React.ReactNode;
    description?: string;
  }) => (
    <div className="border-border dark:border-border-elevated flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>{label}</div>
          {children}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground pe-12 my-1">{description}</div>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative mb-4">
      {/* Header */}
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-border-elevated border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">General</div>
        </h3>
      </div>

      {/* Appearance */}
      <SettingRow label="Appearance">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover text-foreground"
            >
              <span>{getThemeLabel()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-surface dark:bg-surface border-border-elevated min-w-[120px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Accent color */}
      <SettingRow label="Accent color">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover text-foreground"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex h-3.5 w-3.5 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                </div>
                Default
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-surface dark:bg-surface border-border-elevated min-w-[120px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setAccentColor("default")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500" />
                Default
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Language */}
      <SettingRow label="Language">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover text-foreground"
            >
              <span>English (US)</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-surface dark:bg-surface border-border-elevated min-w-[140px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setLanguage("en-US")}
              className="cursor-pointer"
            >
              English (US)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLanguage("en-GB")}
              className="cursor-pointer"
            >
              English (UK)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Spoken language */}
      <SettingRow
        label="Spoken language"
        description="For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover text-foreground"
            >
              <span>English</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-surface dark:bg-surface border-border-elevated min-w-[120px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setSpokenLanguage("en")}
              className="cursor-pointer"
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSpokenLanguage("es")}
              className="cursor-pointer"
            >
              Spanish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Voice */}
      <SettingRow label="Voice">
        <div className="flex flex-row flex-nowrap items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="border-none h-9 px-3 hover:bg-surface-hover dark:hover:bg-surface-hover"
          >
            <Play className="h-4 w-4" />
            <span className="ml-1.5">Play</span>
          </Button>
          <Separator orientation="vertical" className="h-4 bg-border-elevated" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover text-foreground"
              >
                <span>{voice}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-surface dark:bg-surface border-border-elevated min-w-[120px]"
              align="end"
            >
              <DropdownMenuItem
                onClick={() => setVoice("Cove")}
                className="cursor-pointer"
              >
                Cove
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setVoice("Juniper")}
                className="cursor-pointer"
              >
                Juniper
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SettingRow>

      {/* Show additional models */}
      <SettingRow label="Show additional models">
        <div className="flex items-center gap-2">
          <Switch
            checked={showAdditionalModels}
            onCheckedChange={setShowAdditionalModels}
            className="data-[state=checked]:bg-blue-400 focus-visible:ring-foreground bg-gray-200 dark:bg-gray-600 h-4 w-7"
          />
        </div>
      </SettingRow>
    </section>
  );
}


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
import { Monitor, Sun, Moon, ChevronDown, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export function PersonalizationSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [accentColor, setAccentColor] = React.useState("default");
  const [layoutDensity, setLayoutDensity] = React.useState("comfortable");
  const [fontSize, setFontSize] = React.useState("medium");
  const [language, setLanguage] = React.useState("en-US");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeLabel = () => {
    if (!mounted) return "System";
    if (theme === "system") return "System";
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "System";
  };

  const accentColors = [
    { value: "default", label: "Default", color: "bg-gray-400" },
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
  ];

  const SettingRow = ({
    label,
    children,
    description,
  }: {
    label: string;
    children: React.ReactNode;
    description?: string;
  }) => (
    <div className="border-border dark:border-[#2d2d2d] flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
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
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">Personalization</div>
        </h3>
      </div>

      {/* Theme Selection */}
      <SettingRow label="Theme">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] text-foreground"
            >
              <span>{getThemeLabel()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#fafafa] dark:bg-[#181818] border-border dark:border-[#2d2d2d] min-w-[120px]"
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

      {/* Accent Color */}
      <SettingRow label="Accent color" description="Choose your preferred accent color">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] text-foreground"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex h-3.5 w-3.5 items-center justify-center">
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      accentColors.find((c) => c.value === accentColor)?.color ||
                        "bg-gray-400"
                    )}
                  />
                </div>
                {accentColors.find((c) => c.value === accentColor)?.label || "Default"}
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#fafafa] dark:bg-[#181818] border-border dark:border-[#2d2d2d] min-w-[140px]"
            align="end"
          >
            {accentColors.map((color) => (
              <DropdownMenuItem
                key={color.value}
                onClick={() => setAccentColor(color.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", color.color)} />
                  {color.label}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Layout Density */}
      <SettingRow label="Layout density" description="Adjust spacing between elements">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] text-foreground"
            >
              <span className="capitalize">{layoutDensity}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#fafafa] dark:bg-[#181818] border-border dark:border-[#2d2d2d] min-w-[140px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setLayoutDensity("comfortable")}
              className="cursor-pointer"
            >
              Comfortable
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLayoutDensity("compact")}
              className="cursor-pointer"
            >
              Compact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Font Size */}
      <SettingRow label="Font size" description="Adjust text size across the application">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] text-foreground"
            >
              <span className="capitalize">{fontSize}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#fafafa] dark:bg-[#181818] border-border dark:border-[#2d2d2d] min-w-[140px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => setFontSize("small")}
              className="cursor-pointer"
            >
              Small
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFontSize("medium")}
              className="cursor-pointer"
            >
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFontSize("large")}
              className="cursor-pointer"
            >
              Large
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
              className="border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white dark:bg-transparent px-3 text-sm leading-none outline-hidden cursor-pointer hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] text-foreground"
            >
              <span>English (US)</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#fafafa] dark:bg-[#181818] border-border dark:border-[#2d2d2d] min-w-[140px]"
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
            <DropdownMenuItem
              onClick={() => setLanguage("es")}
              className="cursor-pointer"
            >
              Español
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLanguage("fr")}
              className="cursor-pointer"
            >
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingRow>

      {/* Live Preview */}
      <div className="mt-6 p-4 rounded-lg border border-border dark:border-[#2d2d2d] bg-muted/50">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">Live Preview</h4>
        </div>
        <p className="text-xs text-muted-foreground">
          Changes to theme and accent color will be reflected immediately. Other
          settings require a page refresh.
        </p>
      </div>
    </section>
  );
}


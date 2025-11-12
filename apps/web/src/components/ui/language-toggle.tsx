"use client";

import { useI18n } from "../../hooks/useI18n";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "bg-surface dark:bg-surface inline-flex items-center gap-2 overflow-hidden rounded-md border border-sidebar-border px-3 py-1.5 text-sm transition-all",
            "text-foreground hover:text-foreground"
          )}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>
          <span className={locale === "en" ? "font-semibold" : ""}>
            English
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("ar")}>
          <span className={locale === "ar" ? "font-semibold" : ""}>
            العربية
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


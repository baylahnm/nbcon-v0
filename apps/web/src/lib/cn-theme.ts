import { cn } from "@/lib/utils";
import { themeClasses } from "./theme";

/**
 * Combines theme classes with custom classes
 * 
 * @example
 * cnTheme('dropdown', 'w-56', className)
 * // Returns: "bg-surface dark:bg-surface border border-sidebar-border rounded-xl w-56 [custom classes]"
 */
export function cnTheme(
  themeKey: keyof typeof themeClasses,
  ...classes: (string | undefined | null | false)[]
): string {
  return cn(themeClasses[themeKey], ...classes);
}


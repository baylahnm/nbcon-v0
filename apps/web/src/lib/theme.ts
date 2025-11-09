/**
 * Unified Theme System
 * 
 * Provides type-safe theme utilities and common class combinations
 * for consistent theming across all components.
 */

/**
 * Common theme-aware class combinations
 */
export const themeClasses = {
  // Surface backgrounds
  surface: "bg-surface dark:bg-surface",
  surfaceElevated: "bg-surface-elevated dark:bg-surface-elevated",
  
  // Dropdowns and popovers
  dropdown: "bg-surface dark:bg-surface border border-sidebar-border rounded-xl",
  
  // Cards and panels
  card: "bg-surface-elevated dark:bg-surface-elevated border border-border rounded-lg",
  
  // Buttons (outline variant)
  buttonOutline: "bg-surface dark:bg-surface-elevated border border-input hover:bg-accent",
  
  // Hover states
  hoverSurface: "hover:bg-surface-hover dark:hover:bg-surface-hover",
} as const;

/**
 * Get theme-aware classes for a component type
 */
export function getThemeClasses(component: keyof typeof themeClasses): string {
  return themeClasses[component];
}

/**
 * Common pattern: Dropdown menu styling
 */
export const dropdownMenuClasses = 
  "rounded-xl border border-sidebar-border bg-surface dark:bg-surface p-1 text-popover-foreground shadow-md";

/**
 * Common pattern: Elevated card styling
 */
export const cardElevatedClasses = 
  "bg-surface-elevated dark:bg-surface-elevated border border-border rounded-lg p-4";


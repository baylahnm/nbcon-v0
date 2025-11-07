/**
 * Unified Icon System - NBCON PRO
 * 
 * Centralized access to approved icon libraries.
 * 
 * Approved Libraries:
 * - lucide-react: Primary icon library (recommended for all UI icons)
 * - react-icons: Brand/service icons (Google Drive, Dropbox, etc.)
 * - @radix-ui/react-icons: Radix UI component icons (accordion, dropdown, etc.)
 * - @lobehub/icons: AI brand logos (Claude, OpenAI, Gemini, etc.)
 * 
 * Usage:
 * ```tsx
 * // Primary: lucide-react (recommended for most icons)
 * import { Check, X, Settings, Menu } from "lucide-react";
 * <Check className="h-5 w-5 text-green-500" />
 * 
 * // Brand icons: react-icons
 * import { SiGoogledrive, SiDropbox } from "react-icons/si";
 * <SiGoogledrive className="h-5 w-5" />
 * 
 * // Radix UI: @radix-ui/react-icons
 * import { ChevronDownIcon } from "@radix-ui/react-icons";
 * <ChevronDownIcon className="h-4 w-4" />
 * 
 * // AI logos: @lobehub/icons (use dynamic imports for SSR)
 * import dynamic from "next/dynamic";
 * const Claude = dynamic(() => import("@lobehub/icons/es/Claude"), { ssr: false });
 * <Claude size={24} />
 * ```
 * 
 * Theme Awareness:
 * - Always use Tailwind classes for colors: `text-muted-foreground`, `text-primary`, etc.
 * - Never use hardcoded colors in SVGs
 * - Use `currentColor` in custom SVGs for theme compatibility
 */

// Lucide React - Primary icon library
// Re-export for convenience (optional - direct imports are preferred)
export * as LucideIcon from "lucide-react";


/**
 * Centralized Icon Library Helper
 * 
 * Provides type-safe, centralized access to all icon libraries used in NBCON PRO.
 * 
 * Libraries:
 * - lucide-react: Primary icon set (modern & consistent) - Recommended for most use cases
 * - bootstrap-icons: Supplementary minimal icons
 * - @fortawesome/fontawesome-free: Legacy icons, social icons
 * 
 * Usage:
 * ```tsx
 * import { LucideIcon, BootstrapIcon, FontAwesomeIcon } from "@/lib/icons";
 * 
 * // Lucide (recommended)
 * <LucideIcon.Menu className="h-5 w-5" />
 * 
 * // Bootstrap Icons (via className)
 * <i className="bi bi-house" />
 * 
 * // Font Awesome (via className)
 * <i className="fas fa-home" />
 * ```
 */

// Lucide React - Primary icon library
export * as LucideIcon from "lucide-react";

/**
 * Bootstrap Icons Helper
 * 
 * Usage:
 * ```tsx
 * import { BootstrapIcon } from "@/lib/icons";
 * 
 * // Via className
 * <i className="bi bi-house" />
 * 
 * // Common icons mapped
 * <BootstrapIcon.House />
 * ```
 */
export const BootstrapIcon = {
  // Common icons - use className for full library
  House: ({ className }: { className?: string }) => (
    <i className={`bi bi-house ${className || ""}`} />
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <i className={`bi bi-chevron-down ${className || ""}`} />
  ),
  ChevronUp: ({ className }: { className?: string }) => (
    <i className={`bi bi-chevron-up ${className || ""}`} />
  ),
  ChevronLeft: ({ className }: { className?: string }) => (
    <i className={`bi bi-chevron-left ${className || ""}`} />
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <i className={`bi bi-chevron-right ${className || ""}`} />
  ),
  Menu: ({ className }: { className?: string }) => (
    <i className={`bi bi-list ${className || ""}`} />
  ),
  X: ({ className }: { className?: string }) => (
    <i className={`bi bi-x ${className || ""}`} />
  ),
  Search: ({ className }: { className?: string }) => (
    <i className={`bi bi-search ${className || ""}`} />
  ),
  // Add more Bootstrap icons as needed
};

/**
 * Font Awesome Icons Helper
 * 
 * Usage:
 * ```tsx
 * import { FontAwesomeIcon } from "@/lib/icons";
 * 
 * // Via className
 * <i className="fas fa-home" />
 * <i className="fab fa-github" />
 * 
 * // Common icons mapped
 * <FontAwesomeIcon.Home />
 * ```
 */
export const FontAwesomeIcon = {
  // Solid icons (fas)
  Home: ({ className }: { className?: string }) => (
    <i className={`fas fa-home ${className || ""}`} />
  ),
  User: ({ className }: { className?: string }) => (
    <i className={`fas fa-user ${className || ""}`} />
  ),
  Settings: ({ className }: { className?: string }) => (
    <i className={`fas fa-cog ${className || ""}`} />
  ),
  Bell: ({ className }: { className?: string }) => (
    <i className={`fas fa-bell ${className || ""}`} />
  ),
  Search: ({ className }: { className?: string }) => (
    <i className={`fas fa-search ${className || ""}`} />
  ),
  // Brand icons (fab)
  GitHub: ({ className }: { className?: string }) => (
    <i className={`fab fa-github ${className || ""}`} />
  ),
  Twitter: ({ className }: { className?: string }) => (
    <i className={`fab fa-twitter ${className || ""}`} />
  ),
  Facebook: ({ className }: { className?: string }) => (
    <i className={`fab fa-facebook ${className || ""}`} />
  ),
  LinkedIn: ({ className }: { className?: string }) => (
    <i className={`fab fa-linkedin ${className || ""}`} />
  ),
  Instagram: ({ className }: { className?: string }) => (
    <i className={`fab fa-instagram ${className || ""}`} />
  ),
  // Add more Font Awesome icons as needed
};

/**
 * Type-safe icon component props
 */
export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Get Bootstrap Icon class name
 * @param name - Bootstrap icon name (e.g., "house", "chevron-down")
 * @returns className string
 */
export const getBootstrapIconClass = (name: string): string => {
  return `bi bi-${name}`;
};

/**
 * Get Font Awesome icon class name
 * @param name - Font Awesome icon name
 * @param style - Icon style: "fas" (solid), "far" (regular), "fab" (brands), "fal" (light)
 * @returns className string
 */
export const getFontAwesomeIconClass = (
  name: string,
  style: "fas" | "far" | "fab" | "fal" = "fas"
): string => {
  return `${style} fa-${name}`;
};


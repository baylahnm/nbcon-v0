/**
 * THEME MIGRATION GUIDE
 * 
 * This document maps old tokens to new unified tokens.
 * Use this when updating components.
 * 
 * Last Updated: 2025-01-28
 */

/**
 * BACKGROUND TOKENS
 * 
 * OLD → NEW
 * ----------
 * bg-card          → bg-surface
 * bg-popover       → bg-surface
 * bg-surface-elevated → bg-surface (or use opacity)
 * bg-accent        → bg-muted or bg-surface-hover
 * bg-secondary     → bg-muted or bg-surface-hover
 * bg-muted-active  → bg-muted (with opacity if needed)
 */

/**
 * BORDER TOKENS
 * 
 * OLD → NEW
 * ----------
 * border-border-elevated → border-border
 * border-input           → border-border
 * border-sidebar-border  → border-border (or keep sidebar-border if sidebar needs different)
 */

/**
 * TEXT TOKENS
 * 
 * OLD → NEW
 * ----------
 * text-card-foreground    → text-foreground
 * text-popover-foreground → text-foreground
 * text-accent-foreground  → text-foreground
 */

/**
 * UNIFIED TOKEN SYSTEM (12 Core Tokens)
 * 
 * Base Colors:
 * - background      → Main page background
 * - foreground      → Primary text
 * - surface         → Cards, elevated surfaces
 * - surface-hover   → Hover states
 * 
 * Semantic Colors:
 * - primary / primary-foreground
 * - secondary / secondary-foreground
 * - muted / muted-foreground
 * - destructive / destructive-foreground
 * 
 * Border & Input:
 * - border          → All borders
 * - ring            → Focus rings
 * 
 * Specialized:
 * - sidebar-background / sidebar-foreground / sidebar-border
 * - chat-input
 * 
 * Charts:
 * - chart-1 through chart-5
 */

/**
 * MIGRATION EXAMPLES
 * 
 * Before:
 *   className="bg-card border-border-elevated"
 * 
 * After:
 *   className="bg-surface border-border"
 * 
 * Before:
 *   className="bg-popover text-popover-foreground"
 * 
 * After:
 *   className="bg-surface text-foreground"
 * 
 * Before:
 *   className="bg-accent hover:bg-accent/80"
 * 
 * After:
 *   className="bg-muted hover:bg-surface-hover"
 */


# Theme System Global Initialization Plan

## Summary
This plan outlines how to initialize the theme system globally in the Next.js app to ensure:
- Theme applies immediately on page load (no flash)
- Works correctly with SSR
- Respects user's saved preference
- Supports system preference detection

**Approach:** Two-layer initialization
1. **Inline script in `_document.tsx`** - Runs before React hydration (prevents FOUC)
2. **ThemeProvider component in `_app.tsx`** - Ensures theme persists during navigation

## Current State
- ✅ Theme hook exists (`useThemePreference.ts`)
- ✅ CSS variables defined in `globals.css` (light/dark modes)
- ✅ Theme preference stored in localStorage
- ❌ Theme only initialized when `UserMenu` component mounts
- ❌ Potential flash of wrong theme on page load
- ❌ Theme not applied on initial server-side render

## Goal
Initialize the theme system globally so that:
1. Theme is applied immediately on page load (no flash)
2. Works correctly with Next.js SSR
3. Respects user's saved preference from localStorage
4. Supports system preference detection

## Implementation Plan

### Phase 1: Create Theme Initialization Component
**File:** `apps/web/src/components/theme/ThemeProvider.tsx` (new file)

**Purpose:** 
- Client-side component that initializes theme on mount
- Handles SSR-safe theme detection
- Applies theme class to document root

**Implementation:**
```typescript
"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Get theme from localStorage or default to "system"
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const theme = storedTheme || "system";
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    let effectiveTheme: "light" | "dark";
    
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme;
    }
    
    root.classList.add(effectiveTheme);
  }, []);
  
  return <>{children}</>;
}
```

### Phase 2: Add Script for SSR Theme Prevention
**File:** `apps/web/src/pages/_document.tsx` (update existing)

**Purpose:**
- Inject inline script to set theme before React hydrates
- Prevents flash of wrong theme (FOUC - Flash of Unstyled Content)
- Must run synchronously before any CSS is applied

**Implementation:**
Add a `<script>` tag in `<Head>` (before any stylesheets) that:
1. Reads theme from localStorage
2. Detects system preference if theme is "system"
3. Applies theme class to `<html>` element immediately
4. Runs before React hydration

**Code:**
```typescript
<Head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            const theme = localStorage.getItem('theme') || 'system';
            const root = document.documentElement;
            let effectiveTheme = theme;
            
            if (theme === 'system') {
              effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            }
            
            root.classList.remove('light', 'dark');
            root.classList.add(effectiveTheme);
          } catch (e) {
            // Fallback to light theme if localStorage is not available
            document.documentElement.classList.add('light');
          }
        })();
      `,
    }}
  />
  {/* Existing font links */}
</Head>
```

### Phase 3: Integrate ThemeProvider in _app.tsx
**File:** `apps/web/src/pages/_app.tsx` (update existing)

**Purpose:**
- Wrap app with ThemeProvider
- Ensure theme is initialized for all pages

**Implementation:**
- Import ThemeProvider
- Wrap Component with ThemeProvider
- Keep existing I18nProvider structure

### Phase 4: Update useThemePreference Hook
**File:** `apps/web/src/hooks/useThemePreference.ts` (update existing)

**Purpose:**
- Ensure hook works correctly with global initialization
- Sync with ThemeProvider if needed
- Handle theme changes from UserMenu

**Considerations:**
- Hook should still work independently
- May need to listen to storage events for sync across tabs
- Ensure no conflicts with ThemeProvider

## Implementation Steps

### Step 1: Create ThemeProvider Component
1. Create `apps/web/src/components/theme/ThemeProvider.tsx`
2. Implement client-side theme initialization
3. Handle system preference detection
4. Apply theme class to document root

### Step 2: Update _document.tsx
1. Add inline script in `<Head>` (before font links)
2. Script reads theme from localStorage
3. Applies theme class synchronously before page render
4. Includes try-catch for SSR safety
5. Prevents FOUC (Flash of Unstyled Content)

### Step 3: Update _app.tsx
1. Import ThemeProvider component
2. Wrap app content with ThemeProvider
3. Maintain existing I18nProvider structure
4. Ensure proper component order

### Step 4: Test Theme System
1. Test light mode
2. Test dark mode
3. Test system preference
4. Test localStorage persistence
5. Test page refresh (no flash)
6. Test navigation between pages

### Step 5: Optional Enhancements
1. Add storage event listener for cross-tab sync
2. Add theme change animation (optional)
3. Add theme transition effects (optional)

## Files to Create/Modify

### New Files:
- `apps/web/src/components/theme/ThemeProvider.tsx`

### Modified Files:
- `apps/web/src/pages/_app.tsx` - Add ThemeProvider wrapper
- `apps/web/src/pages/_document.tsx` - Add inline theme script (if exists, else create)

## Testing Checklist
- [ ] Theme applies immediately on page load
- [ ] No flash of wrong theme (FOUC)
- [ ] Theme persists across page refreshes
- [ ] Theme changes work from UserMenu
- [ ] System preference detection works
- [ ] Works correctly with SSR
- [ ] Works correctly with client-side navigation
- [ ] Theme syncs across browser tabs (optional)

## Benefits
1. ✅ Consistent theme application across entire app
2. ✅ No flash of wrong theme on page load
3. ✅ Better user experience
4. ✅ SSR-compatible
5. ✅ Maintains existing functionality

## Risks & Considerations
- Need to ensure SSR compatibility
- Script injection must be safe
- ThemeProvider should not cause hydration mismatches
- Need to handle edge cases (no localStorage, etc.)


# NBCON PRO Theme System - Comprehensive Plan & Report

**Date:** 2025-01-06  
**Status:** Planning & Analysis Complete  
**Scope:** Global theme initialization, token unification, and system-wide consistency

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Theme System Unification Report](#theme-system-unification-report)
4. [Global Theme Initialization Plan](#global-theme-initialization-plan)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Testing & Validation](#testing--validation)
7. [Success Criteria](#success-criteria)

---

## Executive Summary

The NBCON PRO theme system requires two major initiatives:

1. **Global Theme Initialization:** Ensure unified light/dark theme behavior across SSR and client with no flash, synced preferences, and Tailwind token compatibility
2. **Theme Token Unification:** Consolidate 80+ hardcoded colors, eliminate duplicate tokens, and establish a unified token model

**Key Findings:**
- ✅ `next-themes` already integrated and working
- ✅ Inline script exists in `_document.tsx` for FOUC prevention
- ⚠️ Chart colors duplicated in HSL (globals.css) and OKLCH (theme.css)
- ⚠️ 52 hardcoded dark mode colors across 11 files
- ⚠️ Unused files: `ThemeProvider.tsx` and `useThemePreference.ts` (safe to remove)
- ⚠️ Brand colors only in HSL format (should migrate to OKLCH)

---

## Current State Analysis

### ✅ Already Implemented

1. **`next-themes` Integration:**
   - `NextThemesProvider` configured in `_app.tsx`
   - Components using `useTheme()` hook:
     - `UserMenu.tsx` (line 48)
     - `ToggleTheme.tsx` (line 29)
     - `GeneralSettings.tsx` (line 18)
     - `PersonalizationSettings.tsx` (line 16)

2. **Inline Script in `_document.tsx`:**
   - Script exists (lines 9-33)
   - Reads from `localStorage.getItem('theme')` ✅ (matches next-themes default key)
   - Handles system preference detection ✅
   - Has fallback to light theme ✅

3. **CSS Variables:**
   - `globals.css` defines light/dark mode tokens ✅
   - `theme.css` defines OKLCH chart colors ✅
   - Tailwind config properly maps tokens ✅

### ⚠️ Issues Identified

1. **Unused Files:**
   - `ThemeProvider.tsx` exists but not imported anywhere (safe to remove)
   - `useThemePreference.ts` exists but not imported anywhere (safe to remove)

2. **Token Duplication:**
   - Chart colors defined in both HSL (globals.css) and OKLCH (theme.css)
   - Custom colors duplicate existing tokens (`--color-sidebar`, `--color-background`)

3. **Hardcoded Colors:**
   - 52 instances of hardcoded dark mode colors (`#212121`, `#181818`, `#2d2d2d`, `#303030`, `#515151`)
   - Found across 11 component files

4. **Format Inconsistencies:**
   - Brand colors only in HSL (should migrate to OKLCH)
   - Dual format creates maintenance overhead

---

## Theme System Unification Report

### 1. Token Format Analysis

#### Current State

**HSL Format (globals.css):**
- All semantic tokens (`--background`, `--foreground`, `--card`, etc.)
- Brand colors (`--brand-primary`, `--brand-surface`, etc.)
- Sidebar colors (`--sidebar-background`, `--sidebar-foreground`, etc.)
- Chart colors (fallback values, overridden by theme.css)

**OKLCH Format (theme.css):**
- Chart colors only (`--chart-1` through `--chart-5`)
- Light and dark mode variants

**Issue:** Dual format creates maintenance overhead and potential inconsistencies.

#### Chart Color Duplication

| Token | HSL (globals.css) | OKLCH (theme.css) | Status |
|-------|-------------------|-------------------|--------|
| `--chart-1` | `12 76% 61%` / `220 70% 50%` | `oklch(0.646 0.222 41.116)` / `oklch(0.488 0.243 264.376)` | ❌ Duplicate |
| `--chart-2` | `173 58% 39%` / `160 60% 45%` | `oklch(0.588 0.26 301.924)` / `oklch(0.52 0.26 330.3)` | ❌ Duplicate |
| `--chart-3` | `197 37% 24%` / `30 80% 55%` | `oklch(0.726 0.199 155.815)` / `oklch(0.46 0.21 40.0)` | ❌ Duplicate |
| `--chart-4` | `43 74% 66%` / `280 65% 60%` | `oklch(0.535 0.245 61.42)` / `oklch(0.5 0.22 180)` | ❌ Duplicate |
| `--chart-5` | `27 87% 67%` / `340 75% 55%` | `oklch(0.713 0.175 22.19)` / `oklch(0.48 0.2 220)` | ❌ Duplicate |

**Recommendation:** Remove HSL chart color definitions from `globals.css` (lines 39-43, 86-90). OKLCH values in `theme.css` take precedence and provide better color consistency.

### 2. Hardcoded Color Analysis

#### Dark Mode Hardcoded Colors

**Found 52 instances across 11 files:**

| Color | Usage Count | Files | Purpose |
|-------|-------------|-------|---------|
| `#212121` | 7 | unified-auth-form.tsx, dashboard-preview.tsx | Card/button backgrounds |
| `#181818` | 4 | unified-auth-form.tsx, dashboard-preview.tsx | Card backgrounds, dividers |
| `#2d2d2d` | 1 | navbar.tsx, card.tsx | Border colors |
| `#303030` | 15+ | chatgpt-prompt-input.tsx, settings components | Popover/dialog backgrounds |
| `#515151` | 25+ | Multiple components | Hover states, borders |

**Files with hardcoded colors:**
1. `apps/web/src/components/auth/unified-auth-form.tsx` (7 instances)
2. `apps/web/src/components/auth/dashboard-preview.tsx` (4 instances)
3. `apps/web/src/components/ui/chatgpt-prompt-input.tsx` (15+ instances)
4. `apps/web/src/components/ui/navbar.tsx` (1 instance)
5. `apps/web/src/components/ui/card.tsx` (1 instance)
6. `apps/web/src/components/settings/*` (24+ instances across 9 files)

#### Proposed Token Mapping

Replace hardcoded colors with semantic tokens:

```css
/* Add to globals.css */
.dark {
  /* Surface tokens */
  --surface-1: 0 0% 12.9%;        /* #212121 equivalent */
  --surface-2: 0 0% 9.4%;        /* #181818 equivalent */
  --surface-3: 0 0% 18.8%;       /* #303030 equivalent */
  
  /* Border tokens */
  --border-dark: 0 0% 18.0%;      /* #2d2d2d equivalent */
  --border-hover: 0 0% 32.0%;     /* #515151 equivalent */
}
```

### 3. Brand Color Analysis

#### Current Brand Tokens

**HSL Format (globals.css):**
```css
--brand-primary: 220 90% 50%;
--brand-surface: 240 4% 10%;
--brand-text: 0 0% 98%;
--brand-muted: 240 5% 15%;
--brand-border: 240 3% 25%;
--brand-tiger-primary: 15 100% 50%;
--brand-twilight: 260 80% 50%;
--brand-twilight-foreground: 0 0% 98%;
```

**Issues:**
- ❌ Only HSL format (should migrate to OKLCH for consistency)
- ❌ Same values in light/dark mode (may need mode-specific variants)
- ❌ `--brand-surface` and `--brand-muted` very similar (240 4% 10% vs 240 5% 15%)

**Recommendation:** Audit actual brand color usage and consolidate unused tokens. Migrate to OKLCH format.

### 4. Sidebar Color Analysis

**Status:** ✅ Well-defined, properly mapped in Tailwind config  
**Issue:** ⚠️ `--sidebar-ring` same in light/dark (should be mode-specific)

### 5. Custom Color Tokens

**Dark Mode Only:**
```css
--color-sidebar: 0 0% 9.4%;        /* Duplicate of --sidebar-background */
--color-background: 0 0% 12.9%;    /* Duplicate of --background */
--color-chat-input: 0 0% 18.8%;    /* Unique - no equivalent */
```

**Issues:**
- ❌ `--color-sidebar` duplicates `--sidebar-background`
- ❌ `--color-background` duplicates `--background`
- ❌ Only defined in dark mode (inconsistent)
- ⚠️ `--color-chat-input` not mapped in Tailwind config

**Recommendation:** 
- Remove `--color-sidebar` and `--color-background` (use existing tokens)
- Add `--color-chat-input` to Tailwind config or use `--surface-3`
- Define light mode equivalents if needed

### 6. Component Styling Consistency

#### Shadow Patterns

**Current Usage:**
- `shadow-sm shadow-black/5` - 34 instances (buttons, cards, inputs)
- `shadow-xl` - 3 instances (auth card, dashboard preview)
- `shadow-lg` - 8 instances (cards, dialogs)
- `shadow-md` - 4 instances (dropdowns, popovers)

**Recommendation:** Standardize on `shadow-sm shadow-black/5` for most components, reserve `shadow-xl` for hero/featured elements.

#### Border Radius

**Current State:** ✅ Consistent
- Uses CSS variable: `--radius: 0.5rem`
- Tailwind config properly maps: `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`, `sm: calc(var(--radius) - 4px)`
- Components use semantic classes: `rounded-lg`, `rounded-md`, `rounded-sm`

**Status:** ✅ No changes needed

#### Border Colors

**Current Patterns:**
- `border-border` - Standard (uses `--border` token)
- `border-border/20` - 40% opacity variant
- `border-border/40` - 40% opacity variant
- `dark:border-[#2d2d2d]` - Hardcoded (2 instances)

**Recommendation:** Add `--border-opacity-20` and `--border-opacity-40` tokens or use Tailwind opacity modifiers consistently.

### 7. Proposed Unified Token Model

#### Surface Tokens

```css
/* Unified surface system */
--surface-1: 0 0% 100%;           /* Light: white, Dark: #212121 */
--surface-2: 0 0% 98%;            /* Light: off-white, Dark: #181818 */
--surface-3: 0 0% 96.1%;          /* Light: muted, Dark: #303030 */
```

**Mapping:**
- `--card` → `--surface-1`
- `--background` → `--surface-1` (or keep separate)
- `--muted` → `--surface-3`

#### Text Tokens

```css
/* Unified text system */
--text-primary: 0 0% 3.9%;        /* Light: near-black, Dark: white */
--text-secondary: 0 0% 45.1%;     /* Light: gray, Dark: light-gray */
--text-muted: 0 0% 63.9%;         /* Light: medium-gray, Dark: medium-light-gray */
```

**Mapping:**
- `--foreground` → `--text-primary`
- `--muted-foreground` → `--text-secondary`

#### Accent Tokens

```css
/* Unified accent system */
--accent: 0 0% 96.1%;             /* Light: light-gray, Dark: dark-gray */
--accent-hover: 0 0% 89.8%;       /* Light: medium-gray, Dark: medium-dark-gray */
--accent-foreground: 0 0% 9%;      /* Text on accent */
```

---

## Global Theme Initialization Plan

### Implementation Strategy

**Approach:** Enhance `next-themes` Integration

**Decision:** Use `next-themes` as the primary theme system (already integrated) and enhance it with:
1. Verified inline script for FOUC prevention
2. Cleanup unused files
3. Unified hook interface (components already use `useTheme()`)

**Rationale:**
- `next-themes` is already widely used (4+ components)
- Provides SSR-safe theme management
- Handles system preference detection
- Well-maintained library with good Next.js integration

### Phase 1: Verify & Enhance Inline Script

**File:** `apps/web/src/pages/_document.tsx`

**Current State:**
- Script exists and reads from correct localStorage key
- Handles system preference
- Has error handling

**Actions:**
1. ✅ Verify script is positioned before any CSS/font links
2. ✅ Ensure script matches `next-themes` localStorage key (`theme`)
3. ✅ Verify script runs synchronously (IIFE pattern)
4. ✅ Test that script prevents FOUC

**Code Verification:**
```typescript
// Current script (lines 9-33) - VERIFY THIS IS CORRECT
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
          document.documentElement.classList.add('light');
        }
      })();
    `,
  }}
/>
```

**Enhancement (if needed):**
- Add `data-theme` attribute for additional tracking
- Ensure script runs before any stylesheets

### Phase 2: Cleanup Unused Files

**Files to Remove:**
1. **`apps/web/src/components/theme/ThemeProvider.tsx`**
   - ✅ **VERIFIED:** Not imported anywhere in codebase
   - Safe to delete
   - Components use `NextThemesProvider` from `next-themes` directly

2. **`apps/web/src/hooks/useThemePreference.ts`**
   - ✅ **VERIFIED:** Not imported anywhere in codebase
   - Safe to delete
   - Components use `useTheme()` from `next-themes` directly

**Action:** Delete both files to reduce code duplication and maintenance overhead.

### Phase 3: Verify _app.tsx Integration

**File:** `apps/web/src/pages/_app.tsx`

**Current State:**
- Uses `NextThemesProvider` directly (lines 37-42)
- Configured with correct props:
  - `attribute="class"` ✅
  - `defaultTheme="system"` ✅
  - `enableSystem` ✅
  - `disableTransitionOnChange={false}` ✅

**Actions:**
1. ✅ Verify `storageKey` matches inline script (default is `theme` ✅)
2. ✅ Ensure provider wraps all content
3. ✅ Maintain existing I18nProvider structure
4. ✅ Test provider order (I18nProvider → NextThemesProvider → Component)

**Current Structure (VERIFY):**
```typescript
<I18nProvider>
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange={false}
  >
    {/* Component tree */}
  </NextThemesProvider>
</I18nProvider>
```

**Enhancement (if needed):**
- Explicitly set `storageKey="theme"` to match inline script
- Add `enableColorScheme` prop if needed

### Phase 4: Component Verification

**Files to Check:**
1. ✅ `apps/web/src/components/dashboard/UserMenu.tsx` - Uses `useTheme()` ✅
2. ✅ `apps/web/src/components/ui/toggle-theme.tsx` - Uses `useTheme()` ✅
3. ✅ `apps/web/src/components/settings/tabs/GeneralSettings.tsx` - Uses `useTheme()` ✅
4. ✅ `apps/web/src/components/settings/tabs/PersonalizationSettings.tsx` - Uses `useTheme()` ✅

**Actions:**
1. ✅ Verify all components use `useTheme()` from `next-themes`
2. ✅ Ensure `mounted` state handling for SSR (already implemented ✅)
3. ✅ Verify theme switching works correctly
4. ✅ Test system preference detection

**No changes needed** - Components already properly implemented

---

## Implementation Roadmap

### Part A: Global Theme Initialization (Priority: High)

#### Step 1: Verify Current Setup ✅
1. ✅ Review `_document.tsx` inline script
2. ✅ Review `_app.tsx` NextThemesProvider config
3. ✅ Review component usage of `useTheme()`
4. ✅ Identify any conflicts or issues

#### Step 2: Cleanup Unused Code
1. Delete `apps/web/src/components/theme/ThemeProvider.tsx`
2. Delete `apps/web/src/hooks/useThemePreference.ts`
3. Verify no broken imports

#### Step 3: Enhance Inline Script (if needed)
1. Verify script position in `<Head>` (before CSS)
2. Ensure script matches `next-themes` localStorage key
3. Add explicit `storageKey` to NextThemesProvider if needed
4. Test FOUC prevention

#### Step 4: Integration Testing
1. Test all scenarios from Testing & Validation section
2. Verify no console errors
3. Verify no hydration mismatches
4. Verify theme consistency across pages

### Part B: Theme Token Unification (Priority: Medium)

#### Phase 1: Token Consolidation (Week 1)

1. **Remove duplicate chart colors from globals.css**
   - Delete lines 39-43 (light mode HSL chart colors)
   - Delete lines 86-90 (dark mode HSL chart colors)
   - Keep OKLCH definitions in theme.css

2. **Add surface tokens to globals.css**
   ```css
   .dark {
     --surface-1: 0 0% 12.9%;      /* #212121 */
     --surface-2: 0 0% 9.4%;       /* #181818 */
     --surface-3: 0 0% 18.8%;      /* #303030 */
   }
   ```

3. **Add border opacity tokens**
   ```css
   --border-opacity-20: 0.2;
   --border-opacity-40: 0.4;
   ```

4. **Remove duplicate custom colors**
   - Remove `--color-sidebar` (duplicate of `--sidebar-background`)
   - Remove `--color-background` (duplicate of `--background`)
   - Add `--color-chat-input` to Tailwind config or use `--surface-3`

#### Phase 2: Component Migration (Week 2)

1. **Replace hardcoded dark mode colors:**
   - `dark:bg-[#212121]` → `dark:bg-surface-1`
   - `dark:bg-[#181818]` → `dark:bg-surface-2`
   - `dark:bg-[#303030]` → `dark:bg-surface-3`
   - `dark:border-[#2d2d2d]` → `dark:border-border-dark`

2. **Update Tailwind config:**
   ```typescript
   colors: {
     // ... existing colors
     surface: {
       '1': 'hsl(var(--surface-1))',
       '2': 'hsl(var(--surface-2))',
       '3': 'hsl(var(--surface-3))',
     },
     'border-dark': 'hsl(var(--border-dark))',
     'border-hover': 'hsl(var(--border-hover))',
   }
   ```

3. **Files to update (52 instances across 11 files):**
   - `apps/web/src/components/auth/unified-auth-form.tsx` (7 instances)
   - `apps/web/src/components/auth/dashboard-preview.tsx` (4 instances)
   - `apps/web/src/components/ui/chatgpt-prompt-input.tsx` (15+ instances)
   - `apps/web/src/components/ui/navbar.tsx` (1 instance)
   - `apps/web/src/components/ui/card.tsx` (1 instance)
   - `apps/web/src/components/settings/*` (24+ instances across 9 files)

#### Phase 3: Brand Color Migration to OKLCH (Week 3)

1. **Convert brand colors to OKLCH:**
   ```css
   --brand-primary: oklch(0.55 0.22 250);
   --brand-tiger-primary: oklch(0.65 0.22 25);
   --brand-twilight: oklch(0.55 0.22 280);
   ```

2. **Update Tailwind config to support OKLCH:**
   ```typescript
   colors: {
     brand: {
       primary: 'oklch(var(--brand-primary))',
       // ... etc
     }
   }
   ```

#### Phase 4: Cleanup (Week 4)

1. Remove unused custom color tokens
2. Audit and remove unused brand gradient tokens
3. Standardize shadow patterns
4. Update component documentation

---

## Testing & Validation

### Global Theme Initialization Tests

#### 1. FOUC Prevention
- [ ] Open app in incognito/private window
- [ ] Verify no flash of wrong theme on initial load
- [ ] Check browser DevTools → Network → Disable cache → Reload
- [ ] Verify theme applies before CSS loads

#### 2. Theme Persistence
- [ ] Set theme to "Dark" → Refresh page → Verify stays dark
- [ ] Set theme to "Light" → Refresh page → Verify stays light
- [ ] Set theme to "System" → Refresh page → Verify respects system preference
- [ ] Clear localStorage → Verify defaults to system preference

#### 3. System Preference Detection
- [ ] Set theme to "System"
- [ ] Change OS theme (dark/light)
- [ ] Verify app theme updates automatically
- [ ] Test on macOS, Windows, Linux

#### 4. SSR Compatibility
- [ ] View page source → Verify no theme class in HTML (SSR)
- [ ] Check browser console → No hydration mismatches
- [ ] Verify theme applies on client-side hydration

#### 5. Cross-Tab Sync
- [ ] Open app in two tabs
- [ ] Change theme in Tab 1
- [ ] Verify Tab 2 updates automatically

#### 6. Component Integration
- [ ] Test theme switch from UserMenu
- [ ] Test theme switch from ToggleTheme component
- [ ] Test theme switch from Settings → General
- [ ] Test theme switch from Settings → Personalization
- [ ] Verify all components show correct theme state

#### 7. Navigation & Routing
- [ ] Navigate Dashboard → Settings → Verify theme persists
- [ ] Navigate Settings → Dashboard → Verify theme persists
- [ ] Navigate to Chat → Verify theme persists
- [ ] Use browser back/forward → Verify theme persists

#### 8. Edge Cases
- [ ] Test with localStorage disabled
- [ ] Test with JavaScript disabled (should show light theme)
- [ ] Test with slow 3G connection (verify no flash)
- [ ] Test with browser extensions that modify localStorage

### Theme Token Unification Tests

- [ ] Verify no visual regressions after token migration
- [ ] Test all components in light/dark mode
- [ ] Verify chart colors render correctly (OKLCH)
- [ ] Test theme switching (light → dark → system)
- [ ] Verify no FOUC (Flash of Unstyled Content)
- [ ] Test cross-browser compatibility (OKLCH support)
- [ ] Verify Tailwind config changes don't break builds

---

## Success Criteria

### Global Theme Initialization

✅ **No FOUC:** Theme applies before CSS loads  
✅ **Persistence:** Theme persists across page refreshes  
✅ **System Preference:** Respects OS theme when set to "system"  
✅ **SSR Compatible:** No hydration mismatches  
✅ **Cross-Tab Sync:** Theme changes sync across tabs  
✅ **Component Integration:** All theme switchers work correctly  
✅ **Navigation:** Theme persists during client-side navigation  
✅ **Unified:** Single source of truth (next-themes)  

### Theme Token Unification

✅ **No Hardcoded Colors:** All colors use semantic tokens  
✅ **No Duplicates:** Chart colors defined once (OKLCH)  
✅ **Consistent Format:** Brand colors migrated to OKLCH  
✅ **Unified Tokens:** Surface, text, and accent systems implemented  
✅ **Documentation:** Token usage guide created  

---

## Files to Modify

### High Priority (Global Theme Init)

1. **`apps/web/src/pages/_document.tsx`**
   - Verify inline script position and logic
   - Ensure script runs before CSS

2. **`apps/web/src/pages/_app.tsx`**
   - Verify NextThemesProvider configuration
   - Add explicit `storageKey` if needed

3. **Delete: `apps/web/src/components/theme/ThemeProvider.tsx`**
   - Not imported anywhere, safe to remove

4. **Delete: `apps/web/src/hooks/useThemePreference.ts`**
   - Not imported anywhere, safe to remove

### Medium Priority (Token Unification)

5. **`apps/web/src/styles/globals.css`**
   - Remove duplicate chart colors (lines 39-43, 86-90)
   - Add surface tokens (`--surface-1`, `--surface-2`, `--surface-3`)
   - Add border tokens (`--border-dark`, `--border-hover`)
   - Remove duplicate custom colors

6. **`apps/web/tailwind.config.ts`**
   - Add surface color mappings
   - Add border color mappings
   - Update brand colors to support OKLCH

7. **`apps/web/src/styles/theme.css`**
   - Migrate brand colors to OKLCH format

8. **Component Files (52 instances across 11 files):**
   - Replace hardcoded colors with tokens
   - See Phase 2: Component Migration for full list

### Low Priority (Documentation)

9. Create token usage guide
10. Document gradient system
11. Update component style guide

---

## Risk Assessment

### Low Risk ✅
- Verifying existing implementation
- Removing unused files (verified not imported)
- Adding new surface tokens (additive change)
- Removing duplicate chart colors (OKLCH takes precedence)
- Standardizing shadow patterns (cosmetic)

### Medium Risk ⚠️
- Migrating hardcoded colors to tokens (requires testing)
- Converting brand colors to OKLCH (may affect color rendering)
- **Mitigation:** Thorough testing, gradual rollout

### High Risk ❌
- None identified

---

## Timeline Estimate

### Part A: Global Theme Initialization
- **Step 1-2:** Verification & Cleanup (1 hour)
- **Step 3:** Enhancement (30 minutes)
- **Step 4:** Testing (2-3 hours)

**Total:** 3.5-4.5 hours

### Part B: Theme Token Unification
- **Phase 1:** Token Consolidation (2-3 hours)
- **Phase 2:** Component Migration (4-6 hours)
- **Phase 3:** Brand Color Migration (2-3 hours)
- **Phase 4:** Cleanup & Documentation (2-3 hours)

**Total:** 10-15 hours

### Combined Timeline
**Total:** 13.5-19.5 hours (approximately 2-3 days)

---

## Decision Points

### ✅ Decision 1: Custom ThemeProvider.tsx - RESOLVED
**Question:** Keep or remove `ThemeProvider.tsx`?  
**Answer:** ✅ **Remove** - Verified not imported anywhere  
**Action:** Delete `apps/web/src/components/theme/ThemeProvider.tsx`

### ✅ Decision 2: useThemePreference Hook - RESOLVED
**Question:** Keep or remove `useThemePreference.ts`?  
**Answer:** ✅ **Remove** - Verified not imported anywhere  
**Action:** Delete `apps/web/src/hooks/useThemePreference.ts`

### ⏳ Decision 3: Inline Script Enhancement
**Question:** Enhance inline script or keep as-is?  
**Recommendation:** Verify current script is sufficient, enhance only if issues found during testing

---

## Proposed Final Token Structure

```css
/* Unified theme system structure */

/* Base semantic tokens (HSL for compatibility) */
--background, --foreground, --card, --popover, --primary, --secondary, --muted, --accent, --destructive, --border, --input, --ring

/* Surface system (HSL) */
--surface-1, --surface-2, --surface-3

/* Brand colors (OKLCH for better color science) */
--brand-primary, --brand-tiger-primary, --brand-twilight

/* Sidebar system (HSL) */
--sidebar-background, --sidebar-foreground, --sidebar-primary, --sidebar-accent, --sidebar-border, --sidebar-ring

/* Chart colors (OKLCH) */
--chart-1 through --chart-5

/* Border variants (HSL) */
--border-dark, --border-hover, --border-opacity-20, --border-opacity-40
```

---

## Next Steps

1. **Review this comprehensive plan** with team/stakeholders
2. **Execute Part A** (Global Theme Initialization) - High Priority
3. **Execute Part B** (Theme Token Unification) - Medium Priority
4. **Test thoroughly** using testing checklists
5. **Document** final architecture and token usage

---

## Notes

- `next-themes` is a well-maintained library specifically designed for Next.js
- The inline script in `_document.tsx` is critical for FOUC prevention
- Current implementation appears mostly correct, needs verification and cleanup
- Focus on testing and validation rather than major refactoring
- OKLCH provides better color consistency than HSL for brand colors
- Surface tokens will eliminate 52 hardcoded color instances

---

**Plan Status:** Ready for Implementation  
**Last Updated:** 2025-01-06  
**Version:** 1.0


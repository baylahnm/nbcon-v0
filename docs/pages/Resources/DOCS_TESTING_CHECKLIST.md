# Docs Enhancement Testing Checklist

## Manual Testing Guide

This document provides a comprehensive checklist for testing all implemented features in the documentation system.

## Prerequisites

1. **Start Development Server**
   ```bash
   pnpm --filter @nbcon/web dev
   ```

2. **Apply Database Migration**
   - Ensure Supabase migration `20251128000001_create_docs_feedback_table.sql` is applied
   - Verify table exists: `docs_feedback`

3. **Open Browser**
   - Navigate to `http://localhost:3000/docs`
   - Open browser DevTools (F12)
   - Check Console for errors
   - Check Network tab for API calls

## Testing Steps

### 1. Feedback Widget Testing

**Test Page**: `/docs/get-started/welcome`

1. **Visual Check**
   - [ ] Scroll to bottom of page
   - [ ] Verify "Was this page helpful?" text appears
   - [ ] Verify thumbs up/down buttons are visible
   - [ ] Verify buttons show count badges (if feedback exists)

2. **Functionality**
   - [ ] Click thumbs up button
   - [ ] Verify toast notification appears: "Thank you! Your feedback helps us improve our documentation."
   - [ ] Verify button becomes highlighted (green background)
   - [ ] Verify "Add Comment" button appears
   - [ ] Click "Add Comment" button
   - [ ] Verify dialog opens
   - [ ] Type a comment and submit
   - [ ] Verify comment submits successfully
   - [ ] Check Network tab: POST request to `/api/docs/feedback` should succeed

3. **Stats Display**
   - [ ] Refresh page
   - [ ] Verify helpful/not helpful counts display correctly
   - [ ] Check Network tab: GET request to `/api/docs/feedback?slug=...` should succeed

4. **Edge Cases**
   - [ ] Navigate to `/docs` (index page)
   - [ ] Verify feedback widget does NOT appear
   - [ ] Navigate to a doc page
   - [ ] Verify feedback widget appears

### 2. Code Block Enhancements Testing

**Test Page**: `/docs/get-started/welcome` (has multiple code blocks)

1. **Visual Check**
   - [ ] Verify code blocks have header bar
   - [ ] Verify language badge appears (e.g., "Bash")
   - [ ] Verify "Show lines" button appears for multi-line code
   - [ ] Verify copy button appears (hover to see)

2. **Copy Functionality**
   - [ ] Click copy button on a code block
   - [ ] Verify toast notification: "Copied! Code copied to clipboard"
   - [ ] Paste clipboard content - verify code matches
   - [ ] Verify copy icon changes to checkmark temporarily

3. **Line Numbers**
   - [ ] Click "Show lines" button
   - [ ] Verify line numbers appear on left
   - [ ] Verify code content aligns correctly
   - [ ] Click again to hide lines
   - [ ] Verify line numbers disappear

4. **Language Badge**
   - [ ] Verify language badge shows friendly name (e.g., "Bash" not "bash")
   - [ ] Test with different languages (TypeScript, JavaScript, etc.)

### 3. Breadcrumbs Navigation Testing

**Test Page**: `/docs/core/agent`

1. **Visual Check**
   - [ ] Verify breadcrumbs appear above content
   - [ ] Verify structure: Home → Docs → Core → Agent
   - [ ] Verify current page (Agent) is not a link (just text)

2. **Navigation**
   - [ ] Click "Home" breadcrumb
   - [ ] Verify navigates to `/`
   - [ ] Navigate back to doc page
   - [ ] Click "Docs" breadcrumb
   - [ ] Verify navigates to `/docs`
   - [ ] Click "Core" breadcrumb
   - [ ] Verify navigates to `/docs/core` (or first core page)

3. **Edge Cases**
   - [ ] Navigate to `/docs` (index)
   - [ ] Verify breadcrumbs do NOT appear
   - [ ] Navigate to nested page (e.g., `/docs/get-started/welcome`)
   - [ ] Verify all breadcrumb levels appear

### 4. Table of Contents Testing

**Test Page**: `/docs/get-started/welcome` (has multiple headings)

1. **Visual Check**
   - [ ] Verify TOC appears on right sidebar (desktop view)
   - [ ] Verify "On this page" heading
   - [ ] Verify TOC items match page headings
   - [ ] Verify indentation for nested headings (h2, h3)

2. **Functionality**
   - [ ] Click a TOC item
   - [ ] Verify page scrolls to that section smoothly
   - [ ] Scroll page manually
   - [ ] Verify active section highlights in TOC
   - [ ] Verify TOC stays sticky (visible while scrolling)

3. **Scroll Spy**
   - [ ] Scroll through page slowly
   - [ ] Verify TOC highlights change as sections come into view
   - [ ] Verify correct section is highlighted

4. **Edge Cases**
   - [ ] Navigate to page with no headings
   - [ ] Verify TOC does NOT appear
   - [ ] Resize browser to mobile size
   - [ ] Verify TOC is hidden (desktop only feature)

### 5. Related Articles Testing

**Test Page**: `/docs/get-started/welcome`

1. **Visual Check**
   - [ ] Scroll to bottom of page (above feedback widget)
   - [ ] Verify "Related Articles" section appears
   - [ ] Verify article cards display
   - [ ] Verify section badges on cards

2. **Functionality**
   - [ ] Click a related article card
   - [ ] Verify navigates to that article
   - [ ] Verify hover effects work
   - [ ] Verify arrow icon appears on hover

3. **Content Matching**
   - [ ] Verify articles are from same section ("get-started")
   - [ ] Verify current article is NOT in related list
   - [ ] Verify up to 5 articles shown

4. **Edge Cases**
   - [ ] Navigate to page with no related articles
   - [ ] Verify section doesn't appear

### 6. Reading Progress Bar Testing

**Test Page**: Any long doc page

1. **Visual Check**
   - [ ] Verify thin progress bar at very top of page
   - [ ] Verify progress bar uses primary color
   - [ ] Verify progress bar spans full width

2. **Functionality**
   - [ ] Scroll down page slowly
   - [ ] Verify progress bar fills from left to right
   - [ ] Scroll to bottom
   - [ ] Verify progress bar is ~100% full
   - [ ] Scroll back to top
   - [ ] Verify progress bar resets to 0%

3. **Edge Cases**
   - [ ] Navigate to very short page
   - [ ] Verify progress bar still works
   - [ ] Verify progress bar disappears at top/bottom

### 7. Version Selector Testing

**Test Page**: Any doc page

1. **Visual Check**
   - [ ] Verify version selector appears in header
   - [ ] Verify shows "Latest" by default
   - [ ] Verify positioned before "Ask AI" button

2. **Functionality**
   - [ ] Click version selector dropdown
   - [ ] Verify dropdown menu opens
   - [ ] Verify shows available versions (Latest, v1.0)
   - [ ] Click a different version
   - [ ] Verify selection persists
   - [ ] Refresh page
   - [ ] Verify selected version persists (check localStorage)

3. **Edge Cases**
   - [ ] Clear localStorage
   - [ ] Refresh page
   - [ ] Verify defaults to "Latest"

### 8. General UI/UX Testing

1. **Responsive Design**
   - [ ] Test on mobile viewport (< 768px)
   - [ ] Test on tablet viewport (768px - 1024px)
   - [ ] Test on desktop viewport (> 1024px)
   - [ ] Verify all features work appropriately for each size

2. **Keyboard Shortcuts**
   - [ ] Press ⌘K (Mac) or Ctrl+K (Windows)
   - [ ] Verify search modal opens
   - [ ] Type search query
   - [ ] Verify results appear
   - [ ] Press Escape
   - [ ] Verify modal closes

3. **Accessibility**
   - [ ] Use screen reader (VoiceOver/NVDA)
   - [ ] Verify all buttons have aria-labels
   - [ ] Verify navigation landmarks are correct
   - [ ] Verify keyboard navigation works
   - [ ] Verify focus indicators are visible

4. **Performance**
   - [ ] Check page load time
   - [ ] Verify no console errors
   - [ ] Verify API calls complete successfully
   - [ ] Check Network tab for failed requests

5. **Cross-browser Testing**
   - [ ] Test in Chrome
   - [ ] Test in Firefox
   - [ ] Test in Safari
   - [ ] Test in Edge

## API Testing

### Feedback API

**Endpoint**: `POST /api/docs/feedback`

```bash
curl -X POST http://localhost:3000/api/docs/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "pageSlug": "get-started/welcome",
    "helpful": true,
    "comment": "Test comment"
  }'
```

**Expected Response**: `201 Created` with feedback object

**Endpoint**: `GET /api/docs/feedback?slug=get-started/welcome`

**Expected Response**: `200 OK` with stats object:
```json
{
  "pageSlug": "get-started/welcome",
  "helpfulCount": 5,
  "notHelpfulCount": 2,
  "totalCount": 7
}
```

## Database Verification

### Check Feedback Table

```sql
-- Verify table exists
SELECT * FROM docs_feedback LIMIT 10;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'docs_feedback';

-- Test insert (should work for anonymous users)
INSERT INTO docs_feedback (page_slug, helpful, comment)
VALUES ('test-page', true, 'Test feedback');
```

## Known Issues & Notes

- Version selector currently stores preference in localStorage only
- Full version routing (URL-based) not yet implemented
- TOC only appears on desktop (hidden on mobile)
- Reading progress bar may not appear on very short pages

## Bug Fixes Applied

### Fixed: TOC Selector Error (2025-01-28)
**Issue**: `querySelectorAll` failed with invalid CSS selector for headings containing special characters (parentheses, periods, etc.)

**Fix Applied**:
- Added `escapeSelector()` function to escape CSS special characters
- Improved ID generation to sanitize special characters from heading text
- IDs now properly sanitized: special chars removed, spaces converted to hyphens

**Files Modified**:
- `apps/web/src/hooks/useTOC.ts` - Added ID sanitization and CSS selector escaping

### Fixed: Mobile Sidebar Empty Dialog (2025-01-28)
**Issue**: Mobile sidebar drawer opened but appeared empty because `SidebarDocs` component had `hidden lg:block` classes that hid it on mobile screens.

**Fix Applied**:
- Added `variant` prop to `SidebarDocs` component (`"desktop" | "mobile"`)
- Conditionally apply visibility classes based on variant:
  - Mobile: `block` (always visible)
  - Desktop: `hidden lg:block` (hidden on mobile, visible on large screens)
- Updated `SidebarDocsMobile` to pass `variant="mobile"` prop
- Adjusted border and height classes for mobile variant

**Files Modified**:
- `apps/web/src/components/docs/SidebarDocs.tsx` - Added variant prop and conditional classes
- `apps/web/src/components/docs/SidebarDocsMobile.tsx` - Pass variant="mobile" prop

**Testing**:
- [ ] Mobile sidebar drawer opens and shows navigation items
- [ ] Desktop sidebar still works correctly (hidden on mobile, visible on desktop)
- [ ] Navigation links work in mobile drawer
- [ ] Drawer closes when navigating to a page

## Success Criteria

All features should:
- ✅ Work without JavaScript errors
- ✅ Be accessible via keyboard navigation
- ✅ Have proper ARIA labels
- ✅ Work responsively across devices
- ✅ Submit data successfully to API
- ✅ Display feedback/notifications appropriately
- ✅ Persist user preferences where applicable


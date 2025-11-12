# Docs Page Enhancement Plan (`/docs`)

## Overview
Comprehensive enhancement plan for the documentation system to improve user experience, searchability, and engagement. This plan follows a phased approach with clear priorities and implementation steps.

## 📋 Assignment Rules

**Focus Areas:**

1. **Solution-First:** Always provide actionable code solutions, not just descriptions
2. **Code Examples:** Include complete, copy-paste ready code blocks
3. **Validation First:** Verify current codebase structure before proposing changes
4. **Single Source of Truth:** Centralize all plan/pricing configs
5. **SAR Consistency:** All pricing displays must use SAR currency
6. **Enterprise Handling:** Enterprise plans should route to contact, not checkout
7. **Use MCP When Needed:** Leverage Model Context Protocol (MCP) tools for database queries, file operations, and codebase exploration
8. **Browser Tools for Testing:** Use browser automation tools for testing UI flows and validating interactions

**When Implementing:**
- Check existing files before creating new ones
- Use TypeScript types for all configs
- Use MCP for database schema verification, migration checks, and Supabase operations
- Use browser tools to test UI components in real browser environment

## Current State Analysis

### ✅ Implemented Features
- **Documentation Structure**: MDX content support, working
- **Navigation System**: Header and sidebar navigation working
- **Search Functionality**: ✅ IMPLEMENTED
  - Search modal with keyboard shortcut (Cmd/Ctrl + K)
  - Fuse.js fuzzy search integration
  - Search results display
  - Placeholder: "Search docs..."
- **Header Navigation**: ✅ TESTED & WORKING
  - Logo: "nbcon.ai" (links to home)
  - Navigation links: "Docs", "API", "Learn"
  - Search button: "Search docs..." with ⌘K shortcut
  - Ask AI button: "Ask AI" with ⌘I shortcut (placeholder)
  - Theme toggle (Sun/Moon icon)
  - Language toggle: "AR" / "EN"
  - Sign in link: "Sign in" (links to `/auth/login`)
- **Sidebar Navigation**: ✅ WORKING
  - Collapsible sections
  - Active page highlighting
  - Sticky sidebar
  - Mobile sidebar

### ⚠️ Areas for Improvement
- User feedback system (not implemented)
- Code block enhancements (copy button, line numbers) - ⚠️ Basic CodeBlock exists, needs enhancement
- Breadcrumbs navigation
- Table of Contents
- Related articles
- Reading progress
- Version management

### 📁 Existing Files & Structure
- **CodeBlock.tsx**: ✅ EXISTS at `apps/web/src/components/docs/CodeBlock.tsx` (basic implementation, needs enhancement)
- **DocsLayout.tsx**: ✅ EXISTS at `apps/web/src/components/docs/DocsLayout.tsx` (main layout wrapper)
- **NavbarDocs.tsx**: ✅ EXISTS at `apps/web/src/components/docs/NavbarDocs.tsx` (header navigation)
- **SidebarDocs.tsx**: ✅ EXISTS at `apps/web/src/components/docs/SidebarDocs.tsx` (sidebar navigation)
- **FAQ Feedback Pattern**: ✅ EXISTS at `apps/web/src/components/faq/FAQFeedback.tsx` (reference implementation)
- **API Pattern**: ✅ EXISTS at `apps/web/src/pages/api/faq/feedback.ts` (reference for docs feedback API)
- **Docs Data**: ✅ EXISTS at `apps/web/src/lib/docs-data.ts` (doc metadata structure)
- **Migration Pattern**: Latest migration is `20251127000001_create_user_credits.sql` - use sequential numbering
- **Doc Pages**: Docs are TSX pages in `apps/web/src/pages/docs/`, not MDX files

## Implementation Plan

### Phase 1: Core Enhancements (High Priority)

#### 1.1 Feedback Widget System
**Priority**: HIGHEST  
**Estimated Time**: 2-3 hours  
**Dependencies**: Supabase database

**Implementation Steps:**
1. **Database Schema** (Supabase MCP)
   - Create `docs_feedback` table
   - Fields: `id`, `page_slug`, `user_id`, `helpful`, `comment`, `created_at`
   - RLS policies (anyone can create, users can view own)
   - Indexes for performance

2. **TypeScript Types**
   - Create `apps/web/src/types/docs.ts`
   - Define `DocsFeedback` interface

3. **API Endpoints**
   - `POST /api/docs/feedback` - Submit feedback
   - `GET /api/docs/feedback/stats?slug=...` - Get feedback stats (optional)

4. **Components**
   - `apps/web/src/components/docs/FeedbackWidget.tsx`
   - Similar to FAQ feedback widget
   - Thumbs up/down buttons
   - Optional comment field
   - Toast notifications

5. **Integration**
   - Add FeedbackWidget to doc page template
   - Place at bottom of each doc page

**Files to Create:**
- `supabase/migrations/20251128000001_create_docs_feedback_table.sql` ✅ CREATED
- `apps/web/src/types/docs.ts` ✅ CREATED
- `apps/web/src/pages/api/docs/feedback.ts` ✅ CREATED
- `apps/web/src/components/docs/FeedbackWidget.tsx` ✅ CREATED

**Files to Update:**
- `apps/web/src/components/docs/DocsLayout.tsx` ✅ UPDATED (integrated FeedbackWidget)

**Reference Files:**
- `apps/web/src/components/faq/FAQFeedback.tsx` - Use as pattern reference
- `apps/web/src/pages/api/faq/feedback.ts` - Use as API pattern reference

#### 1.2 Code Block Enhancements
**Priority**: HIGH  
**Estimated Time**: 2-3 hours  
**Dependencies**: None

**Implementation Steps:**
1. **Enhanced CodeBlock Component**
   - ⚠️ **EXISTS**: `apps/web/src/components/docs/CodeBlock.tsx` (basic version)
   - **ENHANCE**: Add copy button (use native Clipboard API)
   - **ENHANCE**: Add line numbers toggle
   - **ENHANCE**: Add language display badge
   - **ENHANCE**: Improve styling and UX
   - Note: Docs use TSX pages, not MDX, so integration will be in component usage

2. **Features:**
   - Copy button with success feedback (toast notification)
   - Line numbers (optional, toggleable via prop)
   - Language badge (show language name)
   - Better code block styling
   - Code diff view support (for future)

3. **Integration**
   - Update existing CodeBlock component
   - Ensure it's used in doc pages (check current usage)
   - May need to update individual doc pages to use enhanced version

**Files to Update:**
- `apps/web/src/components/docs/CodeBlock.tsx` ✅ ENHANCED

#### 1.3 Breadcrumbs Navigation
**Priority**: HIGH  
**Estimated Time**: 1-2 hours  
**Dependencies**: Doc structure metadata

**Implementation Steps:**
1. **Breadcrumbs Component**
   - Create `apps/web/src/components/docs/Breadcrumbs.tsx`
   - Parse current path to generate breadcrumbs
   - Use shadcn Breadcrumb component

2. **Integration**
   - Add to `DocsLayout.tsx` component (below NavbarDocs, above main content)
   - Or add to individual doc pages
   - Place below header, above content
   - Use `getDocBySlug()` from `@/lib/docs-data` to get doc metadata

**Files to Create:**
- `apps/web/src/components/docs/Breadcrumbs.tsx` ✅ CREATED

**Files to Update:**
- `apps/web/src/components/docs/DocsLayout.tsx` ✅ UPDATED (Breadcrumbs integrated)

**Integration Point:**
- `apps/web/src/components/docs/DocsLayout.tsx` - Breadcrumbs added above content

#### 1.4 Table of Contents
**Priority**: MEDIUM-HIGH  
**Estimated Time**: 3-4 hours  
**Dependencies**: MDX content parsing

**Implementation Steps:**
1. **TOC Component**
   - Create `apps/web/src/components/docs/TableOfContents.tsx`
   - Auto-generate from MDX headings (h2, h3)
   - Scroll spy to highlight current section
   - Sticky positioning

2. **Features:**
   - Auto-detect headings from content
   - Smooth scroll to sections
   - Active section highlighting
   - Mobile drawer version

3. **Integration**
   - Add to `DocsLayout.tsx` component
   - Right sidebar on desktop (modify layout to support 3-column: sidebar | content | TOC)
   - Drawer on mobile (use mobile menu pattern)
   - Parse headings from doc content (TSX pages, not MDX)

**Files to Create:**
- `apps/web/src/components/docs/TableOfContents.tsx` ✅ CREATED
- `apps/web/src/hooks/useTOC.ts` ✅ CREATED (for scroll spy)

**Files to Update:**
- `apps/web/src/components/docs/DocsLayout.tsx` ✅ UPDATED (TOC sidebar integrated)

**Integration Point:**
- `apps/web/src/components/docs/DocsLayout.tsx` - TOC appears on right sidebar (desktop only)

### Phase 2: Enhanced Features (Medium Priority)

#### 2.1 Related Articles
**Priority**: MEDIUM  
**Estimated Time**: 2-3 hours  
**Dependencies**: Doc metadata (tags, categories)

**Implementation Steps:**
1. **Database Schema** (if needed)
   - Add tags/categories to doc metadata
   - Or use file-based metadata

2. **RelatedArticles Component**
   - Create `apps/web/src/components/docs/RelatedArticles.tsx`
   - Match by tags/categories
   - Show 3-5 related articles
   - Display as cards

3. **Integration**
   - Add to bottom of doc pages
   - Below FeedbackWidget
   - Use `getAllDocs()` from `@/lib/docs-data` to get all docs
   - Match by `section` field from `DocMeta` interface

**Files to Create:**
- `apps/web/src/components/docs/RelatedArticles.tsx` ✅ CREATED
- `apps/web/src/hooks/useRelatedDocs.ts` ✅ CREATED

**Files to Update:**
- `apps/web/src/components/docs/DocsLayout.tsx` ✅ UPDATED (RelatedArticles integrated)

**Integration Point:**
- `apps/web/src/components/docs/DocsLayout.tsx` - RelatedArticles appears above FeedbackWidget

#### 2.2 Reading Progress Bar
**Priority**: MEDIUM  
**Estimated Time**: 1-2 hours  
**Dependencies**: None

**Implementation Steps:**
1. **ReadingProgress Component**
   - Create `apps/web/src/components/docs/ReadingProgress.tsx`
   - Track scroll position
   - Calculate percentage
   - Display progress bar at top

2. **Features:**
   - Thin progress bar at top of page
   - Updates on scroll
   - Smooth animation

**Files to Create:**
- `apps/web/src/components/docs/ReadingProgress.tsx` ✅ CREATED
- `apps/web/src/hooks/useReadingProgress.ts` ✅ CREATED

**Files to Update:**
- `apps/web/src/components/docs/DocsLayout.tsx` ✅ UPDATED (ReadingProgress integrated)

**Integration Point:**
- `apps/web/src/components/docs/DocsLayout.tsx` - ReadingProgress fixed at top (above NavbarDocs)

#### 2.3 Version Selector
**Priority**: MEDIUM  
**Estimated Time**: 2-3 hours  
**Dependencies**: Version management system

**Implementation Steps:**
1. **Version Management**
   - Create version metadata structure
   - Store versions in database or config

2. **VersionSelector Component**
   - Create `apps/web/src/components/docs/VersionSelector.tsx`
   - Dropdown in header
   - Show current version
   - Switch between versions

3. **Integration**
   - Add to `NavbarDocs.tsx` component (in header)
   - Update URLs to include version (e.g., `/docs/v1.0/get-started/welcome`)
   - Update `docs-data.ts` to support version filtering

**Files to Create:**
- `apps/web/src/components/docs/VersionSelector.tsx` ✅ CREATED
- `apps/web/src/config/docs-versions.ts` ✅ CREATED

**Files to Update:**
- `apps/web/src/components/docs/NavbarDocs.tsx` ✅ UPDATED (VersionSelector integrated)

**Integration Point:**
- `apps/web/src/components/docs/NavbarDocs.tsx` - VersionSelector appears in header (before Ask AI button)

### Phase 3: Advanced Features (Low Priority)

#### 3.1 Search Enhancements
**Priority**: LOW (basic search already works)
**Estimated Time**: 4-5 hours  
**Dependencies**: Algolia (optional)

**Enhancements:**
- Search result highlighting
- Autocomplete suggestions
- Search history
- Filter by section
- Popular searches

#### 3.2 Personalization
**Priority**: LOW  
**Estimated Time**: 3-4 hours  
**Dependencies**: User authentication

**Features:**
- Reading history
- Favorite pages
- Customizable sidebar
- Bookmark functionality

#### 3.3 Interactive Examples
**Priority**: LOW  
**Estimated Time**: 5-6 hours  
**Dependencies**: Code execution environment

**Features:**
- Live code editors
- Code playground
- Interactive tutorials
- Step-by-step guides

## Technical Implementation Details

### Database Schema (Supabase)

```sql
-- Docs Feedback Table
-- Migration: 20251128000001_create_docs_feedback_table.sql
CREATE TABLE docs_feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  helpful boolean NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_docs_feedback_page ON docs_feedback(page_slug);
CREATE INDEX idx_docs_feedback_user ON docs_feedback(user_id);

-- RLS Policies
ALTER TABLE docs_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can create feedback
CREATE POLICY "Anyone can create feedback"
  ON docs_feedback FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON docs_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow public to view aggregated stats (for stats endpoint)
CREATE POLICY "Public can view feedback stats"
  ON docs_feedback FOR SELECT
  TO authenticated, anon
  USING (true);
```

### TypeScript Types

```typescript
// apps/web/src/types/docs.ts
export interface DocsFeedback {
  id: string;
  pageSlug: string;
  userId?: string;
  helpful: boolean;
  comment?: string;
  createdAt: string;
}

export interface DocPage {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  version?: string;
  lastUpdated?: string;
}
```

### File Structure

```
apps/web/src/
  components/docs/
    CodeBlock.tsx ✅ ENHANCED (copy button, line numbers, language badge)
    DocsLayout.tsx ✅ EXISTS ✅ UPDATED (FeedbackWidget integrated)
    NavbarDocs.tsx ✅ EXISTS
    SidebarDocs.tsx ✅ EXISTS
    FeedbackWidget.tsx ✅ CREATED
    Breadcrumbs.tsx ✅ CREATED
    TableOfContents.tsx ✅ CREATED
    RelatedArticles.tsx ✅ CREATED
    ReadingProgress.tsx ✅ CREATED
    VersionSelector.tsx ✅ CREATED
  hooks/
    useTOC.ts ✅ CREATED
    useReadingProgress.ts ✅ CREATED
    useRelatedDocs.ts ✅ CREATED
  pages/api/docs/
    feedback.ts ✅ CREATED
  types/
    docs.ts ✅ CREATED
  lib/
    docs-data.ts ✅ EXISTS (doc metadata structure)
supabase/migrations/
  20251128000001_create_docs_feedback_table.sql ✅ CREATED
```

## Implementation Order

### Step 1: Feedback Widget ✅ COMPLETED
1. ✅ Create database migration (`20251128000001_create_docs_feedback_table.sql`)
2. ✅ Create TypeScript types (`apps/web/src/types/docs.ts`)
3. ✅ Create API endpoint (`apps/web/src/pages/api/docs/feedback.ts`) - reference FAQ feedback API
4. ✅ Create FeedbackWidget component - reference FAQFeedback component
5. ✅ Integrate into `DocsLayout.tsx` (automatically detects page slug from router)
6. ⚠️ Test with browser tools (ready for testing)

### Step 2: Code Block Enhancements ✅ COMPLETED
1. ✅ **ENHANCED** existing CodeBlock component
2. ✅ Added copy functionality (Clipboard API with fallback)
3. ✅ Added line numbers (toggleable, shows for multi-line code)
4. ✅ Added language badge (with friendly names)
5. ✅ Improved styling and UX (header bar, hover effects)
6. ⚠️ Ready for testing (backward compatible with existing usage)

### Step 3: Breadcrumbs ✅ COMPLETED
1. ✅ Create Breadcrumbs component
2. ✅ Parse path structure (use `slug` from `DocMeta`, split by `/`)
3. ✅ Use `getDocBySlug()` to get doc metadata for breadcrumb titles
4. ✅ Integrate into `DocsLayout.tsx` (above content, below NavbarDocs)
5. ⚠️ Ready for testing (automatically detects page slug from router)

### Step 4: Table of Contents ✅ COMPLETED
1. ✅ Create TOC component
2. ✅ Implement scroll spy hook (`useTOC.ts`) with Intersection Observer
3. ✅ Auto-generate from headings (uses DOM queries with React refs)
4. ✅ Modify `DocsLayout.tsx` to support 3-column layout (sidebar | content | TOC)
5. ⚠️ Ready for testing (sticky sidebar, scroll spy, smooth scrolling)

### Step 5: Related Articles ✅ COMPLETED
1. ✅ Use existing `section` field from `DocMeta` for matching
2. ✅ Create RelatedArticles component (card-based layout)
3. ✅ Implement matching logic (match by `section`, exclude current doc, fallback to other sections)
4. ✅ Use `getAllDocs()` to get all docs, filter by section
5. ✅ Integrate into `DocsLayout.tsx` (above FeedbackWidget)
6. ⚠️ Ready for testing (shows up to 5 related articles)

### Step 6: Reading Progress ✅ COMPLETED
1. ✅ Create ReadingProgress component
2. ✅ Implement scroll tracking hook (`useReadingProgress.ts`)
3. ✅ Add progress bar (fixed at top, thin 1px bar)
4. ✅ Integrate into `DocsLayout.tsx` (fixed position at top, above NavbarDocs)
5. ⚠️ Ready for testing (smooth progress animation, accessibility support)

### Step 7: Version Selector ✅ COMPLETED
1. ✅ Create version config (`apps/web/src/config/docs-versions.ts`)
2. ✅ Create VersionSelector component (dropdown menu)
3. ⚠️ Version routing: Basic implementation (stores preference in localStorage, ready for URL routing enhancement)
4. ⚠️ Version filtering: Ready for enhancement in `docs-data.ts` when needed
5. ✅ Integrate into `NavbarDocs.tsx` (header dropdown, before Ask AI)
6. ⚠️ Ready for testing (version preference persists in localStorage)

## Testing Strategy

### For Each Feature:
1. **Unit Tests**: Test components in isolation
2. **Integration Tests**: Test with real data
3. **Browser Testing**: Use browser tools to verify UI (see `DOCS_TESTING_CHECKLIST.md`)
4. **User Testing**: Verify UX flows

### Testing Documentation
- **Comprehensive Testing Guide**: See `docs/pages/Resources/DOCS_TESTING_CHECKLIST.md`
- **Manual Testing Steps**: Detailed checklist for each feature
- **API Testing**: curl commands for API endpoints
- **Database Verification**: SQL queries to verify data

### Browser Testing Checklist:

#### ✅ Feature Testing Checklist:

**1. Feedback Widget**
- [ ] Feedback widget appears at bottom of doc pages
- [ ] Thumbs up/down buttons are clickable
- [ ] Feedback submits successfully (check network tab)
- [ ] Toast notification appears after submission
- [ ] Comment dialog opens after feedback submission
- [ ] Comment can be submitted
- [ ] Stats display correctly (helpful/not helpful counts)
- [ ] Widget doesn't appear on index page (`/docs`)

**2. Code Block Enhancements**
- [ ] Copy button appears on code blocks
- [ ] Copy button copies code to clipboard
- [ ] Toast notification appears after copy
- [ ] Language badge displays correctly (e.g., "Bash", "TypeScript")
- [ ] "Show lines" button appears for multi-line code
- [ ] Line numbers toggle works correctly
- [ ] Code blocks render correctly with syntax highlighting

**3. Breadcrumbs Navigation**
- [ ] Breadcrumbs appear above content on doc pages
- [ ] Breadcrumbs show: Home → Docs → Section → Page
- [ ] Breadcrumb links navigate correctly
- [ ] Current page is highlighted (not a link)
- [ ] Breadcrumbs don't appear on index page

**4. Table of Contents**
- [ ] TOC appears on right sidebar (desktop)
- [ ] TOC auto-generates from page headings
- [ ] TOC items are clickable and scroll to sections
- [ ] Active section highlights as you scroll
- [ ] TOC is sticky (stays visible while scrolling)
- [ ] TOC doesn't appear if no headings exist

**5. Related Articles**
- [ ] Related articles appear above feedback widget
- [ ] Shows articles from same section
- [ ] Cards are clickable and navigate correctly
- [ ] Section badges display correctly
- [ ] Hover effects work
- [ ] Doesn't appear if no related articles

**6. Reading Progress Bar**
- [ ] Progress bar appears at top of page
- [ ] Progress bar updates as you scroll
- [ ] Progress bar is thin (1px height)
- [ ] Progress bar uses primary color
- [ ] Progress bar disappears at top/bottom

**7. Version Selector**
- [ ] Version selector appears in header
- [ ] Dropdown opens on click
- [ ] Version options are selectable
- [ ] Selected version persists (check localStorage)
- [ ] Current version displays correctly

**8. General UI/UX**
- [ ] All buttons are clickable
- [ ] All links navigate correctly
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Keyboard shortcuts work (⌘K for search)
- [ ] Theme toggle works
- [ ] Language toggle works
- [ ] Accessibility: ARIA labels present
- [ ] No console errors
- [ ] Page loads without errors

## Success Metrics

- **Feedback Widget**: Track helpful/not helpful ratio
- **Code Blocks**: Copy button usage
- **Navigation**: Breadcrumb usage, TOC clicks
- **Related Articles**: Click-through rate
- **Reading Progress**: Average reading completion
- **Search**: Search queries, result clicks

## Future Enhancements

1. **AI Features**
   - AI-powered search
   - Content suggestions
   - Auto-summarization
   - Chatbot integration

2. **Collaboration**
   - Comments on pages
   - Discussion threads
   - Community Q&A

3. **Advanced Features**
   - Offline support
   - PDF export
   - Print optimization
   - Mobile app

4. **Integration**
   - API documentation
   - Code examples integration
   - Video platform integration
   - Community forum integration

## Notes

- All implementations should follow existing patterns (Supabase, TypeScript, shadcn UI)
- Use MCP tools for database operations
- Test each feature before moving to next
- Update this plan as features are completed
- Mark completed items with ✅
- Mark in-progress items with 🚧
- Mark TODO items with ⚠️

## Important Implementation Notes

1. **Doc Structure**: Docs are TSX pages in `apps/web/src/pages/docs/`, not MDX files. Use React components and refs for parsing content.

2. **Integration Points**:
   - `DocsLayout.tsx`: Main layout wrapper - add Breadcrumbs, ReadingProgress, TOC here
   - `NavbarDocs.tsx`: Header navigation - add VersionSelector here
   - Individual doc pages: Add FeedbackWidget, RelatedArticles at bottom

3. **Reference Implementations**:
   - FAQ Feedback: `apps/web/src/components/faq/FAQFeedback.tsx`
   - FAQ API: `apps/web/src/pages/api/faq/feedback.ts`
   - Doc metadata: `apps/web/src/lib/docs-data.ts`

4. **Migration Naming**: Use sequential numbering after latest migration (`20251127000001` → `20251128000001`)

5. **CodeBlock**: Already exists but is basic. Enhance existing component rather than creating new one.

6. **TOC Implementation**: Since docs are TSX, you'll need to:
   - Use React refs to find heading elements
   - Or parse JSX/TSX content to extract headings
   - Or require doc pages to export heading metadata

7. **Related Articles**: Use existing `section` field from `DocMeta` interface for matching related docs.

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

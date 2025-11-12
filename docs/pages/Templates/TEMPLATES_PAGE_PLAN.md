# Templates Page Plan (`/templates/index.tsx`)

## Overview
The main templates aggregation page that displays templates from all 8 categories organized into horizontal scrolling sections: Featured, Newest, Popular, and Recent. This page serves as the entry point for template discovery, inspired by the [21st.dev community components](https://21st.dev/community/components) layout pattern.

## 📋 Assignment Rules
*(Same as other template plans - see CIVIL_TEMPLATES_PLAN.md for details)*

## Reference Design
Based on [21st.dev/community/components](https://21st.dev/community/components):
- **Layout**: Multiple horizontal scrolling sections (no tabs)
- **Sections**: Each section has a header with title and "View all >" link
- **Cards**: Horizontal scrollable row of 3-4 cards per section
- **Design**: Clean, modern card-based layout with preview images
- **Navigation**: "View all" links for each section lead to filtered views

## Page Structure

### Header Section
- **Title**: "Engineering Templates" (or "Templates")
- **Description**: "Explore ready-to-use project blueprints powered by AI agents"
- **Sub-description**: "Community members can create and share templates for their workflows"
- **No Hero Section**: Simple header, no gradient background needed

### Main Content - Horizontal Scrolling Sections

#### Section Pattern (Repeated for each section)
Each section follows this structure:
```
[Section Title]                    [View all >]
[Optional description text]

[← Prev] [Card] [Card] [Card] [Card] [Next →] (horizontal scroll)
```

**Navigation Buttons:**
- **Left Arrow Button** (`←`): Scrolls left to show previous cards
- **Right Arrow Button** (`→`): Scrolls right to show next cards
- **Button Style**: `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:opacity-50`
- **Position**: Absolute positioned on left/right edges of scroll container, or fixed relative to container
- **Visibility**: Show/hide based on scroll position (hide left button at start, hide right button at end)

#### 1. Featured Templates Section
- **Title**: "Featured"
- **Description**: "Curated templates from top creators"
- **Layout**: Horizontal scrolling row (3-4 cards visible)
- **Content**: 6-8 curated featured templates (mixed from all 8 categories)
- **Card Count**: Show 3-4 cards initially, scroll to see more
- **"View all" Link**: Links to `/templates?filter=featured` or similar
- **Icons**: Star icon or similar for featured badge

#### 2. Recent Templates Section
- **Title**: "Recent Templates" (or "Recent")
- **Description**: "Latest templates from all categories"
- **Layout**: Horizontal scrolling row (3-4 cards visible)
- **Content**: 8-12 most recently updated templates (mixed from all 8 categories)
- **Card Count**: Show 3-4 cards initially, scroll to see more
- **"View all" Link**: Links to `/templates?filter=recent` or similar
- **Icons**: Clock icon

#### 3. Newest Templates Section
- **Title**: "Newest"
- **Description**: "Most recently added templates"
- **Layout**: Horizontal scrolling row (3-4 cards visible)
- **Content**: 8-12 most recently created templates (mixed from all 8 categories)
- **Card Count**: Show 3-4 cards initially, scroll to see more
- **"View all" Link**: Links to `/templates?filter=newest` or similar
- **Icons**: Sparkles or new icon

#### 4. Popular Templates Section
- **Title**: "Popular"
- **Description**: "Most viewed and used templates"
- **Layout**: Horizontal scrolling row (3-4 cards visible)
- **Content**: 8-12 most popular templates by usage/views (mixed from all 8 categories)
- **Card Count**: Show 3-4 cards initially, scroll to see more
- **"View all" Link**: Links to `/templates?filter=popular` or similar
- **Icons**: TrendingUp or fire icon

#### 5. Category-Specific Sections (Optional - Future Enhancement)
- **Survey Templates** section
- **GIS Layouts** section
- **Civil Templates** section
- **Electrical Templates** section
- **Mechanical Templates** section
- **Geotechnical Templates** section
- **Environmental Templates** section
- **Finance Templates** section
- Each shows 3-4 templates from that category
- "View all" links to respective category page

### Category Grid Section (Bottom)
- **Title**: "Browse by Category"
- **Description**: "Explore templates organized by engineering discipline"
- **Layout**: Grid layout (4 columns desktop, 2 tablet, 1 mobile)
- **Content**: 8 category cards linking to child pages
- **Cards**: Show category icon, name, description, AI agent badge

## Features

### Core Features
1. **Horizontal Scrolling Sections** - Each section scrolls horizontally to show more templates
2. **Scroll Navigation Buttons** - Left/right arrow buttons for each section to navigate cards
3. **Section Headers** - Title + "View all" link pattern
4. **Mixed Categories** - Each section shows templates from all 8 categories
5. **Template Cards** - Compact card design with preview, title, description, category badge
6. **Category Navigation** - Grid of category cards at bottom
7. **No Tabs** - All sections visible, scroll down to see more

### Template Card Components (shadcn)
- **Card Structure**: 
  ```html
  <li class="group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm w-full aspect-[6/5]">
    <!-- Image Section (Top) -->
    <img class="aspect-square h-full w-full" alt="Template Name" src="preview-image-url" />
    
    <!-- Content Section (Bottom) -->
    <div class="flex-1 flex flex-col justify-center py-1.5 pr-4 min-w-0 text-card-foreground">
      Template Title
    </div>
  </li>
  ```
- **Card Layout**: Vertical layout with image on top, content below
- **Preview Image**: Template preview/screenshot (aspect-square, full width)
- **Card Content**: Title, optional description, category badge
- **Badge**: Category badge, featured badge (positioned on image overlay or content area)
- **Hover Effects**: Group hover effects for card interactions
- **Icons**: Lucide-react icons for categories (optional in content area)

## Design Elements

### Visual Design
- **Layout**: Vertical stack of horizontal scrolling sections
- **Sections**: Clean section headers with title + "View all" link
- **Cards**: Horizontal scrollable container with 3-4 cards visible
- **Card Styling**: 
  - Rounded corners: `rounded-[18px]`
  - Background: `bg-card/60` (semi-transparent card background using theme color system)
  - Backdrop blur: `backdrop-blur-[2px]` (glassmorphism effect)
  - Border: `border border-border/50` (theme-aware border with opacity)
  - Shadow: `shadow-sm` (subtle shadow from theme)
  - Aspect ratio: `aspect-[6/5]` (width:height = 6:5)
  - Overflow: `overflow-hidden` (for rounded corners)
  - Text color: `text-card-foreground` (theme-aware text color)
- **Card Image**: 
  - Aspect ratio: `aspect-square` (1:1)
  - Full width/height: `h-full w-full`
  - Position: Top section of card
- **Card Content**: 
  - Flex layout: `flex-1 flex flex-col justify-center`
  - Padding: `py-1.5 pr-4`
  - Min width: `min-w-0` (for text truncation)
  - Position: Bottom section below image
- **Scroll Behavior**: Smooth horizontal scroll, show scroll indicators
- **Spacing**: Consistent spacing between sections (mb-16 or similar)
- **Typography**: Unified typography classes
- **Colors**: Category-specific colors for badges/icons

### Horizontal Scroll Implementation
- **Container**: `overflow-x-auto` with `scrollbar-hide` or custom scrollbar, relative positioning
- **Card Width**: Fixed width cards based on aspect ratio (e.g., `w-[240px]` for 6/5 aspect ratio = 240px × 200px)
- **Card Styling**: 
  - `group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm w-full aspect-[6/5]`
  - Full width within container: `w-full`
  - Aspect ratio maintained: `aspect-[6/5]`
  - Theme colors: Uses `bg-card`, `border-border`, `text-card-foreground` from theme system
- **Gap**: Consistent gap between cards (`gap-4` or `gap-6`)
- **Scroll Snap**: Optional `scroll-snap-type-x` for smooth scrolling
- **Navigation Buttons**: 
  - Left arrow button (`ChevronLeft` icon) - positioned absolute left
  - Right arrow button (`ChevronRight` icon) - positioned absolute right
  - Button class: `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:opacity-50`
  - Show/hide based on scroll position (use `scrollLeft` and `scrollWidth` checks)
  - Smooth scroll behavior on click

### Responsive Design
- **Mobile**: 
  - Single card visible, swipe to scroll
  - Card width: Full width minus padding (e.g., `w-[calc(100vw-2rem)]`)
  - Aspect ratio maintained: `aspect-[6/5]`
  - Stack sections vertically
- **Tablet**: 
  - 2 cards visible
  - Card width: Fixed (e.g., `w-[240px]` or `min-w-[240px]`)
  - Horizontal scroll for more
- **Desktop**: 
  - 3-4 cards visible
  - Card width: Fixed (e.g., `w-[240px]` or `min-w-[240px]`)
  - Horizontal scroll for more
  - Category grid: 4 columns

## Technical Implementation

### Data Structure
```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: 'survey' | 'gis' | 'civil' | 'electrical' | 'mechanical' | 'geotechnical' | 'environmental' | 'finance';
  subcategory: string;
  tags: string[];
  previewImage: string; // URL to preview image/screenshot
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  views: number;
  featured: boolean;
  agentId?: string | null;
  categoryIcon: React.ComponentType<{ className?: string }>;
  categoryColor: string;
  categoryName: string;
}

interface TemplateSection {
  id: 'featured' | 'recent' | 'newest' | 'popular';
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  templates: Template[];
  viewAllLink: string;
}
```

### Component Dependencies (shadcn/ui)
- `@/components/ui/card` - Template cards (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `@/components/ui/badge` - Categories and featured badges
- `@/components/ui/button` - CTAs, actions, and scroll navigation buttons
- `@/components/ui/avatar` - Author avatars (Avatar, AvatarImage, AvatarFallback)
- `@/components/ui/skeleton` - Loading states
- `@/components/ui/scroll-area` - Optional for horizontal scroll (or use native overflow)
- `lucide-react` - Icons for categories, section headers, and navigation (ChevronLeft, ChevronRight)

### File Structure
```
/templates
  index.tsx ⚠️ NEEDS REDESIGN (horizontal scrolling sections)
  components/
    TemplateCard.tsx ⚠️ TODO (compact horizontal card component)
    TemplateSection.tsx ⚠️ TODO (section wrapper with header + horizontal scroll)
    CategoryCard.tsx ⚠️ TODO (category grid cards)
    HorizontalScrollContainer.tsx ⚠️ TODO (horizontal scroll wrapper with navigation buttons)
    ScrollNavigationButtons.tsx ⚠️ TODO (left/right arrow buttons for scrolling)
  hooks/
    useTemplates.ts ⚠️ TODO (reusable hook for fetching templates)
    useTemplateSections.ts ⚠️ TODO (hook for Featured/Newest/Popular sections)
  types/
    templates.ts ⚠️ TODO (centralized TypeScript types)
```

### API Endpoints
- `GET /api/templates?section=featured` - Get featured templates (mixed categories)
- `GET /api/templates?section=recent` - Get recent templates (mixed categories)
- `GET /api/templates?section=newest` - Get newest templates (mixed categories)
- `GET /api/templates?section=popular` - Get popular templates (mixed categories)
- `GET /api/templates?category={category}` - Filter by category (optional)
- `GET /api/templates?filter={filter}` - Filter by section (for "View all" links)

## Content Strategy

### Section Content
- **Featured**: 6-8 curated templates (ideally 1 per category)
- **Recent**: 8-12 most recently updated templates
- **Newest**: 8-12 most recently created templates
- **Popular**: 8-12 most viewed/used templates

### Card Display
- **Initial Display**: 3-4 cards visible per section
- **Scroll**: Horizontal scroll to see remaining cards
- **Total Cards**: 8-12 cards per section (scroll to see all)

### "View All" Links
- **Featured**: `/templates?filter=featured` or `/templates/featured`
- **Recent**: `/templates?filter=recent` or `/templates/recent`
- **Newest**: `/templates?filter=newest` or `/templates/newest`
- **Popular**: `/templates?filter=popular` or `/templates/popular`

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types (`templates.ts`)
- [ ] Create reusable hooks (`useTemplates.ts`, `useTemplateSections.ts`)
- [ ] Create TemplateCard component with:
  - Card container: `group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm w-full aspect-[6/5]`
  - Image section: `<img class="aspect-square h-full w-full" alt="Template Name" src="preview-image-url">` (top)
  - Content section: `<div class="flex-1 flex flex-col justify-center py-1.5 pr-4 min-w-0 text-card-foreground">Template Title</div>` (bottom)
  - Theme integration: Uses theme color system (`bg-card`, `border-border`, `text-card-foreground`)
- [ ] Create HorizontalScrollContainer component
- [ ] Create TemplateSection component (header + scroll container)

### Phase 2: Section Implementation
- [ ] Create ScrollNavigationButtons component (left/right arrows)
- [ ] Implement scroll position detection logic
- [ ] Implement Featured section with horizontal scroll + navigation buttons
- [ ] Implement Recent section with horizontal scroll + navigation buttons
- [ ] Implement Newest section with horizontal scroll + navigation buttons
- [ ] Implement Popular section with horizontal scroll + navigation buttons
- [ ] Add section headers with "View all" links
- [ ] Add horizontal scroll styling and behavior
- [ ] Add button show/hide logic based on scroll position

### Phase 3: Category Grid
- [ ] Create CategoryCard component
- [ ] Add category grid section at bottom
- [ ] Link to child pages

### Phase 4: API Integration
- [ ] Create API endpoints for sections
- [ ] Connect hooks to API
- [ ] Add loading states (shadcn Skeleton)
- [ ] Add error handling

### Phase 5: Polish
- [ ] Polish navigation button styling and positioning
- [ ] Add smooth scroll animations on button click
- [ ] Add scroll snap behavior
- [ ] Add empty states
- [ ] Add card hover effects and transitions
- [ ] Optimize performance (lazy loading, virtualization if needed)
- [ ] Add preview images for templates (aspect-square, full width)
- [ ] Test button visibility logic (show/hide at start/end)
- [ ] Verify card styling: rounded corners, backdrop blur, shadows
- [ ] Test card aspect ratio (6/5) across different screen sizes
- [ ] Ensure image aspect-square rendering correctly
- [ ] Test theme color system: verify `bg-card/60`, `border-border/50`, `text-card-foreground` work in light/dark modes
- [ ] Verify backdrop blur effect works correctly with theme colors

## Theme Color System

### Card Colors
- **Background**: `bg-card/60` - Semi-transparent card background (uses `--card` CSS variable)
- **Border**: `border-border/50` - Theme-aware border with 50% opacity (uses `--border` CSS variable)
- **Text**: `text-card-foreground` - Theme-aware text color (uses `--card-foreground` CSS variable)
- **Shadow**: `shadow-sm` - Subtle shadow from Tailwind theme

### Theme Variables
- `--card`: Maps to `--surface` in unified theme system
- `--card-foreground`: Maps to `--foreground` in unified theme system
- `--border`: Uses `--chat-input` for consistency
- Automatically adapts to light/dark mode via CSS variables

### Benefits
- Consistent with existing design system
- Automatic dark mode support
- Maintainable through CSS variables
- No hardcoded colors

## Design Reference
- **Inspiration**: [21st.dev/community/components](https://21st.dev/community/components)
- **Pattern**: Horizontal scrolling sections with "View all" links
- **Layout**: Vertical stack of horizontal sections
- **Cards**: Compact, modern card design with preview images
- **Theme**: Uses unified theme color system (`bg-card`, `border-border`, `text-card-foreground`)

---

**Last Updated**: 2025-01-28
**Status**: Planning Phase - Ready for Review
**Reference**: [21st.dev Community Components](https://21st.dev/community/components)

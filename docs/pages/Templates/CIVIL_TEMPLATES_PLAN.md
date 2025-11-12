# Civil Templates Page Plan (`/templates/civil-templates`)

## Overview
A comprehensive template library for civil engineering workflows, providing pre-configured templates for site design, grading, material estimation, and infrastructure projects. These templates help civil engineers quickly start projects with industry-standard workflows and calculations.

## 🤖 AI Agent Integration
- **Agent**: Civil Engineering (`civil`)
- **Agent ID**: `civil`
- **Location**: `packages/ai-core/agentRegistry.ts`
- **Description**: Handles site design, grading, and material estimation
- **Model**: GPT-5
- **Integration**: Templates leverage the Civil AI agent for intelligent calculations, design guidance, and material estimation workflows

## 📋 Assignment Rules

**Focus Areas:**

1. **Solution-First:** Always provide actionable code solutions, not just descriptions

2. **Code Examples:** Include complete, copy-paste ready code blocks

3. **Validation First:** Verify current codebase structure before proposing changes

4. **Single Source of Truth:** Centralize all plan/pricing configs

5. **SAR Consistency:** All pricing displays must use SAR currency

6. **Enterprise Handling:** Enterprise plans should route to contact, not checkout

7. **Use MCP When Needed:** Leverage Model Context Protocol (MCP) tools for database queries, file operations, and codebase exploration when appropriate

8. **Browser Tools for Testing:** Use browser automation tools (MCP browser extension) for testing UI flows, verifying billing pages, and validating user interactions

**When Implementing:**

- Check existing files before creating new ones
- Use TypeScript types for all configs
- Ensure webhook updates both `profiles.subscription_tier` AND `user_credits`
- Test credit enforcement in `useAIAgent` before deployment
- Use MCP for database schema verification, migration checks, and Supabase operations
- Use browser tools to test billing flows, checkout sessions, and UI components in real browser environment

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection`
- **Headline**: "Civil Templates"
- **Description**: "Site design, grading, material estimation, and infrastructure workflows powered by Civil AI agent"
- **CTA**: 
  - Primary: "Browse Templates" (scroll to content)
  - Secondary: "View Documentation" (link to /docs)
- **Background Variant**: "minimal"

### Main Content

#### 1. Template Categories Section
Display templates organized by civil engineering workflow type:

**Site Design Templates**
- Site layout plans
- Grading designs
- Drainage systems
- Road design templates
- Parking lot layouts

**Material Estimation**
- Concrete calculations
- Steel quantity estimation
- Earthwork calculations
- Material cost analysis
- Quantity takeoff templates

**Infrastructure Templates**
- Bridge design workflows
- Highway design templates
- Utility design layouts
- Structural analysis forms
- Retaining wall designs

#### 2. Template Grid
- **Layout**: Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- **Template Cards Include**:
  - Preview image/screenshot
  - Template name
  - Category badge
  - Short description
  - Template type icon
  - Version number
  - Author information
  - Usage count
  - Rating (if available)
  - "Use Template" button
  - "Preview" button

#### 3. Filters & Search
- **Search Bar**: Full-text search across templates
- **Category Filter**: Filter by template type (Site Design, Material Estimation, Infrastructure)
- **Subcategory Filter**: Filter by specific workflow type
- **Sort Options**: 
  - Most Popular
  - Recently Added
  - Highest Rated
  - Alphabetical

#### 4. Template Detail Modal
When clicking "Preview" or template card:
- Full template description
- Use cases and applications
- Technical requirements
- Preview images/screenshots
- Template parameters/configurations
- AI agent integration details
- Installation instructions
- Related templates
- "Use Template" CTA

## Features

### Core Features

1. **Template Display**
   - Grid layout with template cards
   - Category-based organization
   - Template preview functionality
   - Template metadata display

2. **Search & Filter**
   - Full-text search
   - Category filtering
   - Subcategory filtering
   - Sort functionality

3. **Template Usage**
   - "Use Template" button
   - Template cloning/duplication
   - Integration with project creation
   - Template customization options
   - AI agent integration for calculations

4. **Template Details**
   - Detailed template information
   - Preview images
   - Technical specifications
   - Usage instructions
   - Related templates (from same category)
   - AI agent capabilities

5. **Cross-Category Suggestions** (Bottom Section)
   - "You might also like" section
   - 3-4 templates from other categories
   - Based on popularity or related tags
   - Helps discoverability across categories

### Advanced Features

1. **Template Preview**
   - Interactive preview modal
   - Screenshot gallery
   - Video walkthroughs (if available)
   - Live calculation preview (if applicable)

2. **Template Customization**
   - Parameter configuration
   - Calculation customization
   - Form field editing
   - Style customization

3. **Template Management**
   - User favorites
   - Template ratings
   - Usage tracking
   - Version history

## Design Elements

### Visual Design
- **Layout**: Clean grid layout with template cards
- **Cards**: Use shadcn `Card` components with hover effects
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
- **Card Styling**: 
  - Rounded corners: `rounded-[18px]`
  - Background: `bg-card/60` (semi-transparent card background using theme color system)
  - Backdrop blur: `backdrop-blur-[2px]` (glassmorphism effect)
  - Border: `border border-border/50` (theme-aware border with opacity)
  - Shadow: `shadow-sm` (subtle shadow from theme)
  - Aspect ratio: `aspect-[6/5]` (width:height = 6:5)
  - Text color: `text-card-foreground` (theme-aware text color)
- **Badges**: Use shadcn `Badge` component for categories (Site Design: Blue, Material Estimation: Green, Infrastructure: Purple)
- **Icons**: Lucide-react icons for civil engineering types (Building2, Calculator, Road, etc.)
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for category titles
  - `card-title` for template names
  - `body-large` for descriptions
  - `label-text` for metadata

### Color Coding
- **Site Design**: Blue/Primary
- **Material Estimation**: Green
- **Infrastructure**: Purple

### Responsive Design
- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: 3-column grid

## Technical Implementation

### Data Structure
```typescript
interface CivilTemplate {
  id: string;
  name: string;
  description: string;
  category: 'site-design' | 'material-estimation' | 'infrastructure';
  subcategory: string;
  tags: string[];
  previewImage: string;
  screenshots?: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  version: string;
  lastUpdated: Date;
  createdAt: Date;
  usageCount: number;
  rating?: number;
  reviews?: number;
  featured: boolean;
  agentId: 'civil'; // Always 'civil' for Civil Templates
  requirements?: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
    dependencies?: string[];
  };
  configuration?: {
    parameters: TemplateParameter[];
    defaultValues: Record<string, any>;
    agentIntegration?: {
      agentId: 'civil';
      enabled: boolean;
      useCases?: string[];
    };
  };
  files?: {
    name: string;
    type: string;
    url: string;
    size: number;
  }[];
  documentation?: string;
  relatedTemplates?: string[];
  useCases?: string[];
  technicalSpecs?: {
    calculationTypes?: string[];
    units?: string;
    standards?: string[];
  };
}
```

### File Structure
```
/templates/civil-templates
  index.tsx ⚠️ PLACEHOLDER (needs full implementation)
  [id].tsx ⚠️ TODO (template detail page)
  components/
    TemplateCard.tsx ⚠️ TODO (uses Card, Badge, Button, Avatar)
    TemplateFilter.tsx ⚠️ TODO (uses Input, Select, Badge)
    TemplatePreview.tsx ⚠️ TODO (preview modal using Dialog)
    CategoryFilter.tsx ⚠️ TODO (uses Badge, Button)
    TemplateGrid.tsx ⚠️ TODO (grid layout component)
    CivilHero.tsx ⚠️ TODO (uses SimpleHeroSection)
  hooks/
    useCivilTemplates.ts ⚠️ TODO (reusable hook with filtering, utilities)
  types/
    civil-templates.ts ⚠️ TODO (TypeScript types - can extend templates.ts)
```

### Component Dependencies (shadcn/ui)
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Template cards (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `@/components/ui/badge` - Categories and tags
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Search input
- `@/components/ui/select` - Filter dropdowns (Select, SelectTrigger, SelectContent, SelectItem)
- `@/components/ui/dialog` - Preview modal (Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription)
- `@/components/ui/avatar` - Author avatars (Avatar, AvatarImage, AvatarFallback)
- `@/components/ui/scroll-area` - Scrollable content
- `@/components/ui/tabs` - Section tabs (Tabs, TabsList, TabsTrigger, TabsContent)
- `@/components/ui/separator` - Visual separators
- `@/components/ui/skeleton` - Loading states
- `lucide-react` - Icons (Building2, Calculator, Road, etc.)

### API Endpoints
- `GET /api/templates?category=civil` - List civil templates
- `GET /api/templates/civil/[id]` - Get single civil template
- `POST /api/templates/civil/[id]/use` - Use template (create project)
- `GET /api/templates/civil/categories` - List civil categories

## Content Strategy

### Template Categories & Counts

**Site Design Templates** (5-7 templates)
- Site layout plans (2-3 templates)
- Grading designs (2-3 templates)
- Drainage systems (1 template)

**Material Estimation** (5-7 templates)
- Concrete calculations (2-3 templates)
- Steel quantity estimation (2-3 templates)
- Earthwork calculations (1 template)

**Infrastructure Templates** (5-6 templates)
- Bridge design workflows (2 templates)
- Highway design templates (2 templates)
- Utility design layouts (1-2 templates)

### Template Guidelines
- Clear, descriptive names
- Detailed descriptions with use cases
- High-quality preview images
- Complete technical specifications
- AI agent integration details
- Step-by-step usage instructions
- Related templates suggestions

## SEO & Analytics

### SEO
- Meta tags optimized for civil templates
- Structured data (SoftwareApplication schema)
- Sitemap inclusion
- Open Graph tags
- Canonical URLs

### Analytics
- Template views
- Template usage
- Search queries
- Category popularity
- User engagement
- AI agent usage

## Success Metrics

- Template page views
- Template usage count
- User engagement time
- Search usage
- Template ratings
- User favorites
- AI agent integration usage

## Integration Points

1. **Project System**
   - Create project from template
   - Template integration in projects
   - Template updates sync

2. **AI Agent System**
   - Civil AI agent integration
   - Calculation assistance
   - Design guidance

3. **User System**
   - User favorites
   - Usage tracking
   - Template ratings

4. **Documentation**
   - Link to relevant docs
   - Template documentation
   - Usage guides

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types (extend `templates.ts` or create `civil-templates.ts`)
- [ ] Create reusable hook (`useCivilTemplates.ts`)
- [ ] Create shared components (TemplateCard, TemplateGrid, TemplateSearch)
- [ ] Update hero section with SimpleHeroSection

### Phase 2: Template Display
- [ ] Implement template grid layout
- [ ] Add template cards with all metadata
- [ ] Add category filtering
- [ ] Add search functionality
- [ ] Add sort functionality

### Phase 3: Template Details
- [ ] Create template detail modal
- [ ] Add preview images/screenshots
- [ ] Add template information display
- [ ] Add AI agent integration display
- [ ] Add "Use Template" functionality

### Phase 4: API Integration
- [ ] Create API endpoints
- [ ] Connect hooks to API
- [ ] Add usage tracking
- [ ] Add favorites functionality

### Phase 5: Advanced Features
- [ ] Add template preview
- [ ] Add template customization
- [ ] Add template ratings
- [ ] Add related templates (same category)
- [ ] Add "You might also like" cross-category suggestions section
- [ ] Add AI agent integration

## Future Enhancements

1. **Template Builder**
   - Visual template builder for civil workflows
   - Custom calculation field creation
   - Workflow customization

2. **Template Marketplace**
   - Community-contributed templates
   - Template sharing
   - Template reviews

3. **Advanced Features**
   - Template versioning
   - Template updates notifications
   - Template dependencies
   - Integration with CAD software

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

---

**Last Updated**: 2025-01-28
**Status**: Planning Phase


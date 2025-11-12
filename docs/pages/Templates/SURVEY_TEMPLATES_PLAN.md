# Survey Templates Page Plan (`/templates/survey-templates`)

## Overview
A comprehensive template library for survey engineering workflows, providing pre-configured blueprints for GNSS, LiDAR, photogrammetry, and field survey operations. These templates help surveyors quickly start projects with industry-standard workflows and forms.

## 🤖 AI Agent Integration
- **Agent**: Survey Engineering (`survey`)
- **Agent ID**: `survey`
- **Location**: `packages/ai-core/agentRegistry.ts`
- **Description**: Processes GNSS, LiDAR, and topographic datasets
- **Model**: GPT-5
- **Integration**: Templates leverage the Survey AI agent for intelligent workflow generation, data processing guidance, and survey analysis

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
- **Headline**: "Survey Templates"
- **Description**: "Pre-configured blueprints for GNSS, LiDAR, photogrammetry, and field survey workflows"
- **CTA**: 
  - Primary: "Browse Templates" (scroll to content)
  - Secondary: "View Documentation" (link to /docs)
- **Background Variant**: "minimal"

### Main Content

#### 1. Template Categories Section
Display templates organized by survey type:

**GNSS Survey Templates**
- Static GNSS surveys
- RTK/RTN surveys
- Network adjustments
- Control point establishment
- Baseline processing workflows

**LiDAR Templates**
- Point cloud processing
- Classification workflows
- DTM/DSM generation
- Feature extraction
- Contour generation

**Photogrammetry Templates**
- Aerial triangulation
- Orthomosaic generation
- 3D model creation
- Volume calculations
- Stereo compilation workflows

**Field Survey Forms**
- Field notes templates
- Instrument setup forms
- Quality control checklists
- Data collection workflows
- Observation recording forms

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
- **Category Filter**: Filter by survey type (GNSS, LiDAR, Photogrammetry, Field Forms)
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

4. **Template Details**
   - Detailed template information
   - Preview images
   - Technical specifications
   - Usage instructions
   - Related templates (from same category)

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
   - Live demo (if applicable)

2. **Template Customization**
   - Parameter configuration
   - Workflow customization
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
- **Badges**: Use shadcn `Badge` component for categories (GNSS: Blue, LiDAR: Green, Photogrammetry: Purple, Field Forms: Orange)
- **Icons**: Lucide-react icons for survey types
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for category titles
  - `card-title` for template names
  - `body-large` for descriptions
  - `label-text` for metadata

### Color Coding
- **GNSS Templates**: Blue/Primary
- **LiDAR Templates**: Green
- **Photogrammetry Templates**: Purple
- **Field Forms**: Orange

### Responsive Design
- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: 3-column grid

## Technical Implementation

### Data Structure
```typescript
interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  category: 'gnss' | 'lidar' | 'photogrammetry' | 'field-forms';
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
  requirements?: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
    dependencies?: string[];
  };
  configuration?: {
    parameters: TemplateParameter[];
    defaultValues: Record<string, any>;
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
    coordinateSystem?: string;
    datum?: string;
    units?: string;
    precision?: string;
  };
}
```

### File Structure
```
/templates/survey-templates
  index.tsx ⚠️ PLACEHOLDER (needs full implementation)
  [id].tsx ⚠️ TODO (template detail page)
  components/
    TemplateCard.tsx ⚠️ TODO (uses Card, Badge, Button, Avatar)
    TemplateFilter.tsx ⚠️ TODO (uses Input, Select, Badge)
    TemplatePreview.tsx ⚠️ TODO (preview modal using Dialog)
    CategoryFilter.tsx ⚠️ TODO (uses Badge, Button)
    TemplateGrid.tsx ⚠️ TODO (grid layout component)
    SurveyHero.tsx ⚠️ TODO (uses SimpleHeroSection)
  hooks/
    useSurveyTemplates.ts ⚠️ TODO (reusable hook with filtering, utilities)
  types/
    survey-templates.ts ⚠️ TODO (TypeScript types - can extend templates.ts)
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
- `lucide-react` - Icons (Navigation, Map, Camera, FileText, etc.)

### API Endpoints
- `GET /api/templates?category=survey` - List survey templates
- `GET /api/templates/survey/[id]` - Get single survey template
- `POST /api/templates/survey/[id]/use` - Use template (create project)
- `GET /api/templates/survey/categories` - List survey categories

## Content Strategy

### Template Categories & Counts

**GNSS Survey Templates** (5-8 templates)
- Static GNSS surveys (2-3 templates)
- RTK/RTN surveys (2-3 templates)
- Network adjustments (1-2 templates)

**LiDAR Templates** (5-8 templates)
- Point cloud processing (2-3 templates)
- Classification workflows (2-3 templates)
- DTM/DSM generation (1-2 templates)

**Photogrammetry Templates** (5-8 templates)
- Aerial triangulation (2-3 templates)
- Orthomosaic generation (2-3 templates)
- 3D model creation (1-2 templates)

**Field Survey Forms** (5-6 templates)
- Field notes templates (2 templates)
- Instrument setup forms (1-2 templates)
- Quality control checklists (1-2 templates)

### Template Guidelines
- Clear, descriptive names
- Detailed descriptions with use cases
- High-quality preview images
- Complete technical specifications
- Step-by-step usage instructions
- Related templates suggestions

## SEO & Analytics

### SEO
- Meta tags optimized for survey templates
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

## Success Metrics

- Template page views
- Template usage count
- User engagement time
- Search usage
- Template ratings
- User favorites

## Integration Points

1. **Project System**
   - Create project from template
   - Template integration in projects
   - Template updates sync

2. **User System**
   - User favorites
   - Usage tracking
   - Template ratings

3. **Documentation**
   - Link to relevant docs
   - Template documentation
   - Usage guides

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types (extend `templates.ts` or create `survey-templates.ts`)
- [ ] Create reusable hook (`useSurveyTemplates.ts`)
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

## Future Enhancements

1. **Template Builder**
   - Visual template builder for survey workflows
   - Custom form field creation
   - Workflow customization

2. **Template Marketplace**
   - Community-contributed templates
   - Template sharing
   - Template reviews

3. **Advanced Features**
   - Template versioning
   - Template updates notifications
   - Template dependencies
   - Integration with survey instruments

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


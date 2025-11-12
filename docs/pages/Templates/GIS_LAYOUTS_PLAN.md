# GIS Layouts Page Plan (`/templates/gis-layouts`)

## Overview
A comprehensive template library for Geographic Information System (GIS) workflows, providing pre-configured layouts for mapping dashboards, base map setups, spatial analysis, and data collection. These templates help GIS professionals quickly create interactive maps and spatial analysis workflows.

## 🤖 AI Agent Integration
- **Agent**: GIS Analysis (`gis`)
- **Agent ID**: `gis`
- **Location**: `packages/ai-core/agentRegistry.ts`
- **Description**: Analyzes spatial data and creates mapping outputs
- **Model**: GPT-5
- **Integration**: Templates leverage the GIS AI agent for spatial analysis guidance, map configuration recommendations, and geospatial data processing

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
- **Headline**: "GIS Layouts"
- **Description**: "Mapping dashboards, base map setups, and spatial analysis layouts ready for use"
- **CTA**: 
  - Primary: "Browse Layouts" (scroll to content)
  - Secondary: "View Documentation" (link to /docs)
- **Background Variant**: "minimal"

### Main Content

#### 1. Layout Categories Section
Display layouts organized by GIS workflow type:

**Mapping Dashboards**
- Interactive web maps
- Data visualization dashboards
- Real-time monitoring layouts
- Multi-layer map configurations
- Custom map widgets

**Base Map Setups**
- Topographic base maps
- Satellite imagery layouts
- Street map configurations
- Custom coordinate systems
- Projection templates

**Spatial Analysis Layouts**
- Buffer analysis templates
- Overlay analysis workflows
- Network analysis setups
- Terrain analysis configurations
- Proximity analysis templates

**Data Collection Forms**
- Field data collection apps
- Mobile GIS forms
- Attribute entry templates
- GPS data collection workflows
- Survey form integrations

#### 2. Layout Grid
- **Layout**: Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- **Layout Cards Include**:
  - Preview image/screenshot
  - Layout name
  - Category badge
  - Short description
  - Layout type icon
  - Version number
  - Author information
  - Usage count
  - Rating (if available)
  - "Use Layout" button
  - "Preview" button

#### 3. Filters & Search
- **Search Bar**: Full-text search across layouts
- **Category Filter**: Filter by layout type (Dashboards, Base Maps, Analysis, Data Collection)
- **Subcategory Filter**: Filter by specific workflow type
- **Map Provider Filter**: Filter by map provider (OpenStreetMap, Google Maps, Mapbox, etc.)
- **Sort Options**: 
  - Most Popular
  - Recently Added
  - Highest Rated
  - Alphabetical

#### 4. Layout Detail Modal
When clicking "Preview" or layout card:
- Full layout description
- Use cases and applications
- Technical requirements
- Preview images/screenshots
- Map configuration options
- Layer setup instructions
- Related layouts
- "Use Layout" CTA

## Features

### Core Features

1. **Layout Display**
   - Grid layout with layout cards
   - Category-based organization
   - Layout preview functionality
   - Layout metadata display

2. **Search & Filter**
   - Full-text search
   - Category filtering
   - Subcategory filtering
   - Map provider filtering
   - Sort functionality

3. **Layout Usage**
   - "Use Layout" button
   - Layout cloning/duplication
   - Integration with project creation
   - Layout customization options

4. **Layout Details**
   - Detailed layout information
   - Preview images
   - Technical specifications
   - Usage instructions
   - Related layouts (from same category)

5. **Cross-Category Suggestions** (Bottom Section)
   - "You might also like" section
   - 3-4 layouts from other categories
   - Based on popularity or related tags
   - Helps discoverability across categories

### Advanced Features

1. **Layout Preview**
   - Interactive preview modal
   - Screenshot gallery
   - Video walkthroughs (if available)
   - Live map preview (if applicable)

2. **Layout Customization**
   - Map provider selection
   - Layer configuration
   - Widget customization
   - Style customization
   - Coordinate system selection

3. **Layout Management**
   - User favorites
   - Layout ratings
   - Usage tracking
   - Version history

## Design Elements

### Visual Design
- **Layout**: Clean grid layout with layout cards
- **Cards**: Use shadcn `Card` components with hover effects
- **Card Structure**: 
  ```html
  <li class="group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm w-full aspect-[6/5]">
    <!-- Image Section (Top) -->
    <img class="aspect-square h-full w-full" alt="Layout Name" src="preview-image-url" />
    
    <!-- Content Section (Bottom) -->
    <div class="flex-1 flex flex-col justify-center py-1.5 pr-4 min-w-0 text-card-foreground">
      Layout Title
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
- **Badges**: Use shadcn `Badge` component for categories (Dashboards: Blue, Base Maps: Green, Analysis: Purple, Data Collection: Orange)
- **Icons**: Lucide-react icons for GIS types (Map, Layers, Compass, etc.)
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for category titles
  - `card-title` for layout names
  - `body-large` for descriptions
  - `label-text` for metadata

### Color Coding
- **Mapping Dashboards**: Blue/Primary
- **Base Map Setups**: Green
- **Spatial Analysis**: Purple
- **Data Collection**: Orange

### Responsive Design
- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: 3-column grid

## Technical Implementation

### Data Structure
```typescript
interface GISLayout {
  id: string;
  name: string;
  description: string;
  category: 'dashboards' | 'base-maps' | 'analysis' | 'data-collection';
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
    mapProvider?: 'openstreetmap' | 'google' | 'mapbox' | 'esri';
  };
  configuration?: {
    mapProvider?: string;
    coordinateSystem?: string;
    defaultLayers?: string[];
    widgets?: string[];
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
  relatedLayouts?: string[];
  useCases?: string[];
  technicalSpecs?: {
    coordinateSystem?: string;
    projection?: string;
    units?: string;
    extent?: {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    };
  };
}
```

### File Structure
```
/templates/gis-layouts
  index.tsx ⚠️ PLACEHOLDER (needs full implementation)
  [id].tsx ⚠️ TODO (layout detail page)
  components/
    LayoutCard.tsx ⚠️ TODO (uses Card, Badge, Button, Avatar)
    LayoutFilter.tsx ⚠️ TODO (uses Input, Select, Badge)
    LayoutPreview.tsx ⚠️ TODO (preview modal using Dialog)
    CategoryFilter.tsx ⚠️ TODO (uses Badge, Button)
    LayoutGrid.tsx ⚠️ TODO (grid layout component)
    GISHero.tsx ⚠️ TODO (uses SimpleHeroSection)
  hooks/
    useGISLayouts.ts ⚠️ TODO (reusable hook with filtering, utilities)
  types/
    gis-layouts.ts ⚠️ TODO (TypeScript types - can extend templates.ts)
```

### Component Dependencies (shadcn/ui)
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Layout cards (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `@/components/ui/badge` - Categories and tags
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Search input
- `@/components/ui/select` - Filter dropdowns (Select, SelectTrigger, SelectContent, SelectItem)
- `@/components/ui/dialog` - Preview modal (Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription)
- `@/components/ui/avatar` - Author avatars (Avatar, AvatarImage, AvatarFallback)
- `@/components/ui/scroll-area` - Scrollable content
- `@/components/ui/tabs` - Section tabs
- `@/components/ui/separator` - Visual separators
- `@/components/ui/skeleton` - Loading states
- `lucide-react` - Icons (Map, Layers, Compass, Navigation, etc.)

### API Endpoints
- `GET /api/templates?category=gis` - List GIS layouts
- `GET /api/templates/gis/[id]` - Get single GIS layout
- `POST /api/templates/gis/[id]/use` - Use layout (create project)
- `GET /api/templates/gis/categories` - List GIS categories
- `GET /api/templates/gis/map-providers` - List available map providers

## Content Strategy

### Layout Categories & Counts

**Mapping Dashboards** (5-8 layouts)
- Interactive web maps (2-3 layouts)
- Data visualization dashboards (2-3 layouts)
- Real-time monitoring layouts (1-2 layouts)

**Base Map Setups** (5-8 layouts)
- Topographic base maps (2-3 layouts)
- Satellite imagery layouts (2-3 layouts)
- Street map configurations (1-2 layouts)

**Spatial Analysis Layouts** (5-9 layouts)
- Buffer analysis templates (2-3 layouts)
- Overlay analysis workflows (2-3 layouts)
- Network analysis setups (1-3 layouts)

**Data Collection Forms** (5-6 layouts)
- Field data collection apps (2-3 layouts)
- Mobile GIS forms (2-3 layouts)

### Layout Guidelines
- Clear, descriptive names
- Detailed descriptions with use cases
- High-quality preview images
- Complete technical specifications
- Map configuration details
- Step-by-step usage instructions
- Related layouts suggestions

## SEO & Analytics

### SEO
- Meta tags optimized for GIS layouts
- Structured data (SoftwareApplication schema)
- Sitemap inclusion
- Open Graph tags
- Canonical URLs

### Analytics
- Layout views
- Layout usage
- Search queries
- Category popularity
- User engagement

## Success Metrics

- Layout page views
- Layout usage count
- User engagement time
- Search usage
- Layout ratings
- User favorites

## Integration Points

1. **Project System**
   - Create project from layout
   - Layout integration in projects
   - Layout updates sync

2. **Map Providers**
   - Integration with map services
   - Map provider selection
   - API key management

3. **User System**
   - User favorites
   - Usage tracking
   - Layout ratings

4. **Documentation**
   - Link to relevant docs
   - Layout documentation
   - Usage guides

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types (extend `templates.ts` or create `gis-layouts.ts`)
- [ ] Create reusable hook (`useGISLayouts.ts`)
- [ ] Create shared components (LayoutCard, LayoutGrid, LayoutSearch)
- [ ] Update hero section with SimpleHeroSection

### Phase 2: Layout Display
- [ ] Implement layout grid layout
- [ ] Add layout cards with all metadata
- [ ] Add category filtering
- [ ] Add search functionality
- [ ] Add sort functionality
- [ ] Add map provider filtering

### Phase 3: Layout Details
- [ ] Create layout detail modal
- [ ] Add preview images/screenshots
- [ ] Add layout information display
- [ ] Add "Use Layout" functionality

### Phase 4: API Integration
- [ ] Create API endpoints
- [ ] Connect hooks to API
- [ ] Add usage tracking
- [ ] Add favorites functionality

### Phase 5: Advanced Features
- [ ] Add layout preview
- [ ] Add layout customization
- [ ] Add layout ratings
- [ ] Add related layouts (same category)
- [ ] Add "You might also like" cross-category suggestions section
- [ ] Add map provider integration

## Future Enhancements

1. **Layout Builder**
   - Visual layout builder for GIS workflows
   - Map layer configuration
   - Widget customization
   - Style editor

2. **Layout Marketplace**
   - Community-contributed layouts
   - Layout sharing
   - Layout reviews

3. **Advanced Features**
   - Layout versioning
   - Layout updates notifications
   - Layout dependencies
   - Integration with GIS software

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


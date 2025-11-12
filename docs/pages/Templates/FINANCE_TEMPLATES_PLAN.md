# Finance Templates Page Plan (`/templates/finance-templates`)

## Overview
A comprehensive template library for financial workflows, providing pre-configured templates for cost estimation, budget management, and financial analysis. These templates are created by the community and are workflow-agnostic, designed to work across all engineering domains.

## 🤖 AI Agent Integration
- **Agent**: None (Community Templates)
- **Agent ID**: `null`
- **Note**: Finance templates are community-contributed and workflow-agnostic. They don't require AI agent integration but can be used alongside any AI agent for project financial management.

## 📋 Assignment Rules
*(Same as other template plans - see CIVIL_TEMPLATES_PLAN.md for details)*

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection`
- **Headline**: "Finance Templates"
- **Description**: "Financial workflows, cost estimation, and budget management templates created by the community"
- **CTA**: 
  - Primary: "Browse Templates" (scroll to content)
  - Secondary: "View Documentation" (link to /docs)
- **Background Variant**: "minimal"

### Main Content

#### Template Categories
- **Cost Estimation Templates** - Project cost breakdowns, budget templates, cost tracking forms, financial reports
- **Budget Management** - Budget planning templates, expense tracking, financial dashboards, reporting workflows
- **Financial Analysis** - ROI calculations, cash flow analysis, financial projections, investment analysis

#### Template Grid
- Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Template cards with preview, metadata, and "Use Template" button
- Community badge indicator

#### Filters & Search
- Full-text search
- Category filtering (Cost Estimation, Budget Management, Financial Analysis)
- Sort options (Most Popular, Recently Added, Highest Rated, Alphabetical)
- Community contributor filter

## Features

### Core Features
1. Template display with grid layout
2. Search & filter functionality
3. Template usage (workflow-agnostic)
4. Template details modal with preview
5. Community contribution features

### Advanced Features
1. Template preview with interactive demos
2. Template customization with parameter configuration
3. Template management (favorites, ratings, usage tracking)
4. Community contributor profiles
5. Template sharing and export
6. Cross-category suggestions ("You might also like" section with 3-4 templates from other categories)

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

### Color Coding
- **Cost Estimation**: Green
- **Budget Management**: Blue/Primary
- **Financial Analysis**: Purple

### Icons
- Lucide-react icons: DollarSign, TrendingUp, PieChart, etc.

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
- `@/components/ui/tabs` - Section tabs
- `@/components/ui/separator` - Visual separators
- `@/components/ui/skeleton` - Loading states
- `lucide-react` - Icons (DollarSign, TrendingUp, PieChart, etc.)

## Technical Implementation

### Data Structure
```typescript
interface FinanceTemplate {
  id: string;
  name: string;
  description: string;
  category: 'cost-estimation' | 'budget-management' | 'financial-analysis';
  agentId: null; // No AI agent for finance templates
  isCommunityTemplate: true;
  contributor: {
    id: string;
    name: string;
    avatar: string;
    verified?: boolean;
  };
  // ... (same structure as CivilTemplate)
}
```

### File Structure
```
/templates/finance-templates
  index.tsx ⚠️ PLACEHOLDER
  [id].tsx ⚠️ TODO
  components/ ⚠️ TODO
  hooks/ ⚠️ TODO
  types/ ⚠️ TODO
```

### API Endpoints
- `GET /api/templates?category=finance`
- `GET /api/templates/finance/[id]`
- `POST /api/templates/finance/[id]/use`
- `POST /api/templates/finance/contribute` - Community contribution endpoint

## Content Strategy

### Template Categories & Counts
- **Cost Estimation Templates** (3-5 templates)
- **Budget Management** (3-5 templates)
- **Financial Analysis** (4-5 templates)

### Community Guidelines
- Clear contribution guidelines
- Template review process
- Quality standards
- Version control

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types
- [ ] Create reusable hook (`useFinanceTemplates.ts`)
- [ ] Create shared components
- [ ] Update hero section
- [ ] Add community contribution UI

### Phase 2-5: Same as Civil Templates
- [ ] Template display
- [ ] Template details
- [ ] API integration
- [ ] Advanced features
- [ ] Community contribution system

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


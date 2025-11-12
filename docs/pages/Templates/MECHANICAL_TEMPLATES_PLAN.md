# Mechanical Templates Page Plan (`/templates/mechanical-templates`)

## Overview
A comprehensive template library for mechanical engineering workflows, providing pre-configured templates for HVAC calculations, piping analysis, and mechanical system designs. These templates help mechanical engineers quickly start projects with industry-standard workflows and calculations.

## 🤖 AI Agent Integration
- **Agent**: Mechanical Engineering (`mechanical`)
- **Agent ID**: `mechanical`
- **Location**: `packages/ai-core/agentRegistry.ts`
- **Description**: Performs HVAC load calculations and piping analysis
- **Model**: GPT-5
- **Integration**: Templates leverage the Mechanical AI agent for HVAC calculations, piping analysis, and mechanical system design guidance

## 📋 Assignment Rules
*(Same as other template plans - see CIVIL_TEMPLATES_PLAN.md for details)*

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection`
- **Headline**: "Mechanical Templates"
- **Description**: "HVAC calculations, piping analysis, and mechanical system designs powered by Mechanical AI agent"
- **CTA**: 
  - Primary: "Browse Templates" (scroll to content)
  - Secondary: "View Documentation" (link to /docs)
- **Background Variant**: "minimal"

### Main Content

#### Template Categories
- **HVAC Templates** - Load calculations, ductwork design, equipment selection, energy analysis
- **Piping Templates** - Pipe sizing calculations, hydraulic analysis, P&ID templates, pipe routing layouts
- **Mechanical Systems** - Pump selection, fan sizing, equipment schedules, system diagrams

#### Template Grid
- Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Template cards with preview, metadata, and "Use Template" button

#### Filters & Search
- Full-text search
- Category filtering (HVAC, Piping, Mechanical Systems)
- Sort options (Most Popular, Recently Added, Highest Rated, Alphabetical)

## Features

### Core Features
1. Template display with grid layout
2. Search & filter functionality
3. Template usage with AI agent integration
4. Template details modal with preview

### Advanced Features
1. Template preview with interactive demos
2. Template customization with parameter configuration
3. Template management (favorites, ratings, usage tracking)
4. Cross-category suggestions ("You might also like" section with 3-4 templates from other categories)

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
- **HVAC**: Purple
- **Piping**: Blue/Primary
- **Mechanical Systems**: Green

### Icons
- Lucide-react icons: Cog, Wind, Droplets, etc.

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
- `lucide-react` - Icons (Cog, Wind, Droplets, etc.)

## Technical Implementation

### Data Structure
```typescript
interface MechanicalTemplate {
  id: string;
  name: string;
  description: string;
  category: 'hvac' | 'piping' | 'mechanical-systems';
  agentId: 'mechanical';
  // ... (same structure as CivilTemplate)
}
```

### File Structure
```
/templates/mechanical-templates
  index.tsx ⚠️ PLACEHOLDER
  [id].tsx ⚠️ TODO
  components/ ⚠️ TODO
  hooks/ ⚠️ TODO
  types/ ⚠️ TODO
```

### API Endpoints
- `GET /api/templates?category=mechanical`
- `GET /api/templates/mechanical/[id]`
- `POST /api/templates/mechanical/[id]/use`

## Content Strategy

### Template Categories & Counts
- **HVAC Templates** (5-7 templates)
- **Piping Templates** (5-7 templates)
- **Mechanical Systems** (5-6 templates)

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create TypeScript types
- [ ] Create reusable hook (`useMechanicalTemplates.ts`)
- [ ] Create shared components
- [ ] Update hero section

### Phase 2-5: Same as Civil Templates
- [ ] Template display
- [ ] Template details
- [ ] API integration
- [ ] Advanced features

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


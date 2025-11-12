# Templates Pages Documentation

## Overview
Documentation and plans for template-related pages in nbcon.ai. Templates provide ready-to-use project blueprints powered by AI agents. Templates are workflow-agnostic and designed to work seamlessly with our AI agent system. Community members can create and share templates for their workflows.

## Page Structure

### Templates Page (`/templates/index.tsx`)
The main templates page that aggregates templates from all 8 categories with sections:
- **Recent Templates** - Latest templates from all categories (links to `/templates/recent`)
- **Featured Templates** - Curated featured templates (mixed from all categories)
- **Newest Templates** - Most recently added templates (mixed from all categories)
- **Popular Templates** - Most viewed/used templates (mixed from all categories)

**Design:**
- Uses shadcn/ui components (Tabs, Card, Badge, Button, etc.)
- Optional category filter dropdown/chips above grid
- Each section shows mixed templates from all 8 categories
- Responsive grid layout (3-4 columns desktop, 2 tablet, 1 mobile)

### Child Pages (8 Category Pages)
Each child page shows:
- **Primary Content**: Templates filtered by category only
- **Cross-Category Suggestions**: "You might also like" section at bottom (3-4 templates from other categories)
- Uses shadcn/ui components throughout

## 🤖 AI Agent Integration
Each template category is mapped to a specific AI agent from `agentRegistry.ts`. Templates leverage AI agents for intelligent workflow generation, calculations, and analysis.

## Pages & AI Agent Mappings

| Page | Route | AI Agent | Agent ID |
|------|-------|----------|----------|
| **Survey Templates** | `/templates/survey-templates` | Survey Engineering | `survey` |
| **GIS Layouts** | `/templates/gis-layouts` | GIS Analysis | `gis` |
| **Civil Templates** | `/templates/civil-templates` | Civil Engineering | `civil` |
| **Electrical Templates** | `/templates/electrical-templates` | Electrical Engineering | `electrical` |
| **Mechanical Templates** | `/templates/mechanical-templates` | Mechanical Engineering | `mechanical` |
| **Geotechnical Templates** | `/templates/geotechnical-templates` | Geotechnical Engineering | `geotechnical` |
| **Environmental Templates** | `/templates/environmental-templates` | Environmental Engineering | `environmental` |
| **Finance Templates** | `/templates/finance-templates` | None (Community) | `null` |

### Template Descriptions
- **Survey Templates** - GNSS, LiDAR, photogrammetry, and field survey templates powered by Survey AI agent
- **GIS Layouts** - Mapping dashboards, base map setups, and spatial analysis layouts powered by GIS AI agent
- **Civil Templates** - Site design, grading, material estimation, and infrastructure workflows powered by Civil AI agent
- **Electrical Templates** - Load schedules, panel design, and wiring plans powered by Electrical AI agent
- **Mechanical Templates** - HVAC calculations, piping analysis, and mechanical system designs powered by Mechanical AI agent
- **Geotechnical Templates** - Soil analysis, foundation design, and slope stability workflows powered by Geotechnical AI agent
- **Environmental Templates** - Environmental impact assessments, compliance, and remediation planning powered by Environmental AI agent
- **Finance Templates** - Financial workflows, cost estimation, and budget management templates created by the community (workflow-agnostic)

## Documentation

### Implementation Plans

#### Templates Page Plan
- **[MOTHER_PAGE_PLAN.md](./MOTHER_PAGE_PLAN.md)** - Main templates page (`/templates/index.tsx`)
  - Featured, Newest, Popular sections (mixed categories)
  - Category filter functionality
  - shadcn/ui component usage
  - Implementation checklist

#### Individual Page Plans

**Existing Templates:**
- **[SURVEY_TEMPLATES_PLAN.md](./SURVEY_TEMPLATES_PLAN.md)** - Survey Templates page (`/templates/survey-templates`) → Survey AI Agent
  - GNSS, LiDAR, Photogrammetry, Field Forms templates
  - Technical specifications and workflows
  - AI agent integration details
  - Implementation checklist

- **[GIS_LAYOUTS_PLAN.md](./GIS_LAYOUTS_PLAN.md)** - GIS Layouts page (`/templates/gis-layouts`) → GIS AI Agent
  - Mapping dashboards, base maps, spatial analysis layouts
  - Map provider integrations
  - AI agent integration details
  - Implementation checklist

**New Templates:**
- **[CIVIL_TEMPLATES_PLAN.md](./CIVIL_TEMPLATES_PLAN.md)** - Civil Templates page (`/templates/civil-templates`) → Civil AI Agent
  - Site design, material estimation, infrastructure templates
  - AI agent integration details
  - Implementation checklist

- **[ELECTRICAL_TEMPLATES_PLAN.md](./ELECTRICAL_TEMPLATES_PLAN.md)** - Electrical Templates page (`/templates/electrical-templates`) → Electrical AI Agent
  - Load schedules, panel design, wiring plans
  - AI agent integration details
  - Implementation checklist

- **[MECHANICAL_TEMPLATES_PLAN.md](./MECHANICAL_TEMPLATES_PLAN.md)** - Mechanical Templates page (`/templates/mechanical-templates`) → Mechanical AI Agent
  - HVAC calculations, piping analysis, mechanical systems
  - AI agent integration details
  - Implementation checklist

- **[GEOTECHNICAL_TEMPLATES_PLAN.md](./GEOTECHNICAL_TEMPLATES_PLAN.md)** - Geotechnical Templates page (`/templates/geotechnical-templates`) → Geotechnical AI Agent
  - Soil analysis, foundation design, slope stability
  - AI agent integration details
  - Implementation checklist

- **[ENVIRONMENTAL_TEMPLATES_PLAN.md](./ENVIRONMENTAL_TEMPLATES_PLAN.md)** - Environmental Templates page (`/templates/environmental-templates`) → Environmental AI Agent
  - Impact assessments, compliance, remediation planning
  - AI agent integration details
  - Implementation checklist

- **[FINANCE_TEMPLATES_PLAN.md](./FINANCE_TEMPLATES_PLAN.md)** - Finance Templates page (`/templates/finance-templates`) → Community Templates
  - Cost estimation, budget management, financial analysis
  - Community contribution guidelines
  - Implementation checklist

## Current Status
- ✅ Plan documents updated with shadcn/ui components and recommended structure
- ✅ Templates page plan created (Featured/Newest/Popular sections with mixed categories)
- ✅ Child page plans updated (category-filtered + cross-category suggestions)
- ⚠️ Main templates index page (`/templates`) - Needs redesign per MOTHER_PAGE_PLAN.md
- ⚠️ Survey Templates page - Placeholder (needs full implementation per plan) → Survey AI Agent
- ⚠️ GIS Layouts page - Placeholder (needs full implementation per plan) → GIS AI Agent
- ⚠️ Civil Templates page - Placeholder (needs full implementation per plan) → Civil AI Agent
- ⚠️ Electrical Templates page - Placeholder (needs full implementation per plan) → Electrical AI Agent
- ⚠️ Mechanical Templates page - Placeholder (needs full implementation per plan) → Mechanical AI Agent
- ⚠️ Geotechnical Templates page - Placeholder (needs full implementation per plan) → Geotechnical AI Agent
- ⚠️ Environmental Templates page - Placeholder (needs full implementation per plan) → Environmental AI Agent
- ⚠️ Finance Templates page - Placeholder (needs full implementation per plan) → Community Templates

## Structure
- Page specifications
- Template catalog documentation
- Usage guidelines
- Future enhancement plans
- Database schema
- API endpoints

## Implementation Approach

### Recommended Order
1. **Child Pages First** - Build category-specific pages with template grids, filters, search
2. **Templates Page Second** - Aggregate templates from child pages into Featured/Newest/Popular sections
3. **Shared Components** - Reuse template cards, filters, and search components across all pages

### Design System
- **Components**: Use shadcn/ui components exclusively
- **Child Pages**: Show category-filtered templates + cross-category suggestions
- **Templates Page**: Show mixed templates from all categories in Featured/Newest/Popular sections
- **Category Filter**: Optional dropdown/chips on templates page for filtering sections by category
- **Card Styling**: All template cards use unified theme color system:
  - Background: `bg-card/60` (semi-transparent with backdrop blur)
  - Border: `border-border/50` (theme-aware)
  - Text: `text-card-foreground` (theme-aware)
  - Aspect ratio: `aspect-[6/5]` (6:5 width:height)
  - Rounded corners: `rounded-[18px]`
  - Image: `aspect-square` (1:1) at top, content below
- **Theme Colors**: All plans use unified theme color system (see individual plan documents for details)

## Next Steps
1. Review individual template plan documents for detailed implementation plans
2. Follow Assignment Rules (see individual plan documents) for consistent implementation
3. Implement Phase 1: Foundation (types, hooks, shared components using shadcn/ui)
4. Implement individual template category pages with AI agent integration
5. Add "You might also like" cross-category suggestions to child pages
6. Build templates page with Featured/Newest/Popular sections (mixed categories)
7. Add database schema and API endpoints
8. Integrate AI agents from `agentRegistry.ts` into template workflows
9. Set up community contribution system for Finance templates

## AI Agent Registry
All AI agents are registered in `packages/ai-core/agentRegistry.ts`:
- **Civil** (`civil`) - Site design, grading, material estimation
- **Electrical** (`electrical`) - Load schedules, panel design, wiring plans
- **Mechanical** (`mechanical`) - HVAC calculations, piping analysis
- **Survey** (`survey`) - GNSS, LiDAR, topographic processing
- **GIS** (`gis`) - Spatial analysis, mapping outputs
- **Geotechnical** (`geotechnical`) - Soil analysis, foundation design
- **Environmental** (`environmental`) - Impact assessments, compliance, remediation

See `docs/agents/5-AGENT_PLAYBOOKS.md` and `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` for complete agent system documentation.

---

**Last Updated**: 2025-01-28


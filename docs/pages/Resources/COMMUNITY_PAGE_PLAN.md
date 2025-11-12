# Community Page Plan (`/community`)

## Overview
A comprehensive community hub showcasing projects, events, contributors, and resources for the nbcon.ai community. This page serves as the central hub for community engagement and recognition.

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
- **Headline**: "Join the nbcon.ai Community"
- **Description**: "Connect with developers, share your projects, and contribute to the future of AI-powered engineering"
- **CTA**: 
  - Primary: "Get Started" (links to signup)
  - Secondary: "Join Discord" (external link)
- **Background Variant**: "gradient"

### Main Content Sections

#### 1. Community Showcase
- **Featured Projects**: Highlighted community projects
- **Project Gallery**: Filterable grid of projects
- **Project Cards Include**:
  - Project screenshot/image
  - Project name
  - Description
  - Built by (user/company)
  - Technologies used
  - Link to project
  - Tags/categories

#### 2. Events Section
- **Upcoming Events**: Calendar view or list
- **Event Types**:
  - Meetups
  - Webinars
  - Conferences
  - Workshops
  - Hackathons
- **Event Cards Include**:
  - Event name
  - Date and time
  - Location/Virtual
  - Description
  - Registration link
  - Organizer info

#### 3. Contributors Section
- **Hall of Fame**: Top contributors
- **Contributor Cards Include**:
  - Avatar
  - Name/username
  - Contribution count
  - Contribution types
  - GitHub profile link
  - Bio

#### 4. Resources Section
- **Resource Library**: Downloadable resources
- **Resource Types**:
  - Templates
  - Guides
  - Tools
  - Starter kits
  - Documentation
- **Resource Cards Include**:
  - Resource name
  - Description
  - Type badge
  - Download/view link
  - Author
  - Download count

#### 5. Social Links Section
- **Community Platforms**:
  - Discord server
  - GitHub organization
  - Twitter/X
  - LinkedIn
  - YouTube
  - Reddit
- **Platform Cards**: Icons with links and member counts

#### 6. Community Stats
- **Metrics Display**:
  - Total community members
  - Active projects
  - Contributors
  - Events hosted
  - Resources shared
  - GitHub stars

## Features

### Core Features

1. **Project Showcase**
   - Submit project form
   - Project filtering (by tech, category, date)
   - Project search
   - Featured project rotation
   - Project voting (optional)

2. **Events Calendar**
   - Calendar view
   - List view
   - Filter by event type
   - Event registration
   - Event reminders

3. **Contributor Recognition**
   - Contribution tracking
   - Leaderboard
   - Badge system
   - Contribution history

4. **Resource Library**
   - Resource submission
   - Resource categories
   - Download tracking
   - Resource ratings
   - Version management

5. **Community Guidelines**
   - Code of conduct
   - Contribution guidelines
   - Project submission guidelines
   - Event hosting guidelines

### Advanced Features

1. **Community Map**
   - Geographic distribution
   - Local communities
   - Meetup locations

2. **Achievement System**
   - Badges for contributions
   - Milestone recognition
   - Community levels

3. **Newsletter**
   - Community updates
   - Featured projects
   - Event announcements

## Design Elements

### Visual Design
- **Layout**: Section-based layout with clear hierarchy
- **Cards**: Use shadcn `Card` components with hover effects
- **Stats**: Visual stat displays using `stat-large`, `stat-medium` typography classes
- **Gallery**: Grid layout using responsive grid with filters
- **Colors**: Use theme system colors, vibrant accents for community feel
- **Typography**: Use unified typography classes:
  - `section-heading` for main section titles
  - `subsection-heading` for subsection titles
  - `card-title` for project/event names
  - `body-large` for descriptions
  - `stat-large` for community stats

### Responsive Design
- Mobile: Stacked sections
- Tablet: 2-column grids
- Desktop: Full multi-column layout

## Technical Implementation

### Data Structure
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  author: {
    name: string;
    avatar: string;
    github?: string;
  };
  technologies: string[];
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
}

interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  type: 'meetup' | 'webinar' | 'conference' | 'workshop' | 'hackathon';
  registrationUrl: string;
  organizer: string;
  image?: string;
}

interface Contributor {
  id: string;
  name: string;
  avatar: string;
  github: string;
  contributions: {
    type: 'code' | 'docs' | 'community' | 'events';
    count: number;
  }[];
  bio: string;
}

interface Resource {
  id: string;
  name: string;
  description: string;
  type: 'template' | 'guide' | 'tool' | 'starter-kit' | 'docs';
  downloadUrl: string;
  author: string;
  downloadCount: number;
  tags: string[];
}
```

### File Structure
```
/community
  index.tsx ✅ IMPLEMENTED (main community page with stats, social links, featured content)
  projects/
    index.tsx ✅ IMPLEMENTED (project gallery with filters)
    [id].tsx ⚠️ TODO (project detail page - can be added if needed)
    submit.tsx ⚠️ TODO (submit project form - can be added if needed)
  events/
    index.tsx ✅ IMPLEMENTED (events list with filters)
    [id].tsx ⚠️ TODO (event detail page - can be added if needed)
  contributors/
    index.tsx ✅ IMPLEMENTED (contributors list)
    [id].tsx ⚠️ TODO (contributor profile - can be added if needed)
  resources/
    index.tsx ✅ IMPLEMENTED (resource library with filters)
    [id].tsx ⚠️ TODO (resource detail - can be added if needed)
  components/
    ProjectCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Avatar, Button)
    EventCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Button)
    ContributorCard.tsx ✅ IMPLEMENTED (uses Card, Avatar, Badge)
    ResourceCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Button)
    StatsDisplay.tsx ✅ IMPLEMENTED (uses stat typography classes)
    SocialLinks.tsx ✅ IMPLEMENTED (uses Button with icons)
    ProjectFilter.tsx ✅ IMPLEMENTED (uses Input, Select, Badge)
    CommunityHero.tsx ✅ IMPLEMENTED (uses SimpleHeroSection in main page)
    ProjectGallery.tsx ✅ IMPLEMENTED (grid layout in projects page)
    EventCalendar.tsx ⚠️ TODO (calendar component - can be added if needed)
  hooks/
    useCommunity.ts ✅ IMPLEMENTED (reusable hook with filtering, stats, utilities)
  types/
    community.ts ✅ IMPLEMENTED (centralized TypeScript types - Single Source of Truth)
/api/community
  projects.ts ✅ IMPLEMENTED (GET: list projects, POST: create project)
  events.ts ✅ IMPLEMENTED (GET: list events, POST: create event)
  events/[id]/register.ts ✅ IMPLEMENTED (POST: register for event)
  contributors.ts ✅ IMPLEMENTED (GET: list contributors)
  resources.ts ✅ IMPLEMENTED (GET: list resources, POST: create resource)
  stats.ts ✅ IMPLEMENTED (GET: community statistics)
/supabase/migrations
  20250128000005_create_community_tables.sql ✅ IMPLEMENTED (community_projects, community_events, community_contributors, community_resources, and related tables)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - All card components
- `@/components/ui/badge` - Tags and categories
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Forms and filters
- `@/components/ui/select` - Filter dropdowns
- `@/components/ui/avatar` - User avatars
- `@/components/ui/dialog` - Modals
- `lucide-react` - Icons
- `date-fns` - Date formatting

## Content Strategy

### Project Showcase
- **Submission Process**: Form with approval workflow
- **Featured Projects**: Rotate monthly
- **Categories**: Web apps, Mobile apps, CLI tools, Integrations

### Events
- **Hosting**: Support community-hosted events
- **Promotion**: Feature on homepage
- **Recording**: Archive webinar recordings

### Contributors
- **Recognition**: Monthly contributor spotlights
- **Incentives**: Swag, credits, recognition
- **Tracking**: GitHub integration for code contributions

### Resources
- **Curation**: Review and approve resources
- **Organization**: Clear categorization
- **Updates**: Version tracking

## SEO & Analytics

### SEO
- Meta tags for each section
- Structured data
- Sitemap inclusion
- Open Graph tags

### Analytics
- Page views
- Project submissions
- Resource downloads
- Event registrations
- Social link clicks

## Success Metrics

- Community growth
- Project submissions
- Event attendance
- Resource usage
- Contributor engagement
- Social media growth

## Integration Points

1. **GitHub**
   - Sync contributors
   - Link projects
   - Track contributions

2. **Discord**
   - Member count sync
   - Event announcements
   - Community engagement

3. **Event Platforms**
   - Eventbrite integration
   - Meetup.com integration
   - Zoom/Google Meet links

4. **Analytics**
   - Community growth tracking
   - Engagement metrics
   - Conversion tracking

## Future Enhancements

1. **Community Features**
   - User profiles
   - Direct messaging
   - Community forums
   - Mentorship program

2. **Gamification**
   - Points system
   - Leaderboards
   - Badges
   - Rewards

3. **Local Communities**
   - Regional chapters
   - Local meetups
   - Regional resources

4. **Marketplace**
   - Community plugins
   - Templates marketplace
   - Service providers


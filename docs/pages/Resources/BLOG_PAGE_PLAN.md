# Blog Page Plan (`/blog`)

## Overview
A content marketing blog showcasing technical tutorials, product updates, company news, and industry insights for nbcon.ai. Built with MDX for rich content and optimized for SEO.

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
- **Headline**: "Latest from nbcon.ai"
- **Description**: "Insights, tutorials, and updates from the team"
- **CTA**: 
  - Primary: "Subscribe to Newsletter" (email signup)
  - Secondary: "Browse Articles" (scroll to content)
- **Background Variant**: "minimal"
- **Featured Post**: Large card below hero with latest/featured article

### Main Content

#### 1. Post Grid
- **Layout**: Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- **Post Cards Include**:
  - Featured image
  - Category badge
  - Title
  - Excerpt (2-3 lines)
  - Author avatar and name
  - Publication date
  - Reading time estimate
  - Tags (if any)

#### 2. Sidebar (Desktop)
- **Categories**: Filter by category
- **Tags Cloud**: Popular tags
- **Recent Posts**: Latest 5 posts
- **Newsletter Signup**: Email subscription form
- **Social Links**: Follow us links

#### 3. Categories Section
- Engineering
- Product Updates
- Tutorials
- Case Studies
- Company News
- Industry Insights

## Features

### Core Features

1. **Post Display**
   - Rich content (markdown/MDX)
   - Code blocks with syntax highlighting
   - Images with captions
   - Video embeds
   - Table of contents (for long posts)
   - Reading progress indicator

2. **Navigation**
   - Category filtering
   - Tag filtering
   - Search functionality
   - Archive view (by month/year)
   - Author pages

3. **Social Sharing**
   - Share buttons (Twitter, LinkedIn, Facebook)
   - Copy link button
   - Email share
   - Social meta tags

4. **Newsletter**
   - Email subscription form
   - Weekly/monthly digest option
   - RSS feed link

5. **Comments** (Optional)
   - Disqus integration OR
   - Custom comment system
   - Comment moderation

### Advanced Features

1. **Author Profiles**
   - Author bio
   - Author avatar
   - Author's posts list
   - Social links

2. **Related Posts**
   - Show related articles at bottom
   - Based on tags/categories
   - "You might also like" section

3. **Reading Experience**
   - Reading time estimate
   - Progress bar
   - Dark mode support
   - Print-friendly styles
   - Font size adjustment

4. **SEO Features**
   - Meta descriptions
   - Open Graph tags
   - Twitter Cards
   - Structured data (Article schema)
   - Canonical URLs

## Content Types

### 1. Technical Tutorials
- Step-by-step guides
- Code examples
- Best practices
- Common pitfalls

### 2. Product Updates
- Feature announcements
- Release notes
- Roadmap updates
- Behind-the-scenes

### 3. Engineering Deep-Dives
- Technical architecture
- Performance optimization
- Security practices
- System design

### 4. Case Studies
- Customer success stories
- Use case examples
- Implementation stories
- ROI metrics

### 5. Company News
- Team updates
- Company milestones
- Event announcements
- Hiring updates

### 6. Industry Insights
- Market trends
- Technology analysis
- Industry news
- Expert opinions

## Design Elements

### Visual Design
- **Layout**: Clean, readable blog layout
- **Typography**: Use unified typography system
- **Images**: High-quality featured images
- **Cards**: Modern card design with hover effects
- **Colors**: Category color coding

### Post Template
```markdown
---
title: "Post Title"
description: "Post description for SEO"
author: "Author Name"
date: "2025-01-15"
category: "Engineering"
tags: ["tag1", "tag2"]
featuredImage: "/images/post-image.jpg"
---

# Post Content
```

### Responsive Design
- Mobile: Single column, optimized images
- Tablet: 2-column grid
- Desktop: 3-column grid with sidebar

## Technical Implementation

### Technology Stack
- **Framework**: Next.js
- **Content**: MDX files OR Headless CMS (Contentful, Strapi)
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: Prism.js or Shiki
- **Image Optimization**: Next.js Image component
- **Search**: Algolia or custom search

### Data Structure
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX content
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
}
```

### File Structure
```
/blog
  index.tsx ✅ IMPLEMENTED (blog listing with filters, search, sidebar)
  [slug].tsx ✅ IMPLEMENTED (individual post page with MDX rendering)
  category/[slug].tsx ✅ IMPLEMENTED (category view)
  tag/[slug].tsx ✅ IMPLEMENTED (tag view)
  author/[id].tsx ✅ IMPLEMENTED (author page)
  archive/[year]/[month].tsx ⚠️ TODO (can be added if needed)
  components/
    PostCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Avatar)
    PostHeader.tsx ✅ IMPLEMENTED (uses typography classes)
    PostContent.tsx ✅ IMPLEMENTED (MDX content renderer using MarkdownRenderer)
    PostFooter.tsx ✅ IMPLEMENTED (uses Button, ShareButtons)
    AuthorCard.tsx ✅ IMPLEMENTED (uses Card, Avatar)
    CategoryFilter.tsx ✅ IMPLEMENTED (uses Badge, Button)
    TagCloud.tsx ✅ IMPLEMENTED (uses Badge components)
    NewsletterForm.tsx ✅ IMPLEMENTED (uses Input, Button, Select)
    ShareButtons.tsx ✅ IMPLEMENTED (uses Button with icons)
    RelatedPosts.tsx ✅ IMPLEMENTED (uses PostCard)
    TableOfContents.tsx ⚠️ TODO (can be added if needed)
    BlogSidebar.tsx ✅ IMPLEMENTED (sidebar navigation)
    FeaturedPost.tsx ✅ IMPLEMENTED (large featured card)
  hooks/
    useBlog.ts ✅ IMPLEMENTED (reusable hook with filtering, stats, utilities)
  types/
    blog.ts ✅ IMPLEMENTED (centralized TypeScript types - Single Source of Truth)
/api/blog
  posts.ts ✅ IMPLEMENTED (GET: list posts, POST: create post)
  posts/[slug].ts ✅ IMPLEMENTED (GET: single post by slug)
  categories.ts ✅ IMPLEMENTED (GET: list categories)
  tags.ts ✅ IMPLEMENTED (GET: list tags)
  stats.ts ✅ IMPLEMENTED (GET: blog statistics)
  newsletter/subscribe.ts ✅ IMPLEMENTED (POST: subscribe, PUT: unsubscribe)
/supabase/migrations
  20250128000004_create_blog_tables.sql ✅ IMPLEMENTED (blog_posts, blog_categories, blog_tags, blog_authors, blog_post_tags, blog_newsletter_subscriptions tables)
/resources/blog
  index.tsx ✅ IMPLEMENTED (re-export for /resources/blog route)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Post cards
- `@/components/ui/badge` - Categories and tags
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Newsletter form
- `@/components/ui/avatar` - Author avatars
- `@/components/ui/scroll-area` - Table of contents
- `next-mdx-remote` or `@next/mdx` - MDX processing
- `lucide-react` - Icons
- `date-fns` - Date formatting

### Content Management Options

#### Option 1: MDX Files
- Pros: Version controlled, simple
- Cons: Requires code deployment for updates

#### Option 2: Headless CMS
- Pros: Non-technical editing, easy updates
- Cons: Additional service, cost

#### Option 3: Hybrid
- MDX for technical posts
- CMS for marketing content

## Content Strategy

### Publishing Schedule
- **Frequency**: 2-4 posts per month
- **Mix**: 
  - 40% Tutorials
  - 20% Product Updates
  - 20% Engineering Deep-Dives
  - 10% Case Studies
  - 10% Company News

### Content Guidelines
- SEO-optimized titles and descriptions
- Engaging introductions
- Clear structure with headings
- Code examples where relevant
- Call-to-action at end
- Internal linking to docs/products

### Author Guidelines
- Consistent writing style
- Technical accuracy
- Engaging tone
- Proper formatting
- Image optimization

## SEO & Analytics

### SEO Strategy
- Keyword research
- Meta tags optimization
- Internal linking
- External linking
- Image alt tags
- Schema markup

### Analytics
- Page views
- Time on page
- Bounce rate
- Social shares
- Newsletter signups
- Conversion tracking

## Success Metrics

- Monthly page views
- Average reading time
- Social shares
- Newsletter subscriptions
- Lead generation
- SEO rankings

## Integration Points

1. **Email Marketing**
   - Newsletter integration
   - Email digests
   - Automated campaigns

2. **Social Media**
   - Auto-posting to social
   - Social sharing tracking
   - Social login

3. **Analytics**
   - Google Analytics
   - Custom event tracking
   - Conversion tracking

4. **CRM**
   - Lead capture
   - Lead scoring
   - Follow-up automation

## Future Enhancements

1. **Advanced Features**
   - Video posts
   - Podcast episodes
   - Interactive content
   - Guest authors

2. **Personalization**
   - Recommended posts
   - Personalized feed
   - Reading history

3. **Community Features**
   - Comments
   - Discussion threads
   - User contributions

4. **Multilingual**
   - Multiple language support
   - Translation system
   - Localized content


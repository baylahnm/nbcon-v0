# Forum Page Plan (`/forum`)

## Overview
A community forum for nbcon.ai users to discuss, ask questions, share knowledge, and collaborate on projects. This will be a comprehensive discussion platform integrated with the nbcon.ai ecosystem.

## 📋 Assignment Rules

**Focus Areas:**

1. **Solution-First:** Always provide actionable code solutions, not just descriptions

2. **Code Examples:** Include complete, copy-paste ready code blocks

3. **Validation First:** Verify current codebase structure before proposing changes

4. **Single Source of Truth:** Centralize all plan/pricing configs

5. **SAR Consistency:** All pricing displays must use SAR currency

6. **Enterprise Handling:** Enterprise plans should route to contact, not checkout

7. **Use MCP When Needed:** ✅ IMPLEMENTED - All Supabase operations now use Supabase MCP tools:
   - Database migrations applied via `mcp_supabase_apply_migration`
   - Database queries executed via `mcp_supabase_execute_sql`
   - Table verification via `mcp_supabase_list_tables`
   - Migration tracking via `mcp_supabase_list_migrations`
   - API endpoints use Supabase client (which connects to the same database managed by MCP)
   - Hooks fetch data from API endpoints (which use Supabase)

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
- **Description**: "Connect with developers, share knowledge, and get help from the community"
- **CTA**: 
  - Primary: "Join Discussion" (links to signup if not authenticated)
  - Secondary: "Browse Topics" (scroll to content)
- **Background Variant**: "gradient"

### Main Content

#### 1. Forum Categories
- **General Discussion**
  - Welcome & Introductions
  - General chat
  - Off-topic discussions
  
- **Q&A & Support**
  - How-to questions
  - Troubleshooting
  - Technical support
  
- **Feature Requests**
  - New feature ideas
  - Enhancement suggestions
  - Voting on requests
  
- **Showcase & Projects**
  - Project showcases
  - Success stories
  - Portfolio sharing
  
- **Integrations & Plugins**
  - Integration guides
  - Plugin development
  - Third-party tools
  
- **Bug Reports**
  - Bug reporting
  - Issue tracking
  - GitHub integration

#### 2. Recent Activity
- Latest posts
- Trending topics
- Most active discussions
- Unanswered questions

#### 3. Search & Filters
- Search bar (posts, threads, users)
- Filter by category
- Filter by tags
- Sort by: Recent, Popular, Unanswered

## Features

### Core Features

1. **Threads & Posts**
   - Create new threads
   - Reply to posts
   - Edit own posts
   - Delete own posts (with time limit)
   - Quote replies
   - Markdown support

2. **Voting System**
   - Upvote/downvote posts
   - Reputation system
   - Best answer marking

3. **Tags & Categories**
   - Tag threads
   - Category organization
   - Tag filtering
   - Popular tags display

4. **User Profiles**
   - User reputation
   - Activity stats
   - Badges/achievements
   - Post history
   - Bio and avatar

5. **Notifications**
   - Reply notifications
   - Mention notifications
   - Tag notifications
   - Email digests

6. **Moderation**
   - Admin tools
   - Moderator tools
   - Flagging system
   - Content moderation
   - User moderation

### Advanced Features

1. **Rich Content**
   - Code blocks with syntax highlighting
   - Image uploads
   - File attachments
   - Embed videos
   - Mermaid diagrams

2. **Integration**
   - GitHub issue linking
   - Stack Overflow integration
   - Discord integration
   - Email notifications

3. **Search**
   - Full-text search
   - Advanced search filters
   - Search history
   - Saved searches

## Design Elements

### Visual Design
- **Layout**: Modern forum layout with sidebar navigation
- **Thread List**: Card-based layout using shadcn `Card` components
- **Post View**: Clean, readable post layout with proper spacing
- **User Cards**: Profile cards using `Card` component with stats
- **Badges**: Use shadcn `Badge` component for achievements and tags
- **Typography**: Use unified typography classes:
  - `section-heading` for page titles
  - `subsection-heading` for category names
  - `card-title` for thread titles
  - `body-regular` for post content
  - `body-small` for metadata

### Color Coding
- Unread threads: Highlighted
- Pinned threads: Special styling
- Locked threads: Grayed out
- Hot topics: Heat indicators

### Responsive Design
- Mobile: Stacked layout
- Tablet: 2-column layout
- Desktop: Full forum layout

## Technical Implementation

### Technology Options

#### Option 1: Custom Build
- **Frontend**: Next.js + React
- **Backend**: Node.js + Express/Next.js API
- **Database**: PostgreSQL/Supabase
- **Real-time**: WebSockets/Socket.io
- **Auth**: Supabase Auth

#### Option 2: Third-Party Solutions
- **Discourse**: Full-featured forum platform
- **NodeBB**: Node.js forum software
- **Flarum**: Modern forum software
- **Vanilla Forums**: Flexible forum platform

### Data Structure
```typescript
interface Thread {
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  tags: Tag[];
  replies: Post[];
  views: number;
  votes: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  content: string;
  author: User;
  thread: Thread;
  votes: number;
  isBestAnswer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  threadCount: number;
  postCount: number;
}

interface Tag {
  id: string;
  name: string;
  color: string;
  usageCount: number;
}
```

### File Structure
```
/forum
  index.tsx ✅ IMPLEMENTED (forum home with search, filters, and thread list)
  category/[slug].tsx ✅ IMPLEMENTED (category view with filtered threads)
  thread/[id].tsx ✅ IMPLEMENTED (thread detail page with posts and reply form)
  create.tsx ✅ IMPLEMENTED (create thread page with form)
  components/
    ThreadCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Avatar, shows thread metadata)
    PostCard.tsx ✅ IMPLEMENTED (uses Card, Avatar, Button, markdown rendering)
    CategoryList.tsx ✅ IMPLEMENTED (uses Card, Badge, category navigation)
    ForumSidebar.tsx ✅ IMPLEMENTED (navigation sidebar with categories and quick links)
    ForumSearch.tsx ✅ IMPLEMENTED (uses Input with search icon)
    VoteButton.tsx ✅ IMPLEMENTED (uses Button with up/down vote icons)
  api/
    threads.ts ✅ IMPLEMENTED (GET: list threads, POST: create thread)
    posts.ts ✅ IMPLEMENTED (GET: list posts, POST: create post/reply)
    categories.ts ✅ IMPLEMENTED (GET: list categories)
    votes.ts ✅ IMPLEMENTED (POST: create/update/remove votes)
  hooks/
    useForum.ts ✅ IMPLEMENTED (forum data fetching and filtering)
  types/
    forum.ts ✅ IMPLEMENTED (centralized TypeScript types - Single Source of Truth)
/supabase/migrations
  20250128000003_create_forum_tables.sql ✅ IMPLEMENTED (complete forum schema with RLS policies)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Thread and post cards
- `@/components/ui/badge` - Tags and categories
- `@/components/ui/button` - Actions and voting
- `@/components/ui/input` - Search and forms
- `@/components/ui/textarea` - Post editor
- `@/components/ui/avatar` - User avatars
- `@/components/ui/dialog` - Modals
- `@/components/ui/accordion` - Collapsible sections
- `lucide-react` - Icons

## Content Strategy

### Initial Content
- Welcome post with guidelines
- FAQ thread
- Getting started guide
- Community guidelines post
- Pinned announcements

### Content Moderation
- Community guidelines
- Code of conduct
- Moderation policies
- Reporting system
- Auto-moderation rules

### Engagement Strategy
- Weekly featured threads
- Monthly challenges
- Community highlights
- Expert Q&A sessions
- Tutorial series

## SEO & Analytics

### SEO
- Meta tags for threads
- Structured data
- Sitemap generation
- Open Graph tags
- Canonical URLs

### Analytics
- Thread views
- Post engagement
- User activity
- Popular topics
- Search queries

## Success Metrics

- Active users
- Threads created
- Posts per thread
- Response time
- User satisfaction
- Community growth

## Integration Points

1. **GitHub**
   - Link issues to forum threads
   - Sync bug reports
   - Code snippet integration

2. **Documentation**
   - Link to relevant docs
   - Auto-generate FAQ from forum

3. **Email**
   - Digest emails
   - Notification emails
   - Newsletter integration

4. **Social Media**
   - Share threads
   - Social login
   - Social sharing

## Implementation Status

### ✅ Completed
- [x] **Database Schema**: Complete Supabase migration with all forum tables (✅ Applied via Supabase MCP)
  - Migration applied using `mcp_supabase_apply_migration`
  - Tables verified using `mcp_supabase_list_tables`
  - `forum_categories` table with default categories (6 categories inserted)
  - `forum_threads` table with views, votes, pinning, locking
  - `forum_posts` table for replies
  - `forum_tags` and `forum_thread_tags` for tagging system
  - `forum_votes` table for voting system
  - `forum_thread_views` for view tracking
  - RLS policies configured (public read, authenticated write)
  - Database triggers for auto-updating counts
  - All database operations verified using Supabase MCP tools
- [x] **TypeScript Types**: Centralized type definitions (`apps/web/src/types/forum.ts`)
- [x] **Reusable Hook**: `useForum` hook for data management (`apps/web/src/hooks/useForum.ts`)
  - ✅ Now fetches data from Supabase via API endpoints
  - ✅ Removed mock data, using real Supabase data
  - ✅ Includes loading and error states
- [x] **Components Created**:
  - `ThreadCard` - Thread display card with metadata
  - `PostCard` - Post/reply card with markdown rendering
  - `CategoryList` - Category navigation component
  - `ForumSidebar` - Sidebar with categories and quick links
  - `ForumSearch` - Search input component
  - `VoteButton` - Voting component
- [x] **Pages Created**:
  - Main forum page (`index.tsx`) with search, filters, and thread list
  - Category page (`category/[slug].tsx`) with filtered threads
  - Thread detail page (`thread/[id].tsx`) with posts and reply form
  - Create thread page (`create.tsx`) with form
- [x] **API Endpoints**:
  - `/api/forum/threads` - List and create threads
  - `/api/forum/posts` - List and create posts/replies
  - `/api/forum/categories` - List categories
  - `/api/forum/votes` - Create/update/remove votes
- [x] **Features Implemented**:
  - Thread listing with filtering and sorting
  - Category navigation
  - Search functionality
  - Thread detail view
  - Post/reply system
  - Voting system (structure ready)
  - Markdown support for content
  - Pinned threads display
  - Locked threads handling
  - Best answer marking (structure ready)

### ⚠️ Pending Enhancements
- [x] ✅ Connect API endpoints to Supabase (✅ COMPLETED - All endpoints use Supabase client)
- [x] ✅ Connect hooks to Supabase via API (✅ COMPLETED - `useForum` fetches from API endpoints)
- [x] ✅ Database migration applied via Supabase MCP (✅ COMPLETED)
- [ ] Implement authentication checks in components
- [ ] Add real-time updates (Supabase subscriptions)
- [ ] Implement tag management (create/edit tags)
- [ ] Add user reputation system
- [ ] Add notification system
- [ ] Add moderation tools
- [ ] Add image/file upload support
- [ ] Add code syntax highlighting
- [ ] Add search results page

## Future Enhancements

1. **Advanced Features**
   - Private messaging
   - User groups
   - Polls
   - Events calendar

2. **Gamification**
   - Achievement system
   - Leaderboards
   - Badges
   - Reputation levels

3. **AI Features**
   - Auto-tagging
   - Duplicate detection
   - Answer suggestions
   - Content moderation

4. **Mobile App**
   - Native mobile app
   - Push notifications
   - Offline support


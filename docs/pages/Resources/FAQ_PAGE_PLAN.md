# FAQ Page Plan (`/faq`)

## Overview
A comprehensive Frequently Asked Questions page addressing common questions about nbcon.ai products, services, pricing, and support. This page will help users quickly find answers and reduce support burden.

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
- **Headline**: "Frequently Asked Questions"
- **Description**: "Find answers to common questions about nbcon.ai"
- **CTA**: 
  - Primary: "Contact Support" (links to support/contact)
  - Secondary: "Browse Docs" (links to /docs)
- **Background Variant**: "minimal"

### Main Content

#### 1. Search Bar
- **Component**: Search input with icon
- **Functionality**: Filter FAQs by keyword
- **Placement**: Below hero, sticky on scroll

#### 2. FAQ Categories
- **Getting Started**
  - Account setup
  - First steps
  - Basic usage
  
- **Pricing & Billing**
  - Plans and pricing
  - Billing questions
  - Refunds
  
- **Features & Usage**
  - Product features
  - How-to questions
  - Best practices
  
- **Technical Support**
  - Troubleshooting
  - Technical issues
  - Integrations
  
- **Account & Security**
  - Account management
  - Security questions
  - Privacy
  
- **Enterprise**
  - Enterprise features
  - Custom solutions
  - SLAs

#### 3. FAQ Accordion
- **Component**: shadcn `Accordion`
- **Each FAQ Item Contains**:
  - Question (accordion trigger)
  - Answer (accordion content)
  - Category tag
  - Helpful/Not helpful feedback
  - Related articles links

#### 4. Popular Questions
- **Section**: Highlighted popular FAQs
- **Display**: Card grid with most viewed FAQs
- **Auto-update**: Based on analytics

#### 5. Still Have Questions?
- **CTA Section**: 
  - Contact support button
  - Community forum link
  - Documentation link
  - Live chat (if available)

## Features

### Core Features

1. **Search Functionality**
   - Real-time search filtering
   - Search across all FAQs
   - Highlight search terms
   - Search history

2. **Category Filtering**
   - Filter by category
   - Multiple category selection
   - Clear filters button

3. **Accordion Interface**
   - Expandable/collapsible answers
   - Multiple open at once (or single)
   - Smooth animations
   - Keyboard navigation

4. **Feedback System**
   - "Was this helpful?" widget
   - Thumbs up/down
   - Optional comment
   - Analytics tracking

5. **Related Content**
   - Links to related docs
   - Related FAQs
   - External resources

### Advanced Features

1. **Analytics**
   - Track FAQ views
   - Track helpful/not helpful
   - Identify gaps
   - Popular questions tracking

2. **Dynamic Content**
   - Most popular FAQs
   - Recently updated
   - New FAQs badge

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

## Design Elements

### Visual Design
- **Layout**: Clean, scannable layout
- **Accordion**: Use shadcn `Accordion` component
- **Cards**: Use `Card` component for popular FAQs
- **Badges**: Use `Badge` for categories
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for category titles
  - `card-title` for FAQ questions
  - `body-regular` for FAQ answers
  - `body-small` for metadata

### Color Coding
- Categories: Color-coded badges
- Popular: Highlighted with badge
- New: "New" badge indicator

### Responsive Design
- Mobile: Stacked accordion, full-width
- Tablet: 2-column layout
- Desktop: Full-width with sidebar (optional)

## Technical Implementation

### Data Structure
```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
  views: number;
  relatedDocs?: string[];
  relatedFAQs?: string[];
  createdAt: Date;
  updatedAt: Date;
  isPopular: boolean;
  isNew: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  faqCount: number;
}
```

### File Structure
```
/faq
  index.tsx ✅ IMPLEMENTED (main FAQ page with search, filters, categories, popular FAQs)
  components/
    FAQAccordion.tsx ✅ IMPLEMENTED (uses Accordion component with search highlighting)
    FAQSearch.tsx ✅ IMPLEMENTED (uses Input with search icon and clear button)
    FAQCategoryFilter.tsx ✅ IMPLEMENTED (uses Badge, Button for category filtering)
    PopularFAQs.tsx ✅ IMPLEMENTED (uses Card components for popular FAQs)
    FAQFeedback.tsx ✅ IMPLEMENTED (feedback widget with thumbs up/down and comments)
    RelatedContent.tsx ✅ IMPLEMENTED (related links to docs and FAQs)
  hooks/
    useFAQ.ts ✅ IMPLEMENTED (FAQ data and filtering hook)
    useSingleFAQ.ts ✅ IMPLEMENTED (single FAQ fetching hook)
  types/
    faq.ts ✅ IMPLEMENTED (centralized TypeScript types - Single Source of Truth)
/api/faq
  categories.ts ✅ IMPLEMENTED (GET: list FAQ categories)
  faqs.ts ✅ IMPLEMENTED (GET: list FAQs with filters, POST: create FAQ - admin only)
  faqs/[id].ts ✅ IMPLEMENTED (GET: single FAQ by ID with view count increment)
  feedback.ts ✅ IMPLEMENTED (POST: submit FAQ feedback)
/supabase/migrations
  20250128000007_create_faq_tables.sql ✅ IMPLEMENTED (faq_categories, faqs, faq_feedback tables)
/resources/faq
  index.tsx ⚠️ TODO (can be added if needed for /resources/faq route)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/accordion` - FAQ accordion
- `@/components/ui/card` - Popular FAQs cards
- `@/components/ui/badge` - Categories and tags
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Search input
- `lucide-react` - Icons
- `fuse.js` or custom search - Search functionality

## Content Strategy

### FAQ Categories
1. **Getting Started** (10-15 FAQs)
2. **Pricing & Billing** (8-12 FAQs)
3. **Features & Usage** (15-20 FAQs)
4. **Technical Support** (10-15 FAQs)
5. **Account & Security** (8-10 FAQs)
6. **Enterprise** (5-8 FAQs)

### Content Guidelines
- Clear, concise questions
- Detailed, helpful answers
- Use examples where helpful
- Include links to docs
- Keep answers scannable
- Update regularly based on feedback

### Initial Content
- Start with 50-70 FAQs
- Cover all major categories
- Include most common support questions
- Add FAQs based on user feedback

## SEO & Analytics

### SEO
- Meta tags optimized
- Structured data (FAQPage schema)
- Sitemap inclusion
- Internal linking
- Open Graph tags

### Analytics
- FAQ views
- Search queries
- Helpful/not helpful ratio
- Category popularity
- Related content clicks

## Success Metrics

- FAQ page views
- Search usage
- Helpful feedback rate
- Support ticket reduction
- Time on page
- Bounce rate

## Integration Points

1. **Support System**
   - Link to support tickets
   - Escalate to support
   - Support article links

2. **Documentation**
   - Link to relevant docs
   - Cross-reference content
   - Doc search integration

3. **Community**
   - Link to forum discussions
   - Community answers
   - User-contributed FAQs

4. **Analytics**
   - Track FAQ performance
   - Identify content gaps
   - Improve based on data

## Future Enhancements

1. **AI Features**
   - AI-powered search
   - Smart suggestions
   - Chatbot integration

2. **User Contributions**
   - User-submitted FAQs
   - Community answers
   - Voting on answers

3. **Multilingual**
   - Multiple language support
   - Translated FAQs
   - Language selector

4. **Advanced Search**
   - Natural language search
   - Semantic search
   - Auto-complete suggestions


# Careers Page Plan (`/careers`)

## Overview
A comprehensive careers page showcasing open positions, company culture, benefits, and the application process for nbcon.ai. Designed to attract top talent and showcase company values.

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
- **Headline**: "Build the Future of AI-Powered Engineering"
- **Description**: "Join us in revolutionizing how engineering teams build software"
- **CTA**: 
  - Primary: "View Open Positions" (scroll to jobs)
  - Secondary: "Learn More" (scroll to culture section)
- **Background Variant**: "gradient"
- **Visual**: Team photo or office image (optional overlay)

### Main Content Sections

#### 1. Open Positions
- **Job Listings**: Filterable list of open positions
- **Job Card Includes**:
  - Job title
  - Department/Team
  - Location (Remote/On-site/Hybrid)
  - Job type (Full-time/Part-time/Contract)
  - Brief description
  - Key requirements (3-4 bullets)
  - "Apply" button

#### 2. Why Join Us
- **Company Values**: Core values with descriptions
- **Mission Statement**: Company mission and vision
- **Culture Highlights**: What makes us unique
- **Visual**: Team photos, office shots, culture moments

#### 3. Our Team
- **Team Section**: Photos and brief bios
- **Leadership Team**: Founders/executives
- **Engineering Team**: Key team members
- **Diversity Statement**: Commitment to diversity

#### 4. Perks & Benefits
- **Benefits Grid**: Visual cards for each benefit
- **Categories**:
  - Compensation & Equity
  - Health & Wellness
  - Work-Life Balance
  - Professional Development
  - Office & Equipment
  - Additional Perks

#### 5. Application Process
- **Step-by-Step Guide**: Visual timeline
- **Steps**:
  1. Apply online
  2. Initial screening
  3. Technical interview
  4. Team interview
  5. Final decision
- **Timeline**: Expected duration for each step

#### 6. Life at nbcon.ai
- **Photo Gallery**: Office photos, team events
- **Testimonials**: Current employee quotes
- **Day in the Life**: Blog posts or videos
- **Events**: Team events, retreats, activities

## Features

### Core Features

1. **Job Listings**
   - Filter by:
     - Department
     - Location
     - Job type
     - Experience level
   - Search functionality
   - Sort by: Relevance, Date, Department

2. **Job Detail Page**
   - Full job description
   - Requirements (must-have, nice-to-have)
   - Responsibilities
   - Benefits specific to role
   - Application form
   - Share job posting

3. **Application Form**
   - Personal information
   - Resume/CV upload
   - Cover letter (optional)
   - Portfolio/GitHub link
   - Additional questions
   - Equal opportunity form

4. **Email Alerts**
   - Job alert signup
   - New position notifications
   - Customized alerts by category

5. **Referral Program**
   - Employee referral link
   - Referral bonus information
   - Referral form

### Advanced Features

1. **Application Tracking**
   - Application status portal
   - Interview scheduling
   - Document upload

2. **Video Content**
   - Company culture video
   - Team member interviews
   - Office tour video

3. **Interactive Elements**
   - Culture quiz
   - Team fit assessment
   - Virtual office tour

## Design Elements

### Visual Design
- **Layout**: Clean, professional layout with clear sections
- **Colors**: Use theme system colors, professional tone
- **Typography**: Use unified typography classes:
  - `section-heading` for main section titles
  - `subsection-heading` for job titles and section headings
  - `card-title` for benefit titles
  - `body-large` for descriptions
  - `stat-medium` for compensation displays
- **Images**: High-quality team and office photos
- **Icons**: Lucide-react icons for benefits and departments
- **Cards**: Use shadcn `Card` components for job listings and benefits

### Responsive Design
- Mobile: Stacked layout, mobile-optimized forms
- Tablet: 2-column grids
- Desktop: Full multi-column layout

## Technical Implementation

### Data Structure
```typescript
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    city?: string;
    country?: string;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  description: string;
  responsibilities: string[];
  requirements: {
    mustHave: string[];
    niceToHave: string[];
  };
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: Date;
  closingDate?: Date;
  applicationUrl: string;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
}
```

### File Structure
```
/careers
  index.tsx ✅ IMPLEMENTED (careers home with jobs, benefits, process timeline, job alerts)
  positions/
    index.tsx ✅ IMPLEMENTED (all positions with filters)
    [id].tsx ✅ IMPLEMENTED (job detail page with application form)
    apply/[id].tsx ⚠️ TODO (can redirect to [id].tsx which includes form)
  team.tsx ⚠️ TODO (team page - can be added if needed)
  benefits.tsx ✅ IMPLEMENTED (benefits page with category tabs)
  culture.tsx ⚠️ TODO (culture page - can be added if needed)
  components/
    JobCard.tsx ✅ IMPLEMENTED (uses Card, Badge, Button)
    JobFilter.tsx ✅ IMPLEMENTED (uses Input, Select, Badge)
    ApplicationForm.tsx ✅ IMPLEMENTED (uses Input, Textarea, Button, Label)
    BenefitCard.tsx ✅ IMPLEMENTED (uses Card with icons)
    TeamCard.tsx ⚠️ TODO (can be added if team page is implemented)
    ProcessTimeline.tsx ✅ IMPLEMENTED (custom timeline component)
    CultureGallery.tsx ⚠️ TODO (can be added if culture page is implemented)
    CareersHero.tsx ✅ IMPLEMENTED (uses SimpleHeroSection in main page)
    JobAlertForm.tsx ✅ IMPLEMENTED (uses Input, Button, Select)
  hooks/
    useCareers.ts ✅ IMPLEMENTED (reusable hook with filtering, utilities)
    useJobPosting.ts ✅ IMPLEMENTED (hook for single job posting)
  types/
    careers.ts ✅ IMPLEMENTED (centralized TypeScript types - Single Source of Truth)
/api/careers
  jobs.ts ✅ IMPLEMENTED (GET: list jobs, POST: create job - admin only)
  jobs/[id].ts ✅ IMPLEMENTED (GET: single job by ID)
  benefits.ts ✅ IMPLEMENTED (GET: list benefits)
  applications.ts ✅ IMPLEMENTED (GET: list applications, POST: create application)
  alerts.ts ✅ IMPLEMENTED (POST: subscribe, PUT: unsubscribe)
/supabase/migrations
  20250128000006_create_careers_tables.sql ✅ IMPLEMENTED (careers_job_postings, careers_applications, careers_benefits, careers_job_alerts tables)
/resources/careers
  index.tsx ✅ IMPLEMENTED (re-export for /resources/careers route)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Job and benefit cards
- `@/components/ui/badge` - Job tags and categories
- `@/components/ui/button` - CTAs and actions
- `@/components/ui/input` - Forms and filters
- `@/components/ui/textarea` - Application form
- `@/components/ui/select` - Dropdowns
- `@/components/ui/avatar` - Team member avatars
- `@/components/ui/dialog` - Application modal
- `@/components/ui/form` - Form handling
- `lucide-react` - Icons
- `react-hook-form` - Form management

### Integration Options

#### Option 1: Custom Application System
- Build custom application form
- Store in database
- Email notifications
- Application tracking

#### Option 2: Third-Party ATS
- Greenhouse
- Lever
- Workable
- BambooHR

#### Option 3: Hybrid
- Custom job listings
- Third-party application system
- Best of both worlds

## Content Strategy

### Job Descriptions
- Clear, engaging titles
- Detailed responsibilities
- Specific requirements
- Company culture fit
- Growth opportunities
- Competitive benefits

### Company Culture Content
- Values and mission
- Team diversity
- Work environment
- Growth opportunities
- Success stories

### Benefits Communication
- Clear benefit descriptions
- Visual representations
- Value propositions
- Comparison with market

## SEO & Analytics

### SEO
- Job posting SEO
- Meta tags
- Structured data (JobPosting schema)
- Sitemap inclusion
- Open Graph tags

### Analytics
- Job views
- Application starts
- Application completions
- Filter usage
- Source tracking
- Conversion funnel

## Success Metrics

- Job posting views
- Application rate
- Application completion rate
- Time to fill
- Candidate quality
- Source effectiveness
- Employee referrals

## Legal Considerations

1. **Equal Opportunity**
   - EEO statement
   - Diversity commitment
   - Accessibility statement

2. **Privacy**
   - Privacy policy link
   - Data handling information
   - GDPR compliance

3. **Compliance**
   - Labor law compliance
   - Salary transparency (where required)
   - Work authorization

## Integration Points

1. **ATS Integration**
   - Application tracking
   - Candidate management
   - Interview scheduling

2. **Email Marketing**
   - Job alerts
   - Newsletter
   - Follow-up campaigns

3. **Analytics**
   - Google Analytics
   - Conversion tracking
   - Source attribution

4. **Social Media**
   - Job posting sharing
   - Social recruitment
   - Employer branding

## Future Enhancements

1. **Advanced Features**
   - Video interviews
   - Skills assessments
   - Candidate portal
   - Referral tracking

2. **Employer Branding**
   - Employee testimonials
   - Culture videos
   - Awards and recognition
   - Press mentions

3. **Recruitment Marketing**
   - Targeted campaigns
   - University partnerships
   - Conference presence
   - Community engagement

4. **Diversity & Inclusion**
   - D&I initiatives
   - Employee resource groups
   - Diversity metrics
   - Inclusive hiring practices


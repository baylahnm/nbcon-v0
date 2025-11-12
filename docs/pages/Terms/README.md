# Terms of Service Page Plan (`/terms`)

## Overview
A comprehensive terms of service page outlining the legal agreement between nbcon.ai and its users. This page defines user rights, responsibilities, and the rules governing use of the service.

## 📋 Assignment Rules

**Focus Areas:**

1. **Legal Protection:** Ensure all necessary legal protections are included
2. **User Clarity:** Make terms understandable and accessible
3. **Enforceability:** Use clear, enforceable language
4. **Version Control:** Track terms versions and update dates
5. **Acceptance Mechanism:** Clear acceptance process
6. **Dispute Resolution:** Include dispute resolution procedures

**When Implementing:**

- Use clear, enforceable language
- Include all standard terms sections
- Link to privacy policy and cookie policy
- Provide contact information for legal inquiries
- Ensure mobile responsiveness
- Add print-friendly styles
- Include acceptance checkbox/button

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection` (minimal variant)
- **Headline**: "Terms of Service"
- **Description**: "The legal agreement governing your use of nbcon.ai"
- **Last Updated**: Display last updated date prominently
- **Acceptance**: "By using our service, you agree to these terms"
- **Background Variant**: "minimal"

### Main Content

#### 1. Introduction
- Agreement parties
- Effective date
- Acceptance of terms
- Age requirements
- Updates and modifications

#### 2. Description of Service
- What nbcon.ai provides
- Service availability
- Service modifications
- Beta features disclaimer

#### 3. User Accounts
- Account creation
- Account security
- Account responsibilities
- Account termination
- Multiple accounts policy

#### 4. Acceptable Use Policy
- **Permitted Uses**
  - Intended use cases
  - Commercial use
  - Educational use
- **Prohibited Uses**
  - Illegal activities
  - Abuse and harassment
  - Spam and fraud
  - Reverse engineering
  - Unauthorized access
  - Violation of third-party rights

#### 5. Intellectual Property Rights
- **Our Rights**
  - Service ownership
  - Content ownership
  - Trademarks and logos
- **Your Rights**
  - User content ownership
  - License to use service
  - User content license to us

#### 6. User Content
- Content ownership
- Content license grant
- Content responsibility
- Content removal rights
- DMCA policy

#### 7. Payment Terms
- Subscription fees
- Billing cycles
- Payment methods
- Refund policy
- Price changes
- Failed payments

#### 8. Service Availability
- Uptime commitments
- Service interruptions
- Maintenance windows
- Force majeure
- No warranty

#### 9. Limitation of Liability
- Disclaimer of warranties
- Limitation of damages
- Indemnification
- Exclusions

#### 10. Termination
- **By You**
  - Account cancellation
  - Data deletion
- **By Us**
  - Violation of terms
  - Inactivity
  - Service discontinuation
- **Effects of Termination**
  - Data retention
  - Outstanding obligations

#### 11. Dispute Resolution
- Governing law
- Jurisdiction
- Arbitration clause (if applicable)
- Class action waiver
- Informal resolution

#### 12. Changes to Terms
- Update notification
- Continued use acceptance
- Material changes
- Version history

#### 13. General Provisions
- Entire agreement
- Severability
- Assignment
- Waiver
- Contact information

## Features

### Core Features

1. **Table of Contents**
   - Sticky navigation on scroll
   - Anchor links to sections
   - Current section highlighting

2. **Acceptance Mechanism**
   - Checkbox for acceptance
   - "I Agree" button
   - Required for account creation
   - Version tracking

3. **Last Updated Display**
   - Prominent date display
   - Version number
   - Change summary

4. **Print-Friendly Layout**
   - Optimized for printing
   - Page breaks
   - Remove navigation on print

5. **Mobile Optimization**
   - Readable font sizes
   - Proper spacing
   - Touch-friendly navigation

### Advanced Features

1. **Version History**
   - Previous versions archive
   - Change summaries
   - Comparison view
   - Download PDF

2. **Interactive Acceptance**
   - In-page acceptance
   - Account integration
   - Acceptance tracking

3. **FAQ Integration**
   - Common questions
   - Expandable sections
   - Related FAQs

## Design Elements

### Visual Design
- **Layout**: Clean, readable layout
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for section headings
  - `body-regular` for main content
  - `body-small` for metadata
- **Spacing**: Generous whitespace for readability
- **Colors**: Subtle use of primary color for links and highlights
- **Callouts**: Important sections highlighted

### Content Structure
- **Sections**: Clear section breaks
- **Numbering**: Numbered sections for easy reference
- **Lists**: Use bulleted/numbered lists for clarity
- **Links**: Internal links to related pages (Privacy, Cookies)

### Responsive Design
- **Mobile**: Single column, full-width
- **Tablet**: Single column with better spacing
- **Desktop**: Max-width container for readability

## Technical Implementation

### File Structure
```
/terms
  index.tsx (main terms page)
  components/
    TermsTableOfContents.tsx (sticky TOC)
    TermsSection.tsx (reusable section component)
    TermsAcceptance.tsx (acceptance component)
    LastUpdated.tsx (version display component)
  content/
    terms-of-service.md (MDX content)
    versions/
      v1.0.0.md
      v2.0.0.md
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Section cards (optional)
- `@/components/ui/button` - Acceptance buttons
- `@/components/ui/checkbox` - Acceptance checkbox
- `@/components/ui/badge` - Version badges
- `lucide-react` - Icons

### Data Structure
```typescript
interface TermsOfServiceVersion {
  version: string;
  effectiveDate: Date;
  lastUpdated: Date;
  changes: string[];
  content: string; // MDX content
  acceptanceRequired: boolean;
}

interface TermsSection {
  id: string;
  title: string;
  content: string;
  order: number;
  important?: boolean; // Highlight important sections
}

interface UserAcceptance {
  userId: string;
  version: string;
  acceptedAt: Date;
  ipAddress?: string;
}
```

## Content Strategy

### Required Sections (Legal Protection)

1. **Introduction** ✅
2. **Service Description** ✅
3. **User Accounts** ✅
4. **Acceptable Use** ✅
5. **Intellectual Property** ✅
6. **User Content** ✅
7. **Payment Terms** ✅
8. **Service Availability** ✅
9. **Limitation of Liability** ✅
10. **Termination** ✅
11. **Dispute Resolution** ✅
12. **Changes to Terms** ✅
13. **General Provisions** ✅

### Content Guidelines
- Use clear, enforceable language
- Avoid unnecessary legal jargon
- Provide examples where helpful
- Be specific about prohibited activities
- Regular legal review required

### Initial Content
- Draft with legal team
- Review for enforceability
- User testing for clarity
- Regular updates as needed

## SEO & Analytics

### SEO
- Meta description
- Structured data (WebPage schema)
- Internal linking
- Sitemap inclusion
- Canonical URL

### Analytics
- Page views
- Section engagement
- Scroll depth
- Acceptance rate
- Contact link clicks

## Compliance Checklist

### Standard Terms Requirements
- ✅ Service description
- ✅ User obligations
- ✅ Acceptable use policy
- ✅ Intellectual property rights
- ✅ Limitation of liability
- ✅ Termination procedures
- ✅ Dispute resolution
- ✅ Governing law

### User Protection
- ✅ Clear language
- ✅ Fair terms
- ✅ User rights
- ✅ Dispute options
- ✅ Contact information

## Integration Points

1. **Account Creation**
   - Terms acceptance required
   - Version tracking
   - Acceptance record

2. **Privacy Policy**
   - Cross-reference privacy policy
   - Link to privacy page

3. **Cookie Policy**
   - Link to cookie policy
   - Cookie consent integration

4. **User Settings**
   - Terms acceptance status
   - Version display
   - Re-acceptance if updated

5. **Support System**
   - Legal inquiry form
   - Support ticket integration

## Success Metrics

- Page views
- Acceptance rate
- Time on page
- Scroll depth
- Contact form submissions
- Dispute resolution outcomes

## Future Enhancements

1. **Interactive Terms Builder**
   - Customizable terms
   - Regional variations
   - Industry-specific terms

2. **Terms Comparison Tool**
   - Side-by-side comparison
   - Highlight changes
   - Version diff view

3. **Multi-Language Support**
   - Translated versions
   - Language selector
   - Regional variations

4. **Acceptance Tracking Dashboard**
   - User acceptance status
   - Version compliance
   - Re-acceptance reminders

---

**Priority**: High (Legal Requirement)
**Estimated Implementation**: 2-3 days
**Legal Review Required**: Yes


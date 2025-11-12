# Cookie Policy Page Plan (`/cookies`)

## Overview
A comprehensive cookie policy page explaining what cookies are used on nbcon.ai, why they're used, and how users can manage their cookie preferences. This page is essential for GDPR compliance.

## 📋 Assignment Rules

**Focus Areas:**

1. **GDPR Compliance:** Ensure full GDPR cookie consent compliance
2. **Transparency:** Clearly explain all cookies used
3. **User Control:** Provide easy cookie management options
4. **Integration:** Connect with cookie consent banner
5. **Accessibility:** Make cookie settings accessible
6. **Categories:** Organize cookies by purpose

**When Implementing:**

- List all cookies used
- Explain purpose of each cookie
- Provide opt-out mechanisms
- Link to cookie consent banner
- Ensure mobile responsiveness
- Add cookie preference center

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection` (minimal variant)
- **Headline**: "Cookie Policy"
- **Description**: "Learn about how we use cookies and manage your preferences"
- **CTA**: "Manage Cookie Preferences" button
- **Background Variant**: "minimal"

### Main Content

#### 1. What Are Cookies?
- Cookie definition
- How cookies work
- Types of cookies
- Why we use cookies

#### 2. Types of Cookies We Use
- **Essential Cookies**
  - Required for site functionality
  - Cannot be disabled
  - Examples and purposes
- **Analytics Cookies**
  - Performance tracking
  - Usage analytics
  - Third-party services
- **Functional Cookies**
  - Enhanced features
  - User preferences
  - Personalization
- **Marketing Cookies**
  - Advertising
  - Targeting
  - Retargeting

#### 3. Third-Party Cookies
- Google Analytics
- Other third-party services
- Social media cookies
- Advertising partners

#### 4. Cookie List
- **Detailed Cookie Table**
  - Cookie name
  - Purpose
  - Duration
  - Type (First-party/Third-party)
  - Category
  - Can be disabled?

#### 5. Managing Your Cookie Preferences
- **Cookie Consent Banner**
  - How to access
  - Preference settings
  - Opt-out options
- **Browser Settings**
  - Chrome instructions
  - Firefox instructions
  - Safari instructions
  - Edge instructions
  - Mobile browser instructions
- **Third-Party Opt-Outs**
  - Google Analytics opt-out
  - Advertising network opt-outs
  - Social media opt-outs

#### 6. Impact of Disabling Cookies
- What features may not work
- Service limitations
- Essential cookies explanation

#### 7. Updates to Cookie Policy
- How we notify users
- Policy update process
- Last updated date

#### 8. Contact Us
- Cookie-related inquiries
- Privacy contact information
- Response time commitments

## Features

### Core Features

1. **Cookie Preference Center**
   - In-page cookie settings
   - Category toggles
   - Save preferences
   - Reset to defaults

2. **Cookie List Table**
   - Sortable columns
   - Filter by category
   - Search functionality
   - Expandable details

3. **Cookie Consent Integration**
   - Link to consent banner
   - Show current preferences
   - Update preferences
   - Withdraw consent

4. **Browser Instructions**
   - Step-by-step guides
   - Screenshots (optional)
   - Links to browser help

5. **Mobile Optimization**
   - Responsive table
   - Touch-friendly controls
   - Mobile cookie settings

### Advanced Features

1. **Interactive Cookie Settings**
   - Real-time preference updates
   - Visual feedback
   - Preference persistence
   - Sync with consent banner

2. **Cookie Analytics Dashboard**
   - Cookie usage statistics
   - Most used cookies
   - User preference trends

3. **Cookie Scanner**
   - Detect cookies on page
   - Show active cookies
   - Cookie purpose explanation

4. **Multi-Language Support**
   - Translated content
   - Language selector
   - Regional variations

## Design Elements

### Visual Design
- **Layout**: Clean, organized layout
- **Typography**: Use unified typography classes:
  - `section-heading` for page title
  - `subsection-heading` for section headings
  - `body-regular` for main content
  - `body-small` for metadata
- **Cookie Table**: Well-structured, sortable table
- **Color Coding**: Category-based color coding
- **Icons**: Visual indicators for cookie types

### Cookie Preference Center
- **Toggle Switches**: For each cookie category
- **Visual Feedback**: Show enabled/disabled state
- **Save Button**: Prominent save action
- **Reset Option**: Reset to defaults

### Responsive Design
- **Mobile**: Stacked layout, full-width
- **Tablet**: Two-column layout
- **Desktop**: Full table with sidebar

## Technical Implementation

### File Structure
```
/cookies
  index.tsx (main cookie policy page)
  components/
    CookiePreferenceCenter.tsx (interactive settings)
    CookieTable.tsx (cookie list table)
    CookieCategory.tsx (category section)
    BrowserInstructions.tsx (browser guides)
    CookieConsentBanner.tsx (consent banner - shared)
  hooks/
    useCookiePreferences.ts (cookie preference management)
    useCookieConsent.ts (consent state management)
  content/
    cookie-list.json (cookie data)
    browser-instructions.json (browser guides)
```

### Component Dependencies
- `@/components/ui/simple-hero-section` - Hero section
- `@/components/ui/card` - Preference cards
- `@/components/ui/button` - Action buttons
- `@/components/ui/switch` - Cookie toggles
- `@/components/ui/table` - Cookie table
- `@/components/ui/badge` - Category badges
- `lucide-react` - Icons

### Data Structure
```typescript
interface Cookie {
  id: string;
  name: string;
  purpose: string;
  duration: string; // "Session", "30 days", "1 year", etc.
  type: "first-party" | "third-party";
  category: CookieCategory;
  provider?: string; // For third-party cookies
  canDisable: boolean;
  essential: boolean;
}

type CookieCategory = "essential" | "analytics" | "functional" | "marketing";

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  updatedAt: Date;
}

interface CookieConsent {
  accepted: boolean;
  preferences: CookiePreferences;
  timestamp: Date;
  version: string;
}
```

### Cookie Consent Banner Integration
```typescript
// Shared cookie consent banner component
// Should be accessible from cookie policy page
// Allows users to update preferences anytime
```

## Content Strategy

### Cookie Categories

1. **Essential Cookies** (Required)
   - Authentication
   - Security
   - Load balancing
   - Session management

2. **Analytics Cookies** (Optional)
   - Google Analytics
   - Usage tracking
   - Performance monitoring

3. **Functional Cookies** (Optional)
   - User preferences
   - Language settings
   - Theme preferences

4. **Marketing Cookies** (Optional)
   - Advertising
   - Retargeting
   - Social media integration

### Cookie List Requirements
- Complete list of all cookies
- Clear purpose explanation
- Duration information
- Provider information
- Opt-out instructions

### Content Guidelines
- Use clear, simple language
- Explain technical terms
- Provide examples
- Include visual aids
- Regular updates as cookies change

## SEO & Analytics

### SEO
- Meta description
- Structured data (WebPage schema)
- Internal linking
- Sitemap inclusion
- Canonical URL

### Analytics
- Page views
- Preference changes
- Opt-out rate
- Category preferences
- Consent banner interactions

## Compliance Checklist

### GDPR Requirements
- ✅ Cookie consent mechanism
- ✅ Clear cookie information
- ✅ Opt-out options
- ✅ Granular consent (by category)
- ✅ Easy withdrawal of consent
- ✅ Cookie list disclosure
- ✅ Third-party cookie disclosure

### CCPA Requirements
- ✅ Cookie disclosure
- ✅ Opt-out mechanisms
- ✅ Do Not Sell option (if applicable)

### Other Requirements
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Mobile responsive
- ✅ Print-friendly
- ✅ Clear language

## Integration Points

1. **Cookie Consent Banner**
   - Shared component
   - Preference sync
   - Consent tracking
   - Withdrawal mechanism

2. **Privacy Policy**
   - Cross-reference privacy policy
   - Link to privacy page
   - Cookie section in privacy

3. **User Settings**
   - Cookie preferences in settings
   - Preference management
   - Consent history

4. **Analytics**
   - Respect cookie preferences
   - Conditional loading
   - Opt-out handling

5. **Third-Party Services**
   - Conditional loading
   - Opt-out integration
   - Provider links

## Cookie Consent Banner Requirements

### Banner Features
- Clear message
- Category toggles
- Accept all / Reject all
- Customize preferences
- Save preferences
- Persistent until action

### Integration
- Show on first visit
- Respect user preferences
- Update from cookie policy page
- Withdraw consent option

## Success Metrics

- Page views
- Preference changes
- Opt-out rate
- Consent acceptance rate
- Category preferences
- User engagement

## Future Enhancements

1. **Advanced Cookie Management**
   - Per-cookie control
   - Cookie expiration management
   - Cookie blocking rules

2. **Cookie Analytics**
   - Usage dashboard
   - Preference trends
   - Compliance metrics

3. **Automated Cookie Detection**
   - Cookie scanner
   - New cookie alerts
   - Auto-categorization

4. **Multi-Language Support**
   - Translated content
   - Language selector
   - Regional compliance

---

**Priority**: High (GDPR Compliance)
**Estimated Implementation**: 3-4 days (including consent banner)
**Legal Review Required**: Yes


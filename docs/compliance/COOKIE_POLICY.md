# Cookie Policy

**Last Updated:** 2025-01-05  
**Effective Date:** 2025-01-05  
**Compliance:** PDPL, GDPR

---

## Overview

This Cookie Policy explains how nbcon.ai ("we", "us", "our") uses cookies and similar tracking technologies on our website and application. This policy describes what types of cookies we use, what information we collect through cookies, and how you can manage your cookie preferences.

---

## What Are Cookies?

Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies help us provide you with a better experience by:

- Remembering your preferences
- Analyzing how you use our services
- Improving website functionality
- Enabling certain features

---

## Types of Cookies We Use

### 1. Essential Cookies (Strictly Necessary)

**Purpose:** Required for the website to function properly  
**Legal Basis:** Legitimate interest (service delivery)  
**Consent Required:** No (exempt from consent requirement)

**Cookies Used:**

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| `sb-*-auth-token` | Supabase | Authentication session | Session |
| `sb-*-refresh-token` | Supabase | Session refresh | 30 days |
| `next-auth.session-token` | Next.js | Session management | Session |

**Can I Opt-Out?** No - These cookies are essential for the website to work. Disabling them will prevent you from logging in or using the service.

---

### 2. Analytics Cookies

**Purpose:** Understand how users interact with our website  
**Legal Basis:** Consent  
**Consent Required:** Yes

**Cookies Used:**

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| `_ph_*` | PostHog | Analytics tracking | 13 months |
| `_ph_posthog` | PostHog | User identification | 13 months |
| `_ph_optout` | PostHog | Opt-out preference | 13 months |

**Data Collected:**
- Page views
- User interactions (clicks, scrolls)
- Session duration
- Device information (browser, OS, screen size)
- Referral sources
- User ID (hashed)

**Privacy Settings:**
- IP addresses anonymized
- User identification via hashed user IDs only
- No sensitive data collected
- No cross-site tracking

**Can I Opt-Out?** Yes - You can opt-out via:
1. Cookie consent banner (on first visit)
2. Settings page: `/settings/privacy`
3. PostHog opt-out: `https://us.posthog.com/opt-out`

---

### 3. Error Tracking Cookies

**Purpose:** Monitor and fix errors in the application  
**Legal Basis:** Legitimate interest (service reliability)  
**Consent Required:** Yes (for PII)

**Cookies Used:**

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| `sentry-*` | Sentry | Error tracking | 90 days |

**Data Collected:**
- Error messages and stack traces
- Browser/device information
- Request metadata
- User ID (if available, hashed)
- IP address (can be masked)

**Privacy Settings:**
- PII scrubbing enabled (email addresses, passwords, tokens removed)
- IP masking optional (can be enabled)
- Minimal user data (user ID only, if available)
- No sensitive data in error logs

**Can I Opt-Out?** Yes - Error tracking can be disabled via:
1. Cookie consent banner
2. Settings page: `/settings/privacy`
3. Sentry configuration (requires development change)

---

### 4. Functional Cookies

**Purpose:** Remember your preferences and settings  
**Legal Basis:** Consent  
**Consent Required:** Yes

**Cookies Used:**

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| `theme-preference` | Next.js | Theme preference (light/dark) | 1 year |
| `language-preference` | Next.js | Language preference (EN/AR) | 1 year |
| `sidebar-collapsed` | Next.js | Sidebar state | Session |

**Can I Opt-Out?** Yes - Functional cookies can be disabled, but you will need to set preferences each time you visit.

---

## Third-Party Cookies

### PostHog Analytics

**Provider:** PostHog Inc.  
**Purpose:** Product analytics and user behavior tracking  
**Privacy Policy:** https://posthog.com/privacy  
**Data Processing:** US-based servers (PostHog Cloud)

**Data Collected:**
- User events (page views, clicks, etc.)
- Session data
- User properties (subscription tier, etc.)
- Device information

**Privacy Controls:**
- IP addresses anonymized
- User IDs hashed
- No cross-site tracking
- Data retention: 25 months (PostHog default)

---

### Sentry Error Tracking

**Provider:** Sentry, Inc.  
**Purpose:** Error monitoring and debugging  
**Privacy Policy:** https://sentry.io/privacy/  
**Data Processing:** US-based servers (Sentry Cloud)

**Data Collected:**
- Error messages and stack traces
- Browser/device information
- Request metadata
- User context (minimal)

**Privacy Controls:**
- PII scrubbing enabled
- IP masking available
- Minimal user data
- Data retention: 90 days (Sentry default)

---

## Cookie Consent Management

### Consent Banner

**When Shown:** On first visit to the website  
**Required:** Yes (for analytics and error tracking cookies)

**Options:**
- **Accept All:** Accepts all cookies (essential + analytics + error tracking)
- **Reject All:** Accepts only essential cookies
- **Customize:** Choose which cookie categories to accept

**Consent Storage:**
- Stored in localStorage: `cookie-consent`
- Expires: 1 year
- Can be updated anytime via Settings page

---

### Managing Cookie Preferences

**Settings Page:** `/settings/privacy`

**Options Available:**
1. **Analytics Cookies:** Enable/disable PostHog tracking
2. **Error Tracking:** Enable/disable Sentry error tracking
3. **Functional Cookies:** Enable/disable preference storage
4. **View Cookie Details:** See all cookies currently stored

**How to Update:**
1. Navigate to Settings → Privacy
2. Toggle cookie categories on/off
3. Changes take effect immediately
4. Some cookies may require page refresh

---

## Cookie Retention

### Retention Periods

| Cookie Category | Retention Period | Reason |
|----------------|------------------|--------|
| Essential | Session to 30 days | Required for service functionality |
| Analytics | 13 months | PostHog default retention |
| Error Tracking | 90 days | Sentry default retention |
| Functional | Session to 1 year | User preference storage |

### Automatic Deletion

- **Session Cookies:** Deleted when browser closes
- **Persistent Cookies:** Deleted after expiration date
- **Analytics Cookies:** Deleted after 13 months (PostHog)
- **Error Tracking Cookies:** Deleted after 90 days (Sentry)

### Manual Deletion

You can delete cookies manually:
1. **Browser Settings:** Clear cookies via browser settings
2. **Settings Page:** Clear all cookies via `/settings/privacy`
3. **Opt-Out:** PostHog and Sentry provide opt-out mechanisms

---

## Your Rights

### Right to Access

You have the right to know what cookies are stored on your device:
- **View Cookies:** Check browser settings or use browser developer tools
- **Cookie List:** Available on Settings page: `/settings/privacy`

### Right to Delete

You have the right to delete cookies:
- **Browser Settings:** Clear cookies via browser settings
- **Settings Page:** Clear all cookies via `/settings/privacy`
- **Opt-Out:** Use opt-out mechanisms for third-party cookies

### Right to Withdraw Consent

You can withdraw consent at any time:
- **Settings Page:** `/settings/privacy`
- **Cookie Banner:** Reject all non-essential cookies
- **Contact:** Email support@nbcon.pro

---

## Impact of Disabling Cookies

### Essential Cookies (Cannot Disable)

Disabling essential cookies will prevent you from:
- Logging into your account
- Accessing protected pages
- Using authentication features
- Maintaining session state

### Analytics Cookies (Can Disable)

Disabling analytics cookies will:
- ✅ Still allow full website functionality
- ❌ Prevent us from improving user experience based on usage data
- ❌ Prevent personalized recommendations

### Error Tracking (Can Disable)

Disabling error tracking will:
- ✅ Still allow full website functionality
- ❌ Prevent us from quickly fixing errors you encounter
- ❌ Prevent proactive error monitoring

---

## Children's Privacy

Our services are not intended for children under 13 (or 16 in EU). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.

---

## Changes to This Policy

We may update this Cookie Policy from time to time. We will notify you of any changes by:
- Posting the new policy on this page
- Updating the "Last Updated" date
- Sending email notification (for significant changes)
- Showing a banner on the website (for significant changes)

---

## Contact Us

If you have questions about our use of cookies, please contact us:

- **Email:** support@nbcon.pro
- **Privacy Email:** privacy@nbcon.pro
- **Settings Page:** `/settings/privacy`
- **Cookie Preferences:** `/settings/privacy#cookies`

---

## Additional Resources

- **Privacy Policy:** `/docs/privacy-policy`
- **Terms of Service:** `/docs/terms-of-service`
- **Data Retention Policy:** `/docs/compliance/data-retention-policies`
- **Data Deletion Workflow:** `/docs/compliance/data-deletion-workflow`

---

**Document Owner:** Compliance Team  
**Review Frequency:** Annually  
**Next Review:** 2026-01-05


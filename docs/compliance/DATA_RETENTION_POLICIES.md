# Data Retention Policies

**Last Updated:** 2025-01-05  
**Status:** Active  
**Compliance:** PDPL, ISO 27001

---

## Overview

This document outlines the data retention policies for all data stored in the NBCON platform. All retention periods comply with PDPL (Personal Data Protection Law) requirements and ISO 27001 standards.

---

## Retention Periods by Data Type

### 1. User Profile Data (`profiles` table)

**Retention Period:** Indefinite (until account deletion)  
**Purpose:** User account management, service delivery  
**Legal Basis:** Contract performance

**Data Stored:**
- User ID (UUID)
- Full name
- Subscription tier
- Admin status
- Created/updated timestamps

**Retention Rules:**
- Retained while user account is active
- Deleted immediately upon user account deletion (CASCADE)
- Backup retention: 30 days after deletion (for recovery purposes)

**Deletion Process:**
- Automatic: CASCADE deletion when `auth.users` record is deleted
- Manual: User-initiated account deletion via settings page
- GDPR/PDPL: Right to be forgotten requests processed within 30 days

---

### 2. Authentication Data (`auth.users` table - Supabase managed)

**Retention Period:** Indefinite (until account deletion)  
**Purpose:** User authentication and authorization  
**Legal Basis:** Contract performance, security

**Data Stored:**
- Email address (encrypted)
- Password hash (never stored in plain text)
- Email verification status
- Last login timestamp
- Metadata (full_name, etc.)

**Retention Rules:**
- Retained while user account is active
- Deleted immediately upon account deletion request
- Backup retention: 90 days after deletion (for security audit)

**Deletion Process:**
- Automatic: Via Supabase Auth deletion API
- Manual: Admin-initiated deletion
- GDPR/PDPL: Processed within 30 days of request

---

### 3. Billing Events (`billing_events` table)

**Retention Period:** 7 years (financial record requirement)  
**Purpose:** Financial records, tax compliance, dispute resolution  
**Legal Basis:** Legal obligation (tax law)

**Data Stored:**
- User ID
- Stripe event ID
- Subscription tier
- Payment status
- Timestamp

**Retention Rules:**
- Retained for 7 years from transaction date (tax compliance)
- After 7 years: Automatically anonymized (user_id removed, data aggregated)
- Financial summary data retained indefinitely (aggregated, non-identifiable)

**Deletion Process:**
- Automatic: Anonymization after 7 years (via scheduled job)
- Manual: Never deleted (financial records must be retained)
- Exception: User account deletion → anonymize user_id, keep event data

---

### 4. AI Usage Logs (`ai_logs` table)

**Retention Period:** 12 months  
**Purpose:** Service improvement, usage analytics, debugging  
**Legal Basis:** Legitimate interest (service improvement)

**Data Stored:**
- User ID
- Agent type (civil, electrical, etc.)
- Input text (user prompt)
- Output text (AI response)
- Tokens used
- Timestamp

**Retention Rules:**
- Active retention: 12 months
- After 12 months: Automatically deleted (scheduled cleanup)
- Aggregated statistics: Retained indefinitely (no personal data)

**Deletion Process:**
- Automatic: Scheduled cleanup job runs weekly
- Manual: Can be deleted earlier upon user request
- Exception: Logs may be retained longer if required for legal/compliance purposes

**Cleanup Function:**
```sql
-- Scheduled via pg_cron (weekly)
DELETE FROM ai_logs
WHERE created_at < NOW() - INTERVAL '12 months';
```

---

### 5. Audit Logs (`audit_logs` table)

**Retention Period:** 12 months  
**Purpose:** Security monitoring, compliance auditing, incident investigation  
**Legal Basis:** Legal obligation (security compliance)

**Data Stored:**
- User ID
- Action type (login, tier_change, admin_action, etc.)
- Metadata (JSONB)
- Timestamp

**Retention Rules:**
- Active retention: 12 months
- After 12 months: Automatically deleted (scheduled cleanup)
- Critical security events: Retained for 24 months (flagged in metadata)

**Deletion Process:**
- Automatic: Scheduled cleanup job runs weekly
- Manual: Never manually deleted (audit integrity)
- Exception: Extended retention for security incidents

**Cleanup Function:**
```sql
-- Scheduled via pg_cron (weekly, Sundays at 2 AM)
DELETE FROM audit_logs
WHERE created_at < NOW() - INTERVAL '12 months'
  AND (metadata->>'critical')::boolean IS NOT TRUE;

-- Critical events retained for 24 months
DELETE FROM audit_logs
WHERE created_at < NOW() - INTERVAL '24 months';
```

---

### 6. Analytics Data (PostHog)

**Retention Period:** 25 months (PostHog default)  
**Purpose:** Product analytics, user behavior analysis  
**Legal Basis:** Legitimate interest (product improvement)

**Data Stored:**
- User ID (hashed)
- Event names and properties
- Session data
- Device information
- IP address (anonymized)

**Retention Rules:**
- Active retention: 25 months (PostHog default)
- After retention: Automatically deleted by PostHog
- Aggregated reports: Retained indefinitely (no personal data)

**Deletion Process:**
- Automatic: PostHog handles deletion after retention period
- Manual: User can request data deletion via PostHog dashboard
- GDPR/PDPL: Data export and deletion available on request

**Privacy Settings:**
- IP addresses: Anonymized by default
- User identification: Hashed user IDs only
- No sensitive data: Email addresses, passwords never sent to PostHog

---

### 7. Error Tracking Data (Sentry)

**Retention Period:** 90 days (Sentry default, can be extended)  
**Purpose:** Error monitoring, debugging, performance tracking  
**Legal Basis:** Legitimate interest (service reliability)

**Data Stored:**
- Error messages and stack traces
- User ID (if available)
- Browser/device information
- Request metadata
- IP address (can be masked)

**Retention Rules:**
- Active retention: 90 days (Sentry default)
- After retention: Automatically deleted by Sentry
- Critical errors: Retained for 180 days (flagged)

**Deletion Process:**
- Automatic: Sentry handles deletion after retention period
- Manual: Can be deleted earlier via Sentry dashboard
- GDPR/PDPL: Data scrubbing enabled for sensitive data

**Privacy Settings:**
- PII scrubbing: Enabled (email addresses, passwords, tokens removed)
- IP masking: Optional (can be enabled)
- User data: Minimal (user ID only, if available)

---

## Automated Cleanup Schedule

### Weekly Cleanup (Sundays at 2 AM UTC)

1. **AI Logs Cleanup**
   - Delete logs older than 12 months
   - Preserve aggregated statistics

2. **Audit Logs Cleanup**
   - Delete non-critical logs older than 12 months
   - Delete critical logs older than 24 months

### Monthly Cleanup (1st of month)

1. **Billing Events Anonymization**
   - Anonymize user_id for events older than 7 years
   - Preserve financial data for tax compliance

### Manual Cleanup (On-Demand)

1. **User Account Deletion**
   - Immediate deletion of user profile
   - CASCADE deletion of related records
   - Anonymization of billing events (keep financial data)

---

## Data Retention Compliance

### PDPL Compliance

✅ **Right to Access:** Users can request their data export  
✅ **Right to Deletion:** Users can request account deletion  
✅ **Right to Rectification:** Users can update their profile data  
✅ **Data Minimization:** Only necessary data is collected  
✅ **Retention Limits:** Clear retention periods defined  
✅ **Storage Limitation:** Data deleted after retention period

### ISO 27001 Compliance

✅ **A.12.3.1 Information Backup:** Regular backups with retention  
✅ **A.18.1.3 Privacy and Protection of PII:** Data retention policies documented  
✅ **A.12.4.1 Event Logging:** Audit logs retained for security monitoring

---

## Backup Retention

### Database Backups

- **Daily Backups:** Retained for 30 days
- **Weekly Backups:** Retained for 90 days
- **Monthly Backups:** Retained for 1 year

### Backup Deletion

- Automatic deletion after retention period
- Manual deletion available for GDPR/PDPL requests
- Backup restoration: Available for 30 days after account deletion

---

## User Rights

### Right to Access

Users can request a copy of their personal data:
- **Request Method:** Via settings page or email to support
- **Response Time:** Within 30 days
- **Format:** JSON or CSV export

### Right to Deletion

Users can request account deletion:
- **Request Method:** Via settings page or email to support
- **Response Time:** Within 30 days
- **Process:** Immediate deletion of personal data, anonymization of financial records

### Right to Rectification

Users can update their data:
- **Request Method:** Via settings page
- **Response Time:** Immediate (self-service)
- **Scope:** Profile data, preferences

---

## Exceptions and Legal Holds

### Legal Holds

Data may be retained longer than the standard retention period if:
- Legal investigation is ongoing
- Court order requires data retention
- Regulatory investigation requires data retention

### Extended Retention

Critical security events may be retained longer:
- Security incidents: 24 months (instead of 12)
- Financial disputes: 7 years (billing events)
- Legal requirements: As required by law

---

## Monitoring and Enforcement

### Automated Monitoring

- **Scheduled Jobs:** pg_cron for database cleanup
- **Alerts:** Notifications if cleanup jobs fail
- **Audit Trail:** All cleanup actions logged

### Manual Verification

- **Quarterly Review:** Verify retention policies are being followed
- **Annual Audit:** Comprehensive data retention audit
- **Compliance Check:** PDPL and ISO 27001 compliance verification

---

## Contact

For questions about data retention or to exercise your rights:
- **Email:** support@nbcon.pro
- **Settings Page:** `/settings/privacy`
- **Data Export:** `/settings/data-export`
- **Account Deletion:** `/settings/delete-account`

---

**Document Owner:** Compliance Team  
**Review Frequency:** Quarterly  
**Next Review:** 2025-04-05


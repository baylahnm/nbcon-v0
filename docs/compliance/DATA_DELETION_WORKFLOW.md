# Data Deletion Workflow

**Last Updated:** 2025-01-05  
**Status:** Active  
**Compliance:** PDPL, GDPR, ISO 27001

---

## Overview

This document describes the workflow for deleting user data in compliance with PDPL (Personal Data Protection Law), GDPR, and user rights. The workflow ensures complete data deletion while maintaining data integrity for financial and legal records.

---

## User-Initiated Account Deletion

### Process Flow

```
1. User requests deletion
   ↓
2. System verifies identity
   ↓
3. System warns about data loss
   ↓
4. User confirms deletion
   ↓
5. System processes deletion
   ↓
6. System sends confirmation
   ↓
7. Data permanently deleted (30-day recovery window)
```

### Implementation Steps

#### Step 1: User Request

**Location:** Settings page (`/settings/delete-account`)

**User Actions:**
1. Navigate to Settings → Privacy → Delete Account
2. Enter password to confirm identity
3. Read deletion warning
4. Confirm deletion

**System Actions:**
- Validate password
- Display data deletion summary
- Show recovery period (30 days)
- Require explicit confirmation

#### Step 2: Identity Verification

**Security Measures:**
- Password verification required
- Email confirmation sent (optional)
- 2FA verification if enabled
- Session validation

**Verification Code:**
```typescript
// apps/web/src/lib/auth.ts
export async function verifyDeletionRequest(
  userId: string,
  password: string
): Promise<boolean> {
  // Verify password
  // Check session
  // Return verification status
}
```

#### Step 3: Deletion Processing

**Immediate Deletion:**
- User profile (`profiles` table)
- Authentication data (`auth.users` - Supabase)
- AI logs (`ai_logs` table)
- Audit logs (user-specific entries)

**Anonymization (Not Deletion):**
- Billing events (`billing_events` table)
  - User ID anonymized
  - Financial data preserved (tax compliance)
  - Event data retained (legal requirement)

**Deletion SQL:**
```sql
-- Delete user profile (CASCADE deletes related records)
DELETE FROM auth.users WHERE id = :userId;

-- CASCADE automatically deletes:
-- - profiles (user_id foreign key)
-- - ai_logs (user_id foreign key, ON DELETE CASCADE)
-- - audit_logs (user_id foreign key, ON DELETE CASCADE)

-- Anonymize billing events (keep financial records)
UPDATE billing_events
SET user_id = NULL
WHERE user_id = :userId;
```

#### Step 4: External Services

**PostHog:**
- Delete user data via PostHog API
- Anonymize events (if deletion not possible)
- Response time: Within 30 days

**Sentry:**
- Delete user data via Sentry API
- Scrub error logs (remove user identifiers)
- Response time: Within 30 days

**Stripe:**
- Delete customer data (if not required for tax records)
- Anonymize transaction records
- Response time: Within 30 days

#### Step 5: Confirmation

**User Notification:**
- Email confirmation sent
- Deletion summary provided
- Recovery period explained (30 days)
- Support contact information

**System Logging:**
- Deletion event logged in audit_logs (before deletion)
- Deletion timestamp recorded
- Recovery token generated (30-day validity)

---

## Admin-Initiated Deletion

### Process Flow

```
1. Admin identifies user for deletion
   ↓
2. System verifies admin permissions
   ↓
3. System checks for legal holds
   ↓
4. Admin confirms deletion
   ↓
5. System processes deletion
   ↓
6. System logs admin action
   ↓
7. Data permanently deleted
```

### Implementation Steps

#### Step 1: Admin Access

**Required Permissions:**
- `is_admin = true` in profiles table
- Admin role verified
- Action logged in audit_logs

#### Step 2: Legal Hold Check

**Checks Performed:**
- Active legal investigations
- Court orders requiring data retention
- Regulatory investigations
- Pending disputes

**If Legal Hold Active:**
- Deletion blocked
- Admin notified
- Legal team contacted
- Data retained until hold lifted

#### Step 3: Deletion Processing

**Same as User-Initiated Deletion:**
- Immediate deletion of personal data
- Anonymization of financial records
- External service cleanup

**Additional Steps:**
- Admin action logged
- Notification sent to user (if possible)
- Compliance team notified

---

## GDPR/PDPL Right to Be Forgotten

### Process Flow

```
1. User submits deletion request
   ↓
2. System verifies request legitimacy
   ↓
3. System processes deletion (same as account deletion)
   ↓
4. System confirms deletion within 30 days
   ↓
5. Data permanently deleted
```

### Request Methods

**Email Request:**
- Send to: support@nbcon.pro
- Subject: "Data Deletion Request"
- Include: User ID or email address
- Include: Identity verification

**Form Request:**
- URL: `/settings/data-deletion-request`
- Requires: Login and password verification
- Includes: Deletion scope selection

**Postal Request:**
- Address: [Company Address]
- Include: Signed request form
- Include: Identity verification documents

### Response Timeline

- **Acknowledgment:** Within 7 days
- **Processing:** Within 30 days
- **Confirmation:** Within 30 days
- **Extension:** Up to 60 days (with notification)

---

## Data Deletion Scope

### Immediately Deleted

| Data Type | Table | Deletion Method |
|-----------|-------|----------------|
| User Profile | `profiles` | CASCADE DELETE |
| Authentication | `auth.users` | Supabase API |
| AI Logs | `ai_logs` | CASCADE DELETE |
| Audit Logs | `audit_logs` | CASCADE DELETE |
| PostHog Events | PostHog | API Delete |
| Sentry Errors | Sentry | API Delete |

### Anonymized (Not Deleted)

| Data Type | Table | Anonymization Method |
|-----------|-------|---------------------|
| Billing Events | `billing_events` | user_id → NULL |
| Financial Records | Stripe | Customer anonymized |
| Aggregated Stats | Analytics | User ID removed |

### Retained (Legal Requirement)

| Data Type | Reason | Retention Period |
|-----------|--------|------------------|
| Financial Records | Tax compliance | 7 years |
| Legal Holds | Court order | Until hold lifted |
| Security Incidents | Investigation | 24 months |

---

## Recovery Period

### 30-Day Recovery Window

**Purpose:**
- Allow users to recover accidentally deleted accounts
- Provide grace period for account recovery
- Maintain data integrity during recovery period

**Process:**
1. Deletion request processed
2. Account marked as "pending deletion"
3. Data retained for 30 days
4. User can cancel deletion within 30 days
5. After 30 days: Permanent deletion

**Recovery Token:**
- Generated upon deletion request
- Sent to user email
- Valid for 30 days
- One-time use only

**Recovery URL:**
```
/settings/recover-account?token=<recovery_token>
```

---

## Automated Deletion Jobs

### Scheduled Cleanup

**Weekly (Sundays at 2 AM UTC):**
- Delete AI logs older than 12 months
- Delete audit logs older than 12 months (non-critical)
- Delete audit logs older than 24 months (critical)

**Monthly (1st of month):**
- Anonymize billing events older than 7 years
- Clean up orphaned records
- Verify deletion compliance

### Cleanup SQL

```sql
-- Weekly cleanup: AI logs
DELETE FROM ai_logs
WHERE created_at < NOW() - INTERVAL '12 months';

-- Weekly cleanup: Audit logs (non-critical)
DELETE FROM audit_logs
WHERE created_at < NOW() - INTERVAL '12 months'
  AND (metadata->>'critical')::boolean IS NOT TRUE;

-- Monthly cleanup: Billing events anonymization
UPDATE billing_events
SET user_id = NULL
WHERE user_id IS NOT NULL
  AND created_at < NOW() - INTERVAL '7 years';
```

---

## Verification and Testing

### Test Scenarios

1. **User Account Deletion**
   - ✅ Verify profile deleted
   - ✅ Verify AI logs deleted
   - ✅ Verify audit logs deleted
   - ✅ Verify billing events anonymized
   - ✅ Verify external services cleaned

2. **Admin Account Deletion**
   - ✅ Verify admin permissions checked
   - ✅ Verify legal holds checked
   - ✅ Verify admin action logged

3. **GDPR/PDPL Request**
   - ✅ Verify request processed within 30 days
   - ✅ Verify confirmation sent
   - ✅ Verify data completely deleted

4. **Recovery Process**
   - ✅ Verify recovery token works
   - ✅ Verify account restored within 30 days
   - ✅ Verify data intact after recovery

### Test Commands

```bash
# Test deletion workflow (development only)
pnpm run test:deletion-workflow

# Verify deletion compliance
pnpm run test:deletion-compliance

# Audit deletion logs
pnpm run audit:deletion-logs
```

---

## Monitoring and Alerts

### Deletion Monitoring

**Metrics Tracked:**
- Deletion requests per day
- Deletion processing time
- Deletion failures
- Recovery requests
- Legal hold blocks

**Alerts:**
- Deletion job failures
- Processing time > 30 days
- High deletion failure rate
- Legal hold violations

### Audit Trail

**Logged Events:**
- Deletion request received
- Identity verification completed
- Deletion processing started
- Deletion processing completed
- External service cleanup completed
- Recovery token generated
- Account recovered (if applicable)

**Audit Log Format:**
```json
{
  "action": "user_account_deletion",
  "user_id": "uuid",
  "requested_by": "user|admin",
  "timestamp": "2025-01-05T10:00:00Z",
  "status": "completed",
  "deletion_scope": ["profile", "ai_logs", "audit_logs"],
  "anonymized_scope": ["billing_events"],
  "recovery_token": "token_hash"
}
```

---

## Compliance Checklist

### PDPL Compliance

- ✅ Right to deletion implemented
- ✅ Deletion processed within 30 days
- ✅ User notified of deletion
- ✅ Data completely removed (where applicable)
- ✅ Financial records anonymized (legal requirement)
- ✅ Recovery period provided (30 days)

### GDPR Compliance

- ✅ Right to be forgotten implemented
- ✅ Deletion request methods provided
- ✅ Identity verification required
- ✅ Deletion confirmation sent
- ✅ External services cleaned
- ✅ Audit trail maintained

### ISO 27001 Compliance

- ✅ Deletion procedures documented
- ✅ Access controls enforced
- ✅ Audit logging implemented
- ✅ Data integrity maintained
- ✅ Legal holds respected

---

## Contact and Support

### Deletion Requests

- **Email:** support@nbcon.pro
- **Subject:** "Data Deletion Request"
- **Response Time:** Within 7 days (acknowledgment), 30 days (completion)

### Recovery Requests

- **Email:** support@nbcon.pro
- **Subject:** "Account Recovery Request"
- **Include:** Recovery token (if available)
- **Response Time:** Within 24 hours

### Technical Support

- **Email:** tech@nbcon.pro
- **Documentation:** `/docs/compliance/data-deletion`
- **FAQ:** `/docs/faq/data-deletion`

---

**Document Owner:** Compliance Team  
**Review Frequency:** Quarterly  
**Next Review:** 2025-04-05


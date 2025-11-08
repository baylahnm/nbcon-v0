# PDPL & ISO 27001 Compliance Checklist

## Data Hosting & Residency
- [x] Data hosted in KSA region (Supabase Middle East)
- [x] Backup storage within KSA boundaries
- [x] CDN nodes configured for regional delivery

## Access Control & Security
- [x] Row Level Security (RLS) active on all tables
- [x] Service role keys stored securely
- [x] API keys environment-based (never in code)
- [x] User authentication via Supabase Auth

## Data Protection
- [x] Encryption at rest (AES-256)
- [x] Encryption in transit (TLS 1.3)
- [x] Database encryption enabled

## Audit & Logging
- [x] Admin actions logged to `audit_logs` table
- [x] PDPL audit hooks enabled in production
- [x] Tier changes tracked in `billing_events`
- [x] AI usage logged in `ai_logs`

## Data Retention
- [x] 12-month retention policy enforced
- [x] Auto-anonymization post-expiry
- [x] Archived data purged after retention period

## Privacy Controls
- [x] User data export functionality (GDPR-style)
- [x] User data deletion on request
- [x] Consent management for data processing

## Documentation
- [x] Privacy policy documented
- [x] Terms of service defined
- [x] Data processing agreements in place

## Compliance Status
- **PDPL:** ✅ Compliant
- **ISO 27001:** ✅ Aligned
- **Last Audit:** Pending initial certification


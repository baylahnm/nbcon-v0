# Directory Tree - NBCON PRO

**Last Updated:** 2025-01-06  
**Recent Updates:** Email templates updated with "nbcon" branding, production validation documentation added

---

## Project Structure

```
nbcon_v0/
├── apps/
│   └── web/                          # Next.js 15 web application
│       ├── src/
│       │   ├── components/           # React components
│       │   ├── pages/                # Next.js pages
│       │   ├── hooks/                # React hooks
│       │   ├── lib/                  # Utilities and configurations
│       │   └── config/               # App configuration
│       ├── public/                   # Static assets
│       ├── .env.local                # Environment variables (local)
│       └── package.json
│
├── packages/
│   ├── ai-core/                     # AI agent registry and schemas
│   ├── config/                      # Shared configuration (Supabase, Stripe)
│   ├── ui/                          # Shared UI components
│   └── enterprise-sdk/              # Enterprise SDK
│
├── supabase/
│   ├── functions/                   # Edge Functions
│   │   ├── stripe-checkout/         # Stripe checkout session creation
│   │   ├── stripe-webhook/          # Stripe webhook handler
│   │   ├── stripe-portal/           # Stripe Customer Portal
│   │   └── lifecycle-cron/          # Scheduled lifecycle tasks
│   ├── migrations/                  # Database migrations
│   └── email-templates/             # ✅ Email templates (updated 2025-01-06)
│       ├── 01-confirm-signup.html   # ✅ Updated: "nbcon" branding
│       ├── 02-invite-user.html      # ✅ Updated: "nbcon" branding
│       ├── 03-magic-link.html       # ✅ Updated: "nbcon" branding
│       ├── 04-change-email.html     # ✅ Updated: "nbcon" branding
│       ├── 05-reset-password.html   # ✅ Updated: "nbcon" branding
│       ├── 06-reauthentication.html # ✅ Updated: "nbcon" branding
│       └── README.md                 # Template documentation
│
├── docs/
│   ├── production-validation/       # Production validation docs
│   │   ├── DIRECTORY_TREE.md        # This file
│   │   ├── EMAIL_TEMPLATES_UPDATE_PLAN.md  # ✅ Updated: Templates completed
│   │   ├── future-roadmap.md        # ✅ Updated: Email templates task added
│   │   └── production-checklist.md  # ✅ Updated: Email template verification added
│   ├── compliance/                  # Compliance documentation (PDPL, ISO 27001)
│   ├── security/                    # Security audit documentation
│   └── content/                     # Documentation content (MDX)
│
├── scripts/
│   └── production-validation/       # Validation scripts
│
├── .github/
│   └── workflows/                   # CI/CD pipelines
│
├── package.json                     # Root package.json (pnpm workspace)
├── pnpm-workspace.yaml              # pnpm workspace configuration
└── .env.example                     # Environment variables template
```

---

## Email Templates Directory

**Location:** `supabase/email-templates/`

**Status:** ✅ All templates updated with "nbcon" branding (2025-01-06)

### Templates

1. **01-confirm-signup.html** ✅
   - Subject: "Your verification code for nbcon"
   - Purpose: OTP code for email verification during signup

2. **02-invite-user.html** ✅
   - Subject: "You've been invited to nbcon"
   - Purpose: Team/organization invites

3. **03-magic-link.html** ✅
   - Subject: "Your verification code for {{ .SiteURL }}"
   - Purpose: Passwordless login

4. **04-change-email.html** ✅
   - Subject: "Your magic link for nbcon"
   - Purpose: Email change confirmation

5. **05-reset-password.html** ✅
   - Subject: "Reset your password for nbcon"
   - Purpose: Password reset flow

6. **06-reauthentication.html** ✅
   - Subject: "Your verification code for nbcon"
   - Purpose: Re-authentication for sensitive actions

### Branding Consistency

All templates now use:
- **App Name**: "nbcon" (not "NBCON PRO")
- **Tagline**: "Saudi Arabia's Professional Engineering Marketplace"
- **Logo**: "nb" glyph in rounded square with gradient (#2D5346 to #50635C)
- **Footer**: nbcon.app · info@nbcon.app · +966 56 622 2179

### Next Steps

1. Copy templates from `supabase/email-templates/` to Supabase Dashboard
2. Navigate to: Supabase Dashboard > Authentication > Email Templates
3. Upload each template and verify subject lines
4. Send test emails to verify rendering

---

## Key Configuration Files

### Environment Variables
- **Location**: `apps/web/.env.local`
- **Template**: `.env.example` (root)
- **Required Variables**: See `apps/web/ENV_VARS_README.md` (if exists)

### Supabase Configuration
- **Client**: `packages/config/supabase-client.ts`
- **Edge Functions**: `supabase/functions/`
- **Migrations**: `supabase/migrations/`

### Stripe Configuration
- **Edge Functions**: 
  - `supabase/functions/stripe-checkout/`
  - `supabase/functions/stripe-webhook/`
  - `supabase/functions/stripe-portal/`

---

## Documentation Files

### Production Validation
- `docs/production-validation/DIRECTORY_TREE.md` - This file
- `docs/production-validation/EMAIL_TEMPLATES_UPDATE_PLAN.md` - Email template update plan
- `docs/production-validation/future-roadmap.md` - Complete roadmap
- `docs/production-validation/production-checklist.md` - Validation checklist

### Compliance
- `docs/compliance/Compliance_Checklist.md` - PDPL compliance
- `docs/security/Security_Audit.md` - ISO 27001 alignment

---

**Note:** This directory tree reflects the current state of the project as of 2025-01-06, with all email templates updated to use "nbcon" branding.


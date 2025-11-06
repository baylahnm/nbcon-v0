# Email Templates Update Plan

**Last Updated:** 2025-01-06  
**Status:** ✅ **COMPLETED** - All templates updated with "nbcon" branding

## Objective
Update all Supabase email templates for nbcon with consistent branding and messaging.

## Current Status
- ✅ **COMPLETED** - All 6 email templates updated with "nbcon" branding
- Templates provided from old project (Wazeer/nbcon)
- Adapted for nbcon: "Saudi Arabia's Professional Engineering Marketplace"
- Logo: "nb" glyph in rounded square with gradient (#2D5346 to #50635C)

## Branding Details
- **App Name**: nbcon (displayed as "nbcon" in all emails)
- **Tagline**: "Saudi Arabia's Professional Engineering Marketplace"
- **Primary Color**: #2D5346 (Dark Green)
- **Secondary Color**: #50635C (Medium Green)
- **Background**: #EDEAE7 (Light Beige)
- **Contact**: 
  - Website: nbcon.app
  - Email: info@nbcon.app
  - Phone: +966 56 622 2179

## Templates to Update

### 1. Confirm sign up ✅
- **Subject**: "Your verification code for nbcon"
- **Purpose**: OTP code for email verification during signup
- **Key Elements**: 
  - Verification code display
  - Expiry time ({{ .LinkTTLHours }} hours)
  - Security notice

### 2. Invite user ✅
- **Subject**: "You've been invited to nbcon"
- **Purpose**: Team/organization invites
- **Key Elements**:
  - Inviter name (if available)
  - CTA button: "Accept the invite"
  - Confirmation URL

### 3. Magic link
- **Subject**: "Your verification code for {{ .SiteURL }}"
- **Purpose**: Passwordless login
- **Key Elements**:
  - Verification code
  - Tagline: "Professional Engineering Network"

### 4. Change email address ✅
- **Subject**: "Your magic link for nbcon"
- **Purpose**: Email change confirmation
- **Key Elements**:
  - Magic link button
  - Confirmation URL

### 5. Reset password ✅
- **Subject**: "Reset your password for nbcon"
- **Purpose**: Password reset flow
- **Key Elements**:
  - Reset password button
  - Confirmation URL
  - Security notice

### 6. Reauthentication ✅
- **Subject**: "Your verification code for nbcon"
- **Purpose**: Re-authentication for sensitive actions
- **Key Elements**:
  - Verification code
  - Security notice

## Adjustments Completed ✅

1. **App Name References**:
   - ✅ All templates updated to use "nbcon" instead of "NBCON PRO"
   - ✅ Tagline consistent: "Saudi Arabia's Professional Engineering Marketplace"

2. **Logo Consistency**:
   - All templates use the same "nb" glyph
   - Same gradient background (#2D5346 to #50635C)
   - Same rounded square (12px border-radius)

3. **Footer Standardization**:
   - All templates should have: nbcon.app · info@nbcon.app · +966 56 622 2179
   - Copyright: © {{ .Year }} nbcon.app

4. **Color Scheme**:
   - Primary: #2D5346
   - Hover: #50635C
   - Background: #EDEAE7
   - Border: #C9BFB6
   - Text (muted): #635650

5. **Typography**:
   - Headings: Inter, Segoe UI, Arial (800 weight, 22px)
   - Body: Inter, Segoe UI, Arial (400 weight, 14px)
   - Code: Consolas, Courier New, Courier (700 weight, 22px)

## Implementation Steps ✅ COMPLETED

1. ✅ All 6 email templates updated in `supabase/email-templates/`:
   - `01-confirm-signup.html` - Updated to "nbcon"
   - `02-invite-user.html` - Updated to "nbcon"
   - `03-magic-link.html` - Updated to "nbcon"
   - `04-change-email.html` - Updated to "nbcon"
   - `05-reset-password.html` - Updated to "nbcon"
   - `06-reauthentication.html` - Updated to "nbcon"
2. ✅ Next Steps:
   - Copy/paste templates into Supabase Dashboard > Authentication > Email Templates
   - Test each template by sending test emails
   - Verify subject lines and branding consistency

## Notes

- All templates use responsive design (max-width:600px)
- Dark mode support with light background (#ffffff)
- Outlook VML fallback for buttons (already included)
- Preheader text for email preview (hidden in body)


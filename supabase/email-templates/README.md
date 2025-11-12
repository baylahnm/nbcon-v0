# Supabase Email Templates

This directory contains all email templates for nbcon.ai, ready to be uploaded to Supabase Dashboard.

## Templates

1. **01-confirm-signup.html** - Email verification code for new signups
2. **02-invite-user.html** - Team/organization invitation emails
3. **03-magic-link.html** - Passwordless login verification code
4. **04-change-email.html** - Email change confirmation magic link
5. **05-reset-password.html** - Password reset link
6. **06-reauthentication.html** - Re-authentication verification code

## Branding

All templates use consistent nbcon.ai branding:
- **Logo**: "nb" glyph in rounded square with gradient (#2D5346 to #50635C)
- **App Name**: nbcon.ai (displayed as "nbcon" in emails)
- **Tagline**: "Saudi Arabia's Professional Engineering Marketplace"
- **Colors**: 
  - Primary: #2D5346 (Dark Green)
  - Secondary: #50635C (Medium Green)
  - Background: #EDEAE7 (Light Beige)
- **Contact**: nbcon.app · info@nbcon.app · +966 56 622 2179

## How to Update Templates in Supabase

### Method 1: Supabase Dashboard (Recommended)

1. Navigate to: https://supabase.com/dashboard/project/hckuptbnicbnfknrizqf/auth/templates
2. Sign in to your Supabase account
3. For each template:
   - Click on the template name (e.g., "Confirm sign up")
   - Click "Edit" or open the template editor
   - Copy the HTML content from the corresponding file in this directory
   - Paste into the HTML editor
   - Update the subject line if needed
   - Click "Save"

### Method 2: Supabase CLI (if supported)

```bash
# Note: Supabase CLI may not directly support email template updates
# Check: supabase auth templates --help
```

### Method 3: Management API (if available)

Supabase Management API may support email template updates. Check the [Supabase Management API documentation](https://supabase.com/docs/reference/api/introduction).

## Template Variables

All templates use Supabase's built-in template variables:

- `{{ .AppName }}` - Application name
- `{{ .SiteURL }}` - Site URL
- `{{ .Token }}` - Verification/token code
- `{{ .ConfirmationURL }}` - Confirmation link URL
- `{{ .LinkTTLHours }}` - Link expiration time in hours
- `{{ .Year }}` - Current year
- `{{ .InviterName }}` - Inviter's name (for invite templates)

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support
- ✅ Outlook VML fallback for buttons
- ✅ Preheader text for email preview
- ✅ Accessible HTML structure
- ✅ Consistent branding across all templates

## Testing

After updating templates, test each one:

1. **Confirm sign up**: Create a new test account
2. **Invite user**: Send an invitation to a test email
3. **Magic link**: Request a magic link login
4. **Change email**: Initiate email change flow
5. **Reset password**: Request password reset
6. **Reauthentication**: Trigger re-authentication flow

## Notes

- All templates are HTML-only (no external CSS)
- Inline styles are used for email client compatibility
- Templates use table-based layout for maximum compatibility
- All links use `https://www.nbcon.app` and `mailto:info@nbcon.app`


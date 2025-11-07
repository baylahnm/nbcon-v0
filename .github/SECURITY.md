# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving security updates depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **GitHub Security Advisories** (Preferred)
   - Go to the repository → Security tab → Report a vulnerability
   - This allows us to coordinate the fix and disclosure

2. **Email** (Alternative)
   - Contact: [Add security contact email]
   - Include details about the vulnerability

## Security Best Practices

### For Contributors

1. **Never commit secrets:**
   - API keys, tokens, passwords
   - Private keys or certificates
   - Database credentials

2. **Use environment variables:**
   - All sensitive data in `.env.local`
   - Never hardcode credentials
   - Use GitHub Secrets for CI/CD

3. **Review dependencies:**
   - Keep dependencies updated
   - Review security advisories
   - Use `pnpm audit` regularly

4. **Follow secure coding:**
   - Validate all inputs
   - Use parameterized queries
   - Implement proper authentication
   - Follow OWASP guidelines

### For Repository Maintainers

1. **Regular security audits:**
   ```bash
   pnpm audit
   ```

2. **Dependency updates:**
   - Review Dependabot PRs promptly
   - Test updates before merging
   - Monitor security advisories

3. **Secret scanning:**
   - Use GitHub's secret scanning
   - Review all PRs for exposed secrets
   - Rotate credentials if exposed

4. **Access control:**
   - Limit repository access
   - Use CODEOWNERS for reviews
   - Enable branch protection

## Known Security Considerations

### Environment Variables

All sensitive configuration must be stored in environment variables:

- Supabase credentials
- Stripe keys
- API keys (OpenAI, etc.)
- Database passwords
- OAuth client secrets

### Third-Party Integrations

When setting up integrations:

1. Use OAuth 2.0 where possible
2. Limit token scopes to minimum required
3. Rotate credentials regularly
4. Monitor access logs

### CI/CD Security

- GitHub Actions use read-only permissions by default
- Secrets stored in GitHub Secrets (not in code)
- Artifacts have retention limits
- Workflows require approval for sensitive operations

## Security Updates

Security updates are released as patches to the latest version. We aim to:

- Acknowledge reports within 48 hours
- Provide initial assessment within 7 days
- Release fix within 30 days (depending on severity)

## Disclosure Policy

- Vulnerabilities are disclosed after fixes are released
- Credit given to reporters (if desired)
- CVE numbers assigned for significant issues

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

Thank you for helping keep NBCON PRO secure! 🔒


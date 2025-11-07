# GitHub Repository Settings Configuration

This document outlines the recommended GitHub repository settings for `nbcon-v0`. These settings should be configured in the GitHub web interface under **Settings**.

## 🔒 Security Settings

### General Security

1. **Dependency Graph**
   - ✅ Enable dependency graph
   - ✅ Enable Dependabot alerts
   - ✅ Enable Dependabot security updates

2. **Secret Scanning**
   - ✅ Enable secret scanning
   - ✅ Enable push protection (prevents commits with secrets)
   - ✅ Enable secret scanning for private repositories

3. **Code Security**
   - ✅ Enable CodeQL analysis
   - Configure CodeQL languages: TypeScript, JavaScript
   - Set up automated security fixes

### Branch Protection Rules

**Branch:** `main`

Required settings:
- ✅ Require a pull request before merging
  - Required approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed
  - Require review from Code Owners (via CODEOWNERS file)
- ✅ Require status checks to pass before merging
  - Required checks: `build`, `test`, `lint`
  - Require branches to be up to date
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings
- ✅ Include administrators

**Branch:** `develop`

Similar settings with:
- Required approvals: 1
- Allow force pushes: ❌
- Allow deletions: ❌

## 🔌 Integrations & Services

### Required Integrations

1. **Slack Integration**
   - Repository: `baylahnm/nbcon-v0`
   - Events: Pull requests, Issues, Deployments, Workflow runs
   - Channel: `#nbcon-dev` (or your preferred channel)

2. **MCP (Model Context Protocol)**
   - Configure MCP server endpoint
   - Set up authentication token (stored in GitHub Secrets)
   - Enable webhook notifications

3. **Webhooks**
   - **Stripe Webhook:** For payment events
     - URL: `https://your-domain.com/api/webhooks/stripe`
     - Secret: Store in GitHub Secrets as `STRIPE_WEBHOOK_SECRET`
   - **Supabase Webhook:** For database events
     - URL: Configure in Supabase Dashboard
     - Secret: Store in GitHub Secrets

### GitHub Actions Settings

1. **Actions permissions**
   - ✅ Allow all actions and reusable workflows
   - ✅ Allow GitHub Actions to create and approve pull requests
   - ✅ Read and write permissions (for deployments)

2. **Workflow permissions**
   - Use workflow-level permissions (configured in workflow files)
   - Default: Read-only for `GITHUB_TOKEN`

3. **Artifact and log retention**
   - Build artifacts: 7 days
   - Test results: 30 days
   - Logs: 90 days

## 🔐 GitHub Secrets

Required secrets (configure in Settings → Secrets and variables → Actions):

### Deployment Secrets
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID
- `SUPABASE_ACCESS_TOKEN` - Supabase access token
- `SUPABASE_DB_PASSWORD` - Database password

### Integration Secrets
- `SLACK_WEBHOOK_URL` - Slack webhook URL (optional)
- `MCP_SERVER_TOKEN` - MCP server authentication token
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret

### Testing Secrets (Optional)
- `CODECOV_TOKEN` - Codecov token for coverage reports

## 📋 Repository Settings

### General

1. **Features**
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki (optional)
   - ✅ Discussions (optional)

2. **Pull Requests**
   - ✅ Allow merge commits
   - ✅ Allow squash merging (recommended)
   - ✅ Allow rebase merging
   - Auto-delete head branches: ✅ Enabled

3. **Pages**
   - Source: GitHub Actions (if using)
   - Custom domain: Configure if needed

### Collaborators & Teams

1. **Code Owners**
   - Defined in `.github/CODEOWNERS`
   - All PRs require approval from code owners

2. **Branch Protection**
   - Enforce CODEOWNERS review
   - Require status checks
   - Prevent force pushes

## 🔍 Automated Tools

### Dependabot

Configured via `.github/dependabot.yml`:
- Weekly dependency updates
- Automated security patches
- PR limit: 5 for npm, 3 for GitHub Actions

### Code Scanning

1. **CodeQL Analysis**
   - Languages: TypeScript, JavaScript
   - Schedule: Weekly
   - Query suites: Security and Quality

2. **Secret Scanning**
   - Automated via GitHub's built-in scanning
   - Additional scanning via `.github/workflows/secret-scanning.yml`

## 📝 Labels

Recommended labels:

**Type:**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `question` - Further information is requested

**Priority:**
- `priority: critical`
- `priority: high`
- `priority: medium`
- `priority: low`

**Status:**
- `status: blocked`
- `status: in-progress`
- `status: review-needed`

## 🎯 Milestones & Projects

- Use GitHub Projects for roadmap tracking
- Create milestones for major releases
- Link issues and PRs to milestones

## 📊 Insights

Monitor:
- Pulse (recent activity)
- Contributors
- Traffic (clones, views)
- Network (forks)
- Community (standards)

## ✅ Verification Checklist

- [ ] Branch protection rules configured
- [ ] CODEOWNERS file in place
- [ ] Dependabot enabled
- [ ] Secret scanning enabled
- [ ] CodeQL analysis enabled
- [ ] Required GitHub Secrets added
- [ ] Webhooks configured
- [ ] Slack integration set up (if applicable)
- [ ] Workflow permissions restricted
- [ ] Artifact retention configured

## 🔗 Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Dependabot](https://docs.github.com/en/code-security/dependabot)

---

**Note:** Some settings require repository admin access. Configure these through the GitHub web interface at:
`https://github.com/baylahnm/nbcon-v0/settings`


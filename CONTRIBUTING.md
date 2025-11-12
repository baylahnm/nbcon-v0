# Contributing to nbcon.ai

Thank you for your interest in contributing to nbcon.ai! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- **pnpm 9+** (canonical package manager - required)
- Git
- A GitHub account

### Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/baylahnm/nbcon-v0.git
   cd nbcon-v0
   ```

2. **Install dependencies**
   ```bash
   # This project uses pnpm as the canonical package manager
   # Do NOT use npm or yarn - use pnpm only
   pnpm install
   ```
   
   **⚠️ Important:** This project uses **pnpm** as the canonical package manager. Do not use `npm` or `yarn`. The `package-lock.json` file is intentionally excluded from the repository.

3. **Set up environment variables**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   
   **⚠️ Important:** Never commit `.env.local` or any files containing secrets. See [Security](#security) section below.

4. **Run development server**
   ```bash
   pnpm dev
   ```

## 🔐 Security

### Environment Variables

All sensitive configuration must be stored in environment variables, never hardcoded in the repository.

#### Required Environment Variables

Create `apps/web/.env.local` with the following:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (for production)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# AI Providers
OPENAI_API_KEY=your_openai_api_key

# Cloudflare (for deployment)
CLOUDFLARE_API_TOKEN=your_cloudflare_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Supabase Functions
SUPABASE_ACCESS_TOKEN=your_supabase_access_token
SUPABASE_DB_PASSWORD=your_db_password
```

#### Generating API Keys

1. **Supabase:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project → Settings → API
   - Copy `Project URL` and `anon public` key

2. **Stripe:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Developers → API keys
   - Copy `Secret key` and `Publishable key`

3. **OpenAI:**
   - Go to [OpenAI Platform](https://platform.openai.com)
   - API keys → Create new secret key

4. **Cloudflare:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template

### Secret Detection

Before committing, ensure no secrets are exposed:

```bash
# Check for potential secrets
grep -r "api[_-]key\|secret\|password\|token" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v "process.env\|import.meta.env\|Deno.env"
```

**Never commit:**
- API keys or secrets
- Passwords or tokens
- `.env.local` files
- Private keys or certificates

## 🔌 Integrations Setup

### MCP (Model Context Protocol)

1. **Install MCP Server:**
   ```bash
   npm install -g @modelcontextprotocol/server
   ```

2. **Configure MCP:**
   - Add MCP server configuration to your local environment
   - See `docs/documentation_structure/DOCS_STRUCTURE_REPORT.md` for integration details

### Slack Integration

1. **Create Slack App:**
   - Go to [Slack API](https://api.slack.com/apps)
   - Create New App → From scratch
   - Add OAuth scopes: `chat:write`, `channels:read`, `users:read`

2. **Get Credentials:**
   - OAuth & Permissions → Copy `Client ID` and `Client Secret`
   - Add to `.env.local`:
     ```bash
     SLACK_CLIENT_ID=your_slack_client_id
     SLACK_CLIENT_SECRET=your_slack_client_secret
     ```

### GitHub Integration

1. **Create GitHub App:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - New GitHub App
   - Set permissions: `Read` for repositories, `Write` for pull requests

2. **Get Credentials:**
   - Copy `App ID` and generate `Private Key`
   - Add to `.env.local`:
     ```bash
     GITHUB_APP_ID=your_app_id
     GITHUB_PRIVATE_KEY=your_private_key
     ```

### Webhooks Configuration

Webhooks are configured in the respective service dashboards:

- **Stripe:** Dashboard → Developers → Webhooks → Add endpoint
- **Supabase:** Dashboard → Database → Webhooks
- **GitHub:** Repository Settings → Webhooks → Add webhook

## 📝 Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

### Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat(scope): your commit message"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Go to GitHub and create a Pull Request
   - Fill out the PR template
   - Request review from code owners

4. **Address feedback**
   - Make requested changes
   - Update PR description if needed
   - Mark conversations as resolved

### Code Review

- All PRs require at least one approval from code owners
- Code must pass CI checks (lint, type check, tests)
- Follow the project's code style and conventions

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm exec playwright test

# Run with coverage
pnpm run coverage
```

## 📚 Documentation

- Update documentation for any new features or changes
- Documentation structure: `docs/documentation_structure/DOCS_STRUCTURE_REPORT.md`
- Follow existing documentation patterns

## 🐛 Reporting Issues

1. Check existing issues first
2. Use the issue template
3. Provide:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## 📞 Getting Help

- Check [Documentation](docs/documentation_structure/DOCS_STRUCTURE_REPORT.md)
- Open an issue for questions
- Review existing PRs for examples

## ✅ Checklist

Before submitting a PR:

- [ ] Code follows project style guidelines
- [ ] Tests pass locally (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Documentation updated (if needed)
- [ ] No secrets or credentials committed
- [ ] Commit messages follow conventional commits
- [ ] PR description is clear and complete

Thank you for contributing! 🎉


# NBCON PRO

Streamline engineering projects with AI-powered automation — from smart engineer matching and real-time cost estimation to project management and SCE compliance. Our solutions reduce project delays, ensure quality, and scale effortlessly with your engineering needs in Saudi Arabia.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/baylahnm/nbcon-v0.git
cd nbcon-v0

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your credentials (see CONTRIBUTING.md)

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Security

**⚠️ CRITICAL: Never commit secrets or credentials to this repository.**

### Secret Policy

- **No secrets in code:** All sensitive data must use environment variables (`process.env`, `import.meta.env`, or `Deno.env`)
- **No hardcoded credentials:** API keys, tokens, passwords, or private keys are strictly forbidden
- **Use `.env.local`:** All secrets belong in `.env.local` (already in `.gitignore`)
- **GitHub Secrets:** CI/CD secrets stored in repository Settings → Secrets

### Environment Variables

All sensitive configuration must be stored in environment variables. See `CONTRIBUTING.md` for detailed setup:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `STRIPE_SECRET_KEY` - Stripe secret key (production)
- `OPENAI_API_KEY` - OpenAI API key
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token (deployment)

### Secret Detection

The repository uses automated secret scanning via GitHub Actions and Gitleaks. Before committing:

```bash
# Check for exposed secrets
grep -r "api[_-]key\|secret\|password\|token" --include="*.ts" --include="*.tsx" | grep -v "process.env\|import.meta.env\|Deno.env"
```

If secrets are detected, replace with `process.env.VARIABLE_NAME` and add a TODO comment.

## 🔌 Integrations

NBCON PRO integrates with:

- **Supabase** - Authentication, database, and realtime features
- **Stripe** - Payment processing and subscriptions
- **Cloudflare** - CDN, security, and edge computing
- **OpenAI/Gemini** - AI-powered features
- **GitHub** - DevOps workflows
- **Slack & Linear** - Team collaboration
- **MCP** - Model Context Protocol
- **BIM Tools** - Autodesk, Revit, ArcGIS, and more

See [CONTRIBUTING.md](CONTRIBUTING.md) for integration setup instructions.

## 📚 Documentation

- **Structure:** [`docs/documentation_structure/DOCS_STRUCTURE_REPORT.md`](docs/documentation_structure/DOCS_STRUCTURE_REPORT.md)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **Security:** [`.github/SECURITY.md`](.github/SECURITY.md)
- **Deployment:** [`docs/how_to_start/DEPLOYMENT_GUIDE.md`](docs/how_to_start/DEPLOYMENT_GUIDE.md)

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Deployment:** Cloudflare Pages
- **Testing:** Vitest, Playwright
- **Package Manager:** pnpm

## 📦 Project Structure

```
nbcon-v0/
├── apps/web/              # Next.js web application
├── packages/              # Shared packages
│   ├── config/           # Shared configuration
│   ├── ui/               # UI components
│   └── enterprise-sdk/   # Enterprise SDK
├── supabase/             # Supabase functions and migrations
├── docs/                 # Documentation
└── .github/              # GitHub workflows and configs
```

## 🧪 Development

```bash
# Run tests
pnpm test

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Build for production
pnpm build
```

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup
- Integration configuration
- Security guidelines
- Code style and conventions
- Pull request process

## 🔒 Security Policy

- Never commit secrets or credentials
- Use environment variables for all sensitive data
- Report security issues privately via GitHub Security tab
- Follow secure coding practices

See [`.github/SECURITY.md`](.github/SECURITY.md) for detailed security guidelines.

## 📄 License

[Add your license here]

## 🌐 Links

- **Repository:** https://github.com/baylahnm/nbcon-v0
- **Documentation:** See `docs/documentation_structure/DOCS_STRUCTURE_REPORT.md`
- **Issues:** https://github.com/baylahnm/nbcon-v0/issues

# Changelog

All notable changes to NBCON PRO will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-02

### Added

#### Core Architecture
- **Monorepo Foundation**: pnpm workspace with shared packages structure
- **TypeScript**: Global type safety across all modules
- **Supabase Integration**: Database, auth, and realtime subscriptions
- **Stripe Integration**: Payment processing and subscription management

#### Navigation & Portal
- **Tier-Aware Sidebar**: Dynamic menu filtering based on subscription tier
- **Route Protection**: FeatureGate and RouteWrapper components
- **Unified Navigation**: Centralized menu configuration

#### Subscription & Billing
- **Stripe Checkout**: Seamless payment flow
- **Webhook Processing**: Automated tier updates via Stripe events
- **Billing Dashboard**: Plan selection and upgrade interface
- **Realtime Sync**: Instant tier updates across all sessions

#### UI Unification
- **AppLayout**: Unified app shell with sidebar and navbar
- **CoPilot Toolbar**: Floating action toolbar with AI/Docs/Analytics panels
- **Unified Dashboard**: Central dashboard with stats and charts
- **Theme Support**: Light/dark mode with CSS variables

#### AI Agent Ecosystem
- **Agent Registry**: Multi-domain agent framework (Civil, Electrical, Mechanical, Survey, GIS)
- **useAIAgent Hook**: Unified agent invocation interface
- **Agent Console**: Interactive UI for agent execution
- **AI Logging**: All AI requests logged to Supabase

#### Testing & Governance
- **Vitest**: Unit test framework with 90% coverage target
- **Playwright**: E2E testing across browsers
- **CI/CD**: Automated testing and deployment pipelines
- **Governance Docs**: OWNERS, Policy, Security Audit, Compliance Checklist
- **PDPL Compliance**: Audit logging and data retention policies

#### Enterprise & Lifecycle
- **Enterprise SDK**: TypeScript SDK for integrations
- **Telemetry**: PostHog analytics integration
- **Monitoring Dashboard**: Real-time audit log viewer
- **Lifecycle Automation**: Auto-downgrade inactive users after 90 days
- **Upgrade Flow**: Realtime tier change tracking

### Security
- **Row Level Security**: RLS policies on all Supabase tables
- **Audit Logging**: All admin actions tracked
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Data Residency**: KSA region hosting

### Infrastructure
- **Edge Functions**: Stripe webhook and lifecycle cron jobs
- **Database Migrations**: Automated schema management
- **CI/CD Pipelines**: GitHub Actions workflows
- **Error Tracking**: Sentry integration ready

## [0.1.0] - 2025-11-02

### Added
- Initial project setup
- Core monorepo structure


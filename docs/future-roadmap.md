# NBCON PRO — Future Expansion & Task Checklist

Filtered directly from the last audit.  
No fluff. Actionable items grouped by topic.

---

## UI & Component Layer (Phase 4 Remaining)

| Task | Description | Status |
|------|--------------|--------|
| **Landing Page Components** | Integrated ProjectCard, FeaturesGrid, ProcessSection, ClientsSection, LandingFooter | ✅ Completed |
| **Hero Section Enhancement** | Added "Start New Project" button to hero section | ✅ Completed |
| **Install missing ShadCN components** | `signup-02`, `otp-01` | ⏳ Pending |
| **OTP Component** | Create custom OTP form with validation + design parity | ⏳ Pending |
| **Charts Integration** | Replace placeholders with Recharts/Chart.js for dashboard metrics | ⏳ Pending |
| **Refine Sidebar Navigation** | Verify collapsible/expandable logic and mobile responsiveness | ⏳ Pending |
| **Auth Flow Validation** | Connect signup/login/otp to Supabase auth | ⏳ Pending |
| **Arabic/English i18n Pass** | Ensure UI strings and RTL support are applied across all pages | ⏳ Pending |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement UI Enhancements (Phase 4)

Tasks:

1. Install ShadCN blocks: signup-02, otp-01

2. Create custom OTP form styled like login-02

3. Integrate Recharts into UnifiedDashboard.tsx

4. Refactor sidebar for responsive collapse/expand

5. Connect Supabase auth to login/signup/otp

6. Add bilingual i18n (EN/ar-SA) + RTL layout test
```

---

## AI Integration & Intelligence Layer (Phase 5 Enhancements)

| Task                       | Description                                                       | Status     |
| -------------------------- | ----------------------------------------------------------------- | ---------- |
| **OpenAI Integration**     | Replace mock endpoint in `/api/ai/run` with live model            | ⏳ Pending  |
| **Zod Schemas**            | Add structured schema validation under `packages/ai-core/schema/` | ⏳ Pending  |
| **Agent Expansion**        | Add new domain agents (Geotechnical, Environmental)               | ⚙️ Planned |
| **Realtime Feedback Logs** | Connect agent logs to PostHog events for performance tracking     | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement AI Intelligence Layer (Phase 5)

Tasks:

1. Integrate OpenAI SDK in /api/ai/run (replace mock)

2. Add Zod schemas in packages/ai-core/schema/

3. Register new agents (Geotechnical, Environmental) in agentRegistry.ts

4. Link AI logs with PostHog for telemetry analytics
```

---

## Testing, QA & Compliance (Phase 6 Enhancements)

| Task                         | Description                                                   | Status     |
| ---------------------------- | ------------------------------------------------------------- | ---------- |
| **Coverage Report**          | Enable actual coverage report generation ≥ 90%                | ⏳ Pending  |
| **PDPL Audit Verification**  | Validate data retention + encryption compliance in production | ⏳ Pending  |
| **ISO Certification Prep**   | Align PDPL checklist with ISO 27001 compliance                | ⚙️ Planned |
| **E2E Automation Expansion** | Add Playwright coverage for signup + AI interactions          | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Testing & Governance Enhancements (Phase 6)

Tasks:

1. Enable vitest coverage ≥ 90%

2. Verify PDPL data retention and encryption compliance

3. Extend Playwright E2E for signup and AI workflows

4. Update compliance checklist for ISO 27001 readiness
```

---

## Enterprise & Lifecycle (Phase 7 Enhancements)

| Task                      | Description                                                    | Status     |
| ------------------------- | -------------------------------------------------------------- | ---------- |
| **PostHog Validation**    | Test analytics event capture across sessions                   | ⏳ Pending  |
| **Supabase Log Linking**  | Map logs to PostHog session IDs for correlation                | ⏳ Pending  |
| **Monthly Churn Reports** | Automate retention analysis in lifecycle cron function         | ⚙️ Planned |
| **Telemetry Dashboard**   | Expand `MonitoringDashboard.tsx` with error and latency charts | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Enterprise & Lifecycle Enhancements (Phase 7)

Tasks:

1. Validate PostHog event capture and telemetry flow

2. Link Supabase logs with PostHog session IDs

3. Automate churn analytics in lifecycle-cron

4. Add uptime and latency charts in MonitoringDashboard
```

---

## Docs & Knowledge Hub (New Phase)

| Task                          | Description                                                              | Status     |
| ----------------------------- | ------------------------------------------------------------------------ | ---------- |
| **Create `docs/` Page**       | Build documentation page like [cursor.com/docs](https://cursor.com/docs) | ⏳ Pending  |
| **Import Build Reports**      | Add all phase summaries (1–7) to docs index                              | ⏳ Pending  |
| **Generate Developer Guides** | Document API usage, deployment, governance policies                      | ⚙️ Planned |
| **Internal Roadmap Tracking** | Add checklist and progress tracker to docs UI                            | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Docs & Knowledge Hub (New Phase)

Tasks:

1. Create docs/ page (apps/web/src/pages/docs)

2. Import all phase summaries into docs index

3. Add API + deployment markdowns for developers

4. Add roadmap tracker with checkbox states
```

---

## Deployment & Production Validation

| Task                              | Description                                      | Status     |
| --------------------------------- | ------------------------------------------------ | ---------- |
| **Stripe Webhook Testing**        | Validate full checkout + downgrade flows         | ⏳ Pending  |
| **Supabase Edge Functions Audit** | Confirm operational logs for lifecycle + billing | ⏳ Pending  |
| **Cloudflare Config Audit**       | Verify production build deploy + Sentry mapping  | ⚙️ Planned |
| **Post-Launch QA**                | Test full flow (auth → dashboard → AI → billing) | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Production Validation

Tasks:

1. Test Stripe checkout and downgrade webhooks

2. Audit Supabase edge logs for billing + lifecycle

3. Verify Cloudflare Pages build and Sentry source maps

4. Run post-deployment QA (auth → dashboard → AI → billing)
```

---

## Summary of Focus Areas

* **Short-Term (Next Build Sprint)**

  UI completion (auth + OTP + charts), OpenAI integration, PDPL validation.

* **Mid-Term (Next Release Cycle)**

  Docs page, monitoring dashboard, multilingual polish.

* **Long-Term (Enterprise Scaling)**

  Full analytics loop, ISO compliance, automated retention reports.

---

## Task Distribution Summary

| **Phase / Topic**                                 | **Task Count** | **Notes**                                                       |
| ------------------------------------------------- | -------------: | --------------------------------------------------------------- |
| **UI & Component Layer (Phase 4)**                |              8 | Landing page components ✅, ShadCN installs, OTP, Charts, Sidebar, Auth, i18n |
| **AI Integration & Intelligence Layer (Phase 5)** |              4 | OpenAI integration, Zod schemas, agent expansion, realtime logs |
| **Testing, QA & Compliance (Phase 6)**            |              4 | Coverage, PDPL, ISO, automation                                 |
| **Enterprise & Lifecycle (Phase 7)**              |              4 | PostHog validation, Supabase linking, churn reports, telemetry  |
| **Docs & Knowledge Hub (New Phase)**              |              4 | Docs page, import summaries, developer guides, tracker          |
| **Deployment & Production Validation**            |              4 | Stripe tests, Supabase audits, Cloudflare checks, QA validation |

---

✅ **Total Tasks:** 28 (2 completed)

📦 **Short-Term Focus:** 10 core dev tasks (UI + AI) - 2 landing page tasks ✅

🧠 **Mid-Term:** 12 tasks (Docs, Lifecycle, QA)

🧩 **Long-Term:** 4 enterprise/compliance tasks

---

## Interactive Task Checklist

### UI & Component Layer (Phase 4)
- [x] Landing Page Components - Integrated ProjectCard, FeaturesGrid, ProcessSection, ClientsSection, LandingFooter
- [x] Hero Section Enhancement - Added "Start New Project" button to hero section
- [ ] Install missing ShadCN components (`signup-02`, `otp-01`)
- [ ] Create custom OTP form with validation + design parity
- [ ] Replace placeholders with Recharts/Chart.js for dashboard metrics
- [ ] Verify collapsible/expandable logic and mobile responsiveness in sidebar
- [ ] Connect signup/login/otp to Supabase auth
- [ ] Ensure UI strings and RTL support are applied across all pages

### AI Integration & Intelligence Layer (Phase 5)
- [ ] Replace mock endpoint in `/api/ai/run` with live OpenAI model
- [ ] Add structured schema validation under `packages/ai-core/schema/`
- [ ] Add new domain agents (Geotechnical, Environmental)
- [ ] Connect agent logs to PostHog events for performance tracking

### Testing, QA & Compliance (Phase 6)
- [ ] Enable actual coverage report generation ≥ 90%
- [ ] Validate data retention + encryption compliance in production
- [ ] Align PDPL checklist with ISO 27001 compliance
- [ ] Add Playwright coverage for signup + AI interactions

### Enterprise & Lifecycle (Phase 7)
- [ ] Test analytics event capture across sessions (PostHog)
- [ ] Map logs to PostHog session IDs for correlation
- [ ] Automate retention analysis in lifecycle cron function
- [ ] Expand `MonitoringDashboard.tsx` with error and latency charts

### Docs & Knowledge Hub
- [ ] Build documentation page like [cursor.com/docs](https://cursor.com/docs)
- [ ] Add all phase summaries (1–7) to docs index
- [ ] Document API usage, deployment, governance policies
- [ ] Add roadmap tracker with checkbox states

### Deployment & Production Validation
- [ ] Validate full checkout + downgrade flows (Stripe webhooks)
- [ ] Confirm operational logs for lifecycle + billing (Supabase Edge Functions)
- [ ] Verify production build deploy + Sentry mapping (Cloudflare)
- [ ] Test full flow (auth → dashboard → AI → billing)

---

*Last Updated: 2025-11-03*

---

## Recent Accomplishments (Latest Build)

### Landing Page Integration (Completed 2025-11-03)

✅ **Feature Cards Section** - Created `ProjectCard` component and `FeaturesGrid` with 4 key features:
   - Project as Chat
   - AI Co-Pilot  
   - Field-to-Report workflow
   - Multi-Agent Team

✅ **How It Works Section** - Integrated `ProcessSection` component with 3-step workflow:
   - Sign Up → Start Chat → Live Project

✅ **Testimonials Section** - Added `ClientsSection` with sticky scrolling testimonials, stats cards, and ratings

✅ **Footer Component** - Created `LandingFooter` with Docs/API/Learn/Company links and language toggle

✅ **Hero Enhancement** - Added "Start New Project" button to hero section below chat input

**Components Created:**
- `apps/web/src/components/ui/project-card.tsx`
- `apps/web/src/components/ui/features-grid.tsx`
- `apps/web/src/components/ui/how-we-do-it-process-overview.tsx`
- `apps/web/src/components/ui/how-it-works-section.tsx`
- `apps/web/src/components/ui/testimonial-card.tsx`
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/components/ui/landing-footer.tsx`

**Dependencies Installed:**
- `@radix-ui/react-icons` (for footer chevron icons)
- All existing dependencies verified (framer-motion, lucide-react, @radix-ui/react-slot, @radix-ui/react-avatar)


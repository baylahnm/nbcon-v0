# NBCON PRO — Future Expansion & Task Checklist

Filtered directly from the last audit.  
No fluff. Actionable items grouped by topic.

**Last Updated:** 2025-11-04

---

## UI & Component Layer (Phase 4)

### 4.1 Landing Page Components (Completed ✅)

| Task | Description | Status |
|------|--------------|--------|
| **Landing Page Components** | Integrated ProjectCard, FeaturesGrid, ProcessSection, ClientsSection, LandingFooter | ✅ Completed |
| **Hero Section Enhancement** | Added "Start New Project" button to hero section | ✅ Completed |

**Components Created:**
- `apps/web/src/components/ui/project-card.tsx`
- `apps/web/src/components/ui/features-grid.tsx`
- `apps/web/src/components/ui/how-we-do-it-process-overview.tsx`
- `apps/web/src/components/ui/how-it-works-section.tsx`
- `apps/web/src/components/ui/testimonial-card.tsx`
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/components/ui/landing-footer.tsx`

---

### 4.2 Landing Page UX Enhancements (High Priority)

**Analysis Summary:**
- Page Height: 8,267px (very long scroll)
- Sections: 7 main sections
- CTAs: 25+ call-to-action buttons
- Images: 21 images
- Missing Features: Back-to-top, scroll progress, section IDs

#### Critical UX Fixes

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Back to Top Button** | ⭐⭐⭐⭐⭐ | Low | 30 min | ⏳ Pending |
| **Section IDs for Anchor Navigation** | ⭐⭐⭐⭐⭐ | Low | 15 min | ⏳ Pending |
| **Scroll Progress Indicator** | ⭐⭐⭐⭐ | Low | 20 min | ⏳ Pending |
| **Fix Anchor Links** | ⭐⭐⭐⭐ | Low | 10 min | ⏳ Pending |

**Details:**
- [ ] Create `back-to-top-button.tsx` component (floating button, appears after 400px scroll)
- [ ] Add section IDs: `hero`, `features`, `how-it-works`, `dashboard-showcase`, `community`, `testimonials`
- [ ] Create `scroll-progress-bar.tsx` component (fixed top progress bar)
- [ ] Update anchor links: `#start` → `#features`, `#examples` → `#community`, `#browse-all` → `#community`

**Files:**
- `apps/web/src/components/ui/back-to-top-button.tsx` (new)
- `apps/web/src/components/ui/scroll-progress-bar.tsx` (new)
- `apps/web/src/components/ui/hero-section-3.tsx`
- `apps/web/src/components/ui/features-showcase.tsx`
- `apps/web/src/components/ui/how-it-works-section.tsx`
- `apps/web/src/components/ui/release-timeline-section.tsx`
- `apps/web/src/components/ui/community-showcase.tsx`
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/components/ui/feature-showcase.tsx`
- `apps/web/src/components/layout/PublicLayout.tsx`

#### Visual Enhancements

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Hover Effects on Cards** | ⭐⭐⭐⭐ | Medium | 45 min | ⏳ Pending |
| **Logo Cloud Pause on Hover** | ⭐⭐⭐ | Low | 15 min | ⏳ Pending |
| **Section Scroll Animations** | ⭐⭐⭐⭐ | Medium | 60 min | ⏳ Pending |
| **Visual Hierarchy Improvements** | ⭐⭐⭐ | Low | 30 min | ⏳ Pending |

**Details:**
- [ ] Add hover lift effects to Dashboard Showcase and Community cards
- [ ] Add pause/resume animation to Logo Cloud on hover
- [ ] Implement fade-in-up scroll animations using framer-motion
- [ ] Add subtle background variations and section dividers

**Files:**
- `apps/web/src/components/ui/release-time-line.tsx`
- `apps/web/src/components/ui/community-showcase.tsx`
- `apps/web/src/components/ui/feature-showcase.tsx`
- `apps/web/src/components/ui/logo-cloud.tsx`
- All section components
- `apps/web/src/styles/globals.css`

#### Performance & Loading States

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Image Loading States** | ⭐⭐⭐⭐ | Medium | 45 min | ⏳ Pending |
| **Smooth Scroll Behavior** | ⭐⭐⭐ | Low | 5 min | ⏳ Pending |

**Details:**
- [ ] Convert `<img>` to Next.js `<Image>` for internal images
- [ ] Add skeleton loaders and blur placeholders for external images
- [ ] Add `scroll-behavior: smooth` to `globals.css`

**Files:**
- `apps/web/src/components/ui/logo-cloud.tsx`
- `apps/web/src/components/ui/feature-showcase.tsx`
- `apps/web/src/components/ui/release-time-line.tsx`
- `apps/web/src/components/ui/community-showcase.tsx`
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/styles/globals.css`

#### Content & Messaging

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Hero Section Messaging** | ⭐⭐⭐⭐ | Low | 20 min | ⏳ Pending |
| **How It Works Section Content** | ⭐⭐⭐ | Low | 20 min | ⏳ Pending |
| **Stats Credibility Enhancement** | ⭐⭐⭐ | Medium | 30 min | ⏳ Pending |

**Details:**
- [ ] Review and update Hero H1 to match NBCON PRO engineering focus
- [ ] Update "How It Works" description (remove generic React/Tailwind references)
- [ ] Add client logos, certifications, case study links to testimonials

**Files:**
- `apps/web/src/components/ui/hero-section-3.tsx`
- `apps/web/src/components/ui/how-it-works-section.tsx`
- `apps/web/src/components/ui/stack-feature-section.tsx`
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/components/ui/testimonial-card.tsx`

#### Functional Improvements

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Load More Button Functionality** | ⭐⭐⭐ | Medium | 60 min | ⏳ Pending |
| **PromptBox Functionality** | ⭐⭐⭐⭐ | Medium | 45 min | ⏳ Pending |
| **Footer Language Toggle** | ⭐⭐ | Medium | 30 min | ⏳ Pending |
| **Navigation Keyboard Support** | ⭐⭐⭐ | Medium | 45 min | ⏳ Pending |

**Details:**
- [ ] Implement pagination and "Load More" handler in Community section
- [ ] Enable "Send message" button in PromptBox when text entered
- [ ] Add language dropdown with localStorage persistence
- [ ] Add arrow key navigation, Enter/Escape support to navbar dropdowns

**Files:**
- `apps/web/src/components/ui/community-showcase.tsx`
- `apps/web/src/components/ui/chatgpt-prompt-input.tsx`
- `apps/web/src/components/ui/landing-footer.tsx`
- `apps/web/src/components/ui/navbar.tsx`

#### Mobile Experience

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Mobile Responsiveness Audit** | ⭐⭐⭐⭐⭐ | Medium | 60 min | ⏳ Pending |
| **Mobile Menu Improvements** | ⭐⭐⭐⭐ | Low | 20 min | ⏳ Pending |

**Details:**
- [ ] Test all sections on mobile (320px, 375px, 414px)
- [ ] Verify mobile menu, touch interactions, button sizes (min 44x44px)
- [ ] Add smooth animations to Sheet component, backdrop overlay

**Files:**
- All components
- `apps/web/src/components/ui/navbar.tsx`

#### Testimonials Enhancements

| Task | Impact | Effort | Time | Status |
|------|--------|--------|------|--------|
| **Testimonials Navigation** | ⭐⭐⭐ | Medium | 45 min | ⏳ Pending |

**Details:**
- [ ] Add navigation dots/pagination, auto-scroll option
- [ ] Add manual arrows, keyboard navigation, touch swipe support

**Files:**
- `apps/web/src/components/ui/testimonials-section.tsx`
- `apps/web/src/components/ui/testimonial-card.tsx`

---

### 4.3 Remaining UI Components

| Task | Description | Status |
|------|--------------|--------|
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

## AI Integration & Intelligence Layer (Phase 5)

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

## Testing, QA & Compliance (Phase 6)

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

## Enterprise & Lifecycle (Phase 7)

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

## Docs & Knowledge Hub (Phase 8)

| Task                          | Description                                                              | Status     |
| ----------------------------- | ------------------------------------------------------------------------ | ---------- |
| **Create `docs/` Page**       | Build documentation page like [cursor.com/docs](https://cursor.com/docs) | ✅ Completed |
| **Import Build Reports**      | Add all phase summaries (1–7) to docs index                              | ⏳ Pending  |
| **Generate Developer Guides** | Document API usage, deployment, governance policies                      | ⚙️ Planned |
| **Internal Roadmap Tracking** | Add checklist and progress tracker to docs UI                            | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Docs & Knowledge Hub (Phase 8)

Tasks:

1. Create docs/ page (apps/web/src/pages/docs) ✅

2. Import all phase summaries into docs index

3. Add API + deployment markdowns for developers

4. Add roadmap tracker with checkbox states
```

---

## Deployment & Production Validation (Phase 9)

| Task                              | Description                                      | Status     |
| --------------------------------- | ------------------------------------------------ | ---------- |
| **Stripe Webhook Testing**        | Validate full checkout + downgrade flows         | ⏳ Pending  |
| **Supabase Edge Functions Audit** | Confirm operational logs for lifecycle + billing | ⏳ Pending  |
| **Cloudflare Config Audit**       | Verify production build deploy + Sentry mapping  | ⚙️ Planned |
| **Post-Launch QA**                | Test full flow (auth → dashboard → AI → billing) | ⚙️ Planned |

**Prompt:**

```bash
cursor you are an elite AI full-stack software engineer and web/UI designer, skilled in building, debugging, and architecting applications from development to deployment.—>

Implement Production Validation (Phase 9)

Tasks:

1. Test Stripe checkout and downgrade webhooks

2. Audit Supabase edge logs for billing + lifecycle

3. Verify Cloudflare Pages build and Sentry source maps

4. Run post-deployment QA (auth → dashboard → AI → billing)
```

---

## Summary of Focus Areas

* **Short-Term (Next Build Sprint)**

  Landing page UX enhancements (back-to-top, scroll progress, section IDs), UI completion (auth + OTP + charts), OpenAI integration, PDPL validation.

* **Mid-Term (Next Release Cycle)**

  Landing page visual polish (animations, hover effects), Docs page content, monitoring dashboard, multilingual polish.

* **Long-Term (Enterprise Scaling)**

  Full analytics loop, ISO compliance, automated retention reports, testimonials enhancements.

---

## Task Distribution Summary

| **Phase / Topic**                                 | **Task Count** | **Notes**                                                       |
| ------------------------------------------------- | -------------: | --------------------------------------------------------------- |
| **UI & Component Layer (Phase 4)**                |             29 | Landing page components ✅ (2), Landing page UX (20), Remaining UI (7) |
| **AI Integration & Intelligence Layer (Phase 5)** |              4 | OpenAI integration, Zod schemas, agent expansion, realtime logs |
| **Testing, QA & Compliance (Phase 6)**            |              4 | Coverage, PDPL, ISO, automation                                 |
| **Enterprise & Lifecycle (Phase 7)**              |              4 | PostHog validation, Supabase linking, churn reports, telemetry  |
| **Docs & Knowledge Hub (Phase 8)**                |              4 | Docs page ✅, import summaries, developer guides, tracker          |
| **Deployment & Production Validation (Phase 9)**  |              4 | Stripe tests, Supabase audits, Cloudflare checks, QA validation |

---

✅ **Total Tasks:** 49 (3 completed: Landing page components ✅, Hero enhancement ✅, Docs page ✅)

📦 **Short-Term Focus:** 32 tasks (Landing page UX: 20, UI components: 7, AI: 4, Docs: 1)

🧠 **Mid-Term:** 12 tasks (Testing, Enterprise, Docs, Deployment)

🧩 **Long-Term:** 5 tasks (Enterprise scaling, compliance, testimonials)

---

## Implementation Priority (Sprints)

### Sprint 1 (Week 1) - Critical Landing Page UX
1. ✅ Back to Top Button
2. ✅ Section IDs for Anchor Navigation
3. ✅ Scroll Progress Indicator
4. ✅ Fix Anchor Links

### Sprint 2 (Week 1-2) - Landing Page Visual Polish
5. ✅ Hover Effects on Cards
6. ✅ Logo Cloud Pause on Hover
7. ✅ Section Scroll Animations
8. ✅ Smooth Scroll Behavior

### Sprint 3 (Week 2) - Landing Page Performance & Content
9. ✅ Image Loading States
10. ✅ Visual Hierarchy Improvements
11. ✅ Hero Section Messaging
12. ✅ How It Works Section Content

### Sprint 4 (Week 2-3) - Landing Page Functionality
13. ✅ Load More Button Functionality
14. ✅ PromptBox Functionality
15. ✅ Mobile Responsiveness Audit
16. ✅ Mobile Menu Improvements

### Sprint 5 (Week 3) - UI Components & Polish
17. ✅ Navigation Keyboard Support
18. ✅ Footer Language Toggle
19. ✅ Install missing ShadCN components
20. ✅ Create custom OTP form

### Sprint 6 (Week 3-4) - Core Features
21. ✅ Charts Integration
22. ✅ Refine Sidebar Navigation
23. ✅ Auth Flow Validation
24. ✅ Arabic/English i18n Pass

### Sprint 7 (Week 4) - AI Integration
25. ✅ OpenAI Integration
26. ✅ Zod Schemas
27. ✅ Agent Expansion
28. ✅ Realtime Feedback Logs

### Sprint 8+ (Week 5+) - Enterprise & Testing
29. ✅ Testing & Compliance
30. ✅ Enterprise & Lifecycle
31. ✅ Docs Content
32. ✅ Deployment Validation

---

## Success Metrics

### Landing Page
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **User Engagement:** Increased scroll depth, lower bounce rate
- **CTA Clicks:** Increased conversion from landing page
- **Mobile Experience:** 100% responsive, no horizontal scroll
- **Accessibility:** WCAG 2.1 AA compliance

### Overall Project
- **Code Coverage:** ≥ 90%
- **Performance:** Core Web Vitals passing
- **Security:** PDPL + ISO 27001 compliance
- **User Satisfaction:** Improved onboarding completion rate

---

## Technical Requirements

### Dependencies Needed
- `framer-motion` (already installed)
- `next/image` (already available)
- `react-intersection-observer` (for scroll animations)
- `recharts` or `chart.js` (for dashboard charts)
- `react-hook-form` (for auth forms)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Interactive Task Checklist

### UI & Component Layer (Phase 4)

#### Landing Page Components (Completed ✅)
- [x] Landing Page Components - Integrated ProjectCard, FeaturesGrid, ProcessSection, ClientsSection, LandingFooter
- [x] Hero Section Enhancement - Added "Start New Project" button to hero section

#### Landing Page UX Enhancements
- [x] Back to Top Button - Create floating button with smooth scroll ✅
- [x] Section IDs for Anchor Navigation - Add IDs to all sections ✅
- [x] Scroll Progress Indicator - Add top progress bar ✅
- [x] Fix Anchor Links - Update #start, #examples, #browse-all ✅
- [x] Hover Effects on Cards - Add lift effects to Dashboard and Community cards ✅
- [x] Logo Cloud Pause on Hover - Add pause/resume animation ✅
- [x] Section Scroll Animations - Implement fade-in-up animations ✅
- [x] Visual Hierarchy Improvements - Add background variations and dividers ✅
- [x] Image Loading States - Convert to Next.js Image with skeletons ✅
- [x] Smooth Scroll Behavior - Add CSS smooth scroll ✅
- [x] Hero Section Messaging - Update H1 to match NBCON PRO focus ✅
- [x] How It Works Section Content - Remove generic React/Tailwind references ✅
- [ ] Stats Credibility Enhancement - Add client logos and certifications
- [x] Load More Button Functionality - Implement pagination ✅
- [x] PromptBox Functionality - Enable send button and validation ✅
- [x] Footer Language Toggle - Add dropdown with localStorage ✅
- [x] Navigation Keyboard Support - Add arrow key navigation ✅
- [x] Mobile Responsiveness Audit - Test all sections on mobile ✅
- [x] Mobile Menu Improvements - Add smooth animations ✅
- [ ] Testimonials Navigation - Add dots, arrows, keyboard support

#### Remaining UI Components
- [x] Install missing ShadCN components (`signup-02`, `otp-01`) ✅
- [x] Create custom OTP form with validation + design parity ✅
- [x] Replace placeholders with Recharts/Chart.js for dashboard metrics ✅
- [x] Verify collapsible/expandable logic and mobile responsiveness in sidebar ✅
- [x] Connect signup/login/otp to Supabase auth ✅
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

### Docs & Knowledge Hub (Phase 8)
- [x] Build documentation page like [cursor.com/docs](https://cursor.com/docs)
- [ ] Add all phase summaries (1–7) to docs index
- [ ] Document API usage, deployment, governance policies
- [ ] Add roadmap tracker with checkbox states

### Deployment & Production Validation (Phase 9)
- [ ] Validate full checkout + downgrade flows (Stripe webhooks)
- [ ] Confirm operational logs for lifecycle + billing (Supabase Edge Functions)
- [ ] Verify production build deploy + Sentry mapping (Cloudflare)
- [ ] Test full flow (auth → dashboard → AI → billing)

---

## Recent Accomplishments

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

**Dependencies Installed:**
- `@radix-ui/react-icons` (for footer chevron icons)
- All existing dependencies verified (framer-motion, lucide-react, @radix-ui/react-slot, @radix-ui/react-avatar)

### Documentation Portal (Completed 2025-11-03)

✅ **Docs Page** - Created comprehensive documentation portal at `/docs` and `/ar/docs`
   - MDX-based content system
   - Search functionality with Fuse.js
   - RTL support for Arabic
   - Theme-aware design
   - Responsive sidebar navigation

---

## Notes

- All changes should maintain theme-aware styling
- Test in both light and dark modes
- Ensure all animations are performant (60fps)
- Keep bundle size minimal
- Maintain existing component structure where possible
- Landing page improvements prioritized for immediate user impact

---

**Next Steps:** Begin Sprint 6 - Core Features (Charts Integration, Sidebar Refinement, Auth Flow, i18n)

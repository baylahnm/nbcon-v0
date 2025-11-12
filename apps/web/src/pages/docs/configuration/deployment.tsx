import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function DeploymentPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Deployment Guide | nbcon.ai Docs</title>
        <meta name="description" content="Complete guide for deploying nbcon.ai to production" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Deployment Guide</h1>
          <p>Complete guide for deploying nbcon.ai to production, including environment setup, Supabase configuration, Stripe integration, and CI/CD.</p>

          <h2>Overview</h2>
          <p>nbcon.ai is deployed using:</p>
          <ul>
            <li><strong>Frontend:</strong> Cloudflare Pages (Next.js)</li>
            <li><strong>Backend:</strong> Supabase (Database, Auth, Edge Functions)</li>
            <li><strong>CDN:</strong> Cloudflare</li>
            <li><strong>CI/CD:</strong> GitHub Actions</li>
          </ul>

          <h2>Prerequisites</h2>
          <ul>
            <li>Node.js 20+</li>
            <li>pnpm 9+</li>
            <li>Supabase CLI</li>
            <li>Cloudflare account</li>
            <li>Stripe account</li>
            <li>GitHub repository</li>
          </ul>

          <h2>Environment Setup</h2>
          <h3>1. Clone Repository</h3>
          <CodeBlock language="bash">
{`git clone <repository-url>
cd nbcon_v0
pnpm install`}
          </CodeBlock>

          <h3>2. Create `.env.local`</h3>
          <p>Copy <code>.env.example</code> to <code>.env.local</code> and fill in:</p>
          <CodeBlock language="bash">
{`# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...

# Analytics (Optional)
POSTHOG_KEY=phc_...
SENTRY_DSN=https://...

# Deployment
BASE_URL=https://your-domain.com
NODE_ENV=production`}
          </CodeBlock>

          <h3>3. Supabase Setup</h3>
          <CodeBlock language="bash">
{`# Link to your Supabase project
supabase link --project-ref your-project-ref

# Run migrations
pnpm run migrate

# Deploy Edge Functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy lifecycle-cron`}
          </CodeBlock>

          <h3>4. Configure Supabase Edge Functions</h3>
          <p>Set environment variables in Supabase Dashboard:</p>
          <CodeBlock language="bash">
{`STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=https://your-domain.com`}
          </CodeBlock>

          <h2>Database Migrations</h2>
          <h3>Apply Migrations</h3>
          <CodeBlock language="bash">
{`# Check migration status
supabase db diff

# Apply pending migrations
supabase db push

# Or use Supabase MCP`}
          </CodeBlock>

          <h3>Key Migrations</h3>
          <ol>
            <li><code>20251102000001_add_subscription_columns.sql</code> - Subscription tiers</li>
            <li><code>20251102000004_create_ai_logs.sql</code> - AI usage tracking</li>
            <li><code>20251102000005_create_audit_logs.sql</code> - Compliance audit</li>
            <li><code>20251102000006_create_profile_trigger.sql</code> - Auto-create profiles</li>
          </ol>

          <h2>Stripe Configuration</h2>
          <h3>1. Create Products</h3>
          <p>In Stripe Dashboard:</p>
          <ol>
            <li>Create Products for each tier (Free, Basic, Pro, Enterprise)</li>
            <li>Create Prices (monthly/annual)</li>
            <li>Note the <code>price_id</code> values</li>
          </ol>

          <h3>2. Update Webhook Mapping</h3>
          <p>Update <code>supabase/functions/stripe-webhook/index.ts</code>:</p>
          <CodeBlock language="typescript">
{`const tierMap: Record<string, string> = {
  "price_basic_sar": "basic",  // 49 SAR/month
  "price_pro_sar": "pro",      // 149 SAR/month
  // Free and Enterprise handled separately (no Stripe checkout)
};`}
          </CodeBlock>
          <p><strong>Note:</strong> Price IDs must match your Stripe dashboard. Free tier has no price ID (no payment), and Enterprise uses custom pricing (no checkout).</p>

          <h3>3. Configure Webhook</h3>
          <ol>
            <li>Go to Stripe Dashboard → Webhooks</li>
            <li>Add endpoint: <code>https://your-project.supabase.co/functions/v1/stripe-webhook</code></li>
            <li>Select events:
              <ul>
                <li><code>checkout.session.completed</code></li>
                <li><code>customer.subscription.updated</code></li>
                <li><code>customer.subscription.deleted</code></li>
              </ul>
            </li>
            <li>Copy webhook secret to environment variables</li>
          </ol>

          <h2>Cloudflare Pages Deployment</h2>
          <h3>1. Connect Repository</h3>
          <ol>
            <li>Go to Cloudflare Dashboard → Pages</li>
            <li>Connect GitHub repository</li>
            <li>Select branch: <code>main</code></li>
          </ol>

          <h3>2. Build Settings</h3>
          <p><strong>Important:</strong> The <code>@nbcon/config</code> package must be built before the web app.</p>
          <CodeBlock>
{`Build command: pnpm install --frozen-lockfile && pnpm build:config && pnpm --filter @nbcon/web build
Build output directory: apps/web/.next
Root directory: (leave empty)
Node version: 20
Install command: pnpm install --frozen-lockfile`}
          </CodeBlock>
          <p><strong>Note:</strong> The web app's <code>prebuild</code> hook automatically builds the config package, but it's recommended to build it explicitly in CI/CD pipelines.</p>

          <h3>3. Environment Variables</h3>
          <p>Add all production environment variables in Cloudflare Pages:</p>
          <ul>
            <li><code>NEXT_PUBLIC_SUPABASE_URL</code> (Note: Uses <code>NEXT_PUBLIC_</code> prefix, not <code>VITE_</code>)</li>
            <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
            <li><code>NEXT_PUBLIC_STRIPE_PUBLIC_KEY</code> (if needed)</li>
            <li><code>POSTHOG_KEY</code> (optional)</li>
            <li><code>SENTRY_DSN</code> (optional)</li>
            <li>All other <code>NEXT_PUBLIC_*</code> variables</li>
          </ul>
          <p><strong>Note:</strong> Only <code>NEXT_PUBLIC_*</code> variables are exposed to the client. Never add service role keys or webhook secrets here.</p>

          <h3>4. Custom Domain</h3>
          <ol>
            <li>Go to Pages → Custom Domain</li>
            <li>Add your domain</li>
            <li>Update DNS records as instructed</li>
          </ol>

          <h3>5. Email Templates Deployment</h3>
          <ol>
            <li>Navigate to Supabase Dashboard → Authentication → Email Templates</li>
            <li>Upload all 6 templates from <code>supabase/email-templates/</code>:
              <ul>
                <li><code>01-confirm-signup.html</code></li>
                <li><code>02-invite-user.html</code></li>
                <li><code>03-magic-link.html</code></li>
                <li><code>04-change-email.html</code></li>
                <li><code>05-reset-password.html</code></li>
                <li><code>06-reauthentication.html</code></li>
              </ul>
            </li>
            <li>Verify subject lines match expected format</li>
            <li>Test each template by sending test emails</li>
            <li>Verify branding consistency ("nbcon" not "NBCON PRO")</li>
          </ol>

          <h2>CI/CD Pipeline</h2>
          <h3>GitHub Actions Workflows</h3>
          <p>The project includes three workflows:</p>

          <h4>1. CI (`ci.yml`)</h4>
          <p>Runs on every push/PR:</p>
          <ul>
            <li>Lint</li>
            <li>Type check</li>
            <li>Unit tests (Vitest)</li>
            <li>E2E tests (Playwright)</li>
            <li>Coverage report</li>
            <li>Build</li>
          </ul>

          <h4>2. Test (`test.yml`)</h4>
          <p>Runs on push to <code>main</code>/<code>develop</code>:</p>
          <ul>
            <li>Full test suite</li>
            <li>Coverage upload (Codecov)</li>
          </ul>

          <h4>3. Deploy (`deploy.yml`)</h4>
          <p>Runs on push to <code>main</code>:</p>
          <ul>
            <li>Build application</li>
            <li>Deploy to Cloudflare Pages</li>
            <li>Deploy Supabase Edge Functions</li>
          </ul>

          <h3>Secrets Required</h3>
          <p>Add to GitHub Secrets:</p>
          <CodeBlock>
{`CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
SUPABASE_ACCESS_TOKEN
SUPABASE_DB_PASSWORD
CODECOV_TOKEN (optional)`}
          </CodeBlock>

          <h2>Post-Deployment Verification</h2>
          <h3>1. Test Authentication</h3>
          <CodeBlock language="bash">
{`# Sign up
curl -X POST https://your-domain.com/api/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test123"}'

# Sign in
curl -X POST https://your-domain.com/api/auth/signin \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test123"}'`}
          </CodeBlock>

          <h3>2. Test Stripe Checkout</h3>
          <ol>
            <li>Go to <code>/billing</code></li>
            <li>Click "Upgrade" on a plan</li>
            <li>Complete test checkout</li>
            <li>Verify tier update in database</li>
          </ol>

          <h3>3. Test AI API</h3>
          <CodeBlock language="bash">
{`curl -X POST https://your-domain.com/api/ai/run \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Test"}]
  }'`}
          </CodeBlock>

          <h3>4. Verify Edge Functions</h3>
          <CodeBlock language="bash">
{`# Test lifecycle cron
curl https://your-project.supabase.co/functions/v1/lifecycle-cron \\
  -H "Authorization: Bearer <anon_key>"

# Should return churn report data`}
          </CodeBlock>

          <h2>Monitoring</h2>
          <h3>Supabase Logs</h3>
          <ol>
            <li>Go to Supabase Dashboard → Logs</li>
            <li>Monitor Edge Function logs</li>
            <li>Check database logs for errors</li>
          </ol>

          <h3>PostHog Analytics</h3>
          <p>Monitor events in PostHog Dashboard:</p>
          <ul>
            <li><code>ai_agent_request</code></li>
            <li><code>tier_upgraded</code></li>
            <li><code>ai_token_usage</code></li>
            <li><code>ai_agent_error</code></li>
          </ul>

          <h3>Sentry Error Tracking</h3>
          <p>Errors are automatically tracked if <code>SENTRY_DSN</code> is configured.</p>

          <h2>Troubleshooting</h2>
          <h3>Build Failures</h3>
          <CodeBlock language="bash">
{`# Check build logs in Cloudflare
# Common issues:
# - Config package not built: Run \`pnpm build:config\` first
# - Missing environment variables
# - TypeScript errors (check tsconfig.json paths)
# - Missing dependencies (run \`pnpm install --frozen-lockfile\`)
# - Node.js version mismatch (ensure Node 20+)`}
          </CodeBlock>

          <p><strong>Config Package Build:</strong></p>
          <CodeBlock language="bash">
{`# If build fails, ensure config package is built:
pnpm build:config

# Then rebuild web app:
pnpm --filter @nbcon/web build`}
          </CodeBlock>

          <h3>Edge Function Errors</h3>
          <CodeBlock language="bash">
{`# Check Supabase logs
# Test locally:
supabase functions serve stripe-checkout`}
          </CodeBlock>

          <h3>Database Connection Issues</h3>
          <CodeBlock language="bash">
{`# Verify RLS policies
supabase db diff

# Check connection string
# Ensure VITE_SUPABASE_URL is correct`}
          </CodeBlock>

          <h2>Rollback Procedure</h2>
          <h3>Cloudflare Pages</h3>
          <ol>
            <li>Go to Pages → Deployments</li>
            <li>Select previous deployment</li>
            <li>Click "Retry deployment"</li>
          </ol>

          <h3>Supabase</h3>
          <CodeBlock language="bash">
{`# Rollback migration
supabase db reset

# Or manually revert via SQL`}
          </CodeBlock>

          <h2>Security Checklist</h2>
          <ul>
            <li>All environment variables set (no secrets in client code)</li>
            <li>RLS policies enabled on all tables</li>
            <li>Service role keys secured (Supabase Secrets only)</li>
            <li>Stripe webhook secret configured and verified</li>
            <li>HTTPS enabled (Cloudflare)</li>
            <li>CORS configured correctly</li>
            <li>Rate limiting enabled</li>
            <li>Audit logging active</li>
            <li>Email templates uploaded and tested</li>
            <li>Icon system verified (no legacy libraries)</li>
            <li>Bundle size optimized (~700KB reduction from icon unification)</li>
          </ul>

          <h2>See Also</h2>
          <ul>
            <li><Link href="/docs/configuration/api-usage">API Usage</Link> - API integration guide</li>
            <li><Link href="/docs/core/phase-summaries">Phase Summaries</Link> - Implementation progress</li>
            <li><Link href="/docs/components/ICON_SYSTEM.md">Icon System</Link> - Icon usage and best practices</li>
            <li><Link href="/docs/security/Security_Audit.md">Security Audit</Link> - Security documentation</li>
            <li><Link href="/docs/production-validation-roadmap/PRODUCTION_VALIDATION_COMPREHENSIVE.md">Production Validation</Link> - Complete validation guide</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = getAllDocs();
  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return {
    props: { index, sidebar },
    revalidate: 3600,
  };
};


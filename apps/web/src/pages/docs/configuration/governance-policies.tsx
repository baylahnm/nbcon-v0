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

export default function GovernancePoliciesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Governance Policies | nbcon.ai Docs</title>
        <meta name="description" content="Governance policies, contribution guidelines, and code quality standards" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Governance Policies</h1>
          <p>This document outlines the governance policies, contribution guidelines, and code quality standards for nbcon.ai.</p>

          <h2>Branch Naming Convention</h2>
          <ul>
            <li><code>feature/*</code> - New features</li>
            <li><code>fix/*</code> - Bug fixes</li>
            <li><code>release/*</code> - Release branches</li>
            <li><code>hotfix/*</code> - Critical production fixes</li>
          </ul>

          <h2>Pull Request Process</h2>
          <h3>Requirements</h3>
          <ol>
            <li><strong>Approvals</strong>
              <ul>
                <li>Minimum 2 approvals required</li>
                <li>At least one approval from a maintainer</li>
              </ul>
            </li>
            <li><strong>CI/CD Checks</strong>
              <ul>
                <li>CI pipeline must pass (lint, typecheck, tests)</li>
                <li>E2E tests must pass</li>
                <li>Code coverage ≥ 90%</li>
              </ul>
            </li>
            <li><strong>Code Quality</strong>
              <ul>
                <li>No ESLint warnings</li>
                <li>TypeScript strict mode compliance</li>
                <li>All tests passing</li>
              </ul>
            </li>
          </ol>

          <h3>Review Criteria</h3>
          <ul>
            <li>Code follows TypeScript strict mode</li>
            <li>Tests added for new features</li>
            <li>Documentation updated</li>
            <li>No security vulnerabilities</li>
            <li>No breaking changes without migration guide</li>
          </ul>

          <h2>Release Management</h2>
          <h3>Versioning</h3>
          <ul>
            <li><strong>Format:</strong> Semantic versioning (vX.Y.Z)</li>
            <li><strong>Major (X):</strong> Breaking changes</li>
            <li><strong>Minor (Y):</strong> New features (backward compatible)</li>
            <li><strong>Patch (Z):</strong> Bug fixes</li>
          </ul>

          <h3>Release Process</h3>
          <ol>
            <li>Create release branch: <code>release/vX.Y.Z</code></li>
            <li>Update version in <code>package.json</code></li>
            <li>Update <code>CHANGELOG.md</code></li>
            <li>Create pull request</li>
            <li>After approval, tag release: <code>git tag vX.Y.Z</code></li>
            <li>Merge to <code>main</code></li>
            <li>Deploy to production</li>
          </ol>

          <h2>Code Quality Standards</h2>
          <h3>TypeScript</h3>
          <ul>
            <li><strong>Mode:</strong> Strict mode enabled</li>
            <li><strong>Types:</strong> No <code>any</code> types (use <code>unknown</code> if needed)</li>
            <li><strong>Null Safety:</strong> Proper null/undefined handling</li>
            <li><strong>Project References:</strong> Properly configured for monorepo</li>
          </ul>

          <h3>Testing</h3>
          <ul>
            <li><strong>Coverage:</strong> ≥ 90% across all layers</li>
            <li><strong>Unit Tests:</strong> Vitest for component and utility tests</li>
            <li><strong>E2E Tests:</strong> Playwright for user flow tests</li>
            <li><strong>SQL Tests:</strong> RLS policy verification</li>
          </ul>

          <h3>Documentation</h3>
          <ul>
            <li><strong>JSDoc:</strong> Required for all public APIs</li>
            <li><strong>README:</strong> Updated for new features</li>
            <li><strong>Changelog:</strong> All changes documented</li>
          </ul>

          <h3>Linting</h3>
          <ul>
            <li><strong>ESLint:</strong> No warnings allowed</li>
            <li><strong>Rules:</strong> Follow project ESLint configuration</li>
            <li><strong>Auto-fix:</strong> Run <code>pnpm lint --fix</code> before committing</li>
          </ul>

          <h2>Security Policies</h2>
          <h3>Secrets Management</h3>
          <ul>
            <li><strong>Never commit:</strong> API keys, passwords, tokens</li>
            <li><strong>Use:</strong> Supabase Secrets for Edge Functions</li>
            <li><strong>Environment Variables:</strong> Only <code>NEXT_PUBLIC_*</code> in client code</li>
            <li><strong>Verification:</strong> <code>.env.example</code> contains placeholders only</li>
          </ul>

          <h3>Dependency Management</h3>
          <ul>
            <li><strong>Scanning:</strong> GitHub Dependabot enabled</li>
            <li><strong>Updates:</strong> Review and test before merging</li>
            <li><strong>Vulnerabilities:</strong> Address within 24 hours for critical issues</li>
          </ul>

          <h3>Access Control</h3>
          <ul>
            <li><strong>RLS:</strong> Required on all database tables</li>
            <li><strong>Service Role:</strong> Only in Edge Functions</li>
            <li><strong>Audit Logging:</strong> All admin actions logged</li>
          </ul>

          <h2>Contribution Guidelines</h2>
          <h3>Getting Started</h3>
          <ol>
            <li>Fork the repository</li>
            <li>Create feature branch: <code>git checkout -b feature/your-feature</code></li>
            <li>Make changes</li>
            <li>Write tests</li>
            <li>Update documentation</li>
            <li>Submit pull request</li>
          </ol>

          <h3>Commit Messages</h3>
          <p>Follow conventional commits:</p>
          <CodeBlock>
{`feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks`}
          </CodeBlock>

          <h2>Project Structure</h2>
          <h3>Monorepo Organization</h3>
          <CodeBlock>
{`nbcon_v0/
├── apps/
│   └── web/              # Next.js web application
├── packages/
│   ├── config/           # Shared configuration
│   ├── ai-core/          # AI agent registry
│   └── enterprise-sdk/  # Enterprise SDK
├── supabase/
│   ├── functions/        # Edge Functions
│   └── migrations/       # Database migrations
└── docs/                 # Documentation`}
          </CodeBlock>

          <h3>File Naming</h3>
          <ul>
            <li><strong>Components:</strong> PascalCase (<code>UserMenu.tsx</code>)</li>
            <li><strong>Hooks:</strong> camelCase with <code>use</code> prefix (<code>useSubscriptionTier.ts</code>)</li>
            <li><strong>Utilities:</strong> camelCase (<code>formatDate.ts</code>)</li>
            <li><strong>Constants:</strong> UPPER_SNAKE_CASE (<code>MAX_RETRIES</code>)</li>
          </ul>

          <h2>Icon System Guidelines</h2>
          <h3>Approved Libraries</h3>
          <ul>
            <li><strong>lucide-react</strong> - Primary UI icons</li>
            <li><strong>react-icons</strong> - Brand/service logos</li>
            <li><strong>@radix-ui/react-icons</strong> - Radix UI components</li>
            <li><strong>@lobehub/icons</strong> - AI brand logos</li>
          </ul>

          <h3>Usage Rules</h3>
          <ul>
            <li>Always use theme-aware Tailwind classes</li>
            <li>Use <code>currentColor</code> in custom SVGs</li>
            <li>Import icons directly (no abstraction layer)</li>
            <li>Use dynamic imports for <code>@lobehub/icons</code></li>
          </ul>

          <p>See <Link href="/docs/components/ICON_SYSTEM.md">Icon System Guide</Link> for details.</p>

          <h2>Related Documentation</h2>
          <ul>
            <li><Link href="/docs/security/Security_Audit.md">Security Audit</Link> - Security policies</li>
            <li><Link href="/docs/compliance/Compliance_Checklist.md">Compliance Checklist</Link> - PDPL compliance</li>
            <li><Link href="/docs/components/ICON_SYSTEM.md">Icon System Guide</Link> - Icon usage guidelines</li>
            <li><Link href="/docs/configuration/deployment">Deployment Guide</Link> - Deployment procedures</li>
          </ul>

          <p><strong>Last Updated:</strong> 2025-01-06</p>
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


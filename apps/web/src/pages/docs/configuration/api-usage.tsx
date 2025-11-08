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

export default function APIUsagePage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>API Usage Guide | NBCON PRO Docs</title>
        <meta name="description" content="How to use NBCON PRO's APIs, including AI agent endpoints, Supabase integration, and authentication" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>API Usage Guide</h1>
          <p>This guide covers how to use NBCON PRO's APIs, including AI agent endpoints, Supabase integration, and authentication.</p>

          <h2>Overview</h2>
          <p>NBCON PRO provides several APIs:</p>
          <ul>
            <li><strong>AI Agent API</strong> - <code>/api/ai/run</code> - Execute AI agent requests</li>
            <li><strong>Stripe API</strong> - Edge Functions for checkout and webhooks</li>
            <li><strong>Supabase API</strong> - Direct database and auth access</li>
            <li><strong>Enterprise SDK</strong> - REST/GraphQL client for integrations</li>
          </ul>

          <h2>AI Agent API</h2>
          <h3>Endpoint</h3>
          <CodeBlock>
{`POST /api/ai/run`}
          </CodeBlock>

          <h3>Request Format</h3>
          <CodeBlock language="typescript">
{`{
  model: string;           // AI model identifier (e.g., "gpt-4")
  messages: Array<{        // Conversation messages
    role: "system" | "user";
    content: string;
  }>;
  temperature?: number;    // 0-1, default: 0.3
  max_tokens?: number;     // Default: 4000
}`}
          </CodeBlock>

          <h3>Example Request</h3>
          <CodeBlock language="typescript">
{`const response = await fetch("/api/ai/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a geotechnical engineering specialist."
      },
      {
        role: "user",
        content: "Analyze this soil sample data..."
      }
    ],
    temperature: 0.3,
    max_tokens: 4000
  })
});

const data = await response.json();
// { output: string, tokens: number }`}
          </CodeBlock>

          <h3>Response Format</h3>
          <CodeBlock language="typescript">
{`{
  output: string;         // AI-generated response
  tokens: number;         // Token usage count
}`}
          </CodeBlock>

          <h3>Error Handling</h3>
          <CodeBlock language="typescript">
{`if (!response.ok) {
  const error = await response.json();
  // { error: string }
}`}
          </CodeBlock>

          <h3>Using the Hook</h3>
          <CodeBlock language="typescript">
{`import { useAIAgent } from "@/features/ai/hooks/useAIAgent";

function MyComponent() {
  const { runAgent, loading, error } = useAIAgent("geotechnical");
  
  const handleRun = async () => {
    const result = await runAgent({
      prompt: "Analyze soil properties...",
      options: {
        temperature: 0.5,
        maxTokens: 2000
      }
    });
    console.log(result.output);
  };
}`}
          </CodeBlock>

          <h2>Supabase API</h2>
          <h3>Authentication</h3>
          <CodeBlock language="typescript">
{`import { supabase } from "@nbcon/config";

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123"
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123"
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();`}
          </CodeBlock>

          <h3>Database Queries</h3>
          <CodeBlock language="typescript">
{`// Select
const { data, error } = await supabase
  .from("profiles")
  .select("id, subscription_tier")
  .eq("id", userId)
  .single();

// Insert
const { data, error } = await supabase
  .from("ai_logs")
  .insert({
    user_id: userId,
    agent: "geotechnical",
    input: "Analyze soil...",
    output: "Results...",
    tokens_used: 150
  });

// Update
const { error } = await supabase
  .from("profiles")
  .update({ subscription_tier: "pro" })
  .eq("id", userId);`}
          </CodeBlock>

          <h3>Realtime Subscriptions</h3>
          <CodeBlock language="typescript">
{`// Subscribe to tier changes
const channel = supabase
  .channel("tier_changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "profiles",
      filter: \`id=eq.\${userId}\`
    },
    (payload) => {
      console.log("Tier updated:", payload.new.subscription_tier);
    }
  )
  .subscribe();

// Cleanup
supabase.removeChannel(channel);`}
          </CodeBlock>

          <h2>Stripe API</h2>
          <h3>Create Checkout Session</h3>
          <CodeBlock language="typescript">
{`// Call Edge Function
const response = await fetch(
  "https://your-project.supabase.co/functions/v1/stripe-checkout",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${supabaseAnonKey}\`
    },
    body: JSON.stringify({
      priceId: "price_xxx",
      userId: "user-uuid"
    })
  }
);

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout`}
          </CodeBlock>

          <h3>Webhook Events</h3>
          <p>Stripe webhooks are handled automatically by the <code>stripe-webhook</code> Edge Function. Events processed:</p>
          <ul>
            <li><code>checkout.session.completed</code> - Updates subscription tier</li>
            <li><code>customer.subscription.updated</code> - Updates subscription tier</li>
            <li><code>customer.subscription.deleted</code> - Resets to free tier</li>
          </ul>

          <h2>Enterprise SDK</h2>
          <h3>API Client</h3>
          <CodeBlock language="typescript">
{`import { fetchData } from "@nbcon/enterprise-sdk";

// Fetch data
const logs = await fetchData<AuditLog>("audit_logs");
const profiles = await fetchData<Profile>("profiles");`}
          </CodeBlock>

          <h3>Telemetry</h3>
          <CodeBlock language="typescript">
{`import { track } from "@nbcon/enterprise-sdk/telemetry";

// Track events
track("ai_agent_request", {
  agent_id: "geotechnical",
  tokens_used: 150,
  user_id: userId
});

track("tier_upgraded", {
  oldTier: "free",
  newTier: "pro",
  userId: userId
});`}
          </CodeBlock>

          <h2>Agent Registry</h2>
          <h3>Available Agents</h3>
          <CodeBlock language="typescript">
{`import { agentRegistry } from "@nbcon/ai-core";

// List all agents
Object.keys(agentRegistry); 
// ["geotechnical", "environmental", ...]

// Get agent config
const agent = agentRegistry["geotechnical"];
// {
//   id: "geotechnical",
//   context: "Geotechnical Engineering",
//   description: "...",
//   model: "gpt-4",
//   temperature: 0.3,
//   maxTokens: 4000
// }`}
          </CodeBlock>

          <h2>Validation Schemas</h2>
          <h3>Zod Schemas</h3>
          <CodeBlock language="typescript">
{`import { AIRequestSchema, AgentRequestSchema } from "@nbcon/ai-core";

// Validate AI request
const result = AIRequestSchema.safeParse(requestBody);
if (!result.success) {
  console.error(result.error);
}

// Validate agent request
const agentResult = AgentRequestSchema.safeParse(agentBody);`}
          </CodeBlock>

          <h2>Error Handling</h2>
          <h3>Common Errors</h3>
          <CodeBlock language="typescript">
{`// API Errors
if (!response.ok) {
  const error = await response.json();
  // Handle: { error: "message" }
}

// Supabase Errors
if (error) {
  console.error("Supabase error:", error.message);
  // Handle based on error.code
}

// Network Errors
try {
  await fetch("/api/ai/run", ...);
} catch (err) {
  if (err instanceof TypeError) {
    // Network error
  }
}`}
          </CodeBlock>

          <h2>Rate Limiting</h2>
          <p>Currently, rate limiting is handled by:</p>
          <ul>
            <li>OpenAI API limits (based on your plan)</li>
            <li>Supabase rate limits (RLS policies)</li>
            <li>Stripe rate limits (API key tier)</li>
          </ul>

          <h2>Best Practices</h2>
          <ol>
            <li><strong>Always validate input</strong> using Zod schemas</li>
            <li><strong>Handle errors gracefully</strong> with user-friendly messages</li>
            <li><strong>Use Realtime subscriptions</strong> for live data updates</li>
            <li><strong>Track usage</strong> with PostHog telemetry</li>
            <li><strong>Log errors</strong> to Supabase for debugging</li>
            <li><strong>Use TypeScript</strong> for type safety</li>
          </ol>

          <h2>See Also</h2>
          <ul>
            <li><Link href="/docs/configuration/deployment">Deployment Guide</Link></li>
            <li><Link href="/docs/api/API_REFERENCE.md">API Reference</Link></li>
            <li><Link href="/docs/agents/5-AGENT_PLAYBOOKS.md">Agent Playbooks</Link></li>
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


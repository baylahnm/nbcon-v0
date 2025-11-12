# nbcon.ai API Reference

## Enterprise SDK

### Installation

```bash
npm install @nbcon/enterprise-sdk
# or
pnpm add @nbcon/enterprise-sdk
```

### API Client

```typescript
import { fetchData, insertData, updateData } from "@nbcon/enterprise-sdk";

// Fetch data
const profiles = await fetchData("profiles");

// Insert data
const newLog = await insertData("audit_logs", {
  user_id: "user-id",
  action: "test_action",
});

// Update data
const updated = await updateData("profiles", "user-id", {
  subscription_tier: "pro",
});
```

### Authentication

```typescript
import { generateToken, verifyToken } from "@nbcon/enterprise-sdk";

// Generate JWT
const token = generateToken({
  userId: "user-id",
  email: "user@example.com",
  tier: "pro",
});

// Verify token
const payload = verifyToken(token);
```

### Telemetry

```typescript
import { initTelemetry, track, identify } from "@nbcon/enterprise-sdk";

// Initialize (call once)
initTelemetry();

// Track events
track("button_clicked", { button: "upgrade" });

// Identify user
identify("user-id", { tier: "pro", email: "user@example.com" });
```

### Integrations

#### Stripe

```typescript
import { stripe, createSubscription } from "@nbcon/enterprise-sdk";

// Create subscription
const subscription = await createSubscription("customer-id", "price-id");
```

#### Supabase

```typescript
import { logToSupabase, querySupabase } from "@nbcon/enterprise-sdk";

// Log to Supabase
await logToSupabase("audit_logs", { action: "test" });

// Query with filters
const logs = await querySupabase("audit_logs", { user_id: "user-id" });
```

## Supabase Edge Functions

### Stripe Checkout

**Endpoint**: `POST /functions/v1/stripe-checkout`

**Request**:
```json
{
  "priceId": "price_xxx",
  "userId": "user-uuid"
}
```

**Response**:
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

### Stripe Webhook

**Endpoint**: `POST /functions/v1/stripe-webhook`

Automatically processes Stripe webhook events and updates subscription tiers.

### Lifecycle Cron

**Endpoint**: `GET /functions/v1/lifecycle-cron`

Runs automated lifecycle checks (downgrade inactive users, etc.).

## React Hooks

### usePortalAccess

```typescript
import { usePortalAccess } from "@/hooks/usePortalAccess";

const { tier, isAdmin, isLoading, userId } = usePortalAccess();
```

### useAIAgent

```typescript
import { useAIAgent } from "@/features/ai/hooks/useAIAgent";

const { runAgent, loading } = useAIAgent("civil");

const result = await runAgent({
  prompt: "Calculate material requirements",
  context: { projectId: 123 },
});
```

### useMonitoring

```typescript
import { useMonitoring } from "@/hooks/useMonitoring";

// Automatically tracks session start/end
useMonitoring();
```

### useUpgradeFlow

```typescript
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";

// Tracks tier changes in realtime
useUpgradeFlow(userId);
```

## Database Schema

### profiles

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  subscription_tier text DEFAULT 'free',
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### billing_events

```sql
CREATE TABLE billing_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  stripe_event text,
  tier text,
  status text,
  created_at timestamptz DEFAULT now()
);
```

### ai_logs

```sql
CREATE TABLE ai_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  agent text,
  input text,
  output text,
  tokens_used int,
  created_at timestamptz DEFAULT now()
);
```

### audit_logs

```sql
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  action text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);
```

## Error Handling

All SDK functions throw errors on failure. Wrap in try-catch:

```typescript
try {
  const data = await fetchData("profiles");
} catch (error) {
  console.error("API error:", error.message);
}
```

## Rate Limits

- API: 100 requests/minute per user
- AI Agents: Tier-based limits (Free: 50/day, Pro: 2000/day)
- Edge Functions: Supabase limits apply


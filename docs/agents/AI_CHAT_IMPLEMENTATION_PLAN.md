# nbcon.ai — AI Chat & Agent System Implementation Plan

**Last Updated:** 2025-01-27  
**Status:** ✅ **CORE SYSTEM COMPLETE** — Chat UI integrated, credits system working, multi-provider routing active

---

## 📌 Assignment Rules

**⚠️ IMPORTANT: Read this section first before making any changes**

### Work Instructions

- **Focus:** Update `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` **ONLY** (for documentation)
- **No new MD files:** Do **NOT** create any new markdown/documentation files - use this single plan file
- **Code files allowed:** Create/modify code files as needed (migrations, hooks, components, etc.)
- **Use Supabase MCP:** Use Supabase MCP tools when needed to verify database state, check migrations, or execute SQL
- **Use Browser tool:** Use `@Browser` tool for testing features, collecting data, and verifying UI functionality
- **Update as you go:** Keep the plan updated as work progresses. Before proceeding, use your best judgment to validate the current codebase structure and confirm this is the optimal integration point.
- **Code suggestions:** Include code examples/suggestions when relevant

### What I Must Do

1. Read `AI_CHAT_IMPLEMENTATION_PLAN.md` to understand the current state
2. Update the plan as tasks are completed
3. Add code suggestions inline where helpful
4. Mark completed items with ✅ and update status indicators
5. Keep the directory-tree format consistent

### How to Update the Plan

- Mark completed tasks with `[x]` and ✅
- Update status indicators (✅ ⏸️ ❌ ⚠️)
- Add code examples/suggestions in relevant sections
- Update the "Quick Status Overview" section
- Keep implementation details updated as work progresses

### Example Update Pattern

```markdown
### ✅ Phase 5: Chat UI Integration — IN PROGRESS
- [x] Import `useAIAgent` hook ✅ COMPLETE
- [x] Replace console.log with `runAgent` call ✅ COMPLETE
- [ ] Add loading state display ⏸️ IN PROGRESS
- [ ] Add error handling UI ⏸️ PENDING
```

---

## 🎯 Quick Status Overview

| Component | Status | Notes |
|-----------|--------|-------|
| **Agent Registry** | ✅ Complete | 7 agents configured (Civil, Electrical, Mechanical, Survey, GIS, Geotechnical, Environmental) |
| **API Endpoint** | ✅ Complete | Multi-provider routing (OpenAI, Anthropic, Google, Mistral, xAI) |
| **Chat UI** | ✅ Complete | Connected to agents, credit checking, message display |
| **Credits System** | ✅ Complete | Daily limits, reset at midnight UTC, upgrade prompts |
| **Model Selector** | ✅ Complete | Top 8 performers in main menu, 30+ in submenu |
| **Conversation Actions** | ✅ Complete | Share, Pin, Rename, Delete menu implemented |

---

## 📁 Key Files & Locations

### Core Implementation

```
packages/ai-core/src/
├── agentRegistry.ts          → 7 agents configured
├── interfaces.ts             → TypeScript types
└── schema/index.ts           → Zod validation

apps/web/src/features/ai/
├── hooks/
│   ├── useAIAgent.ts         → Agent invocation hook
│   └── useAgentRouter.ts    → Agent routing hook
└── components/
    ├── AgentConsole.tsx     → Agent console UI
    └── AgentOutputPanel.tsx → Real-time output display

apps/web/src/pages/api/ai/
└── run.ts                    → Multi-provider AI API endpoint

apps/web/src/components/dashboard/
├── GeminiMainArea.tsx        → Main chat interface
├── DashboardSidebar.tsx      → Conversation sidebar
├── ConversationActionsMenu.tsx → Three-dots menu
└── UserMenu.tsx             → User settings menu
```

---

## 🚀 Quick Start Guide

### Using the AI Agent Hook

```tsx
import { useAIAgent } from '@/features/ai/hooks/useAIAgent';

function MyComponent() {
  const { runAgent, loading, error, agent } = useAIAgent('civil');
  
  const handleSubmit = async (prompt: string) => {
    try {
      const result = await runAgent({ prompt });
      console.log('Response:', result.output);
      console.log('Tokens used:', result.tokens);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    <div>
      {loading && <p>Processing...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => handleSubmit('Calculate material requirements')}>
        Run Agent
      </button>
    </div>
  );
}
```

### Available Agents

| Agent Key | Description | Model |
|-----------|-------------|-------|
| `civil` | Site design, grading, material estimation | GPT-5 |
| `electrical` | Load schedules, panel design, wiring plans | GPT-5 |
| `mechanical` | HVAC load calculations, piping analysis | GPT-5 |
| `survey` | GNSS, LiDAR, topographic datasets | GPT-5 |
| `gis` | Spatial data analysis, mapping outputs | GPT-5 |
| `geotechnical` | Soil and foundation design analysis | GPT-5 |
| `environmental` | Environmental impact assessments | GPT-5 |

---

## 💰 Credits System

### Daily Token Limits

| Tier | Daily Tokens | Reset Time |
|------|--------------|------------|
| Free | 50 | Midnight UTC |
| Basic | 500 | Midnight UTC |
| Pro | 2,000 | Midnight UTC |
| Enterprise | Unlimited | N/A |

### Implementation

**Hook:** `apps/web/src/hooks/useCredits.ts`

```tsx
import { useCredits } from '@/hooks/useCredits';

function CreditsDisplay() {
  const { credits, creditsLimit, creditsUsed, isLoading } = useCredits();
  
  return (
    <div>
      Credits: {creditsUsed}/{creditsLimit}
      {creditsUsed >= creditsLimit && <UpgradePrompt />}
    </div>
  );
}
```

**Database:** `user_credits` table (auto-resets at midnight UTC)

---

## 🎨 Model Selector

### Top 8 Models (Main Menu)

1. **Gemini 2.5 Pro** — ~99% HumanEval (default)
2. **Claude Sonnet 4.5** — ~95.1% HumanEval
3. **Claude Opus 4** — ~94.5% HumanEval
4. **GPT-4o** — ~90% HumanEval
5. **GPT-4.5 Turbo** — ~88% HumanEval
6. **DeepSeek R1** — ~98% HumanEval (open-source)
7. **Sonnet 4.5** — ~92% HumanEval
8. **Haiku 4.5** — ~87% HumanEval

### Additional Models (Submenu)

30+ models organized by provider:
- **Anthropic:** Opus 4.1, Claude 3.7 Sonnet, Claude 3.5 Sonnet
- **OpenAI:** GPT-5, GPT-4 Turbo, GPT-3.5 Turbo, o3-mini
- **Google:** Gemini 2.0 Flash
- **xAI:** Grok 4, Grok 3, Grok Mini
- **Meta:** Llama 3.1 405B, Llama 3.1 70B, Llama 4 Maverick
- **Mistral:** Mistral Large, Mixtral 8x7B, Codestral
- **DeepSeek:** DeepSeek V3, DeepSeek Chat, DeepSeek Coder variants
- **Others:** Qwen 2.5 Max, Phi-3 Mini

**Implementation:** `apps/web/src/components/ui/chatgpt-prompt-input.tsx`

---

## 🔧 Multi-Provider Routing

### Supported Providers

| Provider | Models | API Key Env Var |
|----------|--------|-----------------|
| OpenAI | GPT-4o, GPT-4.5 Turbo, GPT-5, GPT-3.5 Turbo | `OPENAI_API_KEY` |
| Anthropic | Claude Sonnet 4.5, Opus 4, Haiku 4.5 | `ANTHROPIC_API_KEY` |
| Google | Gemini 2.5 Pro, Gemini 2.0 Flash | `GOOGLE_API_KEY` |
| Mistral | Mistral Large, Mixtral 8x7B, Codestral | `MISTRAL_API_KEY` |
| xAI | Grok 4, Grok 3, Grok Mini | `XAI_API_KEY` |

### Automatic Provider Detection

The API endpoint (`/api/ai/run`) automatically detects the provider based on model ID:

```typescript
// apps/web/src/pages/api/ai/run.ts
function detectProvider(modelId: string): 'openai' | 'anthropic' | 'google' | 'mistral' | 'xai' {
  if (modelId.startsWith('gpt-') || modelId.startsWith('o3-')) return 'openai';
  if (modelId.startsWith('claude-') || modelId.startsWith('sonnet-') || modelId.startsWith('haiku-') || modelId.startsWith('opus-')) return 'anthropic';
  if (modelId.startsWith('gemini-')) return 'google';
  if (modelId.startsWith('mistral-') || modelId.startsWith('mixtral-') || modelId.startsWith('codestral-')) return 'mistral';
  if (modelId.startsWith('grok-')) return 'xai';
  return 'openai'; // Default fallback
}
```

---

## 💬 Conversation Actions Menu

### Features

**Location:** `apps/web/src/components/dashboard/ConversationActionsMenu.tsx`

**Actions:**
- **Share** — Copies conversation link to clipboard (Web Share API with fallback)
- **Pin** — Pins conversation to top of sidebar (⚠️ requires database migration)
- **Rename** — Opens dialog to rename conversation
- **Delete** — Deletes conversation with confirmation

### Implementation

```tsx
import { ConversationActionsMenu } from '@/components/dashboard/ConversationActionsMenu';

<ConversationActionsMenu
  conversationId={conversation.id}
  conversationTitle={conversation.title}
  isPinned={conversation.pinned}
  onRename={handleRename}
  onDelete={handleDelete}
  onPin={handlePin}
  onShare={handleShare}
/>
```

### Database Migration Required

**Issue:** `pinned` column missing from `conversations` table

**Fix:**
```sql
ALTER TABLE conversations ADD COLUMN pinned BOOLEAN DEFAULT FALSE;
CREATE INDEX idx_conversations_user_pinned ON conversations(user_id, pinned, updated_at DESC);
```

**Status:** ⚠️ **PENDING** — Pin functionality disabled until migration applied

---

## 🎨 UX Improvements Implemented

### ✅ Completed

1. **Markdown Rendering** — Full markdown support with syntax highlighting
2. **Loading Indicators** — Skeleton loaders, spinners, progress bars
3. **Active Conversation Highlighting** — Visual feedback for current conversation
4. **Auto-scroll** — Automatically scrolls to latest message
5. **Better Placeholder Text** — Context-aware input placeholders
6. **Credit Display** — Shows usage in footer when limits reached
7. **Model Selector** — Reorganized with top performers first
8. **Conversation Actions** — Three-dots menu with Share, Pin, Rename, Delete

### ⏸️ Optional Enhancements

- [ ] Streaming responses (character-by-character)
- [ ] Message editing/regeneration
- [ ] Conversation export
- [ ] Agent switching mid-conversation
- [ ] Voice input
- [ ] File attachments

---

## 🔌 API Endpoint Reference

### POST `/api/ai/run`

**Request:**
```typescript
{
  model: string;                    // e.g., "gemini-2.5-pro"
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;             // Default: 0.3
  max_tokens?: number;               // Default: 4000
}
```

**Response:**
```typescript
{
  output: string;                    // AI response text
  tokens: number;                    // Tokens used
  model: string;                     // Model used
  provider: string;                  // Provider (openai, anthropic, google, etc.)
}
```

**Error Response:**
```typescript
{
  error: string;                     // Error message
  code?: string;                     // Error code
}
```

---

## 🗄️ Database Schema

### `ai_logs` Table

```sql
CREATE TABLE ai_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent text NOT NULL,
  input text NOT NULL,
  output text,
  tokens_used int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_ai_logs_user_id ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_agent ON ai_logs(agent);
CREATE INDEX idx_ai_logs_created_at ON ai_logs(created_at);
```

### `user_credits` Table

```sql
CREATE TABLE user_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_used int DEFAULT 0,
  credits_limit int NOT NULL,
  last_reset timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Functions
CREATE FUNCTION reset_daily_credits() RETURNS void;
CREATE FUNCTION initialize_user_credits(user_id uuid) RETURNS void;
CREATE FUNCTION deduct_user_credits(user_id uuid, amount int) RETURNS boolean;
```

### `conversations` Table

```sql
-- Existing columns: id, user_id, title, created_at, updated_at
-- Missing column (migration needed):
ALTER TABLE conversations ADD COLUMN pinned BOOLEAN DEFAULT FALSE;
```

---

## 🐛 Known Issues & Fixes

### ✅ Fixed Issues

1. **Missing SUPABASE_URL** — Environment variable configured
2. **Missing STRIPE_SECRET_KEY** — Environment variable configured
3. **Zod Schema Extension Error** — Fixed in `packages/ai-core/src/schema/index.ts`
4. **ReferenceError in GeminiMainArea** — Fixed initialization order

### ⚠️ Pending Issues

1. **Pin Column Missing** — Database migration needed for `conversations.pinned`
2. **"More Models" Submenu** — Positioning/visibility needs investigation (low priority)

---

## 📚 Related Documentation

- **Agent Playbooks:** `docs/agents/5-AGENT_PLAYBOOKS.md` — Agent guidelines and rules
- **Subscription System:** `docs/subscription/Subscription & Billing (v1.0).md` — Credits and billing
- **Theme System:** `docs/theme/THEME_SYSTEM_COMPREHENSIVE_PLAN.md` — UI theming guide

---

## 🧪 Testing Checklist

### Core Functionality

- [x] Agent registry loads correctly
- [x] API endpoint responds with valid data
- [x] Credits system tracks usage
- [x] Model selector updates selection
- [x] Chat UI displays messages correctly
- [x] Conversation actions menu appears on hover

### Edge Cases

- [ ] Credit exhaustion handling
- [ ] Network error recovery
- [ ] Invalid model selection
- [ ] Empty conversation handling
- [ ] Long message handling

---

## 🚀 Next Steps

### High Priority

1. **Database Migration** — Add `pinned` column to `conversations` table
2. **Pin Functionality** — Enable pinning after migration
3. **Error Handling** — Improve error messages and recovery

### Medium Priority

1. **Streaming Responses** — Implement character-by-character streaming
2. **Message Actions** — Add copy, regenerate, like/dislike buttons
3. **Search** — Add conversation search functionality

### Low Priority

1. **Voice Input** — Implement microphone recording
2. **File Attachments** — Support file uploads
3. **Export** — Add conversation export feature

---

## 💡 Code Examples

### Adding a New Agent

**1. Register in `packages/ai-core/src/agentRegistry.ts`:**

```typescript
export const agentRegistry: Record<string, AgentConfig> = {
  // ... existing agents
  'newAgent': {
    id: 'newAgent',
    name: 'New Agent',
    description: 'Agent description',
    model: 'gpt-5',
    context: 'new-domain',
    temperature: 0.3,
    maxTokens: 4000,
  },
};
```

**2. Use in component:**

```tsx
const { runAgent, loading } = useAIAgent('newAgent');
```

### Customizing Model Selection

**File:** `apps/web/src/components/ui/chatgpt-prompt-input.tsx`

```typescript
const modelsList = [
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', upgradeRequired: true },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', upgradeRequired: true },
  // ... add more models
];
```

### Adding Credit Check

**File:** `apps/web/src/features/ai/hooks/useAIAgent.ts`

```typescript
import { useCredits } from '@/hooks/useCredits';

export function useAIAgent(agentKey: string) {
  const { creditsUsed, creditsLimit, deductCredits } = useCredits();
  
  const runAgent = async (params: RunAgentParams) => {
    // Check credits before execution
    if (creditsUsed >= creditsLimit) {
      throw new Error('Daily credits exhausted');
    }
    
    // Execute agent
    const result = await executeAgent(params);
    
    // Deduct credits
    await deductCredits(result.tokens);
    
    return result;
  };
}
```

---

**Status:** ✅ **PRODUCTION READY** — Core features complete, optional enhancements available  
**Last Updated:** 2025-01-27  
**Version:** 2.0

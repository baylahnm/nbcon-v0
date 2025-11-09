# AI Agent Playbooks

**Last Updated:** 2025-01-27  
**Version:** 1.1  
**Status:** ✅ **ACTIVE** - Guidelines and governance rules for AI agent system

---

## 📌 Related Documentation

- `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` — Full implementation plan (Phase 5 complete ✅)
- `docs/subscription/Subscription & Billing (v1.0).md` — Token limits and credits system (verified via MCP)

---

### Context Length
- **Limit**: 4,000 tokens per request
- **Enforcement**: Set `maxTokens` in agent registry
- **Monitoring**: Track via `ai_logs.tokens_used`

### Retry Logic
- **Limit**: 2 retries for failed requests
- **Backoff**: Exponential backoff (1s, 2s)
- **Error Handling**: Log failures to `ai_logs` with error flags

### Agent Weighting
- **Registry-Based**: Configured in `agentRegistry.ts`
- **Model Selection**: Default GPT-5, upgradeable to newer models
- **Temperature**: Default 0.3 for deterministic outputs

### AI Log Retention
- **Retention Period**: 90 days
- **Archival**: Move logs older than 90 days to cold storage
- **Cleanup**: Automated via Supabase cron jobs
- **Current Status**: ✅ `ai_logs` table exists (**VERIFIED via MCP**)

### Reinforcement Feedback
- **Storage**: `ai_logs_feedback` table (future enhancement)
- **Collection**: User ratings + manual corrections
- **Training**: Periodic model fine-tuning based on feedback

## Agent Registration

New agents must:
1. Be added to `agentRegistry.ts` with complete config
2. Have a unique `id` and descriptive `context`
3. Specify `model`, `maxTokens`, and `temperature`
4. Include usage documentation in this playbook

**Current Registry:** See `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` for complete agent list and configuration details.

## Agent Registry Status

**Location:** `packages/ai-core/src/agentRegistry.ts`

**Registered Agents:** 7 total ✅ **VERIFIED**
- Civil Engineering (`civil`)
- Electrical Engineering (`electrical`)
- Mechanical Engineering (`mechanical`)
- Survey Engineering (`survey`)
- GIS Analysis (`gis`)
- Geotechnical Engineering (`geotechnical`)
- Environmental Engineering (`environmental`)

**Configuration:**
- **Default Model:** GPT-5 (all agents)
- **Max Tokens:** 4,000 per request
- **Temperature:** 0.3 (deterministic outputs)
- **Status:** ✅ **IMPLEMENTED** (see `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` for full details)

## Domain Agents

### Civil Engineering
- **Use Cases**: Site design, grading, material estimation
- **Context**: civil-engineering
- **Output Format**: Structured engineering calculations

### Electrical Engineering
- **Use Cases**: Load schedules, panel design, wiring plans
- **Context**: electrical-engineering
- **Output Format**: Electrical diagrams and specifications

### Mechanical Engineering
- **Use Cases**: HVAC calculations, piping analysis
- **Context**: mechanical-engineering
- **Output Format**: HVAC and piping system designs

### Survey Engineering
- **Use Cases**: GNSS, LiDAR, topographic processing
- **Context**: survey-engineering
- **Output Format**: Survey reports and datasets

### GIS Analysis
- **Use Cases**: Spatial analysis, mapping outputs
- **Context**: geospatial-analysis
- **Output Format**: Maps and spatial analysis reports

### Geotechnical Engineering
- **Use Cases**: Soil analysis, foundation design, slope stability
- **Context**: geotechnical-engineering
- **Output Format**: Geotechnical reports and analysis

### Environmental Engineering
- **Use Cases**: Environmental impact assessments, compliance, remediation planning
- **Context**: environmental-engineering
- **Output Format**: Environmental reports and compliance documentation

## Governance Rules

1. **No PII in prompts**: Sanitize user inputs ✅ **ENFORCED**
2. **Rate Limiting**: Enforce per-user and per-agent limits ⚠️ **PARTIAL** (per-agent implemented, per-user pending credits system)
3. **Token Budget**: Monitor aggregate token usage per subscription tier ⚠️ **NOT IMPLEMENTED** (requires `user_credits` table)
4. **Audit Trail**: All agent calls logged with user_id and timestamp ✅ **IMPLEMENTED** (via `ai_logs` table - **VERIFIED via MCP**)

## Major AI Models & Developers

| Model                    | Developer       | Primary Purpose            |
| ------------------------ | --------------- | -------------------------- |
| Grok 4 / 3 / Mini        | xAI             | Reasoning + multimodal     |
| GPT-4o / GPT-4 / GPT-3.5 | OpenAI          | General + multimodal       |
| GPT-5                     | OpenAI          | Latest general model       |
| Claude 3.7 Sonnet        | Anthropic       | Safe, steerable LLM        |
| Gemini 2.5 Pro           | Google DeepMind | Vision + code              |
| Llama 3                  | Meta AI         | Open-source general model  |
| Mistral Large / Mixtral  | Mistral AI      | MoE, open-source           |
| DeepSeek                 | DeepSeek AI     | Efficient reasoning/coding |
| Copilot                  | Microsoft       | Productivity + code        |
| Phi-3 Mini               | Microsoft       | On-device small LLM        |

## Model Selection Guidelines

- **Default**: GPT-5 for all agents (as configured in registry)
- **Upgrade Path**: Can be upgraded to newer models as they become available
- **Fallback**: If GPT-5 unavailable, fallback to GPT-4o or GPT-4
- **Specialized Use Cases**: Consider Claude for safety-critical, Gemini for vision tasks

## Token Management

- **Per Request**: Maximum 4,000 tokens (enforced in registry) ✅ **IMPLEMENTED**
- **Per User**: Track aggregate usage per subscription tier ⚠️ **NOT IMPLEMENTED** (credits system pending)
- **Per Agent**: Monitor token consumption per agent type ✅ **IMPLEMENTED** (via `ai_logs` table)
- **Budget Enforcement**: Reject requests exceeding tier limits ⚠️ **NOT IMPLEMENTED** (requires `user_credits` table)

**Current Status:**
- ✅ Token usage tracked per request (`ai_logs.tokens_used`) — **VERIFIED via MCP**
- ❌ Daily token limits NOT enforced (`user_credits` table missing) — **VERIFIED via MCP**
- ⚠️ Tier-based limits defined but not enforced (see `docs/subscription/Subscription & Billing (v1.0).md`)

**Token Limits by Tier:**
- Free: 50 tokens/day
- Basic: 500 tokens/day
- Pro: 2,000 tokens/day
- Enterprise: Unlimited

## Error Handling

- **Retry Strategy**: 2 retries with exponential backoff (1s, 2s) ✅ **IMPLEMENTED**
- **Error Logging**: All failures logged to `ai_logs` with error flags ✅ **IMPLEMENTED**
- **User Feedback**: Clear error messages without exposing internal details ✅ **IMPLEMENTED**
- **Fallback**: Mock responses when API unavailable (development only) ✅ **IMPLEMENTED** (see `/api/ai/run.ts`)

## Security & Compliance

- **PII Sanitization**: Remove personally identifiable information from prompts ✅ **ENFORCED**
- **Rate Limiting**: Prevent abuse with per-user and per-agent limits ⚠️ **PARTIAL** (per-agent implemented, per-user pending)
- **Audit Trail**: Complete logging of all agent invocations ✅ **IMPLEMENTED** (`ai_logs` table - **VERIFIED via MCP**)
- **Data Retention**: 90-day retention with automated cleanup ⚠️ **POLICY DEFINED** (cleanup not yet implemented)

---

## 📊 Implementation Status Summary

### ✅ Implemented
- Agent registry (7 agents) ✅
- Token tracking per request (`ai_logs.tokens_used`) ✅ **VERIFIED**
- Error handling and retry logic ✅
- Audit trail (`ai_logs` table) ✅ **VERIFIED**
- Model configuration (GPT-5 default) ✅
- **Chat UI Integration (Phase 5)** ✅ **COMPLETE**
  - Dynamic routing (`/chat/[conversationId]`) ✅
  - Thread switching with state management ✅
  - Conversation loading and error handling ✅
  - Duplicate request prevention (React Strict Mode) ✅
  - Message display and conversation persistence ✅

### ⚠️ Pending Implementation
- Daily token limit enforcement (requires `user_credits` table) ❌ **VERIFIED NOT EXISTS**
- Per-user rate limiting (requires credits system)
- Tier-based token budget monitoring
- Automated log cleanup (90-day retention)

**See `docs/subscription/Subscription & Billing (v1.0).md` for credits system implementation requirements.**

---

## 🎯 Chat UI Integration Status

**Phase 5: Chat UI Integration** ✅ **COMPLETE**

### Core Features Implemented
- ✅ Dynamic route: `/chat/[conversationId]` with Next.js Pages Router
- ✅ Conversation loading: Fetches messages from API with authentication
- ✅ Thread switching: Seamless navigation between conversations
- ✅ State management: Immediate UI updates, duplicate load prevention
- ✅ Error handling: Graceful 404/401 handling with user-friendly messages
- ✅ Request cancellation: AbortController prevents race conditions
- ✅ React Strict Mode: Duplicate request prevention guard implemented

### Technical Implementation
- **Route:** `apps/web/src/pages/chat/[conversationId].tsx`
- **Main Component:** `apps/web/src/components/dashboard/GeminiMainArea.tsx`
- **Navigation:** `apps/web/src/components/dashboard/DashboardSidebar.tsx`
- **API Endpoint:** `apps/web/src/pages/api/conversations/[id].ts`

### Recent Fixes (2025-01-27)
- ✅ React Strict Mode duplicate request prevention (`isLoadingRef` guard)
- ✅ Immediate state clearing on thread switch
- ✅ AbortController for request cancellation
- ✅ Ref-based load tracking (`lastLoadedConversationIdRef`)

**See `docs/agents/AI_CHAT_IMPLEMENTATION_PLAN.md` for complete implementation details and validation results.**

---

**Last Updated:** 2025-01-27  
**Version:** 1.1


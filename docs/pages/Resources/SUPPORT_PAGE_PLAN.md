# Support Page Plan (`/support`)

## Overview
A comprehensive support hub page that provides multiple channels for users to get help, submit tickets, contact support, and access self-service resources. This page serves as the central entry point for all customer support needs.

## 📋 Assignment Rules

**Focus Areas:**

1. **Solution-First:** Always provide actionable code solutions, not just descriptions
2. **Code Examples:** Include complete, copy-paste ready code blocks
3. **Validation First:** Verify current codebase structure before proposing changes
4. **Single Source of Truth:** Centralize all plan/pricing configs
5. **SAR Consistency:** All pricing displays must use SAR currency
6. **Enterprise Handling:** Enterprise plans should route to contact, not checkout
7. **Use MCP When Needed:** Leverage Model Context Protocol (MCP) tools for database queries, file operations, and codebase exploration
8. **Browser Tools for Testing:** Use browser automation tools for testing UI flows and validating interactions

**When Implementing:**
- Check existing files before creating new ones
- Use TypeScript types for all configs
- Use MCP for database schema verification, migration checks, and Supabase operations
- Use browser tools to test UI components in real browser environment

## Current State Analysis

### ✅ Existing Resources
- **FAQ Page**: `/faq` - Comprehensive FAQ system with search and categories
- **Docs Page**: `/docs` - Full documentation system
- **Forum Page**: `/forum` - Community forum for discussions
- **Help Page**: `/help` - Basic placeholder (can be enhanced or redirected)
- **Enterprise Contact**: `/enterprise` - Enterprise contact form
- **i18n Translations**: `support` and `supportDesc` already defined

### ⚠️ Missing Components
- Support ticket system (database schema needed)
- Contact form component
- Support channel components
- Ticket status tracking
- Support hours/availability display

## Page Structure

### Hero Section
- **Component**: `SimpleHeroSection`
- **Headline**: "Get Support"
- **Description**: "We're here to help! Find answers, submit tickets, or contact our support team"
- **CTA**: 
  - Primary: "Submit a Ticket" (scrolls to form)
  - Secondary: "Browse FAQ" (links to `/faq`)
- **Background Variant**: "minimal"

### Main Content Sections

#### 1. Quick Help Cards
**Purpose**: Quick access to common support resources

**Cards**:
- **📚 Documentation**
  - Title: "Browse Documentation"
  - Description: "Comprehensive guides and tutorials"
  - Link: `/docs`
  - Icon: BookOpen

- **❓ FAQ**
  - Title: "Frequently Asked Questions"
  - Description: "Find answers to common questions"
  - Link: `/faq`
  - Icon: HelpCircle

- **💬 Community Forum**
  - Title: "Community Forum"
  - Description: "Ask questions and get help from the community"
  - Link: `/forum`
  - Icon: MessageCircle

- **🔍 Search**
  - Title: "Search Knowledge Base"
  - Description: "Search across docs, FAQ, and forum"
  - Action: Opens search modal
  - Icon: Search

#### 2. Support Channels
**Purpose**: Display available support channels with contact information

**Channels**:
- **Email Support**
  - Email: `support@nbcon.ai`
  - Response time: "Within 24 hours"
  - Best for: General inquiries, account questions
  - Icon: Mail

- **Live Chat** (if available)
  - Status: "Available" / "Offline"
  - Hours: "Mon-Fri, 9 AM - 6 PM GMT"
  - Best for: Quick questions
  - Icon: MessageSquare

- **Enterprise Support**
  - Link: `/enterprise`
  - Description: "Dedicated support for enterprise customers"
  - Icon: Building2

- **Emergency Support** (Enterprise only)
  - Phone: Display if enterprise tier
  - Response time: "1 hour SLA"
  - Icon: Phone

#### 3. Submit Support Ticket
**Purpose**: Main contact form for submitting support requests

**Form Fields**:
- **Subject** (required)
  - Input type: Text
  - Placeholder: "Brief description of your issue"

- **Category** (required)
  - Select dropdown:
    - Account & Billing
    - Technical Support
    - Feature Request
    - Bug Report
    - General Inquiry
    - Enterprise Support

- **Priority** (required)
  - Select dropdown:
    - Low
    - Medium
    - High
    - Urgent (Enterprise only)

- **Description** (required)
  - Textarea
  - Placeholder: "Please provide detailed information about your issue..."
  - Character limit: 2000

- **Attachments** (optional)
  - File upload
  - Max size: 10MB
  - Accepted types: Images, PDFs, logs

- **Contact Email** (required if not logged in)
  - Input type: Email
  - Auto-filled if user is authenticated

- **Submit Button**
  - Creates support ticket
  - Shows loading state
  - Displays success message with ticket ID

#### 4. Ticket Status Check
**Purpose**: Allow users to check status of existing tickets

**Features**:
- **Ticket ID Input**
  - Input field for ticket ID
  - Search button

- **Status Display** (if ticket found)
  - Ticket ID
  - Status badge (Open, In Progress, Resolved, Closed)
  - Created date
  - Last updated
  - Messages/updates timeline

- **Authentication Required**
  - If logged in, show all user's tickets
  - If not logged in, require ticket ID + email

#### 5. Support Hours & Availability
**Purpose**: Display support availability information

**Information**:
- **Standard Support Hours**
  - Days: Monday - Friday
  - Hours: 9:00 AM - 6:00 PM GMT
  - Timezone selector

- **Holiday Schedule**
  - List of holidays when support is unavailable

- **Response Times**
  - Free/Basic: 48-72 hours
  - Pro: 24-48 hours
  - Teams: 12-24 hours
  - Enterprise: 1-4 hours (SLA)

#### 6. Self-Service Resources
**Purpose**: Links to self-service options

**Resources**:
- **Knowledge Base**: Link to `/docs`
- **Video Tutorials**: Link to tutorials (if available)
- **API Documentation**: Link to `/api` or API docs
- **Status Page**: Link to status page (if available)
- **Community**: Link to `/forum` and `/community`

## Database Schema (Supabase)

### Support Tickets Table
```sql
-- Support Tickets Table
-- Migration: 20251128000002_create_support_tickets_table.sql
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number text UNIQUE NOT NULL, -- e.g., "TKT-2025-001234"
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL, -- Required for non-authenticated users
  subject text NOT NULL,
  category text NOT NULL, -- account, technical, feature, bug, general, enterprise
  priority text NOT NULL DEFAULT 'medium', -- low, medium, high, urgent
  status text NOT NULL DEFAULT 'open', -- open, in_progress, resolved, closed
  description text NOT NULL,
  attachments jsonb DEFAULT '[]'::jsonb, -- Array of file URLs/metadata
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_email ON support_tickets(email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number ON support_tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON support_tickets(created_at DESC);

-- Support Ticket Messages Table (for ticket conversations)
CREATE TABLE IF NOT EXISTS support_ticket_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text, -- For non-authenticated users
  message text NOT NULL,
  is_internal boolean DEFAULT false, -- Internal notes (staff only)
  attachments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_ticket ON support_ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created ON support_ticket_messages(created_at DESC);

-- Enable RLS
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for support_tickets
-- Anyone can create tickets
CREATE POLICY "Anyone can create tickets"
  ON support_tickets FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Users can view their own tickets
CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can view tickets by email (for non-authenticated ticket lookup)
CREATE POLICY "Users can view tickets by email"
  ON support_tickets FOR SELECT
  TO authenticated, anon
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR email = current_setting('app.settings.email', true));

-- Staff can view all tickets (requires role check)
CREATE POLICY "Staff can view all tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' IN ('admin', 'support_staff')
    )
  );

-- Users can update their own tickets (status changes, etc.)
CREATE POLICY "Users can update own tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for support_ticket_messages
-- Users can create messages for their tickets
CREATE POLICY "Users can create messages"
  ON support_ticket_messages FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_id
      AND (support_tickets.user_id = auth.uid() OR support_tickets.email = current_setting('app.settings.email', true))
    )
  );

-- Users can view messages for their tickets
CREATE POLICY "Users can view ticket messages"
  ON support_ticket_messages FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_id
      AND (support_tickets.user_id = auth.uid() OR support_tickets.email = current_setting('app.settings.email', true))
      AND is_internal = false
    )
  );

-- Staff can view all messages including internal
CREATE POLICY "Staff can view all messages"
  ON support_ticket_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' IN ('admin', 'support_staff')
    )
  );
```

## TypeScript Types

```typescript
// apps/web/src/types/support.ts
export type SupportTicketCategory = 
  | "account" 
  | "technical" 
  | "feature" 
  | "bug" 
  | "general" 
  | "enterprise";

export type SupportTicketPriority = 
  | "low" 
  | "medium" 
  | "high" 
  | "urgent";

export type SupportTicketStatus = 
  | "open" 
  | "in_progress" 
  | "resolved" 
  | "closed";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId?: string;
  email: string;
  subject: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  description: string;
  attachments?: Attachment[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
}

export interface SupportTicketMessage {
  id: string;
  ticketId: string;
  userId?: string;
  email?: string;
  message: string;
  isInternal: boolean;
  attachments?: Attachment[];
  createdAt: string;
}

export interface Attachment {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface SupportChannel {
  id: string;
  name: string;
  description: string;
  contact: string;
  responseTime: string;
  hours: string;
  icon: string;
  available: boolean;
  requiresAuth?: boolean;
}
```

## File Structure

```
apps/web/src/
  pages/
    support/
      index.tsx ✅ TO CREATE
  components/
    support/
      SupportHero.tsx ✅ TO CREATE
      QuickHelpCards.tsx ✅ TO CREATE
      SupportChannels.tsx ✅ TO CREATE
      SupportTicketForm.tsx ✅ TO CREATE
      TicketStatusCheck.tsx ✅ TO CREATE
      SupportHours.tsx ✅ TO CREATE
      SelfServiceResources.tsx ✅ TO CREATE
  hooks/
    useSupportTicket.ts ✅ TO CREATE
    useTicketStatus.ts ✅ TO CREATE
  pages/api/
    support/
      tickets.ts ✅ TO CREATE (POST, GET)
      tickets/[id].ts ✅ TO CREATE (GET, PUT)
      tickets/[id]/messages.ts ✅ TO CREATE (POST, GET)
  types/
    support.ts ✅ TO CREATE
supabase/migrations/
  20251128000002_create_support_tickets_table.sql ✅ TO CREATE
```

## Implementation Steps

### Step 1: Database Schema ✅ TODO
1. Create migration file `20251128000002_create_support_tickets_table.sql`
2. Create `support_tickets` table
3. Create `support_ticket_messages` table
4. Set up RLS policies
5. Create indexes
6. Apply migration using Supabase MCP

### Step 2: TypeScript Types ✅ TODO
1. Create `apps/web/src/types/support.ts`
2. Define all interfaces and types
3. Export types for use in components

### Step 3: API Endpoints ✅ TODO
1. **POST /api/support/tickets**
   - Create new support ticket
   - Generate ticket number (format: TKT-YYYY-NNNNNN)
   - Send confirmation email
   - Return ticket ID and number

2. **GET /api/support/tickets**
   - Get user's tickets (if authenticated)
   - Filter by status, category, priority
   - Pagination support

3. **GET /api/support/tickets/[id]**
   - Get ticket details
   - Include messages
   - Check permissions (user owns ticket or is staff)

4. **PUT /api/support/tickets/[id]**
   - Update ticket status
   - Add internal notes (staff only)
   - Update priority/assignment

5. **POST /api/support/tickets/[id]/messages**
   - Add message to ticket
   - Support file attachments
   - Send email notifications

### Step 4: Support Components ✅ TODO

#### 4.1 SupportHero Component
- Hero section with headline and CTAs
- Use `SimpleHeroSection` component

#### 4.2 QuickHelpCards Component
- Grid of 4 cards (Docs, FAQ, Forum, Search)
- Card-based layout with icons
- Links to respective pages

#### 4.3 SupportChannels Component
- Display available support channels
- Show availability status
- Contact information
- Response times

#### 4.4 SupportTicketForm Component
- Multi-step or single form
- All required fields
- File upload for attachments
- Form validation
- Submit handler
- Success/error states

#### 4.5 TicketStatusCheck Component
- Ticket ID input
- Email input (if not authenticated)
- Status display
- Message timeline
- Reply functionality

#### 4.6 SupportHours Component
- Display support hours
- Timezone selector
- Response time by tier
- Holiday schedule

#### 4.7 SelfServiceResources Component
- Links to self-service options
- Organized in cards or list

### Step 5: Support Page ✅ TODO
1. Create `apps/web/src/pages/support/index.tsx`
2. Import all support components
3. Layout sections in order:
   - Hero
   - Quick Help Cards
   - Support Channels
   - Submit Ticket Form
   - Ticket Status Check
   - Support Hours
   - Self-Service Resources
4. Add SEO metadata
5. Add structured data (JSON-LD)

### Step 6: Hooks ✅ TODO
1. **useSupportTicket Hook**
   - Submit ticket functionality
   - Loading states
   - Error handling

2. **useTicketStatus Hook**
   - Fetch ticket by ID
   - Fetch ticket messages
   - Real-time updates (optional)

### Step 7: Integration ✅ TODO
1. Update `/docs` page quickLinks to link to `/support`
2. Update FAQ page "Contact Support" links to `/support`
3. Add support link to main navigation (if needed)
4. Add support link to footer

## Component Details

### SupportTicketForm Component

```typescript
// apps/web/src/components/support/SupportTicketForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportTicket } from "@/hooks/useSupportTicket";
import { useAuth } from "@/hooks/useAuth"; // Assuming auth hook exists
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, Paperclip } from "lucide-react";
import type { SupportTicketCategory, SupportTicketPriority } from "@/types/support";

export function SupportTicketForm() {
  const { user } = useAuth();
  const { submitTicket, loading } = useSupportTicket();
  const [formData, setFormData] = useState({
    subject: "",
    category: "" as SupportTicketCategory | "",
    priority: "medium" as SupportTicketPriority,
    description: "",
    email: user?.email || "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.category || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const ticket = await submitTicket({
        ...formData,
        category: formData.category as SupportTicketCategory,
        attachments: attachments.map(f => ({
          file: f,
          filename: f.name,
        })),
      });

      toast({
        title: "Ticket submitted!",
        description: `Your ticket #${ticket.ticketNumber} has been created. We'll respond within 24 hours.`,
      });

      // Reset form
      setFormData({
        subject: "",
        category: "" as SupportTicketCategory | "",
        priority: "medium",
        description: "",
        email: user?.email || "",
      });
      setAttachments([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-[0.5px] border-border/50 bg-surface">
      <CardHeader>
        <CardTitle>Submit a Support Ticket</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject *</label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as SupportTicketCategory })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account & Billing</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="enterprise">Enterprise Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority *</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as SupportTicketPriority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  {user?.subscriptionTier === "enterprise" && (
                    <SelectItem value="urgent">Urgent</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!user && (
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              maxLength={2000}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.description.length}/2000 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Attachments (optional)</label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                accept="image/*,.pdf,.txt,.log"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setAttachments(files);
                }}
                className="cursor-pointer"
              />
              <span className="text-xs text-muted-foreground">
                Max 10MB per file
              </span>
            </div>
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((file, idx) => (
                  <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Paperclip className="h-3 w-3" />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### TicketStatusCheck Component

```typescript
// apps/web/src/components/support/TicketStatusCheck.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTicketStatus } from "@/hooks/useTicketStatus";
import { Loader2, Search, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportTicketStatus } from "@/types/support";

const statusConfig: Record<SupportTicketStatus, { label: string; icon: React.ReactNode; color: string }> = {
  open: { label: "Open", icon: <AlertCircle className="h-4 w-4" />, color: "bg-blue-500" },
  in_progress: { label: "In Progress", icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500" },
  resolved: { label: "Resolved", icon: <CheckCircle2 className="h-4 w-4" />, color: "bg-green-500" },
  closed: { label: "Closed", icon: <XCircle className="h-4 w-4" />, color: "bg-gray-500" },
};

export function TicketStatusCheck() {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const { ticket, loading, error, fetchTicket } = useTicketStatus();

  const handleSearch = async () => {
    if (!ticketId) return;
    await fetchTicket(ticketId, email || undefined);
  };

  return (
    <Card className="border-[0.5px] border-border/50 bg-surface">
      <CardHeader>
        <CardTitle>Check Ticket Status</CardTitle>
        <CardDescription>
          Enter your ticket number to view status and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Ticket ID (e.g., TKT-2025-001234)"
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading || !ticketId}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!ticket && (
            <div className="text-sm text-muted-foreground">
              <p>Don't have a ticket ID? Check your email for the confirmation message.</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border-[0.5px] border-destructive/50 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {ticket && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{ticket.ticketNumber}</span>
                  <Badge className={cn(statusConfig[ticket.status].color, "text-white")}>
                    {statusConfig[ticket.status].icon}
                    <span className="ml-1">{statusConfig[ticket.status].label}</span>
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Subject: {ticket.subject}</p>
                  <p>Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                  {ticket.updatedAt && (
                    <p>Last updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              {/* Messages timeline would go here */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

## API Endpoint Examples

### POST /api/support/tickets

```typescript
// apps/web/src/pages/api/support/tickets.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ticketSchema = z.object({
  subject: z.string().min(5).max(200),
  category: z.enum(["account", "technical", "feature", "bug", "general", "enterprise"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  description: z.string().min(20).max(2000),
  email: z.string().email(),
  attachments: z.array(z.object({
    url: z.string(),
    filename: z.string(),
    size: z.number(),
    type: z.string(),
  })).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = ticketSchema.parse(req.body);
    
    // Generate ticket number
    const year = new Date().getFullYear();
    const count = await supabase
      .from("support_tickets")
      .select("id", { count: "exact", head: true })
      .gte("created_at", `${year}-01-01`);
    
    const ticketNumber = `TKT-${year}-${String((count.count || 0) + 1).padStart(6, "0")}`;

    // Create ticket
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert({
        ticket_number: ticketNumber,
        user_id: req.body.userId || null,
        email: body.email,
        subject: body.subject,
        category: body.category,
        priority: body.priority,
        description: body.description,
        attachments: body.attachments || [],
        status: "open",
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send confirmation email

    return res.status(201).json({
      id: ticket.id,
      ticketNumber: ticket.ticket_number,
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(400).json({ error: "Failed to create ticket" });
  }
}
```

## Integration Points

1. **Docs Page** (`/docs/index.tsx`)
   - QuickLinks already references `/support` ✅
   - No changes needed

2. **FAQ Page** (`/faq/index.tsx`)
   - Update "Contact Support" links to `/support`
   - Update hero CTA to `/support`

3. **Navigation**
   - Consider adding Support link to main nav
   - Add to footer links

4. **Help Page** (`/help/index.tsx`)
   - Option 1: Redirect to `/support`
   - Option 2: Keep as separate page for internal help
   - Option 3: Enhance with support features

## Testing Checklist

- [ ] Support ticket form validation
- [ ] Ticket submission works
- [ ] Ticket number generation is unique
- [ ] Email confirmation sent
- [ ] Ticket status check works
- [ ] File uploads work
- [ ] RLS policies work correctly
- [ ] Authenticated users see their tickets
- [ ] Non-authenticated users can check by ticket ID + email
- [ ] Staff can view all tickets
- [ ] Support channels display correctly
- [ ] Quick help cards link correctly
- [ ] Mobile responsive design
- [ ] i18n translations work
- [ ] Dark mode works

## Success Metrics

- **Ticket Volume**: Track tickets created per day/week
- **Response Time**: Average time to first response
- **Resolution Time**: Average time to resolution
- **User Satisfaction**: Post-resolution feedback
- **Self-Service Rate**: % of users who find answers without tickets

## Future Enhancements

1. **Live Chat Integration**
   - Real-time chat widget
   - Chat history linked to tickets

2. **Knowledge Base Integration**
   - AI-powered suggestions
   - Related articles in ticket form

3. **Ticket Analytics Dashboard**
   - For support staff
   - Metrics and reporting

4. **Email Integration**
   - Reply to tickets via email
   - Email notifications

5. **SLA Tracking**
   - Automatic SLA monitoring
   - Escalation rules

6. **Multi-language Support**
   - Support tickets in multiple languages
   - Translation for support staff

## Notes

- All implementations should follow existing patterns (Supabase, TypeScript, shadcn UI)
- Use MCP tools for database operations
- Test each feature before moving to next
- Update this plan as features are completed
- Mark completed items with ✅
- Mark in-progress items with 🚧
- Mark TODO items with ⚠️

## Important Implementation Notes

1. **Ticket Number Format**: `TKT-YYYY-NNNNNN` (e.g., TKT-2025-001234)
2. **File Uploads**: Use Supabase Storage for attachments
3. **Email Notifications**: Use email service (Resend, SendGrid, etc.)
4. **Authentication**: Support both authenticated and anonymous users
5. **RLS Policies**: Ensure proper security for ticket access
6. **Rate Limiting**: Prevent ticket spam (max 5 tickets per hour per email)


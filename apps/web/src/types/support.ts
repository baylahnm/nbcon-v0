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

export interface CreateTicketRequest {
  subject: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  description: string;
  email: string;
  attachments?: Attachment[];
}

export interface CreateTicketResponse {
  id: string;
  ticketNumber: string;
  message: string;
}


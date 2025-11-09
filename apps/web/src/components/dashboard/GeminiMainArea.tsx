"use client";

import * as React from "react";
import { PromptBox } from "@/components/ui/chatgpt-prompt-input";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSubscriptionTier } from "@/hooks/useSubscriptionTier";
import { useCredits } from "@/hooks/useCredits";
import { useAIAgent } from "@/features/ai/hooks/useAIAgent";
import { agentRegistry } from "@/features/ai/registry/agentRegistry";
import { useConversations } from "@/hooks/useConversations";
import { useRouter } from "next/router";
import { supabase } from "@nbcon/config";
import { FeedbackButtons } from "@/components/ui/feedback-buttons";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { CopyButton } from "@/components/ui/copy-button";
import { ShareMenu } from "@/components/ui/share-menu";

type AgentKey = keyof typeof agentRegistry;
import Link from "next/link";
import {
  FileText,
  BarChart3,
  Search,
  BookOpen,
  AlertCircle,
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  messageId?: string; // ID from ai_logs for assistant messages
  versionNumber?: number; // Version number for assistant messages
}

export function GeminiMainArea() {
  const router = useRouter();
  const { profile, isLoading } = useUserProfile();
  const { tier, isLoading: tierLoading } = useSubscriptionTier();
  const { used: creditsUsed, limit: creditsLimit, isLoading: creditsLoading, canUse } = useCredits();
  const { createConversation } = useConversations();
  const [selectedAgent, setSelectedAgent] = React.useState<AgentKey>("civil");
  const [selectedModel, setSelectedModel] = React.useState<string>("claude-sonnet-4.5");
  const { runAgent, loading: agentLoading, error: agentError } = useAIAgent(selectedAgent, { model: selectedModel });
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] = React.useState<string | null>(null);
  const [isLoadingConversation, setIsLoadingConversation] = React.useState(false);

  // Get conversation ID from URL query params
  const conversationIdFromUrl = router.query.conversation as string | undefined;

  // Load conversation when ID changes
  React.useEffect(() => {
    async function loadConversation() {
      if (!conversationIdFromUrl) {
        setCurrentConversationId(null);
        setMessages([]);
        return;
      }

      setIsLoadingConversation(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const response = await fetch(`/api/conversations/${conversationIdFromUrl}`);
        if (!response.ok) {
          console.error("Failed to load conversation");
          return;
        }

        const conversation = await response.json();
        setCurrentConversationId(conversation.id);

        // Convert conversation messages to Message format
        const loadedMessages: Message[] = (conversation.messages || []).map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at),
        }));

        setMessages(loadedMessages);
      } catch (error) {
        console.error("Error loading conversation:", error);
      } finally {
        setIsLoadingConversation(false);
      }
    }

    loadConversation();
  }, [conversationIdFromUrl]);

  const displayName = profile?.full_name || profile?.username || profile?.email?.split("@")[0] || "there";
  
  const planLabel = tier === "free" ? "Free plan" : tier === "pro" ? "Pro plan" : tier === "enterprise" ? "Enterprise plan" : "Free plan";

  const quickActions: QuickAction[] = [
    {
      id: "create-job",
      label: "Create Job",
      icon: FileText,
      onClick: () => {
        // Handle create job
        console.log("Create job clicked");
      },
    },
    {
      id: "write",
      label: "Write",
      icon: FileText,
      onClick: () => {
        setInputValue("Help me write ");
      },
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: BarChart3,
      onClick: () => {
        setInputValue("Analyze ");
      },
    },
    {
      id: "survey",
      label: "Survey",
      icon: Search,
      onClick: () => {
        setInputValue("Research ");
      },
    },
    {
      id: "learn",
      label: "Learn",
      icon: BookOpen,
      onClick: () => {
        setInputValue("Explain ");
      },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check credits before executing
    if (!canUse && tier !== "enterprise") {
      // Show upgrade prompt - will be handled by UI
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue("");

    // Create conversation if it doesn't exist
    let conversationId = currentConversationId;
    if (!conversationId) {
      // Generate title from first message (truncate to 50 chars)
      const title = userMessage.length > 50 
        ? userMessage.substring(0, 47) + "..." 
        : userMessage;
      
      const newConversation = await createConversation(title);
      if (newConversation) {
        conversationId = newConversation.id;
        setCurrentConversationId(conversationId);
        // Update URL with conversation ID
        router.push(`/dashboard?conversation=${conversationId}`, undefined, { shallow: true });
      }
    } else {
      // Update conversation title if this is the first message
      if (messages.length === 0 && userMessage.length > 0) {
        const title = userMessage.length > 50 
          ? userMessage.substring(0, 47) + "..." 
          : userMessage;
        
        try {
          await fetch(`/api/conversations/${conversationId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
          });
        } catch (error) {
          console.error("Error updating conversation title:", error);
        }
      }
    }

    // Add user message to chat
    const userMsg: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Call AI agent with conversation ID
      const response = await runAgent({ 
        prompt: userMessage,
        ...(conversationId && { conversationId } as any),
      });

      // Add assistant response to chat
      // Note: messageId will be set from ai_logs response if available
      const assistantMsg: Message = {
        role: "assistant",
        content: response.output || "No response received",
        timestamp: new Date(),
        messageId: (response as any).logId || undefined, // Get log ID from response if available
        versionNumber: (response as any).version_number || 1,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Error is handled by useAIAgent hook and displayed via agentError
      console.error("AI agent error:", err);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Plan Badge */}
        <div className="flex justify-center">
          <div className="ml-0.5 inline-flex items-center gap-1.5 rounded-lg h-8 px-2.5 text-center text-sm bg-[#fafafa] dark:bg-[#181818] text-muted-foreground select-none">
            {tierLoading ? (
              <span className="h-4 w-16 bg-muted-foreground/20 rounded animate-pulse" />
            ) : (
              <>
                {planLabel}
                <div className="size-[3px] bg-muted-foreground/30 rounded-full mt-0.5" />
                {tier === "free" ? (
                  <Link className="inline underline hover:no-underline cursor-pointer" href="/?settings=billing">
                    Upgrade
                  </Link>
                ) : (
                  <span className="text-xs opacity-70">Active</span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center space-y-2">
          {isLoading ? (
            <div className="h-8 w-64 bg-muted rounded animate-pulse mx-auto" />
          ) : (
            <h1 className="text-4xl md:text-5xl font-light text-foreground">
              Hello, {displayName}
            </h1>
          )}
          <p className="text-lg text-muted-foreground">
            How can I help you today?
          </p>
        </div>

        {/* Messages Display */}
        {isLoadingConversation ? (
          <div className="w-full p-4 text-center text-muted-foreground">
            Loading conversation...
          </div>
        ) : messages.length > 0 ? (
          <div className="w-full max-h-[400px] overflow-y-auto space-y-4 p-4 border rounded-lg bg-background">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <CopyButton
                    text={msg.content}
                    label={msg.role === "user" ? "Copy prompt" : "Copy response"}
                  />
                </div>
                {msg.role === "assistant" && msg.messageId && (
                  <div className="flex items-center gap-2">
                    <FeedbackButtons messageId={msg.messageId} />
                    <RegenerateButton
                      messageId={msg.messageId}
                      conversationId={currentConversationId || undefined}
                      agentKey={selectedAgent}
                      onRegenerated={(newVersion) => {
                        // Update the message content with regenerated version
                        setMessages((prev) =>
                          prev.map((m) =>
                            m.messageId === msg.messageId
                              ? {
                                  ...m,
                                  content: newVersion.output,
                                  versionNumber: newVersion.version_number,
                                }
                              : m
                          )
                        );
                      }}
                    />
                    {currentConversationId && (
                      <ShareMenu
                        conversationId={currentConversationId}
                        conversationTitle={messages.find((m) => m.role === "user")?.content || "Conversation"}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            {agentLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Error Display */}
        {agentError && (
          <div className="w-full p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive">{agentError}</p>
          </div>
        )}

        {/* Credit Exhausted Warning */}
        {!canUse && tier !== "enterprise" && !creditsLoading && (
          <div className="w-full p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Daily credits exhausted ({creditsUsed}/{creditsLimit}). Upgrade to continue.
              </p>
            </div>
            <Link href="/?settings=billing">
              <Button size="sm" variant="outline">
                Upgrade
              </Button>
            </Link>
          </div>
        )}

        {/* Chat Input with Status Bar */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <PromptBox
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              className="w-full"
            />
          </form>

          {/* Status Bar Footer */}
          <div className="w-full max-w-[calc(100%-2rem)] mx-auto border-t border-border/50 relative z-0 px-3.5 m-0 rounded-b-[15px] border-t-0 pb-2 pt-2 bg-[#fafafa] dark:bg-[#181818] border-transparent mt-0">
            <div className="w-full">
              <div className="flex w-full flex-col items-center md:flex-row gap-2">
                <div className="flex flex-row items-center gap-2 md:w-full text-muted-foreground">
                  {creditsLoading ? (
                    <div className="h-4 w-32 bg-muted-foreground/20 rounded animate-pulse" />
                  ) : (
                    <div className="text-xs font-normal">
                      {tier === "enterprise" ? (
                        "Unlimited credits"
                      ) : (
                        `Credits: ${creditsUsed}/${creditsLimit} ∙ Resets midnight UTC`
                      )}
                    </div>
                  )}
                </div>
                {tier === "free" && (
                  <div className="w-full whitespace-nowrap md:w-fit">
                    <Link className="inline underline hover:no-underline cursor-pointer text-xs font-normal" href="/?settings=billing">
                      Upgrade
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="h-9 rounded-full border-border bg-[#fafafa] dark:bg-[#181818] hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


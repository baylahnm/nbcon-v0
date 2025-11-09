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
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

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
  const [conversationError, setConversationError] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const lastLoadedConversationIdRef = React.useRef<string | null>(null); // Track last loaded conversation to prevent duplicate loads
  const isLoadingRef = React.useRef<string | null>(null); // Track currently loading conversation ID to prevent duplicate requests

  // Auto-scroll to latest message
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, agentLoading]);

  // Get conversation ID from URL - support both dynamic route (/chat/:id) and query param (?conversation=id)
  const conversationIdFromRoute = router.query.conversationId as string | undefined;
  const conversationIdFromQuery = router.query.conversation as string | undefined;
  const conversationIdFromUrl = conversationIdFromRoute || conversationIdFromQuery;

  // Load conversation when ID changes (only when router is ready)
  React.useEffect(() => {
    // AbortController to cancel in-flight requests when conversation ID changes
    const abortController = new AbortController();

    async function loadConversation() {
      // Wait for router to be ready before accessing query params
      if (!router.isReady) {
        return;
      }

      if (!conversationIdFromUrl) {
        // Clear state when no conversation ID in URL
        setCurrentConversationId(null);
        lastLoadedConversationIdRef.current = null; // Reset ref
        isLoadingRef.current = null; // Clear loading ref
        setMessages([]);
        setConversationError(null);
        setIsLoadingConversation(false);
        return;
      }

      // If conversation ID changed, clear previous conversation state immediately
      // This ensures UI updates immediately when switching threads
      if (lastLoadedConversationIdRef.current !== conversationIdFromUrl) {
        setMessages([]); // Clear messages immediately for better UX
        setConversationError(null);
      }

      // Prevent loading the same conversation twice (only if already loaded)
      if (lastLoadedConversationIdRef.current === conversationIdFromUrl && messages.length > 0) {
        return;
      }

      // Prevent duplicate concurrent requests (React Strict Mode double-invocation guard)
      if (isLoadingRef.current === conversationIdFromUrl) {
        return;
      }

      setIsLoadingConversation(true);
      isLoadingRef.current = conversationIdFromUrl; // Mark as loading
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setConversationError("Authentication required");
          setIsLoadingConversation(false);
          isLoadingRef.current = null; // Clear loading ref on auth failure
          return;
        }

        // Get session token for API request
        const { data: { session } } = await supabase.auth.getSession();
        const headers: HeadersInit = {};
        if (session?.access_token) {
          headers["Authorization"] = `Bearer ${session.access_token}`;
        }

        const response = await fetch(`/api/conversations/${conversationIdFromUrl}`, {
          headers,
          signal: abortController.signal, // Add abort signal to cancel request
        });
        
        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }
        
        if (!response.ok) {
          if (response.status === 404) {
            // Don't log 404 errors to console - they're expected for invalid/deleted conversations
            setConversationError("Conversation not found");
            // Clear invalid conversation ID from state
            setCurrentConversationId(null);
            lastLoadedConversationIdRef.current = null; // Reset ref
            isLoadingRef.current = null; // Clear loading ref
            setMessages([]);
            // Optionally redirect to dashboard without conversation
            router.replace("/dashboard", undefined, { shallow: true });
          } else if (response.status === 401) {
            setConversationError("Unauthorized to access this conversation");
          } else {
            setConversationError("Failed to load conversation");
          }
          return;
        }

        const conversation = await response.json();
        
        // Check if request was aborted after JSON parsing
        if (abortController.signal.aborted) {
          return;
        }
        
        if (!conversation || !conversation.id) {
          setConversationError("Invalid conversation data");
          return;
        }

        setCurrentConversationId(conversation.id);
        lastLoadedConversationIdRef.current = conversation.id; // Update ref after successful load
        isLoadingRef.current = null; // Clear loading ref after successful load

        // Convert conversation messages to Message format
        const loadedMessages: Message[] = (conversation.messages || []).map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at),
          messageId: msg.id?.includes("-response") ? undefined : msg.id,
        }));

        setMessages(loadedMessages);
        setConversationError(null);
      } catch (error) {
        // Ignore AbortError - it's expected when conversation ID changes
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        // Only log unexpected errors
        if (!abortController.signal.aborted) {
          console.error("Error loading conversation:", error);
          setConversationError(error instanceof Error ? error.message : "Failed to load conversation");
          setCurrentConversationId(null);
          lastLoadedConversationIdRef.current = null; // Reset ref on error
          isLoadingRef.current = null; // Clear loading ref on error
          setMessages([]);
        }
      } finally {
        // Only update loading state if request wasn't aborted
        if (!abortController.signal.aborted) {
          setIsLoadingConversation(false);
          isLoadingRef.current = null; // Clear loading ref when done
        }
      }
    }

    loadConversation();

    // Cleanup: cancel in-flight request when conversation ID changes or component unmounts
    return () => {
      abortController.abort();
      isLoadingRef.current = null; // Clear loading ref on cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationIdFromUrl, router.isReady, router.asPath]);

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
        // Update URL with conversation ID using dynamic route
        router.push(`/chat/${conversationId}`, undefined, { shallow: true });
      }
    } else {
      // Update conversation title if this is the first message
      if (messages.length === 0 && userMessage.length > 0) {
        const title = userMessage.length > 50 
          ? userMessage.substring(0, 47) + "..." 
          : userMessage;
        
        try {
          // Get session token for API request
          const { data: { session } } = await supabase.auth.getSession();
          const headers: HeadersInit = {
            "Content-Type": "application/json",
          };
          if (session?.access_token) {
            headers["Authorization"] = `Bearer ${session.access_token}`;
          }

          await fetch(`/api/conversations/${conversationId}`, {
            method: "PATCH",
            headers,
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

  const hasMessages = messages.length > 0;
  const showCenteredLayout = !hasMessages && !isLoadingConversation && !conversationError;

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      {hasMessages ? (
        // Chat mode: Messages scrollable, input sticky at bottom
        <>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="w-full max-w-3xl mx-auto space-y-8">
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

              {/* Messages Display */}
              <div className="w-full space-y-4 p-4 border rounded-lg bg-background">
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
                        {msg.role === "assistant" ? (
                          <MarkdownRenderer content={msg.content} className="text-sm" />
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        )}
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
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                        </div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

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
            </div>
          </div>

          {/* Sticky Chat Input with Status Bar */}
          <div className="sticky bottom-0 w-full bg-background border-t border-border pt-4 pb-4 px-8">
            <div className="w-full max-w-3xl mx-auto">
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
          </div>
        </>
      ) : (
        // Initial mode: Centered layout with greeting, input, and quick actions
        <div className="flex-1 flex flex-col items-center justify-center p-8">
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

            {/* Conversation Error Display */}
            {conversationError && (
              <div className="w-full p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div className="flex-1">
                  <p className="text-sm text-destructive">{conversationError}</p>
                  <button
                    onClick={() => {
                      setConversationError(null);
                      router.push("/dashboard", undefined, { shallow: true });
                    }}
                    className="text-xs text-destructive underline mt-1 hover:no-underline"
                  >
                    Start new conversation
                  </button>
                </div>
              </div>
            )}

            {/* Loading Conversation */}
            {isLoadingConversation && (
              <div className="w-full p-4 text-center">
                <div className="inline-flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading conversation...</span>
                </div>
              </div>
            )}

            {/* Centered Chat Input */}
            {showCenteredLayout && (
              <>
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
                <div className="flex flex-wrap items-center justify-center gap-2">
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


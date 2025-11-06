import { useState, useEffect } from "react";
import { useAIAgent } from "../../features/ai/hooks/useAIAgent";
import { agentRegistry } from "../../features/ai/registry/agentRegistry";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { supabase } from "@nbcon/config";

type AgentKey = keyof typeof agentRegistry;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  timestamp: Date;
}

interface ChatProjectHubProps {
  projectId?: string;
  defaultAgent?: AgentKey;
}

export function ChatProjectHub({ projectId, defaultAgent = "civil" }: ChatProjectHubProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentKey>(defaultAgent);
  const [loading, setLoading] = useState(false);
  const { runAgent } = useAIAgent(selectedAgent);

  // Load chat history for project/user
  useEffect(() => {
    if (!isOpen) return;

    async function loadHistory() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const query = supabase
          .from("ai_logs")
          .select("id, input, output, agent, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(25);

        // Filter by project if provided
        if (projectId) {
          query.eq("project_id", projectId);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (data) {
          const history: Message[] = data.reverse().flatMap((log) => [
            {
              id: `${log.id}-user`,
              role: "user" as const,
              content: log.input || "",
              agent: String(log.agent || ""),
              timestamp: new Date(log.created_at),
            },
            {
              id: `${log.id}-assistant`,
              role: "assistant" as const,
              content: log.output || "",
              agent: String(log.agent || ""),
              timestamp: new Date(log.created_at),
            },
          ]);
          setMessages(history);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }

    loadHistory();
  }, [projectId, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      agent: String(selectedAgent),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await runAgent({ prompt: input });

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: result.output,
        agent: String(selectedAgent),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save to database (projectId is optional - can be added later)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("ai_logs").insert({
          user_id: user.id,
          agent: String(selectedAgent),
          input: userMessage.content,
          output: assistantMessage.content,
          tokens_used: result.tokens || 0,
        });
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `Error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const agent = agentRegistry[selectedAgent];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg h-14 w-14 p-0"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[600px] flex flex-col shadow-xl border-2">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-muted/50">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Project Chat</h3>
                <p className="text-xs text-muted-foreground">
                  {agent?.context || "AI Assistant"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Agent Selector */}
          <div className="p-3 border-b bg-muted/30">
            <select
              value={String(selectedAgent)}
              onChange={(e) => setSelectedAgent(e.target.value as AgentKey)}
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            >
              {Object.keys(agentRegistry).map((key) => (
                <option key={key} value={key}>
                  {agentRegistry[key as AgentKey]?.context || key}
                </option>
              ))}
            </select>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                <div className="text-center">
                  <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation with {agent?.context}</p>
                  <p className="text-xs mt-1">{agent?.description}</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.agent && message.role === "assistant" && (
                      <div className="text-xs opacity-70 mb-1">{String(message.agent)}</div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Thinking...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={`Ask ${agent?.context}...`}
                className="min-h-[60px] resize-none"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}


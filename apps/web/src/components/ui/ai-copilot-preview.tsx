"use client"

import { Bot, Send, Code2, Copy, Check, Sparkles, Search } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AICoPilotPreview() {
  const conversations = [
    {
      id: 1,
      user: "Calculate the load bearing capacity for a reinforced concrete beam with dimensions 300mm x 600mm, using C30 concrete and Grade 60 steel reinforcement.",
      ai: `I'll calculate the load bearing capacity for your beam.

**Given:**
- Dimensions: 300mm × 600mm
- Concrete: C30 (30 MPa)
- Steel: Grade 60 (415 MPa)

**Result:** The beam can safely support approximately **285 kN·m** of moment capacity.

Would you like a detailed analysis report?`,
      hasCode: false,
    },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-2xl h-full flex flex-col">
        <div className="bg-card dark:bg-surface-elevated rounded-xl shadow-xl overflow-hidden border border-border flex-1 flex flex-col min-h-0">
          {/* Browser Header */}
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/ai-copilot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400">Online</span>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Other Messages */}
            <div className="w-[35%] border-r border-border bg-background dark:bg-surface flex flex-col flex-shrink-0">
              {/* Search Bar */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Other Messages"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto scrollbar-custom p-2">
                {/* Placeholder for other messages - can be populated with actual data */}
                <div className="text-xs text-muted-foreground text-center py-4">
                  No other messages
                </div>
              </div>
            </div>

            {/* Right Panel - Chat Messages Area */}
            <div className="w-[65%] flex flex-col flex-1 min-h-0">
              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom pr-2">
                {conversations.map((conv) => (
                  <div key={conv.id} className="space-y-3">
                    {/* User Message */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">U</span>
                      </div>
                      <div className="flex-1 bg-muted/50 rounded-lg rounded-tl-none p-3">
                        <p className="text-xs text-foreground leading-relaxed">{conv.user}</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-primary/5 rounded-lg rounded-tl-none p-3">
                          <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                            {conv.ai.split('```').map((part, idx) => {
                              if (idx % 2 === 1) {
                                // Code block
                                return (
                                  <div key={idx} className="my-2 relative group">
                                    <div className="bg-background dark:bg-surface border border-border rounded-lg p-3 overflow-x-auto">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <Code2 className="w-3 h-3 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground font-mono">python</span>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                                          <Copy className="w-3 h-3 text-muted-foreground" />
                                        </button>
                                      </div>
                                      <pre className="text-xs font-mono text-foreground overflow-x-auto">
                                        <code>{part.trim()}</code>
                                      </pre>
                                    </div>
                                  </div>
                                )
                              }
                              return <span key={idx}>{part}</span>
                            })}
                          </div>
                        </div>
                        {conv.hasCode && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Sparkles className="w-3 h-3" />
                            <span>Code suggestion ready</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 bg-primary/5 rounded-lg rounded-tl-none p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-3 flex-shrink-0">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-chat-input dark:bg-chat-input rounded-lg border border-border px-3 py-2 min-h-[44px] max-h-[120px] overflow-y-auto">
                    <textarea
                      placeholder="Ask me anything about engineering, calculations, or code..."
                      className="w-full bg-transparent border-0 outline-0 resize-none text-xs text-foreground placeholder:text-muted-foreground"
                      rows={1}
                      style={{ minHeight: "20px" }}
                    />
                  </div>
                  <button className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

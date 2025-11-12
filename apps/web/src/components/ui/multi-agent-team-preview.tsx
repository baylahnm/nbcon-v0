"use client"

import { Play, Plus, Search, Bot, FileSearch, Workflow, Code2, Zap, ArrowRight, Settings, Send, Square, GitBranch, FileText, Database } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MultiAgentTeamPreview() {
  // Node type definition
  type WorkflowNode = {
    id: number
    type: "start" | "agent" | "tool" | "logic" | "end"
    label: string
    subLabel?: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    borderColor: string
    isVertical?: boolean
  }

  // Workflow structure - simplified to 4 nodes
  const startNode: WorkflowNode = { id: 1, type: "start", label: "Start", icon: Play, color: "bg-teal-500", borderColor: "border-teal-500" }
  const agentNode: WorkflowNode = { id: 2, type: "agent", label: "Agent", icon: Send, color: "bg-blue-500", borderColor: "border-blue-500" }
  const ifElseNode: WorkflowNode = { id: 3, type: "logic", label: "If / else", icon: GitBranch, color: "bg-orange-500", borderColor: "border-orange-500" }
  const endNode: WorkflowNode = { id: 4, type: "end", label: "End", icon: Square, color: "bg-teal-500", borderColor: "border-teal-500" }

        const availableComponents = [
          { category: "Core", items: [{ icon: Bot, label: "Agent", color: "text-blue-500" }] },
    { 
      category: "Tools", 
      items: [
        { icon: FileSearch, label: "File search", color: "text-yellow-500" },
        { icon: Code2, label: "MCP", color: "text-yellow-500" },
        { icon: Search, label: "Web search", color: "text-yellow-500" },
        { icon: Zap, label: "API call", color: "text-yellow-500" },
      ] 
    },
    { 
      category: "Logic", 
      items: [
        { icon: Workflow, label: "If / else", color: "text-orange-500" },
        { icon: GitBranch, label: "Switch", color: "text-orange-500" },
        { icon: ArrowRight, label: "Loop", color: "text-orange-500" },
      ] 
    },
    {
      category: "Actions",
      items: [
        { icon: Send, label: "Send email", color: "text-purple-500" },
        { icon: FileText, label: "Create document", color: "text-purple-500" },
        { icon: Database, label: "Save data", color: "text-purple-500" },
      ]
    },
  ]

  // Node Component with connection point
  const NodeComponent = ({ node, showRightDot = false, showLeftDot = false }: { node: WorkflowNode; showRightDot?: boolean; showLeftDot?: boolean }) => {
    const Icon = node.icon
    const isVertical = node.isVertical || false
    
    return (
      <div className="relative flex items-center gap-0">
        {showLeftDot && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0"></div>
        )}
        <div className={`relative flex items-center gap-1 px-3 py-2 rounded-lg border bg-background dark:bg-surface ${node.borderColor} ${
          isVertical ? "flex-col py-3 min-w-[47px]" : "min-w-[40px]"
        }`}>
          <div className={`${node.color} rounded-lg p-0.5 flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-[14px] h-[14px] text-white" />
          </div>
          <div className={`flex flex-col ${isVertical ? "items-center" : ""}`}>
            <span className="text-[10px] font-medium text-foreground whitespace-nowrap">{node.label}</span>
            {node.subLabel && (
              <span className="text-[8px] text-muted-foreground whitespace-nowrap">{node.subLabel}</span>
            )}
          </div>
        </div>
        {showRightDot && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0"></div>
        )}
      </div>
    )
  }

  // Connection Line Component
  const ConnectionLine = () => (
    <div className="flex items-center">
      <div className="w-8 h-0.5 bg-muted-foreground/30"></div>
    </div>
  )

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
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/workflow-builder</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <Settings className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Component Panel */}
            <div className="w-[35%] border-r border-border bg-background dark:bg-surface flex flex-col flex-shrink-0">
              {/* Search Bar */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Component List */}
              <div className="flex-1 overflow-y-auto scrollbar-custom p-2">
                {availableComponents.map((category, catIdx) => (
                  <div key={catIdx} className="mb-4">
                    <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                      {category.category}
                    </div>
                    <div className="space-y-0.5">
                      {category.items.map((item, itemIdx) => {
                        const ItemIcon = item.icon
                        return (
                          <div
                            key={itemIdx}
                            className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                          >
                            <ItemIcon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                            <span className="text-xs text-foreground flex-1">{item.label}</span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Canvas */}
            <div className="w-[65%] p-6 overflow-auto scrollbar-custom relative flex flex-col">
              {/* Top empty row */}
              <div className="flex-1"></div>
              
              {/* Middle row with nodes */}
              <div className="flex items-center justify-center -gap-4 min-w-fit">
                {/* Start Node */}
                <NodeComponent node={startNode} showRightDot={true} />
                <ConnectionLine />
                {/* Agent Node */}
                <NodeComponent node={agentNode} showLeftDot={true} showRightDot={true} />
                <ConnectionLine />
                {/* If/Else Node */}
                <NodeComponent node={ifElseNode} showLeftDot={true} showRightDot={true} />
                <ConnectionLine />
                {/* End Node */}
                <NodeComponent node={endNode} showLeftDot={true} />
              </div>
              
              {/* Bottom empty row */}
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

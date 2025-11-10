"use client"

import { Camera, FileText, CheckCircle2, Database, Settings, Upload, Image, Ruler, Clock, TrendingUp, Circle, Play, Download, MapPin, User, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

export function FieldToReportPreview() {
  // Node type definition
  type WorkflowNode = {
    id: number
    type: "start" | "step" | "end"
    label: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    borderColor: string
  }

  // Workflow nodes
  const startNode: WorkflowNode = { id: 1, type: "start", label: "Field Data", icon: Camera, color: "bg-teal-500", borderColor: "border-teal-500" }
  const processingNode: WorkflowNode = { id: 2, type: "step", label: "Processing", icon: Database, color: "bg-blue-500", borderColor: "border-blue-500" }
  const reportNode: WorkflowNode = { id: 3, type: "step", label: "Report", icon: FileText, color: "bg-orange-500", borderColor: "border-orange-500" }
  const endNode: WorkflowNode = { id: 4, type: "end", label: "Review", icon: CheckCircle2, color: "bg-teal-500", borderColor: "border-teal-500" }

  // Mock project data
  const projectData = {
    name: "King Salman Park",
    taskTitle: "Site Inspection Report",
    status: "In progress",
    started: "2 hours ago",
    date: "2025-01-28",
    location: "Riyadh, Saudi Arabia",
    operator: "Nasser Baylah",
    photos: 12,
    measurements: 5,
    dataPoints: 47,
    progress: 50,
  }

  // Node Component with connection point
  const NodeComponent = ({ node, showRightDot = false, showLeftDot = false }: { node: WorkflowNode; showRightDot?: boolean; showLeftDot?: boolean }) => {
    const Icon = node.icon
    
    return (
      <div className="relative flex items-center gap-0">
        {showLeftDot && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0"></div>
        )}
        <div className={`relative flex items-center gap-1 px-3 py-2 rounded-lg border bg-background dark:bg-black ${node.borderColor} min-w-[40px]`}>
          <div className={`${node.color} rounded-lg p-0.5 flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-[14px] h-[14px] text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-foreground whitespace-nowrap">{node.label}</span>
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
        {/* Dashboard Header */}
        <div className="mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Field-to-Report Workflow
          </h2>
          <p className="text-xs text-muted-foreground">
            Seamless data collection to final report
          </p>
        </div>

        <div className="bg-card dark:bg-surface-elevated rounded-xl shadow-xl overflow-hidden border border-border flex-1 flex flex-col min-h-0">
          {/* Browser Header */}
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-muted-foreground ml-1">nbcon.pro/workflow</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <Settings className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Project Info */}
            <div className="w-[35%] border-r border-border bg-background dark:bg-surface flex flex-col flex-shrink-0">
              <div className="flex-1 overflow-y-auto scrollbar-custom p-3 space-y-3">
                {/* Project Card */}
                <Card className="p-3 bg-background dark:bg-surface border-border">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-foreground">{projectData.name}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Circle className="w-2.5 h-2.5 fill-primary text-primary" />
                      <span>{projectData.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Started {projectData.started}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{projectData.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{projectData.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{projectData.operator}</span>
                    </div>
                  </div>
                </Card>

                {/* Statistics Grid */}
                <div className="space-y-2">
                  {/* Photos Card */}
                  <Card className="p-2 bg-background dark:bg-surface border-border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Image className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">Photos</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{projectData.photos}</div>
                  </Card>

                  {/* Measurements Card */}
                  <Card className="p-2 bg-background dark:bg-surface border-border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Ruler className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">Measurements</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{projectData.measurements}</div>
                  </Card>

                  {/* Data Points Card */}
                  <Card className="p-2 bg-background dark:bg-surface border-border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Database className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">Data Points</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{projectData.dataPoints}</div>
                  </Card>
                </div>

                {/* Progress Card */}
                <Card className="p-3 bg-background dark:bg-surface border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">Progress</span>
                    <span className="text-xs font-semibold text-primary">{projectData.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mb-1">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all" 
                      style={{ width: `${projectData.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    2 of 4 steps completed
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium">
                    <Play className="w-3.5 h-3.5" />
                    Run
                  </button>
                </div>
              </div>
            </div>

            {/* Workflow Canvas */}
            <div className="w-[65%] p-6 overflow-auto scrollbar-custom relative flex flex-col">
              {/* Export Report Button */}
              <div className="flex justify-between items-center pb-4 flex-shrink-0">
                <span className="text-xs font-semibold text-foreground">{projectData.taskTitle}</span>
                <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-border bg-background dark:bg-surface hover:bg-muted transition-colors text-xs font-medium">
                  <Download className="w-3.5 h-3.5" />
                  Export Report
                </button>
              </div>

              {/* Top empty row */}
              <div className="flex-1"></div>
              
              {/* Middle row with nodes */}
              <div className="flex items-center justify-center -gap-4 min-w-fit">
                {/* Start Node */}
                <NodeComponent node={startNode} showRightDot={true} />
                <ConnectionLine />
                {/* Processing Node */}
                <NodeComponent node={processingNode} showLeftDot={true} showRightDot={true} />
                <ConnectionLine />
                {/* Report Node */}
                <NodeComponent node={reportNode} showLeftDot={true} showRightDot={true} />
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


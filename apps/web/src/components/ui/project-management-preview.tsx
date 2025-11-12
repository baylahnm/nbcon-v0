"use client"

import { CheckCircle2, Clock, Users, FolderKanban, TrendingUp, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ProjectManagementPreview() {
  const projects = [
    { id: 1, name: "Site Control", status: "In Progress", assignee: "John D.", priority: "high", progress: 65 },
    { id: 2, name: "Field Survey", status: "Review", assignee: "Sarah M.", priority: "medium", progress: 90 },
    { id: 3, name: "Report Generation", status: "To Do", assignee: "Mike T.", priority: "low", progress: 20 },
  ]

  const stats = {
    total: 12,
    inProgress: 5,
    completed: 4,
    overdue: 1,
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-2xl h-full flex flex-col">
        <div className="bg-card dark:bg-surface-elevated rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] overflow-hidden border border-border flex-1 flex flex-col min-h-0">
          {/* Browser Header */}
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/projects</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-custom">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="text-xs text-muted-foreground mb-1">Total</div>
                <div className="text-lg font-bold text-foreground">{stats.total}</div>
              </Card>
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="text-xs text-muted-foreground mb-1">In Progress</div>
                <div className="text-lg font-bold text-blue-500">{stats.inProgress}</div>
              </Card>
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="text-xs text-muted-foreground mb-1">Completed</div>
                <div className="text-lg font-bold text-green-500">{stats.completed}</div>
              </Card>
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="text-xs text-muted-foreground mb-1">Overdue</div>
                <div className="text-lg font-bold text-red-500">{stats.overdue}</div>
              </Card>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-3 gap-2">
              {/* To Do Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">To Do</span>
                  <span className="text-xs text-muted-foreground">(1)</span>
                </div>
                {projects.filter(p => p.status === "To Do").map(project => (
                  <Card key={project.id} className="p-2 bg-background dark:bg-surface border-border">
                    <div className="text-xs font-medium text-foreground mb-1">{project.name}</div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{project.assignee}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        project.priority === "high" ? "bg-red-500" : 
                        project.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* In Progress Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FolderKanban className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-semibold text-foreground">In Progress</span>
                  <span className="text-xs text-muted-foreground">(1)</span>
                </div>
                {projects.filter(p => p.status === "In Progress").map(project => (
                  <Card key={project.id} className="p-2 bg-background dark:bg-surface border-border">
                    <div className="text-xs font-medium text-foreground mb-1">{project.name}</div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{project.assignee}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        project.priority === "high" ? "bg-red-500" : 
                        project.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Review Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-semibold text-foreground">Review</span>
                  <span className="text-xs text-muted-foreground">(1)</span>
                </div>
                {projects.filter(p => p.status === "Review").map(project => (
                  <Card key={project.id} className="p-2 bg-background dark:bg-surface border-border">
                    <div className="text-xs font-medium text-foreground mb-1">{project.name}</div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{project.assignee}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        project.priority === "high" ? "bg-red-500" : 
                        project.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Activity */}
            <Card className="p-3 bg-background dark:bg-surface border-border">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">Team Activity</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Sarah completed "Field Survey"</span>
                  <span className="text-muted-foreground ml-auto">1h ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">John updated "Site Control"</span>
                  <span className="text-muted-foreground ml-auto">3h ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


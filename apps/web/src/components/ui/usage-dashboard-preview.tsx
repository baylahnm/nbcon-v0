"use client"

import { BarChart3, Bot, MessageSquare, TrendingUp, Zap, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"

export function UsageDashboardPreview() {
  // Mock usage data - in real app, this would come from props or API
  const usageData = {
    credits: { used: 342, limit: 500, remaining: 158 },
    projects: 12,
    conversations: 28,
    aiInteractions: 1247,
    growth: 23,
  }

  // Chart data for daily usage
  const dailyUsage = [
    { day: "Mon", usage: 45 },
    { day: "Tue", usage: 52 },
    { day: "Wed", usage: 48 },
    { day: "Thu", usage: 61 },
    { day: "Fri", usage: 55 },
    { day: "Sat", usage: 38 },
    { day: "Sun", usage: 43 },
  ]

  const creditsPercentage = (usageData.credits.used / usageData.credits.limit) * 100

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-2xl h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Your Dashboard Overview
          </h2>
          <p className="text-xs text-muted-foreground">
            Track your usage and productivity metrics
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="bg-card dark:bg-surface-elevated rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] overflow-hidden border border-border flex-1 flex flex-col min-h-0">
          {/* Browser Header */}
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/dashboard</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-custom">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* AI Credits Card */}
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">AI Credits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-foreground mb-1.5">
                  {usageData.credits.remaining} / {usageData.credits.limit}
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all" 
                    style={{ width: `${Math.min(100, creditsPercentage)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {usageData.credits.used} used today
                </div>
              </Card>

              {/* Projects Card */}
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">Projects</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-blue-600 dark:text-blue-400">+{usageData.growth}%</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-foreground">{usageData.projects}</div>
                <div className="text-xs text-muted-foreground mt-1">Active projects</div>
              </Card>

              {/* Conversations Card */}
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">Conversations</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-foreground">{usageData.conversations}</div>
                <div className="text-xs text-muted-foreground mt-1">Total chats</div>
              </Card>

              {/* AI Interactions Card */}
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">AI Requests</span>
                  </div>
                  <TrendingUp className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-lg font-bold text-foreground">{usageData.aiInteractions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">This month</div>
              </Card>
            </div>

            {/* Daily Usage Chart */}
            <Card className="p-3 bg-background dark:bg-surface border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Daily Usage</span>
                </div>
                <span className="text-xs text-muted-foreground">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between gap-1 h-20">
                {dailyUsage.map((day, index) => {
                  const maxUsage = Math.max(...dailyUsage.map(d => d.usage))
                  const height = (day.usage / maxUsage) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center">
                        <div
                          className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                          style={{ height: `${height}%`, minHeight: "4px" }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Recent Activity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Recent Activity</span>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Created new project "Site Control"</span>
                  <span className="text-muted-foreground ml-auto">2h ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">Completed AI analysis</span>
                  <span className="text-muted-foreground ml-auto">4h ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Shared conversation with team</span>
                  <span className="text-muted-foreground ml-auto">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


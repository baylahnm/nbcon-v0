"use client"

import { Activity, Server, AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MonitoringPreview() {
  const systems = [
    { name: "API Server", status: "healthy", uptime: "99.9%", latency: "45ms" },
    { name: "Database", status: "healthy", uptime: "99.8%", latency: "12ms" },
    { name: "Cache Layer", status: "warning", uptime: "98.5%", latency: "8ms" },
  ]

  const alerts = [
    { id: 1, type: "warning", message: "High CPU usage on server-03", time: "5m ago" },
    { id: 2, type: "info", message: "Scheduled maintenance completed", time: "1h ago" },
  ]

  const metrics = [
    { label: "CPU", value: 45, max: 100, color: "bg-blue-500" },
    { label: "Memory", value: 62, max: 100, color: "bg-green-500" },
    { label: "Disk", value: 38, max: 100, color: "bg-yellow-500" },
    { label: "Network", value: 28, max: 100, color: "bg-purple-500" },
  ]

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
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/monitoring</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400">All Systems Operational</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-custom">
            {/* System Status Grid */}
            <div className="grid grid-cols-3 gap-2">
              {systems.map((system, index) => (
                <Card key={index} className="p-2 bg-background dark:bg-surface border-border">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <Server className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{system.name}</span>
                    </div>
                    {system.status === "healthy" ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Uptime: {system.uptime}</div>
                  <div className="text-xs text-muted-foreground">Latency: {system.latency}</div>
                </Card>
              ))}
            </div>

            {/* Performance Metrics */}
            <Card className="p-3 bg-background dark:bg-surface border-border">
              <div className="flex items-center gap-1.5 mb-3">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">Performance Metrics</span>
              </div>
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-semibold text-foreground">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`${metric.color} h-1.5 rounded-full transition-all`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-3 bg-background dark:bg-surface border-border">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">Recent Alerts</span>
              </div>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      alert.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-muted-foreground">{alert.message}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Response Time</span>
                </div>
                <div className="text-lg font-bold text-foreground">142ms</div>
                <div className="text-[10px] text-green-600 dark:text-green-400">-5ms avg</div>
              </Card>
              <Card className="p-2 bg-background dark:bg-surface border-border">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Uptime</span>
                </div>
                <div className="text-lg font-bold text-foreground">99.7%</div>
                <div className="text-[10px] text-muted-foreground">Last 30 days</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


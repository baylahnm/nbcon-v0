"use client"

import { BarChart3, PieChart, LineChart, TrendingUp, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export function DataVisualizationPreview() {
  const chartData = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 48 },
    { label: "Apr", value: 61 },
    { label: "May", value: 55 },
    { label: "Jun", value: 67 },
  ]

  const pieData = [
    { label: "Type A", value: 35, color: "bg-blue-500" },
    { label: "Type B", value: 25, color: "bg-green-500" },
    { label: "Type C", value: 20, color: "bg-yellow-500" },
    { label: "Type D", value: 20, color: "bg-purple-500" },
  ]

  const maxValue = Math.max(...chartData.map(d => d.value))

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
              <span className="text-xs text-muted-foreground ml-1">nbcon.ai/analytics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-custom">
            {/* Chart Types Row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md">
                <BarChart3 className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">Bar</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                <LineChart className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Line</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                <PieChart className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Pie</span>
              </div>
            </div>

            {/* Bar Chart */}
            <Card className="p-3 bg-background dark:bg-surface border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Monthly Trends</span>
                </div>
                <TrendingUp className="w-3 h-3 text-green-500" />
              </div>
              <div className="flex items-end justify-between gap-1 h-24">
                {chartData.map((item, index) => {
                  const height = (item.value / maxValue) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center">
                        <div
                          className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t transition-all hover:from-primary/90 hover:to-primary/60"
                          style={{ height: `${height}%`, minHeight: "4px" }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Pie Chart */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="flex items-center gap-1.5 mb-3">
                  <PieChart className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Distribution</span>
                </div>
                <div className="flex flex-col gap-2">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${item.color}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] text-foreground">{item.label}</span>
                          <span className="text-[10px] font-semibold text-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1">
                          <div 
                            className={`${item.color} h-1 rounded-full`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-3 bg-background dark:bg-surface border-border">
                <div className="text-xs text-muted-foreground mb-2">Total Records</div>
                <div className="text-2xl font-bold text-foreground mb-1">12,847</div>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.5% from last month</span>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1">Avg. per day</div>
                  <div className="text-lg font-semibold text-foreground">214</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


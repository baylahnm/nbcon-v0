import { User } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="relative z-10 w-full max-w-lg">
      {/* Header Section */}
      <div className="text-foreground mb-8">
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          The simplest way to manage your engineering workforce
        </h2>
        <p className="text-muted-foreground text-lg">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Dashboard Card */}
      <div className="bg-card dark:bg-[#212121] rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Browser Header */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Ahmad</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Productive Time Card */}
            <div className="bg-card dark:bg-[#212121] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Productive Time</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">+28%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">12.4 hr</div>
              <div className="mt-2 h-8 flex items-end gap-1">
                <div className="w-4 bg-primary/30 rounded-t" style={{ height: "40%" }}></div>
                <div className="w-4 bg-primary/50 rounded-t" style={{ height: "60%" }}></div>
                <div className="w-4 bg-primary/40 rounded-t" style={{ height: "45%" }}></div>
                <div className="w-4 bg-primary/60 rounded-t" style={{ height: "75%" }}></div>
                <div className="w-4 bg-primary rounded-t" style={{ height: "90%" }}></div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="bg-card dark:bg-[#212121] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Projects</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-600">+18%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">8.5</div>
              <div className="mt-2 text-xs text-muted-foreground">2 pending</div>
            </div>
          </div>

          {/* Team Utilization */}
          <div className="bg-card dark:bg-[#181818] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Team Utilization</span>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-6 text-xs">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {/* Team Member 1 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">N</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-foreground">Nasser Baylah</div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">65%</span>
              </div>

              {/* Team Member 2 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">K</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-foreground">Khalid Al-Ali</div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">85%</span>
              </div>

              {/* Team Member 3 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">F</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-foreground">Fatima Ahmed</div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Logos */}
      <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
        <span className="text-foreground text-sm font-semibold">ARAMCO</span>
        <span className="text-foreground text-sm font-semibold">NEOM</span>
        <span className="text-foreground text-sm font-semibold">SABIC</span>
        <span className="text-foreground text-sm font-semibold">PIF</span>
      </div>
    </div>
  )
}


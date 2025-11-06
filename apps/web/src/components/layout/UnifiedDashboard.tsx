import { useSubscriptionTier } from "../../hooks/useSubscriptionTier";
import { Card } from "../ui/card";
import { BarChart3, Bot, Users, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function UnifiedDashboard() {
  const { tier, isLoading } = useSubscriptionTier();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-muted rounded-lg mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-muted rounded-lg" />
          <div className="h-48 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">AI Usage</p>
              <p className="text-2xl font-bold mt-1">342</p>
            </div>
            <Bot className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-2xl font-bold mt-1">+23%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Activity</h3>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart
              data={[
                { month: "Jan", projects: 3 },
                { month: "Feb", projects: 5 },
                { month: "Mar", projects: 4 },
                { month: "Apr", projects: 7 },
                { month: "May", projects: 6 },
                { month: "Jun", projects: 8 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Usage Trends</h3>
          <ResponsiveContainer width="100%" height={256}>
            <LineChart
              data={[
                { month: "Jan", tokens: 120 },
                { month: "Feb", tokens: 189 },
                { month: "Mar", tokens: 245 },
                { month: "Apr", tokens: 312 },
                { month: "May", tokens: 298 },
                { month: "Jun", tokens: 342 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="tokens"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="AI Tokens"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Subscription Status</h3>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium capitalize">
            {tier}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your current plan includes access to core features and tools.
        </p>
      </Card>
    </div>
  );
}


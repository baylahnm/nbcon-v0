import { useEffect, useState } from "react";
import { fetchData } from "@nbcon/enterprise-sdk";
import { Card } from "./ui/card";
import { AlertCircle, TrendingUp, Clock } from "lucide-react";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  metadata?: Record<string, unknown> & {
    error?: string;
    latency_ms?: number;
    status_code?: number;
  };
  created_at: string;
}

interface ErrorStats {
  total: number;
  by_action: Record<string, number>;
  recent_errors: AuditLog[];
}

interface LatencyStats {
  avg_ms: number;
  p95_ms: number;
  max_ms: number;
  recent_latencies: number[];
}

export default function MonitoringDashboard() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorStats, setErrorStats] = useState<ErrorStats | null>(null);
  const [latencyStats, setLatencyStats] = useState<LatencyStats | null>(null);

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const data = await fetchData<AuditLog>("audit_logs");
        const sortedLogs = data.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setLogs(sortedLogs.slice(0, 50)); // Latest 50 logs
        
        // Calculate error statistics
        const errorLogs = sortedLogs.filter(log => 
          log.action.includes("error") || 
          log.action.includes("failed") ||
          (log.metadata && log.metadata.error)
        );
        
        const errorByAction: Record<string, number> = {};
        errorLogs.forEach(log => {
          errorByAction[log.action] = (errorByAction[log.action] || 0) + 1;
        });
        
        setErrorStats({
          total: errorLogs.length,
          by_action: errorByAction,
          recent_errors: errorLogs.slice(0, 10),
        });
        
        // Calculate latency statistics (from AI logs metadata)
        const aiLogs = sortedLogs.filter(log => 
          log.action.includes("ai_agent_request") && 
          log.metadata?.latency_ms
        );
        
        if (aiLogs.length > 0) {
          const latencies = aiLogs.map(log => log.metadata?.latency_ms || 0);
          const sorted = [...latencies].sort((a, b) => a - b);
          const p95Index = Math.floor(sorted.length * 0.95);
          
          setLatencyStats({
            avg_ms: latencies.reduce((a, b) => a + b, 0) / latencies.length,
            p95_ms: sorted[p95Index] || 0,
            max_ms: Math.max(...latencies),
            recent_latencies: latencies.slice(0, 20),
          });
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load logs");
      } finally {
        setLoading(false);
      }
    }

    loadLogs();

    // Refresh every 30 seconds
    const interval = setInterval(loadLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading audit logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error and Latency Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Error Statistics */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold">Error Statistics</h3>
          </div>
          {errorStats ? (
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-destructive">{errorStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Errors</p>
              </div>
              {Object.keys(errorStats.by_action).length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">By Action:</p>
                  {Object.entries(errorStats.by_action).slice(0, 5).map(([action, count]) => (
                    <div key={action} className="flex justify-between text-sm">
                      <span className="truncate">{action}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No error data available</p>
          )}
        </Card>

        {/* Latency Statistics */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Latency Statistics</h3>
          </div>
          {latencyStats ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xl font-bold">{Math.round(latencyStats.avg_ms)}ms</p>
                  <p className="text-xs text-muted-foreground">Avg</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{Math.round(latencyStats.p95_ms)}ms</p>
                  <p className="text-xs text-muted-foreground">P95</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{Math.round(latencyStats.max_ms)}ms</p>
                  <p className="text-xs text-muted-foreground">Max</p>
                </div>
              </div>
              {/* Simple latency trend chart placeholder */}
              <div className="mt-4 h-24 bg-muted rounded flex items-end justify-between gap-1 p-2">
                {latencyStats.recent_latencies.slice(-10).map((latency, idx) => {
                  const max = Math.max(...latencyStats.recent_latencies);
                  const height = max > 0 ? (latency / max) * 100 : 0;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-primary rounded-t transition-all"
                      style={{ height: `${height}%` }}
                      title={`${Math.round(latency)}ms`}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No latency data available</p>
          )}
        </Card>
      </div>

      {/* Activity Logs */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          <h2 className="text-xl font-semibold">System Activity</h2>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">No activity logs found.</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="py-2 px-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.user_id ? `User: ${log.user_id.substring(0, 8)}...` : "System"}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}


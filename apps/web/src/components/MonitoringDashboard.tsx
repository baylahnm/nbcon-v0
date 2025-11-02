import { useEffect, useState } from "react";
import { fetchData } from "@nbcon/enterprise-sdk";
import { Card } from "./ui/card";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export default function MonitoringDashboard() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const data = await fetchData<AuditLog>("audit_logs");
        setLogs(data.slice(0, 50)); // Latest 50 logs
      } catch (err: any) {
        setError(err.message);
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
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">System Activity</h2>
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
                    User: {log.user_id.substring(0, 8)}...
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
  );
}


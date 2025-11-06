"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@nbcon/config";
import {
  Cloud,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  connected: boolean;
}

const availableIntegrations: Omit<Integration, "connected">[] = [
  {
    id: "google_drive",
    name: "Google Drive",
    icon: Cloud,
    description: "Access and sync files from Google Drive",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: Cloud,
    description: "Connect your Dropbox account",
  },
  {
    id: "autodesk",
    name: "Autodesk",
    icon: Cloud,
    description: "Integrate with Autodesk services",
  },
  {
    id: "arcgis",
    name: "ArcGIS",
    icon: Cloud,
    description: "Connect to ArcGIS platform",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    icon: Cloud,
    description: "Sync files from Microsoft OneDrive",
  },
];

export function ConnectorsSettings() {
  const [integrations, setIntegrations] = React.useState<Integration[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [connecting, setConnecting] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error loading integrations:", error);
      }

      const connectedIds = new Set(data?.map((i) => i.provider) || []);

      setIntegrations(
        availableIntegrations.map((integration) => ({
          ...integration,
          connected: connectedIds.has(integration.id),
        }))
      );
    } catch (error) {
      console.error("Error in loadIntegrations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (integrationId: string) => {
    setConnecting(integrationId);
    try {
      // In a real implementation, this would redirect to OAuth flow
      // For now, we'll simulate it
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Simulate OAuth connection
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { error } = await supabase.from("integrations").upsert({
        user_id: user.id,
        provider: integrationId,
        access_token: "mock_token", // In production, this comes from OAuth
        refresh_token: null,
        expires_at: null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error connecting integration:", error);
        alert("Failed to connect. Please try again.");
      } else {
        await loadIntegrations();
      }
    } catch (error) {
      console.error("Error in handleConnect:", error);
      alert("Failed to connect. Please try again.");
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (!confirm(`Are you sure you want to disconnect ${integrationId}?`)) {
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("integrations")
        .delete()
        .eq("user_id", user.id)
        .eq("provider", integrationId);

      if (error) {
        console.error("Error disconnecting integration:", error);
        alert("Failed to disconnect. Please try again.");
      } else {
        await loadIntegrations();
      }
    } catch (error) {
      console.error("Error in handleDisconnect:", error);
      alert("Failed to disconnect. Please try again.");
    }
  };

  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const Icon = integration.icon;
    const isConnecting = connecting === integration.id;

    return (
      <div className="border-border dark:border-[#2d2d2d] border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{integration.name}</h4>
                {integration.connected ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {integration.description}
              </p>
            </div>
          </div>
          <Button
            variant={integration.connected ? "outline" : "default"}
            size="sm"
            onClick={() =>
              integration.connected
                ? handleDisconnect(integration.id)
                : handleConnect(integration.id)
            }
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : integration.connected ? (
              "Disconnect"
            ) : (
              "Connect"
            )}
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Apps & Connectors</div>
          </h3>
        </div>
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative mb-4">
      {/* Header */}
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">Apps & Connectors</div>
        </h3>
      </div>

      {/* Integrations List */}
      <div className="space-y-4 mt-4">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 rounded-lg border border-border dark:border-[#2d2d2d] bg-muted/50">
        <div className="flex items-start gap-2">
          <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">About Integrations</p>
            <p className="text-xs text-muted-foreground">
              Connected services allow you to access files and data from external
              platforms. You can disconnect any integration at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@nbcon/config";
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  SiGoogledrive,
  SiDropbox,
  SiAutodesk,
} from "react-icons/si";

// Custom icons for services not available in react-icons
// Note: Brand logos use brand-specific colors for brand recognition (acceptable for brand logos)
const OneDriveIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 6.5C14.5 6.5 16 8 16 10C16 12 14.5 13.5 12.5 13.5C10.5 13.5 9 12 9 10C9 8 10.5 6.5 12.5 6.5ZM12.5 8C11.4 8 10.5 8.9 10.5 10C10.5 11.1 11.4 12 12.5 12C13.6 12 14.5 11.1 14.5 10C14.5 8.9 13.6 8 12.5 8Z" fill="#0078D4"/>
    <path d="M7 17.5C8.5 17.5 9.5 18.5 9.5 20C9.5 21.5 8.5 22.5 7 22.5C5.5 22.5 4.5 21.5 4.5 20C4.5 18.5 5.5 17.5 7 17.5ZM7 19C6.4 19 6 19.4 6 20C6 20.6 6.4 21 7 21C7.6 21 8 20.6 8 20C8 19.4 7.6 19 7 19Z" fill="#0078D4"/>
    <path d="M18 15.5C19.5 15.5 20.5 16.5 20.5 18C20.5 19.5 19.5 20.5 18 20.5C16.5 20.5 15.5 19.5 15.5 18C15.5 16.5 16.5 15.5 18 15.5ZM18 17C17.4 17 17 17.4 17 18C17 18.6 17.4 19 18 19C18.6 19 19 18.6 19 18C19 17.4 18.6 17 18 17Z" fill="#0078D4"/>
  </svg>
);

const ArcGISIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L7 12L12 7L17 12L22 7L12 2Z" fill="#00B9F1"/>
    <path d="M2 17L7 12L12 17L17 12L22 17L12 22L2 17Z" fill="#00B9F1"/>
  </svg>
);

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  connected: boolean;
}

// Wrapper components for react-icons to match the interface
const GoogleDriveIcon = ({ className }: { className?: string }) => <SiGoogledrive className={className} />;
const DropboxIcon = ({ className }: { className?: string }) => <SiDropbox className={className} />;
const AutodeskIcon = ({ className }: { className?: string }) => <SiAutodesk className={className} />;

const availableIntegrations: Omit<Integration, "connected">[] = [
  {
    id: "google_drive",
    name: "Google Drive",
    icon: GoogleDriveIcon,
    description: "Access and sync files from Google Drive",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: DropboxIcon,
    description: "Connect your Dropbox account",
  },
  {
    id: "autodesk",
    name: "Autodesk",
    icon: AutodeskIcon,
    description: "Integrate with Autodesk services",
  },
  {
    id: "arcgis",
    name: "ArcGIS",
    icon: ArcGISIcon,
    description: "Connect to ArcGIS platform",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    icon: OneDriveIcon,
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


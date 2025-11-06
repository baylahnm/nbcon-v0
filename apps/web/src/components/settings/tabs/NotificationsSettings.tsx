"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@nbcon/config";
import { Mail, Bell, Sparkles, Shield } from "lucide-react";

interface NotificationSettings {
  job_updates_email: boolean;
  job_updates_push: boolean;
  new_messages_push: boolean;
  ai_recommendations_email: boolean;
  account_alerts_email: boolean;
  account_alerts_inapp: boolean;
  enable_all: boolean;
}

export function NotificationsSettings() {
  const [settings, setSettings] = React.useState<NotificationSettings>({
    job_updates_email: true,
    job_updates_push: true,
    new_messages_push: true,
    ai_recommendations_email: false,
    account_alerts_email: true,
    account_alerts_inapp: true,
    enable_all: true,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned, which is fine for first-time users
        console.error("Error loading settings:", error);
      } else if (data) {
        setSettings({
          job_updates_email: data.job_updates_email ?? true,
          job_updates_push: data.job_updates_push ?? true,
          new_messages_push: data.new_messages_push ?? true,
          ai_recommendations_email: data.ai_recommendations_email ?? false,
          account_alerts_email: data.account_alerts_email ?? true,
          account_alerts_inapp: data.account_alerts_inapp ?? true,
          enable_all: data.enable_all ?? true,
        });
      }
    } catch (error) {
      console.error("Error in loadSettings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: NotificationSettings) => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          ...newSettings,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error saving settings:", error);
        alert("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Error in saveSettings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = async (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    
    // If enabling "enable_all", enable all notifications
    if (key === "enable_all" && value) {
      Object.keys(newSettings).forEach((k) => {
        if (k !== "enable_all" && k in newSettings) {
          (newSettings as NotificationSettings)[k as keyof NotificationSettings] = true;
        }
      });
    }
    
    // If disabling any notification, disable "enable_all"
    if (key !== "enable_all" && !value) {
      newSettings.enable_all = false;
    }
    
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const SettingRow = ({
    label,
    icon: Icon,
    children,
    description,
  }: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
    description?: string;
  }) => (
    <div className="border-border dark:border-[#2d2d2d] flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <div>{label}</div>
          </div>
          {children}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground pe-12 my-1">{description}</div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Notifications</div>
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
          <div className="truncate select-none">Notifications</div>
        </h3>
      </div>

      {/* Enable All Toggle */}
      <SettingRow label="Enable all notifications" icon={Bell}>
        <Switch
          checked={settings.enable_all}
          onCheckedChange={(checked) => handleToggle("enable_all", checked)}
          disabled={isSaving}
        />
      </SettingRow>

      {/* Job Updates */}
      <SettingRow
        label="Job updates"
        icon={Bell}
        description="Get notified when your jobs are updated or completed"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch
              checked={settings.job_updates_email}
              onCheckedChange={(checked) => handleToggle("job_updates_email", checked)}
              disabled={isSaving || !settings.enable_all}
            />
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch
              checked={settings.job_updates_push}
              onCheckedChange={(checked) => handleToggle("job_updates_push", checked)}
              disabled={isSaving || !settings.enable_all}
            />
          </div>
        </div>
      </SettingRow>

      {/* New Messages */}
      <SettingRow
        label="New messages"
        icon={Mail}
        description="Receive push notifications for new messages"
      >
        <Switch
          checked={settings.new_messages_push}
          onCheckedChange={(checked) => handleToggle("new_messages_push", checked)}
          disabled={isSaving || !settings.enable_all}
        />
      </SettingRow>

      {/* AI Recommendations */}
      <SettingRow
        label="AI recommendations"
        icon={Sparkles}
        description="Get email updates with AI-powered suggestions"
      >
        <Switch
          checked={settings.ai_recommendations_email}
          onCheckedChange={(checked) => handleToggle("ai_recommendations_email", checked)}
          disabled={isSaving || !settings.enable_all}
        />
      </SettingRow>

      {/* Account Alerts */}
      <SettingRow
        label="Account alerts"
        icon={Shield}
        description="Important account security and activity notifications"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch
              checked={settings.account_alerts_email}
              onCheckedChange={(checked) => handleToggle("account_alerts_email", checked)}
              disabled={isSaving || !settings.enable_all}
            />
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch
              checked={settings.account_alerts_inapp}
              onCheckedChange={(checked) => handleToggle("account_alerts_inapp", checked)}
              disabled={isSaving || !settings.enable_all}
            />
          </div>
        </div>
      </SettingRow>
    </section>
  );
}


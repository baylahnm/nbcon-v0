"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { supabase } from "@nbcon/config";
import { Shield, Eye, Clock, Filter } from "lucide-react";

export function ParentalControlsSettings() {
  const [restrictionsEnabled, setRestrictionsEnabled] = React.useState(false);
  const [activityVisible, setActivityVisible] = React.useState(true);
  const [screenTimeLimit, setScreenTimeLimit] = React.useState(4);
  const [safeMode, setSafeMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    loadRestrictions();
  }, []);

  const loadRestrictions = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_restrictions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading restrictions:", error);
      } else if (data) {
        setRestrictionsEnabled(data.restrictions_enabled ?? false);
        setActivityVisible(data.activity_visible ?? true);
        setScreenTimeLimit(data.screen_time_limit_hours ?? 4);
        setSafeMode(data.safe_mode ?? false);
      }
    } catch (error) {
      console.error("Error in loadRestrictions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRestrictions = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("user_restrictions").upsert({
        user_id: user.id,
        restrictions_enabled: restrictionsEnabled,
        activity_visible: activityVisible,
        screen_time_limit_hours: screenTimeLimit,
        safe_mode: safeMode,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving restrictions:", error);
        alert("Failed to save settings. Please try again.");
      } else {
        alert("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Error in saveRestrictions:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
            <div>
              <div>{label}</div>
              {description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {description}
                </div>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Parental Controls</div>
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
          <div className="truncate select-none">Parental Controls</div>
        </h3>
      </div>

      {/* Account Restrictions */}
      <SettingRow
        label="Account restrictions"
        icon={Shield}
        description="Enable restrictions on account activity"
      >
        <Switch
          checked={restrictionsEnabled}
          onCheckedChange={setRestrictionsEnabled}
          disabled={isSaving}
        />
      </SettingRow>

      {/* Activity Visibility */}
      <SettingRow
        label="Activity visibility"
        icon={Eye}
        description="Make account activity visible to parents/guardians"
      >
        <Switch
          checked={activityVisible}
          onCheckedChange={setActivityVisible}
          disabled={isSaving || !restrictionsEnabled}
        />
      </SettingRow>

      {/* Screen Time Limit */}
      <SettingRow
        label="Screen time limit"
        icon={Clock}
        description="Maximum hours per day (0 = unlimited)"
      >
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={screenTimeLimit}
            onChange={(e) =>
              setScreenTimeLimit(parseInt(e.target.value) || 0)
            }
            min={0}
            max={24}
            className="w-20"
            disabled={isSaving || !restrictionsEnabled}
          />
          <span className="text-sm text-muted-foreground">hours/day</span>
        </div>
      </SettingRow>

      {/* Safe Mode */}
      <SettingRow
        label="Safe mode"
        icon={Filter}
        description="Filter sensitive or inappropriate job content"
      >
        <Switch
          checked={safeMode}
          onCheckedChange={setSafeMode}
          disabled={isSaving || !restrictionsEnabled}
        />
      </SettingRow>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={saveRestrictions}
          disabled={isSaving}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </section>
  );
}


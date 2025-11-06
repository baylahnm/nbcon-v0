"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@nbcon/config";
import { Clock, Save } from "lucide-react";

export function SchedulesSettings() {
  const [workHoursStart, setWorkHoursStart] = React.useState("09:00");
  const [workHoursEnd, setWorkHoursEnd] = React.useState("17:00");
  const [timezone, setTimezone] = React.useState("UTC");
  const [defaultDuration, setDefaultDuration] = React.useState(60);
  const [autoApprove, setAutoApprove] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading availability:", error);
      } else if (data) {
        setWorkHoursStart(data.start_time || "09:00");
        setWorkHoursEnd(data.end_time || "17:00");
        setTimezone(data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
        setDefaultDuration(data.default_duration_minutes || 60);
        setAutoApprove(data.auto_approve || false);
      } else {
        // Set default timezone
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      }
    } catch (error) {
      console.error("Error in loadAvailability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("availability").upsert({
        user_id: user.id,
        start_time: workHoursStart,
        end_time: workHoursEnd,
        timezone: timezone,
        default_duration_minutes: defaultDuration,
        auto_approve: autoApprove,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving availability:", error);
        alert("Failed to save settings. Please try again.");
      } else {
        alert("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const SettingRow = ({
    label,
    children,
    description,
  }: {
    label: string;
    children: React.ReactNode;
    description?: string;
  }) => (
    <div className="border-border dark:border-[#2d2d2d] flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>{label}</div>
          {children}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground pe-12 my-1">{description}</div>
        )}
      </div>
    </div>
  );

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  if (isLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Schedules</div>
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
          <div className="truncate select-none">Schedules</div>
        </h3>
      </div>

      {/* Work Hours */}
      <SettingRow
        label="Work hours"
        description="Your standard working hours for scheduling"
      >
        <div className="flex items-center gap-2">
          <Input
            type="time"
            value={workHoursStart}
            onChange={(e) => setWorkHoursStart(e.target.value)}
            className="w-32"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="time"
            value={workHoursEnd}
            onChange={(e) => setWorkHoursEnd(e.target.value)}
            className="w-32"
          />
        </div>
      </SettingRow>

      {/* Timezone */}
      <SettingRow label="Time zone" description="Your local timezone">
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </SettingRow>

      {/* Default Booking Duration */}
      <SettingRow
        label="Default booking duration"
        description="Default duration for new bookings in minutes"
      >
        <Input
          type="number"
          value={defaultDuration}
          onChange={(e) => setDefaultDuration(parseInt(e.target.value) || 60)}
          min={15}
          max={480}
          step={15}
          className="w-32"
        />
      </SettingRow>

      {/* Auto-approve */}
      <SettingRow
        label="Auto-approve requests"
        description="Automatically approve booking requests within your work hours"
      >
        <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
      </SettingRow>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </section>
  );
}


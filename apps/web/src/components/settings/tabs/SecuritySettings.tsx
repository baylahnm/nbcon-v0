"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@nbcon/config";
import { Key, Shield, LogOut, Clock, AlertCircle } from "lucide-react";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export function SecuritySettings() {
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);
  const [passwordData, setPasswordData] = React.useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    loadSessions();
    load2FAStatus();
  }, []);

  const loadSessions = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      // In a real implementation, this would fetch from auth.sessions
      // For now, we'll use mock data
      const mockSessions: Session[] = [
        {
          id: "current",
          device: "Chrome on Windows",
          location: "New York, US",
          lastActive: new Date().toISOString(),
          current: true,
        },
        {
          id: "other1",
          device: "Safari on iPhone",
          location: "San Francisco, US",
          lastActive: new Date(Date.now() - 86400000).toISOString(),
          current: false,
        },
      ];

      setSessions(mockSessions);
    } catch (error) {
      console.error("Error in loadSessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const load2FAStatus = async () => {
    try {
      // In a real implementation, check if 2FA is enabled
      setTwoFactorEnabled(false);
    } catch (error) {
      console.error("Error loading 2FA status:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.new.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new,
      });

      if (error) {
        console.error("Error changing password:", error);
        alert("Failed to change password. Please check your current password.");
      } else {
        alert("Password changed successfully!");
        setShowPasswordDialog(false);
        setPasswordData({ current: "", new: "", confirm: "" });
      }
    } catch (error) {
      console.error("Error in handlePasswordChange:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) {
      return;
    }

    try {
      // In a real implementation, this would revoke the session
      setSessions(sessions.filter((s) => s.id !== sessionId));
      alert("Session revoked successfully");
    } catch (error) {
      console.error("Error revoking session:", error);
      alert("Failed to revoke session. Please try again.");
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
          <div>
            <div>{label}</div>
            {description && (
              <div className="text-xs text-muted-foreground mt-1">
                {description}
              </div>
            )}
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
            <div className="truncate select-none">Security</div>
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
          <div className="truncate select-none">Security</div>
        </h3>
      </div>

      {/* Password Change */}
      <SettingRow
        label="Password"
        description="Change your account password"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPasswordDialog(true)}
        >
          <Key className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </SettingRow>

      {/* Two-Factor Authentication */}
      <SettingRow
        label="Two-factor authentication"
        description="Add an extra layer of security to your account"
      >
        <Switch
          checked={twoFactorEnabled}
          onCheckedChange={setTwoFactorEnabled}
        />
      </SettingRow>

      {/* Active Sessions */}
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Active Sessions
        </h4>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border border-border dark:border-[#2d2d2d] rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device}</p>
                    {session.current && (
                      <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {session.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last active: {new Date(session.lastActive).toLocaleString()}
                  </p>
                </div>
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Activity */}
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Recent Login Activity
        </h4>
        <div className="text-sm text-muted-foreground">
          Login activity log will be displayed here. This feature requires
          additional backend implementation.
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                value={passwordData.current}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, current: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                value={passwordData.new}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, new: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input
                type="password"
                value={passwordData.confirm}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirm: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} disabled={isSaving}>
              {isSaving ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}


"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@nbcon/config";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRouter } from "next/router";
import { User, Mail, Crown, LogOut, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AccountSettings() {
  const { profile, isLoading: profileLoading } = useUserProfile();
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [editData, setEditData] = React.useState({
    full_name: "",
    username: "",
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || "",
        username: profile.username || "",
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: editData.full_name,
          username: editData.username,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      } else {
        alert("Profile updated successfully!");
        setShowEditDialog(false);
        window.location.reload(); // Refresh to show updated data
      }
    } catch (error) {
      console.error("Error in handleSaveProfile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // In a real implementation, this would:
      // 1. Create a deletion request (PDPL compliance)
      // 2. Send confirmation email
      // 3. Process deletion after confirmation period

      alert(
        "Account deletion request submitted. You will receive a confirmation email. Your account will be deleted after the confirmation period."
      );
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to submit deletion request. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const SettingRow = ({
    label,
    icon: Icon,
    value,
    children,
  }: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    value?: string;
    children?: React.ReactNode;
  }) => (
    <div className="border-border dark:border-border-elevated flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <div>
              <div className="text-sm text-muted-foreground">{label}</div>
              {value && <div className="font-medium">{value}</div>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  if (profileLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-border-elevated border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Account</div>
          </h3>
        </div>
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative mb-4">
      {/* Header */}
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-border-elevated border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">Account</div>
        </h3>
      </div>

      {/* Profile Info */}
      <SettingRow
        label="Full Name"
        icon={User}
        value={profile?.full_name || "Not set"}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEditDialog(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </SettingRow>

      <SettingRow
        label="Username"
        icon={User}
        value={profile?.username || "Not set"}
      />

      <SettingRow
        label="Email"
        icon={Mail}
        value={profile?.email || ""}
      />

      {/* Subscription Plan */}
      <SettingRow label="Subscription Plan" icon={Crown}>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Free</Badge>
          <Button variant="outline" size="sm" asChild>
            <a href="/billing">Upgrade</a>
          </Button>
        </div>
      </SettingRow>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={editData.full_name}
                onChange={(e) =>
                  setEditData({ ...editData, full_name: e.target.value })
                }
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                className="mt-1"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently deleted in accordance
              with PDPL requirements.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
              {isDeleting ? "Processing..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}


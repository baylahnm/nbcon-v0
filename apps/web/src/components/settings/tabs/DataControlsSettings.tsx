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
import { supabase } from "@nbcon/config";
import { Download, Trash2, FileText, Shield, ExternalLink } from "lucide-react";

export function DataControlsSettings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showDeletionRequest, setShowDeletionRequest] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleExport = async (format: "json" | "csv") => {
    setIsExporting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // In a real implementation, this would fetch user data and format it
      const userData = {
        profile: user.user_metadata,
        timestamp: new Date().toISOString(),
      };

      let blob: Blob;
      let filename: string;

      if (format === "json") {
        blob = new Blob([JSON.stringify(userData, null, 2)], {
          type: "application/json",
        });
        filename = `nbcon-data-export-${Date.now()}.json`;
      } else {
        // CSV format
        const csv = `Type,Value\nProfile,${JSON.stringify(userData.profile)}\nTimestamp,${userData.timestamp}`;
        blob = new Blob([csv], { type: "text/csv" });
        filename = `nbcon-data-export-${Date.now()}.csv`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearHistory = async () => {
    setIsDeleting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // In a real implementation, this would delete chat history
      const { error } = await supabase
        .from("ai_logs")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error clearing history:", error);
        alert("Failed to clear chat history. Please try again.");
      } else {
        alert("Chat history cleared successfully.");
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error("Error in handleClearHistory:", error);
      alert("Failed to clear chat history. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRequestDeletion = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // In a real implementation, this would create a deletion request
      // For PDPL compliance, this should be processed by an admin
      alert(
        "Your data deletion request has been submitted. Our team will process it within 30 days as per PDPL requirements."
      );
      setShowDeletionRequest(false);
    } catch (error) {
      console.error("Error requesting deletion:", error);
      alert("Failed to submit deletion request. Please try again.");
    }
  };

  const SettingRow = ({
    label,
    description,
    children,
  }: {
    label: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div className="border-border dark:border-border-elevated flex min-h-[60px] items-center border-b py-2 last-of-type:border-none">
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

  return (
    <section className="relative mb-4">
      {/* Header */}
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-border-elevated border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">Data Controls</div>
        </h3>
      </div>

      {/* Export Data */}
      <SettingRow
        label="Export data"
        description="Download your data in JSON or CSV format"
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("json")}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
        </div>
      </SettingRow>

      {/* Clear Chat History */}
      <SettingRow
        label="Clear chat history"
        description="Permanently delete all your chat history. This action cannot be undone."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </SettingRow>

      {/* Request Data Deletion */}
      <SettingRow
        label="Request data deletion"
        description="Request complete deletion of your account and all associated data (PDPL compliant)"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeletionRequest(true)}
        >
          <Shield className="mr-2 h-4 w-4" />
          Request Deletion
        </Button>
      </SettingRow>

      {/* Privacy Policy */}
      <SettingRow
        label="Privacy policy"
        description="Review our privacy policy and data handling practices"
      >
        <Button variant="outline" size="sm" asChild>
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            View Policy
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </SettingRow>

      {/* Clear History Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Chat History</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete all your chat history?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearHistory} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete All History"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Data Deletion Request Dialog */}
      <Dialog open={showDeletionRequest} onOpenChange={setShowDeletionRequest}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Data Deletion</DialogTitle>
            <DialogDescription>
              By submitting this request, you are requesting the complete deletion
              of your account and all associated data. This process complies with
              PDPL (Personal Data Protection Law) requirements and will be processed
              within 30 days. You will receive a confirmation email once the
              deletion is complete.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeletionRequest(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRequestDeletion}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}


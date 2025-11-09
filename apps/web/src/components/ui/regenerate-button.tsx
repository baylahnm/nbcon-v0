"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { VersionNavigation } from "@/components/ui/version-navigation";

interface RegenerateButtonProps {
  messageId: string;
  conversationId?: string;
  agentKey?: string;
  onRegenerated?: (newVersion: { output: string; version_number: number }) => void;
}

export function RegenerateButton({
  messageId,
  conversationId,
  agentKey = "civil",
  onRegenerated,
}: RegenerateButtonProps) {
  const { addToast } = useToast();
  const [isRegenerating, setIsRegenerating] = React.useState(false);
  const [versions, setVersions] = React.useState<Array<{ version_number: number; content: string }>>([]);
  const [currentVersion, setCurrentVersion] = React.useState(1);
  const [totalVersions, setTotalVersions] = React.useState(1);

  // Load versions when component mounts or messageId changes
  React.useEffect(() => {
    loadVersions();
  }, [messageId]);

  const loadVersions = async () => {
    try {
      const response = await fetch(`/api/ai/versions/${messageId}`);
      if (response.ok) {
        const data = await response.json();
        setVersions(data.versions || []);
        setTotalVersions(data.total_versions || 1);
        setCurrentVersion(data.current_version || 1);
      }
    } catch (error) {
      console.error("Error loading versions:", error);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const response = await fetch("/api/ai/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_id: messageId,
          conversation_id: conversationId,
          agent_key: agentKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to regenerate response");
      }

      const data = await response.json();
      
      // Reload versions
      await loadVersions();
      
      // Update to latest version
      setCurrentVersion(data.version_number);
      
      // Notify parent component
      onRegenerated?.({
        output: data.output,
        version_number: data.version_number,
      });

      addToast({
        title: "Response regenerated",
        description: `Version ${data.version_number} created successfully.`,
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error regenerating response:", error);
      addToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to regenerate response",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handlePreviousVersion = () => {
    if (currentVersion > 1) {
      const newVersion = currentVersion - 1;
      setCurrentVersion(newVersion);
      const versionData = versions.find((v) => v.version_number === newVersion);
      if (versionData && onRegenerated) {
        onRegenerated({
          output: versionData.content,
          version_number: newVersion,
        });
      }
    }
  };

  const handleNextVersion = () => {
    if (currentVersion < totalVersions) {
      const newVersion = currentVersion + 1;
      setCurrentVersion(newVersion);
      const versionData = versions.find((v) => v.version_number === newVersion);
      if (versionData && onRegenerated) {
        onRegenerated({
          output: versionData.content,
          version_number: newVersion,
        });
      }
    }
  };

  // Show version navigation if there are multiple versions
  if (totalVersions > 1) {
    return (
      <VersionNavigation
        messageId={messageId}
        currentVersion={currentVersion}
        totalVersions={totalVersions}
        onPrevious={handlePreviousVersion}
        onNext={handleNextVersion}
        onRegenerate={handleRegenerate}
        isLoading={isRegenerating}
      />
    );
  }

  // Show regenerate button if only one version exists
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleRegenerate}
      disabled={isRegenerating}
      className="h-8 px-2 mt-2"
      aria-label="Regenerate response"
    >
      <RotateCcw className="h-4 w-4 mr-2" />
      {isRegenerating ? "Regenerating..." : "Regenerate"}
    </Button>
  );
}


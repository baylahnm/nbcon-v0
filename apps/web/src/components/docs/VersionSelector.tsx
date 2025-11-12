"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DOC_VERSIONS, getCurrentVersion, getVersionLabel, type DocVersion } from "@/config/docs-versions";

interface VersionSelectorProps {
  className?: string;
}

export function VersionSelector({ className }: VersionSelectorProps) {
  const [currentVersion, setCurrentVersion] = useState<string>(getCurrentVersion());

  useEffect(() => {
    // Sync with localStorage changes
    const handleStorageChange = () => {
      setCurrentVersion(getCurrentVersion());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleVersionChange = (version: string) => {
    // Store in localStorage
    localStorage.setItem("docs-version", version);
    setCurrentVersion(version);

    // In the future, this could navigate to versioned URLs
    // For now, just update the stored preference
    // const versionedUrl = `/docs/v${version}/${currentPath}`;
    // router.push(versionedUrl);
  };

  const currentVersionObj = DOC_VERSIONS.find((v) => v.version === currentVersion) || DOC_VERSIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={className}
          aria-label="Select documentation version"
        >
          <span className="hidden sm:inline">{getVersionLabel(currentVersion)}</span>
          <span className="sm:hidden">{currentVersionObj.label}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {DOC_VERSIONS.map((version) => (
          <DropdownMenuItem
            key={version.version}
            onClick={() => handleVersionChange(version.version)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{version.label}</span>
              {version.isLatest && (
                <span className="text-xs text-muted-foreground">Latest</span>
              )}
              {version.isStable && !version.isLatest && (
                <span className="text-xs text-muted-foreground">Stable</span>
              )}
            </div>
            {currentVersion === version.version && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


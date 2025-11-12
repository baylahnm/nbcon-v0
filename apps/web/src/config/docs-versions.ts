/**
 * Documentation Versions Configuration
 * Single Source of Truth for documentation versions
 */

export interface DocVersion {
  version: string;
  label: string;
  isLatest: boolean;
  isStable: boolean;
  releaseDate?: string;
  url?: string; // Optional: if versions are hosted separately
}

export const DOC_VERSIONS: DocVersion[] = [
  {
    version: "latest",
    label: "Latest",
    isLatest: true,
    isStable: true,
  },
  {
    version: "1.0",
    label: "v1.0",
    isLatest: false,
    isStable: true,
    releaseDate: "2025-01-01",
  },
];

export const DEFAULT_VERSION = "latest";

export function getCurrentVersion(): string {
  // In the future, this could read from URL or localStorage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("docs-version");
    if (stored && DOC_VERSIONS.some((v) => v.version === stored)) {
      return stored;
    }
  }
  return DEFAULT_VERSION;
}

export function getVersionLabel(version: string): string {
  const versionObj = DOC_VERSIONS.find((v) => v.version === version);
  return versionObj?.label || version;
}


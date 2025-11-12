/**
 * Changelog Types
 * Centralized type definitions for changelog entries
 * Single source of truth for changelog data structure
 */

export type ChangelogVersionType = "major" | "minor" | "patch" | "hotfix";

export interface ChangelogBreakingChange {
  description: string;
  migrationGuide?: string;
}

export interface ChangelogCategories {
  features?: string[];
  improvements?: string[];
  bugFixes?: string[];
  security?: string[];
  breakingChanges?: ChangelogBreakingChange[];
  documentation?: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ChangelogVersionType;
  highlights: string[];
  categories: ChangelogCategories;
  fullNotes?: string;
  relatedDocs?: string[];
}

export interface ChangelogFilters {
  searchQuery: string;
  typeFilter: ChangelogVersionType | "all";
  categoryFilter: keyof ChangelogCategories | "all";
}

export interface ChangelogStats {
  totalVersions: number;
  majorVersions: number;
  minorVersions: number;
  patchVersions: number;
  hotfixVersions: number;
  latestVersion: string;
  latestVersionDate: string;
}


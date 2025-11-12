"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  category?: string;
  onCategoryChange: (category?: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  categories: string[];
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
  availableTags?: string[];
}

export function ProjectFilter({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  selectedTags = [],
  onTagToggle,
  availableTags = [],
}: ProjectFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category || "all"} onValueChange={(value) => onCategoryChange(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onTagToggle?.(tag)}
              >
                {tag}
                {isSelected && <X className="h-3 w-3 ml-1" />}
              </Badge>
            );
          })}
        </div>
      )}
      {(category || selectedTags.length > 0) && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(undefined);
              selectedTags.forEach((tag) => onTagToggle?.(tag));
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}


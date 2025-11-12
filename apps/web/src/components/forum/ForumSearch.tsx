"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ForumSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ForumSearch({
  value,
  onChange,
  placeholder = "Search threads and posts...",
  className,
}: ForumSearchProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}


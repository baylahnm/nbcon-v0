"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface JobFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  department?: string;
  onDepartmentChange: (department?: string) => void;
  locationType?: string;
  onLocationTypeChange: (locationType?: string) => void;
  jobType?: string;
  onJobTypeChange: (jobType?: string) => void;
  level?: string;
  onLevelChange: (level?: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  departments: string[];
}

export function JobFilter({
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  locationType,
  onLocationTypeChange,
  jobType,
  onJobTypeChange,
  level,
  onLevelChange,
  sortBy,
  onSortChange,
  departments,
}: JobFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={department || "all"} onValueChange={(value) => onDepartmentChange(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationType || "all"} onValueChange={(value) => onLocationTypeChange(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">On-site</SelectItem>
          </SelectContent>
        </Select>
        <Select value={jobType || "all"} onValueChange={(value) => onJobTypeChange(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
        <Select value={level || "all"} onValueChange={(value) => onLevelChange(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="entry">Entry</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="relevance">Relevance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


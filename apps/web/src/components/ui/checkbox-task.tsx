"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxTaskProps {
  id: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export function CheckboxTask({ id, children, defaultChecked = false, onToggle }: CheckboxTaskProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem(`task-${id}`);
    if (saved !== null) {
      setChecked(saved === "true");
    }
    setIsClient(true);
  }, [id]);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    localStorage.setItem(`task-${id}`, String(newChecked));
    onToggle?.(newChecked);
    
    // Dispatch event for progress update
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("taskToggle"));
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (!isClient) {
    return (
      <label className="flex items-start gap-3 py-1">
        <div className="mt-0.5 h-5 w-5 rounded border-2 border-input bg-background" />
        <span className="flex-1 text-sm leading-relaxed">{children}</span>
      </label>
    );
  }

  return (
    <label className="flex items-start gap-3 cursor-pointer group py-1">
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
          checked
            ? "bg-primary border-primary text-primary-foreground"
            : "border-input bg-background group-hover:border-primary/50"
        )}
        role="checkbox"
        aria-checked={checked}
        aria-label={typeof children === "string" ? children : "Task"}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </div>
      <span
        className={cn(
          "flex-1 text-sm leading-relaxed",
          checked && "line-through text-muted-foreground"
        )}
      >
        {children}
      </span>
    </label>
  );
}


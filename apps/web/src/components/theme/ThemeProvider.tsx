"use client";

import { useEffect } from "react";

/**
 * ThemeProvider - Initializes theme on client-side mount
 * 
 * This component ensures theme is applied during client-side navigation.
 * The inline script in _document.tsx handles initial page load to prevent FOUC.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Get theme from localStorage or default to "system"
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const theme = storedTheme || "system";
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    let effectiveTheme: "light" | "dark";
    
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme;
    }
    
    root.classList.add(effectiveTheme);
  }, []);
  
  return <>{children}</>;
}


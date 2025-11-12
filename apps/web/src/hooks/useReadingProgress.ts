"use client";

import { useState, useEffect } from "react";

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate progress percentage
      const scrollableHeight = documentHeight - windowHeight;
      const progressPercent = scrollableHeight > 0 
        ? Math.min(100, (scrollTop / scrollableHeight) * 100)
        : 0;
      
      setProgress(progressPercent);
    };

    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener("scroll", updateProgress, { passive: true });
    
    // Update on resize (content height might change)
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
}


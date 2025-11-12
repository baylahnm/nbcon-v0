"use client";

import { useState, useEffect } from "react";

export function useResponsiveColumns() {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: 3 columns
        setColumnCount(3);
      } else if (width < 1024) {
        // Tablet: 6 columns
        setColumnCount(6);
      } else if (width < 1280) {
        // Desktop: 7 columns
        setColumnCount(7);
      } else {
        // Large desktop: 9 columns
        setColumnCount(9);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  return columnCount;
}


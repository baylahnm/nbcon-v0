"use client";

import { useState, useEffect, useRef } from "react";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function useTOC(contentRef: React.RefObject<HTMLElement>) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from content
  useEffect(() => {
    if (!contentRef.current) return;

    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TOCItem[] = [];

    headingElements.forEach((heading) => {
      // Generate ID from text content, sanitizing special characters
      const generateId = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // Remove special characters except word chars, spaces, and hyphens
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
      };

      const id = heading.id || generateId(heading.textContent || "") || "";
      
      // Set ID if not present
      if (!heading.id && id) {
        heading.id = id;
      }

      const level = parseInt(heading.tagName.charAt(1));
      tocItems.push({
        id,
        title: heading.textContent || "",
        level,
      });
    });

    setHeadings(tocItems);
  }, [contentRef]);

  // Escape CSS selector special characters
  const escapeSelector = (id: string): string => {
    // CSS selector escape: escape special characters
    return id.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "\\$1");
  };

  // Set up Intersection Observer for scroll spy
  useEffect(() => {
    if (!contentRef.current || headings.length === 0) return;

    const headingElements = contentRef.current.querySelectorAll(
      headings.map((h) => `#${escapeSelector(h.id)}`).join(", ")
    );

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the heading that's most visible
        let mostVisible: IntersectionObserverEntry | null = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry;
          }
        });

        // If we have a visible heading, set it as active
        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        } else {
          // If no heading is visible, find the one that's just scrolled past
          const scrolledPast = Array.from(headingElements)
            .reverse()
            .find((el) => {
              const rect = el.getBoundingClientRect();
              return rect.top < 100; // 100px from top
            });

          if (scrolledPast) {
            setActiveId(scrolledPast.id);
          }
        }
      },
      {
        rootMargin: "-100px 0px -66% 0px", // Trigger when heading is near top
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all headings
    headingElements.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [contentRef, headings]);

  return { headings, activeId };
}


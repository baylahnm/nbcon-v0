"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  showLanguage?: boolean;
}

export function CodeBlock({
  children,
  language,
  className,
  showLineNumbers = false,
  showLanguage = true,
}: CodeBlockProps) {
  const codeString = typeof children === "string" ? children : String(children);
  const [copied, setCopied] = useState(false);
  const [showLineNums, setShowLineNums] = useState(showLineNumbers);
  const codeRef = useRef<HTMLPreElement>(null);

  // Count lines for line numbers
  const lines = codeString.split("\n");
  const lineCount = lines.length;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeString);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = codeString;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      toast({
        title: "Failed to copy",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Language display name mapping
  const getLanguageName = (lang?: string): string => {
    if (!lang) return "";
    const langMap: Record<string, string> = {
      ts: "TypeScript",
      tsx: "TSX",
      js: "JavaScript",
      jsx: "JSX",
      py: "Python",
      sh: "Shell",
      bash: "Bash",
      json: "JSON",
      yaml: "YAML",
      yml: "YAML",
      md: "Markdown",
      html: "HTML",
      css: "CSS",
      sql: "SQL",
      xml: "XML",
      diff: "Diff",
    };
    return langMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className="relative group my-4">
      {/* Header bar with language badge and controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b-[0.5px] border-border/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          {showLanguage && language && (
            <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded bg-background border-[0.5px] border-border/50">
              {getLanguageName(language)}
            </span>
          )}
          {lineCount > 1 && (
            <button
              onClick={() => setShowLineNums(!showLineNums)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle line numbers"
            >
              {showLineNums ? "Hide" : "Show"} lines
            </button>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Code block */}
      <pre
        ref={codeRef}
        className={cn(
          "overflow-x-auto rounded-b-lg bg-muted p-4 border-[0.5px] border-border/50 border-t-0",
          showLineNums && "pl-0",
          className
        )}
      >
        <code
          className={cn(
            "text-sm font-mono block",
            language && `language-${language}`
          )}
        >
          {showLineNums ? (
            <div className="flex">
              {/* Line numbers */}
              <div className="select-none text-muted-foreground/50 pr-4 text-right border-r-[0.5px] border-border/50 mr-4">
                {lines.map((_, index) => (
                  <div key={index} className="leading-[1.5rem]">
                    {index + 1}
                  </div>
                ))}
              </div>
              {/* Code content */}
              <div className="flex-1 min-w-0">
                {lines.map((line, index) => (
                  <div key={index} className="leading-[1.5rem]">
                    {line || "\u00A0"}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            codeString
          )}
        </code>
      </pre>
    </div>
  );
}

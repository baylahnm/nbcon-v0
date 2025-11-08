import React from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const codeString = typeof children === "string" ? children : String(children);
  
  return (
    <pre className={`overflow-x-auto rounded-lg bg-muted p-4 my-4 border border-border ${className || ""}`}>
      <code className={`text-sm font-mono ${language ? `language-${language}` : ""}`}>
        {codeString}
      </code>
    </pre>
  );
}


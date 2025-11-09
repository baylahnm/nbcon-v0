"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Customize code blocks
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          // Customize links
          a({ node, children, ...props }: any) {
            return (
              <a
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Customize lists
          ul({ node, children, ...props }: any) {
            return (
              <ul className="list-disc list-inside space-y-1 my-2" {...props}>
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }: any) {
            return (
              <ol className="list-decimal list-inside space-y-1 my-2" {...props}>
                {children}
              </ol>
            );
          },
          // Customize headings
          h1({ node, children, ...props }: any) {
            return (
              <h1 className="text-2xl font-bold mt-4 mb-2" {...props}>
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }: any) {
            return (
              <h2 className="text-xl font-semibold mt-3 mb-2" {...props}>
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }: any) {
            return (
              <h3 className="text-lg font-medium mt-2 mb-1" {...props}>
                {children}
              </h3>
            );
          },
          // Customize paragraphs
          p({ node, children, ...props }: any) {
            return (
              <p className="mb-2 leading-relaxed" {...props}>
                {children}
              </p>
            );
          },
          // Customize blockquotes
          blockquote({ node, children, ...props }: any) {
            return (
              <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-2" {...props}>
                {children}
              </blockquote>
            );
          },
          // Customize tables
          table({ node, children, ...props }: any) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-border" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ node, children, ...props }: any) {
            return (
              <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props}>
                {children}
              </th>
            );
          },
          td({ node, children, ...props }: any) {
            return (
              <td className="border border-border px-4 py-2" {...props}>
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

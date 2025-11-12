"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Keyboard, Wand2 } from "lucide-react";

export function AutocompleteFeatureSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Code Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:order-2"
          >
            <div className="rounded-lg border border-border/50 bg-surface p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-muted-foreground">Component.tsx</span>
              </div>
              
              <div className="space-y-2">
                <CodeBlock language="typescript">
{`export function Dashboard() {
  return (
    <div className="flex h-[600px]">
      <Sidebar />
      <MainContent />
      <SupportChat />
    </div>
  );
}`}
                </CodeBlock>
                
                <div className="p-3 bg-primary/5 border-l-2 border-primary rounded-r">
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Tab to accept suggestion
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:order-1"
          >
            <Badge variant="outline" className="mb-4">
              <Keyboard className="mr-2 h-3 w-3" />
              Smart Autocomplete
            </Badge>
            
            <h2 className="subsection-heading mb-6">
              Predict your next actions
            </h2>
            
            <p className="body-large mb-8">
              Our custom autocomplete model learns from your codebase and suggests 
              intelligent completions across multiple lines.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Wand2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Multi-line Edits</h3>
                  <p className="text-muted-foreground text-sm">
                    Get suggested edits across multiple lines. Complete entire functions with a single tab.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smart Rewrites</h3>
                  <p className="text-muted-foreground text-sm">
                    Type naturally and let AI finish your thought. Context-aware suggestions based on your patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Keyboard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tab Navigation</h3>
                  <p className="text-muted-foreground text-sm">
                    Fly through edits at your cursor and across files. Navigate suggestions with keyboard shortcuts.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


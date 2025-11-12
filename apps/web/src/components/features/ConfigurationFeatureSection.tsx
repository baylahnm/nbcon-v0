"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Settings, FileCode, Command } from "lucide-react";

export function ConfigurationFeatureSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4">
              <Settings className="mr-2 h-3 w-3" />
              Configuration
            </Badge>
            
            <h2 className="subsection-heading mb-6">
              Powerful, yet flexible
            </h2>
            
            <p className="body-large mb-8">
              Configure nbcon.ai to match your workflow. Customize behavior with rules, 
              memories, and reusable commands.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <FileCode className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rules & Memories</h3>
                  <p className="text-muted-foreground text-sm">
                    Customize how models behave with reusable, scoped instructions. 
                    Define project-specific rules and preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Command className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Custom Commands</h3>
                  <p className="text-muted-foreground text-sm">
                    Create and share reusable prompts within your team. 
                    Build a library of common tasks and workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">1-Click Import</h3>
                  <p className="text-muted-foreground text-sm">
                    Import extensions, themes, and keybindings directly from VS Code. 
                    Seamless migration from your existing setup.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Code Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-lg border border-border/50 bg-surface p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-muted-foreground">.cursorrules</span>
              </div>
              
              <CodeBlock language="markdown">
{`# Dashboard Application Rules

## Instructions:
- Follow Next.js App Router best practices
- Use React Server Components by default
- Implement type-safe server actions
- Follow mobile-first responsive design
- Use shadcn/ui components

## Component Structure:
1. Exports
2. Types/Interfaces
3. Server actions
4. Component logic
5. Helper functions

## Naming:
- Use kebab-case for directories
- PascalCase for components
- camelCase for functions`}
              </CodeBlock>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


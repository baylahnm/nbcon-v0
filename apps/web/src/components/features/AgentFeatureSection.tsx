"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Brain, Code2, Zap } from "lucide-react";

export function AgentFeatureSection() {
  return (
    <section className="py-24 bg-background">
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
              <Brain className="mr-2 h-3 w-3" />
              AI Agent
            </Badge>
            
            <h2 className="subsection-heading mb-6">
              Delegate complex tasks to AI agents
            </h2>
            
            <p className="body-large mb-8">
              Our AI agent system understands your codebase and executes tasks with precision. 
              Choose from specialized agents for different engineering domains.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Codebase Understanding</h3>
                  <p className="text-muted-foreground text-sm">
                    Deep context awareness of your entire project structure and dependencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Top Model Access</h3>
                  <p className="text-muted-foreground text-sm">
                    Access GPT-5, Claude Opus, Gemini Pro, and more. Choose the best model for each task.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 mt-1">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Scoped Changes</h3>
                  <p className="text-muted-foreground text-sm">
                    Make targeted edits or run terminal commands with natural language instructions.
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
                <span className="ml-4 text-sm text-muted-foreground">agentRegistry.ts</span>
              </div>
              
              <CodeBlock language="typescript">
{`import { AgentConfig } from './interfaces';

export const agentRegistry = {
  civil: {
    id: "civilAgent",
    description: "Handles site design, grading, and material estimation.",
    model: "gpt-5",
    context: "civil-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  electrical: {
    id: "electricalAgent",
    description: "Generates load schedules, panel design, and wiring plans.",
    model: "gpt-5",
    context: "electrical-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  // ... 5 more specialized agents
};`}
              </CodeBlock>

              <div className="mt-4 p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm font-mono text-muted-foreground">
                  <span className="text-primary">const</span> result = <span className="text-primary">await</span> useAIAgent('civil', {'{'}
                    <br />
                    <span className="ml-4">prompt: "Design a foundation plan for a 3-story building"</span>
                    <br />
                  {'}'});
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


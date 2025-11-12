"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Plug, Terminal, Github } from "lucide-react";
import { Card } from "@/components/ui/card";

export function IntegrationsFeatureSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Plug className="mr-2 h-3 w-3" />
            Integrations
          </Badge>
          <h2 className="subsection-heading mb-6">
            Connect your entire workflow
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Integrate with your favorite tools and services. Start tasks from anywhere, finish in the IDE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 h-full">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">CLI Access</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Run agents in any terminal or script. Integrate with your existing automation.
              </p>
              <CodeBlock language="bash" className="text-xs">
{`nbcon agent run civil \\
  --prompt "Design foundation plan" \\
  --model gpt-5`}
              </CodeBlock>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">GitHub Integration</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Review code, fix issues, and manage PRs directly from GitHub.
              </p>
              <CodeBlock language="yaml" className="text-xs">
{`# .github/workflows/nbcon.yml
- uses: nbcon/review
  with:
    agent: 'civil'`}
              </CodeBlock>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="p-6 h-full">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Plug className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">MCP Servers</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connect external tools and data sources via Model Context Protocol.
              </p>
              <CodeBlock language="json" className="text-xs">
{`{
  "mcpServers": {
    "supabase": {
      "command": "nbcon-mcp-supabase"
    }
  }
}`}
              </CodeBlock>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


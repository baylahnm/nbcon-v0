import { useState } from "react";
import { useAIAgent } from "../hooks/useAIAgent";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import type { AgentConfig } from "@nbcon/ai-core";

interface AgentConsoleProps {
  agentKey: keyof typeof import("@nbcon/ai-core").agentRegistry;
  agent?: AgentConfig;
}

export default function AgentConsole({ agentKey, agent }: AgentConsoleProps) {
  const { runAgent, loading, error } = useAIAgent(agentKey);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = async () => {
    try {
      const result = await runAgent({ prompt: input });
      setOutput(result.output);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      {agent && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">{agent.id}</h3>
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </div>
      )}
      
      <Textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        placeholder="Enter your prompt..."
        className="min-h-[120px]"
        disabled={loading}
      />
      
      <Button onClick={handleRun} disabled={loading || !input.trim()}>
        {loading ? "Processing..." : "Run Agent"}
      </Button>
      
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      
      {output && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Response:</h4>
          <pre className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-96">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

